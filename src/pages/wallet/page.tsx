import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Card from "../../components/base/Card";
import Button from "../../components/base/Button";
import BottomNav from "../../components/feature/BottomNav";
import { FaCircle } from "react-icons/fa";

export default function WalletPage() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [totalExpend, setTotalExpend] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchWalletData = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      let { data: walletData, error: walletError } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userData.user.id)
        .single();

      if (walletError && walletError.code === 'PGRST116') {
        const { data: newWallet } = await supabase
          .from('wallets')
          .insert({ user_id: userData.user.id, balance: 500 }) // Demo starting balance
          .select()
          .single();
        walletData = newWallet;
      }

      if (walletData) {
        setBalance(Number(walletData.balance));
      }

      if (walletData?.id) {
        const { data: txns } = await supabase
          .from('wallet_transactions')
          .select('*')
          .eq('wallet_id', walletData.id)
          .order('created_at', { ascending: false });

        if (txns) {
          const formattedTxns = txns.map((t: any) => {
            const dateObj = new Date(t.created_at);
            return {
              id: t.id,
              type: t.type,
              amount: Number(t.amount),
              description: t.description || 'Transaction',
              date: dateObj.toLocaleDateString(),
              time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              icon: t.type === 'debit' ? 'pink' : 'green'
            }
          });
          setTransactions(formattedTxns);

          const expend = txns
            .filter((t: any) => t.type === 'debit')
            .reduce((sum: number, t: any) => sum + Number(t.amount), 0);
          setTotalExpend(expend);
        }
      }
    };

    fetchWalletData();
  }, []);

  return (
    <div className="min-h-screen bg-white safe-top safe-bottom">
      {/* Header */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold text-[#0F1415]">Wallet</h1>
      </div>

      <div className="px-6 pb-24">
        {/* Balance Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Available Balance */}
          <Card className="p-4 bg-white border-2 border-[#66BD59]">
            <p className="text-sm opacity-90 mb-2">Available Balance</p>
            <p className="text-3xl font-bold">${balance}</p>
          </Card>

          {/* Total Expend */}
          <Card className="p-4 bg-white border-2 border-[#66BD59]">
            <p className="text-sm text-neutral-600 mb-2">Total Expend</p>
            <p className="text-3xl font-bold text-[#0F1415]">${totalExpend}</p>
          </Card>
        </div>
        {/* Add Money Button */}
        <div className="mb-6">
          <div className="rounded-xl p-[2px] bg-gradient-to-r from-[#34C0CA] to-[#66BD59]">
            <button
              onClick={() => navigate("/wallet/add-amount")}
              className="w-full bg-white rounded-[10px] px-6 py-3 font-semibold text-[#0F1415] flex items-center justify-center hover:bg-neutral-50 transition-all min-h-[48px]"
            >
              Add Money
            </button>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#0F1415]">
              Transactions
            </h2>
            <button className="text-[#66BD59] font-medium text-sm">
              See All
            </button>
          </div>

          <div className="space-y-3">
            {transactions.map((txn) => (
              <Card key={txn.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.icon === "pink" ? "bg-pink-100" : "bg-green-100"
                        }`}
                    >
                      {txn.icon === "pink" ? (
                        <FaCircle className="w-5 h-5 text-pink-600" />
                      ) : (
                        <FaCircle className="w-5 h-5 text-[#66BD59]" />
                      )}
                    </div>
                    <div>
                      <p className="text-base font-medium text-[#0F1415]">
                        {txn.description}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {txn.date} at {txn.time}
                      </p>
                      <p className="text-sm border border-neutral-200 rounded px-2 py-0.5 mt-1 inline-block capitalize">
                        {txn.status || 'completed'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-base font-semibold ${txn.type === "credit"
                        ? "text-[#0F1415]"
                        : "text-red-600"
                        }`}
                    >
                      {txn.type === "credit" ? "+" : "-"}${Number(txn.amount).toFixed(2)}
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
