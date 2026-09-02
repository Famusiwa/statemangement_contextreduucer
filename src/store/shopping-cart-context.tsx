import { createContext, type PropsWithChildren, useReducer } from "react";
import type {
  CartContextValue,
  ShoppingCart,
  ShoppingCartAction,
} from "../lib/types";
import { DUMMY_PRODUCTS } from "../dummyProject";

const CartContext = createContext<CartContextValue>({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

export { CartContext };

const shoppingCartReducer = (
  state: ShoppingCart,
  action: ShoppingCartAction,
): ShoppingCart => {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload.id,
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload.id,
      );

      if (!product) {
        return { items: [...state.items] };
      }

      updatedItems.push({
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1,
      });
    }

    return {
      items: updatedItems,
    };
  }
  if (action.type === "UPDATE_ITEM_QUANTITY") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId,
    );

    if (updatedItemIndex < 0) {
      return { items: [...state.items] };
    }

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
      quantity: updatedItems[updatedItemIndex].quantity + action.payload.amount,
    };

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }

  return state;
};

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    },
  );

  const handleAddItemToCart = (id: string = "") => {
    shoppingCartDispatch({ type: "ADD_ITEM", payload: { id } });
  };

  const handleUpdateCartItemQuantity = (
    productId: string = "",
    amount: number = 0,
  ) => {
    shoppingCartDispatch({
      type: "UPDATE_ITEM_QUANTITY",
      payload: { productId, amount },
    });
  };

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};
