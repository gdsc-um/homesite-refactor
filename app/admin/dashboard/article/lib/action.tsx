"use server"

import { revalidatePath } from "next/cache";
import { articles } from "../data/articles";
import { ActionResult } from "./definition";
import { redirect } from "next/navigation";

const createArticle = async (prevState: ActionResult, formData: FormData): Promise<ActionResult> => {
    console.log('create article');
    const data = {
        title: formData.get('title') as string,
        content: formData.get('content') as string
    }
    console.log(data);
    articles.push({
        title: data.title,
        author: "System",
        id: `${Math.random()}`,
        date: new Date().toISOString(),
        content: data.content
    })
    console.log(articles)

    revalidatePath('/admin/dashboard/article');
    redirect('/admin/dashboard/article');
}

export { createArticle }