export interface ContentPageInterface {
    id?: number;
    type: 'FOOTER' | 'INTRODUCE' | 'GIAO_DICH_CHUNG' | 'BAO_MAT' | 'MUA_HANG' | 'BAO_HANH' | 'VAN_CHUYEN' | 'THANH_TOAN';
    content: string;
}

export interface ContentPageParams {
    page?: number;
    limit?: number;
    search?: string;
    type?: string
}
