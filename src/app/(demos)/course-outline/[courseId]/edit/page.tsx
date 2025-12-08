"use client";

import { ChangeEvent, useEffect } from "react";
import {
  Clock,
  Users,
  LayoutList,
  BookOpen,
  CheckCircle,
  Lightbulb,
  LucideIcon,
} from "lucide-react";
import {
  Chip,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Textarea,
  addToast,
} from "@heroui/react";
import { useCourseOutlineData } from "../_hooks/useCourseOutlineData";
import { Lesson, LessonContentBlock, LessonSections } from "@/types";
import { useRouter } from "next/navigation";
import EditableSectionBlock from "../_components/EditableBlockSection";
import CourseOverviewSkeleton from "../_components/CourseOverviewSkeleton";
import LessonItemSkeleton from "../_components/LessonItemSkeleton";

// --- CONSTANTS ---
const LESSON_CONTENT_BLOCKS = [
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

// Type definition for Lesson key used in map
type BlockKey = (typeof LESSON_CONTENT_BLOCKS)[number];

export default function CourseOutlineTeacherView() {
  const router = useRouter();

  const {
    course,
    courseId,
    isModified,
    totalDuration,
    isSaving,
    isCourseFetching,
    fetchError,
    isSuccess: isSaveSuccess,
    handleTopLevelChange,
    handleLessonChange,
    handleBlockChange,
    saveChanges,
    cancelChanges,
  } = useCourseOutlineData();

  // Handle successful save and navigation
  const savedCourseId = courseId;

  useEffect(() => {
    if (isSaveSuccess && savedCourseId) {
      addToast({
        title: <p className="text-xl text-bold">Success!</p>,
        description: "Course Outline Saved",
        color: "success",
        shouldShowTimeoutProgress: true,
      });
      router.push(`/course-outline/${savedCourseId}`);
    }
  }, [isSaveSuccess, savedCourseId, router]);

  const totalDurationText: string = totalDuration;

  // --- Conditional Rendering ---

  if (fetchError) {
    return (
      <div className="p-8 max-w-5xl mx-auto text-center text-red-600">
        <p>Error loading course: {fetchError.message}</p>
      </div>
    );
  }

  const isFetchingData: boolean = isCourseFetching && !isSaving;

  // --- MAIN RENDER ---
  return (
    <div className="max-w-5xl mx-auto font-inter min-h-screen w-full">
      {isFetchingData && !course?.title ? (
        <CourseOverviewSkeleton />
      ) : (
        <Card className="shadow-xl border-t-4 border-indigo-600 mb-8 rounded-xl">
          <CardHeader className="flex flex-col items-start w-full">
            {/* Editable Title - using HeroUI Input */}
            <Input
              label="Course Title"
              labelPlacement="outside"
              fullWidth
              size="lg"
              className="text-3xl font-extrabold"
              classNames={{
                input: "text-3xl font-extrabold text-gray-900 leading-tight",
              }}
              value={course?.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleTopLevelChange("title", e.target.value)
              }
            />
          </CardHeader>
          <CardBody className="pt-0">
            {/* Editable Description - using HeroUI Textarea */}
            <Textarea
              label="Course Description"
              labelPlacement="outside"
              fullWidth
              rows={3}
              className="w-full text-lg text-gray-600"
              value={course?.description}
              onChange={(e: ChangeEvent<HTMLElement>) =>
                handleTopLevelChange(
                  "description",
                  (e.target as HTMLTextAreaElement).value
                )
              }
            />

            <div className="flex flex-wrap gap-4 mt-4">
              <Chip
                size="md"
                variant="faded"
                startContent={<LayoutList className="w-4 h-4" />}
              >
                Total Lessons:{" "}
                <span className="font-semibold ml-1">
                  {course?.lessons.length}
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

      {isFetchingData ? (
        <LessonItemSkeleton />
      ) : (
        <div className="space-y-6">
          {course?.lessons.map((lesson, index) => (
            <Card
              key={index.toString()}
              className="shadow-lg overflow-hidden border-t-4 border-indigo-200"
            >
              <CardHeader className="flex flex-col items-start w-full">
                <div className="flex items-center justify-between w-full pb-3">
                  <div className="flex flex-col items-start w-full pr-4">
                    {/* Editable Lesson Title - using HeroUI Input */}
                    <Input
                      label="Lesson Title"
                      labelPlacement="outside"
                      size="sm"
                      fullWidth
                      classNames={{
                        input: "text-xl font-bold text-gray-800 p-0 m-0",
                      }}
                      className="w-full"
                      value={lesson.title}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleLessonChange(index, "title", e.target.value)
                      }
                    />
                  </div>
                  <Chip
                    size="sm"
                    variant="bordered"
                    className="text-sm ml-4 shrink-0"
                  >
                    {lesson.duration}
                  </Chip>
                </div>
                <div className="text-sm text-gray-500">
                  Rationale & Assessment Breakdown
                </div>
              </CardHeader>

              <CardBody className="p-4 pt-0">
                <div className="p-2 grid grid-cols-1 lg:grid-cols-2 gap-4 border-t pt-4">
                  {LESSON_CONTENT_BLOCKS.map((blockKey: BlockKey) => {
                    const block = lesson[blockKey as keyof Lesson];

                    if (
                      typeof block === "object" &&
                      block !== null &&
                      "rationale" in block
                    ) {
                      const typedBlock = block as LessonContentBlock;
                      const title =
                        blockKey.charAt(0).toUpperCase() + blockKey.slice(1);
                      const Icon = LessonIcons[blockKey] || BookOpen;

                      return (
                        <EditableSectionBlock
                          key={blockKey}
                          block={typedBlock}
                          title={title}
                          Icon={Icon}
                          lessonIndex={index}
                          blockKey={blockKey}
                          handleBlockChange={handleBlockChange}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* Save / Cancel Button Bar */}
      <div className="flex justify-end gap-3 mt-8 p-4 bg-white rounded-xl shadow-lg sticky bottom-4 z-10">
        <Button
          color="danger"
          variant="light"
          onPress={cancelChanges}
          isDisabled={!isModified || isSaving}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          onPress={saveChanges}
          isDisabled={!isModified || isSaving}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
