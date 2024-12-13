"use client";

import { useState } from "react";

function Page() {
  const [search, setSearch] = useState("");

  const articles = [
    { id: 1, title: "Article 1", author: "Author 1", date: "2023-01-01" },
    { id: 2, title: "Article 2", author: "Author 2", date: "2023-01-02" },
    // Add more articles as needed
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Articles</h1>
      <div className="flex justify-between items-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Add Article</button>
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded"
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Title</th>
            <th className="py-2">Author</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map(article => (
            <tr key={article.id}>
              <td className="py-2">{article.id}</td>
              <td className="py-2">{article.title}</td>
              <td className="py-2">{article.author}</td>
              <td className="py-2">{article.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Page;