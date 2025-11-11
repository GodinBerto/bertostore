type Product = {
  category: string;
  title: string;
  price: number;
  oldPrice?: number; // optional, since not every product may have it
  image: string;
  rating: number;
}[];
