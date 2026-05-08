export interface CategoryProductInterface {
    id?: number;
    name: string;
    nameSplit: string;
    description: string;
    image: string;
    slug: string
}

export interface CategoryProductParams {
    page?: number;
    limit?: number;
    search?: string;
}
export interface CategoryProductHref {
    href: string
    label: string
}
