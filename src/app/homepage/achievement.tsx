'use client'
import { ConfigPageInterface } from '@/infrastructure/interface/configPage/configPage.interface';
import React, { useEffect, useRef, useState } from 'react'
import '@/assets/styles/pages/home/achievement.css'

type Props = {
    configPage: ConfigPageInterface[]
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'ACHIEVEMENT';
}
const AchieveSection = (props: Props) => {
    const {
        configPage,
        type
    } = props;
    const [animatedNumbers, setAnimatedNumbers] = useState<{ [key: number]: number }>({});
    const sectionRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    const configContent: ConfigPageInterface[] = configPage.filter(item => item.type === type);

    // Extract numeric value from HTML content for animation
    const extractNumber = (html: string): number => {
        const match = html.match(/\d+(?:\.\d+)?/);
        return match ? parseFloat(match[0]) : 0;
    };

    const formatNumber = (num: number): string => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K+';
        return num.toString();
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;

                    // Animate numbers counting up
                    configContent.forEach((stat, idx) => {
                        const targetValue = extractNumber(stat.title);
                        let startValue = 0;
                        const duration = 2000;
                        const increment = targetValue / (duration / 16);

                        const updateNumber = () => {
                            startValue += increment;
                            if (startValue < targetValue) {
                                setAnimatedNumbers(prev => ({
                                    ...prev,
                                    [idx]: Math.floor(startValue)
                                }));
                                requestAnimationFrame(updateNumber);
                            } else {
                                setAnimatedNumbers(prev => ({
                                    ...prev,
                                    [idx]: targetValue
                                }));
                            }
                        };

                        requestAnimationFrame(updateNumber);
                    });
                }
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        const currentSectionRef = sectionRef.current;
        if (currentSectionRef) {
            observer.observe(currentSectionRef);
        }

        return () => {
            if (currentSectionRef) {
                observer.unobserve(currentSectionRef);
            }
        };
    }, [configContent]);

    // Custom render for stat number with animation
    const renderStatNumber = (stat: ConfigPageInterface, index: number) => {
        const originalHtml = stat.title;
        const numericValue = extractNumber(originalHtml);
        const animatedValue = animatedNumbers[index] ?? 0;
        const formattedValue = formatNumber(animatedValue);

        // Replace the number in HTML with animated value while preserving other elements like <strong>
        const animatedHtml = originalHtml.replace(/\d+(?:\.\d+)?/, formattedValue);

        return (
            <article dangerouslySetInnerHTML={{ __html: animatedHtml }} />
        );
    };

    return (
        <div className="stats-bar-modern" ref={sectionRef}>
            <div className="stats-container-modern">
                {configContent.map((stat: ConfigPageInterface, index: number) => (
                    <div key={index} className="stat-item-modern">
                        <div className="stat-number-modern">
                            <article dangerouslySetInnerHTML={{ __html: stat.title }} />
                        </div>
                        <div className="stat-label-modern">{stat.description}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AchieveSection