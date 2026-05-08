export interface BannerInterface {
    id?: number;
    name: string;
    type: "HOMEPAGE" | "HOMEPAGE_SUB" | "INTRODUCE" | "AGENCY" | "CONTACT" | "POLICY";
    image: string;
}

export interface BannerParams {
    page?: number;
    limit?: number;
    search?: string;
    type?: "HOMEPAGE" | "HOMEPAGE_SUB" | "INTRODUCE" | "AGENCY" | "CONTACT" | "POLICY";
}