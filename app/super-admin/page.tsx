import React from "react";
import coreteamData from "../../data/coreteam.json";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Container from "@/components/Container";

export default function DataTable() {
  // Akses array coreteam
  const coreteam = coreteamData.coreteam;

  return (
    <Container>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Picture</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Profile Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coreteam.map((member) => (
            <TableRow key={member.uuid}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
