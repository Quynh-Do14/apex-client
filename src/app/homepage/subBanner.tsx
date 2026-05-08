'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/assets/styles/pages/home/home.module.css'
import { BannerInterface } from '@/infrastructure/interface/banner/banner.interface';
import bannerService from '@/infrastructure/repository/banner/banner.service';
import { configImageURL } from '@/infrastructure/helper/helper';

const SubBannerSection = () => {
    const [banner, setBanner] = useState<string>("");

    const onGetBannerAsync = async () => {
        try {
            await bannerService.GetBanner(
                {
                    type: "HOMEPAGE_SUB"
                },
                () => { }
            ).then((res) => {
                const listImg = res.data.map((item: BannerInterface) => item.image)
                setBanner(listImg[0]);
            })
        }
        catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        onGetBannerAsync().then(_ => { });
    }, []);
    return (
        <div
            className={styles.bannerFixed}
            style={{
                backgroundImage: `url(${configImageURL(banner)})`,
            }}
        >
            <div className={styles.blurTop}></div>
            <div className={styles.blurBottom}></div>
        </div>
    )
}

export default SubBannerSection