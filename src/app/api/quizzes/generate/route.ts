import { openAIService } from "@/lib/llm-generation/openai/OpenAIService";
import {
  cleanIntoStandardQuestion,
  generationSchema,
  QuestionOutput,
} from "@/lib/llm-generation/schemas/quiz.zod";
import { Question, QuizGenerationState } from "@/types";
import { NextRequest, NextResponse } from "next/server";

function readingLevelExample(level: number) {
  if (level < 0)
    return "You must return Pre-K level text, but we do not have an example for this";
  if (level > 12)
    return "This is a college level of education which is similar to your standard output";

  return [
    //Kindergarten
    "The cat is fluffy.",
    //1st Grade
    "I like to read books about animals.",
    //2nd Grade
    "The big brown dog barked at the mailman.",
    //3rd Grade
    "My favorite subject is science because I enjoy learning about the world.",
    //4th Grade
    "The children ran to the playground after school.",
    //5th Grade
    "We are studying ancient civilizations in history class this year.",
    //6th Grade
    "The students worked together on a project to build a model volcano.",
    //7th Grade
    "The main character in the book had to overcome several challenges to achieve her goal.",
    //8th Grade
    "After the storm, we noticed a large tree had fallen in the yard.",
    //9th Grade
    "Because the weather was so beautiful, we decided to have a picnic in the park.",
    //10th Grade
    "Although the test was difficult, she felt confident she had answered all the questions correctly.",
    //11th Grade
    "The team's victory was a result of their hard work and dedication throughout the season.",
    //12th Grade
    "While he was initially hesitant to join the club, he eventually found a sense of belonging among the members",
  ][level];
}

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      description,
      customization,
      sourceMaterial,
      learnerProfile,
      numberOfQuestions,
    }: QuizGenerationState = await req.json();

    const prompt = `
      Title: ${title}
      Description: ${description}
      -----------------------
      Learner Label: ${learnerProfile.label}
      Learner Age: ${learnerProfile.age}
      Learner Interests: ${learnerProfile.interests.join(", ")}
      Learner Experience: ${learnerProfile.experience}
      Here is an example sentence at the learner's reading level: ${readingLevelExample(learnerProfile.readingLevel)}
      ------------------------
      Source Material Title: ${sourceMaterial?.title}
      Source Material Content: ${sourceMaterial?.markdown}
      ------------------------
      Customization notes: ${customization}
    `.replaceAll("      ", "");

    const result =
      await openAIService.generateStructuredContent<QuestionOutput>(
        prompt,
        generationSchema(numberOfQuestions),
        {
          systemPrompt: `About you:
            You are an expert quiz maker. 
            You know that the average question should have 4 answers unless there is a good reason for another number like 2 for a true false question. 
            Remember though if the customization suggests other numbers, use them.
            You know that the only real time to use a learner's interests is if they can make a good question
            Your questions are always based on the source material, but sometimes your questions tie in the learner's interests when it makes for a strong question about the topic. You know that those special questions are the only time to incorporate the learner's interests
            You know that all distractors must be in the same subject area as the correct answer. You know that all distractors must be plausible if the learner hasn't studied the source material.
            You know to keep everything at the learner's reading level.

            So a bad question which you always avoid ask a simple question and then have answers like "[Leaner interest #1]" "[Learner interest #2]" so on

            EXAMPLE QUESTIONS you've made:
            What do you think a 'scatter plot' might look like?
              Little dots scattered around, like a group of tiny ants // Awesome answer
              A straight line like a railroad track // Awesome distractor

            Which plot helps show the spread of data in Seaborn?
              Scatter plot // Good distractor
              Box plot // Good answer
              Bar plot // Good distractor
              Violin plot // Good distractor
            `.replaceAll("            ", ""),
          developerPrompt: `
            Our instructions:
            Do not include commentary or markdown.
            Keep your questions appropriate for the user and relevant to the material

            Keep all questions at a similar difficulty based on the learner's profile and the source material
            `.replaceAll("            ", ""),
          max_output_tokens: 2000,
          temperature: 1,
        },
      );

    console.log(JSON.stringify(result.questions));

    const questions: Question[] = cleanIntoStandardQuestion(result.questions);

    return NextResponse.json(questions);
  } catch (error) {
    console.error("POST /quizzes/generate", error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 },
    );
  }
}
