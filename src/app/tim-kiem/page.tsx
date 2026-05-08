'use client'
import React, { useState, useEffect, Suspense, useLayoutEffect } from "react";
import productService from "@/infrastructure/repository/product/product.service";
import { configImageURL, convertSlug, formatCurrencyVND } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import styles from "@/assets/styles/pages/product/product.module.css"
import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import BreadcrumbCommon from "@/infrastructure/common/Layouts/Breadcumb";
import InputSearchCommon from "@/infrastructure/common/input/input-search-common";
import SelectSearchCommon from "@/infrastructure/common/input/select-search-common";
import ButtonCommon from "@/infrastructure/common/button/button-common";
import { useRecoilValue } from "recoil";
import { CategoryProductState } from "@/core/common/atoms/category/categoryState";
import { useRouter, useSearchParams } from "next/navigation";
import SkeletonProduct from "./skeleton";
const SearchContent = () => {
    const [listProduct, setListProduct] = useState<Array<any>>([])
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

    const categoryProductState = useRecoilValue(CategoryProductState).data

    const onGetListProductAsync = async ({ name = searchText, limit = pageSize, page = currentPage, category_id = categoryId }) => {
        const param = {
            page: page,
            limit: limit,
            search: name,
            category_id: category_id
        }
        try {
            await productService.GetProduct(
                param,
                setLoading
            ).then((res) => {
                setListProduct(res.data);
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
        await onGetListProductAsync({ name: name, limit: limit, page: page, category_id: category_id }).then(_ => { });
    };


    const onSearchParam = async () => {
        // Tạo URL mới với search params
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set('search', searchText);
        params.set('category_id', categoryId);
        params.set('page', '1'); // Reset về trang 1 khi search
        router.push(`${ROUTE_PATH.SEARCH}?${params.toString()}`);

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
        router.push(`${ROUTE_PATH.SEARCH}?${params.toString()}`);

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

    const onReset = () => {
        setSearchText('');
        setCategoryId('');
        setCurrentPage(1);
        router.push(`${ROUTE_PATH.SEARCH}`);
    }

    useLayoutEffect(() => {
        setInitialLoading(false);
    });

    return (
        <ClientLayout>
            <div className={styles.productSection}>
                <div className="padding-common">
                    <BreadcrumbCommon
                        breadcrumb={"Tìm kiếm sản phẩm"}
                        redirect={ROUTE_PATH.PRODUCT}
                        title={""}
                    />
                    <div className={styles.productContent}>
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
                            {/* Search Input */}
                            <div className="sm:col-span-5">
                                <InputSearchCommon
                                    placeholder={'Tìm kiếm tin tức'}
                                    value={searchText}
                                    onChange={onChangeSearchText}
                                    disabled={false}
                                />
                            </div>

                            {/* Category Select */}
                            <div className="sm:col-span-4">
                                <SelectSearchCommon
                                    listDataOfItem={categoryProductState}
                                    onChange={onChangeCategory}
                                    label={"Danh mục sản phẩm"}
                                    value={categoryId}
                                />
                            </div>

                            {/* Search Button */}
                            <div className="sm:col-span-3">
                                <ButtonCommon
                                    onClick={onSearchParam}
                                    title={'Tìm kiếm'}
                                />
                            </div>
                        </div>

                        {/* Loading State */}
                        {initialLoading || loading ? (
                            <SkeletonProduct />
                        ) : (
                            /* Data State */
                            <div className={styles.galleryContainer}>
                                {listProduct.length > 0 ? (
                                    <div className={styles.galleryGrid}>
                                        {listProduct.map(item => (
                                            <Link href={`${ROUTE_PATH.PRODUCT}/${convertSlug(item.name)}-${item.id}.html`}
                                                key={item.id}
                                                className={styles.galleryItem}
                                            >
                                                <div className={styles.itemMedia}>
                                                    <div className={styles.mediaContainer}>
                                                        <div className={styles.thumbnailWrapper}>
                                                            <div
                                                                className={styles.thumbnail}
                                                                style={{ backgroundImage: `url(${configImageURL(item.image)})` }}
                                                            />
                                                            <div className={styles.mediaOverlay}></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={styles.itemContent}>
                                                    <div className={styles.contentWrapper}>
                                                        <h3 className={styles.itemTitle}>{item.name}</h3>
                                                        <div className={styles.itemPrice}>
                                                            {item.price_sale ? (
                                                                <>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                                        <span className={styles.salePrice}>{formatCurrencyVND(item.price_sale)}</span>
                                                                    </div>
                                                                    <span className={styles.originalPrice}>{formatCurrencyVND(item.price)}</span>
                                                                </>
                                                            ) : (
                                                                <span className={styles.normalPrice}>{formatCurrencyVND(item.price)}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    /* No Data State */
                                    <div className={styles.noDataContainer}>
                                        <div className={styles.noDataIcon}>
                                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="8" y1="8" x2="16" y2="16" />
                                                <line x1="16" y1="8" x2="8" y2="16" />
                                            </svg>
                                        </div>
                                        <h3 className={styles.noDataTitle}>Không tìm thấy sản phẩm</h3>
                                        <p className={styles.noDataDescription}>
                                            Không có sản phẩm nào phù hợp với tìm kiếm của bạn.
                                        </p>
                                        <ButtonCommon
                                            onClick={onReset}
                                            title={'Xóa bộ lọc'}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ClientLayout>

    );
};


const SearchPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchContent />
        </Suspense>
    );
};

export default SearchPage;