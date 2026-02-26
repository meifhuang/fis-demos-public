"use client";

import { Card, CardHeader, CardBody } from "@heroui/react";
import { Users } from "lucide-react";

import { LearnerProfile, LearnerProfileChip } from "@/lib/learner-profiles";
import DemoNavigationPanel from "../../_components/DemoNavigationPanel";
import { useParams } from "next/navigation";
// import { Lesson } from "../../../../features/lessons/models/Lesson";
import { useGetLesson } from "@/features/lessons/hooks/useGetLesson";
import { LessonSkeleton } from "@/features/lessons/components/LessonSkeleton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function LessonTeacherView() {
  // const router = useRouter();
  const { lessonId: id } = useParams<{ lessonId: string }>();
  const {
    data: lesson,
    isFetching,
    error,
  } = useGetLesson(id, { retry: false });

  console.log(error);

  const navProps = {
    backRoute: "/lesson",
    editRoute: lesson ? `/lesson/${lesson.id}/edit` : undefined,
    // delete: lesson
    //   ? {
    //       onDelete: handleDelete,
    //       recordTitle: lessonPlan.creation_meta.source_material.title,
    //       recordType: "Lesson Plan",
    //     }
    //   : undefined,
  };

  if (error) {
    return (
      <>
        <DemoNavigationPanel {...navProps} />
        <div className="p-8 max-w-5xl mx-auto text-center text-red-600">
          <p>Error loading lesson: {error.message}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <DemoNavigationPanel {...navProps} />
      <div className="max-w-5xl mx-auto font-inter min-h-screen w-full">
        {isFetching || !lesson ? (
          <LessonSkeleton />
        ) : (
          <>
            <Card className="shadow-xl border-t-4 border-indigo-600 mb-8 rounded-xl">
              <CardHeader>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                  {lesson?.creationMeta?.source_material?.title}
                </h1>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="prose prose-base max-w-none prose-headings:font-bold prose-h2:mt-6 prose-h3:mt-4">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {lesson?.creationMeta.source_material?.markdown}
                  </ReactMarkdown>
                </div>

                <div className="flex flex-wrap gap-4">
                  <LearnerProfileChip
                    learnerProfile={
                      lesson?.creationMeta.learner_profile
                        ? ({
                            id: lesson.creationMeta.learner_profile.id,
                            label: lesson.creationMeta.learner_profile.label,
                            age: lesson.creationMeta.learner_profile.age,
                            readingLevel:
                              lesson.creationMeta.learner_profile.reading_level,
                            experience:
                              lesson.creationMeta.learner_profile.experience,
                            interests:
                              lesson.creationMeta.learner_profile.interests,
                          } as LearnerProfile)
                        : null
                    }
                    size="md"
                    variant="faded"
                    color="default"
                    startContent={<Users size={18} />}
                  >
                    Target Profile:{" "}
                    <span className="font-semibold ml-1">
                      {lesson?.creationMeta.learner_profile?.label}
                    </span>
                  </LearnerProfileChip>
                </div>
              </CardBody>
            </Card>
          </>
        )}
        {/* Detailed Lesson Breakdown */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Lessons</h2>
        {isFetching ? (
          <LessonSkeleton />
        ) : (
          <Card className="shadow-lg rounded-xl">
            <CardBody className="divide-y-2 divide-indigo-100">
              <section>
                <div className="border-l-4 border-indigo-600 pl-4 mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {lesson?.title}
                  </h3>
                </div>
                <div className="prose prose-base max-w-none prose-headings:font-bold prose-h2:mt-6 prose-h3:mt-4">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {lesson?.content}
                  </ReactMarkdown>
                </div>
              </section>
            </CardBody>
          </Card>
        )}
      </div>
    </>
  );
}
