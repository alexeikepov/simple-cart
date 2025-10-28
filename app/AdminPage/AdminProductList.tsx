"use client";

import Nav from "@/components/Nav";
import { addProductAdmin } from "@/admin/api";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface AdminProductListProps {
  products: Product[];
}

export default function AdminProductList({ products }: AdminProductListProps) {
  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    await addProductAdmin({
      name: formData.get("name") as string,
      price: Number(formData.get("price")),
    });

    window.location.reload();
  }
  return (
    <div>
      <Nav />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Products</h1>

        <form
          onSubmit={handleAddProduct}
          className="mb-6 bg-white p-4 rounded-lg shadow"
        >
          <div className="flex gap-4">
            <input
              name="name"
              type="text"
              placeholder="Product Name"
              className="flex-1 border rounded px-3 py-2"
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              className="w-32 border rounded px-3 py-2"
              step="0.01"
              min="0"
              required
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Add Product
            </button>
          </div>
        </form>

        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
