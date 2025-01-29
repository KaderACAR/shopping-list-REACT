import React from "react";
import { Table, Button } from "react-bootstrap";

interface Product {
  id: string;
  name: string;
  shop: string;
  category: string;
  isBought: boolean;
}

interface ProductTableProps {
  products: Product[];
  toggleBought: (id: string) => void;
  deleteProduct: (id: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, toggleBought, deleteProduct }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Ürün Adı</th>
          <th>Market</th>
          <th>Kategori</th>
          <th>Durum</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} style={{ textDecoration: product.isBought ? "line-through" : "none" }}>
            <td>{product.name}</td>
            <td>{product.shop}</td>
            <td>{product.category}</td>
            <td>
              <Button variant={product.isBought ? "success" : "warning"} onClick={() => toggleBought(product.id)}>
                {product.isBought ? "Satın Alındı" : "Beklemede"}
              </Button>
            </td>
            <td>
              <Button variant="danger" onClick={() => deleteProduct(product.id)}>Sil</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductTable;
