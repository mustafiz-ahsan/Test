import React, { useState } from 'react';

const OrderBookingManagement = () => {
  const [orders, setOrders] = useState([
    { id: 1, user: 'Mustafiz ahsan', date: '2025-05-06', status: 'Pending' },
    { id: 2, user: 'Anik', date: '2025-05-05', status: 'Confirmed' },
    { id: 3, user: 'GigaChad', date: '2025-05-04', status: 'Shipped' },
  ]);

  const handleCancelOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex">
        <div className="w-1/5">
          <h2 className="text-xl mb-4">Resonance</h2>
          <ul className="space-y-4">
            <li>User Management</li>
            <li>Reward System</li>
            <li>Inventory</li>
            <li>Orders and Bookings</li>
            <li>Profile</li>
            <li>Settings</li>
            <li>Log out</li>
          </ul>
        </div>
        <div className="w-4/5 ml-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl">Orders and Bookings</h1>
            <button className="bg-gray-700 px-4 py-2 rounded">Manage</button>
          </div>
          <div>
            {orders.map(order => (
              <div key={order.id} className="flex items-center mb-4 p-4 bg-gray-800 rounded">
                <span className="mr-4">{order.id}</span>
                <div>
                  <div>{order.user}</div>
                  <div className="text-gray-400">{order.date}</div>
                  <div className="text-gray-400">{order.status}</div>
                </div>
                <button onClick={() => handleCancelOrder(order.id)} className="ml-auto bg-red-600 px-2 py-1 rounded">Cancel</button>
              </div>
            ))}
          </div>
          <button className="mt-4 bg-blue-600 px-4 py-2 rounded">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default OrderBookingManagement;