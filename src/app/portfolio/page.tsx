
'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import placeholderImages from '@/app/lib/placeholder-images.json';

type Project = {
  title: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    hint: string;
  };
  techStack: string[];
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
  status: 'Completed' | 'In Progress';
  category: ('Web Apps' | 'Full-Stack' | 'UI/UX' | 'Data Science' | 'Java' | 'Game Dev')[];
  featured?: boolean;
};

const projectsData: Project[] = [
  {
    title: "Yoloo - Fashion Platform",
    description: "A modern platform delivering fashion in 30-120 minutes. Enjoy curated collections, exclusive deals, and smart recommendations that make shopping faster, easier, and more stylish than ever.",
    image: placeholderImages.yoloo,
    techStack: ["React Native", "Node.js", "Express", "MongoDB", "Firebase"],
    links: { live: 'https://yoloo.co.in/home', github: 'https://github.com/BharathKiran2422/Yoloo' },
    status: 'Completed',
    category: ['Web Apps', 'Full-Stack'],
    featured: true,
  },
  {
    title: "MoneyMap - AI-Powered Finance Tracker",
    description: "Take Control of Your Finances. The simple, smart, and secure way to manage your money. Track spending, visualize habits, and get AI-powered insights to save more.",
    image: placeholderImages.moneymap,
    techStack: ["React Native", "Node.js", "PostgreSQL", "Firebase", "AI/ML"],
    links: { live: 'https://money-map-mm.vercel.app', github: 'https://github.com/BharathKiran2422/MoneyMap', caseStudy: '#' },
    status: 'Completed',
    category: ['Web Apps', 'Full-Stack', 'Data Science'],
  },
  {
    title: "PuckMan — Java AWT/Swing Pac-Man Clone",
    description: "Java AWT/Swing Pac-Man clone with tile-based maps, ghost AI, collision detection, and scoring system.",
    image: placeholderImages.puck_man,
    techStack: ["Java 8+", "AWT", "Swing"],
    links: { github: 'https://github.com/BharathKiran2422/PuckMan', caseStudy: '#' },
    status: 'Completed',
    category: ['Java', 'Game Dev'],
  },
  {
    title: "Gender_Age_Predition",
    description: "This project utilizes Convolutional Neural Networks (CNNs) to accurately predict the gender and age of individuals from facial images. Trained on the comprehensive UTKFace dataset, the model is adept at recognizing gender and estimating age ranges.",
    image: placeholderImages.gender_age_prediction,
    techStack: ["Python (Version 3.x)", "TensorFlow (Version 2.x)", "Keras", "OpenCV", "NumPy", "Matplotlib"],
    links: { github: 'https://github.com/BharathKiran2422/GENDER_AGE_PREDICTION_USING_CNN', caseStudy: '#' },
    status: 'Completed',
    category: ['Data Science'],
  },
  {
    title: "This Portfolio Website",
    description: "My personal portfolio site, built from scratch to showcase my skills in modern web development and design.",
    image: placeholderImages.portfolioWebsite,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    links: { live: 'https://bharath-kiran.vercel.app', github: 'https://github.com/BharathKiran2422/Bharath.Kiran-Portfolio' },
    status: 'Completed',
    category: ['UI/UX', 'Web Apps'],
  },
  /*
  {
    title: "RideTogether - AI Ride-Sharing App",
    description: "Community-based carpooling platform with AI-powered ride matching, wallet integration, and carbon footprint tracking for sustainable transportation.",
    image: placeholderImages.rideTogether,
    techStack: ["React Native", "Node.js", "PostgreSQL", "Firebase", "AI/ML"],
    links: { live: '#', github: '#', caseStudy: '#' },
    status: 'Completed',
    category: ['Web Apps', 'Full-Stack', 'Data Science'],
  },
  {
    title: "Educational CMS",
    description: "Content management system for educational institutions featuring course management, student portals, and administrative dashboards.",
    image: placeholderImages.educationalCMS,
    techStack: ["React", "Node.js", "MySQL", "Authentication"],
    links: { github: '#', caseStudy: '#' },
    status: 'Completed',
    category: ['Full-Stack', 'Web Apps'],
  },
  {
    title: "Personal Blog Platform",
    description: "A full-featured blog platform with a markdown editor, comments, and a custom-built CMS for managing posts and categories.",
    image: placeholderImages.blogPlatform,
    techStack: ["Next.js", "Tailwind CSS", "Firebase", "Markdown"],
    links: { live: '#', github: '#' },
    status: 'Completed',
    category: ['UI/UX', 'Web Apps'],
  },
  {
    title: "Task Management App",
    description: "A Kanban-style task management app with drag-and-drop functionality, user authentication, and real-time updates.",
    image: placeholderImages.taskManager,
    techStack: ["React", "Firebase", "dnd-kit"],
    links: { live: '#', github: '#' },
    status: 'Completed',
    category: ['Web Apps', 'UI/UX'],
  },
  */
];

