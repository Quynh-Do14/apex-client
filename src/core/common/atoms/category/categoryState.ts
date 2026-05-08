import { CategoryAgencyInterface } from "@/infrastructure/interface/category/categoryAgency.interface";
import { CategoryBlogInterface } from "@/infrastructure/interface/category/categoryBlog.interface";
import { CategoryProductHref, CategoryProductInterface } from "@/infrastructure/interface/category/categoryProduct.interface";
import { atom } from "recoil";

export const CategoryBlogState = atom({
    key: 'CATEGORY_BLOG_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <Array<CategoryBlogInterface>>[],

    }, // default value (aka initial value)
});

export const CategoryProductState = atom({
    key: 'CATEGORY_PRODUCT_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <Array<CategoryProductInterface>>[],

    }, // default value (aka initial value)
});

export const CategoryAgencyState = atom({
    key: 'CATEGORY_AGENCY_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <Array<CategoryAgencyInterface>>[],

    }, // default value (aka initial value)
});


export const CategoryProductHrefState = atom({
    key: 'CATEGORY_PRODUC_HREF_T_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <Array<CategoryProductHref>>[],

    }, // default value (aka initial value)
});
