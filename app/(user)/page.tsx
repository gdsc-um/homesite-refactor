// app/page.tsx
import ArticleCard  from "@/components/ArticleCard";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import HeroImage from "@/assets/gdg-global.png";
import ApaItu from "@/assets/apa-itu-gdgoc.png";
import mlai from "@/assets/ml-ai.png";
import mobiledev from "@/assets/mobile-dev.png";
import webdev from "@/assets/web-dev.png";
import uiux from "@/assets/ui-ux.png";
import Head from "next/head";

// Utility function to fetch posts
const fetchPosts = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), "posts"));
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(path.join(process.cwd(), "posts", fileName), "utf-8");
    const { data: frontmatter } = matter(readFile);
    return { slug, frontmatter };
  });
  return posts;
};

// Dummy Data for Posts
const dummyPosts = [
  {
    slug: "artikel-1",
    frontmatter: {
      title: "Mengenal Teknologi Web3",
      date: "2024-12-10",
      description: "Web3 adalah revolusi internet dengan teknologi blockchain yang dapat mengubah cara kita berinteraksi di dunia digital.",
      image: "https://via.placeholder.com/400x300?text=Web3+Article",
    },
  },
  {
    slug: "artikel-2",
    frontmatter: {
      title: "Apa Itu Machine Learning?",
      date: "2024-12-05",
      description: "Machine Learning (ML) memungkinkan sistem untuk belajar dari data dan membuat prediksi tanpa diprogram secara eksplisit.",
      image: "https://via.placeholder.com/400x300?text=Machine+Learning+Article",
    },
  },
  {
    slug: "artikel-3",
    frontmatter: {
      title: "Keuntungan Pengembangan Aplikasi Mobile",
      date: "2024-11-30",
      description: "Pengembangan aplikasi mobile memberikan peluang besar di pasar perangkat seluler yang terus berkembang.",
      image: "https://via.placeholder.com/400x300?text=Mobile+Development+Article",
    },
  },
];

// Dummy Article Card Component (Renamed to avoid conflict)
const DummyArticleCard = ({ slug, frontmatter }: { slug: string; frontmatter: { title: string; date: string; description: string; image: string } }) => (
  <div className="bg-white rounded-xl shadow-md p-5">
    <img className="w-full h-48 object-cover rounded-lg mb-4" src={frontmatter.image} alt={frontmatter.title} />
    <h3 className="font-semibold text-lg text-black">{frontmatter.title}</h3>
    <p className="text-sm text-gray-500 mb-2">{frontmatter.date}</p>
    <p className="text-sm text-gray-700 mb-4">{frontmatter.description}</p>
    <Link href={`/blog/${slug}`}>
      <div className="text-blue-600 hover:underline text-sm font-semibold">
        Baca Selengkapnya
      </div>
    </Link>
  </div>
);

