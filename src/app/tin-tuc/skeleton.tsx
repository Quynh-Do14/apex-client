import React from 'react'
import styles from '@/assets/styles/pages/blog/blogSkeleton.module.css'
const BlogSkeleton = () => {
    return (
        [...Array(8)].map((_, index) => (
            <div key={index} className={styles.newsCard}>
                {/* Card Image Skeleton */}
                <div className={styles.cardImage}>
                    <div className={`${styles.cardImageSkeleton} ${styles.skeleton}`}></div>
                    <div className={styles.cardCategory}>
                        <span className={`${styles.categoryTextSkeleton} ${styles.skeleton}`}></span>
                    </div>
                    <div className={styles.cardOverlay}></div>
                </div>

                {/* Card Content Skeleton */}
                <div className={styles.cardContent}>
                    <div className={`${styles.cardTitleSkeleton} ${styles.skeleton}`}></div>
                    <div className={`${styles.cardTitleSkeleton} ${styles.skeleton} ${styles.short}`}></div>

                    <div className={`${styles.cardExcerptSkeleton} ${styles.skeleton}`}></div>
                    <div className={`${styles.cardExcerptSkeleton} ${styles.skeleton} ${styles.short}`}></div>
                    <div className={`${styles.cardExcerptSkeleton} ${styles.skeleton} ${styles.veryShort}`}></div>

                    <div className={styles.cardMeta}>
                        <div className={styles.metaItem}>
                            <div className={`${styles.metaIconSkeleton} ${styles.skeleton}`}></div>
                            <span className={`${styles.metaTextSkeleton} ${styles.skeleton}`}></span>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}

export default BlogSkeleton