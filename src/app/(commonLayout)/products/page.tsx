import axios from "axios";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
};

async function getProducts(): Promise<Product[]> {
  try {
    const res = await axios.get("http://localhost:4000/product");
    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

export default async function ProductsPage() {
    console.log("LIST PAGE RENDERED");
    const products = await getProducts();
    console.log("ALL PRODUCTS:", products);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          
            <div key={product.id} className="border rounded-xl p-4 shadow-lg">
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={500}
                  height={200}
                  className="rounded-lg mb-3"
                />
              )}

              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>

              <p className="mt-2 font-bold text-lg">${product.price}</p>

              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <Link href={`/products/${product.id}`}>
                <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Read More
                </button>
              </Link>
            </div>
          
        ))}
      </div>
    </div>
  );
}
