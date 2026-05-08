'use client'
import React, { useEffect, useState } from "react";
import styles from "@/assets/styles/pages/home/article.module.css";
import blogService from "@/infrastructure/repository/blog/blog.service";
import { configImageURL, convertDateOnlyShow, convertSlug } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import Image from "next/image";
import { ConfigPageInterface } from "@/infrastructure/interface/configPage/configPage.interface";
import BlogSkeleton from "../tin-tuc/skeleton";

type Props = {
    configPage: ConfigPageInterface[]
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'ACHIEVEMENT';
}

const ArticleSection = (props: Props) => {
    const {
        configPage,
        type
    } = props;
    const [listBlog, setListBlog] = useState<Array<any>>([])
    const [loading, setLoading] = useState<boolean>(false);
    const configContent = configPage.find(item => item.type == type);

    const onGetListBlogAsync = async () => {
        const param = {
            limit: 4,
        }
        try {
            await blogService.GetBlog(
                param,
                setLoading
            ).then((res) => {
                setListBlog(res.data);
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onGetListBlogAsync().then(_ => { });
    }, []);

    return (
        <div className={styles.newsArticleContainer}>
            <div className="section-header light">
                {/* {
                    configContent?.box_content
                        ?
                        < div className="header-badge">
                            <span className="badge-text">{configContent?.box_content}</span>
                        </div>
                        : null
                } */}
                {
                    configContent?.title
                        ?
                        <h2 className="main-title-custom">

                            <article
                                dangerouslySetInnerHTML={{ __html: configContent?.title }}
                            />
                        </h2>
                        :
                        <h2 className="main-title">
                            Cập Nhật <span className="highlight">Tin Tức</span> Mới Nhất
                        </h2>
                }
            </div>
            {/* News Grid */}
            <div className={styles.newsGrid}>
                {loading
                    ?
                    <BlogSkeleton />
                    :
                    listBlog.map((article, index) => (
                        <Link
                            href={`${ROUTE_PATH.BLOG}/${article?.slug}.html`} key={index} className={styles.newsCard}>
                            <div className={styles.cardImage}>
                                <Image
                                    src={configImageURL(article.image)}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className={styles.cardCategory}>
                                    <span className={styles.categoryText}>
                                        {article.category_name}
                                    </span>
                                </div>
                                <div className={styles.cardOverlay}></div>
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{article.title}</h3>
                                <p className={styles.cardExcerpt}>{article.short_description}</p>
                                <div className={styles.cardMeta}>
                                    <div className={styles.metaItem}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                        <span>{convertDateOnlyShow(article.created_at)}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        <span>{article.user_name}</span>
                                    </div>
                                </div>
                            </div>

                        </Link>
                    ))}
            </div>
        </div >
    );
};

export default ArticleSection;