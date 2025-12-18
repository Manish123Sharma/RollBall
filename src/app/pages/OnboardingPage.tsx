import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Upload, Lock, Clock, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const parts = cleaned.match(/.{1,4}/g);
    return parts ? parts.join('-') : cleaned;
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value);
    if (formatted.replace(/-/g, '').length <= 12) {
      setAadhaarNumber(formatted);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size should not exceed 5MB');
        return;
      }
      setFile(selectedFile);
      toast.success('File selected successfully');
    }
  };

  const handleContinue = () => {
    if (!aadhaarNumber || aadhaarNumber.replace(/-/g, '').length !== 12) {
      toast.error('Please enter a valid 12-digit Aadhaar number');
      return;
    }
    if (!file) {
      toast.error('Please upload your Aadhaar card');
      return;
    }
    setUploading(true);
    setTimeout(() => {
      toast.success('Aadhaar uploaded successfully!');
      navigate('/verify-contacts');
    }, 2000);
  };

  const handleSkip = () => {
    navigate('/dashboard/upload');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Step 1 of 2: Verify Your Identity</span>
            <span>50%</span>
          </div>
          <Progress value={50} className="h-2" />
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Upload Your Aadhaar Card</CardTitle>
            <CardDescription>This helps us verify your identity securely</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#0066CC] transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                {file ? (
                  <div>
                    <p className="text-lg mb-2 text-[#0066CC]">File Selected:</p>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-lg mb-2">
                      Drag & drop your Aadhaar card or{' '}
                      <span className="text-[#0066CC]">click to browse</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Supported formats: PDF, JPG, PNG (Max 5MB)
                    </p>
                  </>
                )}
              </label>
              {file && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    setFile(null);
                    toast.info('File removed');
                  }}
                >
                  Remove File
                </Button>
              )}
            </div>

            {/* Aadhaar Number Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="aadhaar">Aadhaar Number</Label>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Info className="w-3 h-3" />
                  <span>Your Aadhaar is encrypted and secure</span>
                </div>
              </div>
              <Input
                id="aadhaar"
                type="text"
                placeholder="XXXX-XXXX-XXXX"
                value={aadhaarNumber}
                onChange={handleAadhaarChange}
                className="text-lg tracking-wider"
              />
              <p className="text-xs text-gray-500">12-digit Aadhaar number</p>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <Lock className="w-5 h-5 text-[#0066CC] mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#0066CC]">Your data is encrypted</p>
                <p className="text-xs text-gray-600">
                  We use industry-standard encryption to protect your personal information.
                </p>
              </div>
            </div>

            {/* Time Estimate */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Takes less than 2 minutes</span>
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-4 pt-4">
              <Button variant="ghost" onClick={handleSkip} disabled={uploading}>
                Skip for Now
              </Button>
              <Button
                className="bg-[#0066CC] hover:bg-[#0052A3]"
                onClick={handleContinue}
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Continue'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center text-xs text-gray-500">
          <p>
            By continuing, you agree to our{' '}
            <a href="#" className="text-[#0066CC] hover:underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#0066CC] hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
