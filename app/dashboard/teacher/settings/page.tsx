'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { SettingsPage } from '@/components/common/settings-page';

export default function TeacherSettings() {
  return (
    <DashboardLayout role="teacher" title="Settings">
      <SettingsPage role="teacher" />
    </DashboardLayout>
  );
}
