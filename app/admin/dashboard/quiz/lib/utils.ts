import { QuizType } from "@prisma/client";

export const getBadgeColor = (type: QuizType | string) => {
    switch (type) {
        case type = "WEB":
            return "bg-blue-500 text-white";
        case type = "ML":
            return "bg-green-500 text-white";
        case type = "MOBILE":
            return "bg-indigo-500 text-white";
        case type = "UIUX":
            return "bg-pink-500 text-white";
    }
}