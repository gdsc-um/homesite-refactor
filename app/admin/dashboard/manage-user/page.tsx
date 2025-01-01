/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import coreteamData from "@/data/coreteam.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";
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

  // Fungsi untuk konfirmasi penghapusan
  const handleDelete = (memberName: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this! Deleting ${memberName}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Deleting member: ${memberName}`);
        Swal.fire("Deleted!", "The member has been deleted.", "success");
      }
    });
  };

  return (
    <Container ClassName="px-6 max-w-[80rem] mx-auto">
      <h1 className="text-2xl font-bold">Manage User</h1>
      <p>Total Member : {paginatedCoreteam.length}</p>
      <div className="flex justify-between items-center mb-4 mt-4">
        <div>
          <Button
            // variant="secondary"
            onClick={() => {
              console.log("Adding new member");
            }}
          >
            Add Member
          </Button>
        </div>
        <div>
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
                  <Button
                    variant="outline"
                    onClick={() =>
                      console.log(`Updating member: ${member.name}`)
                    }
                  >
                    Update
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(member.name)}
                    className="ms-2"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {filteredCoreteam.length > 0 && (
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
      )}
    </Container>
  );
}
