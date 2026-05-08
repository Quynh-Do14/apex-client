import FooterSection from './FooterSection'
import HeaderSection from './HeaderSection'
import mess from '@/assets/images/icon/icon_mess.png';
import facebook from '@/assets/images/icon/icon_facebook.png';
import zalo from '@/assets/images/icon/zalo.webp';
import call from '@/assets/images/icon/icon_call.png';
import Image from 'next/image';
import '@/assets/styles/components/MainLayout.css'
const ClientLayout = ({ ...props }: any) => {
    return (
        <div className="main-layout-client">
            <HeaderSection />
            {props.children}
            <FooterSection />
            <div className='social tel'>
                <a href="tel:0866209168" className='social-item' data-tooltip="0866209168">
                    <Image src={call} alt="Gọi ngay" />
                    <span>0866.209.168</span>
                </a>
            </div>
            <div className='social media'>
                <a href="https://www.facebook.com/vn.apexauto"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='social-item'
                    data-tooltip="Facebook Apex Auto">
                    <Image src={facebook} alt='Apex Auto' />
                </a>
                <a href="http://m.me/633324239869314"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='social-item'
                    data-tooltip="Messenger Apex Auto">
                    <Image src={mess} alt='Apex Auto' />
                </a>
                <a href="http://zalo.me/84866209168"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='social-item'
                    data-tooltip="Zalo Apex Auto">
                    <Image src={zalo} alt='Apex Auto' />
                </a>
            </div>
        </div>
    )
}

export default ClientLayout