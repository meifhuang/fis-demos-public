"use client";

import { useRouter } from "next/navigation";
import { Button, Chip } from "@heroui/react";
import { Clock, Eye, LayoutList } from "lucide-react";

import { LearnerProfileChip } from "@/lib/learner-profiles";
import { CourseOutline } from "../_models";

// Simple helper for pluralizing text
const formatUnit = (count: number, unit: string) =>
  `${count} ${unit}${count === 1 ? "" : "s"}`;

interface CourseOutlineListRecordProps {
  record: CourseOutline;
}

export default function CourseOutlineListRecord({
  record,
}: CourseOutlineListRecordProps) {
  const router = useRouter();

  const handleView = () => router.push(`/course-outline/${record.id}`);

  return (
    <div className="">
      <h2
        data-testid="course-outline-list-record-title"
        className="text-2xl font-semibold"
      >
        {record.title}
      </h2>

      <p
        data-testid="course-outline-list-record-description"
        className="mb-4 text-sm text-gray-600 text-justify line-clamp-3"
      >
        {record.description}
      </p>

      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <LearnerProfileChip
            data-testid="course-outline-list-learner-chip"
            learnerProfile={record.learnerProfile}
            color="default"
            variant="faded"
          />
          <Chip
            data-testid="course-outline-list-time-per-lesson"
            variant="faded"
            color="default"
            startContent={<Clock size={18} />}
          >
            {formatUnit(record.totalMinutes, "minute")}
          </Chip>
          <Chip
            data-testid="course-outline-list-total-lessons"
            variant="faded"
            color="default"
            startContent={<LayoutList size={18} />}
          >
            {formatUnit(record.lessonOutlineCount, "lesson")}
          </Chip>
        </div>
        <div className="flex gap-2 items-center justify-self-end">
          <Button
            data-testid="course-outline-list-button-view"
            color="primary"
            startContent={<Eye />}
            onPress={handleView}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  );
}
