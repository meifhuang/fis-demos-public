"use client";

import React, { useMemo } from "react";
import {
  Clock,
  Users,
  LayoutList,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Lightbulb,
  LucideIcon,
} from "lucide-react";
import {
  Chip,
  Card,
  CardHeader,
  CardBody,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import BlockSection from "./_components/BlockSection";
import { useCourseOutlineData } from "./_hooks/useCourseOutlineData";
import { Lesson, LessonSections } from "@/types";
import CourseOverviewSkeleton from "./_components/CourseOverviewSkeleton";
import LessonItemSkeleton from "./_components/LessonItemSkeleton";

// --- MOCK DATA ---
const MOCK_LESSON_CONTENT_BLOCKS = [
  "introduction",
  "context",
  "example",
  "activity",
  "assessment",
  "reflection",
] as const;

const LessonIcons: Record<keyof LessonSections, LucideIcon> = {
  introduction: BookOpen,
  context: Users,
  example: Lightbulb,
  activity: LayoutList,
  assessment: CheckCircle,
  reflection: Clock,
};

// --- Main Component ---

export default function CourseOutlineTeacherView() {
  const { course, isCourseFetching } = useCourseOutlineData();
  // Calculate total duration for metadata using useMemo for efficiency
  const totalDurationText = useMemo(() => {
    if (course) {
      const totalMinutes = course.lessons.reduce(
        (acc, lesson) => acc + (parseInt(lesson.duration.split(" ")[0]) || 0),
        0
      );
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours} hr ${minutes} min`;
    }
  }, [course]);

  return (
    <div className="max-w-5xl mx-auto font-inter min-h-screen w-full">
      {isCourseFetching && !course?.title ? (
        <CourseOverviewSkeleton />
      ) : (
        <Card className="shadow-xl border-t-4 border-indigo-600 mb-8 rounded-xl">
          <CardHeader>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              {course?.title}
            </h1>
          </CardHeader>
          <CardBody className="pt-0">
            <p className="text-lg text-gray-600 border-b pb-4 mb-4">
              {course?.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Chip
                size="md"
                variant="faded"
                startContent={<LayoutList className="w-4 h-4" />}
              >
                Total Lessons:{" "}
                <span className="font-semibold ml-1">
                  {course?.numberOfLessons}
                </span>
              </Chip>
              <Chip
                size="md"
                variant="faded"
                startContent={<Clock className="w-4 h-4" />}
              >
                Total Course Time:{" "}
                <span className="font-semibold ml-1">{totalDurationText}</span>
              </Chip>
              <Chip
                size="md"
                variant="faded"
                startContent={<Users className="w-4 h-4" />}
              >
                Target Profile:{" "}
                <span className="font-semibold ml-1">
                  ID {course?.learnerProfileId}
                </span>
              </Chip>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Detailed Lesson Breakdown */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Structural Lesson Analysis
      </h2>

      {isCourseFetching ? (
        <LessonItemSkeleton />
      ) : (
        <Accordion
          selectionMode="multiple"
          className="space-y-4"
          variant="splitted"
          defaultExpandedKeys={["0"]}
        >
          {course
            ? course.lessons.map((lesson, index) => (
                <AccordionItem
                  key={index.toString()}
                  aria-label={lesson.title}
                  title={
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xl font-bold text-gray-800">
                        {lesson.title}
                      </span>
                      <Chip size="sm" variant="bordered" className="text-sm">
                        {lesson.duration}
                      </Chip>
                    </div>
                  }
                  subtitle={
                    <p className="text-sm text-gray-500">
                      Click to view Rationale & Assessment breakdown
                    </p>
                  }
                  indicator={({ isOpen }) =>
                    isOpen ? (
                      <ChevronUp className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )
                  }
                  classNames={{
                    trigger: "py-5 cursor-pointer",
                    heading: "text-xl",
                    content: "p-4 pt-0",
                    title: "text-lg font-semibold",
                    subtitle: "text-xs",
                    base: "border-t-4 border-indigo-200",
                  }}
                >
                  <div className="p-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {MOCK_LESSON_CONTENT_BLOCKS.map((blockKey) => {
                      // Asserting the key type is safe here because the array is defined as const
                      const block = lesson[blockKey as keyof Lesson];

                      // FIX: Use explicit type guards to ensure 'block' is a non-null object
                      // before using the 'in' operator, resolving the type conflict.
                      if (
                        typeof block === "object" &&
                        block !== null &&
                        "rationale" in block
                      ) {
                        const title =
                          blockKey.charAt(0).toUpperCase() + blockKey.slice(1);
                        const Icon =
                          LessonIcons[blockKey as keyof typeof LessonIcons] ||
                          BookOpen;

                        return (
                          <BlockSection
                            key={blockKey}
                            title={title}
                            rationale={block.rationale}
                            assessment={block.assessment_format}
                            Icon={Icon}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                </AccordionItem>
              ))
            : null}
        </Accordion>
      )}
      <p className="text-center text-xs text-gray-400 mt-10">
        End of Course Outline Analysis
      </p>
    </div>
  );
}
