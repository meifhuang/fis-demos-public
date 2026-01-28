import { Card, Skeleton, CardBody, CardHeader } from "@heroui/react";

/**
 * Renders a skeleton loading state for a single lesson item, mimicking
 * the Lesson Header and the internal details.
 */

export default function QuestionSkeleton() {
  return (
    <Card className="shadow-lg overflow-hidden border border-indigo-100 bg-white w-full">
      {/* Question Header Skeleton */}
      <CardHeader className="flex flex-col gap-3 bg-indigo-50/60 border-b border-indigo-100">
        <div className="w-full space-y-2">
          {/* Label */}
          <Skeleton className="h-4 w-24 rounded-md" />

          {/* Question input */}
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </CardHeader>

      {/* Answers Skeleton */}
      <CardBody className="p-6 space-y-6 bg-gray-50">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card className="flex flex-row border-gray-200 bg-white" key={index}>
            {/* Checkbox skeleton */}
            <CardHeader className="w-min flex items-center">
              <Skeleton className="h-5 w-5 rounded-md" />
            </CardHeader>

            {/* Inputs skeleton */}
            <CardBody className="w-full flex gap-1">
              <div className="w-full space-y-2">
                {/* Answer label */}
                <Skeleton className="h-3 w-16 rounded-md" />
                {/* Answer input */}
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>

              <div className="w-full space-y-2">
                {/* Feedback label */}
                <Skeleton className="h-3 w-20 rounded-md" />
                {/* Feedback input */}
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </CardBody>
          </Card>
        ))}
      </CardBody>
    </Card>
  );
}
