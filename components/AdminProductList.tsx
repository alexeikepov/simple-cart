"use client";

import { useState } from "react";
import { addProductAdmin, deleteProductAdmin } from "@/admin/api";
import { getFormData } from "zvijude/form/funcs";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface AdminProductListProps {
  products: Product[];
}

export default function AdminProductList({ products }: AdminProductListProps) {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  async function handleAddProduct(e) {
    const data = getFormData(e);
    await addProductAdmin(data);
    setEditingProduct(null);
  }

  async function handleRemoveProduct(productId: number) {
    await deleteProductAdmin(productId);
  }

  function handleEditProduct(product: Product) {
    setEditingProduct(product);
  }

  function handleCancelEdit() {
    setEditingProduct(null);
  }
  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Products</h1>

        <form
          onSubmit={handleAddProduct}
          className="mb-6 bg-white p-4 rounded-lg shadow"
        >
          <div className="flex gap-4">
            <input name="id" type="hidden" value={editingProduct?.id || ""} />
            <input
              name="name"
              type="text"
              placeholder="Product Name"
              defaultValue={editingProduct?.name || ""}
              className="flex-1 border rounded px-3 py-2"
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              defaultValue={editingProduct?.price || ""}
              className="w-32 border rounded px-3 py-2"
              step="0.01"
              min="0"
              required
            />
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white font-medium ${
                editingProduct
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Remove
                      </button>
                    </div>
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
