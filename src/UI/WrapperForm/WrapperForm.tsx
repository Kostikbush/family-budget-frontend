import { ReactNode } from "react";

import "./wrapperForm.scss";

interface WrapperFormProps {
  children: ReactNode;
  errorValidation: boolean;
}

export const WrapperForm = ({
  errorValidation,
  children,
}: WrapperFormProps) => {
  return (
    <article
      className={
        errorValidation ? "app-form-container-error" : "form-container"
      }
    >
      {children}
      {errorValidation && (
        <span className="app-form-container-error__stroke"></span>
      )}
    </article>
  );
};
