import React from "react";
import { Link, usePage } from "@inertiajs/react";

export const CustomNavigationButton = ({ href, icon: Icon, label }) => {
    const { url } = usePage();

    // cek apakah url sekarang diawali oleh href
    const isActive = url.startsWith(href);

    return (
        <Link
            href={href}
            className={`
                px-4 py-2 rounded-lg cursor-pointer w-full flex items-center gap-4 
                ease-out duration-200 text-xs
                ${isActive ? "bg-zinc-100" : "hover:bg-zinc-100 active:bg-zinc-300"}
            `}
        >
            <Icon 
                fontSize="small" 
                style={{ color: isActive ? "orange" : undefined }}
            />
            {label}
        </Link>
    );
}