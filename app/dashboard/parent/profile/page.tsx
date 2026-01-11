'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ProfilePage } from '@/components/common/profile-page';

export default function ParentProfile() {
  return (
    <DashboardLayout role="parent" title="Profile">
      <ProfilePage role="parent" />
    </DashboardLayout>
  );
}
