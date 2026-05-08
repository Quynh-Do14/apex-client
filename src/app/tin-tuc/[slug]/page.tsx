import { ROUTE_PATH } from '@/core/common/appRouter'
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb'
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout'
import { configImageURL, splitTakeId } from '@/infrastructure/helper/helper'
import { Metadata } from 'next';
import styles from "@/assets/styles/pages/blog/slugBlog.module.css";
import RelationBlogComponent from './components/relationBlog';
import { Endpoint } from '@/core/common/apiLink';
import { BlogInterface } from '@/infrastructure/interface/blog/blog.interface';
import TocBlog from './components/toc';
import Image from 'next/image';
// import 'react-quill/dist/quill.snow.css';

type Props = {
    params: { slug: string };
};
const baseURL = process.env.NEXT_PUBLIC_API_URL;
const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const blog: BlogInterface = await fetch(
            `${baseURL}${Endpoint.Blog.GetById}/${splitTakeId(params.slug)}`,
            {
                next: { revalidate: 3600 }, // Cache 1 giờ
            }
        ).then((res) => res.json());

        // Kiểm tra blog tồn tại
        if (!blog?.id) {
            return {
                title: 'Bài viết không tồn tại | Rimo',
                robots: { index: false, follow: true },
            };
        }

        const blogUrl = `${publicURL}${ROUTE_PATH.BLOG}/${params.slug}`;
        const imageUrl = configImageURL(blog.image);
        const imageAlt = `${blog.title} - Phim cách nhiệt Rimo`;

        const keywordConvert = blog && blog.keyword.map(item => item.keyword)
        const keywords: string[] = [
            blog.title,
            blog.category_name,
        ].filter((item): item is string => Boolean(item)).concat(keywordConvert)

        // ✅ ĐÚNG: Dùng Article/BlogPosting Schema

        return {
            title: blog.title,
            description: blog.short_description?.substring(0, 160),
            keywords: keywords,

            openGraph: {
                title: blog.title,
                description: blog.short_description,
                url: blogUrl,
                siteName: 'Rimo',
                images: [{
                    url: imageUrl,
                    alt: imageAlt,
                }],
                type: 'article',  // ✅ Đã sửa: "article" thay vì "website"
            },

            twitter: {
                card: 'summary_large_image',
                title: blog.title,
                description: blog.short_description,
                images: [imageUrl],
            },

            alternates: {
                canonical: blogUrl,
            },

            robots: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },

            other: {
                'og:image:alt': imageAlt,
                'twitter:image:alt': imageAlt,
                'og:locale': 'vi_VN',
                'article:published_time': blog.created_at,
                'article:modified_time': blog.updated_at,
                'article:author': 'Rimo',
                'article:section': blog.category_name,
            }
        };

    } catch (error) {
        console.error('Error generating blog metadata:', error);
        return {
            title: 'Rimo',
            robots: { index: false, follow: true },
        };
    }
}

const BlogSlugPage = async ({ params }: Props) => {

    const dataDetail: BlogInterface = await fetch(`${baseURL}${Endpoint.Blog.GetById}/${splitTakeId(params.slug)}`, {
        cache: 'no-store', // Tắt cache
    }).then((res) =>
        res.json()
    );
    const blog = dataDetail || {};
    const relatedBlogs = dataDetail?.related_blogs || []
    const blogUrl = `${publicURL}${ROUTE_PATH.BLOG}/${params.slug}`;
    const imageUrl = configImageURL(blog.image);
    const imageAlt = blog.title;

    let tocItems: { id: string; text: any; level: number; }[] = [];
    let tocItemsLength: { id: string; text: any; level: number; }[] = [];

    var initialLength = 0
    const headings = String(blog.description).match(/<(h[2-3])[^>]*>(.*?)<\/\1>/g);
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

    const updatedContent = String(blog.description).replace(/<(h[2-3])[^>]*>(.*?)<\/\1>/g, (_match: any, tag: string[], text: any, _index: any) => {
        const id = `heading-${tocItems.length}`;

        tocItems.push({ id, text, level: parseInt(tag[1]) });
        tocItemsLength = tocItems.filter((_it, index) => index >= initialLength)
        return `<${tag} id="${id}">${text}</${tag}>`;
    });

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",  // ✅ Đã sửa
        "@id": blogUrl,
        "url": blogUrl,
        "headline": blog.title,   // ✅ Blog dùng "headline"
        "name": blog.title,
        "description": blog.short_description || blog.description,
        "image": {
            "@type": "ImageObject",
            "url": imageUrl,
            "caption": imageAlt
        },
        "datePublished": blog.created_at || new Date().toISOString(), // ✅ Thêm ngày xuất bản
        "dateModified": blog.updated_at || blog.created_at || new Date().toISOString(),
        "author": {  // ✅ Thêm tác giả
            "@type": "Organization",
            "name": "Rimo Việt Nam",
            "url": publicURL
        },
        "publisher": {  // ✅ Thêm nhà xuất bản
            "@type": "Organization",
            "name": "Rimo Việt Nam",
            "logo": {
                "@type": "ImageObject",
                "url": configImageURL('/uploads/RIMO-logo.png'),
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": blogUrl
        },
        "articleSection": "Tin tức", // ✅ Thêm chuyên mục
        "wordCount": blog.short_description?.length || 0, // ✅ Đếm số từ
        "timeRequired": `PT${Math.ceil((blog.short_description?.length || 0) / 300)}M` // ✅ Thời gian đọc
    };

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
                "name": "Tin tức",
                "item": `${publicURL}${ROUTE_PATH.BLOG}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": blog.title,
                "item": blogUrl
            }
        ]
    };

    const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": blogUrl,
        "url": blogUrl,
        "name": blog.title,
        "description": blog.short_description,
        "isPartOf": {
            "@type": "WebSite",
            "@id": `${publicURL}/#website`,
            "url": publicURL,
            "name": 'Rimo Việt Nam'
        },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": imageUrl,
            "caption": imageAlt
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(webpageSchema)
                }}
            />

            <ClientLayout>
                <div className={`${styles.blogSlugContainer} padding-common`}>
                    <div className="flex flex-col lg:flex-row gap-5 relative">
                        {/* Main content - chiếm 75% trên desktop, toàn bộ trên mobile */}
                        <div className="w-full lg:w-3/4">
                            <div className="space-y-6 flex flex-col gap-5">
                                <BreadcrumbCommon
                                    breadcrumb={"Tin tức"}
                                    redirect={ROUTE_PATH.BLOG}
                                    title={blog.title}
                                    blackColor={true} currentURL={blogUrl} />
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                                    {blog.title}
                                </h1>
                                <div className={styles.blogImg}>
                                    <Image src={configImageURL(blog.image)} fill alt="Description" loading="lazy" />
                                </div>
                                <TocBlog tocItems={tocItemsLength} />
                                <div className="tiny-style">
                                    <article
                                        className="prose max-w-none"
                                        dangerouslySetInnerHTML={{ __html: updatedContent }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - chiếm 25% trên desktop, toàn bộ trên mobile */}
                        <div className="w-full lg:w-1/4">
                            <RelationBlogComponent relatedBlogs={relatedBlogs} />
                        </div>
                    </div>
                </div>
            </ClientLayout >
        </>
    )
}

export default BlogSlugPage