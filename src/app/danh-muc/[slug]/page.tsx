'use client'
import React, { useState, useEffect, Suspense, useLayoutEffect } from "react";
import productService from "@/infrastructure/repository/product/product.service";
import { configImageURL, convertSlug, formatCurrencyVND, splitTakeId } from "@/infrastructure/helper/helper";
import Link from "next/link";
import { ROUTE_PATH } from "@/core/common/appRouter";
import styles from "@/assets/styles/pages/product/product.module.css"
import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import BreadcrumbCommon from "@/infrastructure/common/Layouts/Breadcumb";
import InputSearchCommon from "@/infrastructure/common/input/input-search-common";
import SelectSearchCommon from "@/infrastructure/common/input/select-search-common";
import ButtonCommon from "@/infrastructure/common/button/button-common";
import { useRecoilValue } from "recoil";
import { CategoryProductState, SubCategoryState } from "@/core/common/atoms/category/categoryState";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductInterface, ProductParams } from "@/infrastructure/interface/product/product.interface";
import Image from "next/image";
import SkeletonProduct from "@/app/tim-kiem/skeleton";
import { useParams } from 'next/navigation';
import { PaginationNoSizeCommon } from "@/infrastructure/common/pagination/PaginationNoSize";

type ParamsType = {
    slug: string
};

