
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Briefcase, Building, Calendar, CheckCircle, Code, Download, GraduationCap, Mail, MapPin, User, Zap, BrainCircuit, Users, Clock, Lightbulb, TrendingUp, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SiPython, SiJavascript, SiReact, SiHtml5, SiCss3, SiTailwindcss, SiNodedotjs, SiExpress, SiMysql, SiPostgresql, SiMongodb, SiFirebase, SiGit, SiGithub, SiPostman, SiSqlalchemy } from 'react-icons/si';
import { FaJava } from "react-icons/fa";
import placeholderImages from '@/app/lib/placeholder-images.json';

const experience = [
  {
    date: 'Dec 2024 - Apr 2025',
    logo: '/skilldzire-logo.png',
    position: 'Data Science Intern',
    company: 'SkillDzire',
    description: 'Developed foundational skills in Python, data structures, and machine learning. Applied statistical analysis and NumPy/Pandas for real-world datasets. Completed hands-on projects in data preprocessing and exploratory data analysis.',
    tech: ['Python', 'Pandas', 'NumPy', 'ML Basics', 'Data Analysis'],
  },
  {
    date: 'Jun 2024 - Aug 2024',
    logo: '/datavalley-logo.png',
    position: 'Full-Stack Development Intern',
    company: 'DataValley',
    description: 'Designed and developed responsive web applications using HTML, CSS, and modern frameworks. Built backend services with optimized SQL database operations. Implemented RESTful APIs and participated in agile development cycles.',
    tech: ['HTML', 'CSS', 'JavaScript', 'SQL', 'REST APIs', 'Git'],
  },
  {
    date: 'May 2023 - Jul 2023',
    logo: '/indianservers-logo.png',
    position: 'Application Security & Pentesting Intern',
    company: 'Indian Servers',
    description: 'Conducted comprehensive security assessments on web applications including OWASP Top 10 vulnerabilities. Performed penetration testing and worked with NLP for text processing. Fine-tuned BERT models using OpenAI APIs for enhanced text analysis.',
    tech: ['Security Testing', 'OWASP', 'Python', 'NLP', 'BERT', 'OpenAI APIs'],
  },
];

const education = [
    {
        degree: 'B.Tech – Computer Science & Engineering',
        institution: 'Andhra Loyola Institute of Engineering and Technology, JNTUK',
        location: 'Vijayawada',
        logo: '/aliet.png',
        duration: '2021 – 2025',
        grade: 'CGPA: 7.4 / 10',
        percentage: 'Percentage (approx.): 70.3%',
        achievements: [
            { name: 'Leadership List 2021-25', icon: <HeartHandshake className="h-3 w-3" /> }
        ]
    },
    {
        degree: 'Intermediate - MPC',
        institution: 'Sarada Junior College',
        location: 'Vijayawada',
        logo: '/sarada.png',
        duration: '2019 – 2021',
        grade: 'Marks: 770 / 1000',
        percentage: 'Percentage: 77%',
    },
    {
        degree: 'Secondary School - SSC',
        institution: 'St. John’s E.M. High School',
        location: 'Vijayawada',
        logo: '/st.johns.png',
        duration: '2019',
        grade: 'GPA: 8.8 / 10',
        percentage: 'Percentage (approx.): 83.6%',
    },
];

const techSkills = [
    { name: 'Python', icon: <SiPython className="h-10 w-10 text-blue-400" /> },
    { name: 'Java', icon: <FaJava className="h-10 w-10 text-orange-500" /> },
    { name: 'MySQL', icon: <SiMysql className="h-10 w-10 text-blue-600" /> },
    { name: 'React', icon: <SiReact className="h-10 w-10 text-blue-500" /> },
    { name: 'Node.js', icon: <SiNodedotjs className="h-10 w-10 text-green-500" /> },
    { name: 'Firebase', icon: <SiFirebase className="h-10 w-10 text-yellow-500" /> },
    { name: 'Git', icon: <SiGit className="h-10 w-10 text-red-500" /> },
    { name: 'GitHub', icon: <SiGithub className="h-10 w-10" /> },
    { name: 'HTML5', icon: <SiHtml5 className="h-10 w-10 text-orange-600" /> },
    { name: 'CSS3', icon: <SiCss3 className="h-10 w-10 text-blue-600" /> },
    { name: 'JavaScript', icon: <SiJavascript className="h-10 w-10 text-yellow-400" /> },
];

