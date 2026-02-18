
'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { AtSign, Linkedin, MapPin, Phone, Send, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { submitContactForm } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  subject: z.string().min(1, { message: 'Please select a subject.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactInfo = [
    { icon: <AtSign />, text: "bharathkiranobilisetty@gmail.com", href: "mailto:bharathkiranobilisetty@gmail.com?subject=Hello&body=I'd like to connect" },
    { icon: <Phone />, text: "+91 8639678884", href: "tel:+918639678884" },
    { icon: <Linkedin />, text: "bharath-kiran-obilisetty-289b1022b", href: "https://www.linkedin.com/in/bharath-kiran-obilisetty-289b1022b" },
    { icon: <Github />, text: "BharathKiran2422", href: "https://github.com/BharathKiran2422" },
    { icon: <MapPin />, text: "Tadepalli, Andhra Pradesh, India" },
];

const faqItems = [
    {
        question: "What is your typical project timeline?",
        answer: "A typical project timeline ranges from 2 to 8 weeks, depending on the complexity and scope of the requirements. After our initial discussion, I will provide a detailed project plan with a clear timeline and milestones.",
    },
    {
        question: "What are your rates for freelance projects?",
        answer: "My rates are project-based and depend on the scope, complexity, and technologies involved. I am happy to provide a detailed quote after we discuss your needs. I also offer special rates for non-profits and student-led projects.",
    },
    {
        question: "Do you work with clients remotely?",
        answer: "Yes, I am fully equipped to work with clients worldwide. I use modern communication tools like Slack, Zoom, and project management software to ensure our collaboration is seamless and efficient, regardless of location.",
    },
    {
        question: "What is your primary tech stack?",
        answer: "I specialize in the MERN stack (MongoDB, Express.js, React, Node.js) and particularly enjoy working with Next.js for its performance benefits. I am also experienced with TypeScript, Python, and various database solutions like PostgreSQL and Firebase. I am a quick learner and always adapt to the best tools for the job.",
    },
];

/**
 * Renders the submit button for the contact form, showing a pending state during submission.
 * This is a client component that uses the `useFormStatus` hook.
 * @returns {JSX.Element} The rendered submit button.
 */
function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="lg" disabled={pending} className="w-full button-gradient-primary shadow-lg shadow-primary/20 hover:scale-105 transition-transform cursor-target">
            {pending ? (
                <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Sending...
                </>
            ) : (
                <>
                    <Send className="mr-2 h-5 w-5" /> Send Message
                </>
            )}
        </Button>
    );
}

/**
 * Renders the Contact page with a contact form, contact information, and an FAQ section.
 * It uses React Hook Form for form management and Zod for validation.
 * @returns {JSX.Element} The rendered Contact page.
 */
export default function ContactPage() {
    const { toast } = useToast();
    
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: { name: '', email: '', subject: '', message: '' },
    });

    const onSubmit = async (data: ContactFormValues) => {
        const result = await submitContactForm(data);

        if (result.success) {
            toast({
                title: "Success!",
                description: result.message,
            });
            form.reset();
        } else {
             toast({
                variant: "destructive",
                title: "Oops! Something went wrong.",
                description: result.message,
            });
        }
    };
    

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="text-center mb-12">
                <p className="font-headline text-lg font-medium text-primary">Contact Me</p>
                <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold font-headline tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                   Let's Build Something Amazing Together
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    Have a project in mind? I'm currently available for freelance opportunities and open to full-time positions.
                </p>
            </div>

            <div className="grid md:grid-cols-5 gap-12">
                <motion.div
                    variants={itemVariants}
                    className="md:col-span-3 rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="relative flex h-3 w-3">
                            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></div>
                            <div className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></div>
                        </div>
                        <p className="text-sm text-green-400">Available for Web Development Projects | Open to Full-Time Opportunities</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                             <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="your.email@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="cursor-target">
                                        <SelectValue placeholder="Select a subject" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                        <SelectItem value="Project Discussion">Project Discussion</SelectItem>
                                        <SelectItem value="Job Opportunity">Job Opportunity</SelectItem>
                                        <SelectItem value="Collaboration">Collaboration</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Tell me about your project or opportunity..." rows={5} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <SubmitButton />
                        </form>
                    </Form>
                </motion.div>

                <motion.div
                     variants={itemVariants}
                    className="md:col-span-2 space-y-8"
                >
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <h3 className="font-headline text-xl font-bold text-white mb-4">Contact Information</h3>
                        <ul className="space-y-4">
                            {contactInfo.map((item, index) => (
                                <li key={index} className="flex items-center gap-4 text-muted-foreground">
                                    <div className="text-primary">{item.icon}</div>
                                    {item.href ? (
                                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors cursor-target">
                                            {item.text}
                                        </a>
                                    ) : (
                                        <span>{item.text}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <h3 className="font-headline text-xl font-bold text-white mb-4">Response Time</h3>
                        <p className="text-muted-foreground">Mon - Fri, 9 AM - 6 PM (IST)</p>
                        <p className="text-sm text-muted-foreground/70">Usually responds within 24 hours.</p>
                    </div>
                </motion.div>
            </div>
            
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-24"
            >
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl font-bold text-white">Frequently Asked Questions</h2>
                </div>
                <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                    {faqItems.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index+1}`}>
                            <AccordionTrigger className="cursor-target">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </motion.div>

        </div>
    );

}
