export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostItem {
  _id: string;
  imageUrl?: string;
  title: string;
  text: string;
  tags: string[];
  viewsCount: number;
  user: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface FormLoginValues {
  email: string;
  password: string | number;
}

export interface FormRegisterValues extends FormLoginValues {
  fullName: string;
}

export type AlertAppearance = "error" | "warning" | "info" | "success";
