export interface IAuthLoginErrors {
  email: {
    error: boolean;
    message: string;
  };
  password: {
    error: boolean;
    message: string;
  };
}

export interface IAuthRegisterErrors {
  email: {
    error: boolean;
    message: string;
  };
  password: {
    error: boolean;
    message: string;
  };
  confirmPassword: {
    error: boolean;
    message: string;
  };
}

export interface IAuthAdditionalDataRegisterErrors {
  name: {
    error: boolean;
    message: string;
  };
  lastname: {
    error: boolean;
    message: string;
  };
  phone: {
    error: boolean;
    message: string;
  };
  dni: {
    error: boolean;
    message: string;
  };
}

export interface IAuthAgencyRegisterErrors {
  name: {
    error: boolean;
    message: string;
  };
  ruc: {
    error: boolean;
    message: string;
  };
  email: {
    error: boolean;
    message: string;
  };
  password: {
    error: boolean;
    message: string;
  };
  confirmPassword: {
    error: boolean;
    message: string;
  };
}
