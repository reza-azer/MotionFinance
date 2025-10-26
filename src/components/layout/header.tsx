
'use client';

import React from 'react';
import Logo from '@/components/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const Header = () => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const navLinks = [
      { href: '/', label: 'Dasbor' },
      { href: '/transactions', label: 'Transaksi' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4 gap-8">
        <Logo />
        <nav className="flex items-center gap-4">
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
      </div>
    </header>
  );
};

export default Header;
