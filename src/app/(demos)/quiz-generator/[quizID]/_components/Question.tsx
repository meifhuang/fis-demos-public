"useclient";

import { Card, CardHeader, CardBody, RadioGroup, Radio } from "@heroui/react";
import { Question } from "@/types";

type QuestionProps = {
  question: Question;
  handleCorrectAnswerChange: (answerIndex: number) => void;
};

export default function SingleQuestion({
  question,
  handleCorrectAnswerChange,
}: QuestionProps) {
  return (
    <Card className="shadow-lg overflow-hidden border border-indigo-100 bg-white">
      <CardHeader className="bg-indigo-50/60 border-b border-indigo-100">
        <h2 className="text-lg font-semibold text-gray-900">
          {question.question}
        </h2>
      </CardHeader>

      <CardBody className="p-6">
        <RadioGroup
          value={String(question.answers.findIndex((a) => a.correct))}
          onValueChange={(idx) => handleCorrectAnswerChange(Number(idx))}
          classNames={{
            wrapper: "flex flex-col gap-4",
          }}
        >
          {question.answers.map((answer, index) => (
            <Radio key={index} value={String(index)}>
              {answer.text}
            </Radio>
          ))}
        </RadioGroup>
      </CardBody>
    </Card>
  );
}
