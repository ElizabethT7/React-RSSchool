export interface FormFieldsProps {
  title: string;
  startDate: string;
  description: string;
  destinations: string;
  age: string | undefined;
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

export interface RadioButtonsProps {
  onChange: (value: string) => void;
}

export interface ErrorsInterface {
  name: string;
  destinations: string;
  date: string;
  style: string;
  age?: string;
  tourLength: string;
  pricePerDay: string;
  discount: string;
  img: string;
  agree: string;
}

export interface StateInterface {
  selectedOption: string;
  errors: ErrorsInterface;
  imagePreviewUrl: string | ArrayBuffer | null;
}

export interface ConstInterface {
  selectItems: string[];
  radioItems: string[];
  errorItems: string[];
}
