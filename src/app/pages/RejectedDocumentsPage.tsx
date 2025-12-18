import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { FileText, Upload, XCircle, Plus, AlertTriangle, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function RejectedDocumentsPage() {
  const { documents } = useApp();
  const navigate = useNavigate();
  
  const rejectedDocs = documents.filter((doc) => doc.status === 'rejected');
  const [reuploadFile, setReuploadFile] = useState<{ [key: string]: File | null }>({});

  const handleFileChange = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReuploadFile({ ...reuploadFile, [docId]: e.target.files[0] });
      toast.success('File selected');
    }
  };

  const handleResubmit = (docId: string) => {
    if (!reuploadFile[docId]) {
      toast.error('Please select a file to upload');
      return;
    }
    toast.success('Document resubmitted for verification!');
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-6 h-6 text-[#DC3545]" />
              <h1 className="text-2xl font-bold">Rejected Documents</h1>
            </div>
            <nav className="text-sm text-gray-500">
              <span>Home</span> <span className="mx-2">&gt;</span> <span>Rejected Documents</span>
            </nav>
          </div>
        </div>

        {/* Alert Banner */}
        {rejectedDocs.length > 0 && (
          <Alert variant="destructive" className="mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Some documents require attention. Please re-upload with corrections.
            </AlertDescription>
          </Alert>
        )}

        {/* Rejected Documents */}
        {rejectedDocs.length > 0 ? (
          <div className="space-y-6">
            {rejectedDocs.map((doc) => (
              <Card key={doc.id} className="border-[#DC3545]">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#DC3545]/10 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-[#DC3545]" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{doc.name}</CardTitle>
                        <CardDescription className="text-xs">{doc.type}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="destructive">
                      <XCircle className="w-3 h-3 mr-1" />
                      Rejected
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Rejection Reason */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-[#DC3545] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-[#DC3545] mb-1">Rejection Reason:</p>
                        <p className="text-sm text-gray-700">{doc.rejectionReason}</p>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-[#0066CC] mb-2">What to do:</p>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                      <li>Ensure the document is clear and legible</li>
                      <li>Verify all information is visible</li>
                      <li>Upload in PDF or high-quality image format</li>
                      <li>Make sure the document is not expired</li>
                    </ul>
                  </div>

                  {/* Reupload Section */}
                  <div className="space-y-3">
                    <Label>Re-upload Document</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#0066CC] transition-colors">
                      <input
                        type="file"
                        id={`reupload-${doc.id}`}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(doc.id, e)}
                      />
                      <label htmlFor={`reupload-${doc.id}`} className="cursor-pointer">
                        {reuploadFile[doc.id] ? (
                          <div className="flex items-center justify-center gap-2">
                            <FileText className="w-6 h-6 text-[#0066CC]" />
                            <span className="text-sm">{reuploadFile[doc.id]?.name}</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Click to upload corrected document</p>
                            <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-[#0066CC] hover:bg-[#0052A3]"
                      onClick={() => handleResubmit(doc.id)}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Resubmit Document
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-gray-100 p-6 rounded-full">
                  <XCircle className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">No Rejected Documents</h3>
                <p className="text-gray-500 mb-6">
                  All your documents are either verified or under review
                </p>
                <Button
                  className="bg-[#0066CC] hover:bg-[#0052A3]"
                  onClick={() => navigate('/dashboard/upload')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Upload New Documents
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
