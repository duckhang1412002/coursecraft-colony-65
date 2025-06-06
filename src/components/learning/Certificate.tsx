
import React from "react";
import { Award, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CertificateProps {
  studentName: string;
  courseTitle: string;
  instructorName: string;
  completionDate: string;
  certificateNumber: string;
}

const Certificate = ({
  studentName,
  courseTitle,
  instructorName,
  completionDate,
  certificateNumber
}: CertificateProps) => {
  const handleDownload = () => {
    // Convert certificate to image and download
    const element = document.getElementById('certificate');
    if (element) {
      // For demo purposes, we'll just trigger a print dialog
      window.print();
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Course Certificate',
        text: `I've completed ${courseTitle}!`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="certificate-container">
        <CardContent className="p-0">
          <div
            id="certificate"
            className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 p-12 text-center border-8 border-double border-blue-300 dark:border-blue-700"
            style={{ aspectRatio: '4/3' }}
          >
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-gold-400"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-gold-400"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-gold-400"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-gold-400"></div>

            {/* Header */}
            <div className="mb-8">
              <Award className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Certificate of Completion
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto"></div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                This is to certify that
              </p>
              
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 border-b-2 border-dashed border-gray-300 pb-2 mx-8">
                {studentName}
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300">
                has successfully completed the course
              </p>
              
              <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 px-4">
                {courseTitle}
              </h3>
              
              <div className="flex justify-between items-center mt-12 px-8">
                <div className="text-center">
                  <div className="border-t-2 border-gray-400 pt-2 px-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Instructor</p>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">{instructorName}</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="border-t-2 border-gray-400 pt-2 px-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date of Completion</p>
                    <p className="font-semibold text-gray-700 dark:text-gray-300">{completionDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Certificate Number: {certificateNumber}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={handleDownload} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Certificate
        </Button>
        <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          Share Achievement
        </Button>
      </div>
    </div>
  );
};

export default Certificate;
