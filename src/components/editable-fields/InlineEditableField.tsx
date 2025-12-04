"use client";

import React, { useState, useCallback, useEffect } from "react";
import { InlineEditableFieldDisplay } from "./InlineEditableFieldDisplay";
import { InlineEditableFieldEdit } from "./InlineEditableFieldEdit";

export interface InlineEditableFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  onEditStart?: () => void;
  label?: string;
  type?: "input" | "number" | "textarea";
  multiline?: boolean;
  onSave?: (newValue: string) => void;
  displayComponent: (value: string) => React.ReactNode;
}

export default function InlineEditableField({
  value,
  onChange,
  onEditStart,
  onSave,
  type = "input",
  multiline = false,
  displayComponent,
}: InlineEditableFieldProps) {
  const [isLocalEditing, setIsLocalEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  // Sync external value when component initially mounts or saves
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSave = useCallback(() => {
    onChange(localValue);
    if (onSave) {
      onSave(localValue);
    }
    setIsLocalEditing(false);
  }, [localValue, onChange, onSave]);

  const handleCancel = useCallback(() => {
    setLocalValue(value);
    setIsLocalEditing(false);
  }, [value]);

  const startEdit = () => {
    setIsLocalEditing(true);
    if (onEditStart) {
      onEditStart();
    }
  };

  // Render EDITING mode
  if (isLocalEditing) {
    return (
      <InlineEditableFieldEdit
        type={type}
        multiline={multiline}
        localValue={localValue}
        setLocalValue={setLocalValue}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    );
  }

  // Render DISPLAY mode
  return (
    <InlineEditableFieldDisplay
      value={value}
      displayComponent={displayComponent}
      startEdit={startEdit}
    />
  );
}
