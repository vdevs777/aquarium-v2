type CursorType =
  | "auto"
  | "default"
  | "pointer"
  | "wait"
  | "text"
  | "move"
  | "not-allowed"
  | "grab"
  | "grabbing"
  | "crosshair"
  | "progress"
  | string;

export function setCursor(cursor: CursorType, element?: HTMLElement | null) {
  const target = element ?? document.body;

  if (!target) return;

  target.style.cursor = cursor;
}
