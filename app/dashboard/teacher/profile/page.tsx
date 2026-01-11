'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ProfilePage } from '@/components/common/profile-page';

export default function TeacherProfile() {
  return (
    <DashboardLayout role="teacher" title="Profile">
      <ProfilePage role="teacher" />
    </DashboardLayout>
  );
}
