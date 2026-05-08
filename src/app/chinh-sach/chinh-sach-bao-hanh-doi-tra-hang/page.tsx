import { ROUTE_PATH } from '@/core/common/appRouter'
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb'
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout'
import React from 'react'
import styles from '@/assets/styles/pages/policy.module.css'
import TocClient from '../tocClient'
import BannerCommon from '@/infrastructure/common/banner/BannerCommon'
import banner from '@/assets/images/banner/Banner-Menu-GIoi-thieu.jpg';
import { ContentPageInterface } from '@/infrastructure/interface/contentPage/contentPage.interface'
import { Endpoint } from '@/core/common/apiLink'
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const PolicyPage = async () => {
    const config = await fetch(`${baseURL}${Endpoint.ContentPage.Get}?type=BAO_HANH`, {
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
        <ClientLayout>
            <BannerCommon
                type={'POLICY'}
            />
            <div className={`${styles.policyContainer} padding-common`}>
                <BreadcrumbCommon
                    breadcrumb={"Chính sách"}
                    redirect={ROUTE_PATH.WARRANTY_RETURN_POLICY}
                    title={'Chính sách bảo hành – đổi trả hàng'}
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
    )
}

export default PolicyPage