
'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Dialog, DialogContent, DialogClose, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface LightboxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: { src: string; alt: string, caption?: string, date?: string }[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Renders a full-screen lightbox component for viewing images.
 * It supports keyboard navigation (arrows, escape) and includes next/previous buttons.
 * @param {LightboxProps} props - The properties for configuring the lightbox.
 * @returns {JSX.Element} The rendered lightbox dialog.
 */
export function Lightbox({ open, onOpenChange, images, selectedIndex, setSelectedIndex }: LightboxProps) {
  const currentImage = images[selectedIndex];

  const goToPrevious = () => {
    setSelectedIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setSelectedIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'Escape') onOpenChange(false);
    };
    
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange, goToNext, goToPrevious]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/80 backdrop-blur-md border-0 w-screen h-screen max-w-none p-0 flex items-center justify-center">
        <VisuallyHidden>
          <DialogTitle>
              {currentImage?.caption ?? "Lightbox Image"}
          </DialogTitle>
        </VisuallyHidden>

        <AnimatePresence mode="wait">
            {currentImage && (
                <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="relative max-w-full max-h-full flex flex-col items-center justify-center"
                >
                    <Image
                        src={currentImage.src}
                        alt={currentImage.alt}
                        width={1200}
                        height={800}
                        className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-2xl"
                    />
                </motion.div>
            )}
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 bg-white/10 hover:bg-white/20 text-white"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 bg-white/10 hover:bg-white/20 text-white"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
        
        <DialogClose asChild>
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 rounded-full h-12 w-12 bg-white/10 hover:bg-white/20 text-white"
            >
                <X className="h-6 w-6" />
            </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
