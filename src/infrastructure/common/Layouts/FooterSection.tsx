'use client'
import styles from '@/assets/styles/components/footer.module.css';
import { Endpoint } from '@/core/common/apiLink';
import { ROUTE_PATH } from '@/core/common/appRouter';
import { ContentPageInterface, ContentPageParams } from '@/infrastructure/interface/contentPage/contentPage.interface';
import contentPageService from '@/infrastructure/repository/contentPage/contentPage.service';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const FooterSection = () => {
    const [content, setContent] = useState<Array<ContentPageInterface>>([])

    const onGetListProductAsync = async () => {
        const param: ContentPageParams = {
            type: 'FOOTER'
        }
        try {
            await contentPageService.GetContentPage(
                param,
                () => { }
            ).then((res) => {
                setContent(res.data?.[0]?.content);
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetListProductAsync().then(_ => { })
    }, []);

    const menuItems = [
        {
            id: "home",
            label: "Trang chủ",
            href: ROUTE_PATH.HOME_PAGE,
        },
        {
            id: "introduce",
            label: "Giới thiệu",
            href: ROUTE_PATH.INTRODUCE,
        },
        {
            id: "products",
            label: "Sản phẩm",
            href: ROUTE_PATH.PRODUCT,
        },
        {
            id: "blog",
            label: "Tin tức",
            href: ROUTE_PATH.BLOG,
        },
        {
            id: "contact",
            label: "Liên hệ",
            href: ROUTE_PATH.CONTACT,
        },
    ];

    const policy = [
        {
            id: "terms",
            label: "Thông tin về điều kiện giao dịch chung",
            href: ROUTE_PATH.TERMS_AND_CONDITIONS,
        },
        {
            id: "privacy",
            label: "Chính sách bảo mật",
            href: ROUTE_PATH.PRIVACY_POLICY,
        },
        {
            id: "purchase",
            label: "Chính sách mua hàng",
            href: ROUTE_PATH.PURCHASE_POLICY,
        },
        {
            id: "warranty",
            label: "Chính sách bảo hành - đổi trả",
            href: ROUTE_PATH.WARRANTY_RETURN_POLICY,
        },
        {
            id: "shipping",
            label: "Thông tin về vận chuyển và giao nhận",
            href: ROUTE_PATH.SHIPPING_DELIVERY_INFO,
        },
        {
            id: "payment",
            label: "Thông tin về các phương thức thanh toán",
            href: ROUTE_PATH.PAYMENT_METHODS_INFO,
        },
    ];

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <div className={styles.footerSection}>
                    <div className={styles.sectionTitle}>
                        Công ty TNHH Apex Auto
                    </div>
                    {/* <div className={styles.contactInfo}>
                        <div className={styles.companyInfo}>
                            GPKD số 0107801299 do Sở KH và ĐT TP Hà Nội cấp ngày 12/04/2017
                        </div>
                        <div className={styles.companyInfo}>
                            Người đại diện: Ông Nguyễn Văn Ty
                        </div>
                        <div className={styles.contactDetails}>
                            <div className={styles.contactItem}>
                                <FaMapMarkerAlt className={styles.contactIcon} />
                                <span className={styles.contactText}>
                                    Địa chỉ: Số 12 Ngõ 44 Tư Đình – Tổ 5 – Phường Long Biên – Thành phố Hà Nội
                                </span>
                            </div>
                            <div className={styles.contactItem}>
                                <FaMapMarkerAlt className={styles.contactIcon} />
                                <span className={styles.contactText}>
                                    Địa chỉ: Số 15 Tùng Thiện Vương – Phường Phú Định – Thành phố Hồ Chí Minh
                                </span>
                            </div>
                            <div className={styles.contactItem}>
                                <FaEnvelope className={styles.contactIcon} />
                                <span className={styles.contactText}>
                                    inmax.quangminh@gmail.com
                                </span>
                            </div>
                            <div className={styles.contactItem}>
                                <FaPhoneAlt className={styles.contactIcon} />
                                <span className={styles.contactText}>
                                    1900.8113
                                </span>
                            </div>
                        </div>
                    </div> */}
                    <div className="tiny-style">
                        <article
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </div>
                <div className={styles.gridLink}>
                    <div className={styles.footerSection}>
                        <div className={styles.sectionTitle}>
                            LIÊN KẾT
                        </div>
                        <ul className={styles.linksList}>
                            {
                                menuItems.map((item, index) => (
                                    <li
                                        className={styles.linkItem}
                                        key={index}
                                    >
                                        <Link
                                            href={item.href}
                                            className={styles.link}
                                            key={index}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <div className={styles.sectionTitle}>
                            CHÍNH SÁCH
                        </div>
                        <ul className={styles.linksList}>
                            {
                                policy.map((item, index) => (
                                    <li className={styles.linkItem}
                                        key={index}
                                    >
                                        <Link
                                            href={item.href}
                                            className={styles.link}
                                            key={index}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default FooterSection;