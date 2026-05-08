"use client"
import logo from "@/assets/images/logo.png";
import Image from "next/image";

export const PageLoading = () => {
    return (
        <div className="home-page-loading">
            <Image src={logo.src} alt="RIMO" width={320} height="200" />
        </div>
    );
};