const filters = ['All', 'Web Apps', 'Full-Stack', 'UI/UX', 'Data Science'];

const PortfolioPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') return projectsData;
        return projectsData.filter(p => p.category.includes(activeFilter as any));
    }, [activeFilter]);
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <p className="font-headline text-lg font-medium text-primary">Featured Projects</p>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold font-headline tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Real-World Applications I've Built
          </h1>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
            {filters.map(filter => (
                <Button 
                    key={filter}
                    variant={activeFilter === filter ? 'default' : 'outline'}
                    onClick={() => setActiveFilter(filter)}
                    className="transition-all cursor-target hover:scale-105"
                >
                    {filter}
                </Button>
            ))}
        </div>

        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {filteredProjects.map((project, index) => (
                <motion.div
                    key={project.title}
                    variants={itemVariants}
                    className={`group relative flex flex-col rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 cursor-target shadow-lg hover:shadow-primary/20
                        ${project.featured ? 'md:col-span-2' : ''}
                    `}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                       <Image 
                           src={project.image.src}
                           alt={project.image.alt}
                           width={project.image.width}
                           height={project.image.height}
                           data-ai-hint={project.image.hint}
                           className="w-full h-auto object-cover"
                       />
                       <div className="p-6 flex flex-col flex-grow">
                           <div className="flex justify-between items-start">
                             <h3 className="text-xl font-bold font-headline text-white mb-2">{project.title}</h3>
                             <Badge variant="secondary" className={`bg-green-500/10 text-green-400 border-green-500/20 whitespace-nowrap`}>{project.status}</Badge>
                           </div>
                           <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                           <div className="mb-4 flex flex-wrap gap-2">
                               {project.techStack.map(tech => (
                                   <Badge key={tech} variant="secondary" className="bg-primary/10 text-primary border-primary/20">{tech}</Badge>
                               ))}
                           </div>
                           <div className="flex items-center gap-4 mt-auto">
                               {project.links.live && (
                                   <Button size="sm" asChild className="button-gradient-primary cursor-target hover:scale-105 transition-transform">
                                       <Link href={project.links.live} target="_blank">
                                           <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                       </Link>
                                   </Button>
                               )}
                               {project.links.github && (
                                    <Button size="sm" variant="outline" asChild className="cursor-target hover:scale-105 transition-transform">
                                       <Link href={project.links.github} target="_blank">
                                           <Github className="mr-2 h-4 w-4" /> GitHub
                                       </Link>
                                   </Button>
                               )}
                                {project.links.caseStudy && (
                                   <Button size="sm" variant="link" asChild className="cursor-target hover:scale-105 transition-transform">
                                       <Link href={project.links.caseStudy} target="_blank">
                                            Case Study
                                       </Link>
                                   </Button>
                               )}
                           </div>
                       </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
        
        {filteredProjects.length === 0 && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-16">
                <p className="text-muted-foreground text-lg">No projects found in this category yet. Check back soon!</p>
            </motion.div>
        )}
    </div>
  );
};

export default PortfolioPage;
