import { getBlogBySlug } from "@/lib/api";
import type { Metadata } from "next";
import BlogDetailsWrapper from "./BlogDetailsWrapper";
import type { PageParamsProps } from "@/types/global";

export async function generateMetadata({ params }: PageParamsProps): Promise<Metadata> {
  const { slug } = params;
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

export default function BlogPage({ params }: PageParamsProps) {
  const { slug } = params;
  return <BlogDetailsWrapper slug={slug} />;
}