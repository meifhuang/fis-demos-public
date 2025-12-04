"use client";

import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ className }: { className: string }) {
  const router = useRouter();

  return (
    <Button onPress={() => router.back()} className={className}>
      <ArrowLeft /> Back
    </Button>
  );
}
