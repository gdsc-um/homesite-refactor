"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "./actionButton";
import { Article } from "../lib/definition";
import Image from "next/image"; // Import Image from next/image

export const columns: ColumnDef<Article>[] = [
  {
    id: "count",
    header: "#",
    cell: ({ row }) => {
      return <div className="py-4">{row.index + 1}.</div>;
    },
  },
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
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const article = row.original;
      return <div className="py-4">{article.date}</div>;
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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const article = row.original;
      return (
        <div className="py-4">
          <Image
            src={article.image}
            alt="article"
            width={40}  // Set fixed width
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
      return <ActionButton data={article} />;  // Just pass the `data` prop
    },
  },
];
