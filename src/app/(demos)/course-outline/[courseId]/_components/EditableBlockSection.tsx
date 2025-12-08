import React, { ChangeEvent } from "react";
import { Card, CardHeader, CardBody, Textarea } from "@heroui/react";
import { Lightbulb, CheckCircle, LucideIcon } from "lucide-react";
import { Lesson, LessonContentBlock } from "@/types";

interface EditableSectionBlockProps {
  block: LessonContentBlock;
  title: string;
  Icon: LucideIcon;
  lessonIndex: number;
  blockKey: keyof Lesson; // Key name for the lesson section (e.g., 'rationale')
  handleBlockChange: (
    lessonIndex: number,
    blockKey: keyof Lesson,
    contentKey: keyof LessonContentBlock,
    newValue: string
  ) => void;
}

const EditableSectionBlock: React.FC<EditableSectionBlockProps> = ({
  block,
  title,
  Icon,
  lessonIndex,
  blockKey,
  handleBlockChange,
}) => {
  // Convert blockKey to the correct generic type for the handler
  const typedBlockKey = blockKey as
    | "introduction"
    | "context"
    | "example"
    | "activity"
    | "assessment"
    | "reflection";

  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="flex flex-col items-start pb-2">
        <h4 className="flex items-center text-base font-semibold text-gray-800">
          <Icon className="w-5 h-5 text-indigo-500 mr-2" />
          {title}
        </h4>
      </CardHeader>

      <CardBody className="space-y-3 pt-2 border-t border-gray-100">
        {/* Editable Rationale Section - HeroUI Textarea */}
        <div>
          <Textarea
            label="Rationale"
            labelPlacement="outside"
            rows={3}
            fullWidth
            startContent={<Lightbulb className="w-4 h-4 text-indigo-500" />}
            value={block.rationale}
            onChange={(e: ChangeEvent<HTMLElement>) =>
              handleBlockChange(
                lessonIndex,
                typedBlockKey,
                "rationale",
                (e.target as HTMLTextAreaElement).value
              )
            }
          />
        </div>

        {/* Editable Assessment Section - HeroUI Textarea */}
        <div>
          <Textarea
            label="Assessment"
            labelPlacement="outside"
            rows={2}
            fullWidth
            startContent={<CheckCircle className="w-4 h-4 text-green-500" />}
            value={block.assessment_format}
            onChange={(e: ChangeEvent<HTMLElement>) =>
              handleBlockChange(
                lessonIndex,
                typedBlockKey,
                "assessment_format",
                (e.target as HTMLTextAreaElement).value
              )
            }
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default EditableSectionBlock;
