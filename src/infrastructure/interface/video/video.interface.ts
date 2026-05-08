export interface VideoInterface {
    id: number;
    name: string;
    description?: string;
    img?: string;
    link_url: string;
}

export interface VideoParams {
    page?: number;
    limit?: number;
    search?: string;
}
