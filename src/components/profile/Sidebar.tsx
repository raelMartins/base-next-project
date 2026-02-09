import { formatDate } from "@/utils/helpers/datetime";
import {
  Avatar,
  Box,
  Center,
  HStack,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Badge1Icon,
  Badge2Icon,
  Badge3Icon,
  CrystalIcon,
  CurrencyEth,
  DiamondsFourIcon,
  TrophyIcon,
} from "../assets/Profile/icons";
import { shortenPrice } from "../map";
import { useProfileSettings } from "@/utils/hooks/useProfileSettings";
import { ProfileSidebarSkeleton } from "@/components/skeletons";

export default function ProfileSidebar() {
  const { user, isLoading } = useProfileSettings();

  if (isLoading) {
    return <ProfileSidebarSkeleton />;
  }

  const profileFirstName = user?.first_name ?? "";
  const profileLastName = user?.last_name ?? "";
  const profileRefNo = user?.agent_id ? `REF-${user.agent_id}` : "—";
  const profileEmailAddress = user?.email ?? "";
  const dateJoined = user?.sign_up_time ?? new Date().toISOString();
  const profileAvatar = user?.avatar ?? undefined;
  // Referrals not in current API response - use empty until endpoint provides them
  const referrals: string[][] = [];

  const basicInfo = [
    { title: "Email address", value: profileEmailAddress },
    { title: "Date Joined", value: formatDate(dateJoined) },
    { title: "Referrals", value: referrals },
  ];

  const userAchievements = [
    "Jan’26 Realtor of the month award",
    "Best Client Quality Award",
    "Highest Value Transactions Award",
    "Highest Client Conversion Award",
    "Best Client Management Award",
    "Platform Ambassador Award",
    "KYC Compliance Champion",
  ];

  return (
    <Box
      flex="1"
      maxWidth={{ md: "284px", base: "none" }}
      width={{ md: "auto", base: "none" }}
      pt={{ md: "56px", base: "34px" }}
      pb={{ md: "40px", base: "24px" }}
      display="flex"
      flexDirection="column"
      gap={{ md: "34px", base: "24px" }}
    >
      <VStack
        width="100%"
        align="flex-start"
        gap="40px"
        pr={{ md: "14px", base: "0" }}
      >
        <VStack
          width="100%"
          align={{ md: "flex-start", base: "center" }}
          gap="12px"
        >
          <Avatar
            boxSize="100px"
            minWidth="100px"
            src={profileAvatar}
            name={profileFirstName || profileLastName || undefined}
          />
          <VStack
            align={{ md: "flex-start", base: "center" }}
            textAlign={{ md: "left", base: "center" }}
            gap="8px"
          >
            <HStack align="flex-start" justify="flex-start" gap="10px">
              <Text
                fontSize="24px"
                fontWeight="600"
                lineHeight="24px"
                letterSpacing="-2%"
              >
                {`${profileFirstName ?? ""} ${profileLastName ?? ""}`.trim()}
              </Text>
              <Center boxSize="24px" minWidth="24px">
                <CrystalIcon width="24px" height="24px" color="#3737D1" />
              </Center>
            </HStack>
            <Text
              fontSize="13.5px"
              fontWeight="500"
              lineHeight="20px"
              color="#71717A"
            >
              {profileRefNo}
            </Text>
          </VStack>
        </VStack>
        <List
          display="grid"
          gridTemplateColumns={{ md: "1fr", base: "repeat(2, 1fr)" }}
          flexDirection="column"
          gap={{ md: "16px", base: "24px" }}
          px={{ md: "0", base: "24px" }}
        >
          {basicInfo.map(({ title, value }) =>
            value.length ? (
              <ListItem
                key={title}
                display="flex"
                flexDirection="column"
                gap="4px"
              >
                <Text
                  fontSize={{ md: "13.5px", base: "13px" }}
                  fontWeight="500"
                  lineHeight="20px"
                  color="#71717A"
                >
                  {title}
                </Text>
                {Array.isArray(value) ? (
                  <HStack align="center" justify="flex-start" gap="0" mt="2px">
                    {value.slice(0, 3).map(([item], index) => (
                      <Avatar
                        key={index}
                        boxSize="32px"
                        minWidth="32px"
                        mr="-12px"
                        fontSize="12px"
                        fontWeight="500"
                        name={item}
                        getInitials={
                          value.length > 3 && index === 2
                            ? () => `+${shortenPrice(value.length - 2)}`
                            : undefined
                        }
                        bgColor={
                          index === 0
                            ? "#FFEDD5"
                            : index === 1
                              ? "#DADAFF"
                              : "#DCFCE7"
                        }
                        textColor={
                          index === 0
                            ? "#92310A"
                            : index === 1
                              ? "#3737D1"
                              : "#116932"
                        }
                      />
                    ))}
                  </HStack>
                ) : (
                  <Text
                    fontSize={{ md: "16px", base: "15px" }}
                    fontWeight="500"
                    lineHeight="21px"
                    letterSpacing="-2%"
                    color="#18181B"
                  >
                    {value}
                  </Text>
                )}
              </ListItem>
            ) : null,
          )}
        </List>
      </VStack>
      <UserAchievements achievements={userAchievements} />
    </Box>
  );
}

