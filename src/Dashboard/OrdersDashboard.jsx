import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

// Fetch orders with their food items and menu details
const ORDER_SELECT = `
  *,
  order_items!order_items_order_id_fkey (
    id,
    menu_items_id,
    quantity,
    price,
    menu_items!order_items_menu_items_id_fkey (*)
  )
`;

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    // Fetch an individual order with its items
    const fetchSingleOrder = async (orderId) => {
      const { data, error } = await supabase
        .from("customer_detail")
        .select(ORDER_SELECT)
        .eq("id", orderId)
        .single();

      if (error) {
        console.error("Order fetching error:", error);
        return null;
      }

      return data;
    };

    // Fetch all existing orders
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("customer_detail")
        .select(ORDER_SELECT)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
        if (mounted) setError(error.message);
        return;
      }

      if (mounted) {
        setOrders((previous) => {
          const orderMap = new Map(
            (data || []).map((order) => [order.id, order]),
          );

          previous.forEach((order) => {
            orderMap.set(order.id, order);
          });

          return Array.from(orderMap.values()).sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at),
          );
        });
      }
    };

    // Listen for new orders
    const channel = supabase
      .channel("restaurant-orders")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "customer_detail",
        },
        async (payload) => {
          // Debug: Check if Supabase sends a new order
          console.log("NEW ORDER RECEIVED:", payload.new);

          const newOrder = await fetchSingleOrder(payload.new.id);

          if (!newOrder || !mounted) return;

          setOrders((previous) => [
            newOrder,
            ...previous.filter((order) => order.id !== newOrder.id),
          ]);

          setNotification(`New Order #${newOrder.id} from ${newOrder.name}`);
        },
      )
      .subscribe((status) => {
        console.log("Realtime status:", status);
      });

    fetchOrders();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  console.log("Orders:", orders);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold">Restaurant Dashboard</h1>

      {/* New order notification */}
      {notification && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mt-5">
          🔔 {notification}
        </div>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {/* All orders */}
      <div className="grid gap-6 mt-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm">
            {/* Order heading */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Order #{order.id}</h2>

              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                {order.status}
              </span>
            </div>

            {/* Customer information */}
            <div className="mt-5 space-y-2">
              <p>
                <strong>Customer:</strong> {order.name}
              </p>
              <p>
                <strong>Phone:</strong> {order.phone}
              </p>
              <p>
                <strong>Address:</strong> {order.address}
              </p>
            </div>

            {/* Ordered food items */}
            <div className="mt-6 border-t pt-5">
              <h3 className="text-lg font-semibold mb-4">Ordered Items</h3>

              <div className="space-y-4">
                {order.order_items?.map((item) => {
                  const menuItem = Array.isArray(item.menu_items)
                    ? item.menu_items[0]
                    : item.menu_items;

                  const itemName =
                    menuItem?.Name ||
                    menuItem?.name ||
                    `Menu Item #${item.menu_items_id}`;

                  const itemImage = menuItem?.image_url || menuItem?.image;

                  const unitPrice = Number(item.price);
                  const quantity = Number(item.quantity);

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 border-b pb-4"
                    >
                      <div className="flex items-center gap-3">
                        {itemImage && (
                          <img
                            src={itemImage}
                            alt={itemName}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        )}

                        <div>
                          <h4 className="font-semibold">{itemName}</h4>
                          <p className="text-sm text-gray-500">
                            {quantity} × Rs. {unitPrice.toLocaleString("en-PK")}
                          </p>
                        </div>
                      </div>

                      <p className="font-semibold">
                        Rs. {(unitPrice * quantity).toLocaleString("en-PK")}
                      </p>
                    </div>
                  );
                })}

                {(!order.order_items || order.order_items.length === 0) && (
                  <p className="text-gray-500">
                    No items found for this order.
                  </p>
                )}
              </div>
            </div>

            {/* Final order total */}
            <div className="flex justify-between border-t pt-5 mt-5">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-xl font-bold text-green-700">
                Rs. {Number(order.total).toLocaleString("en-PK")}
              </span>
            </div>
          </div>
        ))}

        {orders.length === 0 && !error && (
          <p className="text-gray-500">No orders received yet.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersDashboard;
