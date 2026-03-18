// src/types/global.ts

import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  Globe,
  Send,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";

// Auth Types
export interface User {
  id: string;
  name: string;
  roll_number: string;
  phone?: string;
  profile_picture_url?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (userData: User, token: string, redirectTo?: string) => void;
  signOut: () => void;
}

export interface LoginData {
  identifier: string;
  password: string;
}

export interface RegisterData {
  name: string;
  roll_number: string;
  phone?: string;
  password?: string;
}

// Landing Page & Course Types
export interface Batch {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  price: number;
  old_price: number;
  live_exams_count: number;
  lecture_notes_count: number;
  standard_exams_count: number;
  solve_sheets_count: number;
  is_public: boolean;
}

export interface Exam {
  id: string;
  name: string;
  batch_name: string;
  batch_slug: string;
  duration_minutes: number;
}

export interface Stats {
  usersCount: number;
  examsCount: number;
  batchesCount: number;
  questionsCount: number;
}

// Blog Types
export interface Blog {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  category_name?: string;
  author_name?: string;
  created_at: string;
}

// About Page Types
export interface SocialLinks {
  globe?: string;
  send?: string;
  facebook?: string;
  youtube?: string;
  github?: string;
  instagram?: string;
  mail?: string;
  linkedin?: string;
  twitter?: string;
}

export interface Contributor {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  social: SocialLinks;
}

export interface AboutContent {
  title: string;
  description: string;
  sections: Array<{
    title: string;
    content: string;
  }>;
  team: {
    heading: string;
  };
}

export const socialIcons: { [key in keyof SocialLinks]: React.ElementType } = {
  globe: Globe,
  send: Send,
  facebook: Facebook,
  youtube: Youtube,
  github: Github,
  instagram: Instagram,
  mail: Mail,
  linkedin: Linkedin,
  twitter: Twitter,
};

// Component Props
export interface HeroProps {
  stats: Stats;
}

export interface CourseSectionProps {
  batches: Batch[];
}

export interface PublicArenaProps {
  exams: Exam[];
}

export interface BlogHeaderProps {
  blog: Blog;
}

export interface BlogContentProps {
  content: string;
}

export interface BlogDetailsClientProps {
  blog: Blog;
}

export interface ContributorCardProps {
  contributor: Contributor;
}

export interface AboutHeroProps {
  title: string;
  description: string;
}

export interface AboutSectionsProps {
  sections: Array<{
    title: string;
    content: string;
  }>;
}

// Next.js Page Props
export interface PageParamsProps {
  params: { slug: string };
}
