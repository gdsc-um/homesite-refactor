// app/page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/assets/gdg-global.png";
import ApaItu from "@/assets/apa-itu-gdgoc.png";
import mlai from "@/assets/ml-ai.png";
import mobiledev from "@/assets/mobile-dev.png";
import webdev from "@/assets/web-dev.png";
import uiux from "@/assets/ui-ux.png";
import { useEffect, useState } from "react";
import Head from "next/head";

// Article Card Component
// Article Card Component
const ArticleCard = ({ slug, frontmatter }: { slug: string; frontmatter: { title: string; author: string; content: string; date: string; } }) => (
  <Link href={`/blog/${slug}`} className="group bg-white rounded-xl shadow-md p-10 hover:shadow-xl transition-all duration-200 ease-in-out">
    <h3 className="font-semibold text-lg text-black">{frontmatter.title}</h3>
    <p className="text-sm text-gray-500 mb-2">Author: {frontmatter.author}</p>
    <p className="text-sm text-gray-700 mb-4">{frontmatter.content}</p>
    <div className="text-blue-600 hover:underline text-sm font-semibold">
      Baca Selengkapnya
    </div>
  </Link>
);


// Main page component
export default function Home() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/article');
        if (response.ok) {
          const data = await response.json();
          // console.log(data); // Debugging: periksa struktur data yang diterima
          // // Pastikan data memiliki artikel dengan properti yang benar
          // const filteredData = data.filter((article: any) => article.frontmatter && article.frontmatter.date);

          // // Urutkan artikel berdasarkan tanggal (terbaru ke lama)
          // const sortedArticles = filteredData.sort((a: any, b: any) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

          // // Ambil hanya 3 artikel terbaru
          // setArticles(sortedArticles.slice(0, 3));
          // Pastikan artikel memiliki frontmatter dengan title dan date
          setArticles(data.slice(0, 3)); 
        } else {
          console.error("Failed to fetch articles.");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    

    fetchArticles();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <Head>
        <title>Beranda | GDGoC Universitas Negeri Malang</title>
        <meta name="description" content="Official Page of Google Developer Student Clubs Universitas Negeri Malang" />
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

      {/* Yang Dipelajari */}
      <div className="bg-white py-12 w-full">
        <div className="mx-auto container">
          <h2 className="text-center pb-4 pt-2 text-black font-bold text-3xl lg:text-5xl mb-8 lg:px-0 px-5">
            Yang Dipelajari di GDGoC UM
          </h2>
          <div className="grid lg:grid-cols-4 gap-3 px-5 lg:px-16">
            {/* Courses */}
            <div className="w-full bg-[#3CAB5A] rounded-xl p-5 flex flex-col items-center justify-center gap-3">
              <Image alt="web-dev" src={webdev} width={134} height={134} />
              <p className="text-black font-bold text-xl">Web Development</p>
              <div className="flex gap-1 items-center">
                <div className="bg-[#E3F2FD] text-[#498AF4] font-normal rounded-full text-xs px-3 py-1">HTML</div>
                <div className="bg-[#E3F2FD] text-[#3CAB5A] font-normal rounded-full text-xs px-3 py-1">CSS</div>
                <div className="bg-[#FFF8E1] text-[#FBBF0E] font-normal rounded-full text-xs px-3 py-1">JavaScript</div>
                <div className="bg-[#FFEBEE] text-[#EB4A3D] font-normal rounded-full text-xs px-3 py-1">React</div>
              </div>
            </div>
            <div className="w-full bg-[#EB4A3D] rounded-xl p-5 flex flex-col items-center justify-center gap-3">
              <Image alt="mobile-dev" src={mobiledev} width={134} height={134} />
              <p className="text-black font-bold text-xl">Mobile Development</p>
              <div className="flex gap-1 items-center">
                <div className="bg-[#E3F2FD] text-[#498AF4] font-normal rounded-full text-xs px-3 py-1">Android</div>
                <div className="bg-[#E3F2FD] text-[#3CAB5A] font-normal rounded-full text-xs px-3 py-1">Flutter</div>
              </div>
            </div>
            <div className="w-full bg-[#f9ab00] rounded-xl p-5 flex flex-col items-center justify-center gap-3">
              <Image alt="mobile-dev" src={uiux} width={134} height={134} />
              <p className="text-black font-bold text-xl">UI/UX</p>
              <div className="flex gap-1 items-center">
                <div className="bg-[#E3F2FD] text-[#498AF4] font-normal rounded-full text-xs px-3 py-1">Visual Design</div>
                <div className="bg-[#E3F2FD] text-[#3CAB5A] font-normal rounded-full text-xs px-3 py-1">Wireframing</div>
              </div>
            </div>
            <div className="w-full bg-[#498AF4] rounded-xl px-5 py-8 flex flex-col items-center justify-center gap-3">
              <Image alt="ml-ai" src={mlai} width={134} height={134} />
              <p className="text-black font-bold text-xl">ML/AI</p>
              <div className="flex gap-1 items-center">
                <div className="bg-[#E3F2FD] text-[#498AF4] font-normal rounded-full text-xs px-3 py-1">Python</div>
                <div className="bg-[#E3F2FD] text-[#3CAB5A] font-normal rounded-full text-xs px-3 py-1">TensorFlow</div>
                <div className="bg-[#FFF8E1] text-[#FBBF0E] font-normal rounded-full text-xs px-3 py-1">Keras</div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Artikel Terbaru */}
      <div className="bg-[#E3F2FD] py-12">
        <div className="w-full mx-auto container px-5 lg:px-16 flex flex-col justify-center items-center">
          <h2 className="font-bold text-3xl lg:text-5xl lg:px-0 px-5 py-4 text-black text-center">
            Artikel Kami
          </h2>
          <div className="grid lg:grid-cols-3 gap-3 mt-8">
            {articles.length > 0 ? (
              articles.map(({ slug, title, author, content, date }: any) => (
                <ArticleCard 
                  slug={slug} 
                  frontmatter={{ title, author, content, date }} 
                  key={slug} 
                />
                
              ))
            ) : (
              <p className="text-center ">Tidak ada artikel.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
