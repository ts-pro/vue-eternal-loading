export function getScrollHeightFromEl($el: HTMLElement): number {
  return $el.scrollHeight;
}

export function getScrollWidthFromEl($el: HTMLElement): number {
  return $el.scrollWidth;
}

export function restoreScrollVerticalPosition(
  $el: HTMLElement,
  scrollHeight: number
): void {
  $el.scrollTop = $el.scrollHeight - scrollHeight + $el.scrollTop;
}

export function restoreScrollHorizontalPosition(
  $el: HTMLElement,
  scrollWidth: number
): void {
  $el.scrollLeft = $el.scrollWidth - scrollWidth + $el.scrollLeft;
}
