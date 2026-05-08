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
"./SloganSlider.module.css";
import styles from "@/assets/styles/pages/home/slogan.module.css";

type Props = {
    configPage: ConfigPageInterface[]
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'ACHIEVEMENT';
}

const SloganContent = (props: Props) => {
    const {
        configPage,
        type
    } = props;
    const configContent = configPage.find(item => item.type == type);

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        fade: false,
        adaptiveHeight: true,
        dotsClass: "slick-dots",
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    arrows: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    arrows: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: true,
                    speed: 600,
                }
            }
        ]
    };

    const [listProductCategory, setListProductCategory] = useState<Array<VideoInterface>>([])
    const [selectedVideo, setSelectedVideo] = useState<string>('');
    const [isOpenModalVideo, setIsOpenModalVide] = useState<boolean>(false);

    const onGetListCategoryProductAsync = async () => {
        const param = {
            limit: 12,
        }
        try {
            await videoService.GetVideo(
                param,
                () => { }
            ).then((res) => {
                setListProductCategory(res.data);
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onGetListCategoryProductAsync().then(_ => { });
    }, []);

    const onOpenModalVideo = (item: VideoInterface, videoId: string) => {
        setSelectedVideo(videoId);
        setIsOpenModalVide(true);
    };

    return (
        <div className={styles.container}>
            <div className="section-header dark">
                {
                    configContent?.box_content
                        ?
                        < div className="header-badge">
                            <span className="badge-text">{configContent?.box_content}</span>
                        </div>
                        : null
                }
                {
                    configContent?.title
                        ?
                        <h1 className="main-title-custom">

                            <article
                                dangerouslySetInnerHTML={{ __html: configContent?.title }}
                            />
                        </h1>
                        :
                        <h1 className="main-title">
                            CÔNG NGHỆ <span className="highlight">MỚI</span>
                        </h1>
                }

                <p className="subtitle">
                    {configContent?.description ? configContent?.description : "PCU cao cấp - Tự phục hồi vết xước ở 20°C"}
                </p>
            </div>

            <div className={styles.sliderWrapper}>
                <Slider {...settings}>
                    {listProductCategory.map((slide, index) => {
                        const videoId = getYoutubeId(slide.link_url)
                        return (
                            <div
                                onClick={() => onOpenModalVideo(slide, videoId || "")}
                                key={index}
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
                        )
                    })}
                </Slider>

                <Modal
                    key={"f-0"}
                    open={isOpenModalVideo}
                    width={"90%"}
                    closable={true}
                    onCancel={() => setIsOpenModalVide(false)}
                    footer={null}
                    centered
                    destroyOnHidden
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