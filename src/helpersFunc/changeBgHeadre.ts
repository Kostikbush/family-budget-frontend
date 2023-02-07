import { ChangeBgHeader } from "../CONST/CONST";
export const changeBgHeader = (string: string, setStyle: Function) => {
  if (string === "/home") {
    setStyle(ChangeBgHeader.HOME);
  } else if (string === "/home/createBudget") {
    setStyle(ChangeBgHeader.CREATE_BUDGET);
  }
};
