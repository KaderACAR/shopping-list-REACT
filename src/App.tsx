import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { nanoid } from "nanoid";
import AddProduct from "./components/AddProduct";
import ProductTable from "./components/ProductTable";
import jsConfetti from "js-confetti";

interface Product {
  id: string;
  name: string;
  shop: string;
  category: string;
  isBought: boolean;
}

const shops = [
  { id: 1, name: "Migros" },
  { id: 2, name: "Teknosa" },
  { id: 3, name: "BİM" },
];

const categories = [
  { id: 1, name: "Elektronik" },
  { id: 2, name: "Şarküteri" },
  { id: 3, name: "Oyuncak" },
  { id: 4, name: "Bakliyat" },
  { id: 5, name: "Fırın" },
];

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (name: string, shopId: number, categoryId: number) => {
    const newProduct: Product = {
      id: nanoid(),
      name,
      shop: shops.find((s) => s.id === shopId)?.name || "",
      category: categories.find((c) => c.id === categoryId)?.name || "",
      isBought: false,
    };
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const toggleBought = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isBought: !product.isBought } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const allBought = products.length > 0 && products.every((p) => p.isBought);
  
  if (allBought) {
    alert("Alışveriş Tamamlandı!");
    const confetti = new jsConfetti();
    confetti.addConfetti();
  }

  return (
    <Container>
      <h1>Alışveriş Listesi</h1>
      <AddProduct addProduct={addProduct} shops={shops} categories={categories} />
      <ProductTable products={products} toggleBought={toggleBought} deleteProduct={deleteProduct} />
    </Container> 
  );

};

export default App;
