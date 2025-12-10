import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/base/Card";
import Button from "../../components/base/Button";
import BottomNav from "../../components/feature/BottomNav";
import { Wallet, Plus, Circle } from "lucide-react";

export default function WalletPage() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(500);
  const [totalExpend, setTotalExpend] = useState(200);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "debit",
      amount: 570,
      description: "Welton",
      date: "Today",
      time: "09:20 am",
      icon: "pink",
    },
    {
      id: 2,
      type: "credit",
      amount: 570,
      description: "Nathsam",
      date: "Today",
      time: "09:20 am",
      icon: "green",
    },
  ]);

  useEffect(() => {
    // Load wallet data from localStorage
    const walletData = localStorage.getItem("walletData");
    if (walletData) {
      const data = JSON.parse(walletData);
      setBalance(data.balance || 500);
      setTotalExpend(data.totalExpend || 200);
    } else {
      // Initialize wallet data
      localStorage.setItem(
        "walletData",
        JSON.stringify({ balance: 500, totalExpend: 200 })
      );
    }

    // Load transactions from localStorage
    const savedTransactions = localStorage.getItem("walletTransactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Initialize with default transactions
      localStorage.setItem("walletTransactions", JSON.stringify(transactions));
    }
  }, []);

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom">
      {/* Status Bar Area */}
      <div className="flex items-center justify-between px-6 pt-safe-top pb-2">
        <div className="flex items-center gap-1 text-sm font-semibold text-neutral-900">
          <span>9:41</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-3 border border-neutral-900 rounded-sm relative overflow-hidden">
            <div
              className="absolute inset-0 bg-neutral-900 rounded-sm"
              style={{ width: "65%" }}
            ></div>
          </div>
          <div className="w-1 h-1 bg-neutral-900 rounded-full"></div>
          <div className="w-6 h-3 border border-neutral-900 rounded-sm relative overflow-hidden">
            <div
              className="absolute inset-0 bg-neutral-900 rounded-sm m-0.5"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold text-[#0F1415]">Wallet</h1>
      </div>

      <div className="px-6 pb-24">
        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Available Balance */}
          <Card className="p-4 bg-green-700 text-white">
            <p className="text-sm opacity-90 mb-2">Available Balance</p>
            <p className="text-3xl font-bold">${balance}</p>
          </Card>

          {/* Total Expend */}
          <Card className="p-4 bg-white border-2 border-green-700">
            <p className="text-sm text-neutral-600 mb-2">Total Expend</p>
            <p className="text-3xl font-bold text-[#0F1415]">${totalExpend}</p>
          </Card>
        </div>
        {/* Add Money Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate("/wallet/add-amount")}
            className="border-green-700 text-green-700"
          >
            Add Money
          </Button>
        </div>

        {/* Transactions Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#0F1415]">
              Transactions
            </h2>
            <button className="text-green-700 font-medium text-sm">
              See All
            </button>
          </div>

          <div className="space-y-3">
            {transactions.map((txn) => (
              <Card key={txn.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        txn.icon === "pink" ? "bg-pink-100" : "bg-green-100"
                      }`}
                    >
                      {txn.icon === "pink" ? (
                        <Circle className="w-5 h-5 text-pink-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-green-700" />
                      )}
                    </div>
                    <div>
                      <p className="text-base font-medium text-[#0F1415]">
                        {txn.description}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {txn.date} at {txn.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-base font-semibold ${
                        txn.type === "credit"
                          ? "text-[#0F1415]"
                          : "text-red-600"
                      }`}
                    >
                      {txn.type === "credit" ? "" : "-"}${txn.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
