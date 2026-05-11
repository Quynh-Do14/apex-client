"use client"
import BreadcrumbCommon from '@/infrastructure/common/Layouts/Breadcumb'
import ClientLayout from '@/infrastructure/common/Layouts/Client-Layout'
import React, { useState } from 'react'
import styles from '@/assets/styles/pages/contact.module.css'
import { ROUTE_PATH } from '@/core/common/appRouter'
import banner from '@/assets/images/banner/Banner-Menu-GIoi-thieu.jpg';
import BannerCommon from '@/infrastructure/common/banner/BannerCommon'
import InputTextCommon from '@/infrastructure/common/input/input-text-common'
import contactService from '@/infrastructure/repository/contact/contact.service'
import { useRouter } from 'next/navigation'

const ContactPage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        name: '',
        phone_number: '',
        email: '',
        message: '',
    });
    const router = useRouter();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleLoginSubmit = async () => {
        try {
            const response = await contactService.AddContactAdmin(
                {
                    email: formData.email,
                    phone_number: formData.phone_number,
                    name: formData.name,
                    message: formData.message,
                },
                () => {
                    setFormData({
                        name: '',
                        phone_number: '',
                        email: '',
                        message: '',
                    })
                },
                setLoading
            );

            if (response) {
                router.push(ROUTE_PATH.CONTACT);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleLoginSubmit()

    };

    return (
        <ClientLayout>
            <BannerCommon
                type={'CONTACT'}
            />
            <div className={`${styles.contactContainer} padding-common`}>
                <BreadcrumbCommon
                    breadcrumb={"Liên hệ"}
                    redirect={ROUTE_PATH.CONTACT}
                    title={'Công ty TNHH Apex Auto'}
                    blackColor={true}
                />
                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.5999922793467!2d106.6542386!3d10.993535299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d18a8554c8ab%3A0x96ba33cb27718cbe!2zQVBFWCBBVVRPIC0gxJDhuqFpIHPhu6kgWmVzdGVjaCBT4buRIDEgQsOsbmggRMawxqFuZw!5e0!3m2!1svi!2s!4v1778489233689!5m2!1svi!2s"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                <div className={styles.contactTitle}>Liên hệ với chúng tôi</div>
                <form onSubmit={handleSubmit} className={styles.contactForm}>
                    {/* Email Field */}
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                            <span>Họ tên</span>
                        </label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={styles.textInput}
                                placeholder="Nhập họ và tên"
                                required
                            />
                            <div className={styles.inputBorder}></div>
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                            <span>Email</span>
                        </label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={styles.textInput}
                                placeholder="Nhập Email"
                                required
                            />
                            <div className={styles.inputBorder}></div>
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                            <span>Số điện thoại</span>
                        </label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                className={styles.textInput}
                                placeholder="Nhập số điện thoại"
                                required
                            />
                            <div className={styles.inputBorder}></div>
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.inputLabel}>
                            <span>Nội dung lời nhắn</span>
                        </label>
                        <div className={styles.inputWrapper}>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className={styles.textInput}
                                required
                            />
                            <div className={styles.inputBorder}></div>
                        </div>
                    </div>
                    <button type='submit' className={styles.submit}>
                        <span className="btn-text">Gửi liên hệ</span>
                    </button>
                </form>
            </div>
        </ClientLayout>
    )
}

export default ContactPage