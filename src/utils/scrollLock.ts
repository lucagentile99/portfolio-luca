// Bloqueo del scroll de fondo compartido por el menú mobile y el detalle de
// proyecto. Cuenta cuántas capas lo pidieron (pueden superponerse) y
// compensa el ancho de la barra de scroll en desktop para que el layout no
// salte al abrir/cerrar.
let locks = 0;

export function lockScroll() {
  locks += 1;
  if (locks > 1) return;
  const html = document.documentElement;
  const scrollbar = window.innerWidth - html.clientWidth;
  html.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  document.documentElement.style.removeProperty("overflow");
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("padding-right");
}
