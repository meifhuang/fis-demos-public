import { NextResponse } from "next/server";
import { QuizRecord } from "@/types/demos/quiz-generator";

// --- MOCK COURSE OUTLINE DATA ---

const mockQuizzes: QuizRecord[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals for the Web",
    description:
      "A beginner-friendly course covering variables, control flow, DOM manipulation, and modern ES6 features.",
    numberOfQuestions: 12,
    learnerProfileId: "1", // Assigned Liam
    sourceLessonId: "0"
  },
  {
    id: "2",
    title: "Python & Pandas for Data Storytelling",
    description:
      "Learn to use Python (Pandas and Matplotlib) to analyze educational data and create compelling visualizations.",
    numberOfQuestions: 8,
    learnerProfileId: "2", // Assigned Maya,
    sourceLessonId: "0"
  },
  {
    id: "3",
    title: "Building Secure APIs with Node.js",
    description:
      "Intermediate course focusing on server-side security, authentication (JWT), and protecting web applications from common attacks.",
    numberOfQuestions: 10,
    learnerProfileId: "3", // Assigned Chloe
    sourceLessonId: "0"
  },
];

/**
 * Handles GET requests for the course outline records.
 */
export async function GET() {
  // Simulate a network delay (optional)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json(mockQuizzes, { status: 200 });
}
