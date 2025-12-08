import { useState, useCallback, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { CourseOutlineDetail, Lesson, LessonContentBlock } from "@/types";
import { useCourseOutlineDetail, useUpdateCourseOutline } from "../../_store";

const isCourseModified = (
  courseA?: CourseOutlineDetail,
  courseB?: CourseOutlineDetail
): boolean => {
  if (!courseA || !courseB) return false;
  return JSON.stringify(courseA) !== JSON.stringify(courseB);
};

export const useCourseOutlineData = () => {
  const [course, setCourse] = useState<CourseOutlineDetail | undefined>();
  const [originalCourse, setOriginalCourse] = useState<
    CourseOutlineDetail | undefined
  >();

  const params = useParams();
  const courseId = typeof params.courseId === "string" ? params.courseId : "";

  const {
    data: fetchedCourse,
    isFetching: isCourseFetching,
    error: fetchError,
    status,
  } = useCourseOutlineDetail(courseId);

  const {
    mutate: updateCourse,
    isPending: isSaving,
    isSuccess,
  } = useUpdateCourseOutline();

  // State Synchronization: Initialize local state when external data arrives.
  useEffect(() => {
    if (fetchedCourse) {
      const courseData: CourseOutlineDetail = {
        ...fetchedCourse,
        lessons: fetchedCourse.lessons || [],
      };

      setCourse((prevCourse) => {
        if (prevCourse === undefined) {
          setOriginalCourse(courseData);
          return courseData;
        }

        if (fetchedCourse !== prevCourse) {
          return courseData;
        }

        return prevCourse;
      });
    }
  }, [fetchedCourse, setOriginalCourse]);

  // Memoized Values

  const isModified = useMemo(
    () => isCourseModified(course, originalCourse),
    [course, originalCourse]
  );

  const totalDuration = useMemo(() => {
    if (!course || !course.lessons) return "0 min";

    const totalMinutes = course.lessons.reduce(
      (acc, lesson) => acc + (parseInt(lesson.duration) || 0),
      0
    );
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  }, [course]);

  // Callbacks

  const handleTopLevelChange = useCallback(
    (name: keyof CourseOutlineDetail, value: string) => {
      setCourse((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          [name]: name === "numberOfLessons" ? parseInt(value) : value,
        };
      });
    },
    []
  );

  const handleLessonChange = useCallback(
    (lessonIndex: number, field: "title" | "duration", value: string) => {
      setCourse((prev) => {
        if (!prev) return prev;
        const newLessons = [...prev.lessons];
        newLessons[lessonIndex] = {
          ...newLessons[lessonIndex],
          [field]: value,
        };
        return { ...prev, lessons: newLessons };
      });
    },
    []
  );

  const handleBlockChange = useCallback(
    (
      lessonIndex: number,
      blockKey: keyof Lesson,
      contentKey: keyof LessonContentBlock,
      newValue: string
    ) => {
      setCourse((prev) => {
        if (!prev) return prev;
        const newLessons = [...prev.lessons];
        const newLesson = { ...newLessons[lessonIndex] };

        // Deeply update the nested content block
        (newLesson[blockKey] as LessonContentBlock) = {
          ...(newLesson[blockKey] as LessonContentBlock),
          [contentKey]: newValue,
        };

        newLessons[lessonIndex] = newLesson;
        return { ...prev, lessons: newLessons };
      });
    },
    []
  );

  const saveChanges = useCallback(() => {
    if (!course) return;

    updateCourse(course, {
      onSuccess: (updatedData) => {
        setOriginalCourse(updatedData);
        setCourse(updatedData);
      },
      onError: (err) => {
        console.error("Save failed:", err);
      },
    });
  }, [course, updateCourse]);

  const cancelChanges = useCallback(() => {
    if (originalCourse) {
      setCourse(originalCourse);
    }
  }, [originalCourse]);

  return {
    course,
    courseId,
    isModified,
    totalDuration,
    isSaving,
    isCourseFetching,
    fetchError,
    isSuccess,
    status,
    handleTopLevelChange,
    handleLessonChange,
    handleBlockChange,
    saveChanges,
    cancelChanges,
  };
};
