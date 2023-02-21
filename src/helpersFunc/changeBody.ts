let lastStyle: string[] = [];
export const changeBody = (string: string) => {
  lastStyle.push(string);

  if (lastStyle.length > 1) {
    document.body.classList.add(`${lastStyle[0]}-exit`);
  }
  document.body.classList.remove(`${lastStyle[0]}`);
  setTimeout(() => {
    document.body.classList.remove(`${lastStyle[0]}-exit`);
  }, 500);
  setTimeout(() => {
    lastStyle = [lastStyle[lastStyle.length - 1]];
    document.body.classList.add(`${lastStyle[0]}`);
  }, 500);
};
