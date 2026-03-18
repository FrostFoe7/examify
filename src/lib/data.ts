import type { Contributor, AboutContent } from "@/types/global";

export const aboutData = {
  aboutContent: {
    title: "আমাদের সম্পর্কে",
    description:
      "Reading Zone by Examify - বাংলাদেশের শীর্ষস্থানীয় অনলাইন পরীক্ষার প্ল্যাটফর্ম। আধুনিক প্রযুক্তি এবং অভিজ্ঞ মেন্টরদের সমন্বয়ে তৈরি আমাদের প্ল্যাটফর্মটি আপনাকে দেবে পরীক্ষার সেরা প্রস্তুতি।",
    sections: [
      {
        title: "আমাদের মিশন",
        content:
          "প্রতিটি ছাত্রছাত্রীকে মানসম্পন্ন শিক্ষা প্রদান এবং তাদের স্বপ্ন পূরণে সহায়তা করা আমাদের প্রধান লক্ষ্য।",
      },
      {
        title: "আমাদের ভিশন",
        content:
          "একটি আধুনিক এবং প্রযুক্তি-চালিত শিক্ষা ব্যবস্থা গড়ে তোলা যা সকল ছাত্রছাত্রীর জন্য সুলভ।",
      },
      {
        title: "আমাদের প্রতিশ্রুতি",
        content:
          "আমরা প্রতিশ্রুতিবদ্ধ যে প্রতিটি ছাত্রছাত্রী সর্বোচ্চ মানের শিক্ষা ও নির্দেশনা পাবে।",
      },
    ],
    team: {
      heading: "আমাদের দল",
    },
  } as AboutContent,

  contributorsList: [
    {
      name: "FrostFoe",
      role: "Lead Developer",
      bio: "এই প্ল্যাটফর্ম ডেভলপ থেকে শুরু করে পরিচালনা এবং এর কার্যকারিতা বৃদ্ধিতে নিরলসভাবে কাজ করে যাচ্ছেন।",
      imageUrl: "https://avatars.githubusercontent.com/u/175545919?v=4",
      social: {
        globe: "https://frostfoe.netlify.app/",
        github: "https://github.com/frostfoe",
        facebook: "#",
        linkedin: "#",
      },
    },
    // Add more contributors if they exist in the original or as placeholders
  ] as Contributor[],
};
