'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { SettingsPage } from '@/components/common/settings-page';

export default function SuperAdminSettings() {
  return (
    <DashboardLayout role="superadmin" title="Settings">
      <SettingsPage role="superadmin" />
    </DashboardLayout>
  );
}
