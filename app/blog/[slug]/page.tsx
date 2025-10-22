import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await prisma.post.findUnique({ where: { slug: params.slug } })
    if (!post || !post.published) return notFound()

    return (
        <article className="prose max-w-3xl mx-auto px-4 py-10">
            <h1>{post.title}</h1>
            <div className="opacity-60 text-sm">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fa-IR') : null}
            </div>
            {post.coverImage ? <img src={post.coverImage} alt="" className="rounded-xl my-6" /> : null}
            {/* اگر محتوای Markdown ذخیره می‌کنی، بعداً یک رندرر Markdown اضافه کن */}
            <div style={{ whiteSpace: 'pre-wrap' }}>{post.content}</div>
        </article>
    )
}
