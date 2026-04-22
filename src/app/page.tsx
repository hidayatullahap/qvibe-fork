import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { LayoutPanelLeft } from "lucide-react";

const categories = [
  { name: "Materi Alquran dan Ilmu tajwid", slug: "materi-alquran-dan-ilmu-tajwid", icon: "📖" },
  { name: "Surat Pendek", slug: "surat-pendek", icon: "📜" },
  { name: "Doa doa harian", slug: "doa-doa-harian", icon: "🙏" },
  { name: "Surat Pilihan", slug: "surat-pilihan", icon: "✨" },
  { name: "Hadis harian", slug: "hadis-harian", icon: "🤝" },
  { name: "Materi fiqih", slug: "materi-fiqih", icon: "🕌" },
  { name: "Aqidah akhlak", slug: "aqidah-akhlak", icon: "🤲" },
  { name: "Materi tarikh", slug: "materi-tarikh", icon: "⏳" },
];

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <LandingPage />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Edukasi Islami Terpercaya
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Pilih kategori untuk mulai belajar dari video pilihan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        <Link
          href="/worksheet"
          className="group relative bg-white border rounded-2xl p-6 hover:shadow-lg transition-shadow border-primary/50"
        >
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-gray-900">
            Worksheet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Download materi belajar dan lembar kerja PDF
          </p>
          <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:underline">
            Jelajahi Sekarang &rarr;
          </div>
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/kategori/${category.slug}`}
            className="group relative bg-white border rounded-2xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">{category.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900">
              {category.name}
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Lihat koleksi video {category.name.toLowerCase()}
            </p>
            <div className="mt-4 flex items-center text-sm font-medium text-primary group-hover:underline">
              Jelajahi Sekarang &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#5c67f2] via-[#7d5cf2] to-[#22c55e] text-[#1a1a1a] p-4 relative overflow-hidden">
      {/* Network Background Pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute -top-20 -left-20 text-white/40">
          <LayoutPanelLeft size={400} strokeWidth={0.5} />
        </div>
      </div>

      {/* Circle/Blob in the background */}
      <div className="absolute top-[10%] left-[10%] w-[40%] h-[60%] bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="z-10 text-center max-w-5xl mx-auto space-y-12">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 tracking-tight animate-fade-in-up opacity-0">
          Selamat Datang di Aplikasi
        </h2>
        
        <h1 className="text-8xl md:text-[12rem] font-black leading-none tracking-tighter mb-4 text-black flex justify-center">
          {"Q- VIBE".split("").map((char, i) => (
            <span 
              key={i} 
              className={`inline-block animate-jump ${char === " " ? "w-[0.3em]" : ""}`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {char}
            </span>
          ))}
        </h1>

        <div className="animate-fade-in-up opacity-0 [animation-delay:400ms] mt-8">
          <p className="text-xl md:text-4xl font-bold text-gray-800 italic">
            "Tumbuh Cerdas dengan Ilmu, Dongeng, dan Worksheet Kreatif"
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16 animate-fade-in-up opacity-0 [animation-delay:600ms]">
          <Link 
            href="/login" 
            className="px-12 py-5 bg-primary text-white font-black rounded-2xl text-2xl hover:bg-primary/90 transition-all shadow-[0_10px_0_0_rgba(0,0,0,0.1)] hover:translate-y-1 hover:shadow-none"
          >
            Masuk (Login)
          </Link>
          <Link 
            href="/register" 
            className="px-12 py-5 bg-white text-primary font-black rounded-2xl text-2xl hover:bg-gray-50 transition-all shadow-[0_10px_0_0_rgba(0,0,0,0.1)] hover:translate-y-1 hover:shadow-none border-2 border-primary/10"
          >
            Daftar (Register)
          </Link>
        </div>
      </div>
    </div>
  );
}
