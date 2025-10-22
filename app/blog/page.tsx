export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import { prisma } from '@/lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';
import Container from "@/components/container/page";
import SectionTitle from "@/components/section_title/page";
import React from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";

export default async function BlogIndex() {
    noStore();

    const blogs = await prisma.post.findMany();

    return (
      //   <div style={{ padding: '2rem', color: 'white' }}>
      //       <h1>✅ Blog Server Working!</h1>
      //       <p>پست‌ها:</p>
      //       <pre style={{ background: '#111', padding: '1rem', borderRadius: '10px' }}>
      //   {JSON.stringify(posts, null, 2)}
      // </pre>
      //   </div>

        <main>
            <Container>
                <SectionTitle text='My Blogs' />
                <section>
                    {blogs.map((blog) => (
                            <div key={blog.id}>
                                {blog.coverImage && (
                                    <LazyLoadImage
                                        src={blog.coverImage}
                                        alt={blog.title}
                                        effect="blur"
                                    />
                                )}

                                <div>
                                    <div>
                                        <span>
                                            {blog.publishedAt
                                                ? new Intl.DateTimeFormat('en-US', {
                                                    month: 'short',
                                                    day: '2-digit',
                                                    year: 'numeric',
                                                }).format(new Date(blog.publishedAt))
                                                : null}
                                        </span>

                                        <span>Mahrokh Nabizadeh</span>
                                    </div>

                                    <h1>{blog.title}</h1>
                                </div>
                            </div>
                    ))}
                </section>
            </Container>n
        </main>
    );
}
