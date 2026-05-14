import type { Metadata } from "next";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import RecoilProvider from "./ClientProviders";
import { configImageURL } from "@/infrastructure/helper/helper";
import { Work_Sans } from 'next/font/google';
import "@/assets/styles/common/tiny-editor-common.css"
import Script from "next/script";
import { Endpoint } from "@/core/common/apiLink";
import { ConfigPageInterface } from "@/infrastructure/interface/configPage/configPage.interface";

const workSans = Work_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-work-sans',
  fallback: ['system-ui', 'Arial', 'sans-serif'],
});

// Danh sách keywords cho SEO
const keywords = [
  "Apexauto",
  "Apex auto",
  "Apex auto Thành phố Hồ Chí Minh",
  "Apexauto Thành phố Hồ Chí Minh",
  "Zestech",
  "3M",
  "Inmax",
  "Màn hình android",
  "Android box",
  "Lắp đặt màn hình Zestech",
  "Lắp màn android tại Thành phố Hồ Chí Minh",
  "Lắp màn Zestech tại Thành phố Hồ Chí Minh",
  "Độ xe điện",
  "Lắp ốp pin xe điện ở đâu",
  "Lắp ốp pin xe Vinfast"
];

// Default metadata (fallback)
let defaultMetadata = {
  title: "TRUNG TÂM PHỤ KIỆN ĐỒ CHƠI XE HƠI CAO CẤP APEX AUTO",
  description: "RIMO, phim cách nhiệt Rimo, phim ppf Rimo, phim bảo vệ sơn Rimo, dán phim cách nhiệt Rimo, dán ppf Rimo, phim ceramic Rimo, phim cách nhiệt nano ceramic Rimo, phim cách nhiệt cao cấp Rimo, phim cách nhiệt chính hãng Rimo, cách nhiệt ô tô Hà Nội, cửa hàng dán phim cách nhiệt, đại lý phim cách nhiệt, phim cách nhiệt giá tốt, phim cách nhiệt ô tô giá rẻ, bảo vệ sơn xe hơi, phim bảo vệ sơn xe, PPF bảo vệ sơn, Paint Protection Film, phim cách nhiệt chống tia UV, phim cách nhiệt cách âm, dịch vụ dán phim ô tô, lắp đặt phim cách nhiệt, phim cách nhiệt ô tô toàn quốc, địa chỉ dán phim cách nhiệt uy tín",
};

const siteURL = process.env.NEXT_PUBLIC_PUBLIC_URL || '';
const companyName = "Công ty TNHH Apex Auto";
const organization = "GPKD số 0107801299 do Sở KH và ĐT TP Thành phố Hồ Chí Minh cấp. Chuyên nhập khẩu và phân phối phụ kiện ô tô, màn hình Android, phim cách nhiệt Rimo chính hãng.";
const product = "Phụ kiện ô tô cao cấp: Màn hình Android, Android Box, phim cách nhiệt Rimo, 3M, Inmax, Zestech. Sản phẩm chính hãng, bảo hành dài hạn, lắp đặt chuyên nghiệp tại Thành phố Hồ Chí Minh";
const webSchemaDescription = "Apex Auto - Trung tâm phụ kiện ô tô hàng đầu tại Thành phố Hồ Chí Minh. Cung cấp màn hình Android, phim cách nhiệt, phụ kiện xe hơi chính hãng, giá tốt, dịch vụ chuyên nghiệp.";

const GA_TRACKING_ID = 'GTM-KRSBH77K';

// Tạo async function để fetch metadata
async function getMetadata() {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  if (!baseURL) {
    console.warn('NEXT_PUBLIC_API_URL is not defined');
    return defaultMetadata;
  }

  try {
    const response = await fetch(`${baseURL}${Endpoint.ConfigPage.Get}?type=TITLE_PAGE`, {
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid JSON response');
    }

    const config = await response.json();
    const configPage: ConfigPageInterface = config.data?.[0];
    defaultMetadata.title = configPage.title
    defaultMetadata.description = configPage.description
    return {
      title: configPage?.title || defaultMetadata.title,
      description: configPage?.description || defaultMetadata.description,
    };
  } catch (error) {
    console.error('Failed to fetch metadata:', error);
    return defaultMetadata;
  }
}

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getMetadata();

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: keywords.join(", "),
    authors: [{ name: companyName }],
    openGraph: {
      type: "website",
      url: process.env.NEXT_PUBLIC_PUBLIC_URL,
      title: metadata.title,
      description: metadata.description,
      images: [
        {
          url: configImageURL('/uploads/apex-auto-logo.png'),
          alt: "Apex Auto Thành phố Hồ Chí Minh - Phụ kiện ô tô cao cấp",
        },
      ],
      siteName: "Apex Auto Thành phố Hồ Chí Minh",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [configImageURL('/uploads/apex-auto-logo.png')],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_PUBLIC_URL,
    },
  };
}

