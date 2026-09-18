export const NAV_SCROLLED_THRESHOLD_PX = 8;

/** Toggle the header scrolled state without adding/removing a border class. */
export function setNavScrolledState(
  nav: Pick<Element, "toggleAttribute">,
  scrollY: number,
  threshold = NAV_SCROLLED_THRESHOLD_PX,
): void {
  nav.toggleAttribute("data-scrolled", scrollY > threshold);
}