// Main page component
export default async function Home() {
  const posts = await fetchPosts();

  return (
    <div className="w-full min-h-screen bg-white">
      <Head>
        <title>Beranda | GDGoC Universitas Negeri Malang</title>
        <meta
          name="description"
          content="Official Page of Google Developer Student Clubs Universitas Negeri Malang"
        />
      </Head>
      {/* Hero */}
      <div className="w-full h-[75vh] flex flex-col justify-center items-center bg-[#E8F5E9] gap-3">
        <Image alt="logo" src={HeroImage} width={180} height={92} />
        <h1 className="text-black font-normal text-3xl lg:text-6xl">#WeGrowAsOne☝</h1>
        <p className="text-[#4D4D4D] font-normal text-sm lg:text-2xl text-center">
          Official Page of Google Developer Groups on Campus
          <br />
          Universitas Negeri Malang
        </p>
        <div className="flex items-center gap-3">
          <Link href={"/profile"}>
            <div className="bg-[#E3F2FD] px-5 py-2 rounded-xl text-[#498AF4] font-bold text-sm lg:text-lg">
              Tentang Kami
            </div>
          </Link>
          <Link href={"/"}>
            <div className="bg-[#498AF4] px-5 py-2 rounded-xl text-[#E8F5E9] font-bold text-sm lg:text-lg">
              Mulai Jelajahi
            </div>
          </Link>
        </div>
      </div>

      {/* Apa itu GDGoC */}
      <div className="bg-[#498AF4] py-12 w-full">
        <div className="mx-auto container flex flex-col lg:flex-row justify-center items-center gap-5 lg:gap-[100px] px-5">
          <Image alt="apa-itu-gdgoc" src={ApaItu} width={393} height={292} />
          <div className="flex flex-col items-center text-center lg:text-left lg:items-start text-white gap-3">
            <h2 className="font-bold text-3xl lg:text-5xl">Apa itu GDGoC?</h2>
            <p className="text-lg font-normal">
            Google Developer Groups on Campus (GDGoC) adalah komunitas pengembang berbasis universitas yang diinisiasi oleh Google. Komunitas ini menyediakan lingkungan belajar sesama rekan bagi mahasiswa yang tertarik dengan teknologi, mahasiswa dari jurusan apa pun dipersilakan untuk bergabung sebagai member.
            </p>
            <Link href={"/profile"}>
              <div className="bg-[#E3F2FD] px-5 py-2 rounded-xl text-[#498AF4] font-bold text-lg">
                Selengkapnya
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Apa yang dipelajarin */}
      <div className="bg-white py-12 w-full">
        <div className="mx-auto container">
          <h2 className="text-center pb-4 pt-2 text-black font-bold text-3xl lg:text-5xl mb-8 lg:px-0 px-5">
            Yang Dipelajari di GDGoC UM
          </h2>
          <div className="grid lg:grid-cols-4 gap-3 px-5 lg:px-16">
            <div className="w-full bg-[#3CAB5A] rounded-xl p-5 flex flex-col items-center justify-center gap-3">
              <Image alt="web-dev" src={webdev} width={134} height={134} />
              <p className="text-black font-bold text-xl">Web Development</p>
              <div className="flex gap-1 items-center">
                <div className="bg-[#E3F2FD] text-[#498AF4] font-normal rounded-full text-xs px-3 py-1">
                  HTML
                </div>
                <div className="bg-[#E3F2FD] text-[#3CAB5A] font-normal rounded-full text-xs px-3 py-1">
                  CSS
                </div>
                <div className="bg-[#FFF8E1] text-[#FBBF0E] font-normal rounded-full text-xs px-3 py-1">
                  JavaScript
                </div>
                <div className="bg-[#FFEBEE] text-[#EB4A3D] font-normal rounded-full text-xs px-3 py-1">
                  React
                </div>
              </div>
            </div>
            <div className="w-full bg-[#EB4A3D] rounded-xl p-5 flex flex-col items-center justify-center gap-3">
              <Image alt="mobile-dev" src={mobiledev} width={134} height={134} />
              <p className="text-black font-bold text-xl">Mobile Development</p>
              <div className="flex gap-1 items-center">
                <div className="bg-[#E3F2FD] text-[#498AF4] font-normal rounded-full text-xs px-3 py-1">
                  Android
                </div>
                <div className="bg-[#E3F2FD] text-[#3CAB5A] font-normal rounded-full text-xs px-3 py-1">
                  Flutter
                </div>
              </div>
            </div>
            <div className="w-full bg-[#f9ab00] rounded-xl p-5 flex flex-col items-center justify-center gap-3">
              <Image alt="mobile-dev" src={uiux} width={134} height={134} />
              <p className="text-black font-bold text-xl">UI/UX</p>
              <div className="flex gap-1 items-center">
                <div className="bg-[#E3F2FD] text-[#498AF4] font-normal rounded-full text-xs px-3 py-1">
                  Visual Design
                </div>
                <div className="bg-[#E3F2FD] text-[#3CAB5A] font-normal rounded-full text-xs px-3 py-1">
                  Wireframing
                </div>
              </div>
            </div>
            <div className="w-full bg-[#498AF4] rounded-xl px-5 py-8 flex flex-col items-center justify-center gap-3">
              <Image alt="ml-ai" src={mlai} width={134} height={134} />
              <p className="text-black font-bold text-xl">ML/AI</p>
              <div className="flex gap-1 items-center">
                <div className="bg-[#E3F2FD] text-[#498AF4] font-normal rounded-full text-xs px-3 py-1">
                  Python
                </div>
                <div className="bg-[#E3F2FD] text-[#3CAB5A] font-normal rounded-full text-xs px-3 py-1">
                  TensorFlow
                </div>
                <div className="bg-[#FFF8E1] text-[#FBBF0E] font-normal rounded-full text-xs px-3 py-1">
                  Keras
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Artikel terbaru */}
      <div className="bg-[#E3F2FD] py-12">
      <div className="w-full mx-auto container px-5 lg:px-16 flex flex-col justify-center items-center">
        <h2 className="font-bold text-3xl lg:text-5xl lg:px-0 px-5 py-4 text-black text-center">
          Artikel Terbaru
        </h2>
        <div className="grid lg:grid-cols-3 gap-3 mt-8">
          {dummyPosts.map(({ slug, frontmatter }) => (
            <DummyArticleCard
              slug={`/blog/${slug}`}
              frontmatter={frontmatter}
              key={slug}
            />
          ))}
        </div>
        <Link
          className="mt-8 px-6 py-3 rounded-full text-blue-500 text-xl hover:bg-coreBlue hover:outline-offset-2 hover:outline hover:outline-coreBlue-500"
          href={"/blog"}
        >
          Lihat artikel lainnya
        </Link>
      </div>
    </div>
    </div>
  );
}
