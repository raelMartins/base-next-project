import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Center, Spinner } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { verifyRealtorToken } from "@/api/auth";
import { setSession } from "@/api/utils/sessionmanagers";
import useGetSession from "@/utils/hooks/useGetSession";
import { REALTOR_SESSION_KEY, TOKEN_SESSION_KEY } from "@/constants";

export const AuthVerificationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const magic = searchParams.get("magic");

  const { sessionData: LoggedInAgent } = useGetSession(REALTOR_SESSION_KEY);

  const { mutate } = useMutation({
    mutationFn: (magic: { token: string }) => verifyRealtorToken(magic),
    onSuccess: (res: any) => {
      if (res?.status !== 200) {
        router.push("/");
        location.assign("/");
      } else {
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

        const { owner, store_name } = res?.data?.store;

        const {
          email,
          first_name,
          last_name,
          avatar,
          initial_status,
          sign_up_time,
          id,
          agent_id,
        } = res?.data?.user;

        const userDetails = {
          email,
          first_name,
          last_name,
          avatar,
          initial_status,
          sign_up_time,
          id,
          agent_id,
          storeName: store_name,
          companyName: owner?.company_name,
        };

        setSession(res?.data?.user_tokens?.token, TOKEN_SESSION_KEY, expires);
        setSession(userDetails, REALTOR_SESSION_KEY, expires);
        location.assign("/offerings");
      }
    },
    onError: (err) => {
      alert("Something went wrong");
      router.push("/");
      location.assign("/");
    },
  });

  useEffect(() => {
    if (LoggedInAgent) {
      location.assign("/offerings");
    } else if (magic) {
      mutate({ token: magic });
    } else {
      router.push("/");
    }
  }, [magic]);

  return (
    <Center h="100vh" w="100%">
      <Spinner size={"xl"} />
    </Center>
  );
};
