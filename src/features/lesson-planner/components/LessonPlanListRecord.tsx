"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Button } from "@heroui/react";
import { Eye } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  LearnerProfileChip,
  LearnerProfile,
  LearnerProfileRow,
} from "@/lib/learner-profiles";

import { LessonPlanRecord } from "@/types/demos/lesson-plan";

interface LessonPlanListProps {
  record: LessonPlanRecord;
}

/**
 * Converts a plain learner_profile object from LessonPlanRecord to a LearnerProfile instance.
 * Provides default values for required database fields that aren't present in the plain object.
 */
function toLearnerProfile(
  profile: LessonPlanRecord["creation_meta"]["learner_profile"]
): LearnerProfile {
  const profileRow: LearnerProfileRow = {
    id: profile.id,
    label: profile.label,
    age: profile.age,
    reading_level: profile.reading_level,
    experience: profile.experience ?? null,
    interests: profile.interests ?? null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  return new LearnerProfile(profileRow);
}

export function LessonPlanListRecord({ record }: LessonPlanListProps) {
  const router = useRouter();

  const gotoView = useCallback(
    (id: string) => {
      router.push(`/lesson-planner/${id}`);
    },
    [router]
  );

  return (
    <>
      <div className="w-full">
        <div className="col-span-3">
          <h2
            data-testid="lesson-plan-list-record-title"
            className="text-2xl font-semibold"
          >
            {record.creation_meta.source_material.title}
          </h2>
          <div
            data-testid="lesson-plan-list-record-description"
            className="text-sm text-gray-600 mb-4 text-justify line-clamp-2"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {record.introduction}
            </ReactMarkdown>
          </div>

          <div className="flex justify-between items-center">
            <LearnerProfileChip
              data-testid="lesson-plan-list-learner-chip"
              learnerProfile={toLearnerProfile(
                record.creation_meta.learner_profile
              )}
              color="default"
              variant="faded"
            />
            <Button
              data-testid="lesson-plan-list-button-view"
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
