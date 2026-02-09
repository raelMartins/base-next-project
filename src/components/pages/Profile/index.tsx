import { LayoutWrapper } from "@/layout/Wrapper";
import { Flex } from "@chakra-ui/react";
import ProfileSidebar from "@/components/profile/Sidebar";
import UserDetails from "@/components/profile/UserDetails";

export const ProfilePage = () => {
  return (
    <LayoutWrapper>
      <Flex
        flexDirection={{ md: "row", base: "column" }}
        flex="1"
        gap={{ md: "64px", base: "24px" }}
        px={{ md: "48px", base: "0" }}
      >
        <ProfileSidebar />
        <UserDetails />
      </Flex>
    </LayoutWrapper>
  );
};
