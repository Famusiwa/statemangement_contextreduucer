import { useState, useContext } from "react";
import Modal from "../customs/Modal";
// import type { CartItem } from "../lib/types";
import { CartContext } from "../store/shopping-cart-context";
import Cart from "./Cart";
// type HeaderProps = {
//   cart: {
//     items: CartItem[];
//   };
//   onUpdateCartItemQuantity: (productId: string, amount: number) => void;
// };

const Header = () => {
  const { items } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartQuantity = items.length;

  // const totalPrice = cart.items.reduce(
  //   (acc: number, item: CartItem) => acc + item.price * item.quantity,
  //   0,
  // );

  // const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  // const formattedPrice = `${items.price.toFixed(2)}`;
  // const formattedPrice = (price: number) => `$${price.toFixed(2)}`;

  function handleOpenCartClick() {
    setIsCartOpen(true);
  }

  let modalActions = (
    <button type="button" onClick={() => setIsCartOpen(false)}>
      Close
    </button>
  );

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button type="button" onClick={() => setIsCartOpen(false)}>
          Close
        </button>
        <button type="button">Checkout</button>
      </>
    );
  }

  return (
    <>
      <Modal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        title="Your Cart"
        actions={modalActions}
      >
        <Cart />
      </Modal>
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button type="button" onClick={handleOpenCartClick}>
            Cart ({cartQuantity})
          </button>
        </p>
      </header>
    </>
  );
};

export default Header;
