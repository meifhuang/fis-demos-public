"use client";

import {
  Clock,
  Users,
  LayoutList,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from "lucide-react";
import {
  Chip,
  Card,
  CardHeader,
  CardBody,
  Accordion,
  AccordionItem,
  addToast,
} from "@heroui/react";
import CourseOverviewSkeleton from "./_components/CourseOverviewSkeleton";
import LessonItemSkeleton from "./_components/LessonItemSkeleton";
import { LearnerProfileChip } from "@/lib/learner-profiles";
import { useCourseOutline, useDeleteCourseOutline } from "../_store";
import { useParams, useRouter } from "next/navigation";
import { CourseOutline } from "../_models";
import DemoNavigationPanel from "../../_components/DemoNavigationPanel";

export default function CourseOutlineTeacherView() {
  const router = useRouter();
  const { courseId: id } = useParams<{ courseId: string }>();
  const {
    data: courseOutline,
    isFetching,
    isLoading,
    error,
  } = useCourseOutline(id);
  const { mutateAsync: deleteCourseOutline, isPending: isDeleting } =
    useDeleteCourseOutline();

  const handleDelete = async () => {
    if (isDeleting || !courseOutline) return;

    return await deleteCourseOutline(courseOutline, {
      onSuccess: (deleted: CourseOutline) => {
        addToast({
          title: <span className="text-xl font-bold">Deleted!</span>,
          description: (
            <p>
              <span className="font-bold">{deleted.title}</span> has been
              removed.
            </p>
          ),
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        router.push(`/course-outline`);
      },
      onError: (error) => {
        addToast({
          title: <span className="text-xl font-bold">Error</span>,
          description: `Failed to delete course: ${error.message}`,
          color: "danger",
          shouldShowTimeoutProgress: true,
        });
      },
    });
  };

  if (error) {
    return (
      <>
        <DemoNavigationPanel backRoute="/course-outline" />
        <div className="p-8 max-w-5xl mx-auto text-center text-red-600">
          <p>Error loading course: {error.message}</p>
        </div>
      </>
    );
  }

  const navProps = {
    backRoute: "/course-outline",
    editRoute: courseOutline
      ? `/course-outline/${courseOutline.id}/edit`
      : undefined,
    delete: courseOutline
      ? {
          onDelete: handleDelete,
          recordTitle: courseOutline.title || "Unknown Course Outline",
          recordType: "Course Outline",
        }
      : undefined,
  };

  return (
    <>
      <div className="max-w-5xl mx-auto font-inter min-h-screen w-full">
        <DemoNavigationPanel {...navProps} />
        {isLoading ? (
          <CourseOverviewSkeleton />
        ) : (
          <Card className="shadow-xl border-t-4 border-indigo-600 mb-8 rounded-xl">
            <CardHeader>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                {courseOutline?.title}
              </h1>
            </CardHeader>
            <CardBody className="pt-0">
              <p className="text-lg text-gray-600 border-b pb-4 mb-4">
                {courseOutline?.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Chip
                  size="md"
                  variant="faded"
                  startContent={<LayoutList size={18} />}
                >
                  Total Lessons:{" "}
                  <span className="font-semibold ml-1">
                    {courseOutline?.lessonOutlineCount}
                  </span>
                </Chip>
                <Chip
                  size="md"
                  variant="faded"
                  startContent={<Clock size={18} />}
                >
                  Total Course Time:{" "}
                  <span className="font-semibold ml-1">
                    {courseOutline?.totalMinutesInWords}
                  </span>
                </Chip>
                <LearnerProfileChip
                  learnerProfile={courseOutline?.learnerProfile ?? null}
                  size="md"
                  variant="faded"
                  color="default"
                  startContent={<Users size={18} />}
                >
                  Target Profile:{" "}
                  <span className="font-semibold ml-1">
                    {courseOutline?.learnerProfile?.label}
                  </span>
                </LearnerProfileChip>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Detailed Lesson Breakdown */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Structural Lesson Analysis
        </h2>

        {isFetching ? (
          <LessonItemSkeleton />
        ) : (
          <Accordion
            selectionMode="multiple"
            className="space-y-4"
            variant="splitted"
            defaultExpandedKeys={["0"]}
          >
            {courseOutline
              ? courseOutline.lessonOutlines.map((lessonOutline, index) => (
                  <AccordionItem
                    key={index.toString()}
                    aria-label={lessonOutline.title}
                    title={
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xl font-bold text-gray-800">
                          {lessonOutline.title}
                        </span>
                        <Chip size="sm" variant="bordered" className="text-sm">
                          {lessonOutline.minutes}{" "}
                          {lessonOutline.minutes === 1 ? "minute" : "minutes"}
                        </Chip>
                      </div>
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
                      <Card className="shadow-sm transition duration-150 hover:shadow-md h-full">
                        <CardHeader className="flex flex-col items-start pb-2">
                          <h4 className="flex items-center text-base font-semibold text-gray-800">
                            <BookOpen className="w-5 h-5 text-indigo-500 mr-2" />
                            Description
                          </h4>
                        </CardHeader>

                        <CardBody className="space-y-3 pt-2 border-t border-gray-100">
                          <p className="text-gray-700 text-sm">
                            {lessonOutline.description}
                          </p>
                        </CardBody>
                      </Card>

                      <Card className="shadow-sm transition duration-150 hover:shadow-md h-full">
                        <CardHeader className="flex flex-col items-start pb-2">
                          <h4 className="flex items-center text-base font-semibold text-gray-800">
                            <CheckCircle className="w-5 h-5 text-indigo-500 mr-2" />
                            Outcome
                          </h4>
                        </CardHeader>

                        <CardBody className="space-y-3 pt-2 border-t border-gray-100">
                          <p className="text-gray-700 text-sm">
                            {lessonOutline.outcome}
                          </p>
                        </CardBody>
                      </Card>
                    </div>
                  </AccordionItem>
                ))
              : null}
          </Accordion>
        )}
      </div>
    </>
  );
}
