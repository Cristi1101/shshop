export interface Product {
    key?: string;
    title: string;
    price: number;
    category: string;
    subcategory: string;
    color: string;
    imageUrl: string;
    visits?: number;
    time?: number;
    description?: string;
  }