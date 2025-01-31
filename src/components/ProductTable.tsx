import { useState, useEffect, useMemo } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';

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
  shops: { id: number; name: string }[]; 
  categories: { id: number; name: string }[]; 
}

const fuzzyMatch = (text: string, search: string) => {
  const cleanText = text.toLowerCase().replace(/\s/g, '');
  const cleanSearch = search.toLowerCase().replace(/\s/g, '');
  
  let searchIndex = 0;
  for (let i = 0; i < cleanText.length; i++) {
    if (cleanText[i] === cleanSearch[searchIndex]) {
      searchIndex++;
      if (searchIndex === cleanSearch.length) return true;
    }
  }
  return false;
};

const ProductTable: React.FC<ProductTableProps> = ({ products, toggleBought, deleteProduct, shops, categories  }) => {

  const [filteredShop, setFilteredShop] = useState<string>('all');
  const [filteredCategory, setFilteredCategory] = useState<string>('all');
  const [filteredStatus, setFilteredStatus] = useState<string>('all');
  const [filteredName, setFilteredName] = useState<string>('');
  const [debouncedName, setDebouncedName] = useState<string>('');

  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedName(filteredName);
    }, 300);
    return () => clearTimeout(handler);
  }, [filteredName]);

 
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
 
      if (filteredShop !== 'all' && product.shop !== filteredShop) return false;
      
    
      if (filteredCategory !== 'all' && product.category !== filteredCategory) return false;
      
      if (filteredStatus !== 'all') {
        if (filteredStatus === 'bought' && !product.isBought) return false;
        if (filteredStatus === 'notBought' && product.isBought) return false;
      }
      
     
      if (debouncedName && !fuzzyMatch(product.name, debouncedName)) return false;
      
      return true;
    });
  }, [products, filteredShop, filteredCategory, filteredStatus, debouncedName]);


  const uniqueShops = useMemo(() => shops, [shops]);
  const uniqueCategories = useMemo(() => categories, [categories]);

  return (
    <div>
  
      <div className="mb-3 p-3 border rounded">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Ürün ara..."
            value={filteredName}
            onChange={(e) => setFilteredName(e.target.value)}
          />
        </InputGroup>

        <div className="row g-3">
          <div className="col-md-3">
            <Form.Select 
              value={filteredShop} 
              onChange={(e) => setFilteredShop(e.target.value)}
            >
              <option value="all">Tüm Marketler</option>
              {uniqueShops.map(shop => (
                <option key={shop.id} value={shop.name}>{shop.name}</option>
              ))}
            </Form.Select>
          </div>

          <div className="col-md-3">
            <Form.Select
              value={filteredCategory}
              onChange={(e) => setFilteredCategory(e.target.value)}
            >
              <option value="all">Tüm Kategoriler</option>
              {uniqueCategories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </Form.Select>
          </div>


          <div className="col-md-6">
            <div className="d-flex gap-3">
              <Form.Check
                type="radio"
                label="Tümü"
                name="statusFilter"
                value="all"
                checked={filteredStatus === 'all'}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Satın Alındı"
                name="statusFilter"
                value="bought"
                checked={filteredStatus === 'bought'}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Satın Alınmadı"
                name="statusFilter"
                value="notBought"
                checked={filteredStatus === 'notBought'}
                onChange={(e) => setFilteredStatus(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

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
          {filteredProducts.map((product) => (
            <tr 
              key={product.id} 
              style={{ textDecoration: product.isBought ? "line-through" : "none" }}
            >
              <td>{product.name}</td>
              <td>{product.shop}</td>
              <td>{product.category}</td>
              <td>
                <Button 
                  variant={product.isBought ? "success" : "warning"} 
                  onClick={() => toggleBought(product.id)}
                >
                  {product.isBought ? "Satın Alındı" : "Beklemede"}
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => deleteProduct(product.id)}>
                  Sil
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;