import { useState } from "react";
import { toast } from "sonner";

// This hooks takes input of intial value and returns current credits balance, usageLogs, applyBilling()
// will take cost of action as input and gives deducts from the credit balance, recharge() takes cost
// as input which will update the credit balance with conversion rate
// input: useBilling(initial) => initial value
// applybilling(cost) => cost of action
// recharge(cost,multiplier) => payment cost


export const useBilling = (initial = 100) => {
  const [credits, setCredits] = useState(initial);
  const [usageLog, setUsageLog] = useState([
    { time: new Date().toLocaleTimeString(), credits: initial, label: "" },
  ]);

  const checkThreshold = (creditsLeft) => {
    const percentage = (creditsLeft / initial) * 100;

    if (percentage <= 10) {
      toast.error("⚠️ Credits critically low! Please recharge soon.");
    } else if (percentage < 25) {
      toast("⚠️ Credits getting lower than 25%!", {
        icon: "⚠️",
        style: {
          border: "1px solid #facc15",
          padding: "8px",
          color: "#92400e",
        },
        duration: 4000,
      });
    } else if (percentage < 50) {
      toast("Credits getting lower than 50%", {
        icon: "ℹ️",
        style: {
          border: "1px solid #facc15",
          padding: "8px",
          color: "#92400e",
        },
        duration: 4000,
      });
    }
  };

  const applyBilling = (cost,label) => {
    if (credits < cost) {
      toast.error("Insufficient credits!");
      return false;
    }

    const newCredits = credits - cost;
    setCredits(newCredits);
    setUsageLog((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        credits: newCredits,
        label: `Used ${cost} credits for ${label}`,
      },
    ]);

    checkThreshold(newCredits);
    return true;
  };

  const recharge = (cost,multiplier) => {
    let creditsToAdd = cost*multiplier;
    const updatedCredits = credits + creditsToAdd;
    setCredits(updatedCredits);
    setUsageLog((prev) => [
      ...prev,
      {
        time: new Date().toLocaleTimeString(),
        credits: updatedCredits,
        label: "Credit Recharge",
      },
    ]);
    toast.success(`Recharged ${creditsToAdd} credits!`);
  };

  return {
    credits,
    usageLog,
    applyBilling,
    recharge,
  };
};