const softSkills = [
  { name: 'Problem Solving', icon: <BrainCircuit className="h-10 w-10 text-primary" /> },
  { name: 'Communication', icon: <Users className="h-10 w-10 text-primary" /> },
  { name: 'Quick Learning', icon: <Lightbulb className="h-10 w-10 text-primary" /> },
  { name: 'Analytical Thinking', icon: <TrendingUp className="h-10 w-10 text-primary" /> },
  { name: 'Smart Work', icon: <Zap className="h-10 w-10 text-primary" /> },
  { name: 'Patience', icon: <Clock className="h-10 w-10 text-primary" /> },
];


const certifications = [
    { name: 'JobReady Employability Skills', issuer: 'Wadhwani Foundation', year: '2024', link: 'https://web.certificate.wfglobal.org/en/certificate?certificateId=66e3346a945a80ae5140716b', image: placeholderImages.certJobReady },
    { name: 'Google UX Design', issuer: 'Google', year: '2024', link: 'https://coursera.org/verify/professional-cert/THSUG3JBGR8G', image: placeholderImages.certGoogleUX },
    { name: 'Google Data Analytics', issuer: 'Google', year: '2024', link: 'https://coursera.org/verify/professional-cert/TVXEYH345HJP', image: placeholderImages.certGoogleData },
    { name: 'Computer Graphics', issuer: 'NPTEL', year: '2023', link: 'https://archive.nptel.ac.in/content/noc/NOC23/SEM2/Ecertificates/106/noc23-cs115/Course/NPTEL23CS115S4425220310036827.pdf', image: placeholderImages.certNPTEL_CG },
    { name: 'Software Testing', issuer: 'NPTEL', year: '2024', link: 'https://archive.nptel.ac.in/content/noc/NOC24/SEM2/Ecertificates/106/noc24-cs91/Course/NPTEL24CS91S45570134303961836.pdf', image: placeholderImages.certNPTEL_ST },
    { name: 'Compilers', issuer: 'Stanford-edX', year: '2024', link: 'https://courses.edx.org/certificates/ed36ccf3c43a4e1c8dd5672d3e11322c', image: placeholderImages.certCompilers },
];

const resumeProfile = {
  summary: (
    <>
      <p>
        I'm a Computer Science graduate with hands-on experience in full-stack development, specializing in React.js, Next.js, and modern JavaScript frameworks. Through internships spanning web development, application security, and data science, I've built responsive applications, conducted vulnerability assessments, and worked with data processing pipelines.
      </p>
      <p>
        Skilled in both frontend and backend technologies, I focus on creating scalable, user-centric solutions with clean code and thoughtful design. I excel in collaborative environments and continuously expand my skills through practical projects and certifications. Currently exploring AI and machine learning to integrate intelligent features into web applications.
      </p>
    </>
  ),
  highlights: [
    { icon: <Code className="h-5 w-5 text-primary" />, text: "Full-stack proficiency with modern frameworks like React.js and Next.js." },
    { icon: <Briefcase className="h-5 w-5 text-primary" />, text: "Diverse internship experience in web development, app security, and data science." },
    { icon: <User className="h-5 w-5 text-primary" />, text: "Focused on building scalable, user-centric solutions with clean code." },
    { icon: <BrainCircuit className="h-5 w-5 text-primary" />, text: "Actively exploring AI/ML to create intelligent, feature-rich applications." },
  ]
};

/**
 * Renders the Resume page, which provides a comprehensive overview of professional experience, education, skills, and certifications.
 * It uses a tabbed interface to organize the information clearly.
 * @returns {JSX.Element} The rendered Resume page.
 */
