"use client";

import InlineEditableField from "@/components/editable-fields/InlineEditableField";
import { LessonContentBlock } from "@/types";

interface ContentBlockDisplayProps {
  block: LessonContentBlock;
  onBlockChange: (key: keyof LessonContentBlock, newValue: string) => void;
}

export default function ContentBlockDisplay({
  block,
  onBlockChange,
}: ContentBlockDisplayProps) {
  return (
    <div className="space-y-3 py-2 text-sm text-gray-700 ml-6">
      <div>
        <p className="font-semibold text-gray-800">Rationale:</p>
        <InlineEditableField
          value={block.rationale}
          onChange={(newValue) => onBlockChange("rationale", newValue)}
          label="Rationale"
          multiline={true}
          displayComponent={(value) => <p className="pl-2 italic">{value}</p>}
        />
      </div>
      <div>
        <p className="font-semibold text-gray-800">Assessment Format:</p>
        <InlineEditableField
          value={block.assessment_format}
          onChange={(newValue) => onBlockChange("assessment_format", newValue)}
          label="Assessment Format"
          multiline={true}
          displayComponent={(value) => (
            <p className="pl-2 font-mono text-xs bg-gray-50 p-1 rounded-md border border-gray-200">
              {value}
            </p>
          )}
        />
      </div>
    </div>
  );
}
