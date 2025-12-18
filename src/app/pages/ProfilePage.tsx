import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { User, Lock, Bell, Upload, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, updateUser } = useApp();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    address: {
      line1: user?.address?.line1 || '',
      line2: user?.address?.line2 || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      pinCode: user?.address?.pinCode || '',
    },
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    statusUpdates: true,
    securityAlerts: true,
  });

  const handleSaveProfile = () => {
    updateUser(profileData);
    toast.success('Profile updated successfully!');
  };

  const handleUpdatePassword = () => {
    if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
      toast.error('Please fill in all password fields');
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordData.new.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    toast.success('Password updated successfully!');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved!');
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: passwordData.new.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(passwordData.new) },
    { text: 'One number', met: /[0-9]/.test(passwordData.new) },
    { text: 'One special character', met: /[!@#$%^&*]/.test(passwordData.new) },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Profile Settings</h1>
          <nav className="text-sm text-gray-500">
            <span>Home</span> <span className="mx-2">&gt;</span> <span>Profile Settings</span>
          </nav>
        </div>

        <div className="max-w-4xl">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">
                <User className="w-4 h-4 mr-2" />
                Personal Information
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="bg-[#0066CC] text-white text-2xl">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">JPG or PNG. Max size 2MB</p>
                    </div>
                  </div>

                  {/* Basic Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Basic Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Input id="email" value={profileData.email} disabled className="pr-8" />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            {user?.emailVerified ? (
                              <CheckCircle className="w-5 h-5 text-[#00A65A]" />
                            ) : (
                              <XCircle className="w-5 h-5 text-[#DC3545]" />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Input id="phone" value={profileData.phone} disabled className="pr-8" />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            {user?.phoneVerified ? (
                              <CheckCircle className="w-5 h-5 text-[#00A65A]" />
                            ) : (
                              <XCircle className="w-5 h-5 text-[#DC3545]" />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={profileData.gender} onValueChange={(value) => setProfileData({ ...profileData, gender: value })}>
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Address</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="line1">Address Line 1</Label>
                        <Input
                          id="line1"
                          value={profileData.address.line1}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              address: { ...profileData.address, line1: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="line2">Address Line 2</Label>
                        <Input
                          id="line2"
                          value={profileData.address.line2}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              address: { ...profileData.address, line2: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={profileData.address.city}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                address: { ...profileData.address, city: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={profileData.address.state}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                address: { ...profileData.address, state: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pinCode">PIN Code</Label>
                          <Input
                            id="pinCode"
                            value={profileData.address.pinCode}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                address: { ...profileData.address, pinCode: e.target.value },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-[#0066CC] hover:bg-[#0052A3]" onClick={handleSaveProfile}>
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={passwordData.current}
                          onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={passwordData.new}
                          onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={passwordData.confirm}
                          onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Password Requirements */}
                    {passwordData.new && (
                      <div className="bg-gray-50 border rounded-lg p-4">
                        <p className="text-sm font-medium mb-3">Password requirements:</p>
                        <div className="space-y-2">
                          {passwordRequirements.map((req, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              {req.met ? (
                                <CheckCircle className="w-4 h-4 text-[#00A65A]" />
                              ) : (
                                <XCircle className="w-4 h-4 text-gray-400" />
                              )}
                              <span className={req.met ? 'text-[#00A65A]' : 'text-gray-600'}>
                                {req.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Button className="bg-[#0066CC] hover:bg-[#0052A3]" onClick={handleUpdatePassword}>
                      Update Password
                    </Button>
                  </div>

                  <div className="pt-6 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                      <div>
                        <p className="font-medium">Verification Status Updates</p>
                        <p className="text-sm text-gray-500">Get notified about document verification progress</p>
                      </div>
                      <Switch
                        checked={notifications.statusUpdates}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, statusUpdates: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="font-medium">Security Alerts</p>
                        <p className="text-sm text-gray-500">Receive alerts about account security</p>
                      </div>
                      <Switch
                        checked={notifications.securityAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, securityAlerts: checked })}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button className="bg-[#0066CC] hover:bg-[#0052A3]" onClick={handleSaveNotifications}>
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}
