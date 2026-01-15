'use client'

import { Question } from "@/types"
import { Accordion, AccordionItem, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { CircleCheck, CircleX } from "lucide-react";

type ReviewProps = {
  question: Question
  correctQuestion: Question
  idx: number
}

export default function QuestionReview({ question, correctQuestion, idx }: ReviewProps) {
  const chosenAnswer = question.answers.find(answer => answer.correct);
  const correctAnswer = correctQuestion.answers.find(answer => answer.correct)

  if (chosenAnswer === undefined || correctAnswer === undefined) {
    return null
  }

  const correct = chosenAnswer.text === correctAnswer.text

  const title = (
    <div className="flex flex-row gap-2">
      {correct ? <CircleCheck className="text-green-500" /> : <CircleX className="text-red-500" />}
      <h2>Question {idx}: {question.question}</h2>
    </div>
  )

  return (
    <Accordion variant="shadow">
      <AccordionItem title={title}>
        <div className="flex flex-col gap-1">
          <Card>
          <CardHeader>Your Answer</CardHeader>
          <CardBody className={`${correct ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3>{chosenAnswer.text}</h3>
          </CardBody>
          <CardFooter>
            {chosenAnswer.feedback}
          </CardFooter>
        </Card>
        {!correct && (
          <Card>
            <CardHeader>Correct Answer</CardHeader>
            <CardBody className="bg-green-100">
              <h3>{correctAnswer.text}</h3>
            </CardBody>
        </Card>
        )}
        </div>
      </AccordionItem>
    </Accordion>
  )
}
