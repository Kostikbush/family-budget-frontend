export const changeStyle = (
  elements: NodeListOf<Element>,
  type: "add" | "remove"
) => {
  if (type === "add") {
    for (let el of elements) {
      el.classList.add("page-blur");
    }
  } else {
    for (let el of elements) {
      el.classList.remove("page-blur");
    }
  }
};
