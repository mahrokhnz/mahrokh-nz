import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function BlogIndex() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { publishedAt: 'desc' },
        select: { slug: true, title: true, excerpt: true, publishedAt: true }
    })

    console.log({posts})

    return (
        <main className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Blog</h1>
            <ul className="space-y-6">
                {posts.map(p => (
                    <li key={p.slug} className="border p-4 rounded-xl">
                        <Link href={`/blog/${p.slug}`} className="text-xl font-semibold hover:underline">
                            {p.title}
                        </Link>
                        <div className="text-xs opacity-60 mt-1">
                            {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('fa-IR') : null}
                        </div>
                        {p.excerpt ? <p className="text-sm opacity-80 mt-2">{p.excerpt}</p> : null}
                    </li>
                ))}
                {posts.length === 0 && <li>هنوز پستی منتشر نشده.</li>}
            </ul>
        </main>
    )
}
