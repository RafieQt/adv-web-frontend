import BuyButton from "@/components/buyButton/buyButton";
import axios from "axios";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function getProduct(id: string) {
  console.log("FRONTEND ID:", id);
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
        {
          product.stock>0 ? <p className="text-gray-600 my-2">Available</p> : <p className="text-gray-600 my-2">Unavailable</p>
        }

        <BuyButton productDetails = {product}></BuyButton>
      </div>
    </div>
  );
}
