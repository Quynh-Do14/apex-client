"use client"
import Link from 'next/link';
import { CaretRightOutlined } from '@ant-design/icons';
import styles from '@/assets/styles/components/breadcumb.module.css';
import { ROUTE_PATH } from '@/core/common/appRouter';

interface BreadcrumbCommonProps {
    breadcrumb: string;
    redirect: string;
    currentURL?: string;
    title: string;
    blackColor?: boolean;
}

const BreadcrumbCommon: React.FC<BreadcrumbCommonProps> = ({
    breadcrumb,
    title,
    currentURL = "",
    redirect,
    blackColor = false,
}) => {
    const fontStyle = blackColor ? styles.font_style_black : styles.font_style_white;

    return (
        <div className={styles.breadcumb_container}>
            <div className="flex items-center gap-2">
                {/* Home link */}
                <Link
                    href={ROUTE_PATH.HOME_PAGE}
                    className={fontStyle}
                >
                    Trang chủ
                </Link>

                {/* Separator and breadcrumb (if exists) */}
                {breadcrumb && (
                    <>
                        <CaretRightOutlined className={fontStyle} />
                        <Link
                            href={redirect}
                            className={fontStyle}
                        >
                            {breadcrumb}
                        </Link>
                    </>
                )}

                {/* Separator and current title */}
                {(breadcrumb || title) && (
                    <>
                        <CaretRightOutlined className={fontStyle} />
                        <Link href={currentURL} className={fontStyle}>
                            {title}
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default BreadcrumbCommon;