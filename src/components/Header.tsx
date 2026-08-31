import { useState } from "react";
import Modal from "../customs/Modal";
import type { CartItem } from "../lib/types";
type HeaderProps = {
  cart: {
    items: CartItem[];
  };
  onUpdateCartItemQuantity: (productId: string, amount: number) => void;
};

const Header = ({ cart, onUpdateCartItemQuantity }: HeaderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartQuantity = cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = cart.items.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0,
  );

  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

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
        <div id="cart">
          {cart.items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="cart-items">
              {cart.items.map((item) => {
                const formattedPrice = `${item.price.toFixed(2)}`;
                return (
                  <li key={item.id} className="cart-item-details">
                    <div>
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-price">
                        ({formattedPrice})
                      </span>
                    </div>

                    <div className="cart-item-actions">
                      <button
                        onClick={() => onUpdateCartItemQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateCartItemQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <p id="cart-total-price">
            Cart Total: <strong>{formattedTotalPrice}</strong>
          </p>
        </div>
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
