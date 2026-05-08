'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/assets/styles/components/banner.module.css';
import { BannerInterface } from '@/infrastructure/interface/banner/banner.interface';
import bannerService from '@/infrastructure/repository/banner/banner.service';
import { configImageURL } from '@/infrastructure/helper/helper';

type Props = {
    type: "HOMEPAGE" | "INTRODUCE" | "AGENCY" | "CONTACT" | "POLICY";
}
const BannerCommon = (props: Props) => {
    const { type } = props;
    const [banner, setBanner] = useState<string>("");

    const onGetBannerAsync = async () => {
        try {
            await bannerService.GetBanner(
                {
                    type: type
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
        <div className={styles.bannerContainer}>
            <Image
                src={configImageURL(banner)}
                alt="Banner quảng cáo dòng sản phẩm RIMO PREMIUM"
                className={styles.bannerImage}
                width={1920}
                height={600}
                priority
            />
        </div>
    );
};

export default BannerCommon;