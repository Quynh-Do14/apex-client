import { ProductHref } from "@/infrastructure/interface/product/product.interface";
import { atom } from "recoil";


export const ProductState = atom({
    key: 'PRODUCT_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <Array<ProductHref>>[],

    }, // default value (aka initial value)
});
