// app/sitemap.ts
import { MetadataRoute } from 'next'
import { Endpoint } from '@/core/common/apiLink'
import { ProductInterface } from '@/infrastructure/interface/product/product.interface'
import { BlogInterface } from '@/infrastructure/interface/blog/blog.interface'

const baseURL = process.env.NEXT_PUBLIC_API_URL
const publicURL = process.env.NEXT_PUBLIC_PUBLIC_URL


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch products
  const productsRes = await fetch(`${baseURL}${Endpoint.Product.Get}`, {
    next: { revalidate: 3600 }
  })
  const productsRaw = await productsRes.json()
  const products: ProductInterface[] = productsRaw.data

  // Fetch blogs
  const blogsRes = await fetch(`${baseURL}${Endpoint.Blog.Get}`, {
    next: { revalidate: 3600 }
  })
  const blogsRaw = await blogsRes.json()
  const blogs: BlogInterface[] = blogsRaw.data

  // Static URLs
  const staticUrls = [
    {
      url: 'https://rimo.vn/',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: 'https://rimo.vn/san-pham',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://rimo.vn/dai-ly',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://rimo.vn/tin-tuc',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://rimo.vn/lien-he',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: 'https://rimo.vn/gioi-thieu',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Chính sách pages
    {
      url: 'https://rimo.vn/chinh-sach/chinh-sach-bao-hanh-doi-tra-hang',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://rimo.vn/chinh-sach/chinh-sach-bao-mat',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://rimo.vn/chinh-sach/chinh-sach-giao-hang',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://rimo.vn/chinh-sach/chinh-sach-mua-hang',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://rimo.vn/chinh-sach/chinh-sach-thanh-toan',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://rimo.vn/chinh-sach/thong-tin-ve-dieu-kien-giao-dich-chung',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Dynamic product URLs
  const productUrls = products && products.length && products.map((product) => ({
    url: `${publicURL}/san-pham/${product.slug}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Dynamic blog URLs
  const blogUrls = blogs && blogs.length && blogs.map((blog) => ({
    url: `${publicURL}/tin-tuc/${blog.slug}.html`,
    lastModified: blog.updated_at ? new Date(blog.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticUrls, ...productUrls || [], ...blogUrls || []]
}