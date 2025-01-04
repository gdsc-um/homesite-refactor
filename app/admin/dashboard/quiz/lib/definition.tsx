import { Questions, Quiz, QuizResult, User } from "@prisma/client";

export type QuizWithAuthor = Quiz & {
    author: User;
    questions: Questions[]
};

export type QuizWithAllRelations = Quiz & {
    author: User;
    questions: Questions[];
    results: QuizResult[];
}