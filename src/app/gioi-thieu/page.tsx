import { ROUTE_PATH } from '@/core/common/appRouter'
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb'
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout'
import React from 'react'
import styles from '@/assets/styles/pages/introduce.module.css'
import TocClient from './tocClient'
import BannerCommon from '@/infrastructure/common/banner/BannerCommon'
import { Metadata } from 'next'
import { configImageURL } from '@/infrastructure/helper/helper'
import { Endpoint } from '@/core/common/apiLink'
import { ContentPageInterface } from '@/infrastructure/interface/contentPage/contentPage.interface'
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL;
const introduceUrl = `${publicURL}${ROUTE_PATH.INTRODUCE}`;

const keywords = [
    "Apexauto",
    "Apex auto",
    "Apex auto Thành phố Hồ Chí Minh",
    "Apexauto Thành phố Hồ Chí Minh",
    "Công ty TNHH Apex Auto",
    "Zestech",
    "3M",
    "Inmax",
    "Màn hình android",
    "Android box",
    "Lắp đặt màn hình Zestech",
    "Lắp màn android tại Thành phố Hồ Chí Minh",
    "Lắp màn Zestech tại Thành phố Hồ Chí Minh",
    "Độ xe điện",
    "Lắp ốp pin xe điện ở đâu",
    "Lắp ốp pin xe Vinfast"
];

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Trang chủ",
            "item": publicURL
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Giới thiệu",
            "item": introduceUrl
        },
    ]
};

const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": introduceUrl,
    "url": introduceUrl,
    "name": "Giới thiệu - TRUNG TÂM PHỤ KIỆN ĐỒ CHƠI XE HƠI CAO CẤP APEX AUTO",
    "description": "ApexAuto - Trung tâm phụ kiện ô tô hàng đầu tại Thành phố Hồ Chí Minh. Cung cấp màn hình Android, phim cách nhiệt, phụ kiện xe hơi chính hãng, giá tốt, dịch vụ chuyên nghiệp.",
    "mainEntity": {
        "@type": "Organization",
        "name": "Công ty TNHH Apex Auto",
        "description": "Trung tâm phụ kiện và đồ chơi xe hơi cao cấp tại Thành phố Hồ Chí Minh. Chuyên cung cấp và lắp đặt màn hình Android, phim cách nhiệt Rimo, phụ kiện ô tô chính hãng",
        "foundingDate": "2017-04-12",
        "foundingLocation": "Hà Nội, Việt Nam",
        "address": {
            "streetAddress": "619 Đại lộ Bình Dương, Thủ Dầu Một, Hồ Chí Minh 75000, Vietnam", // Cập nhật địa chỉ thực tế
            "addressLocality": "Thủ Dầu Một",
            "addressRegion": "Thành phố Hồ Chí Minh",
            "postalCode": "820000",
            "addressCountry": "VN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "02462926666",
            "contactType": "customer service"
        }
    },
    "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": configImageURL('/uploads/apex-auto-logo.png'),
        "caption": "Apex Auto Thành phố Hồ Chí Minh - Phụ kiện ô tô cao cấp"
    },
    "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbSchema.itemListElement
    },
    "significantLinks": [
        `${publicURL}${ROUTE_PATH.PRODUCT}`,
        `${publicURL}${ROUTE_PATH.BLOG}`
    ]
};

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${publicURL}#organization`,
    "name": "Công ty TNHH Apex Auto",
    "alternateName": "ApexAuto Việt Nam",
    "url": publicURL,
    "logo": configImageURL('/uploads/apex-auto-logo.png'),
    "description": "Trung tâm phụ kiện và đồ chơi xe hơi cao cấp tại Thành phố Hồ Chí Minh. Chuyên cung cấp và lắp đặt màn hình Android, phim cách nhiệt Rimo, phụ kiện ô tô chính hãng",
    "sameAs": [
        "https://www.facebook.com/ApexAuto.vietnam",
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "02462926666",
        "contactType": "customer service",
        "areaServed": "VN",
        "availableLanguage": "Vietnamese"
    }
};

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${publicURL}#website`,
    "url": publicURL,
    "name": "Apex Auto Thành phố Hồ Chí Minh - Phụ kiện ô tô cao cấp",
    "description": "Phim cách nhiệt và PPF ApexAuto chính hãng - Công ty Quang Minh",
    "publisher": {
        "@type": "Organization",
        "name": "Công ty TNHH Apex Auto",
        "logo": configImageURL('/uploads/apex-auto-logo.png')
    }
};