const ProductContent = () => {
    const [listProduct, setListProduct] = useState<Array<ProductInterface>>([])
    const [searchText, setSearchText] = useState<string>("");
    const [totalPage, setTotalPage] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalElement, setTotalElement] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [categoryId, setCategoryId] = useState<string>("");
    const [categoryName, setCategoryName] = useState<string>("");
    const [isSubCategory, setIsSubCategory] = useState<boolean>(false);
    const [subCategoryId, setSubCategoryId] = useState<string>("");

    const params: ParamsType = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Lấy các query parameters
    const search = searchParams?.get('search') || '';
    const page = searchParams?.get('page') || '1';
    const limit = searchParams?.get('limit') || '10';
    const subCategory = searchParams?.get('subCategory') || '';

    const categoryProductState = useRecoilValue(CategoryProductState).data
    const subCategoryState = useRecoilValue(SubCategoryState).data

    const onGetListProductAsync = async ({ name = searchText, limit = pageSize, page = currentPage, category_id = categoryId, sub_category_id = subCategoryId }) => {
        const param: ProductParams = {
            page: page,
            limit: limit,
            search: name,
            category_id: category_id,
            sub_category_id: sub_category_id
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

    const onSearch = async (name = searchText, limit = pageSize, page = 1, category_id = categoryId, sub_category_id = subCategoryId) => {
        await onGetListProductAsync({ name: name, limit: limit, page: page, category_id: category_id, sub_category_id: sub_category_id });
    };

    const onSearchParam = async () => {
        // Tạo URL mới với search params
        const newParams = new URLSearchParams(searchParams?.toString() || '');
        newParams.set('search', searchText);
        newParams.set('page', '1');
        isSubCategory ? newParams.set('subCategory', subCategoryId) : null;

        // Xóa category_id cũ nếu có
        newParams.delete('category_id');

        // Chỉ gọi router.push, không gọi API trực tiếp
        // API sẽ được gọi trong useEffect khi URL thay đổi
        if (categoryId) {
            router.push(`${ROUTE_PATH.CATEGORY}/${categoryName}?${newParams.toString()}`);
        } else {
            router.push(`${ROUTE_PATH.PRODUCT}?${newParams.toString()}`);
        }
    }

    const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value || ""
        setCategoryId(value);
        const result = categoryProductState.find(item => String(item.id) === String(value))
        setCategoryName(String(result?.slug))
        setIsSubCategory(result ? result.sub_category : false)
    };

    const onChangeSubCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value || ""
        setSubCategoryId(value);
    };

    const onChangePage = async (page: number) => {
        setCurrentPage(page);

        // Cập nhật params với page mới
        const newParams = new URLSearchParams(searchParams?.toString() || '');
        newParams.set('page', page.toString());
        isSubCategory ? newParams.set('subCategory', '') : null;

        // Chỉ gọi router.push, API sẽ được gọi trong useEffect
        if (categoryId) {
            router.push(`${ROUTE_PATH.CATEGORY}/${categoryName}?${newParams.toString()}`);
        } else {
            router.push(`${ROUTE_PATH.PRODUCT}?${newParams.toString()}`);
        }
    }

    // Effect để đồng bộ state với URL và gọi API
    useEffect(() => {
        if (!categoryProductState || categoryProductState.length === 0) return;

        const fetchData = async () => {
            const parsedPage = parseInt(page) || 1;
            const parsedLimit = parseInt(limit) || 10;
            const parsedSearch = search || "";
            const parsedSubCategory = subCategory || "";

            // Tìm category dựa trên slug từ URL
            let currentCategoryId = categoryId;
            let currentCategoryName = categoryName;

            // Nếu đang ở trang category detail
            if (params.slug) {
                const categoryRes = categoryProductState.find(
                    item => String(item.slug) === String(params.slug)
                );
                if (categoryRes?.sub_category) {
                    setIsSubCategory(categoryRes ? categoryRes.sub_category : false)
                    setSubCategoryId(parsedSubCategory);
                }
                if (categoryRes) {
                    currentCategoryId = String(categoryRes.id);
                    currentCategoryName = String(categoryRes.slug);
                    setCategoryId(currentCategoryId);
                    setCategoryName(currentCategoryName);
                }
            }

            // Cập nhật state từ URL
            setSearchText(parsedSearch);
            setCurrentPage(parsedPage);
            setPageSize(parsedLimit);

            // Gọi API
            await onSearch(
                parsedSearch,
                parsedLimit,
                parsedPage,
                currentCategoryId,
                parsedSubCategory
            );
        };

        fetchData();
    }, [
        search,
        page,
        limit,
        params.slug,
        categoryProductState,
        subCategory
        // Chỉ chạy lại khi URL hoặc categoryProductState thay đổi
    ]);

    const onReset = () => {
        setSearchText('');
        setCurrentPage(1);
        setCategoryId('');
        setCategoryName('');
        setSubCategoryId('');
        router.push(`${ROUTE_PATH.PRODUCT}`);
    }

    useLayoutEffect(() => {
        setInitialLoading(false);
    }, []);

    return (
        <ClientLayout>
            <div className={styles.productSection}>
                <div className={`padding-common`}>
                    <BreadcrumbCommon
                        breadcrumb={"Sản phẩm"}
                        redirect={ROUTE_PATH.PRODUCT}
                        title={"Danh sách sản phẩm"}
                        blackColor={true}
                    />
                    <div className={styles.productContent}>
                        {
                            isSubCategory
                                ?
                                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
                                    {/* Search Input */}
                                    <div className="sm:col-span-4">
                                        <InputSearchCommon
                                            placeholder={'Tìm kiếm sản phẩm'}
                                            value={searchText}
                                            onChange={onChangeSearchText}
                                            disabled={false}
                                        />
                                    </div>
                                    {/* Category Select */}
                                    <div className="sm:col-span-3">
                                        <SelectSearchCommon
                                            listDataOfItem={categoryProductState}
                                            onChange={onChangeCategory}
                                            label={"Danh mục sản phẩm"}
                                            value={categoryId}
                                            labelName="nameSplit"
                                            valueName="id"
                                        />
                                    </div>
                                    <div className="sm:col-span-3">
                                        <SelectSearchCommon
                                            listDataOfItem={subCategoryState}
                                            onChange={onChangeSubCategory}
                                            label={"Danh mục phụ"}
                                            value={subCategoryId}
                                            labelName="name"
                                            valueName="id"
                                        />
                                    </div>
                                    {/* Search Button */}
                                    <div className="sm:col-span-2">
                                        <ButtonCommon
                                            onClick={onSearchParam}
                                            title={'Tìm kiếm'}
                                        />
                                    </div>
                                </div>
                                :
                                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
                                    {/* Search Input */}
                                    <div className="sm:col-span-5">
                                        <InputSearchCommon
                                            placeholder={'Tìm kiếm sản phẩm'}
                                            value={searchText}
                                            onChange={onChangeSearchText}
                                            disabled={false}
                                        />
                                    </div>
                                    {/* Category Select */}
                                    <div className="sm:col-span-5">
                                        <SelectSearchCommon
                                            listDataOfItem={categoryProductState}
                                            onChange={onChangeCategory}
                                            label={"Danh mục sản phẩm"}
                                            value={categoryId}
                                            labelName="nameSplit"
                                            valueName="id"
                                        />
                                    </div>
                                    {/* Search Button */}
                                    <div className="sm:col-span-2">
                                        <ButtonCommon
                                            onClick={onSearchParam}
                                            title={'Tìm kiếm'}
                                        />
                                    </div>
                                </div>
                        }


                        {/* Loading State */}
                        {
                            initialLoading || loading ? (
                                <SkeletonProduct />
                            ) : listProduct.length > 0 ? (
                                /* Data State */
                                <div className={styles.galleryContainer}>
                                    <div className={styles.galleryGrid}>
                                        {listProduct.map(item => (
                                            <Link href={`${ROUTE_PATH.PRODUCT}/${item.slug}`}
                                                key={item.id}
                                                className={styles.galleryItem}
                                            >
                                                <div className={styles.itemMedia}>
                                                    <div className={styles.mediaContainer}>
                                                        <div className={styles.thumbnailWrapper}>
                                                            <Image src={configImageURL(item.image)} alt={item.name} fill className="object-cover" />
                                                            <div className={styles.mediaOverlay}></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={styles.itemContent}>
                                                    <div className={styles.contentWrapper}>
                                                        <h2 className={styles.itemTitle}>{item.name}</h2>
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
                                    <PaginationNoSizeCommon
                                        total={total}
                                        currentPage={Number(page)}
                                        onChangePage={onChangePage}
                                        pageSize={pageSize}
                                    />
                                </div>
                            ) : (
                                <div className={styles.galleryContainer}>
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
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </ClientLayout>

    );
};

const ProductPage = () => {
    return (
        <Suspense fallback={<SkeletonProduct />}>
            <ProductContent />
        </Suspense>
    );
};

export default ProductPage;