const ResumePage = () => {
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
                <p className="font-headline text-lg font-medium text-primary">My Resume</p>
                <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold font-headline tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Professional Journey
                </h1>
                <p className="mt-2 text-muted-foreground">Experience, Education & Achievements</p>
            </div>
            <Button asChild className="mt-4 md:mt-0 button-gradient-primary shadow-lg shadow-primary/20 hover:scale-105 transition-transform cursor-target">
                <Link href="/Bharath_Kiran_Resume.pdf" download="Bharath_Kiran_Resume.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                </Link>
            </Button>
        </div>

        <Tabs defaultValue="experience" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-white/5 border border-white/10 p-1 h-auto">
            <TabsTrigger value="experience" className="cursor-target">Experience</TabsTrigger>
            <TabsTrigger value="education" className="cursor-target">Education</TabsTrigger>
            <TabsTrigger value="skills" className="cursor-target">Skills</TabsTrigger>
            <TabsTrigger value="certifications" className="cursor-target">Certifications</TabsTrigger>
            <TabsTrigger value="profile" className="cursor-target">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="experience" className="mt-8">
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 h-full w-0.5 bg-primary/20" />
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="relative mb-12 cursor-target transition-all duration-300 hover:bg-white/5 p-4 rounded-lg"
                >
                  <div className="absolute -left-10 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-8 ring-background" />
                  <p className="text-sm font-semibold text-primary">{item.date}</p>
                  <h3 className="mt-1 text-xl font-bold font-headline text-white">{item.position}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <p className="text-muted-foreground">{item.company}</p>
                  </div>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tech.map((techItem) => (
                      <Badge key={techItem} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {techItem}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education" className="mt-8">
             <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                {education.map((edu, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <Card className="bg-white/5 border-white/10 cursor-target shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-transform">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="p-2 bg-white rounded-lg">
                                    <Image src={edu.logo} alt={`${edu.institution} logo`} width={48} height={48} className="h-12 w-12 object-contain"/>
                                </div>
                                <div className="flex-1">
                                    <p className="text-primary font-semibold">{edu.degree}</p>
                                    <CardTitle className="font-headline text-xl mt-1">{edu.institution}</CardTitle>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground mt-2 text-sm">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            <span>{edu.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{edu.duration}</span>
                                        </div>
                                    </div>
                                </div>
                                {edu.achievements && (
                                    <div className="flex flex-col gap-2">
                                        {edu.achievements.map((ach, i) => (
                                            <Badge key={i} variant="outline" className="border-yellow-500/30 bg-yellow-500/10 text-yellow-300 flex items-center gap-1">
                                                {ach.icon}
                                                {ach.name}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </CardHeader>
                            <CardContent className="flex justify-between items-center text-sm">
                                <Badge variant="secondary">{edu.grade}</Badge>
                                <Badge variant="outline">{edu.percentage}</Badge>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
             </motion.div>
          </TabsContent>

          <TabsContent value="skills" className="mt-8">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold text-white">Skills</h2>
                    <p className="text-muted-foreground mt-2">A showcase of my technical and soft skills, demonstrating my ability to tackle diverse challenges and collaborate effectively.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                            <CardTitle className="font-headline text-center">Technical Skills</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-3 sm:grid-cols-4 gap-6">
                            {techSkills.map(skill => (
                                <div key={skill.name} className="flex flex-col items-center justify-center gap-2 cursor-target p-2 rounded-lg transition-transform hover:-translate-y-1">
                                    {skill.icon}
                                    <span className="text-sm font-medium text-white">{skill.name}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card className="bg-white/5 border-white/10">
                        <CardHeader>
                            <CardTitle className="font-headline text-center">Soft Skills</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-3 gap-6">
                            {softSkills.map(skill => (
                                <div key={skill.name} className="flex flex-col items-center justify-center gap-2 cursor-target p-2 rounded-lg transition-transform hover:-translate-y-1">
                                    {skill.icon}
                                    <span className="text-sm font-medium text-white">{skill.name}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="certifications" className="mt-8">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {certifications.map((cert, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <Card className="bg-white/5 border-white/10 group h-full flex flex-col cursor-target shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-transform overflow-hidden">
                             <div className="overflow-hidden">
                                <Image
                                    src={cert.image.src}
                                    alt={cert.image.alt}
                                    width={cert.image.width}
                                    height={cert.image.height}
                                    data-ai-hint={cert.image.hint}
                                    className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <CardHeader className="flex-row items-center gap-4 flex-grow">
                                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                                    <Award className="h-8 w-8" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg font-headline">{cert.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{cert.issuer} - {cert.year}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="flex items-end justify-between mt-auto">
                                <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Verified
                                </Badge>
                                <Link href={cert.link} target="_blank" className="text-sm text-primary hover:underline cursor-target">
                                    View Certificate
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="profile" className="mt-8">
            <motion.div variants={itemVariants} initial="hidden" animate="visible">
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Professional Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-muted-foreground leading-relaxed space-y-4">{resumeProfile.summary}</div>
                        <div>
                            <h4 className="font-semibold text-white mb-3">Key Highlights:</h4>
                            <ul className="space-y-2">
                                {resumeProfile.highlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        {highlight.icon}
                                        <span className="text-muted-foreground">{highlight.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex items-center gap-4 pt-4">
                           <Button asChild className="button-gradient-primary shadow-lg shadow-primary/20 hover:scale-105 transition-transform cursor-target">
                                <Link href="/Bharath_Kiran_Resume.pdf" download="Bharath_Kiran_Resume.pdf">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Resume
                                </Link>
                            </Button>
                            <Button variant="outline" asChild className="hover:bg-primary/10 hover:text-primary transition-colors cursor-target hover:scale-105">
                                <Link href="https://www.linkedin.com/in/bharath-kiran-obilisetty-289b1022b" target="_blank">
                                    <User className="mr-2 h-4 w-4" />
                                    LinkedIn Profile
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
          </TabsContent>

        </Tabs>
    </div>
  );
};

export default ResumePage;
