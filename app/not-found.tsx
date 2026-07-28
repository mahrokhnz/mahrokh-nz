"use client"

import EyeCanvas from "@/components/eye/page";
import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import React from "react";
import Button from "@/components/Button/page";
import {useRouter} from "next/navigation";

function NotFound() {
    const router = useRouter();

    return (
        <section className="h-screen bg-(--secondaryColor)">
            <Container className="bg-(--secondaryColor)">
                <div className="flex h-full grow flex-col items-center">
                    <EyeCanvas />
                    <span className="mb-5 text-center text-[40px] font-bold text-[#544df0] max-tablet:text-[3rem] max-phone:text-[2rem]">Looks Like You&#39;re Lost</span>
                    <SectionTitle text='404 error' />
                    <Button onClick={() => router.replace('/')}>
                        back to home
                    </Button>
                </div>
            </Container>
        </section>
    );
}

export default NotFound
