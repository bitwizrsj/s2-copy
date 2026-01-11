'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { SettingsPage } from '@/components/common/settings-page';

export default function AdminSettings() {
  return (
    <DashboardLayout role="admin" title="Settings">
      <SettingsPage role="admin" />
    </DashboardLayout>
  );
}
