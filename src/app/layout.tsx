import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { TransactionsProvider } from '@/context/transactions-context';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'MotionFinance',
  description: 'Pengalaman web interaktif untuk keuangan pribadi Anda.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400&family=Poppins:wght@700&family=Space+Grotesk:wght@600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <TransactionsProvider>
          <Header />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </TransactionsProvider>
        <Toaster />
      </body>
    </html>
  );
}
