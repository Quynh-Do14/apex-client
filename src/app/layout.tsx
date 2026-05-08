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
  "RIMO",
  "phim cách nhiệt Rimo",
  "phim ppf Rimo",
  "phim bảo vệ sơn Rimo",
  "dán phim cách nhiệt Rimo",
  "dán ppf Rimo",
  "phim ceramic Rimo",
  "phim cách nhiệt nano ceramic Rimo",
  "phim cách nhiệt cao cấp Rimo",
  "phim cách nhiệt chính hãng Rimo",
  "cách nhiệt ô tô Hà Nội",
  "cửa hàng dán phim cách nhiệt",
  "đại lý phim cách nhiệt",
  "phim cách nhiệt giá tốt",
  "phim cách nhiệt ô tô giá rẻ",
  "bảo vệ sơn xe hơi",
  "phim bảo vệ sơn xe",
  "PPF bảo vệ sơn",
  "Paint Protection Film",
  "phim cách nhiệt chống tia UV",
  "phim cách nhiệt cách âm",
  "dịch vụ dán phim ô tô",
  "lắp đặt phim cách nhiệt",
  "phim cách nhiệt ô tô toàn quốc",
  "địa chỉ dán phim cách nhiệt uy tín"
];

// Default metadata (fallback)
let defaultMetadata = {
  title: "Phim PPF và Cách nhiệt Rimo cao cấp dành ô tô",
  description: "Rimo - Thương hiệu Phim cách nhiệt và PPF cao cấp dành cho ô tô. Công nghệ Nano Ceramic & Phún xạ kim loại.",
};

const siteURL = process.env.NEXT_PUBLIC_PUBLIC_URL || '';
const companyName = "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh";
const organization = "GPKD số 0107801299 do Sở KH và ĐT TP Hà Nội cấp ngày 12/04/2017. Chuyên nhập khẩu và phân phối phim cách nhiệt Rimo chính hãng.";
const product = "Phim cách nhiệt ô tô Rimo cao cấp với công nghệ Nano Ceramic, chống tia UV 99%, cách nhiệt hiệu quả, bảo vệ sơn xe toàn diện";
const webSchemaDescription = "Rimo là thương hiệu Phim cách nhiệt và PPF cao cấp dành cho ô tô. Công nghệ Nano Ceramic & Phún xạ kim loại. Chứng nhận COCQ đầy đủ";

const GA_TRACKING_ID = 'G-D5W7JLDXBC';

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
          url: configImageURL('/uploads/RIMO-logo.png'),
          alt: "Phim cách nhiệt & Phim PPF Rimo",
        },
      ],
      siteName: "Phim cách nhiệt & Phim PPF Rimo",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [configImageURL('/uploads/RIMO-logo.png')],
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
    "name": "Công ty TNHH Thương Mại XNK Nội Thất Ô Tô Quang Minh",
    "image": configImageURL('/uploads/RIMO-logo.png'),
    "description": "Chuyên cung cấp và lắp đặt phim cách nhiệt ô tô, phim PPF bảo vệ sơn Rimo chính hãng",
    "url": siteURL,
    "hasMap": `https://maps.app.goo.gl/GNH8zFY4UT5svvrq8`,
    "telephone": "+84-02462926666",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Số 12 Ngõ 44 Tư Đình – Tổ 5 – Phường Long Biên – Thành phố Hà Nội",
      "addressLocality": "Hà Nội",
      "addressRegion": "Hà Nội",
      "postalCode": "100000",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "20.987787",
      "longitude": "105.861443"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "serviceType": "Phim cách nhiệt ô tô, PPF bảo vệ sơn, Dán phim cách nhiệt",
    "areaServed": { "@type": "City", "name": "Hà Nội" },
    "sameAs": ["https://www.facebook.com/rimo.vietnam"],
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
    "logo": configImageURL('/uploads/RIMO-logo.png'),
    "description": organization,
    "sameAs": ["https://www.facebook.com/rimo.vietnam"],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "02462926666",
      "contactType": "customer service",
      "availableLanguage": ["Vietnamese"],
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
    "name": "Phim cách nhiệt Rimo, Phim bảo về sơn PPF Rimo",
    "description": product,
    "image": configImageURL('/uploads/RIMO-logo.png'),
    "brand": { "@type": "Brand", "name": "Rimo" },
    "category": "Phụ kiện ô tô",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "VND",
      "lowPrice": "1500000",
      "highPrice": "10000000",
      "offerCount": "5"
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

        {/* Geo tags */}
        <meta name="geo.region" content="VN-HN" />
        <meta name="geo.placename" content="Hà Nội" />
        <meta name="geo.position" content="20.987787;105.861443" />
        <meta name="ICBM" content="20.987787, 105.861443" />
        {/* <meta name="google-site-verification" content="gd5S1-HkR2XIm6GugYGU241BTwelQ_4Xdkp3Rw8m8Ik" /> */}
        <meta name="google-site-verification" content="dQdpGMpP2bNN9axquorwXBuKE2UWz2yXqqFvXyDKDEU" />
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