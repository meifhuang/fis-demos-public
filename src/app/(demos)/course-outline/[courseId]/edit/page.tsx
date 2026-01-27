"use client";

import { ChangeEvent, useEffect } from "react";
import { Clock, Users, LayoutList, BookOpen, CheckCircle } from "lucide-react";
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
import CourseOverviewSkeleton from "../_components/CourseOverviewSkeleton";
import LessonItemSkeleton from "../_components/LessonItemSkeleton";
import { LearnerProfileChip } from "@/lib/learner-profiles";
import { useEditCourseOutline } from "../_hooks/useEditCourseOutline";
import { useParams, useRouter } from "next/navigation";
import DemoNavigationPanel from "@/app/(demos)/_components/DemoNavigationPanel";

export default function CourseOutlineTeacherView() {
  const router = useRouter();
  const { courseId: id } = useParams<{ courseId: string }>();

  const {
    cancelChanges,
    courseOutline,
    error,
    mutationError,
    handleLessonOutlineChange,
    handleTopLevelChange,
    isFetching,
    isModified,
    isPending,
    isSuccess,
    saveChanges,
  } = useEditCourseOutline(id);

  const isEmpty = (value?: string) => !value || !value.trim();

  useEffect(() => {
    if (isSuccess && id) {
      addToast({
        title: <p className="text-xl text-bold">Success!</p>,
        description: "Course Outline Saved",
        color: "success",
        shouldShowTimeoutProgress: true,
      });
      router.push(`/course-outline/${id}`);
    }
  }, [isSuccess, id, router]);

  useEffect(() => {
    if (mutationError) {
      addToast({
        title: <p className="text-xl font-bold">Error: Invalid Input</p>,
        description: "Make sure all fields are filled out",
        color: "danger",
        shouldShowTimeoutProgress: true,
      });
    }
  }, [mutationError]);

  // --- Conditional Rendering ---

  // --- ERROR RENDER ---
  if (error) {
    return (
      <>
        <DemoNavigationPanel backRoute={`/course-outline`} />
        <div className="p-8 max-w-5xl mx-auto text-center text-red-600">
          <p>Error loading course: {error.message}</p>
        </div>
      </>
    );
  }

  // --- MAIN RENDER ---
  const isFetchingData: boolean = isFetching && !isPending;

  const backRoute = courseOutline
    ? `/course-outline/${courseOutline?.id}`
    : "/course-outline";

  return (
    <>
      <DemoNavigationPanel backRoute={backRoute} />
      <div className="max-w-5xl mx-auto font-inter min-h-screen w-full">
        {isFetchingData && !courseOutline?.title ? (
          <CourseOverviewSkeleton />
        ) : (
          <Card className="shadow-xl border-t-4 border-indigo-600 mb-8 rounded-xl">
            <CardHeader className="flex flex-col items-start w-full">
              <Input
                label="Course Title"
                labelPlacement="outside"
                fullWidth
                size="lg"
                className="text-3xl font-extrabold"
                classNames={{
                  input: "text-3xl font-extrabold text-gray-900 leading-tight",
                }}
                value={courseOutline?.title ?? ""}
                isInvalid={isEmpty(courseOutline?.title)}
                errorMessage={
                  isEmpty(courseOutline?.title)
                    ? "This field is required"
                    : undefined
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleTopLevelChange("title", e.target.value)
                }
              />
            </CardHeader>
            <CardBody className="pt-0">
              <Textarea
                label="Course Description"
                labelPlacement="outside"
                fullWidth
                rows={3}
                className="w-full text-lg text-gray-600"
                value={courseOutline?.description ?? ""}
                isInvalid={isEmpty(courseOutline?.description)}
                errorMessage={
                  isEmpty(courseOutline?.description)
                    ? "This field is required"
                    : undefined
                }
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

        {isFetchingData ? (
          <LessonItemSkeleton />
        ) : (
          <div className="space-y-6">
            {courseOutline?.lessonOutlines?.map((lessonOutline, index) => {
              const titleInvalid = isEmpty(lessonOutline.title);
              const descriptionInvalid = isEmpty(lessonOutline.description);
              const outcomeInvalid = isEmpty(lessonOutline.outcome);

              return (
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
                          value={lessonOutline.title}
                          isInvalid={titleInvalid}
                          errorMessage={
                            titleInvalid ? "This field is required" : undefined
                          }
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleLessonOutlineChange(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <Chip
                        size="sm"
                        variant="bordered"
                        className="text-sm ml-4 shrink-0"
                      >
                        {lessonOutline.minutes}{" "}
                        {lessonOutline.minutes === 1 ? "minute" : "minutes"}
                      </Chip>
                    </div>
                  </CardHeader>

                  <CardBody className="p-4 pt-0">
                    <div className="p-2 grid grid-cols-1 lg:grid-cols-2 gap-4 border-t pt-4">
                      <Card className="shadow-sm h-full">
                        <CardHeader className="flex flex-col items-start pb-2">
                          <h4 className="flex items-center text-base font-semibold text-gray-800">
                            <BookOpen className="w-5 h-5 text-indigo-500 mr-2" />
                            Description
                          </h4>
                        </CardHeader>

                        <CardBody className="space-y-3 pt-2 border-t border-gray-100">
                          <div>
                            <Textarea
                              label="Description"
                              labelPlacement="outside"
                              rows={3}
                              fullWidth
                              value={lessonOutline.description}
                              isInvalid={descriptionInvalid}
                              errorMessage={
                                descriptionInvalid
                                  ? "This field is required"
                                  : undefined
                              }
                              onChange={(e: ChangeEvent<HTMLElement>) =>
                                handleLessonOutlineChange(
                                  index,
                                  "description",
                                  (e.target as HTMLTextAreaElement).value
                                )
                              }
                            />
                          </div>
                        </CardBody>
                      </Card>

                      <Card className="shadow-sm h-full">
                        <CardHeader className="flex flex-col items-start pb-2">
                          <h4 className="flex items-center text-base font-semibold text-gray-800">
                            <CheckCircle className="w-5 h-5 text-indigo-500 mr-2" />
                            Outcome
                          </h4>
                        </CardHeader>

                        <CardBody className="space-y-3 pt-2 border-t border-gray-100">
                          <div>
                            <Textarea
                              label="Outcome"
                              labelPlacement="outside"
                              rows={3}
                              fullWidth
                              value={lessonOutline.outcome}
                              isInvalid={outcomeInvalid}
                              errorMessage={
                                outcomeInvalid
                                  ? "This field is required"
                                  : undefined
                              }
                              onChange={(e: ChangeEvent<HTMLElement>) =>
                                handleLessonOutlineChange(
                                  index,
                                  "outcome",
                                  (e.target as HTMLTextAreaElement).value
                                )
                              }
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}

        {/* Save / Cancel Button Bar */}
        <div className="flex justify-end gap-3 mt-8 p-4 bg-white rounded-xl shadow-lg sticky bottom-4 z-10">
          <Button
            color="danger"
            variant="light"
            onPress={cancelChanges}
            isDisabled={!isModified || isPending}
          >
            Cancel
          </Button>
          <Button color="primary" onPress={saveChanges} isDisabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </>
  );
}
