"use client";
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FC } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Question as QuestionInterface } from '../../lib/definition';


interface QuestionFormProps {
    question?: QuestionInterface,
    type: "ADD" | "EDIT" | "SEE"
}

const QuestionForm: FC<QuestionFormProps> = ({ question, type }) => {
    const router = useRouter();
    const correctAnswerIndex = question?.options.findIndex(option => option.isCorrect);
    return (
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <Label className='text-lg ' htmlFor='question'>Question:</Label>
                <Input disabled={type === "SEE"} defaultValue={type !== "ADD" ? question?.question : ""} name='question' id='question' required />
            </div>

            <div className='grid sm:grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                    <Label className='text-lg ' htmlFor='option-1'>A:</Label>
                    <Input disabled={type === "SEE"} defaultValue={type !== "ADD" ? question?.options[0].answer : ""} name='option1' id='option-1' required />
                </div>
                <div className='flex items-center gap-2'>
                    <Label className='text-lg ' htmlFor='option-2'>B:</Label>
                    <Input disabled={type === "SEE"} defaultValue={type !== "ADD" ? question?.options[1].answer : ""} name='option2' id='option-2' required />
                </div>
                <div className='flex items-center gap-2'>
                    <Label className='text-lg ' htmlFor='option-3'>C:</Label>
                    <Input disabled={type === "SEE"} defaultValue={type !== "ADD" ? question?.options[2].answer : ""} name='option3' id='option-3' required />
                </div>
                <div className='flex items-center gap-2'>
                    <Label className='text-lg ' htmlFor='option-4'>D:</Label>
                    <Input disabled={type === "SEE"} defaultValue={type !== "ADD" ? question?.options[3].answer : ""} name='option4' id='option-4' required />
                </div>
            </div>

            <div className='space-y-2 mt-4'>
                <h3>Correct Answer:</h3>
                <RadioGroup disabled={type === "SEE"} defaultValue={`${correctAnswerIndex}`} name='correctAnswerIndex' className='flex gap-4' required>
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
                <Button type='button' onClick={() => router.back()} variant='ghost'>{type === "ADD" ? 'Cancel' : 'Back'}</Button>
                {type !== "SEE" && <Button>Save</Button>}
            </div>
        </form>
    )
}

export default QuestionForm;