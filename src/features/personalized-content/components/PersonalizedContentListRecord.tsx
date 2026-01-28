"use client";

import { useCallback } from "react";
import { LearnerProfileChip } from "@/lib/learner-profiles";
import { Button } from "@heroui/react";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { PersonalizedContent } from "@/features/personalized-content";

interface PersonalizedContentListRecordProps {
  record: PersonalizedContent;
}

export default function PersonalizedContentListRecord({
  record,
}: PersonalizedContentListRecordProps) {
  const router = useRouter();

  const gotoView = useCallback(
    (id: string) => {
      router.push(`/personalized-content/${id}`);
    },
    [router],
  );

  return (
    <>
      {/* Content: Use a plain div for the grid layout */}
      <div className="w-full">
        <div>
          <h2
            data-testid="personalized-content-list-record-title"
            className="text-lg font-semibold"
          >
            {record.title}
          </h2>
          <p
            data-testid="personalized-content-list-record-description"
            className="text-sm text-gray-600 mb-4 text-justify line-clamp-2"
          >
            {record.description}
          </p>
          <div className="flex justify-between items-center">
            <LearnerProfileChip
              data-testid="personalized-content-list-learner-chip"
              learnerProfile={record.learnerProfile}
              color="default"
              variant="faded"
            />
            <Button
              data-testid="personalized-content-list-button-view"
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
