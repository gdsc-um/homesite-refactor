"use client";

import { CircleAlert, Eye, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FC, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { QuizWithAuthor } from "../lib/definition";
import { Questions } from "@prisma/client";
import toast from "react-hot-toast";

interface ActionButtonProps {
  data: Questions | QuizWithAuthor;
  type: "QUIZ" | "QUESTION";
}

const ActionButton: FC<ActionButtonProps> = ({ data, type }) => {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleSeeDetailClick = () => {
    let url = `quiz/${data.id}`;
    if (type === "QUESTION" && "quizId" in data)
      url = `${data.quizId}/questions/${data.id}`;
    router.push(url);
  };

  const handleEditClick = () => {
    let url = `quiz/${data.id}/edit`;
    if (type === "QUESTION" && "quizId" in data)
      url = `${data.quizId}/questions/${data.id}/edit`;
    router.push(url);
  };

  const handleDeleteClick = () => {
    let url = `/api/quizzes/${data.id}`;
    if (type === "QUESTION" && "quizId" in data)
      url = `/api/quizzes/${data.quizId}/questions/${data.id}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        dialogCloseRef.current?.click();
        toast.success("Quiz/Question deleted successfully");
        window.location.reload();
        // router.refresh();
      })
      .catch((err) => {
        toast.error("Failed to delete quiz/question");
      });
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex justify-center gap-6 py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={handleSeeDetailClick}>
              <Eye size={15} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>See Detail</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={handleEditClick} className="">
              <Pencil size={15} />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>
        </Tooltip>

        <Dialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <button>
                  <Trash color="#ef4444" size={15} />
                </button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 mb-2">
                <CircleAlert size={20} color="#ef4444" />
                Are you absolutely sure?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete{" "}
                {type === "QUESTION" ? "question " : "quiz "}
                from our database.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose ref={dialogCloseRef} asChild>
                <Button variant={"ghost"}>Cancel</Button>
              </DialogClose>
              <Button
                onClick={handleDeleteClick}
                type="submit"
                variant={"destructive"}
              >
                Yes, delete it.
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
};

export default ActionButton;
