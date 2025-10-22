export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await prisma.post.findUnique({ where: { slug: params.slug } });
    if (!post || !post.published) return notFound();

    return (
        <article className="prose max-w-3xl mx-auto px-4 py-10">
            <h1>{post.title}</h1>
            <div
                className="prose mt-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    );
}
