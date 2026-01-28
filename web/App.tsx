
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/Dashboard';
import { TransactionsView } from './components/Transactions';
import { TransactionModal } from './components/TransactionModal';
import { AccountModal } from './components/AccountModal';
import { AccountsView } from './components/Accounts';
import { ReceivablesView } from './components/Receivables';
import { PayablesView } from './components/Payables';
import { FlowsView } from './components/Flows';
import { FlowModal } from './components/FlowModal';
import { DREView } from './components/DRE';
import { AIInsightsView } from './components/AIInsights';
import { SubscriptionView } from './components/Subscription';
import { ProfileView } from './components/Profile';
import { AuthView } from './components/Auth';
import { ViewType, Transaction, BankAccount, CreditCard, Category } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isFlowModalOpen, setIsFlowModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editingAccount, setEditingAccount] = useState<BankAccount | CreditCard | null>(null);
  const [editingFlow, setEditingFlow] = useState<Category | null>(null);

  // If not logged in, only show the Auth view
  if (!isLoggedIn) {
    return <AuthView onLogin={() => setIsLoggedIn(true)} />;
  }

  const handleOpenNewTransaction = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenNewAccount = () => {
    setEditingAccount(null);
    setIsAccountModalOpen(true);
  };

  const handleOpenNewFlow = () => {
    setEditingFlow(null);
    setIsFlowModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleEditAccount = (account: BankAccount | CreditCard) => {
    setEditingAccount(account);
    setIsAccountModalOpen(true);
  };

  const handleEditFlow = (flow: Category) => {
    setEditingFlow(flow);
    setIsFlowModalOpen(true);
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'transactions':
        return (
          <TransactionsView 
            onNewTransaction={handleOpenNewTransaction} 
            onEditTransaction={handleEditTransaction}
          />
        );
      case 'accounts':
        return (
          <AccountsView 
            onNewAccount={handleOpenNewAccount} 
            onEditAccount={handleEditAccount}
          />
        );
      case 'payables':
        return (
          <PayablesView 
            onNewPayable={handleOpenNewTransaction} 
            onEditPayable={handleEditTransaction}
          />
        );
      case 'receivables':
        return (
          <ReceivablesView 
            onNewReceivable={handleOpenNewTransaction} 
            onEditReceivable={handleEditTransaction}
          />
        );
      case 'flows':
        return (
          <FlowsView 
            onNewFlow={handleOpenNewFlow} 
            onEditFlow={handleEditFlow}
          />
        );
      case 'ai':
        return <AIInsightsView />;
      case 'dre':
        return <DREView />;
      case 'profile':
        return <ProfileView />;
      case 'subscription':
         return (
           <SubscriptionView 
             isSubscribed={isSubscribed} 
             setIsSubscribed={setIsSubscribed} 
           />
         );
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] overflow-x-hidden animate-in fade-in duration-700">
      {/* Sidebar - Hidden on mobile, drawer behavior */}
      <Sidebar 
        activeView={activeView} 
        setActiveView={(view) => {
          setActiveView(view);
          setIsSidebarOpen(false); // Close sidebar on mobile after navigation
        }} 
        isSubscribed={isSubscribed}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={() => setIsLoggedIn(false)}
      />
      
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Bar */}
        <header className="lg:hidden h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <span className="text-white font-black text-xs">FF</span>
            </div>
            <span className="font-bold text-slate-800 text-sm">FinanceFlow</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 p-4 md:p-8 lg:ml-64 transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>

      {isModalOpen && (
        <TransactionModal 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={() => setIsModalOpen(false)} 
          initialData={editingTransaction}
        />
      )}

      {isAccountModalOpen && (
        <AccountModal 
          onClose={() => setIsAccountModalOpen(false)} 
          onConfirm={() => setIsAccountModalOpen(false)} 
          initialData={editingAccount}
        />
      )}

      {isFlowModalOpen && (
        <FlowModal 
          onClose={() => setIsFlowModalOpen(false)} 
          onConfirm={() => setIsFlowModalOpen(false)} 
          initialData={editingFlow}
        />
      )}
    </div>
  );
};

export default App;
