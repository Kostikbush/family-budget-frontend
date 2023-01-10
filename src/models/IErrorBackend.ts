export interface IErrorBackend {
  data: {
    errors: Array<string>;
    message: string;
  };
  status: number;
}
interface dataE {
  errors: Array<string>;
  message: string;
}
export function isErrorWithMessage(error: unknown): error is { data: dataE } {
  return (
    typeof error === "object" &&
    error != null &&
    "data" in error &&
    typeof (error as any).data === "object" &&
    "message" in (error as any).data &&
    typeof (error as any).data.message === "string"
  );
}
