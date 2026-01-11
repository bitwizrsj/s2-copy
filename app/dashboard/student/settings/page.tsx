'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { SettingsPage } from '@/components/common/settings-page';

export default function StudentSettings() {
  return (
    <DashboardLayout role="student" title="Settings">
      <SettingsPage role="student" />
    </DashboardLayout>
  );
}
