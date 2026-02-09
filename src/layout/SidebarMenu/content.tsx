import {
  AiAssistantIcon,
  CalendarIcon,
  GeneralFeedbackIcon,
  LogoutIcon,
  MoreOptionsIcon,
  OurOfferingsIcon,
  PrivacyPolicyIcon,
  ProfileIcon,
  ReferralsIcon,
  ReportBugIcon,
  RequestIcon,
  SuggestIdeaIcon,
  TermsIcon,
  TransactionsIcon
} from '@/components/assets/navbar/sidemenu';
import { ReactElement } from 'react';

export type RouterPush = (url: string) => void;

export interface SidebarMenuInterface {
  title: string;
  icon: ReactElement;
  active?: boolean;
  subMenu?: boolean;
  isDisabled?: boolean;
  hide?: boolean;
  onClick?: () => void;
  href?: string;
  externalLink?: boolean;
  openNewDrawer?: boolean;
}

export const activeLinkColors = {
  color: '#3636E2',
  bgColor: '#EBEBFB'
};

export const getMenuList = ({
  pathname,
  activeMenu
}: {
  pathname: string;
  activeMenu: string;
}) => {
  return [
    {
      title: 'Our Offerings',
      icon: (
        <OurOfferingsIcon
          color={
            pathname?.includes(`/offerings`)
              ? activeLinkColors?.color
              : undefined
          }
        />
      ),
      active: pathname?.includes(`/offerings`),
      href: `/offerings`
    },
    {
      title: 'Transactions',
      icon: (
        <TransactionsIcon
          color={
            pathname?.includes(`/transactions`)
              ? activeLinkColors?.color
              : undefined
          }
        />
      ),
      active: pathname?.includes(`/transactions`),
      href: `/transactions`
    },
    {
      title: 'Referrals',
      icon: (
        <ReferralsIcon
          color={
            pathname?.includes(`/referrals`)
              ? activeLinkColors?.color
              : undefined
          }
        />
      ),
      active: pathname?.includes(`/referrals`),
      openNewDrawer: true
    },
    {
      title: 'Requests',
      icon: (
        <RequestIcon
          color={
            pathname?.includes(`/request`) || activeMenu === `requests`
              ? activeLinkColors?.color
              : undefined
          }
        />
      ),
      active:
        pathname?.includes(`/request`) || activeMenu === `requests`,
      href: `/request`
    },
    {
      title: 'Profile',
      icon: (
        <ProfileIcon
          color={
            pathname?.includes(`/profile`)
              ? activeLinkColors?.color
              : undefined
          }
        />
      ),
      active: pathname?.includes(`/profile`),
      href: `/profile`
    },
    {
      title: 'More',
      subMenu: true,
      icon: (
        <MoreOptionsIcon
          color={
            activeMenu === 'more options' ? activeLinkColors?.color : undefined
          }
        />
      ),
      active: activeMenu === 'more options'
    }
  ];
};

export const getSubMenuList = ({
  router,
  pathname,
  query,
  activeMenu
}: {
  router: { push: RouterPush };
  pathname: string;
  query: Record<string, string | undefined>;
  activeMenu: string;
}) => {
  switch (activeMenu) {
    case 'requests':
      return [
        {
          title: 'Inspection Requests',
          icon: (
            <RequestIcon
              color={
                pathname?.includes(`/request`) &&
                !query?.history &&
                query?.tab == 'inspection'
                  ? activeLinkColors?.color
                  : undefined
              }
            />
          ),
          active:
            pathname?.includes(`/request`) &&
            !query?.history &&
            query?.tab == 'inspection',
          onClick: () => {
            router.push(`/request?&tab=inspection`);
          }
        },
        {
          title: 'Inspection History',
          icon: (
            <RequestIcon
              color={
                pathname?.includes(`/request`) &&
                query?.history == 'true' &&
                query?.tab == 'inspection'
                  ? activeLinkColors?.color
                  : undefined
              }
            />
          ),
          active:
            pathname?.includes(`/request`) &&
            query?.history == 'true' &&
            query?.tab == 'inspection',
          onClick: () => {
            router.push(`/request?history=true&tab=inspection`);
          }
        },
        {
          title: 'Commission Requests',
          icon: (
            <RequestIcon
              color={
                pathname?.includes(`/request`) &&
                !query?.history &&
                query?.tab == 'commission'
                  ? activeLinkColors?.color
                  : undefined
              }
            />
          ),
          active:
            pathname?.includes(`/request`) &&
            !query?.history &&
            query?.tab == 'commission',
          onClick: () => {
            router.push(`/request?tab=commission`);
          }
        },
        {
          title: 'Commission History',
          icon: (
            <RequestIcon
              color={
                pathname?.includes(`/request`) &&
                query?.history == 'true' &&
                query?.tab == 'commission'
                  ? activeLinkColors?.color
                  : undefined
              }
            />
          ),
          active:
            pathname?.includes(`/request`) &&
            query?.history == 'true' &&
            query?.tab == 'commission',
          onClick: () => {
            router.push(`/request?history=true&tab=commission`);
          }
        }
      ];
    case 'more':
      return [
        {
          title: 'AI Assistant',
          icon: <AiAssistantIcon />,
          active: false
        },
        {
          title: 'Calendar',
          icon: <CalendarIcon />,
          active: false
        },
        {
          title: 'Report a bug',
          icon: <ReportBugIcon />,
          active: false
        },
        {
          title: 'Suggest an idea',
          icon: <SuggestIdeaIcon />,
          active: false
        },
        {
          title: 'General Feedback',
          icon: <GeneralFeedbackIcon />,
          active: false
        }
      ];
    default:
      return [];
  }
};

export const getMenuFooterList = () => {
  return [
    {
      title: 'Terms of Use',
      icon: <TermsIcon />,
      active: false
    },
    {
      title: 'Privacy Policy',
      icon: <PrivacyPolicyIcon />,
      active: false
    },
    {
      title: 'Logout',
      icon: <LogoutIcon />,
      active: false
    }
  ];
};
