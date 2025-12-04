"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Edit2 } from "lucide-react";

interface InlineEditableFieldDisplayProps {
  value: string;
  displayComponent: (value: string) => React.ReactNode;
  startEdit: () => void;
}

export const InlineEditableFieldDisplay: React.FC<
  InlineEditableFieldDisplayProps
> = ({ value, displayComponent, startEdit }) => {
  return (
    <div className="group flex items-center w-full relative">
      <div className="grow relative pt-1 pb-1">
        {/* Render the custom display component provided by the parent */}
        <div
          className={`pr-8
            group-hover:outline-2 group-hover:outline-dashed group-hover:outline-primary-500 group-hover:outline-offset-1 group-hover:rounded-md`}
          onClick={startEdit}
        >
          {displayComponent(value)}
        </div>
      </div>

      {/* Edit Icon Button: Absolutely positioned, ALWAYS VISIBLE */}
      <Button
        isIconOnly
        size="sm"
        className="rounded-full bg-gray-100 absolute right-0 top-[50%] transform translate-y-[-50%]"
        onClick={startEdit}
        aria-label="Edit field"
      >
        <Edit2 size={16} className="text-gray-600" />
      </Button>
    </div>
  );
};
