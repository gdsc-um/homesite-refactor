import StrukturImage from "@/assets/struktur.png";
import Partner from "@/components/Partner";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

function page() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Head>
        <title>Tentang GDGoC UM</title>
        <meta
          name="description"
          content="Gambaran singkat struktur dan kerjasama GDSC UM"
        />
      </Head>
      <div className="w-full py-28 flex flex-col justify-center items-center bg-[#E8F5E9] gap-3">
        <h1 className="text-coreBlue-primary font-bold text-center text-3xl lg:text-6xl">
          Tentang GDGoC Universitas Negeri Malang
        </h1>
        <p className="text-[#4D4D4D] font-normal text-lg lg:text-2xl px-5 lg:px-32 mt-4 lg:text-justify text-center">
          Google Developer Groups on Campus (GDGoC) adalah komunitas pengembang
          berbasis universitas yang diinisiasi oleh Google. Komunitas ini
          menyediakan lingkungan belajar sesama rekan bagi mahasiswa yang
          tertarik dengan teknologi, mahasiswa dari jurusan apa pun dipersilakan
          untuk bergabung sebagai member. Mulai tahun 2022, kami dengan bangga
          hadir di Universitas Negeri Malang dengan nama awal Google Developer
          Student Clubs Universitas Negeri Malang (GDSC UM). Pada tahun 2024
          GDSC UM berganti nama menjadi GDGoC UM. Komunitas ini hadir untuk
          menampung, mengembangkan, serta menyalurkan bakat dan minat Mahasiswa
          Universitas Negeri Malang di bidang pengembangan teknologi. Dalam
          melaksanakan misi tersebut, GDGoC UM memiliki pengurus yang disebut
          Core Team.
        </p>
      </div>
      <div className="w-full py-12 flex flex-col justify-center items-center gap-3">
        <h2 className="text-black text-3xl lg:text-4xl">Struktur GDGoC UM</h2>
        <div className="w-full flex flex-col justify-center items-center gap-3 pt-12">
          <Image
            src={StrukturImage}
            alt="Struktur"
            width={1280}
            height={1280}
          />
        </div>
      </div>
      <div className="w-full py-16 flex flex-col justify-center items-center gap-3 text-center px-5">
        <h2 className="text-black text-3xl lg:text-4xl">Halaman bevy Kami</h2>
        <Link
          className="mt-2 text-coreBlue-primary font-bold text-lg lg:text-2xl hover:underline hover:text-coreBlue-500"
          href="https://gdsc.community.dev/universitas-negeri-malang/"
        >
          https://gdg.community.dev/gdg-on-campus-universitas-negeri-malang-malang-indonesia/
        </Link>
      </div>
      <div className="w-full">
        <Partner />
      </div>
    </div>
  );
}

export default page