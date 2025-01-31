import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";


interface AddProductProps {
  addProduct: (name: string, shopId: number, categoryId: number) => void;
  shops: { id: number; name: string }[];
  categories: { id: number; name: string }[];
}

const AddProduct: React.FC<AddProductProps> = ({ addProduct, shops, categories }) => {
  const [name, setName] = useState("");
  const [shopId, setShopId] = useState<number>(shops[0]?.id || 0);
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() !== "") {
      addProduct(name, shopId, categoryId);
      setName("");
    }
  };


  return (
    <Form onSubmit={handleSubmit} className="mb-3 ">
      <Form.Group controlId="productName">
        <Form.Label style={{fontFamily:"sans-serif", fontSize:"18px", color:"#4f772d"}}>Ürün Adı</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{borderColor:"#4f772d"}}
          required
        />
      </Form.Group>
      <Form.Group controlId="shopSelect">
        <Form.Label style={{fontFamily:"sans-serif", fontSize:"18px", color:"#4f772d"}}>Market</Form.Label>
        <Form.Control
          as="select"
          value={shopId}
          onChange={(e) => setShopId(Number(e.target.value))}
          style={{borderColor:"#4f772d"}}
        >
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id}>{shop.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="categorySelect">
        <Form.Label style={{fontFamily:"sans-serif", fontSize:"18px", color:"#4f772d"}}>Kategori</Form.Label>
        <Form.Control
          as="select"
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          style={{borderColor:"#4f772d"}}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button style={{background:"#4f772d", borderColor:"#4f772d"}} type="submit" className="mt-3">Ekle</Button>
    </Form>
  );
};

export default AddProduct;
