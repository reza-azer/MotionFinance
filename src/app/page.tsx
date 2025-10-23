import { TransactionsProvider } from '@/context/transactions-context';
import Header from '@/components/layout/header';
import Dashboard from '@/components/dashboard/dashboard';
import TransactionsView from '@/components/transactions/transactions-view';
import { FinancialHealthProvider } from '@/context/financial-health-context';
import { BudgetProvider } from '@/context/budget-context';

export default function Home() {
  return (
    <TransactionsProvider>
      <BudgetProvider>
        <FinancialHealthProvider>
          <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8 flex-grow">
              <div className="flex flex-col gap-12">
                <Dashboard />
                <TransactionsView />
              </div>
            </main>
          </div>
        </FinancialHealthProvider>
      </BudgetProvider>
    </TransactionsProvider>
  );
}
