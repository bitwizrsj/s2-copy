'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { SettingsPage } from '@/components/common/settings-page';

export default function ParentSettings() {
  return (
    <DashboardLayout role="parent" title="Settings">
      <SettingsPage role="parent" />
    </DashboardLayout>
  );
}
