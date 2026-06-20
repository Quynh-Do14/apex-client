'use client'

import React, { useState, useEffect } from "react";
import styles from '@/assets/styles/pages/home/homeProduct.module.css'
import productService from "@/infrastructure/repository/product/product.service";
import { configImageURL, formatCurrencyVND } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import dynamic from "next/dynamic";
import { PageLoading } from "@/infrastructure/common/loading/loadingPage";
import Image from "next/image";
import { ProductInterface } from "@/infrastructure/interface/product/product.interface";
import { ConfigPageInterface } from "@/infrastructure/interface/configPage/configPage.interface";

type Props = {
    configPage: ConfigPageInterface[]
    type: 'TITLE_PAGE' | 'SECTION_1' | 'SECTION_2' | 'SECTION_3' | 'SECTION_4' | 'SECTION_5';
}

const ProductContent = (props: Props) => {
    const {
        configPage,
        type
    } = props;
    const [listProduct, setListProduct] = useState<Array<ProductInterface>>([])
    const configContent = configPage.find(item => item.type == type);

    const onGetListProductAsync = async () => {
        const param = {
            // limit: 4,
            is_featured: true
        }
        try {
            await productService.GetProduct(
                param,
                () => { }
            ).then((res) => {
                setListProduct(res.data);
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        onGetListProductAsync().then(_ => { });
    }, []);

    return (
        <section className={styles.productSection}>
            <div className="section-header light">
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
                        <h2 className="main-title-custom">

                            <article
                                dangerouslySetInnerHTML={{ __html: configContent?.title }}
                            />
                        </h2>
                        :
                        <h2 className="main-title">
                            Sản phẩm <span className="highlight">Nổi bật</span>
                        </h2>
                }

            </div>
            <div className={styles.galleryGrid}>
                {listProduct.map((item) => (
                    <Link
                        href={`${ROUTE_PATH.PRODUCT}/${item.slug}`}
                        key={item.id}
                        className={styles.galleryItem}
                    >
                        <div className={styles.itemMedia}>
                            <div className={styles.thumbnailWrapper}>
                                <Image
                                    src={configImageURL(item.image)}
                                    alt={item.name}
                                    fill
                                    className='object-cover'
                                />
                                <div className={styles.mediaOverlay}>
                                    <div className={styles.contentOverlay}>
                                        <h3 className={styles.itemTitle}>{item.name}</h3>
                                        <div className={styles.itemPrice}>
                                            {item.price_sale ? (
                                                <div className={styles.priceContainer}>
                                                    <span className={styles.salePrice}>
                                                        {formatCurrencyVND(item.price_sale)}
                                                    </span>
                                                    <span className={styles.originalPrice}>
                                                        {formatCurrencyVND(item.price)}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className={styles.normalPrice}>
                                                    {formatCurrencyVND(item.price)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

// Export default với dynamic import
const ProductSection = dynamic(() => Promise.resolve(ProductContent), {
    ssr: false,
    loading: () => <PageLoading />
});

export default ProductSection;