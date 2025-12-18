import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Upload, Plus, X, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface UploadedFile {
  id: string;
  file: File;
  type: string;
  number: string;
}

export default function UploadDocumentsPage() {
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [certificates, setCertificates] = useState<UploadedFile[]>([]);
  const [currentCert, setCurrentCert] = useState<{ file: File | null; type: string; number: string }>({
    file: null,
    type: '',
    number: '',
  });

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

  const handleAadhaarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAadhaarFile(e.target.files[0]);
      toast.success('Aadhaar file selected');
    }
  };

  const handleCertFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentCert({ ...currentCert, file: e.target.files[0] });
    }
  };

  const handleAddCertificate = () => {
    if (!currentCert.file || !currentCert.type) {
      toast.error('Please select a file and certificate type');
      return;
    }

    const newCert: UploadedFile = {
      id: Date.now().toString(),
      file: currentCert.file,
      type: currentCert.type,
      number: currentCert.number,
    };

    setCertificates([...certificates, newCert]);
    setCurrentCert({ file: null, type: '', number: '' });
    toast.success('Certificate added');
  };

  const handleRemoveCertificate = (id: string) => {
    setCertificates(certificates.filter((cert) => cert.id !== id));
    toast.info('Certificate removed');
  };

  const handleSubmit = () => {
    if (!aadhaarFile || !aadhaarNumber) {
      toast.error('Please upload Aadhaar card and enter Aadhaar number');
      return;
    }
    if (aadhaarNumber.replace(/-/g, '').length !== 12) {
      toast.error('Please enter a valid 12-digit Aadhaar number');
      return;
    }
    toast.success('Documents submitted for verification!');
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Upload Documents</h1>
          <nav className="text-sm text-gray-500">
            <span>Home</span> <span className="mx-2">&gt;</span> <span>Upload Documents</span>
          </nav>
        </div>

        <div className="space-y-6 max-w-4xl">
          {/* Aadhaar Card Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Aadhaar Card</CardTitle>
                  <CardDescription>Upload your Aadhaar card for identity verification</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Required
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0066CC] transition-colors">
                <input
                  type="file"
                  id="aadhaar-upload"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleAadhaarFileChange}
                />
                <label htmlFor="aadhaar-upload" className="cursor-pointer">
                  {aadhaarFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-8 h-8 text-[#0066CC]" />
                      <div className="text-left">
                        <p className="font-medium">{aadhaarFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(aadhaarFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                    </>
                  )}
                </label>
              </div>

              {/* Aadhaar Number */}
              <div className="space-y-2">
                <Label htmlFor="aadhaar-number">Aadhaar Number</Label>
                <Input
                  id="aadhaar-number"
                  type="text"
                  placeholder="XXXX-XXXX-XXXX"
                  value={aadhaarNumber}
                  onChange={handleAadhaarChange}
                  className="text-lg tracking-wider"
                />
                <p className="text-xs text-gray-500">Enter your 12-digit Aadhaar number</p>
              </div>
            </CardContent>
          </Card>

          {/* Certificates Section */}
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Educational/Professional Certificates</CardTitle>
                <CardDescription>Upload your certificates for verification</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Certificate Form */}
              <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
                <div className="space-y-2">
                  <Label htmlFor="cert-type">Certificate Type</Label>
                  <Select value={currentCert.type} onValueChange={(value) => setCurrentCert({ ...currentCert, type: value })}>
                    <SelectTrigger id="cert-type">
                      <SelectValue placeholder="Select Certificate Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th">10th Certificate</SelectItem>
                      <SelectItem value="12th">12th Certificate</SelectItem>
                      <SelectItem value="graduation">Graduation Certificate</SelectItem>
                      <SelectItem value="post-graduation">Post Graduation Certificate</SelectItem>
                      <SelectItem value="professional">Professional Certificate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cert-number">Certificate Number (if applicable)</Label>
                  <Input
                    id="cert-number"
                    type="text"
                    placeholder="Enter certificate number"
                    value={currentCert.number}
                    onChange={(e) => setCurrentCert({ ...currentCert, number: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload File</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#0066CC] transition-colors">
                    <input
                      type="file"
                      id="cert-upload"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleCertFileChange}
                    />
                    <label htmlFor="cert-upload" className="cursor-pointer">
                      {currentCert.file ? (
                        <div className="flex items-center justify-center gap-2">
                          <FileText className="w-6 h-6 text-[#0066CC]" />
                          <span className="text-sm">{currentCert.file.name}</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Click to upload</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC] hover:text-white"
                  onClick={handleAddCertificate}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add More Certificates
                </Button>
              </div>

              {/* List of Added Certificates */}
              {certificates.length > 0 && (
                <div className="space-y-3">
                  <Label>Added Certificates ({certificates.length})</Label>
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-[#0066CC]" />
                        <div>
                          <p className="font-medium text-sm">{cert.file.name}</p>
                          <p className="text-xs text-gray-500">
                            {cert.type} {cert.number && `• ${cert.number}`}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCertificate(cert.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              className="bg-[#0066CC] hover:bg-[#0052A3]"
              onClick={handleSubmit}
              size="lg"
            >
              Submit for Verification
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
