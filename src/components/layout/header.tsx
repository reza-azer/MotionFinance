import React from 'react';
import Logo from '@/components/logo';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center mx-auto px-4">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
