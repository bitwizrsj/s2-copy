'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ProfilePage } from '@/components/common/profile-page';

export default function StudentProfile() {
  return (
    <DashboardLayout role="student" title="Profile">
      <ProfilePage role="student" />
    </DashboardLayout>
  );
}
