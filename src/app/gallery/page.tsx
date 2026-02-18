
'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Maximize, ChevronDown } from 'lucide-react';
import placeholderImages from '@/app/lib/placeholder-images.json';
import { Lightbox } from '@/components/lightbox';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PhotoCategory = 'Development' | 'Events' | 'Behind the Scenes' | 'Certifications' | 'Personal' | 'Nature';

type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  hint: string;
  caption: string;
  date: string;
  category: PhotoCategory[] | PhotoCategory;
};

const photosData: Photo[] = [
  { ...placeholderImages.yoloo, caption: "Yoloo - Fashion E-Commerce Platform", date: "2025", category: "Development" },
  { ...placeholderImages.moneymap, caption: "MoneyMap - AI-Powered Finance Tracker", date: "2025", category: "Development" },
  { ...placeholderImages.gender_age_prediction, caption: "Gender & Age Prediction - ML Application", date: "2023", category: "Development" },
  { ...placeholderImages.portfolioWebsite, caption: "Personal Portfolio Website", date: "2024", category: "Development" },
  { ...placeholderImages.puck_man, caption: "PuckMan Game", date: "2026", category: ["Development", "Events"] },
  { ...placeholderImages.profilepic, caption: 'Bharath Kiran - Full Stack Developer', date: '2024', category: 'Personal' },
  { ...placeholderImages.certGoogleUX, caption: 'Google UX Design Certificate', date: '2024', category: 'Certifications' },
  { ...placeholderImages.certGoogleData, caption: 'Google Data Analytics Certificate', date: '2024', category: 'Certifications' },
  { ...placeholderImages.certNPTEL_CG, caption: 'NPTEL Computer Graphics Certificate', date: '2023', category: 'Certifications' },
  { ...placeholderImages.certNPTEL_ST, caption: 'NPTEL Software Testing Certificate', date: '2024', category: 'Certifications' },
  { ...placeholderImages.certCompilers, caption: 'Stanford-edX Compilers Certificate', date: '2024', category: 'Certifications' },
  { ...placeholderImages.certJobReady, caption: 'JobReady Employability Skills Certificate', date: '2024', category: 'Certifications' },
];

const filters: ('All' | PhotoCategory)[] = ['All', 'Development', 'Events', 'Certifications', 'Personal', 'Behind the Scenes', 'Nature'];
const INITIAL_ITEMS = 12;

/**
 * Renders a skeleton loader for the gallery while images are loading.
 * This provides a better user experience by showing a placeholder structure.
 * @returns {JSX.Element} A set of animated placeholder boxes.
 */
const GallerySkeleton = () => (
    <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {[...Array(8)].map((_, i) => (
            <div key={i} className="break-inside-avoid">
                <div className="animate-pulse bg-white/10 rounded-lg" style={{ height: `${200 + Math.random() * 150}px` }}></div>
            </div>
        ))}
    </div>
);

/**
 * Renders the main Gallery page, displaying a collection of photos with filtering and a lightbox.
 * It manages state for filters, loading, and lightbox visibility.
 * @returns {JSX.Element} The complete gallery page component.
 */
