import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Key, Shield, CheckCircle, AlertCircle, Users, Lock } from 'lucide-react';
export function SettingsPanel({
  currentAdmin,
  onClose
}) {
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    role: 'admin'
  });
  const [message, setMessage] = useState(null);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const admin = currentAdmin || {
    email: 'admin@example.com'
  };
  const handleAddAdmin = e => {
    e.preventDefault();
    setMessage({
      type: 'success',
      text: 'New admin invitation sent successfully'
    });
    setTimeout(() => setMessage(null), 3000);
    setNewAdmin({
      email: '',
      role: 'admin'
    });
  };
  const handleChangePassword = e => {
    e.preventDefault();
    setMessage({
      type: 'success',
      text: 'Password changed successfully'
    });
    setTimeout(() => {
      setMessage(null);
      setShowChangePassword(false);
    }, 2000);
  };
  const adminList = [{
    email: 'admin@slt.lk',
    role: 'super_admin'
  }, {
    email: 'manager@slt.lk',
    role: 'admin'
  }];
  return <div className="space-y-6">
      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <Mail className="text-blue-400" size={20} />
          <h3 className="text-lg font-semibold">Current Admin</h3>
        </div>
        <p className="text-gray-400">{admin.email}</p>
      </div>

      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <Lock className="text-blue-400" size={20} />
            <h3 className="text-lg font-semibold">Password Settings</h3>
          </div>
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} onClick={() => setShowChangePassword(!showChangePassword)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center space-x-2">
            <Key size={18} />
            <span>Change Password</span>
          </motion.button>
        </div>
        {showChangePassword && <motion.form initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} onSubmit={handleChangePassword} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Current Password
              </label>
              <input type="password" value={passwordData.current} onChange={e => setPasswordData(prev => ({
            ...prev,
            current: e.target.value
          }))} className="w-full p-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                New Password
              </label>
              <input type="password" value={passwordData.new} onChange={e => setPasswordData(prev => ({
            ...prev,
            new: e.target.value
          }))} className="w-full p-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Confirm Password
              </label>
              <input type="password" value={passwordData.confirm} onChange={e => setPasswordData(prev => ({
            ...prev,
            confirm: e.target.value
          }))} className="w-full p-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium">
              Update Password
            </button>
          </motion.form>}
      </div>

      <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <Shield className="text-blue-400" size={20} />
            <h3 className="text-lg font-semibold">Admin Management</h3>
          </div>
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} onClick={() => setShowAddAdmin(!showAddAdmin)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center space-x-2">
            <UserPlus size={18} />
            <span>Add Admin</span>
          </motion.button>
        </div>
        <div className="space-y-2 mb-4">
          {adminList.map((admin, index) => <div key={index} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Users size={18} className="text-gray-400" />
                <span>{admin.email}</span>
              </div>
              <span className="text-sm bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full border border-blue-500/30">
                {admin.role}
              </span>
            </div>)}
        </div>
        {showAddAdmin && <motion.form initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} onSubmit={handleAddAdmin} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input type="email" value={newAdmin.email} onChange={e => setNewAdmin({
            ...newAdmin,
            email: e.target.value
          })} className="w-full p-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter email address" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Role</label>
              <select value={newAdmin.role} onChange={e => setNewAdmin({
            ...newAdmin,
            role: e.target.value
          })} className="w-full p-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium">
              Send Invitation
            </button>
          </motion.form>}
      </div>

      {message && <motion.div initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} className={`p-3 rounded-lg flex items-center space-x-2 ${message.type === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
          {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </motion.div>}
    </div>;
}