/**
 * Shared DOM and formatting helpers for the Solo builder.
 * Keep these small and side-effect free so UI modules can reuse them.
 */

export const $ = (id) => document.getElementById(id);

export function escapeHTML(value) {
  const entities = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

  return String(value ?? "").replace(/[&<>"']/g, (character) => entities[character]);
}

export function seconds(value) {
  const [minutes = 0, remainingSeconds = 0] = String(value || "0:0")
    .split(":")
    .map(Number);

  return (minutes || 0) * 60 + (remainingSeconds || 0);
}

export function normalizeTime(value) {
  const parts = String(value || "00:00")
    .trim()
    .split(":")
    .map((part) => Math.max(0, Number(part) || 0));

  if (parts.length === 1) {
    return "00:" + String(parts[0]).padStart(2, "0");
  }

  return (
    String(parts[parts.length - 2]).padStart(2, "0") +
    ":" +
    String(parts[parts.length - 1]).padStart(2, "0")
  );
}

export function field(label, value, id) {
  return (
    '<label class="inline-field">' +
    escapeHTML(label) +
    '<input id="' +
    escapeHTML(id) +
    '" value="' +
    escapeHTML(value) +
    '"></label>'
  );
}
