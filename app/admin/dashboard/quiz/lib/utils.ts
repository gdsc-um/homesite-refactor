import { QuizType } from "./definition";

export const getBadgeColor = (type: QuizType) => {
    switch (type) {
        case QuizType.WEB:
            return "bg-blue-500 text-white";
        case QuizType.ML:
            return "bg-green-500 text-white";
        case QuizType.MOBILE:
            return "bg-indigo-500 text-white";
        case QuizType.UIUX:
            return "bg-pink-500 text-white";
    }
}