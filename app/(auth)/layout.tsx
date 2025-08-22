import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import  Link from "next/link";

export default function Layout({ children} : Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            {children}
        </div>
    );
}