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
}

export interface FormData {
  [key: string]: string | number;
}
