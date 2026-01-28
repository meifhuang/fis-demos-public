"use client";

import { Quiz } from "../../_models";
import QuestionReview from "./QuestionReview";

type ReviewProps = {
  quiz: Quiz;
  correctQuiz: Quiz;
  score: () => number | undefined;
  restart: () => void;
};

export default function QuizReview({ quiz, correctQuiz, score }: ReviewProps) {
  return (
    <div className="max-w-5xl mx-auto font-inter min-h-screen w-full flex flex-col gap-2">
      Score: {score() ?? "unknown"}
      {quiz.questions.map((question, index) => (
        <QuestionReview
          key={index}
          question={question}
          correctQuestion={correctQuiz.questions[index]}
          idx={index}
        />
      ))}
    </div>
  );
}
