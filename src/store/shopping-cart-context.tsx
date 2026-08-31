import { createContext } from "react";
import type { CartContextValue } from "../lib/types";

export const CartContext = createContext<CartContextValue>({
  items: [],
});