export const UserAchievements = ({
  achievements,
}: {
  achievements: string[];
}) => {
  return achievements.length ? (
    <VStack
      width="100%"
      pr={{ md: "14px", base: "24px" }}
      pl={{ md: "0", base: "24px" }}
      align="flex-start"
      pt={{ md: "28px", base: "20px" }}
      borderTop="1px solid"
      borderColor="#E4E4E7"
      gap={{ md: "28px", base: "24px" }}
    >
      <Text
        fontSize="16px"
        fontWeight="500"
        lineHeight="21px"
        letterSpacing="-2%"
        color="#3F3F46"
      >
        Previous Achievements
      </Text>

      <List
        display="flex"
        flexDirection="column"
        gap="16px"
        width="fit-content"
      >
        {achievements.map((achievement, index) => (
          <Achievement key={index} achievement={achievement} />
        ))}
      </List>
    </VStack>
  ) : null;
};

export const Achievement = ({ achievement }: { achievement: string }) => {
  const [bgColor, textColor] = getAchievementColors(achievement);
  const Icon = getAchievementIcon(achievement);
  return (
    <HStack
      align="center"
      justify="flex-start"
      title={achievement}
      width="100%"
      rounded="full"
      gap="4px"
      pl="12px"
      pr="16px"
      height="32px"
      bg={bgColor}
    >
      <Icon width="20px" height="20px" minWidth="20px" color={textColor} />
      <Text fontSize="13.5px" fontWeight="500" color={textColor} noOfLines={1}>
        {achievement}
      </Text>
    </HStack>
  );
};

export function getAchievementColors(
  achievement: string,
): [bgColor: string, textColor: string] {
  if (/realtor of the month/i.test(achievement)) return ["#DADAFF", "#2929A3"];
  else if (/best client quality/i.test(achievement))
    return ["#DCFCE7", "#116932"];
  else if (/highest value transactions/i.test(achievement))
    return ["#FFEDD5", "#EA580C"];
  else if (/highest client conversion/i.test(achievement))
    return ["#CCFBF1", "#0C5D56"];
  else if (/best client management/i.test(achievement))
    return ["#EFDFFE", "#6D10BF"];
  else if (/kyc compliance champion/i.test(achievement))
    return ["#8756331A", "#875633"];
  else return ["#FAB7021A", "#8F6F18"];
}

export const getAchievementIcon = (achievement: string) =>
  /platform ambassador/i.test(achievement)
    ? TrophyIcon
    : /best client quality/i.test(achievement)
      ? CurrencyEth
      : /highest value transactions/i.test(achievement)
        ? Badge1Icon
        : /highest client conversion/i.test(achievement)
          ? Badge2Icon
          : /best client management/i.test(achievement)
            ? Badge3Icon
            : /kyc compliance champion/i.test(achievement)
              ? DiamondsFourIcon
              : CrystalIcon;
