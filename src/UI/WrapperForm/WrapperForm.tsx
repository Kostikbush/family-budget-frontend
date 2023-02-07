import { ReactNode } from "react";
import { LoadingReqvest } from "../LoadingReqvest/LoadingReqvest";

import "./wrapperForm.scss";

interface WrapperFormProps {
  children: ReactNode;
  errorValidation: boolean;
  isLoadingReq?: boolean;
}

export const WrapperForm = ({
  errorValidation,
  children,
  isLoadingReq = false,
}: WrapperFormProps) => {
  return (
    <article
      className={
        errorValidation ? "app-form-container-error" : "form-container"
      }
    >
      {isLoadingReq && <LoadingReqvest />}
      {children}
      {errorValidation && (
        <span className="app-form-container-error__stroke"></span>
      )}
    </article>
  );
};
