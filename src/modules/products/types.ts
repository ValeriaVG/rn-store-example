export type Product = {
  id: string;
  title: string;
  article: string;
  price: number;
  parameters?: Array<ProductParameter>;
  image?: string;
  description?: string;
};

export type ProductParameter = {
  label: string;
  value: string;
};
