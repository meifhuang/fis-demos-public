import { SetStateAction, useState } from "react";
import { Quiz } from "@demos/quiz-generator/_models";
import { useQuiz } from "../../_store";
import { Question } from "@/types";

const isEqual = (
  a?: Quiz,
  b?: Quiz
): boolean => JSON.stringify(a) === JSON.stringify(b)

function removeCorrectAnswers (q: Quiz | undefined) {
  if (q === undefined) return q
  const questions: Question[] = q.questions.map(question => {
    return {
      ...question,
      answers: question.answers.map(answer => {
        return {
          ...answer,
          correct: false
        }
      })
    }
  })

  return q.withQuestions(questions);
}

export const useTakeQuiz = (id: string) => {
  const { data, isFetching, error, status } = useQuiz(id);

  const [state, setState] = useState<{
    quiz: Quiz | undefined;
    baseQuiz: Quiz | undefined;
    lastFetchedData: Quiz | undefined;
  }>({
    quiz: removeCorrectAnswers(data),
    baseQuiz: data,
    lastFetchedData: data,
  });

  if (!isEqual(data, state.lastFetchedData)) {
    setState({
      quiz: removeCorrectAnswers(data),
      baseQuiz: state.baseQuiz ?? data,
      lastFetchedData: data,
    });
  }

  const setQuiz = (quiz: SetStateAction<Quiz | undefined>) => {
    setState(prev => ({
      ...prev,
      quiz: typeof quiz === 'function' ?
        quiz(prev.quiz) : quiz,
    }));
  };

  const handleCorrectAnswerChange = (questionIndex: number) => (correctAnswerIndex: number) => {
    setQuiz((previous) => {
      if (!previous) return undefined;
      const result = previous.withCorrectAnswer(questionIndex, correctAnswerIndex)
      return result
    })
  }

  const getScore = () => {
    if (state.quiz === undefined) return;
    if (state.baseQuiz === undefined) return;
    const correctQuestions = state.quiz.questions.filter((question, index) => {
      const correct = question.answers.find(answer => answer.correct)
      const correctOnBase = state.baseQuiz?.questions[index].answers.find(answer => answer.correct)

      return correct?.text === correctOnBase?.text
    })

    return Math.round((correctQuestions.length / state.quiz.questionCount) * 1000)/10
  }

  return {
    quiz: state.quiz,
    correctQuiz: state.baseQuiz,
    isFetching,
    error,
    status,
    getScore,
    handleCorrectAnswerChange,
  };
};
