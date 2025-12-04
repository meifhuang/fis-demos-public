"use client";

import React from "react";
import { Card, Chip, Divider } from "@heroui/react";
import { Lesson, LessonContentBlock } from "@/types";
import {
  BookOpen,
  Users,
  GraduationCap,
  FileText,
  LayoutList,
  ClipboardList,
} from "lucide-react";
import ContentBlockDisplay from "./ContentBlockDisplay";
import InlineEditableField from "@/components/editable-fields/InlineEditableField";

// Map content blocks to readable labels and icons
const CONTENT_MAP: Array<{
  key: keyof Lesson;
  label: string;
  icon: React.ReactNode;
}> = [
  {
    key: "introduction" as keyof Lesson,
    label: "Introduction",
    icon: <BookOpen size={16} />,
  },
  {
    key: "context" as keyof Lesson,
    label: "Contextualization",
    icon: <LayoutList size={16} />,
  },
  {
    key: "example" as keyof Lesson,
    label: "Demonstration/Example",
    icon: <FileText size={16} />,
  },
  {
    key: "activity" as keyof Lesson,
    label: "Hands-on Activity",
    icon: <GraduationCap size={16} />,
  },
  {
    key: "assessment" as keyof Lesson,
    label: "Formal Assessment",
    icon: <ClipboardList size={16} />,
  },
  {
    key: "reflection" as keyof Lesson,
    label: "Reflection/Review",
    icon: <Users size={16} />,
  },
];

interface LessonSectionProps {
  lessons: Lesson[];
  onLessonChange: (
    lessonIndex: number,
    field: "title" | "duration",
    value: string
  ) => void;
  onBlockChange: (
    lessonIndex: number,
    blockKey: keyof Lesson,
    contentKey: keyof LessonContentBlock,
    newValue: string
  ) => void;
}

export default function LessonSection({
  lessons,
  onLessonChange,
  onBlockChange,
}: LessonSectionProps) {
  return (
    <div className="space-y-6">
      {lessons.map((lesson, lessonIndex) => (
        <Card
          key={lessonIndex}
          className="p-6 bg-white shadow-lg border-l-8 border-indigo-200"
        >
          {/* LESSON HEADER (TITLE & DURATION) */}
          <div className="flex justify-between items-start border-b pb-3 mb-4">
            <div className="flex items-center gap-2 grow">
              <span className="font-bold text-indigo-600 text-xl min-w-[100px]">
                Lesson {lessonIndex + 1}
              </span>

              {/* Editable Lesson Title */}
              <InlineEditableField
                value={lesson.title}
                onChange={(v) => onLessonChange(lessonIndex, "title", v)}
                label="Lesson Title"
                type="input"
                multiline={false} // Lesson title is single-line
                displayComponent={(value) => (
                  // Custom display element for the title
                  <h3 className="font-bold text-xl text-gray-800">{value}</h3>
                )}
              />
            </div>

            <div className="flex items-center gap-2 min-w-fit ml-4">
              {/* Editable Lesson Duration */}
              <InlineEditableField
                value={lesson.duration}
                onChange={(v) => onLessonChange(lessonIndex, "duration", v)}
                label="Duration"
                type="input"
                multiline={false} // Duration is single-line
                displayComponent={(value) => (
                  <Chip size="sm" color="warning" variant="flat">
                    {value}
                  </Chip>
                )}
              />
            </div>
          </div>

          {/* Content Blocks (Always displayed) */}
          <div className="space-y-4 pt-2">
            {CONTENT_MAP.map(({ key, label, icon }, index) => {
              const block = lesson[key as keyof Lesson];

              if (block && typeof block === "object" && "rationale" in block) {
                return (
                  <div
                    key={key}
                    // className="p-4 border-l-4 border-gray-300 bg-gray-50/70"
                  >
                    <h4 className="flex items-center font-bold text-gray-700 mb-2">
                      {icon}
                      <span className="ml-2">{label}</span>
                    </h4>

                    <ContentBlockDisplay
                      block={block as LessonContentBlock}
                      onBlockChange={(contentKey, newValue) =>
                        onBlockChange(
                          lessonIndex,
                          key as keyof Lesson,
                          contentKey,
                          newValue
                        )
                      }
                    />
                    {index !== CONTENT_MAP.length - 1 && <Divider />}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}
