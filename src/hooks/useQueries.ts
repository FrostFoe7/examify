import { useQuery } from "@tanstack/react-query";
import { getStats, getLiveBatches, getPublicExams, getBlogBySlug } from "@/lib/api";

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
}

export function useLiveBatches() {
  return useQuery({
    queryKey: ["batches"],
    queryFn: getLiveBatches,
  });
}

export function usePublicExams() {
  return useQuery({
    queryKey: ["public-exams"],
    queryFn: getPublicExams,
  });
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
  });
}
