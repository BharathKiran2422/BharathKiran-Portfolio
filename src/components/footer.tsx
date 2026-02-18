
import Link from 'next/link';
import { Github, Linkedin, Mountain, Send } from 'lucide-react';
import { SiLeetcode, SiCodechef, SiHackerrank } from 'react-icons/si';

const socialLinks = [
  { href: "https://github.com/BharathKiran2422", icon: <Github className="h-5 w-5" />, ariaLabel: "GitHub", isExternal: true },
  { href: "https://www.linkedin.com/in/bharath-kiran-obilisetty-289b1022b", icon: <Linkedin className="h-5 w-5" />, ariaLabel: "LinkedIn", isExternal: true },
  { href: "https://www.hackerrank.com/profile/bharathkiran2422", icon: <SiHackerrank className="h-5 w-5" />, ariaLabel: "HackerRank", isExternal: true },
  { href: "https://leetcode.com/u/Bharath_Kiran/", icon: <SiLeetcode className="h-5 w-5" />, ariaLabel: "LeetCode", isExternal: true },
  { href: "https://www.codechef.com/users/bharath2422", icon: <SiCodechef className="h-5 w-5" />, ariaLabel: "CodeChef", isExternal: true },
  { href: "mailto:bharathkiranobilisetty@gmail.com?subject=Hello&body=I'd like to connect", icon: <Send className="h-5 w-5" />, ariaLabel: "Contact", isExternal: true },
]

/**
 * Renders the footer for the website.
 * It includes a logo, copyright notice, and social media links.
 * @returns {JSX.Element} The rendered footer component.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2 cursor-target">
            <Mountain className="h-6 w-6 text-primary" />
            <span className="font-headline text-lg font-bold">BK</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Bharath Kiran Obilisetty. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
             {socialLinks.map((link) => (
                <Link 
                  key={link.ariaLabel}
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-colors cursor-target"
                  aria-label={link.ariaLabel}
                >
                  {link.icon}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
