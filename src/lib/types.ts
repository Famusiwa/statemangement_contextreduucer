
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export interface CartContextValue  {
  items: CartItem[];
};