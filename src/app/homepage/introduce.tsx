// IntroduceSection.tsx
'use client'
import React from 'react';
import styles from '@/assets/styles/pages/home/introduce.module.css'
import { configImageURL } from '@/infrastructure/helper/helper';
import { ConfigPageInterface } from '@/infrastructure/interface/configPage/configPage.interface';
import Link from 'next/link';
import { ROUTE_PATH } from '@/core/common/appRouter';
import { useRecoilValue } from 'recoil';
import { CategoryProductState } from '@/core/common/atoms/category/categoryState';

type Props = {
    configPage: ConfigPageInterface[]
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'ACHIEVEMENT';
}

const IntroduceSection = (props: Props) => {
    const {
        configPage,
        type
    } = props;
    const configContent = configPage.find(item => item.type == type);
    const categoryProductState = useRecoilValue(CategoryProductState).data

    return (
        <div className={styles.introduceContainer}>
            <div className="section-header dark">
                {
                    configContent?.box_content
                        ?
                        <div className={styles.floatingBadge}>
                            <span className="badge-text">{configContent?.box_content}</span>
                        </div>
                        : null
                }
                {
                    configContent?.title
                        ?
                        <h2 className="main-title-custom">
                            <article
                                dangerouslySetInnerHTML={{ __html: configContent?.title }}
                            />
                        </h2>
                        :
                        <h2 className={styles.mainTitle}>
                            Công nghệ vượt trội giúp <span className={styles.gradientText}>bảo vệ xe tối đa</span>
                        </h2>
                }

                {configContent?.description
                    ?
                    <p className="subtitle">
                        {configContent?.description}
                    </p>
                    :
                    null
                }
                {/* <h2 className={styles.mainTitle}>
                    CHĂM SÓC & BẢO VỆ XE <span className={styles.gradientText}>TIÊU CHUẨN CAO CẤP</span>
                </h2> */}
            </div>
            <div className={styles.introduceContent}>
                {categoryProductState.map((item, index) => (
                    <Link href={`${ROUTE_PATH.CATEGORY}/${item.slug}`} key={index} className={styles.card}>
                        <div className={styles.cardWrapper}>
                            <div
                                className={styles.imageContainer}
                                style={{
                                    backgroundImage: `url(${configImageURL(item.image)})`,
                                }}
                            >
                                <div className={styles.overlayGradient}></div>
                                <div className={styles.contentWrapper}>
                                    <h3 className={styles.title}>{item.name}</h3>
                                    {/* <p className={styles.content}>{item.description}</p> */}
                                    <div className={styles.readMore}>
                                        <span>Khám phá thêm</span>
                                        <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div className={styles.floatingShape}></div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default IntroduceSection