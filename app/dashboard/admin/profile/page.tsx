'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ProfilePage } from '@/components/common/profile-page';

export default function AdminProfile() {
  return (
    <DashboardLayout role="admin" title="Profile">
      <ProfilePage role="admin" />
    </DashboardLayout>
  );
}
