import DashboardLayout from '../components/DashboardLayout';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { FileText, Eye, Clock, Plus, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UnderReviewPage() {
  const { documents } = useApp();
  const navigate = useNavigate();
  
  const underReviewDocs = documents.filter((doc) => doc.status === 'under-review');

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-6 h-6 text-[#FFA500]" />
              <h1 className="text-2xl font-bold">Documents Under Review</h1>
            </div>
            <nav className="text-sm text-gray-500">
              <span>Home</span> <span className="mx-2">&gt;</span> <span>Under Review</span>
            </nav>
          </div>
        </div>

        {/* Alert Banner */}
        <Alert className="mb-8 border-[#FFA500] bg-[#FFA500]/10">
          <Clock className="h-4 w-4 text-[#FFA500]" />
          <AlertDescription className="text-gray-700">
            Your documents are being verified. This usually takes 24-48 hours. You'll be notified once the verification is complete.
          </AlertDescription>
        </Alert>

        {/* Document Cards */}
        {underReviewDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {underReviewDocs.map((doc) => (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FFA500]/10 p-3 rounded-lg">
                        <FileText className="w-6 h-6 text-[#FFA500]" />
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
                      <span className="text-gray-600">Submitted Date:</span>
                      <span className="font-medium">{doc.uploadDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status:</span>
                      <Badge variant="outline" className="bg-[#FFA500]/10 text-[#FFA500] border-[#FFA500]">
                        <Clock className="w-3 h-3 mr-1" />
                        Under Review
                      </Badge>
                    </div>
                  </div>

                  {/* Progress Animation */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Loader2 className="w-4 h-4 animate-spin text-[#FFA500]" />
                    <span>Verification in progress...</span>
                  </div>

                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-gray-100 p-6 rounded-full">
                  <Clock className="w-16 h-16 text-gray-400" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">No Documents Under Review</h3>
                <p className="text-gray-500 mb-6">
                  All your documents have been processed
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

        {/* Bottom Section */}
        {underReviewDocs.length > 0 && (
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
