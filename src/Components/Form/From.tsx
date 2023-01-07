import { ReactNode } from "react";

import "./form.scss";

interface FormProps {
  children: ReactNode;
  in?: boolean;
  errorValidation: boolean;
}

export const Form = ({ errorValidation, children }: FormProps) => {
  return (
    <article
      className={errorValidation ? "form-container-error" : "form-container"}
    >
      {children}
      {errorValidation && <span className="form-container-error-stroke"></span>}
    </article>
  );
};
