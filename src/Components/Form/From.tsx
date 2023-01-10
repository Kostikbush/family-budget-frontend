import { ReactNode } from "react";
import { LoadingReqvest } from "../LoadingReqvest/LoadingReqvest";

import "./form.scss";

interface FormProps {
  children: ReactNode;
  errorValidation: boolean;
  isLoadingReq?: boolean;
}

export const Form = ({
  errorValidation,
  children,
  isLoadingReq = false,
}: FormProps) => {
  return (
    <article
      className={errorValidation ? "form-container-error" : "form-container"}
    >
      {isLoadingReq && <LoadingReqvest />}
      {children}
      {errorValidation && <span className="form-container-error-stroke"></span>}
    </article>
  );
};
