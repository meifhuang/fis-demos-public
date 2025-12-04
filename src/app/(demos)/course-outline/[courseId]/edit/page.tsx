"use client";

import React from "react";
import { Clock, Users, LayoutList } from "lucide-react";
import LearnerProfileChip from "@/components/learner-profile/LearnerProfileChip";
import LessonSection from "../_components/LessonSection";
import InlineEditableField from "@/components/editable-fields/InlineEditableField";
import { Button, Chip } from "@heroui/react";
import { useCourseOutlineData } from "../_hooks/useCourseOutlineData";

export default function CourseOutlineDetailPage() {
  const {
    course,
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
  } = useCourseOutlineData();

  if (fetchError) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center text-red-600">
        <p>Error loading course: {fetchError.message}</p>
      </div>
    );
  }

  if (status === "pending" || !course) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center text-gray-600">
        <p>Loading course details...</p>
      </div>
    );
  }

  const isFetchingData = isCourseFetching && !isSaving;

  return (
    <div className="relative p-8 max-w-4xl mx-auto space-y-8 font-inter">
      {isFetchingData && (
        <div className="text-center text-sm text-indigo-500 mb-4">
          <p>Fetching latest course data...</p>
        </div>
      )}

      {/* Course Snapshot (Metadata Card) */}
      <div className="p-6 shadow-xl bg-white rounded-xl border-l-4 border-indigo-500">
        <h2 className="text-xl font-bold mb-3 text-indigo-700">
          Course Snapshot
        </h2>

        {/* Course Header & Controls */}
        <div className="flex justify-between items-start border-b pb-4 border-gray-200">
          <div className="w-full pr-4 space-y-1">
            {/* Editable Title */}
            <InlineEditableField
              value={course.title}
              onChange={(v: string) => handleTopLevelChange("title", v)}
              label="Course Title"
              type="input"
              displayComponent={(value) => (
                <h2 className="text-4xl font-extrabold text-gray-900">
                  {value}
                </h2>
              )}
            />

            {/* Editable Description */}
            <InlineEditableField
              value={course.description}
              onChange={(v: string) => handleTopLevelChange("description", v)}
              label="Course Description"
              type="textarea"
              multiline={true}
              displayComponent={(value) => (
                <p className="text-lg text-gray-600 italic">{value}</p>
              )}
            />
          </div>
        </div>

        {/* Calculated Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {/* Number of Lessons */}
          <div className="flex items-center gap-3">
            <LayoutList size={20} className="text-indigo-500" />
            <div className="flex items-center gap-2">
              <Chip className="bg-gray-200">
                {course.lessons.length} Lessons
              </Chip>
            </div>
          </div>

          {/* Total Duration (Calculated View Only) */}
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-indigo-500" />
            <Chip className="bg-gray-200">Total Duration: {totalDuration}</Chip>
          </div>

          {/* Learner Profile */}
          <div className="flex items-center gap-3">
            <Users size={20} className="text-indigo-500" />
            <LearnerProfileChip
              learnerProfileId={course.learnerProfileId}
              className="shadow-none"
            />
          </div>
        </div>
      </div>

      {/* Detailed Lesson Breakdown */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Detailed Lesson Breakdown ({course.lessons.length})
      </h2>

      <LessonSection
        lessons={course.lessons}
        onLessonChange={handleLessonChange}
        onBlockChange={handleBlockChange}
      />

      {/* Save/Cancel Buttons */}
      <div className="flex gap-4 justify-end">
        <Button
          color="primary"
          onPress={saveChanges}
          isDisabled={!isModified || isSaving}
        >
          {isSaving
            ? "Saving..."
            : isModified
            ? "Save Changes"
            : isSuccess
            ? "Saved"
            : "Save Changes"}
        </Button>
        <Button
          color="danger"
          variant="light"
          onPress={cancelChanges}
          isDisabled={!isModified}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
