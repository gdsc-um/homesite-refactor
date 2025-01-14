"use client";

import { ColumnDef } from "@tanstack/react-table";
import ActionButton from "./actionButton";
import { Article } from "../lib/definition";


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
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => {
      const article = row.original;
      // Format the date if needed
      const formattedDate = new Date(article.date).toLocaleDateString();
      return <div className="py-4">{formattedDate}</div>;
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
