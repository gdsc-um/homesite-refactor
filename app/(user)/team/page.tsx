import fs from "fs";
import path from "path";
import CardName from "@/components/CardName";
import Head from "next/head";


export default async function Team() {
  // Membaca data JSON menggunakan path
  const filePath = path.join(process.cwd(), "data", "coreteam.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { coreteam } = JSON.parse(fileContent);

  return (
    <div className="w-full min-h-screen bg-white">
              <Head>
        <title>Core Team | GDSC Universitas Negeri Malang</title>
        <meta
          name="description"
          content="Core Team GDSC Universitas Negeri Malang"
        />
      </Head>
      <div className="mx-auto container py-32 flex flex-col gap-8 justify-center items-center">
        <h1 className="text-3xl lg:text-6xl text-center font-bold text-blue-500">
          Ini adalah tim kami
        </h1>
        <div className="grid lg:grid-cols-4 gap-5 mt-8">
          {coreteam.map((member) => (
            <CardName frontmatter={member} key={member.uuid} />
          ))}
        </div>
      </div>
    </div>
  );
}
