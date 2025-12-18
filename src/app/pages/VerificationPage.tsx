import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ShieldCheck, Mail, Phone, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function VerificationPage() {
  const navigate = useNavigate();
  const { user, verifyEmail, verifyPhone } = useApp();
  
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [phoneSent, setPhoneSent] = useState(false);
  const [emailTimer, setEmailTimer] = useState(0);
  const [phoneTimer, setPhoneTimer] = useState(0);

  useEffect(() => {
    if (emailTimer > 0) {
      const timer = setTimeout(() => setEmailTimer(emailTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [emailTimer]);

  useEffect(() => {
    if (phoneTimer > 0) {
      const timer = setTimeout(() => setPhoneTimer(phoneTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [phoneTimer]);

  const handleSendEmailCode = () => {
    setEmailSent(true);
    setEmailTimer(60);
    toast.success('Verification code sent to your email');
  };

  const handleSendPhoneCode = () => {
    setPhoneSent(true);
    setPhoneTimer(60);
    toast.success('OTP sent to your phone');
  };

  const handleVerifyEmail = () => {
    if (emailCode.length !== 6) {
      toast.error('Please enter a 6-digit code');
      return;
    }
    verifyEmail();
    toast.success('Email verified successfully!');
  };

  const handleVerifyPhone = () => {
    if (phoneCode.length !== 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }
    verifyPhone();
    toast.success('Phone verified successfully!');
  };

  const handleContinue = () => {
    if (!user?.emailVerified || !user?.phoneVerified) {
      toast.error('Please verify both email and phone to continue');
      return;
    }
    toast.success('Verification complete!');
    navigate('/dashboard/upload');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-[#0066CC]/10 p-4 rounded-full">
                <ShieldCheck className="w-12 h-12 text-[#0066CC]" />
              </div>
            </div>
            <CardTitle className="text-2xl">Verify Your Contact Information</CardTitle>
            <CardDescription>This adds an extra layer of security to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email Verification */}
            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0066CC]/10 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-[#0066CC]" />
                  </div>
                  <div>
                    <Label className="text-base">Email Verification</Label>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>
                <Badge variant={user?.emailVerified ? 'default' : 'destructive'} className={user?.emailVerified ? 'bg-[#00A65A]' : ''}>
                  {user?.emailVerified ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1" />
                      Not Verified
                    </>
                  )}
                </Badge>
              </div>

              {!user?.emailVerified && (
                <>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleSendEmailCode}
                      disabled={emailTimer > 0}
                      className="w-full"
                    >
                      {emailSent ? (emailTimer > 0 ? `Resend in ${emailTimer}s` : 'Resend Code') : 'Send Verification Code'}
                    </Button>
                  </div>

                  {emailSent && (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="email-code">Enter 6-digit code</Label>
                        <Input
                          id="email-code"
                          type="text"
                          maxLength={6}
                          placeholder="000000"
                          value={emailCode}
                          onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, ''))}
                          className="text-center text-lg tracking-widest"
                        />
                      </div>
                      <Button
                        className="w-full bg-[#0066CC] hover:bg-[#0052A3]"
                        onClick={handleVerifyEmail}
                      >
                        Verify Email
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Phone Verification */}
            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#0066CC]/10 p-2 rounded-lg">
                    <Phone className="w-5 h-5 text-[#0066CC]" />
                  </div>
                  <div>
                    <Label className="text-base">Phone Verification</Label>
                    <p className="text-sm text-gray-600">{user?.phone}</p>
                  </div>
                </div>
                <Badge variant={user?.phoneVerified ? 'default' : 'destructive'} className={user?.phoneVerified ? 'bg-[#00A65A]' : ''}>
                  {user?.phoneVerified ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3 mr-1" />
                      Not Verified
                    </>
                  )}
                </Badge>
              </div>

              {!user?.phoneVerified && (
                <>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleSendPhoneCode}
                      disabled={phoneTimer > 0}
                      className="w-full"
                    >
                      {phoneSent ? (phoneTimer > 0 ? `Resend in ${phoneTimer}s` : 'Resend OTP') : 'Send OTP'}
                    </Button>
                  </div>

                  {phoneSent && (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="phone-code">Enter 6-digit OTP</Label>
                        <Input
                          id="phone-code"
                          type="text"
                          maxLength={6}
                          placeholder="000000"
                          value={phoneCode}
                          onChange={(e) => setPhoneCode(e.target.value.replace(/\D/g, ''))}
                          className="text-center text-lg tracking-widest"
                        />
                      </div>
                      <Button
                        className="w-full bg-[#0066CC] hover:bg-[#0052A3]"
                        onClick={handleVerifyPhone}
                      >
                        Verify Phone
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Continue Button */}
            <div className="pt-4">
              <Button
                className="w-full bg-[#0066CC] hover:bg-[#0052A3]"
                onClick={handleContinue}
                disabled={!user?.emailVerified || !user?.phoneVerified}
              >
                Continue to Dashboard
              </Button>
            </div>

            {/* Info */}
            <p className="text-xs text-center text-gray-500">
              Verifying your contact information helps us keep your account secure and notify you
              of important updates.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
