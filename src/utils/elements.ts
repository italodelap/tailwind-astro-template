export async function loadPageCustomElements() {
  const container = document.querySelector("main")!;
  const undefinedElements = container.querySelectorAll(":not(:defined)");

  const promises = [...undefinedElements].map((el) =>
    customElements.whenDefined(el.localName),
  );

  await Promise.all(promises);

  document.body.classList.add("ready");
}
