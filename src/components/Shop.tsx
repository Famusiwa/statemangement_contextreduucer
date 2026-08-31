interface ShopProp {
  children: React.ReactNode;
}

const Shop = ({ children }: ShopProp) => {
  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>

      <ul id="products">{children}</ul>
    </section>
  );
};

export default Shop;
