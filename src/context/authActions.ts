export enum AuthActionEnum {
  LOG_IN = 'LOG_IN',
  LOG_OUT = 'LOG_OUT',
}

export type AuthAction =
  | {
      type: AuthActionEnum.LOG_IN;
      payload: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string;
        authToken: string
      };
    }
  | {
      type: AuthActionEnum.LOG_OUT;
      payload: null;
    };
