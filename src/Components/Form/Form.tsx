import { FormEventHandler, ReactNode } from "react";

interface formProps {
  handleSubmit?: FormEventHandler;
  children?: ReactNode;
  styles?: string;
  testID?: string;
}

export const Form = ({
  handleSubmit,
  children,
  styles,
  testID = "",
}: formProps) => {
  return (
    <>
      {handleSubmit ? (
        <form data-testid={testID} onSubmit={handleSubmit} className={styles}>
          {children}
        </form>
      ) : (
        <form
          data-testid={testID}
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