// Schema components
const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "@id": `${siteURL}/#localbusiness`,
    "name": "Công ty TNHH Apex Auto",
    "image": configImageURL('/uploads/logo.png'),
    "description": "Trung tâm phụ kiện và đồ chơi xe hơi cao cấp tại Thành phố Hồ Chí Minh. Chuyên cung cấp và lắp đặt màn hình Android, phim cách nhiệt Rimo, phụ kiện ô tô chính hãng",
    "url": siteURL,
    "hasMap": `https://maps.app.goo.gl/xxxxxxxxxx`, // Cập nhật link Google Maps thực tế
    "telephone": "+84866209168", // Cập nhật số điện thoại thực tế
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Số 123, Đường XXX, Phường YYY", // Cập nhật địa chỉ thực tế
      "addressLocality": "Thủ Dầu Một",
      "addressRegion": "Thành phố Hồ Chí Minh",
      "postalCode": "820000",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "10.7756", // Cập nhật tọa độ thực tế của Thành phố Hồ Chí Minh
      "longitude": "106.7019" // Cập nhật tọa độ thực tế của Thành phố Hồ Chí Minh
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "priceRange": "$$",
    "serviceType": "Màn hình Android, Phim cách nhiệt, Phụ kiện ô tô, Lắp đặt màn hình, Độ xe điện",
    "areaServed": {
      "@type": "City",
      "name": "Thành phố Hồ Chí Minh"
    },
    "sameAs": ["https://www.facebook.com/vn.apexauto"], // Cập nhật Facebook thực tế
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteURL}/#organization`,
    "name": companyName,
    "url": siteURL,
    "logo": configImageURL('/uploads/apex-auto-logo.png'),
    "description": organization,
    "sameAs": ["https://www.facebook.com/vn.apexauto"], // Cập nhật Facebook thực tế
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84866209168", // Cập nhật số điện thoại thực tế
      "contactType": "customer service",
      "availableLanguage": ["Vietnamese", "English"],
      "areaServed": "VN"
    }
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

const WebsiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteURL}/#website`,
    "url": siteURL,
    "name": defaultMetadata.title,
    "description": webSchemaDescription,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteURL}/tim-kiem?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

const ProductSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteURL}/#product`,
    "name": "Phim cách nhiệt,PPF bảo vệ sơn,Màn hình android,Android Box,Đèn tăng sáng,Khám phá thêm,Độ xe điện",
    "description": product,
    "image": configImageURL('/uploads/apex-auto-logo.png'),
    "brand": {
      "@type": "Brand",
      "name": "Apex Auto"
    },
    "category": "Phụ kiện ô tô",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "VND",
      "lowPrice": "1000000",
      "highPrice": "20000000",
      "offerCount": "10"
    }
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />

        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />

        {/* SEO meta tags */}
        <meta name="robots" content="index, follow, noai, noimageai" />
        <meta name="googlebot" content="index, follow" />
        <meta name="googlebot-news" content="index, follow" />
        <meta name="google-extended" content="notranslate" />

        {/* Geo tags - Thành phố Hồ Chí Minh */}
        <meta name="geo.region" content="VN-57" /> {/* Mã vùng Thành phố Hồ Chí Minh */}
        <meta name="geo.placename" content="Thành phố Hồ Chí Minh" />
        <meta name="geo.position" content="10.7756,106.7019" /> {/* Cập nhật tọa độ Thành phố Hồ Chí Minh */}
        <meta name="ICBM" content="10.7756,106.7019" />

        {/* Google Site Verification */}
        <meta name="google-site-verification" content="69SntjtI5IqppTdIzDLIEf5To_9cjCL_E_Xv9ccFyWA" />

        {/* Schema.org */}
        <LocalBusinessSchema />
        <OrganizationSchema />
        <WebsiteSchema />
        <ProductSchema />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
      </head>

      <body className={workSans.className}>
        <RecoilProvider>
          <AntdRegistry>
            {children}
          </AntdRegistry>
        </RecoilProvider>
      </body>
    </html>
  );
}