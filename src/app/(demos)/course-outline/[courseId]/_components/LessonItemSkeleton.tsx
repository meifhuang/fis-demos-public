import { Card, Skeleton, Chip, CardBody, CardHeader } from "@heroui/react";
import { Lightbulb, CheckCircle } from "lucide-react";

/**
 * Renders a skeleton loading state for a single lesson item, mimicking
 * the Lesson Header and the internal Rationale/Assessment block structure.
 */

// Helper component to mock the Rationale/Assessment block
const SectionBlockSkeleton = () => {
  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="flex flex-col items-start pb-2">
        {/* Block Title Skeleton (e.g., "Introduction" or "Activity") */}
        <Skeleton className="w-1/3 rounded-md">
          <div className="h-5 bg-default-300 flex items-center">
            <span className="w-full"></span>
          </div>
        </Skeleton>
      </CardHeader>

      <CardBody className="space-y-3 pt-2 border-t border-gray-100">
        <div>
          <Chip
            size="sm"
            color="primary"
            variant="flat"
            startContent={<Lightbulb className="w-3 h-3" />}
            className="mb-1 opacity-50"
          >
            Rationale
          </Chip>
        </div>

        <div className="space-y-2">
          <Skeleton className="w-full rounded-full">
            <div className="h-3 bg-default-200" />
          </Skeleton>
          <Skeleton className="w-11/12 rounded-full">
            <div className="h-3 bg-default-300" />
          </Skeleton>
        </div>

        <div>
          <Chip
            size="sm"
            color="success"
            variant="flat"
            startContent={<CheckCircle className="w-3 h-3" />}
            className="mb-1 opacity-50"
          >
            Assessment
          </Chip>
        </div>

        {/* Content Lines */}
        <div className="space-y-2">
          <Skeleton className="w-full rounded-full">
            <div className="h-3 bg-default-200" />
          </Skeleton>
          <Skeleton className="w-11/12 rounded-full">
            <div className="h-3 bg-default-300" />
          </Skeleton>
        </div>
      </CardBody>
    </Card>
  );
};

export default function LessonItemSkeleton() {
  return (
    <Card className="shadow-lg overflow-hidden border-t-4 border-indigo-200 opacity-75">
      {/* 1. Lesson Header Mock (Title + Duration Chip) */}
      <CardHeader className="flex flex-col items-start w-full">
        <div className="flex items-center justify-between w-full pb-3">
          <div className="flex flex-col items-start w-full pr-4">
            {/* Title Skeleton */}
            <Skeleton className="w-2/3 h-6 rounded-lg mb-1">
              <div className="bg-default-200" />
            </Skeleton>
            <Skeleton className="w-1/2 h-3 rounded-full">
              <div className="bg-default-300" />
            </Skeleton>
          </div>
          {/* Duration Chip Skeleton */}
          <Skeleton className="w-16 h-6 rounded-full shrink-0">
            <div className="bg-default-200" />
          </Skeleton>
        </div>
      </CardHeader>

      {/* 2. Content Body Mock (Rationale/Assessment Blocks) */}
      <CardBody className="p-4 pt-0">
        <div className="p-2 grid grid-cols-1 lg:grid-cols-2 gap-4 border-t pt-4">
          {/* Mock 4 Section Blocks (Introduction Rationale/Assessment, Context Rationale/Assessment) */}
          <SectionBlockSkeleton />
          <SectionBlockSkeleton />
          <SectionBlockSkeleton />
          <SectionBlockSkeleton />
        </div>
      </CardBody>
    </Card>
  );
}
