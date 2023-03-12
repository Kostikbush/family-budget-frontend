interface errorOfErrorsReg {
  location: string;
  msg: string;
  param: string;
  value: string;
}

export interface IErrorBackend {
  data: {
    errors: Array<errorOfErrorsReg>;
    message: string;
  };
  status: number;
}

export interface ErrorBackWork {
  status: string;
  error: string;
}
