// app/san-pham/[slug]/page.tsx
import { ROUTE_PATH } from '@/core/common/appRouter';
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb';
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout';
import styles from '@/assets/styles/pages/product/slugProduct.module.css'
import { configImageURL, formatCurrency } from '@/infrastructure/helper/helper';
import { Metadata } from 'next';
import GalleryComponent from './components/gallery';
import { Endpoint } from '@/core/common/apiLink';
import ProductAdvantageComponent from './components/advantage';
import RelationProductComponent from './components/relationProduct';
import { ProductInterface } from '@/infrastructure/interface/product/product.interface';
import BlogInProductSlug from './components/blogRandom';

type Props = {
    params: { slug: string };
};

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL;

// ✅ Hàm fetch product - tái sử dụng
async function getProduct(slug: string): Promise<ProductInterface> {
    const response = await fetch(`${baseURL}${Endpoint.Product.GetById}/${slug}`, {
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch product');
    }

    return response.json();
}

// ✅ Metadata - chỉ chứa metadata, không có schema
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await getProduct(params.slug);
    const productUrl = `${publicURL}${ROUTE_PATH.PRODUCT}/${product.slug}`;

    const keywordConvert = product?.keyword?.map(item => item.keyword) || [];
    const keywords: string[] = [
        product.name,
        product.category_name,
        product.brand_name,
    ].filter((item): item is string => Boolean(item)).concat(keywordConvert);

    return {
        title: `${product.name} - Phim Cách Nhiệt Rimo Chính Hãng`,
        description: product.short_description,
        keywords: keywords,
        openGraph: {
            title: `${product.name} - Phim Cách Nhiệt Rimo Chính Hãng`,
            description: product.short_description,
            images: [{
                url: configImageURL(product.image),
                alt: product.name,
            }],
            type: 'website',
            url: productUrl,
            siteName: publicURL || 'https://rimo.vn',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.name} - Phim Cách Nhiệt Rimo Chính Hãng`,
            description: product.short_description,
            images: [{
                url: configImageURL(product.image),
                alt: product.name,
            }],
        },
        alternates: {
            canonical: productUrl,
        },
        robots: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    };
}

// ✅ Component chính - nơi tạo và hiển thị JSON-LD
const ProductSlugPage = async ({ params }: Props) => {
    // Fetch dữ liệu trực tiếp trong component
    const dataDetail = await getProduct(params.slug);
    const productUrl = `${publicURL}${ROUTE_PATH.PRODUCT}/${dataDetail.slug}`;

    // ✅ Tạo schema ngay trong component với dữ liệu đã fetch
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": productUrl,
        "url": productUrl,
        "name": dataDetail.name,
        "description": dataDetail.short_description || dataDetail.description,
        "image": configImageURL(dataDetail.image),
        "category": dataDetail.category_name,
        "offers": {
            "@type": "Offer",
            "url": productUrl,
            "priceCurrency": "VND",
            "price": dataDetail.price?.toString(),
            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "Công ty TNHH Apex Auto"
            }
        },
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
                "name": "Sản phẩm",
                "item": `${publicURL}${ROUTE_PATH.PRODUCT}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": dataDetail.name,
                "item": productUrl
            }
        ]
    };

    const webpageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": productUrl,
        "url": productUrl,
        "name": dataDetail.name,
        "description": dataDetail.short_description,
        "isPartOf": {
            "@type": "WebSite",
            "@id": `${publicURL}/#website`,
            "url": publicURL,
            "name": 'Rimo'
        },
        "primaryImageOfPage": {
            "@type": "ImageObject",
            "url": configImageURL(dataDetail.image),
            "caption": dataDetail.name,
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productSchema)
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
                <div className={styles.productContainer}>
                    <div className='padding-section'>
                        <BreadcrumbCommon
                            breadcrumb={"Sản phẩm"}
                            redirect={ROUTE_PATH.PRODUCT}
                            title={dataDetail.name}
                            currentURL={productUrl}
                            blackColor={true}
                        />
                    </div>
                    <div className={`${styles.content} padding-section`}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                            <div className="w-full">
                                <GalleryComponent
                                    productName={dataDetail.name}
                                    slides={dataDetail.images}
                                    avatarImage={dataDetail.image}
                                />
                            </div>
                            <div className={styles.productInfo}>
                                <h1>{dataDetail.name}</h1>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        {dataDetail.price_sale ? (
                                            // Nếu có price_sale (giá khuyến mãi)
                                            <>
                                                <span className="text-2xl font-bold text-red-600">
                                                    {formatCurrency(dataDetail.price_sale)}đ
                                                </span>
                                                <span className="text-lg text-gray-500 line-through">
                                                    {formatCurrency(dataDetail.price)}đ
                                                </span>
                                            </>
                                        ) : (
                                            // Không có price_sale (chỉ có giá gốc)
                                            <span className="text-2xl font-bold text-red-600">
                                                {formatCurrency(dataDetail.price)}đ
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className={styles.categoryTag}>
                                        {dataDetail.category_name}
                                    </div>
                                </div>
                                <ProductAdvantageComponent product={dataDetail.productFigure} />
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.content} padding-section`}>
                        <div className={styles.specificationHeader}>
                            <div className={styles.title}>Mô tả sản phẩm</div>
                        </div>
                        <div className="tiny-style">
                            <article
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: dataDetail.description }}
                            />
                        </div>
                    </div>

                    <div className={`${styles.content} padding-section`}>
                        <div className={styles.specificationHeader}>
                            <div className={styles.title}>Sản phẩm tương tự</div>
                        </div>
                        <RelationProductComponent listProduct={dataDetail.sameCategoryProducts} />
                    </div>

                    {/* <div className={`${styles.content} padding-section`}>
                        <div className={styles.specificationHeader}>
                            <div className={styles.title}>Tin tức</div>
                        </div>
                        <BlogInProductSlug />
                    </div> */}
                </div>
            </ClientLayout>
        </>
    );
}

export default ProductSlugPage;