export const validateValue = (
  value: string,
  type: "name" | "password" | "email"
) => {
  const errors = new Set();
  if (type === "name") {
    value.length < 3 && errors.add("Имя");
    value.trim() === "" && errors.add("Имя");
    value.length > 12 && errors.add("Имя");
  }
  if (type === "password") {
    value.length < 6 && errors.add("Пароль");
    value.length > 20 && errors.add("Пароль");
    value.trim() === "" && errors.add("Пароль");
  }
  if (type === "email") {
    let arr = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i] === "." || value[i] === "@") {
        arr.push(value[i]);
      }
    }
    value.trim() === "" && errors.add("Почта");
    arr.length < 2 && errors.add("Почта");
    value.length < 5 && errors.add("Почта");
  }
  const newErrowsArr: string[] = Array.from(errors) as string[];
  return newErrowsArr;
};
