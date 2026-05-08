import { MetadataRoute } from 'next'

// ✅ Đúng cách
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // AI Crawlers
            {
                userAgent: [
                    'GPTBot',
                    'ChatGPT-User',
                    'CCBot',
                    'OAI-SiteChecker',
                    'anthropic-ai',
                    'FacebookBot',
                    'Claude-Web'
                ],
                disallow: '/',
            },
            // Googlebot
            {
                userAgent: 'Googlebot',
                allow: [
                    '/',
                    '/tin-tuc/',
                    '/san-pham/',
                    '/dai-ly/',
                    '/gioi-thieu',
                    '/lien-he',
                    '/chinh-sach/chinh-sach-bao-hanh-doi-tra-hang',
                    '/chinh-sach/chinh-sach-bao-mat',
                    '/chinh-sach/chinh-sach-giao-hang',
                    '/chinh-sach/chinh-sach-mua-hang',
                    '/chinh-sach/chinh-sach-thanh-toan',
                    '/chinh-sach/thong-tin-ve-dieu-kien-giao-dich-chung',

                ],
                disallow: [
                    '/api/',
                    '/admin/',
                    '/profile/',
                    '/login/',
                    '/register/',
                    '/user/',
                ],
            },
            // Google-Extended (AI crawler của Google)
            {
                userAgent: 'Google-Extended',
                disallow: '/', // Chặn nếu không muốn AI của Google crawl
            },
            // Default rule
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/tin-tuc/',
                    '/san-pham/',
                    '/dai-ly/',
                    '/gioi-thieu',
                    '/lien-he',
                    '/chinh-sach/chinh-sach-bao-hanh-doi-tra-hang',
                    '/chinh-sach/chinh-sach-bao-mat',
                    '/chinh-sach/chinh-sach-giao-hang',
                    '/chinh-sach/chinh-sach-mua-hang',
                    '/chinh-sach/chinh-sach-thanh-toan',
                    '/chinh-sach/thong-tin-ve-dieu-kien-giao-dich-chung',
                ],
                disallow: [
                    '/api/',
                    '/admin/',
                    '/profile/',
                    '/login/',
                    '/register/',
                    '/user/',
                ],
            },
        ],
        sitemap: 'https://rimo.vn/sitemap.xml',
    }
}