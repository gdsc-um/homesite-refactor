"use server"

import { revalidatePath } from "next/cache";
import { QUIZZES } from "../data/quizzes";
import { ActionResult } from "./definition";
import { redirect } from "next/navigation";

const createQuiz = async (prevState: ActionResult, formData: FormData): Promise<ActionResult> => {
    console.log('create quiz');
    const data = {
        question: formData.get('question') as string,
        choices: [
            formData.get('choice1') as string,
            formData.get('choice2') as string,
            formData.get('choice3') as string,
            formData.get('choice4') as string
        ],
        correctAnswerIndex: Number(formData.get('correctAnswerIndex'))
    }
    console.log(data);
    QUIZZES.push({
        question: data.question,
        author: "System",
        id: `${Math.random()}`,
        choices: [...data.choices],
        correctAnswerIndex: 1
    })
    console.log(QUIZZES)

    revalidatePath('/admin/dashboard/quiz');
    redirect('/admin/dashboard/quiz');
}

const updateQuiz = async (prevState: ActionResult, id: string, formData: FormData): Promise<ActionResult> => {
    console.log('edit quiz');
    const data = {
        question: formData.get('question') as string,
        choices: [
            formData.get('choice1') as string,
            formData.get('choice2') as string,
            formData.get('choice3') as string,
            formData.get('choice4') as string
        ],
        correctAnswerIndex: Number(formData.get('correctAnswerIndex'))
    }
    console.log(data);
    // Edit the quiz



    revalidatePath('/admin/dashboard/quiz');
    redirect('/admin/dashboard/quiz');

}

const deleteQuiz = async (quizId: string) => {
    console.log('delete quiz' + quizId);
    const filteredQuiz = QUIZZES.filter(quiz => quiz.id !== quizId);
    console.log(filteredQuiz);

}

export { createQuiz, updateQuiz, deleteQuiz }