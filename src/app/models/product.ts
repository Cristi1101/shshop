//import { Timestamp } from 'rxjs';

import { Timestamp } from 'rxjs';

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
  }