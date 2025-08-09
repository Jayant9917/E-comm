import { useNavigate } from "react-router-dom";
import img1 from "../assets/women/aiony-haust-K0DxxljcRv0-unsplash.jpg";
import img2 from "../assets/women/oleg-ivanov-ykurGtWomMw-unsplash.jpg";
import { useEffect, useState } from "react";

const MyOrders = () => {
  const [orders, SetOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching order
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "12345",
          createdAt: new Date(),
          shippingAddress: { city: "New York", country: "USA" },
          orderItems: [
            {
              name: "Product 1",
              image: { url: img1 },
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          _id: "34567",
          createdAt: new Date(),
          shippingAddress: { city: "Deoband", country: "USA" },
          orderItems: [
            {
              name: "Product 1",
              image: { url: img2 },
            },
          ],
          totalPrice: 120,
          isPaid: true,
        },
      ];
      SetOrders(mockOrders);
    }, 1000);
  }, []);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table className="min-w-full text-left text-gray-500 whitespace-nowrap">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3 min-w-[80px]">Image</th>
              <th className="py-2 px-4 sm:py-3 min-w-[120px]">Order ID</th>
              <th className="py-2 px-4 sm:py-3 min-w-[140px]">Created At</th>
              <th className="py-2 px-4 sm:py-3 min-w-[140px]">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3 min-w-[80px]">Items</th>
              <th className="py-2 px-4 sm:py-3 min-w-[80px]">Price</th>
              <th className="py-2 px-4 sm:py-3 min-w-[100px]">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b hover:border-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <img
                      src={order.orderItems[0].image.url}
                      alt={order.orderItems[0].name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                    />
                  </td>
                  {/* order name */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4 font-bold text-gray-900">
                    #{order._id}
                  </td>
                  {/* Created at */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  {/* Shipping Address */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  {/* Order Items */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    {order.orderItems.length}
                  </td>
                  {/* Price */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    ${order.totalPrice}
                  </td>
                  {/* Status */}
                  <td className="py-2 px-2 sm:py-4 sm:px-4">
                    <span
                      className={`${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-700 text-red-700"
                      } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                    >{order.isPaid ? "Paid" : "Pending"}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="">
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  You have NO Orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
