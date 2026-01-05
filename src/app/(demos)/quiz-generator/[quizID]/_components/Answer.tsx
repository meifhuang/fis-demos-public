// import { ChangeEvent } from "react";
import { CircleX, CircleCheck } from "lucide-react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
} from "@heroui/react";
import { Answer } from "@/types";

type NoneditableAnswerProps = {
    answer: Answer
}

export default function AnswerView({
  answer
}: NoneditableAnswerProps) {
  return (
  <Card className={`flex flex-row ${answer.correct ? "border-green-300 bg-green-50": "border-gray-200 bg-white"}`}>
    <CardHeader className="w-min">
      {answer.correct ? <CircleCheck /> : <CircleX />}
    </CardHeader>
    <CardBody className="w-full flex gap-1">
      <Input label="Answer" value={answer.text} isReadOnly />
      <Input label="Feedback" value={answer.feedback} isReadOnly />
    </CardBody>
  </Card>
  );
}
