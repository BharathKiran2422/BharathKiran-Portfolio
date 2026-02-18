
"use client"


import React, { useState, useEffect } from "react"
import { StaggeredMenu } from "./StaggeredMenu"
import Link from "next/link"
import { Github, Linkedin, Mountain, Send } from "lucide-react"
import { SiCodechef, SiHackerrank, SiLeetcode } from "react-icons/si"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/", label: "Home", ariaLabel: "Home" },
  { href: "/portfolio", label: "Portfolio", ariaLabel: "Portfolio" },
  { href: "/resume", label: "Resume", ariaLabel: "Resume" },
  { href: "/about", label: "About", ariaLabel: "About" },
  { href: "/gallery", label: "Gallery", ariaLabel: "Gallery" },
  { href: "/contact", label: "Contact", ariaLabel: "Contact" },
]

const socialItems = [
  { label: 'GitHub', link: "https://github.com/BharathKiran2422", icon: <Github /> },
  { label: 'LinkedIn', link: "https://www.linkedin.com/in/bharath-kiran-obilisetty-289b1022b", icon: <Linkedin /> },
  { label: 'HackerRank', link: "https://www.hackerrank.com/profile/bharathkiran2422", icon: <SiHackerrank /> },
  { label: 'LeetCode', link: "https://leetcode.com/u/Bharath_Kiran/", icon: <SiLeetcode /> },
  { label: 'CodeChef', link: "https://www.codechef.com/users/bharath2422", icon: <SiCodechef /> },
  { label: 'Contact', link: "mailto:bharathkiranobilisetty@gmail.com?subject=Hello&body=I'd like to connect", icon: <Send /> },
]

/**
 * Renders the main header and navigation menu for the website.
 * It uses the StaggeredMenu component for an animated, full-screen menu experience.
 * @returns {JSX.Element} The rendered header component.
 */
export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const menuItems = navLinks.map(navLink => {
    const isActive = pathname === navLink.href;
    return {
        ...navLink,
        linkComponent: (
          <Link href={navLink.href} className="sm-panel-item cursor-target" aria-label={navLink.ariaLabel}>
              <span className="sm-panel-itemLabel" style={isActive ? { color: 'var(--sm-accent, hsl(var(--primary)))' } : {}}>
                {navLink.label}
              </span>
          </Link>
        )
    }
  });
    
  return (
    <>
      {isClient && (
        <StaggeredMenu
          scrolled={scrolled}
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={['hsl(var(--background))', 'hsl(var(--background))', 'hsl(var(--background))', 'hsl(var(--background))']}
          accentColor="hsl(var(--primary))"
          logoComponent={
            <Link href="/" className="flex items-center gap-2 font-bold text-white font-headline text-lg cursor-target">
              <Mountain className="h-6 w-6 text-primary" />
              <span>BK</span>
            </Link>
          }
        />
      )}
    </>
  );
}
