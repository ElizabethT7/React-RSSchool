export interface FormFieldsProps {
  title: string;
  startDate: string;
  description: string;
  destinations: string;
  age: string;
  price: string;
  discountPercentage: number;
  discountPrice: string;
  save: number;
  pricePerDay: number;
  tourLength: number;
  image: string;
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

export interface StateInterface {
  selectedOption: string;
  //file: string;
  imagePreviewUrl: string | ArrayBuffer | null;
}