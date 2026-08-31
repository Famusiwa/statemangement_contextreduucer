type ProductProps = {
  id: string;
  image: string;
  title: string;
  price: number;
  description: string;
  onAddToCart: (id: string) => void;
};

const Product = ({
  id,
  image,
  title,
  price,
  description,
  onAddToCart,
}: ProductProps) => {
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="px-4 py-2">
        <div className="flex justify-between">
          <h3>{title}</h3>
          <p>${price.toFixed(2)}</p>
        </div>
        <p className="my-2">{description}</p>
        <button
          className="rounded-md bg-amber-300 px-3 py-1"
          type="button"
          onClick={() => onAddToCart(id)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default Product;
