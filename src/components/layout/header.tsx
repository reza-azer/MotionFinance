
'use client';

import React from 'react';
import Logo from '@/components/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
      { href: '/', label: 'Dasbor' },
      { href: '/transactions', label: 'Transaksi' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4 justify-between gap-8">
        <Logo />
        <nav className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
                <Button key={link.href} variant="link" asChild className={cn(
                    "text-muted-foreground transition-colors hover:text-primary hover:no-underline",
                    isActive(link.href) && "text-primary"
                )}>
                    <Link href={link.href}>
                        {link.label}
                    </Link>
                </Button>
            ))}
        </nav>
        <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu />
                        <span className='sr-only'>Buka Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className='mt-8 flex flex-col gap-4'>
                    {navLinks.map((link) => (
                        <Button key={link.href} variant="ghost" asChild className={cn(
                            "text-muted-foreground transition-colors justify-start text-lg",
                             isActive(link.href) && "text-primary"
                        )} onClick={() => setIsOpen(false)}>
                            <Link href={link.href}>
                                {link.label}
                            </Link>
                        </Button>
                    ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
