// import { ChangeEvent } from "react";
// import { CircleX, CircleCheck } from "lucide-react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  // Textarea,
  Checkbox
} from "@heroui/react";
import { Answer } from "@/types";

type EditableAnswerProps = {
    answer: Answer,
    handleAnswerChange: <K extends keyof Answer>(field: K, value: Answer[K]) => void
}

export default function EditableAnswer({
  answer,
  handleAnswerChange
}: EditableAnswerProps) {
  return (
  <Card className={`flex flex-row ${answer.correct ? "border-green-300 bg-green-50": "border-gray-200 bg-white"}`}>
    <CardHeader className="w-min">
      <Checkbox
        isSelected={answer.correct}
        onValueChange={(value) => handleAnswerChange("correct", value)}
      ></Checkbox>
    </CardHeader>
    <CardBody className="w-full flex gap-1">
      <Input label="Answer" value={answer.text} onValueChange={(value) => handleAnswerChange("text", value)} />
      <Input label="Feedback" value={answer.feedback} onValueChange={(value) => handleAnswerChange("feedback", value)} />
    </CardBody>
  </Card>
  );
}

// div
  //   className={`rounded-xl border p-5 shadow-sm transition
  //     ${
  //       answer.correct
  //         ? "border-green-300 bg-green-50"
  //         : "border-gray-200 bg-white"
  //     }`}
  // >
  //   {/* Answer Header */}
  //   <div className="flex items-center justify-between mb-4">
  //     <h3 className="text-sm font-semibold text-gray-700">
  //       Answer
  //     </h3>

  //     {/* Correct Toggle */}
  //     <label className="flex items-center gap-2 cursor-pointer">
  //       <span
  //         className={`text-xs font-medium ${
  //           answer.correct
  //             ? "text-green-700"
  //             : "text-gray-500"
  //         }`}
  //       >
  //         Correct
  //       </span>
  //       <input
  //         type="checkbox"
  //         checked={answer.correct}
  //         onChange={(e) =>
  //           handleAnswerChange(
  //             "correct",
  //             e.target.checked
  //           )
  //         }
  //         className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
  //       />
  //     </label>
  //   </div>

  //   {/* Answer Content */}
  //   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  //     {/* Answer Text */}
  //     <div className="space-y-2">
  //       <div className="flex items-center text-sm font-medium text-gray-600">
  //         <BookOpen className="w-4 h-4 mr-2 text-indigo-500" />
  //         Answer Text
  //       </div>
  //       <Textarea
  //         rows={4}
  //         fullWidth
  //         placeholder="Enter the answer text..."
  //         value={answer.text}
  //         classNames={{
  //           input: "text-sm leading-relaxed",
  //         }}
  //         onChange={(e: ChangeEvent<HTMLElement>) =>
  //           handleAnswerChange(
  //             "text",
  //             (e.target as HTMLTextAreaElement).value
  //           )
  //         }
  //       />
  //     </div>

  //     {/* Feedback */}
  //     <div className="space-y-2">
  //       <div className="flex items-center text-sm font-medium text-gray-600">
  //         <CheckCircle
  //           className={`w-4 h-4 mr-2 ${
  //             answer.correct
  //               ? "text-green-600"
  //               : "text-indigo-500"
  //           }`}
  //         />
  //         Feedback
  //       </div>
  //       <Textarea
  //         rows={4}
  //         fullWidth
  //         placeholder="Explain why this answer is correct or incorrect..."
  //         value={answer.feedback}
  //         classNames={{
  //           input: "text-sm leading-relaxed",
  //         }}
  //         onChange={(e: ChangeEvent<HTMLElement>) =>
  //           handleAnswerChange(
  //             "feedback",
  //             (e.target as HTMLTextAreaElement).value
  //           )
  //         }
  //       />
  //     </div>
  //   </div>
  // </div>
