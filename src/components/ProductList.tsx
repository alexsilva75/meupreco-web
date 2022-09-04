import React from "react";
import ProductListItem from "./ProductListItem";
import Product from "../models/Product";
interface ProductListProps {
  products: Product[];
}
const ProductList: React.FC<ProductListProps> = (props) => {
  const { products } = props;
  return (
    <div>
      <ul>
        {products.map((prod) => {
          return <ProductListItem product={prod} key={prod.gtin} />;
        })}
      </ul>
    </div>
  );
};

export default ProductList;
