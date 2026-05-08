import React from 'react'
import styles from '@/assets/styles/pages/product/skeletonProduct.module.css'
const SkeletonProduct = () => {
    return (
        <div className={styles.galleryGrid}>
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className={styles.galleryItemSkeleton}>
                    <div className={styles.skeletonMedia}>
                        <div className={styles.skeletonThumbnail}></div>
                    </div>
                    <div className={styles.skeletonContent}>
                        <div className={styles.skeletonTitle}></div>
                        <div className={styles.skeletonPrice}></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SkeletonProduct