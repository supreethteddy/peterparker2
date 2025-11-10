
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';

export default function VerificationPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [documents, setDocuments] = useState({
    drivingLicense: false,
    idProof: false,
    policeVerification: false
  });
  const [selfieCapture, setSelfieCapture] = useState(false);

  const handleDocumentUpload = (docType: string) => {
    setDocuments(prev => ({ ...prev, [docType]: true }));
  };

  const handleSelfieCapture = () => {
    setSelfieCapture(true);
    setTimeout(() => {
      navigate('/verification-success');
    }, 2000);
  };

  const allDocsUploaded = Object.values(documents).every(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Document Verification"
        leftIcon={<i className="ri-arrow-left-line"></i>}
        onLeftClick={() => navigate('/')}
      />

      <div className="pt-20 px-4 pb-6">
        {step === 1 && (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-blue-600 text-2xl"></i>
              </div>
              <h2 className="text-xl font-semibold mb-2">Verify Your Documents</h2>
              <p className="text-gray-600">Upload required documents for account verification</p>
            </div>

            <div className="space-y-4 mb-6">
              {[
                { 
                  key: 'drivingLicense', 
                  title: 'Driving License', 
                  description: 'Valid driving license (front & back)',
                  icon: 'ri-car-line'
                },
                { 
                  key: 'idProof', 
                  title: 'ID Proof', 
                  description: 'Aadhaar, PAN, or Passport',
                  icon: 'ri-id-card-line'
                },
                { 
                  key: 'policeVerification', 
                  title: 'Police Verification', 
                  description: 'Background verification certificate',
                  icon: 'ri-shield-line'
                }
              ].map((doc) => (
                <Card key={doc.key} className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      documents[doc.key as keyof typeof documents] ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <i className={`${doc.icon} text-xl ${
                        documents[doc.key as keyof typeof documents] ? 'text-green-600' : 'text-gray-500'
                      }`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{doc.title}</h3>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                    </div>
                    {documents[doc.key as keyof typeof documents] ? (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <i className="ri-check-line text-white"></i>
                      </div>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => handleDocumentUpload(doc.key)}
                      >
                        Upload
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <Button 
              onClick={() => setStep(2)}
              disabled={!allDocsUploaded}
              className="w-full py-4"
            >
              Continue to Selfie Verification
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-camera-line text-blue-600 text-2xl"></i>
              </div>
              <h2 className="text-xl font-semibold mb-2">Take a Selfie</h2>
              <p className="text-gray-600">We need to verify your identity with a live photo</p>
            </div>

            {/* Camera Preview Area */}
            <Card className="p-6 mb-6">
              <div className="aspect-square bg-gray-200 rounded-lg relative overflow-hidden">
                {!selfieCapture ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <i className="ri-camera-line text-gray-400 text-4xl mb-2 block"></i>
                      <p className="text-gray-500">Position your face in the frame</p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-50">
                    <div className="text-center">
                      <i className="ri-check-line text-green-600 text-4xl mb-2 block"></i>
                      <p className="text-green-700">Selfie captured successfully!</p>
                    </div>
                  </div>
                )}
                
                {/* Face outline guide */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-60 border-2 border-white rounded-full opacity-50"></div>
                </div>
              </div>
            </Card>

            {/* Instructions */}
            <Card className="p-4 mb-6">
              <h3 className="font-medium mb-3">Instructions:</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <i className="ri-check-line text-green-600"></i>
                  <span>Ensure good lighting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-check-line text-green-600"></i>
                  <span>Remove sunglasses and hat</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-check-line text-green-600"></i>
                  <span>Look directly at the camera</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="ri-check-line text-green-600"></i>
                  <span>Keep your face within the outline</span>
                </div>
              </div>
            </Card>

            {!selfieCapture ? (
              <Button onClick={handleSelfieCapture} className="w-full py-4">
                <i className="ri-camera-line mr-2"></i>
                Capture Selfie
              </Button>
            ) : (
              <div className="text-center">
                <div className="animate-pulse">
                  <p className="text-sm text-gray-500">Processing verification...</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
