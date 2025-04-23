import React, { useState } from 'react';
const conversionRate = 10
const RechargeModal = ({ isOpen, onClose, onRecharge }) => {
  const [amount, setAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const creditsToAdd = amount * conversionRate // ₹1 = 1 credit
      onRecharge(creditsToAdd);
      setIsProcessing(false);
      setAmount(0);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Recharge Credits</h2>

        <label className="block text-sm font-medium mb-1">Enter Amount (₹)</label>
        <input
          type="number"
          className="w-full border border-gray-300 p-2 rounded mb-4"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min={1}
        />

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handlePayment}
            disabled={amount <= 0 || isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Pay'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RechargeModal;
