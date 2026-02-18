
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Send, Calendar, Rocket, Bug, Flame, Activity } from 'lucide-react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { SiLeetcode, SiCodechef, SiHackerrank } from 'react-icons/si';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


const roles = ["Full-Stack Developer", "AI Enthusiast"];
const stats = [
    { value: "3+", label: "Years Coding", icon: <Calendar className="h-8 w-8 text-primary" />, detail: "Since 2021" },
    { value: "200+", label: "Bugs Squashed", icon: <Bug className="h-8 w-8 text-primary" />, detail: "Across multiple projects" },
    { value: "3+", label: "Live Websites", icon: <Rocket className="h-8 w-8 text-primary" />, detail: "Production-ready applications" },
    { value: "365+", label: "Days Active", icon: <Activity className="h-8 w-8 text-primary" />, detail: "GitHub contributions in 2024" },
];

const socialLinks = [
  { href: "https://github.com/BharathKiran2422", icon: <Github className="h-7 w-7" />, ariaLabel: "GitHub", isExternal: true },
  { href: "https://www.linkedin.com/in/bharath-kiran-obilisetty-289b1022b", icon: <Linkedin className="h-7 w-7" />, ariaLabel: "LinkedIn", isExternal: true },
  { href: "https://www.hackerrank.com/profile/bharathkiran2422", icon: <SiHackerrank className="h-7 w-7" />, ariaLabel: "HackerRank", isExternal: true },
  { href: "https://leetcode.com/u/Bharath_Kiran/", icon: <SiLeetcode className="h-7 w-7" />, ariaLabel: "LeetCode", isExternal: true },
  { href: "https://www.codechef.com/users/bharath2422", icon: <SiCodechef className="h-7 w-7" />, ariaLabel: "CodeChef", isExternal: true },
  { href: "/contact", icon: <Send className="h-7 w-7" />, ariaLabel: "Contact", isExternal: false },
]

/**
 * Renders animated decorative orbs in the background.
 * This is a purely visual component for aesthetic effect.
 * @returns {JSX.Element} The animated background orbs.
 */
const AnimatedOrbs = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-[spin_20s_linear_infinite]" />
    <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl animate-[spin_25s_linear_infinite_reverse]" />
    <div className="absolute -bottom-20 -left-60 h-60 w-60 rounded-full bg-violet-500/10 blur-3xl animate-[spin_15s_linear_infinite]" />
  </div>
);

/**
 * Renders the Home page of the portfolio.
 * It includes a hero section with a typing animation, a 3D-tilting profile picture, and a stats section.
 * @returns {JSX.Element} The rendered Home page.
 */
export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "40%"]);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handlePointerMove = (e: { clientX: number; clientY: number }) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const pointerX = e.clientX - rect.left;
    const pointerY = e.clientY - rect.top;

    const xPct = pointerX / width - 0.5;
    const yPct = pointerY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handlePointerMove(e);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if(e.touches[0]) {
      handlePointerMove(e.touches[0]);
    }
  };

   const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };


  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex];
      const updatedText = isDeleting
        ? currentRole.substring(0, text.length - 1)
        : currentRole.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? 75 : 150);
    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <>
      <AnimatedOrbs />
      <section id="home" className="container mx-auto min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-2 items-center gap-12 px-4 md:px-6 pt-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <h2 className="text-xl font-medium text-muted-foreground">Hi, I'm Bharath Kiran</h2>
          <h1 className="mt-2 font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Building Digital Experiences That Matter
          </h1>
          <p className="mt-4 text-xl font-medium text-primary min-h-[28px]">
            {text}<span className="animate-ping">|</span>
          </p>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            From concept to deployment, I craft web experiences that matter. Combining React.js, Next.js, and modern frameworks with strong backend skills in Node.js and Express.js, I deliver full-stack solutions that are both beautiful and functional. Currently bridging the gap between web development and AI to create smarter applications.
          </p>
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-4">
            <Button size="lg" asChild className="button-gradient-primary shadow-lg shadow-primary/20 hover:scale-105 transition-transform cursor-target">
              <Link href="/portfolio">View My Work</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="hover:bg-primary/10 hover:text-primary transition-colors cursor-target">
               <Link href="/Bharath_Kiran_Resume.pdf" download="Bharath_Kiran_Resume.pdf">Download Resume</Link>
            </Button>
          </div>
           <div className="mt-8 flex items-center justify-center lg:justify-start gap-6">
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
        </motion.div>

        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handlePointerLeave}
            onTouchStart={handleTouchMove}
            onTouchMove={handleTouchMove}
            onTouchEnd={handlePointerLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center cursor-target"
        >
            <div
                style={{
                transform: "translateZ(75px)",
                transformStyle: "preserve-3d",
                }}
                className="relative h-96 w-80 rounded-xl bg-gradient-to-br from-primary/20 to-white/10 p-2 shadow-2xl"
            >
                <motion.div
                    style={{
                        background: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
                        position: 'absolute',
                        content: '""',
                        zIndex: 2,
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        opacity: 0.4,
                    }}
                />
                <motion.div
                    style={{
                        position: 'absolute',
                        content: '""',
                        zIndex: 2,
                        width: 100,
                        height: 100,
                        top,
                        left,
                        background: "rgba(255, 255, 255, 0.2)",
                        filter: 'blur(30px)',
                        opacity: 0.5,
                        borderRadius: '100%',
                    }}
                />
                <Image
                    src="/profile_pic.png"
                    alt="Bharath's Profile Picture"
                    width={320}
                    height={384}
                    priority
                    data-ai-hint="portrait man"
                    className="relative h-full w-full rounded-lg object-cover"
                    style={{
                        transform: "translateZ(50px)",
                    }}
                />
            </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-24">
        <TooltipProvider>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
                <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                >
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300 cursor-target shadow-lg hover:shadow-primary/20"
                            >
                                {stat.icon}
                                <p className="font-headline text-4xl font-bold text-white">{stat.value}</p>
                                <p className="text-sm text-center text-muted-foreground">{stat.label}</p>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{stat.detail}</p>
                        </TooltipContent>
                    </Tooltip>
                </motion.div>
            ))}
            </div>
        </TooltipProvider>
      </section>
    </>
  );
}
