'use client';
import { LibraryProvider, ProfilePage } from '@raelmartins/realtors-portal';

export default function MyProfilePage() {
  return (
    <LibraryProvider>
      <ProfilePage apiKey='' userName={''} />
    </LibraryProvider>
  );
}
