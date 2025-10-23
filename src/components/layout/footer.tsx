import React from 'react';
import { Github, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full py-6 mt-12 border-t border-border/40">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
          made with ❤️ by fahalafi
        </p>
        <div className="flex items-center space-x-4">
          <Link href="https://www.instagram.com/rezafahalafi/" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-5 w-5 text-muted-foreground transition-all hover:text-primary hover:drop-shadow-[0_0_5px_hsl(var(--primary))]" />
          </Link>
          <Link href="https://www.linkedin.com/in/rezafahalafi/" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 text-muted-foreground transition-all hover:text-primary hover:drop-shadow-[0_0_5px_hsl(var(--primary))]" />
          </Link>
          <Link href="https://github.com/reza-azer" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5 text-muted-foreground transition-all hover:text-primary hover:drop-shadow-[0_0_5px_hsl(var(--primary))]" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
