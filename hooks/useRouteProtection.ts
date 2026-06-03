"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useRouteProtection(checkAccess: () => boolean) {
  const router = useRouter();

  useEffect(() => {
    if (!checkAccess()) {
      router.replace("/");
    }
  }, [checkAccess, router]);
}
