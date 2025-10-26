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
  username: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface ShopProps {
  products: Product[];
  cart: Cart;
  currentUser: User | null;
}
