
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export interface CartContextValue  {
  items: CartItem[];
  addItemToCart: (id:string) => void;
  updateItemQuantity: (productId:string, amount:number) => void
};

export type CartProps = {
  items?: CartItem[];
  onUpdateItemQuantity?: (id: string | number, delta: number) => void;
};

export interface ShoppingCart {
  items: CartItem[];
};

export type ProductProps = {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
  // onAddToCart: (id: string) => void;
};