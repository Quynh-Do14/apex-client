'use client'
import { ROUTE_PATH } from '@/core/common/appRouter'
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb'
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout'
import React, { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import styles from "@/assets/styles/pages/blog/blog.module.css";
import Link from 'next/link';
import { configImageURL, convertDateOnlyShow } from '@/infrastructure/helper/helper';
import blogService from '@/infrastructure/repository/blog/blog.service'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRecoilValue } from 'recoil';
import Image from 'next/image'
import BlogSkeleton from './skeleton'
import { PaginationNoSizeCommon } from '@/infrastructure/common/pagination/PaginationNoSize'
import InputSearchCommon from '@/infrastructure/common/input/input-search-common'
import SelectSearchCommon from '@/infrastructure/common/input/select-search-common'
import ButtonCommon from '@/infrastructure/common/button/button-common'
import { CategoryBlogState } from '@/core/common/atoms/category/categoryState'
import { BlogInterface } from '@/infrastructure/interface/blog/blog.interface'

const BlogContent = () => {
    const [listBlog, setListBlog] = useState<Array<BlogInterface>>([])
    const [searchText, setSearchText] = useState<string>("");
    const [totalPage, setTotalPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalElement, setTotalElement] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(8);
    const [loading, setLoading] = useState<boolean>(false);
    const [categoryId, setCategoryId] = useState<string>("");
    const [initialLoading, setInitialLoading] = useState<boolean>(true);

    const router = useRouter(); // Từ next/navigation
    const searchParams = useSearchParams(); // Dùng useSearchParams thay vì router.query

    // Lấy các query parameters
    const search = searchParams?.get('search') || '';
    const page = searchParams?.get('page') || '1';
    const limit = searchParams?.get('limit') || '8';
    const category_id = searchParams?.get('category_id') || '';

    const categoryBlogState = useRecoilValue(CategoryBlogState).data

    const onGetListBlogAsync = async ({ name = searchText, limit = pageSize, page = currentPage, category_id = categoryId }) => {
        const param = {
            page: page,
            limit: limit,
            search: name,
            category_id: category_id
        }
        try {
            await blogService.GetBlog(
                param,
                setLoading
            ).then((res) => {
                setListBlog(res.data);
                setTotalElement(res.limit);
                setTotalPage(res.totalPages);
                setTotal(res.total);
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const onSearch = async (name = searchText, limit = pageSize, page = 1, category_id = categoryId) => {
        await onGetListBlogAsync({ name: name, limit: limit, page: page, category_id: category_id }).then(_ => { });
    };


    const onSearchParam = async () => {
        // Tạo URL mới với search params
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('search', searchText);
        params.set('category_id', categoryId);
        params.set('page', '1'); // Reset về trang 1 khi search
        router.push(`${ROUTE_PATH.BLOG}?${params.toString()}`);

        await onSearch(searchText, pageSize, 1, categoryId).then(_ => { });
    }

    const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(e.target.value);
    };

    const onChangePage = async (page: number) => {
        setCurrentPage(page);

        // Cập nhật params với page mới
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('page', page.toString());
        router.push(`${ROUTE_PATH.BLOG}?${params.toString()}`);

        await onSearch(searchText, pageSize, page, categoryId).then(_ => { });
    }


    useEffect(() => {
        const parsedPage = parseInt(page) || 1;
        const parsedLimit = parseInt(limit) || 8;
        const parsedSearch = search || "";
        const parsedCategory = category_id || "";

        setSearchText(parsedSearch);
        setCurrentPage(parsedPage);
        setPageSize(parsedLimit);
        setCategoryId(parsedCategory);

        onSearch(parsedSearch, parsedLimit, parsedPage, parsedCategory);
    }, [search, page, limit, category_id]); // Theo dõi các giá trị từ searchParams

    useLayoutEffect(() => {
        setInitialLoading(false);
    });
    return (
        <ClientLayout>
            <div className={styles.blogContainer}>
                <div className='padding-common'>
                    <BreadcrumbCommon
                        breadcrumb={"Tin tức"}
                        redirect={ROUTE_PATH.BLOG}
                        title={"Tin tức mới nhất"}
                        blackColor={true}
                    />
                    <div className={styles.newsArticleContainer}>
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 mb-8">
                            <div className="sm:col-span-5">
                                <InputSearchCommon
                                    placeholder={'Tìm kiếm tin tức'}
                                    value={searchText}
                                    onChange={onChangeSearchText}
                                    disabled={false}
                                />
                            </div>

                            <div className="sm:col-span-5">
                                <SelectSearchCommon
                                    listDataOfItem={categoryBlogState}
                                    onChange={onChangeCategory}
                                    label={"Danh mục tin tức"}
                                    value={categoryId}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <ButtonCommon
                                    onClick={onSearchParam}
                                    title={'Tìm kiếm'}
                                />
                            </div>
                        </div>
                        {/* News Grid */}
                        <div className={styles.newsGrid}>
                            {loading || initialLoading
                                ?
                                <BlogSkeleton />
                                :
                                listBlog.map((article, index) => (
                                    <Link
                                        href={`${ROUTE_PATH.BLOG}/${article?.slug}.html`} key={index} className={styles.newsCard}>
                                        <div className={styles.cardImage}>
                                            <Image
                                                src={configImageURL(article.image)}
                                                alt={article.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            <div className={styles.cardCategory}>
                                                <span className={styles.categoryText}>
                                                    {article.category_name}
                                                </span>
                                            </div>
                                            <div className={styles.cardOverlay}></div>
                                        </div>
                                        <div className={styles.cardContent}>
                                            <h3 className={styles.cardTitle}>{article.title}</h3>
                                            <p className={styles.cardExcerpt}>{article.short_description}</p>
                                            <div className={styles.cardMeta}>
                                                <div className={styles.metaItem}>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <polyline points="12 6 12 12 16 14" />
                                                    </svg>
                                                    <span>{convertDateOnlyShow(article.created_at)}</span>
                                                </div>
                                                <div className={styles.metaItem}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                        <circle cx="12" cy="7" r="4" />
                                                    </svg>
                                                    <span>{article.user_name}</span>
                                                </div>
                                            </div>
                                        </div>

                                    </Link>
                                ))}
                        </div>
                        <PaginationNoSizeCommon
                            total={total}
                            currentPage={Number(page)}
                            onChangePage={onChangePage}
                            pageSize={pageSize}
                        />
                    </div>
                </div>
            </div>
        </ClientLayout>
    )
}

const BlogPage = () => {
    return (
        <Suspense fallback={<BlogSkeleton />}>
            <BlogContent />
        </Suspense>
    );
};

export default BlogPage;