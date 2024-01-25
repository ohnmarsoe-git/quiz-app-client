export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  loginType?: string;
}

export type Category = {
  _id: string;
  category: string;
  __v?: string;
};

export interface Questions {
  _id: string;
  question: string;
  category: Category;
  level: string;
  answers: string[];
  correct_answer: string;
  message?: any;
}

export interface AxiosResponse<T> {
  data: T;
}
