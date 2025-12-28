
"use client";

import React, {
    useRef,
    useEffect,
    useState,
    TouchEvent,
} from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ThreeDCarouselItem {
    id: string | number;
    title: string;
    brand: string; // Using as Location for Real Estate
    description: string;
    tags: string[];
    imageUrl: string;
    link: string;
}

interface ThreeDCarouselProps {
    items: ThreeDCarouselItem[];
    autoRotate?: boolean;
    rotateInterval?: number;
    cardHeight?: number;
    title?: string;
    subtitle?: string;
    tagline?: string;
}

const ThreeDCarousel = ({
    items,
    autoRotate = true,
    rotateInterval = 4000,
    cardHeight = 500,
}: ThreeDCarouselProps) => {
    const [active, setActive] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const isMobile = useIsMobile();
    const minSwipeDistance = 50;

    useEffect(() => {
        if (autoRotate && isInView && !isHovering) {
            const interval = setInterval(() => {
                setActive((prev) => (prev + 1) % items.length);
            }, rotateInterval);
            return () => clearInterval(interval);
        }
    }, [isInView, isHovering, autoRotate, rotateInterval, items.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsInView(entry.isIntersecting),
            { threshold: 0.2 }
        );
        if (carouselRef.current) {
            observer.observe(carouselRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
        setTouchEnd(null);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance) {
            setActive((prev) => (prev + 1) % items.length);
        } else if (distance < -minSwipeDistance) {
            setActive((prev) => (prev - 1 + items.length) % items.length);
        }
    };

    const getCardAnimationClass = (index: number) => {
        const total = items.length;
        // Simple logic for 3 items might be tricky if items.length < 3. 
        // Assuming we have enough items (user said "add more").

        if (index === active) return "scale-100 opacity-100 z-30 translate-x-0 blur-none";

        const nextIndex = (active + 1) % total;
        const prevIndex = (active - 1 + total) % total;

        if (index === nextIndex)
            return "translate-x-[60%] scale-90 opacity-40 z-20 blur-sm grayscale brightness-50";
        if (index === prevIndex)
            return "translate-x-[-60%] scale-90 opacity-40 z-20 blur-sm grayscale brightness-50";

        // Create a "hidden" pile behind
        return "scale-75 opacity-0 z-10 translate-x-0";
    };

    return (
        <section
            id="ThreeDCarousel"
            className="bg-transparent min-w-full mx-auto flex items-center justify-center py-10"
        >
            <div
                className="w-full px-4 sm:px-6 lg:px-8 relative"
            >
                <div
                    className="relative h-[600px] flex items-center justify-center perspective-1000"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    ref={carouselRef}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className={cn(
                                "absolute w-full max-w-[400px] md:max-w-[500px] transition-all duration-700 ease-cubic-bezier",
                                getCardAnimationClass(index),
                                index === active ? "pointer-events-auto" : "pointer-events-none"
                            )}
                            style={{
                                // Add some custom transition logic if needed here
                                transitionTimingFunction: "cubic-bezier(0.25, 0.8, 0.25, 1)",
                            }}
                        >
                            <Card
                                className="overflow-hidden bg-card/80 backdrop-blur-xl border border-white/10 shadow-2xl h-full flex flex-col group hover:border-primary/50 transition-colors duration-500"
                                style={{ height: cardHeight }}
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                                        {item.brand.toUpperCase()}
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                        {item.tags.slice(0, 3).map((tag, i) => (
                                            <span key={i} className="inline-block text-[10px] uppercase tracking-wider bg-primary/80 text-white px-2 py-0.5 rounded mr-2 mb-1">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <CardContent className="p-6 flex flex-col flex-grow relative z-10">
                                    <h3 className="text-2xl font-serif font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <div className="w-12 h-0.5 bg-primary/50 mb-4 group-hover:w-24 transition-all duration-500" />
                                    <p className="text-muted-foreground text-sm flex-grow leading-relaxed line-clamp-3">
                                        {item.description}
                                    </p>

                                    <div className="mt-6 flex justify-between items-center">
                                        <a
                                            href={item.link}
                                            className="text-foreground/80 flex items-center hover:text-primary transition-colors text-sm font-medium group/link"
                                            onClick={(e) => {
                                                if (item.link.startsWith("#")) {
                                                    e.preventDefault();
                                                    // handle smooth scroll if needed
                                                }
                                            }}
                                        >
                                            <span className="relative z-10 border-b border-transparent group-hover/link:border-primary transition-all">Explore Project</span>
                                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                                        </a>
                                    </div>
                                </CardContent>

                                {/* Glossy overlay effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Navigation Controls - Moved outside the 3D perspective container */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-6 z-50 pointer-events-none">
                    <div className="pointer-events-auto flex items-center space-x-6 bg-background/5 backdrop-blur-sm px-6 py-2 rounded-full border border-white/5">
                        <button
                            className="w-12 h-12 rounded-full flex items-center justify-center text-foreground/80 border border-foreground/10 bg-background/20 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-110 shadow-lg active:scale-95"
                            onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex space-x-2">
                            {items.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${active === idx
                                        ? "bg-primary w-8 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                                        : "bg-foreground/20 w-2 hover:bg-foreground/40"
                                        }`}
                                    onClick={() => setActive(idx)}
                                    aria-label={`Go to item ${idx + 1}`}
                                />
                            ))}
                        </div>
                        <button
                            className="w-12 h-12 rounded-full flex items-center justify-center text-foreground/80 border border-foreground/10 bg-background/20 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:scale-110 shadow-lg active:scale-95"
                            onClick={() => setActive((prev) => (prev + 1) % items.length)}
                            aria-label="Next"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThreeDCarousel;
