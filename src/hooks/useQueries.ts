import { useQuery } from "@tanstack/react-query";
import { getStats, getLiveBatches, getPublicExams, getBlogBySlug } from "@/lib/api";
import { Stats, Batch, Exam, Blog } from "@/types/global";

export function useStats() {
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: getStats,
  });
}

export function useLiveBatches() {
  return useQuery<Batch[]>({
    queryKey: ["batches"],
    queryFn: getLiveBatches,
  });
}

export function usePublicExams() {
  return useQuery<Exam[]>({
    queryKey: ["public-exams"],
    queryFn: getPublicExams,
  });
}

export function useBlog(slug: string) {
  return useQuery<Blog | null>({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
  });
}
