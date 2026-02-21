"use client";

import { useCallback } from "react";
import { LearnerProfileChip } from "@/lib/learner-profiles";
import { Button } from "@heroui/react";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Lesson } from "@/features/lessons";

interface LessonListRecordProps {
  record: Lesson;
}

export default function LessonListRecord({ record }: LessonListRecordProps) {
  const router = useRouter();

  const gotoView = useCallback(
    (id: string) => {
      router.push(`/lesson/${id}`);
    },
    [router],
  );

  return (
    <>
      <div className="w-full">
        <div>
          <h2
            data-testid="lesson-list-record-title"
            className="text-lg font-semibold"
          >
            {record.title}
          </h2>
          <p
            data-testid="lesson-list-record-content"
            className="text-sm text-gray-600 mb-4 text-justify"
          >
            {record.content}
          </p>
          <div className="flex justify-between items-center">
            <LearnerProfileChip
              data-testid="lesson-list-learner-chip"
              learnerProfile={record.learnerProfile}
              color="default"
              variant="faded"
            />
            <Button
              data-testid="lesson-list-button-view"
              color="primary"
              startContent={<Eye />}
              onPress={() => gotoView(record.id)}
            >
              View
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
