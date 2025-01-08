"use client";
import Link from "next/link";
import Image from "next/image";
import { use } from "react";
import { useEffect, useState } from "react";
// import 

// Dummy Article Card Component
const DummyArticleCard = ({ slug, frontmatter }: { slug: string; frontmatter: { title: string; author: string; content: string; date: string; } }) => (
  <Link href={`/blog/${slug}`} className="group bg-white rounded-xl shadow-md p-10 hover:shadow-xl transition-all duration-200 ease-in-out">
    <h3 className="font-semibold text-lg text-black">{frontmatter.title}</h3>
    <p className="text-sm text-gray-500 ">Author: {frontmatter.author}</p>
    <p className="text-sm text-gray-500 mb-5">Date: {new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    <p className="text-sm text-gray-700 ">{frontmatter.content}</p>
    <div className="text-blue-600 hover:underline text-sm font-semibold">
      Baca Selengkapnya
    </div>
  </Link>
);

// Komponen utama halaman blog
export default function Blog() {
  const [post, setPost] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk input pencarian
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]); // State untuk menampung artikel yang difilter

  // Mengupdate filteredPosts berdasarkan searchTerm
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPosts(post); // Jika tidak ada pencarian, tampilkan semua artikel
    } else {
      setFilteredPosts(
        post.filter((article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.author.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, post]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/article');
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Debugging: periksa struktur data yang diterima

          // Pastikan artikel memiliki frontmatter dengan title dan date
          setPost(data);
        } else {
          console.error("Failed to fetch articles.");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }

    fetchPosts();
  }, []);


  return (
    <div className="w-full min-h-screen bg-white">
      <div className="bg-[#E3F2FD] py-12">
        <div className="w-full mx-auto container px-5 lg:px-16 flex flex-col justify-center items-center">
          <h2 className="font-bold text-3xl lg:text-5xl lg:px-0 px-5 py-4 text-black text-center">
            Artikel Kami
          </h2>
           {/* Input untuk pencarian */}
           <div className="w-full max-w-lg mt-8 mb-6">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Cari artikel berdasarkan judul..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

           {/* Menampilkan artikel yang sudah difilter */}
           <div className="grid lg:grid-cols-3 gap-3 mt-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(({ slug, title, author, content, date }: any) => (
                <DummyArticleCard 
                  slug={slug}
                  frontmatter={{ title, author, content, date }}
                  key={slug} 
                />
              ))
            ) : (
              <p className="text-center text-gray-500">Tidak ada artikel yang ditemukan.</p>
            )}
          </div>


          {/* <div className="grid lg:grid-cols-3 gap-3 mt-8">
            {post.map(({slug, title, author, content, date}: any) => (
              <DummyArticleCard 
              slug={slug}
              frontmatter={{ title, author, content, date }}
               key={slug} />
            ))}
          </div>
          <Link
            className="mt-8 px-6 py-3 bg-coreBlue-primary rounded-full text-white text-xl hover:bg-coreBlue-500 hover:outline-offset-2 hover:outline hover:outline-coreBlue-500"
            href={"/blog"}
          >
            Lihat artikel lainnya
          </Link> */}
        </div>
      </div>
    </div>
  );
}
