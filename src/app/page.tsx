'use client';

import { AuthVerificationPage } from '@/components/auth/AuthVerificationPage';
import { BaseLogin } from '@/components/auth/BaseLogin';
import { Box } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import useGetSession from '@/utils/hooks/useGetSession';
import { REALTOR_SESSION_KEY, TOKEN_SESSION_KEY } from '@/constants';

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const magic = searchParams.get('magic');
  const { sessionData: token } = useGetSession(TOKEN_SESSION_KEY);
  const { sessionData: realtor } = useGetSession(REALTOR_SESSION_KEY);

  useEffect(() => {
    if (token && realtor && !magic) {
      router.replace('/offerings');
    }
  }, [token, realtor, router, magic]);

  if (magic) {
    return <AuthVerificationPage />;
  }

  if (token && realtor) {
    return null;
  }

  return (
    <Box minH="100vh" bg="#fafafa" px={{ base: 4, md: 6 }} display="flex" alignItems="center" justifyContent="center">
      <BaseLogin />
    </Box>
  );
}
