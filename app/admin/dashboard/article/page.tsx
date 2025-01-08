"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { columns } from "./components/articleColumns";
import { Article } from "./lib/definition";

const ArticlePage: FC = () => {
    const router = useRouter();
    const [articles, setArticles] = useState<Article[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/article');
                if (response.ok) {
                    const data: Article[] = await response.json();
                    setArticles(data.map(article => ({ ...article, image: article.image || "", banner: article.banner || "" })));
                    setFilteredArticles(data); // Menyimpan data awal ke filteredArticles
                } else {
                    console.error("Failed to fetch articles.");
                }
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, []);

    // Filter artikel berdasarkan kata kunci pencarian
    useEffect(() => {
        if (searchQuery === "") {
            setFilteredArticles(articles); // Jika tidak ada kata kunci pencarian, tampilkan semua artikel
        } else {
            setFilteredArticles(
                articles.filter(article => 
                    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    article.slug.toLowerCase().includes(searchQuery.toLowerCase()) // Menambahkan pencarian berdasarkan slug atau judul
                )
            );
        }
    }, [searchQuery, articles]);

    if (isLoading) {
        return <p>Loading articles...</p>;
    }

    return (
        <div className="px-6 max-w-[80rem] mx-auto">
            <header className="flex flex-col gap-4 py-4">
                <h3 className="font-semibold text-3xl">Article</h3>
                <div className="grid grid-cols-2">
                    <Button onClick={() => router.push(`article/create`)} className="w-[5rem] sm:w-[10rem]">Add</Button>
                    <div className="flex justify-end">
                        <Input 
                            className="max-w-[15rem]" 
                            type="text" 
                            name="search" 
                            placeholder="Search Title..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} // Mengubah state searchQuery saat input berubah
                        />
                    </div>
                </div>
            </header>

            <DataTable columns={columns} data={filteredArticles} /> {/* Menampilkan filteredArticles */}
        </div>
    );
};

export default ArticlePage;
