export interface CartItem {
  cart_item_id: number;
  quantity: number;
  product_id: number;
  name: string;
  price: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
}

export interface User {
  id: number;
  name: string;
  createdAt: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  createdAt: string;
}

export interface ShopProps {
  products: Product[];
  cart: Cart;
  currentUser: User | null | undefined;
}

export interface AddProduct {
  id: number;
  name: string;
  price: number;
  createdAt: string;
}