export const metadata: Metadata = {
    title: "Giới thiệu - TRUNG TÂM PHỤ KIỆN ĐỒ CHƠI XE HƠI CAO CẤP APEX AUTO",
    description: "ApexAuto - Trung tâm phụ kiện ô tô hàng đầu tại Thành phố Hồ Chí Minh. Cung cấp màn hình Android, phim cách nhiệt, phụ kiện xe hơi chính hãng, giá tốt, dịch vụ chuyên nghiệp.",
    keywords: keywords.join(", "),
    authors: [{ name: "Công ty TNHH Apex Auto" }],

    openGraph: {
        type: "website",
        url: `${publicURL}${ROUTE_PATH.INTRODUCE}`,
        title: "Giới thiệu - TRUNG TÂM PHỤ KIỆN ĐỒ CHƠI XE HƠI CAO CẤP APEX AUTO",
        description: "ApexAuto - Thương hiệu Phim cách nhiệt và PPF cao cấp dành cho ô tô. Công nghệ Nano Ceramic & Phún xạ kim loại.",
        images: [
            {
                url: configImageURL('/uploads/apex-auto-logo.png'),
                alt: "Apex Auto Thành phố Hồ Chí Minh - Phụ kiện ô tô cao cấp",
            },
        ],
        siteName: "Apex Auto Thành phố Hồ Chí Minh - Phụ kiện ô tô cao cấp",
    },

    twitter: {
        card: "summary_large_image",
        title: "Giới thiệu - TRUNG TÂM PHỤ KIỆN ĐỒ CHƠI XE HƠI CAO CẤP APEX AUTO",
        description: "ApexAuto - Thương hiệu Phim cách nhiệt và PPF cao cấp dành cho ô tô",
        images: [configImageURL('/uploads/apex-auto-logo.png')],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    alternates: {
        canonical: `${publicURL}/${ROUTE_PATH.INTRODUCE}`,
    },

    other: {
        'application/ld+json': JSON.stringify([
            aboutPageSchema,      // ✅ AboutPage schema
            organizationSchema,   // ✅ Organization schema
            websiteSchema,        // ✅ Website schema
            breadcrumbSchema      // ✅ Breadcrumb schema
        ]),
        'og:image:alt': 'TRUNG TÂM PHỤ KIỆN ĐỒ CHƠI XE HƠI CAO CẤP APEX AUTO',
        'twitter:image:alt': 'TRUNG TÂM PHỤ KIỆN ĐỒ CHƠI XE HƠI CAO CẤP APEX AUTO',
        'og:locale': 'vi_VN',
        'business:contact_data:street': 'Số 12 Ngõ 44 Tư Đình – Tổ 5 – Phường Long Biên – Thành phố Hà Nội',
        'business:contact_data:locality': 'Hà Nội',
        'business:contact_data:country': 'VN',
        'business:contact_data:phone': '02462926666',
    }
};

const IntroducePage = async () => {
    const config = await fetch(`${baseURL}${Endpoint.ContentPage.Get}?type=INTRODUCE`, {
        cache: 'no-store', // Tắt cache
    }).then((res) => res.json());
    const contentPage: ContentPageInterface[] = config.data
    const content = contentPage[0].content ? contentPage[0].content : ""

    let tocItems: { id: string; text: any; level: number; }[] = [];
    let tocItemsLength: { id: string; text: any; level: number; }[] = [];

    var initialLength = 0
    const headings = String(content).match(/<(h[2-3])[^>]*>(.*?)<\/\1>/g);
    if (headings) {
        const items = headings.map((heading, index) => {
            const level = heading.match(/h([2-3])/)?.[1] ?? '2';
            const text = heading.replace(/<\/?h[2-3][^>]*>/g, '');
            const id = `heading-${index}`;
            return { id, text, level: parseInt(level) };
        });
        initialLength = items.length
        tocItems = items;
    }

    const updatedContent = String(content).replace(/<(h[2-3])[^>]*>(.*?)<\/\1>/g, (_match: any, tag: string[], text: any, _index: any) => {
        const id = `heading-${tocItems.length}`;

        tocItems.push({ id, text, level: parseInt(tag[1]) });
        tocItemsLength = tocItems.filter((_it, index) => index >= initialLength)
        return `<${tag} id="${id}">${text}</${tag}>`;
    });
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(aboutPageSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema)
                }}
            />

            <ClientLayout>
                <BannerCommon
                    type={'INTRODUCE'}
                />
                <div className={`${styles.introduceContainer} padding-common`}>
                    <BreadcrumbCommon
                        breadcrumb={"Giới thiệu"}
                        redirect={ROUTE_PATH.INTRODUCE}
                        title={'Công ty TNHH Apex Auto'}
                        blackColor={true}
                    />
                    <TocClient tocItems={tocItemsLength} />
                    <div className="tiny-style">
                        <article
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: updatedContent }}
                        />
                    </div>
                </div>
            </ClientLayout>
        </>
    )
}

export default IntroducePage