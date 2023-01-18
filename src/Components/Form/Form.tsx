import { FormEventHandler, ReactNode } from "react";

interface formProps {
  handleSubmit?: FormEventHandler;
  children?: ReactNode;
  styles?: string;
}

export const Form = ({ handleSubmit, children, styles }: formProps) => {
  return (
    <>
      {handleSubmit ? (
        <form onSubmit={handleSubmit} className={styles}>
          {children}
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={styles}
        >
          {children}
        </form>
      )}
    </>
  );
};
