import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";


// Fungsi untuk membaca artikel secara statis
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
// Variabel untuk judul dan deskripsi halaman blog
const title = "Headline Page";
const subtitle =
  "Ini adalah halaman blog yang menyimpan berbagai artikel, berita dan pengumuman dari Google Developer Student Club.";

// Komponen utama halaman blog
export default function Blog({  }) {
  return (
    <div className="w-full min-h-screen bg-white">
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
          className="mt-8 px-6 py-3 bg-coreBlue-primary rounded-full text-white text-xl hover:bg-coreBlue-500 hover:outline-offset-2 hover:outline hover:outline-coreBlue-500"
          href={"/blog"}
        >
          Lihat artikel lainnya
        </Link>
      </div>
    </div>
    </div>
  );
}
