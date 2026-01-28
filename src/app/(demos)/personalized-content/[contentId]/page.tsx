"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Switch,
  Tooltip,
  addToast,
} from "@heroui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LearnerProfileChip } from "@/lib/learner-profiles";
import {
  useDeletePersonalizedContent,
  usePersonalizedContent,
} from "@/features/personalized-content";
import { useParams, useRouter } from "next/navigation";
import DemoNavigationPanel from "@/app/(demos)/_components/DemoNavigationPanel";
import { useState } from "react";
import PersonalizedContentSkeleton from "./_components/PersonalizedContentSkeleton";
import { BookOpen, FileText, Users } from "lucide-react";

export default function PersonalizedContentTeacherView() {
  const router = useRouter();
  const { contentId: id } = useParams<{ contentId: string }>();
  const {
    data: personalizedContent,
    isLoading,
    error,
  } = usePersonalizedContent(id);

  // 1. Integrate the deletion hook
  const { mutate: deletePersonalizedContent, isPending: isDeleting } =
    useDeletePersonalizedContent();

  const sourceMaterial = personalizedContent?.sourceMaterial;

  const [showSourceMaterial, setShowSourceMaterial] = useState(false);

  const hasSourceMaterial = sourceMaterial !== null;

  const handleDelete = async () => {
    // Check if mutation is running
    if (isDeleting || !personalizedContent) return;

    // Call the mutation hook with the record ID
    deletePersonalizedContent(personalizedContent, {
      onSuccess: (deleted) => {
        // Show success notification
        addToast({
          title: <p className="text-xl font-bold">Deleted!</p>,
          description: (
            <p>
              <span className="font-bold">{deleted.title}</span> has been
              removed.
            </p>
          ),
          color: "success",
          shouldShowTimeoutProgress: true,
        });
        router.push("/personalized-content");
      },
      onError: (error) => {
        addToast({
          title: <p className="text-xl font-bold">Error</p>,
          description: `Failed to delete personalized content: ${error.message}`,
          color: "danger",
          shouldShowTimeoutProgress: true,
        });
      },
    });
  };

  if (error) {
    return (
      <>
        <DemoNavigationPanel backRoute="/personalized-content" />
        <div className="p-8 max-w-5xl mx-auto text-center text-red-600">
          <p>Error loading content: {error.message}</p>
        </div>
      </>
    );
  }

  const navProps = {
    backRoute: "/personalized-content",
    editRoute: personalizedContent
      ? `/personalized-content/${personalizedContent.id}/edit`
      : undefined,
    delete: personalizedContent
      ? {
          onDelete: handleDelete,
          recordTitle: personalizedContent.title,
          recordType: "Personalized Content",
        }
      : undefined,
  };

  return (
    <>
      <DemoNavigationPanel {...navProps} />
      <div className="max-w-5xl mx-auto font-inter min-h-screen w-full">
        {isLoading ? (
          <PersonalizedContentSkeleton />
        ) : (
          <>
            <Card className="shadow-xl border-t-4 border-indigo-600 mb-8 rounded-xl">
              <CardHeader>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
                  {personalizedContent?.title}
                </h1>
              </CardHeader>
              <CardBody className="pt-0">
                <p className="text-lg text-gray-600 border-b pb-4 mb-4">
                  {personalizedContent?.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <LearnerProfileChip
                    learnerProfile={personalizedContent?.learnerProfile ?? null}
                    size="md"
                    variant="faded"
                    color="default"
                    startContent={<Users size={18} />}
                  >
                    Target Profile:{" "}
                    <span className="font-semibold ml-1">
                      {personalizedContent?.learnerProfile?.label}
                    </span>
                  </LearnerProfileChip>
                </div>
              </CardBody>
            </Card>
          </>
        )}

        {/* Header + Toggle */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Personalized Content View
          </h2>

          <div className="flex flex-col items-end gap-1">
            <Tooltip
              content={
                hasSourceMaterial
                  ? "Toggle source lesson view"
                  : "No source lesson linked to this content"
              }
            >
              <Switch
                size="md"
                isSelected={showSourceMaterial}
                onValueChange={setShowSourceMaterial}
                isDisabled={!hasSourceMaterial}
              >
                View Source Material
              </Switch>
            </Tooltip>

            {!hasSourceMaterial && (
              <span className="text-xs text-gray-500">
                No source material was found for this content.
              </span>
            )}
          </div>
        </div>

        {/* Content Layout */}
        <div
          className={`grid gap-6 ${
            showSourceMaterial ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {/* Personalized Content */}
          <Card className="shadow-lg rounded-xl">
            <CardHeader className="border-b">
              <div className="flex items-center gap-2 text-gray-700">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <h3 className="text-xl font-semibold">
                  What the Student Will See
                </h3>
              </div>
            </CardHeader>

            <CardBody className="bg-gray-50">
              {personalizedContent?.content ? (
                <div className="prose max-w-none opacity-90">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {personalizedContent.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="italic text-gray-400">
                  No personalized content has been added yet.
                </p>
              )}
            </CardBody>
          </Card>

          {/* Source Material */}
          {showSourceMaterial && (
            <Card className="shadow-lg rounded-xl">
              <CardHeader className="border-b">
                <div className="flex items-center gap-2 text-gray-700">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-xl font-semibold">
                    Source Lesson Material
                  </h3>
                </div>
              </CardHeader>

              <CardBody className="bg-gray-50">
                {sourceMaterial?.markdown ? (
                  <div className="prose max-w-none opacity-90">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {sourceMaterial.markdown}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="italic text-gray-400">
                    No source material found.
                  </p>
                )}
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
