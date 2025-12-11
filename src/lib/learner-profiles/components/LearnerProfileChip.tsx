"use client";

import {
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@heroui/react";
import LearnerProfileCard from "./LearnerProfileCard";
import { CircleUserRound } from "lucide-react";
import { LearnerProfile } from "@/lib/learner-profiles"

interface LearnerProfileChipProps {
  learnerProfile: LearnerProfile | null;
  className?: string;
  isLoading?: boolean;
  "data-testid"?: string;
}

export default function LearnerProfileChip({
  learnerProfile,
  className,
  isLoading = false,
  "data-testid": dataTestID = "learner-profile-chip",
}: LearnerProfileChipProps) {
  if (isLoading) {
    return (
      <Chip
        data-testid={dataTestID}
        size="md"
        className={className}
        startContent={
          <Spinner
            size="sm"
            classNames={{
              circle2: "border-b-[#000]",
              circle1: "border-b-[#000]",
            }}
            className="px-2"
          />
        }
      >
        Loading
      </Chip>
    );
  }

  if (!learnerProfile) {
    return (
      <Chip data-testid={dataTestID} size="md" className={className}>
        Unknown Learner
      </Chip>
    );
  }

  return (
    // Popover is set to trigger on click and appears to the right of the chip
    <Popover placement="right" showArrow>
      <PopoverTrigger>
        <Chip
          size="md"
          color="primary"
          startContent={<CircleUserRound size={18} />}
          className={`cursor-pointer transition-transform hover:scale-[1.03] gap-2 px-2 ${className}`}
          classNames={{ content: "p-0" }}
          data-testid={dataTestID}
        >
          {learnerProfile.label}
        </Chip>
      </PopoverTrigger>
      <PopoverContent className="p-0 border-none">
        <LearnerProfileCard learnerProfile={learnerProfile} />
      </PopoverContent>
    </Popover>
  );
}
