
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
};

export type ShoppingCartAction =
  | { type: "ADD_ITEM"; payload: { id: string } }
  | {
      type: "UPDATE_ITEM_QUANTITY";
      payload: { productId: string; amount: number };
    };
