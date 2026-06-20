export interface SubCategoryInterface {
    id?: number;
    name: string;
    image: string;

}

export interface SubCategoryParams {
    page?: number;
    limit?: number;
    search?: string;
}