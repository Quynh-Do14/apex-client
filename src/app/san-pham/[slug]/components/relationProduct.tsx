import React from 'react'
import styles from "@/assets/styles/pages/product/relationProduct.module.css"
import Link from 'next/link'
import { ROUTE_PATH } from '@/core/common/appRouter'
import { configImageURL, convertSlug, formatCurrencyVND } from '@/infrastructure/helper/helper'
import { ProductInterface } from '@/infrastructure/interface/product/product.interface'
import Image from 'next/image'
type Props = {
    listProduct: ProductInterface[]
}
const RelationProductComponent = (props: Props) => {
    const { listProduct } = props
    return (
        <div className={styles.relationProductSection}>
            <div className={styles.galleryContainer}>
                <div className={styles.galleryGrid}>
                    {listProduct.map(item => (
                        <Link href={`${ROUTE_PATH.PRODUCT}/${item.slug}`}
                            key={item.id}
                            className={styles.galleryItem}
                        >
                            <div className={styles.itemMedia}>
                                <div className={styles.mediaContainer}>
                                    {/* Thumbnail */}
                                    <div className={styles.thumbnailWrapper}>
                                        <Image src={configImageURL(item.image)} alt={item.name} fill className="object-cover" />
                                        <div className={styles.mediaOverlay}></div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.itemContent}>
                                <div className={styles.contentWrapper}>
                                    <h3 className={styles.itemTitle}>{item.name}</h3>
                                    <div className={styles.itemPrice}>
                                        {item.price_sale ? (
                                            <>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                    <span className={styles.salePrice}>{formatCurrencyVND(item.price_sale)}</span>
                                                </div>
                                                <span className={styles.originalPrice}>{formatCurrencyVND(item.price)}</span>
                                            </>
                                        ) : (
                                            <span className={styles.normalPrice}>{formatCurrencyVND(item.price)}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RelationProductComponent