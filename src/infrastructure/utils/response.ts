import axiosInstance from "@/core/api/axiosInstance";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Define generic response interface
export interface ApiResponse<T = any> {
    data: T;
    status: number;
    message?: string;
    [key: string]: any;
}

// Define generic error interface
export interface ApiError {
    status: number;
    message: string;
    errors?: Record<string, string[]>;
    [key: string]: any;
}

// Request configuration interface
export interface RequestConfig {
    headers?: Record<string, string>;
    params?: Record<string, any>;
    timeout?: number;
    skipAuth?: boolean;
    retry?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';
    [key: string]: any;
}

// Generic request parameters
export interface RequestParams {
    [key: string]: any;
}

export class RequestService {
    /**
     * Generic request method
     */
    private static async request<T = any>(
        method: 'get' | 'post' | 'put' | 'patch' | 'delete',
        url: string,
        data?: any,
        config?: RequestConfig
    ): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axiosInstance({
                method,
                url,
                data: method !== 'get' && method !== 'delete' ? data : undefined,
                params: method === 'get' ? data : undefined,
                ...config
            });
            return response.data;
        } catch (error: any) {
            // Handle and transform error
            const apiError: ApiError = {
                status: error.response?.status || 500,
                message: error.response?.data?.message || error.message || 'An error occurred',
                errors: error.response?.data?.errors,
                ...error.response?.data
            };
            throw apiError;
        }
    }

    /**
     * GET request
     */
    static async get<T = any>(url: string, params?: RequestParams, config?: RequestConfig): Promise<T> {
        return this.request<T>('get', url, params, config);
    }

    /**
     * POST request with JSON data
     */
    static async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return this.request<T>('post', url, data, {
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers
            },
            ...config
        });
    }

    /**
     * POST request with FormData
     */
    static async postForm<T = any>(url: string, formData: any, config?: RequestConfig): Promise<T> {
        return this.request<T>('post', url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...config?.headers
            },
            ...config
        });
    }

    /**
     * PUT request with JSON data
     */
    static async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return this.request<T>('put', url, data, {
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers
            },
            ...config
        });
    }

    /**
     * PUT request with array data
     */
    static async putArray<T = any>(url: string, data: any[] = [], config?: RequestConfig): Promise<T> {
        return this.request<T>('put', url, data, {
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers
            },
            ...config
        });
    }

    /**
     * PUT request with FormData
     */
    static async putForm<T = any>(url: string, formData: any, config?: RequestConfig): Promise<T> {
        return this.request<T>('put', url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...config?.headers
            },
            ...config
        });
    }

    /**
     * PATCH request with JSON data
     */
    static async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
        return this.request<T>('patch', url, data, {
            headers: {
                'Content-Type': 'application/json',
                ...config?.headers
            },
            ...config
        });
    }

    /**
     * PATCH request with FormData
     */
    static async patchForm<T = any>(url: string, formData: FormData, config?: RequestConfig): Promise<T> {
        return this.request<T>('patch', url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...config?.headers
            },
            ...config
        });
    }

    /**
     * DELETE request
     */
    static async delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
        return this.request<T>('delete', url, undefined, config);
    }

    /**
     * Helper method for handling paginated requests
     */
    static async getPaginated<T = any>(
        url: string,
        page: number,
        limit: number,
        params?: RequestParams,
        config?: RequestConfig
    ): Promise<T> {
        const paginationParams = {
            page,
            limit,
            ...params
        };
        return this.get<T>(url, paginationParams, config);
    }

    /**
     * Upload file with progress tracking
     */


}

// Export as both default and named export
export default RequestService;