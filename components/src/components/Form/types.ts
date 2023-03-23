export interface FormFieldsProps {
  tourName: string;
  startDate: string;
  travelStyle: string;
  age: string;
}

export interface FormProps {
  onSubmit: (data: FormFieldsProps) => void;
}

export interface FormValueInterface {
  tourName: React.RefObject<HTMLInputElement>;
  startDate: React.RefObject<HTMLInputElement>;
  travelStyle: React.RefObject<HTMLSelectElement>;
}

export interface RadioButtonsProps {
  onChange: (value: string) => void;
}
