'use client'
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getYoutubeId } from "@/infrastructure/helper/helper";
import videoService from "@/infrastructure/repository/video/video.service";
import YouTubeThumbnail from "@/infrastructure/common/thumbnailYoutube/thumbnailYoutube";
import { VideoInterface } from "@/infrastructure/interface/video/video.interface";
import dynamic from "next/dynamic";
import { PageLoading } from "@/infrastructure/common/loading/loadingPage";
import { Modal } from "antd";
import YoutubeVideo from "@/infrastructure/common/thumbnailYoutube/youtube";
import { ConfigPageInterface } from "@/infrastructure/interface/configPage/configPage.interface";
import styles from "@/assets/styles/pages/home/slogan.module.css";

type Props = {
    configPage: ConfigPageInterface[]
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'ACHIEVEMENT';
}

// Custom hook để lấy window size
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};

const SloganContent = (props: Props) => {
    const { configPage, type } = props;
    const configContent = configPage.find(item => item.type == type);
    const [listProductCategory, setListProductCategory] = useState<Array<VideoInterface>>([]);
    const [selectedVideo, setSelectedVideo] = useState<string>('');
    const [isOpenModalVideo, setIsOpenModalVideo] = useState<boolean>(false);
    const [isClient, setIsClient] = useState<boolean>(false);
    const { width: windowWidth } = useWindowSize();

    // Tính số slides dựa trên window width
    const getSlidesToShow = () => {
        if (windowWidth >= 1024) return 3;
        if (windowWidth >= 768) return 2;
        return 1;
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: getSlidesToShow(),
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: windowWidth >= 768,
        fade: false,
        adaptiveHeight: true,
        lazyLoad: "ondemand" as const,
        pauseOnHover: true,
        swipe: true,
        swipeToSlide: true,
        touchMove: true,
        dotsClass: "slick-dots",
    };

    const onGetListCategoryProductAsync = async () => {
        const param = { limit: 12 };
        try {
            const res = await videoService.GetVideo(param, () => { });
            setListProductCategory(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setIsClient(true);
        onGetListCategoryProductAsync();
    }, []);

    const onOpenModalVideo = (slide: VideoInterface, videoId: string) => {
        setSelectedVideo(videoId);
        setIsOpenModalVideo(true);
    };

    if (!isClient) {
        return <PageLoading />;
    }

    return (
        <div className={styles.container}>
            <div className="section-header dark">
                {configContent?.box_content && (
                    <div className="header-badge">
                        <span className="badge-text">{configContent.box_content}</span>
                    </div>
                )}
                {configContent?.title ? (
                    <h1 className="main-title-custom">
                        <article dangerouslySetInnerHTML={{ __html: configContent.title }} />
                    </h1>
                ) : (
                    <h1 className="main-title">
                        CÔNG NGHỆ <span className="highlight">MỚI</span>
                    </h1>
                )}
                <p className="subtitle">
                    {configContent?.description || "PCU cao cấp - Tự phục hồi vết xước ở 20°C"}
                </p>
            </div>

            <div className={styles.sliderWrapper}>
                {listProductCategory.length > 0 && (
                    <Slider key={windowWidth} {...settings}>
                        {listProductCategory.map((slide, index) => {
                            const videoId = getYoutubeId(slide.link_url);
                            return (
                                <div
                                    onClick={() => onOpenModalVideo(slide, videoId || "")}
                                    key={slide.id || index}
                                    className={styles.slideItem}
                                >
                                    <div className={styles.slideContent}>
                                        <div className={styles.imageWrapper}>
                                            <YouTubeThumbnail name={slide.name} url={slide.link_url} />
                                            <div className={styles.playIconOverlay}>
                                                <div className={styles.playIcon}>
                                                    <svg width="60" height="60" viewBox="0 0 80 80" fill="none">
                                                        <circle cx="40" cy="40" r="38" fill="white" fillOpacity="0.95" />
                                                        <path d="M32 24L56 40L32 56V24Z" fill="black" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.infoSection}>
                                            <div className={styles.productBadge}>
                                                <span className={styles.badgeTextSmall}>Youtube Apex Auto</span>
                                            </div>
                                            <h3 className={styles.slideTitle}>
                                                <span className={styles.titleText}>{slide.name}</span>
                                            </h3>
                                            <p className={styles.slideDescription}>{slide.description}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </Slider>
                )}

                <Modal
                    open={isOpenModalVideo}
                    width="90%"
                    closable
                    onCancel={() => setIsOpenModalVideo(false)}
                    footer={null}
                    centered
                    destroyOnClose
                >
                    <YoutubeVideo videoId={selectedVideo} />
                </Modal>
            </div>
        </div>
    );
};

const SloganSlider = dynamic(() => Promise.resolve(SloganContent), {
    ssr: false,
    loading: () => <PageLoading />
});

export default SloganSlider;