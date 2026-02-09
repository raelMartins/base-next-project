'use client';

import { UnitPageComponent } from '@/components/listingsProfile/ui-lib/unit/UnitPageComponent';
import { LayoutWrapper } from '@/layout/Wrapper';
import { useParams } from 'next/navigation';

export interface UnitProfilePageProps {
  apiKey: string; // Forces host to pass required config
  userName?: string;
}

export const UnitProfilePage = () => {
  const param = useParams();
  const id = (param.unit_id as string) ?? '';
  return (
    <LayoutWrapper sidebarMenuStyle='expandable'>
      <UnitPageComponent unit_id={id} />
    </LayoutWrapper>
  );
};
