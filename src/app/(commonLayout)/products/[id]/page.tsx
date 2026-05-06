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

// ✅ FIXED: await params before destructuring
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <Image
        src={product.imageUrl || "/placeholder-image.jpg"}
        alt={product.name}
        width={500}
        height={300}
        className="rounded-lg mb-4"
      />
    </div>
  );
}