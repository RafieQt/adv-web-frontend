"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Product = {
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  price: string;
  stock: number;
};

type User = {
  id: string;
  email: string;
  username: string;
  fullname: string;
};

export default function BuyButton({
  productDetails,
}: {
  productDetails: Product;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleRoute = () => {
    router.push("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/auth/me", {
          withCredentials: true,
        });

        setUser(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleBuy = async (details: Product) => {
    const info = {
      productName: details.name,
      totalAmount: 1,
      customerId: user?.id,
      status: "unpaid",
    };

    Swal.fire({
      title: "Purchase The Product?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add to the Cart!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.post(
          "http://localhost:4000/order/create",
          info,
          {
            withCredentials: true,
          },
        );
        console.log(res);
        Swal.fire({
        title: "Added to Cart!",
        text: "The Product Has Been Successfully Added to Your Cart.",
        icon: "success",
      });
      }
      
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return (
      <button
        onClick={() => handleBuy(productDetails)}
        className="hover:cursor-pointer px-3 bg-red-500 text-white rounded-md py-1 hover:bg-red-800"
      >
        Buy now!
      </button>
    );
  }

  return (
    <button
      onClick={handleRoute}
      className="hover:cursor-pointer px-3 bg-red-500 text-white rounded-md py-1 hover:bg-red-800"
    >
      Sign in to purchase!
    </button>
  );
}
