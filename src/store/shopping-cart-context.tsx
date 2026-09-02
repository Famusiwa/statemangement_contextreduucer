import { createContext, type PropsWithChildren, useState } from "react";
import type { CartContextValue, ShoppingCart } from "../lib/types";
import { DUMMY_PRODUCTS } from "../dummyProject";

const CartContext = createContext<CartContextValue>({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

export { CartContext };

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCart>({
    items: [],
  });

  function handleAddItemToCart(id: string = "") {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id,
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);

        if (!product) {
          return prevShoppingCart;
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
    });
  }

  function handleUpdateCartItemQuantity(
    productId: string = "",
    amount: number = 0,
  ) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId,
      );

      if (updatedItemIndex < 0) {
        return prevShoppingCart;
      }

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
        quantity: updatedItems[updatedItemIndex].quantity + amount,
      };

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};
