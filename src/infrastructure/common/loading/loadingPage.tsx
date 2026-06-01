"use client"
import logo from "@/assets/images/loading.png";
import Image from "next/image";

export const PageLoading = () => {
    return (
        <div className="home-page-loading">
            <Image src={logo.src} alt="APEXAUTO" width={500} height="200" />
        </div>
    );
};
