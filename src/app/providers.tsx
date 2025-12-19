"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryProvider } from "@/providers/QueryProvider";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <QueryProvider>
      <HeroUIProvider navigate={router.push}>
        <ToastProvider placement="bottom-left" />
        {children}
      </HeroUIProvider>
    </QueryProvider>
  );
}
