import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { LayoutDashboard, PlusCircle } from 'lucide-react';
import Logo from '@/components/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-background">
       <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="p-4">
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/">
                    <SidebarMenuButton asChild isActive={isActive('/')} tooltip="Dashboard">
                        <>
                            <LayoutDashboard />
                            <span>Dasbor</span>
                        </>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <Link href="/transactions">
                    <SidebarMenuButton asChild isActive={isActive('/transactions')} tooltip="Transaksi">
                        <>
                            <PlusCircle />
                            <span>Transaksi</span>
                        </>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <SidebarInset>
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </SidebarInset>
    </div>
  );
}
