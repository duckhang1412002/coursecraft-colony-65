
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Cookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. What Are Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website.
                  They are widely used to make websites work more efficiently and to provide information to the site owners.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. How We Use Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>MECRLearn uses cookies for several purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Essential cookies: Required for the website to function properly</li>
                  <li>Performance cookies: Help us understand how visitors interact with our website</li>
                  <li>Functionality cookies: Remember your preferences and settings</li>
                  <li>Analytics cookies: Provide insights into website usage and performance</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Types of Cookies We Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Session Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      These are temporary cookies that expire when you close your browser. They help us maintain your login session.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Persistent Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      These remain on your device for a set period or until you delete them. They remember your preferences across visits.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Third-Party Cookies</h4>
                    <p className="text-sm text-muted-foreground">
                      These are set by external services we use, such as analytics providers or payment processors.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Managing Cookies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  You can control and manage cookies in various ways. Most browsers allow you to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>View what cookies are stored on your device</li>
                  <li>Delete cookies individually or all at once</li>
                  <li>Block cookies from specific sites</li>
                  <li>Block all cookies from being set</li>
                  <li>Be notified when a cookie is being set</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Please note that blocking or deleting cookies may affect your experience on our website and some features may not work properly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Browser Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>To manage cookies in popular browsers:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational,
                  legal, or regulatory reasons. We will notify you of any material changes by updating this page.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  If you have any questions about our use of cookies, please contact us at cookies@mecrlearn.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cookies;
