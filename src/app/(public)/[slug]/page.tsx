import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/api";
import { BlogDetailsClient } from "@/components/pages/blog/BlogDetailsClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return { title: "Page Not Found | Examify" };

  return {
    title: `${blog.title} | Examify`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.image_url ? [blog.image_url] : [],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailsClient blog={blog} />;
}
