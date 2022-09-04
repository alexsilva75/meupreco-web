import React from "react";
import Product from "../models/Product";

interface ProductListItemProps {
  product: Product;
}
const ProductListItem: React.FC<ProductListItemProps> = (props) => {
  const { product } = props;
  return <li>{product.name}</li>;
};

export default ProductListItem;
