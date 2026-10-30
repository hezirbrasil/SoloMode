/**
 * Controla a execução do cronômetro da aula Solo.
 * A lógica do timer fica isolada da interface do construtor.
 */
export class TimerController {
  constructor({ getBlocks, onOpen, onClose }) {
    this.getBlocks = getBlocks;
    this.onOpen = onOpen;
    this.onClose = onClose;

    this.index = 0;
    this.phase = "work";
    this.remaining = 50;
    this.running = false;
    this.intervalId = null;

    this.elements = this.getElements();
    this.bindEvents();
  }

  getElements() {
    const ids = [
      "timer-screen",
      "timer-clock",
      "timer-phase",
      "timer-ring",
      "timer-progress-fill",
      "timer-exercise-list",
      "timer-play",
      "timer-back",
      "timer-next",
      "timer-prev",
      "timer-stop",
      "timer-fullscreen",
      "start-timer"
    ];

    return Object.fromEntries(
      ids.map((id) => [id, document.getElementById(id)])
    );
  }

  bindEvents() {
    const { elements } = this;

    elements.startTimer.onclick = () => this.open();
    elements.back.onclick = () => this.close();
    elements.play.onclick = () => this.toggle();
    elements.next.onclick = () => this.next();
    elements.prev.onclick = () => this.previous();
    elements.stop.onclick = () => this.reset();

    elements.fullscreen.onclick = () => this.toggleFullscreen();
  }

  get blocks() {
    return this.getBlocks() || [];
  }

  get currentBlock() {
    return this.blocks[this.index];
  }

  get duration() {
    const block = this.currentBlock;
    if (!block) return 0;

    return this.toSeconds(
      this.phase === "work" ? block.work : block.rest
    );
  }

  toSeconds(value) {
    const [minutes = 0, seconds = 0] = String(value || "00:00")
      .split(":")
      .map(Number);

    return (minutes || 0) * 60 + (seconds || 0);
  }

  formatTime(value) {
    const totalSeconds = Math.max(0, Math.ceil(value));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return [
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0")
    ].join(":");
  }

  getBlockLabel(block) {
    if (block.exercises) {
      return block.exercises.map((exercise) => exercise.name).join(" · ");
    }

    return block.name;
  }

  renderProgress() {
    const total = this.blocks.reduce(
      (sum, block) =>
        sum + this.toSeconds(block.work) + this.toSeconds(block.rest),
      0
    );

    const completed = this.blocks
      .slice(0, this.index)
      .reduce(
        (sum, block) =>
          sum + this.toSeconds(block.work) + this.toSeconds(block.rest),
        0
      );

    const currentWork =
      this.phase === "rest"
        ? this.toSeconds(this.currentBlock.work)
        : 0;

    const elapsed = completed + currentWork + (this.duration - this.remaining);
    const percentage = total
      ? Math.min(100, (elapsed / total) * 100)
      : 0;

    this.elements.progressFill.style.width = percentage + "%";
  }

  renderExercises() {
    const list = this.elements.exerciseList;
    list.replaceChildren();

    this.blocks.slice(this.index, this.index + 3).forEach((block, offset) => {
      const row = document.createElement("div");
      row.className = "timer-exercise" + (offset === 0 ? " active" : "");

      const name = document.createElement("strong");
      name.textContent = this.getBlockLabel(block);

      row.append(name);
      list.append(row);
    });
  }

  renderControls() {
    const icon = this.running
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z"/></svg>';

    this.elements.play.innerHTML = icon;
    this.elements.play.setAttribute(
      "aria-label",
      this.running ? "Pausar" : "Iniciar"
    );

    this.elements.startTimer.disabled = this.blocks.length === 0;
  }

  render() {
    if (!this.currentBlock) return;

    const safeDuration = Math.max(1, this.duration);

    this.elements.clock.textContent = this.formatTime(this.remaining);
    this.elements.phase.textContent =
      this.phase === "work" ? "EXECUÇÃO" : "DESCANSO";

    this.elements.ring.style.setProperty(
      "--ring-progress",
      (this.remaining / safeDuration) * 100 + "%"
    );

    this.renderProgress();
    this.renderExercises();
    this.renderControls();
  }

  open() {
    if (!this.blocks.length) return;

    this.pause();
    this.index = 0;
    this.phase = "work";
    this.remaining = this.duration;

    this.elements.screen.classList.add("active");
    this.elements.screen.setAttribute("aria-hidden", "false");
    document.body.classList.add("timer-open");

    this.onOpen?.();
    this.render();
    this.start();
  }

  close() {
    this.pause();
    this.elements.screen.classList.remove("active");
    this.elements.screen.setAttribute("aria-hidden", "true");
    document.body.classList.remove("timer-open");

    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }

    this.onClose?.();
  }

  start() {
    if (!this.blocks.length) return;

    if (this.remaining <= 0) {
      this.index = 0;
      this.phase = "work";
      this.remaining = this.duration;
    }

    if (this.running) return;

    this.running = true;
    this.render();

    this.intervalId = window.setInterval(() => {
      this.remaining -= 1;

      if (this.remaining <= 0) {
        this.advancePhase();
      } else {
        this.render();
      }
    }, 1000);
  }

  pause() {
    this.running = false;

    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.elements.screen) {
      this.render();
    }
  }

  toggle() {
    if (this.running) {
      this.pause();
      return;
    }

    this.start();
  }

  advancePhase() {
    const restDuration = this.toSeconds(this.currentBlock?.rest);

    if (this.phase === "work" && restDuration > 0) {
      this.phase = "rest";
      this.remaining = this.duration;
      this.render();
      return;
    }

    this.phase = "work";
    this.index += 1;

    if (this.index >= this.blocks.length) {
      this.pause();
      this.index = this.blocks.length - 1;
      this.phase = "rest";
      this.remaining = 0;
      this.render();
      return;
    }

    this.remaining = this.duration;
    this.render();
  }

  next() {
    if (this.index >= this.blocks.length - 1) return;

    this.index += 1;
    this.phase = "work";
    this.remaining = this.duration;
    this.render();
  }

  previous() {
    if (this.phase === "rest") {
      this.phase = "work";
      this.remaining = this.duration;
    } else if (this.index > 0) {
      this.index -= 1;
      this.phase = "work";
      this.remaining = this.duration;
    }

    this.render();
  }

  reset() {
    this.pause();
    this.index = 0;
    this.phase = "work";
    this.remaining = this.duration;
    this.render();
  }

  async toggleFullscreen() {
    if (!document.fullscreenElement) {
      await this.elements.screen.requestFullscreen?.();
      return;
    }

    await document.exitFullscreen?.();
  }
}
