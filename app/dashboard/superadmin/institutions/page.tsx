'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function InstitutionsPage() {
  return (
    <DashboardLayout role="superadmin" title="Institutions">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Manage Institutions</h2>
            <p className="text-gray-500">View and manage educational institutions</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Institution
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Institutions
            </CardTitle>
            <CardDescription>List of all registered institutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No institutions registered yet.</p>
              <p className="text-sm">Click "Add Institution" to create your first institution.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
