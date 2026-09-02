import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";
import type { ProductProps } from "../lib/types";

const Product = ({ id, image, title, price, description }: ProductProps) => {
  const { addItemToCart } = useContext(CartContext);
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="px-4 py-2">
        <div className="flex justify-between">
          <h3>{title}</h3>
          <p>
            ₦
            {price.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <p className="my-2">{description}</p>
        <button
          className="rounded-md bg-amber-300 px-3 py-1"
          type="button"
          onClick={() => addItemToCart(id)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default Product;
