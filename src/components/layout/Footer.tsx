import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react";

const footerLinks = {
  platform: [
    { label: "কোর্সসমূহ", href: "/#courses" },
    { label: "ফ্রি এক্সাম", href: "/#free-exams" },
    { label: "সফলতার গল্প", href: "/#success" },
    { label: "আমাদের সম্পর্কে", href: "/about" },
  ],
  support: [
    { label: "হেল্প সেন্টার", href: "/help" },
    { label: "গোপনীয়তা নীতি", href: "/privacy" },
    { label: "শর্তাবলী", href: "/terms" },
    { label: "যোগাযোগ", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t py-12 md:py-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="container relative mx-auto px-4 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-lg p-1.5">
                <div className="w-6 h-6 bg-background rounded-sm rotate-45 flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary -rotate-45" />
                </div>
              </div>
              <span className="font-black text-2xl tracking-tighter text-foreground">
                Examify
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-medium">
              আধুনিক প্রযুক্তি এবং অভিজ্ঞ মেন্টরদের সমন্বয়ে তৈরি আমাদের প্ল্যাটফর্মটি আপনাকে দেবে পরীক্ষার সেরা প্রস্তুতি।
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black mb-6 text-foreground">প্ল্যাটফর্ম</h3>
            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-black mb-6 text-foreground">সাপোর্ট</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-black mb-6 text-foreground">যোগাযোগ করুন</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">ইমেইল</p>
                  <p className="text-sm font-bold text-foreground">support@examify.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">ফোন</p>
                  <p className="text-sm font-bold text-foreground">+৮৮০ ১০০০-০০০০০০</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-bold text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-primary">Examify</span>. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
