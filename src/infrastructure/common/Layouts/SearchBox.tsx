import { ROUTE_PATH } from '@/core/common/appRouter';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect, useCallback } from 'react'
import "@/assets/styles/components/header.css";
import productService from '@/infrastructure/repository/product/product.service';

const SearchBoxHeader = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [listProduct, setListProduct] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');
    const searchRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 300); // 300ms debounce

        return () => clearTimeout(timer);
    }, [searchText]);

    // Fetch suggestions when debounced search term changes
    useEffect(() => {
        if (debouncedSearch.trim()) {
            onGetListProductAsync(debouncedSearch);
        } else {
            setListProduct([]);
        }
    }, [debouncedSearch]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const onSearch = (searchValue?: string) => {
        const searchTerm = searchValue || searchText;
        if (searchTerm.trim()) {
            router.push(`${ROUTE_PATH.SEARCH}?search=${encodeURIComponent(searchTerm)}`);
            setShowSuggestions(false);
        }
    }

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
        setShowSuggestions(true);
    }

    const onGetListProductAsync = async (searchText: string) => {
        if (!searchText.trim()) {
            setListProduct([]);
            return;
        }

        const param = {
            search: searchText,
            limit: 5 // Limit suggestions to 5 items
        }
        try {
            await productService.GetProduct(
                param,
                setLoading
            ).then((res) => {
                setListProduct(res.data || []);
            })
        }
        catch (error) {
            console.error(error);
            setListProduct([]);
        }
    }

    const handleSuggestionClick = (product: any) => {
        setSearchText(product.name || product.title || '');
        setShowSuggestions(false);

        // Navigate to product detail or search with the selected product
        if (product.id) {
            // If you have a product detail page
            // router.push(`${ROUTE_PATH.PRODUCT_DETAIL}/${product.id}`);

            // Or search with the product name
            onSearch(product.name || product.title);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch();
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    }

    return (
        <div className="search-container" ref={searchRef}>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="search-input"
                    aria-label="Search input"
                    onChange={onChangeSearch}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(true)}
                    value={searchText}
                    autoComplete="off"
                />
                <button
                    className="search-btn"
                    aria-label="Search"
                    onClick={() => onSearch()}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="search-icon"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                </button>

                {/* Suggestions Dropdown */}
                {showSuggestions && listProduct.length > 0 && (
                    <div className="suggestions-dropdown">
                        <div className="suggestions-header">
                            <span className="suggestions-title">Gợi ý tìm kiếm</span>
                        </div>
                        <div className="suggestions-list">
                            {listProduct.map((product, index) => (
                                <div
                                    key={product.id || index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(product)}
                                >
                                    <div className="suggestion-content">
                                        <div className="suggestion-text">
                                            {product.name || product.title}
                                        </div>
                                        {product.category && (
                                            <div className="suggestion-category">
                                                {product.category}
                                            </div>
                                        )}
                                    </div>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                        <div
                            className="suggestion-footer"
                            onClick={() => onSearch()}
                        >
                            <span>Xem tất cả kết quả cho "{searchText}"</span>
                        </div>
                    </div>
                )}

                {showSuggestions && loading && (
                    <div className="suggestions-dropdown">
                        <div className="loading-suggestions">
                            <div className="spinner"></div>
                            <span>Đang tìm kiếm...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBoxHeader