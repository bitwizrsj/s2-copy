'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ProfilePage } from '@/components/common/profile-page';

export default function SuperAdminProfile() {
  return (
    <DashboardLayout role="superadmin" title="Profile">
      <ProfilePage role="superadmin" />
    </DashboardLayout>
  );
}
