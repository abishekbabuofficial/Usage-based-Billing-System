import React, { useState } from "react";
import UsageButton from "./UsageButton";
import CreditChart from "./CreditChart";
import RechargeModal from "./RechargeModal";
import { useBilling } from "../hooks/useBilling";


const BillingComponent = () => {
  const [showModal, setShowModal] = useState(false); // for showing payment modal card
  const { credits, usageLog, applyBilling, recharge } = useBilling(100);

  const handleRecharge = (amount) => {
    recharge(amount);
  };

  const handleUsage = (label, cost) => {
    const success = applyBilling(cost);
    if (success) {
      usageLog[usageLog.length - 1].label = label;
    }
  };


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Usage-Based Billing</h1>
      <div className="text-lg border p-4 w-[250px] space-y-3 h-[150px] flex flex-col justify-between rounded-2xl">
        
        <span>Credits Remaining: <strong>{credits}</strong></span>
        {credits < 10 && (
          <div className="text-red-600 font-semibold text-[14px]">
            ⚠️ You're running low on credits!
          </div>
        )}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => setShowModal(true)}
        >
        Recharge Credits
      </button>
          </div>
      <RechargeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onRecharge={handleRecharge}
      />
      <div className="flex gap-4">
        <UsageButton label="Table Actions" cost={0.5} onUse={handleUsage} />
        <UsageButton label="Download Report" cost={10} onUse={handleUsage} />
        <UsageButton label="Power Tables" cost={5} onUse={handleUsage} />
      </div>

      <CreditChart data={usageLog} />
    </div>
  );
};

export default BillingComponent;
