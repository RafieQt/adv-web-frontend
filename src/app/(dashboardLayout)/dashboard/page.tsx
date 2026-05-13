"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/layout/navbar";
import Link from "next/link";
import Swal from "sweetalert2";

type User = {
  id: string;
  email: string;
  username: string;
  fullname: string;
};
type Order = {
  id: string;
  productName: string;
  totalAmount: number;
  status: string;
  orderDate: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/auth/me", {
          withCredentials: true,
        });

        setUser(res.data);
        console.log(res.data);
        const res1 = await axios.get(
          `http://localhost:4000/order/customer/${res.data.id}`,
          {
            withCredentials: true,
          },
        );
        console.log(res1);
        setOrders(res1.data);
        setLoading(false);
      } catch (err) {
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  const handleDeleteAccount = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `http://localhost:4000/customer/delete/${user?.username}`,
            {
              withCredentials: true,
            },
          );
          if (res.status === 200) {
            Swal.fire("Deleted!", "Your account has been deleted.", "success");
            router.push("/login");
          }
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
  console.log(orders);
  
  return (
    <div>
      <div className="flex-1 flex flex-col">
        <main className="p-6">
          <div className="bg-white p-6 rounded-2xl shadow  w-90">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">User Info</h2>

            <p>
              <strong>Name:</strong> {user?.fullname}
            </p>
            <p>
              <strong>Username:</strong> {user?.username}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <div className="flex gap-5 mt-4 justify-between px-2">
              <Link href="/editProfile">
                <button className="bg-red-500 px-3 text-white font-semibold py-1 rounded-xl hover:cursor-pointer">
                  Edit Profile
                </button>
              </Link>

              <button
                onClick={handleDeleteAccount}
                className="bg-[#111827] px-3 text-white font-semibold py-1 rounded-xl hover:cursor-pointer"
              >
                Delete Account
              </button>
            </div>
          </div>
          <div>
            <div>
              <h1 className="text-3xl text-[#111827] font-semibold my-3">Cart:</h1>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product Name</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}

                    {orders.map((order, index) => (
                      <tr key={order.id}>
                        <th>{index+1}</th>
                        <td>{order.productName}</td>
                        <td>{order.totalAmount}</td>
                        <td>{order.status}</td>
                        <td>{order.orderDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
