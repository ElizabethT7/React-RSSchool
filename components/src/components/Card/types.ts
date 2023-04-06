export interface ICard {
  id?: number;
  title: string;
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

export interface PriceProps {
  tourLength: number;
  pricePerDay: number;
  save: number;
  price: string;
  discountPrice: string;
  discount: number;
}
