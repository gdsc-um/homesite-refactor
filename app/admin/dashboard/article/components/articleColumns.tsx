"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "./actionButton";
import { Article } from "../lib/definition";
import Image from "next/image"; // Import Image from next/image

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const article = row.original;
      return <div className="py-4">{article.title}</div>;
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      const article = row.original;
      return <div className="py-4">{article.author}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      const article = row.original;
      // Format the date if needed
      const formattedDate = new Date(article.createdAt).toLocaleDateString();
      return <div className="py-4">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      const article = row.original;
      const truncatedContent =
        article.content.length > 100
          ? `${article.content.slice(0, 100)}...`
          : article.content;

      return (
        <div className="py-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[300px]">
          {truncatedContent}
        </div>
      );
    },
  },
  {
    accessorKey: "banner",
    header: "Banner",
    cell: ({ row }) => {
      const article = row.original;

      // Handle empty or invalid `banner` values
      const imageSrc = `https://drive.google.com/uc?id=${article.banner}` || "/placeholder-image.png";

      return (
        <div className="py-4">
          <Image
            src={imageSrc}
            alt="article banner"
            width={40} // Set fixed width
            height={40} // Set fixed height
            className="rounded-full" // Retain rounded shape
          />
        </div>
      );
    },
  },
  {
    id: "action",
    header: () => {
      return <p className="text-center">Action</p>;
    },
    cell: ({ row }) => {
      const article = row.original;
      return <ActionButton data={article} />;
    },
  },
];
