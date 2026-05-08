import { Suspense } from 'react';
import HeaderSection from "@/infrastructure/common/Layouts/HeaderSection";
import ArticleSection from "./homepage/article";
import FullWidthSlider from "./homepage/slider";
import ClientLayout from "@/infrastructure/common/Layouts/Client-Layout";
import styles from '@/assets/styles/pages/home/home.module.css'
import ProductSection from "./homepage/product";
import SloganSlider from "./homepage/slogan";
import IntroduceSection from "./homepage/introduce";
import { PageLoading } from '@/infrastructure/common/loading/loadingPage';
import { Endpoint } from '@/core/common/apiLink';
import { ConfigPageInterface } from '@/infrastructure/interface/configPage/configPage.interface';
import AchieveSection from './homepage/achievement';
import bannerFixed from '@/assets/images/banner/Banner-Fixed.webp'
import SubBannerSection from './homepage/subBanner';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Tạo wrapper component cho mỗi section có thể suspense
const HomePageContent = async () => {
  const config = await fetch(`${baseURL}${Endpoint.ConfigPage.Get}`, {
    cache: 'no-store', // Tắt cache
  }).then((res) => res.json());
  const configPage: ConfigPageInterface[] = config.data

  return (
    <div className={styles.homePageContainer} >
      <FullWidthSlider
      />

      <div className={styles.darkBackground}>
        <IntroduceSection
          configPage={configPage}
          type='SECTION_3' />
      </div>

      <SubBannerSection />

      <AchieveSection
        configPage={configPage}
        type='SECTION_1'
      />
      <ProductSection
        configPage={configPage}
        type='SECTION_5' />
      <div className={styles.darkBackground}>
        <SloganSlider
          configPage={configPage}
          type='SECTION_2'
        />
      </div>
      <ArticleSection
        configPage={configPage}
        type='SECTION_4'
      />
    </div >
  );
}

export default function Home() {
  return (
    <ClientLayout>
      <Suspense fallback={<PageLoading />}>
        <HomePageContent />
      </Suspense>
    </ClientLayout>
  );
}