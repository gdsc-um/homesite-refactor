import { Questions, Quiz, User } from "@prisma/client";

// export enum QuizType {
//     WEB = "Web Developer",
//     ML = "Machine Learning",
//     MOBILE = "Mobile",
//     UIUX = "UI/UX",
//     OTHER = "Other"
// }

// export interface Quiz {
//     id: string,
//     title: string,
//     content: string,
//     image?: string,
//     type: QuizType,
//     author: string
// }

// export interface QuestionOptions {
//     answer: string,
//     image?: string,
//     isCorrect: boolean
// }
// export interface Question {
//     id: string,
//     quizId: string,
//     question: string,
//     image?: string,
//     options: QuestionOptions[],
//     author: string
// }

export type QuizWithAuthor = Quiz & { author: User, questions: Questions[] };