const GalleryPage = () => {
    const [activeFilter, setActiveFilter] = useState<'All' | PhotoCategory>('All');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const galleryRef = useRef<HTMLDivElement>(null);

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [tabRefs, setTabRefs] = useState<(HTMLButtonElement | null)[]>([]);
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const filteredPhotos = useMemo(() => {
        if (activeFilter === 'All') return photosData;
        return photosData.filter(p => Array.isArray(p.category) ? p.category.includes(activeFilter) : p.category === activeFilter);
    }, [activeFilter]);

    const itemsToShow = isExpanded ? filteredPhotos.length : INITIAL_ITEMS;
    const hasMoreItems = filteredPhotos.length > INITIAL_ITEMS;
    const hiddenItemsCount = filteredPhotos.length - INITIAL_ITEMS;

    const handleFilterChange = (filter: 'All' | PhotoCategory, index: number) => {
        setActiveFilter(filter);
        setActiveTabIndex(index);
        setIsExpanded(false);
    };

    const toggleExpand = () => {
        if (!isExpanded) {
            setIsExpanded(true);
        } else {
            if (galleryRef.current) {
                galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            setTimeout(() => {
                setIsExpanded(false);
            }, 500);
        }
    };

    const openLightbox = useCallback((index: number) => {
        const currentlyVisiblePhotos = filteredPhotos.slice(0, itemsToShow);
        const globalIndex = photosData.findIndex(p => p.src === currentlyVisiblePhotos[index].src);
        setSelectedIndex(globalIndex);
        setLightboxOpen(true);
    }, [filteredPhotos, itemsToShow]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { opacity: 0, y: -20 }
    };
    
    const getCategoryCount = (category: 'All' | PhotoCategory) => {
        if (category === 'All') return photosData.length;
        return photosData.filter(p => Array.isArray(p.category) ? p.category.includes(category) : p.category === category).length;
    };


  return (
    <>
      <div ref={galleryRef} className="container mx-auto px-4 md:px-6 py-16 md:py-24 min-h-screen">
        <div className="text-center mb-12">
          <p className="font-headline text-lg font-medium text-primary">My Gallery</p>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold font-headline tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Moments & Milestones
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            A glimpse into my journey - work, events, and experiences.
          </p>
        </div>

        <div className="sticky top-20 md:top-24 z-30 bg-background/80 backdrop-blur-lg -mx-4 sm:mx-0 px-4 sm:px-0 py-4 mb-8">
            <div className="relative flex justify-center items-center flex-wrap gap-2">
                {filters.map((filter, index) => (
                    <button
                        key={filter}
                        ref={(el) => {
                            if (el && !tabRefs.includes(el)) {
                                setTabRefs(prev => {
                                    const newRefs = [...prev];
                                    newRefs[index] = el;
                                    return newRefs;
                                });
                            }
                        }}
                        onClick={() => handleFilterChange(filter, index)}
                        className={cn(
                            "relative shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-target hover:text-white",
                            activeFilter === filter ? "text-white" : "text-muted-foreground"
                        )}
                    >
                        {filter}
                        <Badge variant="secondary" className="ml-2">{getCategoryCount(filter)}</Badge>
                    </button>
                ))}
                <AnimatePresence>
                {tabRefs[activeTabIndex] && (
                    <motion.div 
                        className="absolute bottom-0 h-0.5 bg-gradient-to-r from-purple-600 to-violet-500"
                        layoutId="active-filter-underline"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        style={{
                            width: tabRefs[activeTabIndex]?.clientWidth,
                            left: tabRefs[activeTabIndex]?.offsetLeft
                        }}
                    />
                )}
                </AnimatePresence>
            </div>
        </div>
        <AnimatePresence mode="wait">
            <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                {isLoading ? (
                    <GallerySkeleton />
                ) : filteredPhotos.length > 0 ? (
                    <>
                        <motion.div
                            layout
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
                        >
                            <AnimatePresence>
                                {filteredPhotos.slice(0, itemsToShow).map((photo, index) => (
                                    <motion.div
                                        key={photo.src}
                                        layout
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="break-inside-avoid group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm cursor-pointer cursor-target shadow-lg hover:shadow-primary/20 hover:-translate-y-2 transition-transform"
                                        onClick={() => openLightbox(index)}
                                    >
                                        <Image 
                                            src={photo.src}
                                            alt={photo.alt}
                                            width={photo.width}
                                            height={photo.height}
                                            data-ai-hint={photo.hint}
                                            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                            unoptimized={photo.src.startsWith('https://picsum.photos')}
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                            <Maximize className="absolute top-4 right-4 h-6 w-6 text-white opacity-80" />
                                            <h4 className="font-bold text-white text-lg">{photo.caption}</h4>
                                            <p className="text-white/80 text-sm">{photo.date}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                        
                        {hasMoreItems && (
                            <div className="mt-12 text-center">
                                <Button 
                                    size="lg"
                                    onClick={toggleExpand}
                                    className="button-gradient-primary shadow-lg shadow-primary/20 hover:scale-105 transition-transform cursor-target"
                                >
                                    {isExpanded ? 'See Less' : `See More (${hiddenItemsCount} hidden)`}
                                    <motion.div
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="ml-2"
                                    >
                                        <ChevronDown className="h-5 w-5"/>
                                    </motion.div>
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-16">
                        <Card className="max-w-md mx-auto bg-white/5 border-white/10 p-8">
                            <CardHeader>
                                <ImagePlaceholderIcon className="h-16 w-16 text-muted-foreground mx-auto" />
                                <CardTitle className="mt-4 text-xl">No photos yet!</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">There are no photos in this category yet. Check back soon for updates!</p>
                                <Button onClick={() => handleFilterChange('All', 0)} variant="link" className="mt-4 cursor-target">View All Photos</Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
      </div>
      
      <Lightbox
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
          images={photosData}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
      />
    </>
  );
};

/**
 * Renders a placeholder SVG icon for when an image is not available.
 * This is a fallback for the gallery's empty state.
 * @param {React.SVGProps<SVGSVGElement>} props - Standard SVG properties.
 * @returns {JSX.Element} A placeholder image icon.
 */
function ImagePlaceholderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

export default GalleryPage;
