import React, { useState } from 'react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Mustafiz ahsan', username: '@mustafiz123', email: 'example@gmail.com' },
    { id: 2, name: 'Anik', username: '@anik1', email: 'example@gmail.com' },
    { id: 3, name: 'GigaChad', username: '@gigachad2', email: 'example@gmail.com' },
  ]);
  const [musicians, setMusicians] = useState([
    { name: 'Life in a bubble', rank: 'Bronze', followers: '2.5K follows' },
    { name: "Everything's block", rank: 'Gold', followers: '3K follows' },
    { name: 'Cancelled Artist', rank: 'Platinum', followers: 'New Artist' },
  ]);
  const [rewardConfig, setRewardConfig] = useState({
    activityPoints: { login: 10, post: 20, comment: 5 },
    tiers: { bronze: { discount: 5, benefits: 'Basic support' }, gold: { discount: 10, benefits: 'Priority support' }, platinum: { discount: 15, benefits: 'Exclusive content' } },
    expiryDays: 30,
    redemptionRate: 100,
  });

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleDeleteMusician = (index) => {
    setMusicians(musicians.filter((_, i) => i !== index));
  };

  const handleRewardChange = (section, key, value) => {
    setRewardConfig(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
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
            <h1 className="text-2xl">User Management</h1>
            <button className="bg-gray-700 px-4 py-2 rounded">Manage</button>
          </div>
          <div>
            {users.map(user => (
              <div key={user.id} className="flex items-center mb-4 p-4 bg-gray-800 rounded">
                <span className="mr-4">{user.id}</span>
                <img src="https://via.placeholder.com/50" alt="profile" className="mr-4" />
                <div>
                  <div>{user.name}</div>
                  <div className="text-gray-400">{user.username}</div>
                </div>
                <div className="ml-auto">{user.email}</div>
                <button onClick={() => handleDeleteUser(user.id)} className="ml-4 bg-red-600 px-2 py-1 rounded">Delete</button>
              </div>
            ))}
          </div>
          <h2 className="text-xl mt-6 mb-4">Musician Profiles</h2>
          <div className="grid grid-cols-3 gap-4">
            {musicians.map((musician, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded relative">
                <img src="https://via.placeholder.com/150" alt="profile" className="w-full mb-2" />
                <div>{musician.name}</div>
                <div className="text-yellow-400">{musician.rank}</div>
                <div className="text-gray-400">{musician.followers}</div>
                <select className="mt-2 w-full bg-gray-700 p-1 rounded">
                  <option>Select Rank</option>
                  <option>Bronze</option>
                  <option>Gold</option>
                  <option>Platinum</option>
                </select>
                <button onClick={() => handleDeleteMusician(index)} className="mt-2 bg-red-600 w-full py-1 rounded">Delete</button>
                <button className="mt-2 bg-gray-700 w-full py-1 rounded">Ban Account</button>
              </div>
            ))}
          </div>
          <button className="mt-4 bg-blue-600 px-4 py-2 rounded">Save Changes</button>
          <div className="mt-6">
            <h2 className="text-xl mb-4">Reward System Configuration</h2>
            <div className="space-y-4">
              <div>
                <h3>Activity Points</h3>
                {Object.entries(rewardConfig.activityPoints).map(([key, value]) => (
                  <div key={key} className="flex space-x-2">
                    <span>{key}</span>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => handleRewardChange('activityPoints', key, parseInt(e.target.value))}
                      className="bg-gray-700 p-1 rounded w-20"
                    />
                  </div>
                ))}
              </div>
              <div>
                <h3>Tiers</h3>
                {Object.entries(rewardConfig.tiers).map(([tier, data]) => (
                  <div key={tier} className="space-y-2">
                    <span>{tier}</span>
                    <div className="flex space-x-2">
                      <span>Discount</span>
                      <input
                        type="number"
                        value={data.discount}
                        onChange={(e) => handleRewardChange('tiers', tier, { ...data, discount: parseInt(e.target.value) })}
                        className="bg-gray-700 p-1 rounded w-20"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <span>Benefits</span>
                      <input
                        type="text"
                        value={data.benefits}
                        onChange={(e) => handleRewardChange('tiers', tier, { ...data, benefits: e.target.value })}
                        className="bg-gray-700 p-1 rounded w-40"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <span>Expiry Days</span>
                <input
                  type="number"
                  value={rewardConfig.expiryDays}
                  onChange={(e) => handleRewardChange('expiryDays', 'expiryDays', parseInt(e.target.value))}
                  className="bg-gray-700 p-1 rounded w-20"
                />
              </div>
              <div className="flex space-x-2">
                <span>Redemption Rate</span>
                <input
                  type="number"
                  value={rewardConfig.redemptionRate}
                  onChange={(e) => handleRewardChange('redemptionRate', 'redemptionRate', parseInt(e.target.value))}
                  className="bg-gray-700 p-1 rounded w-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;