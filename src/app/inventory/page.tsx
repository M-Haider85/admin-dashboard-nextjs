'use client';

import { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const initialProducts: Product[] = [
  { id: 1, name: 'T-Shirt', price: 15, stock: 50 },
  { id: 2, name: 'Jeans', price: 40, stock: 30 },
  { id: 3, name: 'Jacket', price: 60, stock: 20 },
];

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;
    const newItem: Product = {
      id: products.length + 1,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
    };
    setProducts([...products, newItem]);
    setNewProduct({ name: '', price: '', stock: '' });
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Inventory Management</h2>
      
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <Input
          placeholder="Price"
          type="number"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <Input
          placeholder="Stock"
          type="number"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
        />
        <Button onClick={handleAddProduct} className="flex items-center gap-2">
          <Plus size={16} /> Add
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price ($)</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                    <Trash size={16} className="text-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
