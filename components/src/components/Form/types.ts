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
  age: React.RefObject<HTMLSelectElement>;
  img: React.RefObject<HTMLInputElement>;
  destinations: React.RefObject<HTMLInputElement>;
  tourLength: React.RefObject<HTMLInputElement>;
  pricePerDay: React.RefObject<HTMLInputElement>;
  discount: React.RefObject<HTMLInputElement>;
  agree: React.RefObject<HTMLInputElement>;
  imgUrl: string;
  selectItems: string[];
  radioItems: string[];
}

export interface RadioButtonsProps {
  onChange: (value: string) => void;
}

export interface StateInterface {
  selectedOption: string;
  //file: string;
  imagePreviewUrl: string | ArrayBuffer | null;
}
