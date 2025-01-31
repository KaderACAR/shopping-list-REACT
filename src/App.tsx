import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { nanoid } from "nanoid";
import AddProduct from "./components/AddProduct";
import ProductTable from "./components/ProductTable";
import jsConfetti from "js-confetti";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";


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
  { id: 3, name: "Acar Market" },
];

const categories = [
  { id: 1, name: "Elektronik" },
  { id: 2, name: "Şarküteri" },
  { id: 3, name: "Oyuncak" },
  { id: 4, name: "Atıştırmalık" },
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

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f0f0f0;
    background-image: url("https://tr.pinterest.com/pin/16184879906770760/");
    background-size: cover;
    background-position: center;
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

  const StyledH1 = styled.h1`
  color: #132a13;
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: underline;
`;

  return (
    <> 
     <GlobalStyle />
       <Container>
      <StyledH1>Alısveris Listesi</StyledH1>
      <AddProduct addProduct={addProduct} shops={shops} categories={categories} />
      <ProductTable products={products} toggleBought={toggleBought} deleteProduct={deleteProduct} shops={shops} categories={categories} />
    </Container> 



    </>
   );
  };
export default App;
