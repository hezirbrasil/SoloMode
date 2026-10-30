import { searchExercises, canAddExercise } from "./exercise-bank.js";
import { $, escapeHTML } from "./dom-utils.js";

/**
 * Renderiza a biblioteca e o seletor de exercícios.
 * Mutations remain in the application layer and are injected as callbacks.
 */
export function createBankView({
  getBank,
  getBlocks,
  getBuilder,
  getMuscleFilter,
  setMuscleFilter,
  muscleOrder,
  persist,
  renderAll,
  notify,
  openExercise,
  removeExercise
}) {
  function fillMuscles() {
    const bank = getBank();
    const values = [
      ...muscleOrder,
      ...new Set(bank.map((item) => item.muscle).filter((muscle) => !muscleOrder.includes(muscle)))
    ];

    for (const id of ["builder-muscle", "bank-muscle"]) {
      const select = $(id);
      const previousValue = select.value;

      select.innerHTML =
        '<option value="">Todos os grupamentos</option>' +
        values.map((value) => "<option>" + escapeHTML(value) + "</option>").join("");

      select.value = previousValue;
    }

    $("muscle-options").innerHTML = values
      .map((value) => '<option value="' + escapeHTML(value) + '">')
      .join("");
  }

  function renderPicker() {
    const bank = getBank();
    const blocks = getBlocks();
    const list = $("builder-exercise-list");
    const items = searchExercises(bank, {
      query: $("exercise-search").value,
      muscle: $("builder-muscle").value
    }).sort((first, second) => first.name.localeCompare(second.name, "pt-BR"));

    list.replaceChildren();

    if (!items.length) {
      list.innerHTML = '<div class="no-results">Nenhum exercício encontrado.</div>';
      return;
    }

    for (const item of items) {
      const used = !canAddExercise(blocks, item);
      const row = document.createElement("div");
      row.className = "exercise-option" + (used ? " used" : "");

      const info = document.createElement("div");
      const name = document.createElement("strong");
      const subtitle = document.createElement("small");

      name.textContent = item.name;
      subtitle.textContent = item.muscle + " · " + item.type;
      info.append(name, subtitle);

      const addButton = document.createElement("button");
      addButton.className = "add-exercise";
      addButton.textContent = used ? "✓" : "+";
      addButton.title = used ? "Já utilizado nesta aula" : "Adicionar";
      addButton.disabled = used;
      addButton.onclick = () => {
        try {
          getBuilder().add(item);
          persist();
          renderAll();
          notify("Exercício adicionado");
        } catch (error) {
          notify(error.message);
        }
      };

      row.append(info, addButton);
      list.append(row);
    }
  }

  function canAddExerciseFallback(blocks, exercise) {
    return !blocks.some((block) =>
      block.sourceId === exercise.id ||
      block.exercises?.some((item) => item.sourceId === exercise.id) ||
      (exercise.name === "Stiff Unilateral E" && block.name === "Stiff Unilateral E") ||
      (exercise.name === "Stiff Unilateral D" && block.name === "Stiff Unilateral D")
    );
  }

  function renderBank() {
    const bank = getBank();
    const muscleFilter = getMuscleFilter();
    const items = searchExercises(bank, {
      query: $("bank-search").value,
      muscle: $("bank-muscle").value || muscleFilter
    }).sort((first, second) => first.name.localeCompare(second.name, "pt-BR"));

    const root = $("bank-list");
    root.replaceChildren();

    if (!items.length) {
      root.innerHTML = '<div class="no-results">Nenhum exercício encontrado.</div>';
    }

    for (const item of items) {
      const card = document.createElement("div");
      card.className = "bank-card";

      const name = document.createElement("strong");
      const subtitle = document.createElement("small");
      const actions = document.createElement("div");
      actions.className = "card-actions";

      name.textContent = item.name;
      subtitle.textContent = item.muscle + " · " + item.category + " · " + item.type;

      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.onclick = () => openExercise(item);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Excluir";
      deleteButton.onclick = () => removeExercise(item.id);

      actions.append(editButton, deleteButton);
      card.append(name, subtitle, actions);
      root.append(card);
    }

    renderMuscleIndex(bank);
    $("bank-count").textContent = bank.length;
  }

  function renderMuscleIndex(bank) {
    const index = $("muscle-index");
    index.replaceChildren();

    const allButton = document.createElement("button");
    allButton.className = "muscle-chip" + (!getMuscleFilter() ? " active" : "");
    allButton.textContent = "Todos";
    allButton.onclick = () => {
      setMuscleFilter("");
      $("bank-muscle").value = "";
      renderBank();
    };
    index.append(allButton);

    const availableMuscles = [
      ...muscleOrder.filter((muscle) => bank.some((item) => item.muscle === muscle)),
      ...new Set(bank.map((item) => item.muscle).filter((muscle) => !muscleOrder.includes(muscle)))
    ];

    for (const muscle of availableMuscles) {
      const button = document.createElement("button");
      button.className = "muscle-chip" + (getMuscleFilter() === muscle ? " active" : "");
      button.textContent = muscle;
      button.onclick = () => {
        setMuscleFilter(muscle);
        $("bank-muscle").value = muscle;
        renderBank();
      };
      index.append(button);
    }
  }

  return { fillMuscles, renderPicker, renderBank };
}
