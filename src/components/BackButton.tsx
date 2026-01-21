"use client";

import { Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  route: string;
  className?: string;
}

export default function BackButton({ route, className }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button onPress={() => router.push(route)} className={className}>
      <ArrowLeft /> Back
    </Button>
  );
}
