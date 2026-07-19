// FullWidthSlider.tsx
'use client'
import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '@/assets/styles/pages/home/fullWidthSlider.module.css';
import bannerService from "@/infrastructure/repository/banner/banner.service";
import { configImageURL } from "@/infrastructure/helper/helper";
import { BannerInterface } from "@/infrastructure/interface/banner/banner.interface";

// Dynamically import slick-carousel to avoid SSR issues
const Slider = dynamic(() => import("react-slick"), {
    ssr: false,
    loading: () => <div className={styles.sliderLoading}></div>
});

import { Settings } from "react-slick";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";

const FullWidthSlider = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [listBanner, setListBanner] = useState<Array<string>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [mounted, setMounted] = useState(false);

    const onGetListBannerAsync = async () => {
        try {
            await bannerService.GetBanner(
                {
                    type: "HOMEPAGE"
                },
                setLoading
            ).then((res) => {
                const listImg = res.data.map((item: BannerInterface) => item.image)
                setListBanner(listImg);
            })
        }
        catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        setMounted(true);
        onGetListBannerAsync();
    }, []);

    const settings: Settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        fade: true,
        adaptiveHeight: false,
        beforeChange: (_: number, newIndex: number) => setCurrentSlide(newIndex),
        appendDots: (dots: React.ReactNode) => (
            <div className={styles.customDotsContainer}>
                <ul className={styles.customDots}> {dots} </ul>
            </div>
        ),
        customPaging: (i: number) => (
            <div className={`${styles.dotIndicator} ${currentSlide === i ? styles.dotIndicatorActive : ''}`}>
                <span className={styles.dotNumber}>0{i + 1}</span>
                <div className={styles.dotProgress}></div>
            </div>
        ),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    fade: false,
                }
            }
        ]
    };

    // Don't render slider on server-side
    if (!mounted) {
        return (
            <div className={styles.modernSliderContainer}>
                <div className={styles.sliderWrapper}>
                    <div className={styles.slideItem}>
                        <div className={styles.slideBackground} style={{ backgroundColor: '#f0f0f0' }}></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.modernSliderContainer}>
            <style jsx global>{`
                .slick-arrow {
                    width: 60px !important;
                    height: 60px !important;
                    z-index: 10 !important;
                    background: rgba(0, 0, 0, 0.3) !important;
                    border-radius: 50% !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    transition: all 0.3s ease !important;
                    backdrop-filter: blur(10px) !important;
                }

                .slick-arrow:hover {
                    background: rgba(0, 0, 0, 0.5) !important;
                    transform: scale(1.1) !important;
                }

                .slick-arrow:before {
                    font-size: 24px !important;
                    color: #FFD700 !important;
                    opacity: 1 !important;
                }

                .slick-prev {
                    left: 40px !important;
                }

                .slick-next {
                    right: 40px !important;
                }

                .slick-dots {
                    display: none !important;
                }

                @media (max-width: 992px) {
                    .slick-arrow {
                        display: none !important;
                    }
                }

                @media (max-width: 1200px) {
                    .slick-arrow {
                        width: 50px !important;
                        height: 50px !important;
                    }
                }

                .slick-active .${styles.slideBackground} {
                    transform: scale(1.05);
                }
            `}</style>

            {/* Main Slider */}
            <div className={styles.sliderWrapper}>
                <Slider {...settings}>
                    {listBanner.map((slide: string, index: number) => (
                        <div key={index} className={styles.slideItem}>
                            {/* Background Image with Overlay */}
                            <div
                                className={styles.slideBackground}
                                style={{
                                    backgroundImage: `url(${configImageURL(slide)})`,
                                    '--overlay-color': 'rgba(0, 0, 0, 0.4)'
                                } as React.CSSProperties}
                            >
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div >
    );
};

export default FullWidthSlider;