import { Control, FieldErrorsImpl, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form";

export type FormProps = {
  onSubmit(value: any): void;
  formData: UserFormData[];
  register: UseFormRegister<any>;
  control: Control<any, any>;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  setValue: UseFormSetValue<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  reset: UseFormReset<any>;
  watch: UseFormWatch<any>;
  defaultValues: any;
  getValues: UseFormGetValues<any>;
};

export type UserOptions = {
  name: string;
  label: string;
  value: string;
}

export interface UserFormData {
  name: string;
  label: string;
  required?: boolean;
  type: string;
  value?: boolean;
  placeholder?: string;
  className?: string;
  options?: (props?: any) => UserOptions[];
  checkboxLabel?: string;
  testid?: string
}

export type User = {
  sno?: number;
  firstName: string;
  lastName: string;
  dob: string;
  mobile: string;
  email: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  hobbies: string[];
  address: string;
  termsAndConditions: boolean;
};
