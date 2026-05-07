import axios from "axios";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function getProduct(id: string) {
  console.log("🔥 FRONTEND ID:", id);
  try {
    const res = await axios.get(`http://localhost:4000/product/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return <p>Product not Available</p>;

  return (
    <div className="p-6 w-7xl mx-auto flex gap-12">
      <div>
        <Image
          src={product.imageUrl || "/placeholder-image.jpg"}
          alt={product.name}
          width={500}
          height={300}
          className="rounded-lg mb-4"
        />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600 mt-2">Description: {product.description}</p>
        <p className="text-xl font-semibold mt-4">Price: {product.price}Tk</p>
        <p className="text-gray-600 my-2">Stock: {product.stock}</p>
        <form>
          <label>Amount: </label>
          <input type="number" className="border-1 border-gray-600 rounded-md p-1 mr-2" name="" id="" />
          <button className="hover:cursor-pointer px-3 bg-red-500 text-white rounded-md py-1 hover:bg-red-800">
            Buy now!
          </button>
        </form>
      </div>
    </div>
  );
}
