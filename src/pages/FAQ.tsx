
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BookOpen, Mail } from "lucide-react";
import FadeIn from "@/components/animation/FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const FAQ = () => {
  const { t } = useLanguage();

  const faqs = [
    {
      question: "How do I create an account on MECRLearn?",
      answer: "You can create an account by clicking the 'Sign Up' button in the top right corner of the page. Choose whether you want to sign up as a student or teacher, fill in your details, and verify your email address."
    },
    {
      question: "What types of courses are available?",
      answer: "MECRLearn offers a wide variety of courses across different categories including Technology, Business, Design, Science, Languages, and more. Courses range from beginner to advanced levels."
    },
    {
      question: "How do I enroll in a course?",
      answer: "Browse our course catalog, click on a course that interests you, review the details, and click 'Add to Cart' or 'Enroll Now'. You can pay for individual courses or access multiple courses with a subscription."
    },
    {
      question: "Can I access courses on mobile devices?",
      answer: "Yes! MECRLearn is fully responsive and works on all devices including smartphones, tablets, and desktop computers. You can learn anywhere, anytime."
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer: "Yes, you'll receive a certificate of completion for each course you finish. Certificates include your name, the course title, completion date, and instructor signature."
    },
    {
      question: "How do I become an instructor on MECRLearn?",
      answer: "Sign up for a teacher account and complete your profile. You can then create and publish courses using our course creation tools. All courses go through a quality review process before being published."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and various digital payment methods. All transactions are secure and encrypted."
    },
    {
      question: "Can I get a refund if I'm not satisfied with a course?",
      answer: "Yes, we offer a 30-day money-back guarantee for all courses. If you're not satisfied, contact our support team within 30 days of purchase for a full refund."
    },
    {
      question: "How long do I have access to a course after purchasing?",
      answer: "Once you purchase a course, you have lifetime access to it. You can watch the lessons as many times as you want and at your own pace."
    },
    {
      question: "Is there a mobile app for MECRLearn?",
      answer: "Currently, MECRLearn is available as a web application that works perfectly on mobile browsers. We're working on dedicated mobile apps for iOS and Android."
    },
    {
      question: "How do I track my learning progress?",
      answer: "Your dashboard shows your enrolled courses, progress for each course, completed lessons, quiz scores, and certificates earned. You can track your learning journey in real-time."
    },
    {
      question: "Can I download course materials for offline viewing?",
      answer: "Some course materials like PDFs and documents can be downloaded. Video content is currently streaming-only, but we're working on offline viewing capabilities."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center">
              <BookOpen className="h-16 w-16 mx-auto text-primary mb-6" />
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about MECRLearn. Can't find what you're looking for? Contact our support team.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <FadeIn>
          <Card>
            <CardHeader>
              <CardTitle>Common Questions</CardTitle>
              <CardDescription>
                Here are the most frequently asked questions about our platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Contact Support */}
        <FadeIn>
          <Card className="mt-8">
            <CardHeader className="text-center">
              <CardTitle>Still Have Questions?</CardTitle>
              <CardDescription>
                Our support team is here to help you succeed
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/contact">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/courses">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse Courses
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
};

export default FAQ;
