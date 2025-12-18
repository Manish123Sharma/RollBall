import DashboardLayout from '../components/DashboardLayout';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { FileText, Download, Eye, CheckCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VerifiedDocumentsPage() {
  const { documents } = useApp();
  const navigate = useNavigate();
  
  const verifiedDocs = documents.filter((doc) => doc.status === 'verified');
  const underReviewCount = documents.filter((doc) => doc.status === 'under-review').length;
  const rejectedCount = documents.filter((doc) => doc.status === 'rejected').length;

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-6 h-6 text-[#00A65A]" />
              <h1 className="text-2xl font-bold">Verified Documents</h1>
            </div>
            <nav className="text-sm text-gray-500">
              <span>Home</span> <span className="mx-2">&gt;</span> <span>Verified Documents</span>
            </nav>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-[#00A65A]">
            <CardHeader className="pb-3">
              <CardDescription>Total Verified</CardDescription>
              <CardTitle className="text-3xl text-[#00A65A]">{verifiedDocs.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-[#FFA500]">
            <CardHeader className="pb-3">
              <CardDescription>Under Review</CardDescription>
              <CardTitle className="text-3xl text-[#FFA500]">{underReviewCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-l-4 border-l-[#DC3545]">
            <CardHeader className="pb-3">
              <CardDescription>Rejected</CardDescription>
              <CardTitle className="text-3xl text-[#DC3545]">{rejectedCount}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Document Grid */}
        {verifiedDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verifiedDocs.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#0066CC]/10 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-[#0066CC]" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{doc.name}</CardTitle>
                        <CardDescription className="text-xs">{doc.type}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Verification Date:</span>
                      <span className="font-medium">{doc.uploadDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge className="bg-[#00A65A]">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-3 h-3 mr-1" />
                      Download
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
                  <CheckCircle className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">No Verified Documents Yet</h3>
                <p className="text-gray-500 mb-6">
                  Upload documents to get them verified
                </p>
                <Button
                  className="bg-[#0066CC] hover:bg-[#0052A3]"
                  onClick={() => navigate('/dashboard/upload')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Bottom Section */}
        {verifiedDocs.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button variant="ghost" className="text-[#0066CC]" onClick={() => navigate('/dashboard/upload')}>
              <Plus className="w-4 h-4 mr-2" />
              Upload More Certificates
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
