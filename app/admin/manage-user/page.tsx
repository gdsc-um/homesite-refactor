/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState } from "react";
import coreteamData from "../../../data/coretim.json";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DataTable() {
  const coreteam = coreteamData.coreteam;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter data berdasarkan query pencarian
  const filteredCoreteam = coreteam.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Data untuk halaman saat ini
  const paginatedCoreteam = filteredCoreteam.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredCoreteam.length / itemsPerPage);

  // Fungsi untuk menangani perubahan halaman
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Container>
      <div className="flex justify-between items-center mb-4">
        <div></div> {/* Empty div to push the search input to the right */}
        <Input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset ke halaman pertama saat mencari
          }}
          className="max-w-xs"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Picture</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Profile Link</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedCoreteam.length > 0 ? (
            paginatedCoreteam.map((member) => (
              <TableRow key={member.nim}>
                <TableCell>
                  <img
                    src={member.picture}
                    alt={member.name}
                    className="w-16 h-16 rounded-full"
                  />
                </TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <a
                    href={member.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Visit Profile
                  </a>
                </TableCell>
                <TableCell>
                  <a
                    href={"/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Delete
                  </a>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="ghost"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="ghost"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </Container>
  );
}
