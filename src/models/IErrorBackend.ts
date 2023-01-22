interface errorOfErrorsReg {
  location: string;
  msg: string;
  param: string;
  value: string;
}
interface dataErr {
  errors: Array<errorOfErrorsReg>;
  message: string;
}
export interface IErrorBackend {
  data: {
    errors: Array<errorOfErrorsReg>;
    message: string;
  };
  status: number;
}

export function isErrorWithMessage(error: unknown): error is { data: dataErr } {
  return (
    typeof error === "object" &&
    error != null &&
    "data" in error &&
    typeof (error as any).data === "object" &&
    "message" in (error as any).data &&
    typeof (error as any).data.message === "string"
    // eslint-disable-next-line valid-typeof
  );
}
export interface IErrorBackend {
  data: {
    errors: Array<errorOfErrorsReg>;
    message: string;
  };
  status: number;
}

export function isErrorsWithMessage(
  error: unknown
): error is { data: dataErr } {
  return (
    typeof error === "object" &&
    error != null &&
    "data" in error &&
    typeof (error as any).data === "object" &&
    "errors" in (error as any).data &&
    // eslint-disable-next-line valid-typeof
    typeof (error as any).data.errors === "object"
  );
}
