
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Code, HeartHandshake, Eye, Mountain, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const aboutContent = {
    introduction: {
        title: "I'm Bharath Kiran Obilisetty...",
        paragraph1: "a Computer Science graduate from ALIET, JNTUK with a passion for creating meaningful digital experiences. My journey in software development began with curiosity about how applications work and has evolved into practical expertise in building full-stack web solutions.",
        paragraph2: "Throughout my academic career and three diverse internships, I've gained comprehensive experience across the development lifecycle. From designing responsive interfaces at DataValley to identifying security vulnerabilities at Indian Servers, and now exploring data science workflows at SkillDzire, each experience has shaped my versatile skill set and problem-solving approach."
    },
    philosophy: {
        icon: <Code className="h-10 w-10 text-primary" />,
        title: "Technical Philosophy",
        description: "I believe in writing clean, maintainable code that prioritizes both functionality and user experience. Whether it's a responsive frontend built with React.js, a robust backend API with Node.js, or secure database operations with PostgreSQL, I approach every project with attention to detail and a commitment to best practices."
    },
    focus: {
        icon: <BrainCircuit className="h-10 w-10 text-primary" />,
        title: "Current Focus",
        description: "While my foundation is in full-stack web development, I'm actively expanding into AI and data science. I'm particularly interested in how machine learning can enhance web applications—from intelligent user interfaces to data-driven insights. My recent work with NLP models and data processing pipelines reflects this growing interest."
    },
    beyondCode: {
        title: "Beyond the Code",
        description: "When I'm not coding, you'll find me blogging about tech, playing badminton, hiking local trails, or cycling around Vijayawada. I believe in maintaining work-life balance and find that these activities help me approach problems with fresh perspectives.",
        activities: [
            { icon: <Eye className="h-6 w-6 text-primary" />, label: "Blogging" },
            { icon: <Bike className="h-6 w-6 text-primary" />, label: "Cycling" },
            { icon: <Mountain className="h-6 w-6 text-primary" />, label: "Hiking" },
        ]
    }
}

/**
 * Renders the About page, showcasing professional background and personal interests.
 * It uses Framer Motion for animations and displays content in a card-based layout.
 * @returns {JSX.Element} The rendered About page.
 */
const AboutPage = () => {
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

  return (
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Section 1: Introduction */}
        <div className="text-center mb-16">
            <p className="font-headline text-lg font-medium text-primary">About Me</p>
            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold font-headline tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Crafting Solutions at the Intersection of Code & Creativity
            </h1>
        </div>

        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
        >
          {/* Main Content Column */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 space-y-8"
          >
             <Card className="bg-white/5 border-white/10 backdrop-blur-sm shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-white">{aboutContent.introduction.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>{aboutContent.introduction.paragraph1}</p>
                    <p>{aboutContent.introduction.paragraph2}</p>
                </CardContent>
            </Card>

            <div className="grid sm:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full shadow-lg">
                        <CardHeader className="flex-row items-center gap-4">
                            {aboutContent.philosophy.icon}
                            <CardTitle className="font-headline text-xl text-white">{aboutContent.philosophy.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                            {aboutContent.philosophy.description}
                        </CardContent>
                    </Card>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full shadow-lg">
                        <CardHeader className="flex-row items-center gap-4">
                            {aboutContent.focus.icon}
                            <CardTitle className="font-headline text-xl text-white">{aboutContent.focus.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-muted-foreground">
                           {aboutContent.focus.description}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
          </motion.div>
          
          {/* Side Column */}
          <motion.div variants={itemVariants} className="space-y-8 md:sticky md:top-24">
             <Card className="bg-white/5 border-white/10 backdrop-blur-sm shadow-lg">
                 <CardHeader>
                    <div className="flex items-center gap-3">
                         <HeartHandshake className="h-10 w-10 text-primary" />
                        <CardTitle className="font-headline text-xl text-white">{aboutContent.beyondCode.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-6">{aboutContent.beyondCode.description}</p>
                    <div className="flex justify-around items-center">
                        {aboutContent.beyondCode.activities.map(activity => (
                            <div key={activity.label} className="flex flex-col items-center gap-2 text-muted-foreground">
                                {activity.icon}
                                <span className="text-sm">{activity.label}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20 text-center p-6 shadow-lg">
                <CardTitle className="font-headline text-xl text-white">{"Let's Connect"}</CardTitle>
                <CardContent className="p-0 mt-4">
                    <p className="text-muted-foreground mb-4">
                        Have a project in mind or want to discuss technology? I'd love to hear from you.
                    </p>
                    <Button size="lg" asChild className="button-gradient-primary shadow-lg shadow-primary/20 hover:scale-105 transition-transform cursor-target">
                        <a href="mailto:bharathkiranobilisetty@gmail.com?subject=Hello&body=I'd like to connect">Get in Touch</a>
                    </Button>
                </CardContent>
            </Card>
          </motion.div>
        </motion.div>

    </div>
  );
};

export default AboutPage;
