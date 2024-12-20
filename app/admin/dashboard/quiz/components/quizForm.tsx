"use client";
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createQuiz, updateQuiz } from '../lib/action';
import { FC, useActionState } from 'react';
import { ActionResult } from '../lib/definition';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


interface QuestionInterface {
    id: string,
    question: string,
    author: string,
    choices: string[],
    correctAnswerIndex: number
}

interface QuizFormProps {
    quiz?: QuestionInterface,
    type: "ADD" | "EDIT"
}

const QuizForm: FC<QuizFormProps> = ({ quiz, type }) => {
    const router = useRouter();
    const pathname = usePathname();
    const isNew = pathname.split("/")[4] === "create";
    console.log(pathname.split("/"))

    const initialState: ActionResult = {
        errorTitle: null,
        errorDesc: []
    }

    const updateQuizById = (_state: ActionResult, formData: FormData,) => {
        return updateQuiz(initialState, quiz?.id!, formData);
    }

    const [state, formAction] = useActionState(type === "ADD" ? createQuiz : updateQuizById, initialState);

    return (
        <form className='flex flex-col gap-4' action={formAction}>
            <div className='flex flex-col gap-2'>
                <Label className='text-lg ' htmlFor='question'>Question:</Label>
                <Input defaultValue={isNew ? '' : quiz?.question} name='question' id='question' />
            </div>

            <div className='grid sm:grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                    <Label className='text-lg ' htmlFor='choice-1'>A:</Label>
                    <Input defaultValue={isNew ? '' : quiz?.choices[0]} name='choice1' id='choice-1' />
                </div>
                <div className='flex items-center gap-2'>
                    <Label className='text-lg ' htmlFor='choice-2'>B:</Label>
                    <Input defaultValue={isNew ? '' : quiz?.choices[1]} name='choice2' id='choice-2' />
                </div>
                <div className='flex items-center gap-2'>
                    <Label className='text-lg ' htmlFor='choice-3'>C:</Label>
                    <Input defaultValue={isNew ? '' : quiz?.choices[2]} name='choice3' id='choice-3' />
                </div>
                <div className='flex items-center gap-2'>
                    <Label className='text-lg ' htmlFor='choice-4'>D:</Label>
                    <Input defaultValue={isNew ? '' : quiz?.choices[3]} name='choice4' id='choice-4' />
                </div>
            </div>

            <div className='space-y-2 mt-4'>
                <h3>Correct Answer:</h3>
                <RadioGroup defaultValue={`${quiz?.correctAnswerIndex}`} name='correctAnswerIndex' className='flex gap-4'>
                    <div className="flex items-center space-x-1">
                        <RadioGroupItem value="0" id="answer-1" />
                        <Label htmlFor="answer-1">A</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <RadioGroupItem value="1" id="answer-2" />
                        <Label htmlFor="answer-2">B</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <RadioGroupItem value="2" id="answer-3" />
                        <Label htmlFor="answer-3">C</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                        <RadioGroupItem value="3" id="answer-4" />
                        <Label htmlFor="answer-4">D</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className='flex justify-end gap-4 mt-2'>
                <Button type='button' onClick={() => router.back()} variant='ghost'>{isNew ? 'Cancel' : 'Back'}</Button>
                <Button>Save</Button>
            </div>
        </form>
    )
}

export default QuizForm