'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  Search,
  Plus,
  Trash2,
  ShieldCheck,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';

interface AdminData {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  status: string;
  isPasswordChanged: boolean;
  lastLogin: string | null;
  createdAt: string;
}

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export default function SuperAdminAdminsPage() {
  const [admins, setAdmins] = useState<AdminData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Create admin form state
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminFirstName, setNewAdminFirstName] = useState('');
  const [newAdminLastName, setNewAdminLastName] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const token = getCookie('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/users?role=admin`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setAdmins(data.data.filter((u: AdminData) => u.role === 'admin'));
      }
    } catch (error) {
      toast.error('Failed to fetch admins');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreateAdmin = async () => {
    if (!newAdminEmail || !newAdminPassword) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Basic password validation
    if (newAdminPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsCreating(true);
    try {
      const token = getCookie('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: newAdminEmail,
          firstName: newAdminFirstName,
          lastName: newAdminLastName,
          role: 'admin',
          password: newAdminPassword
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Admin created successfully!');
        setIsCreateDialogOpen(false);
        resetCreateForm();
        fetchAdmins();
      } else {
        toast.error(data.message || 'Failed to create admin');
      }
    } catch (error) {
      toast.error('Failed to create admin');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteAdmin = async (adminId: number) => {
    if (!confirm('Are you sure you want to deactivate this admin?')) return;

    try {
      const token = getCookie('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/users/${adminId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Admin deactivated successfully');
        fetchAdmins();
      } else {
        toast.error(data.message || 'Failed to deactivate admin');
      }
    } catch (error) {
      toast.error('Failed to deactivate admin');
    }
  };

  const resetCreateForm = () => {
    setNewAdminEmail('');
    setNewAdminFirstName('');
    setNewAdminLastName('');
    setNewAdminPassword('');
  };

  const filteredAdmins = admins.filter(admin => {
    return admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (admin.firstName && admin.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (admin.lastName && admin.lastName.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <DashboardLayout role="superadmin" title="Admin Management">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Info Banner */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-orange-600" />
            <p className="text-sm text-orange-800">
              <strong>Note:</strong> Only Super Admins can create and manage Admin accounts. Admins cannot create other Admins.
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">Manage Admins</h2>
            <p className="text-gray-500">Create and manage administrator accounts</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="create-admin-btn">
                <Plus className="h-4 w-4 mr-2" />
                Create Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Admin</DialogTitle>
                <DialogDescription>
                  Create a new administrator account. Admins can manage users in their assigned institution.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="admin@example.com"
                    data-testid="new-admin-email"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={newAdminFirstName}
                      onChange={(e) => setNewAdminFirstName(e.target.value)}
                      placeholder="John"
                      data-testid="new-admin-firstname"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={newAdminLastName}
                      onChange={(e) => setNewAdminLastName(e.target.value)}
                      placeholder="Doe"
                      data-testid="new-admin-lastname"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      placeholder="Enter password (min 8 characters)"
                      data-testid="new-admin-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">Admin will be required to change this password on first login.</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateAdmin} disabled={isCreating} data-testid="submit-create-admin">
                  {isCreating ? 'Creating...' : 'Create Admin'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search admins..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="search-admins"
                />
              </div>
              <Button variant="outline" onClick={fetchAdmins}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Admins List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-orange-600" />
              Administrators ({filteredAdmins.length})
            </CardTitle>
            <CardDescription>Manage administrator accounts</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredAdmins.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No admins found. Create your first admin to get started.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredAdmins.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors" data-testid={`admin-row-${admin.id}`}>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-orange-100">
                          <ShieldCheck className="h-5 w-5 text-orange-600" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {admin.firstName && admin.lastName ? `${admin.firstName} ${admin.lastName}` : admin.email.split('@')[0]}
                        </div>
                        <div className="text-sm text-gray-500">{admin.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <Badge className="bg-orange-100 text-orange-800">
                          Admin
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">
                          {admin.status === 'active' ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => handleDeleteAdmin(admin.id)} data-testid={`delete-admin-${admin.id}`}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
