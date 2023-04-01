export default interface ICard {
  id?: number;
  title: string;
  description: string;
  destinations: string;
  age?: string;
  price: string;
  discountPercentage: number;
  discountPrice: string;
  save: number;
  pricePerDay: number;
  tourLength: number;
  image: string;
}
