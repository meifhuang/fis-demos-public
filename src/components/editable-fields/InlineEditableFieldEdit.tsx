"use client";

import React from "react";
import { Textarea, Input, Button } from "@heroui/react";
import { Save, X } from "lucide-react";
import { InlineEditableFieldProps } from "./InlineEditableField";

interface InlineEditableFieldEditProps
  extends Pick<InlineEditableFieldProps, "type" | "multiline" | "label"> {
  localValue: string;
  setLocalValue: (value: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

export const InlineEditableFieldEdit: React.FC<
  InlineEditableFieldEditProps
> = ({
  type = "input",
  multiline = false,
  localValue,
  setLocalValue,
  handleSave,
  handleCancel,
}) => {
  const CommonProps = {
    value: localValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setLocalValue(e.target.value),
    labelPlacement: "outside" as const,
    fullWidth: true,
    label: "",
    onKeyDown: (
      e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (!multiline && e.key === "Enter") {
        e.preventDefault();
        handleSave();
      }
    },
  };

  const InputComponent = multiline ? (
    <Textarea {...CommonProps} rows={3} />
  ) : (
    <Input {...CommonProps} type={type === "number" ? "number" : "text"} />
  );

  return (
    <div className="flex items-start gap-2 w-full">
      <div className="grow">{InputComponent}</div>

      {/* Save/Cancel Buttons */}
      <div className="flex gap-1 mt-2 min-w-fit">
        <Button
          isIconOnly
          size="sm"
          className="rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={handleSave}
          aria-label="Save changes"
        >
          <Save size={16} className="text-green-600" />
        </Button>
        <Button
          isIconOnly
          size="sm"
          className="rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={handleCancel}
          aria-label="Cancel changes"
        >
          <X size={16} className="text-red-600" />
        </Button>
      </div>
    </div>
  );
};
