"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useGetSession from "@/utils/hooks/useGetSession";
import { REALTOR_SESSION_KEY, TOKEN_SESSION_KEY } from "@/constants";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { sessionData: token, fetching: tokenFetching } =
    useGetSession(TOKEN_SESSION_KEY);
  const { sessionData: realtor, fetching: realtorFetching } =
    useGetSession(REALTOR_SESSION_KEY);

  const isSessionReady = !tokenFetching && !realtorFetching;

  useEffect(() => {
    if (isSessionReady && (!token || !realtor)) {
      router.replace("/");
    }
  }, [isSessionReady, token, realtor, router]);

  if (!isSessionReady) {
    return null;
  }

  if (!token || !realtor) {
    return null;
  }

  return <>{children}</>;
}
