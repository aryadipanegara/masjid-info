export type InputType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "checkbox"
  | "select"
  | "radio"
  | "options"
  | "rich-text";

export interface FormField {
  name: string;
  label: string;
  type: InputType;
  options?: string[];
}

export interface FormData {
  [key: string]: string | number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  is_verified: boolean;
  is_email_verification: boolean;
  role: string;
  created_at: string;
  updated_at: string;
}
