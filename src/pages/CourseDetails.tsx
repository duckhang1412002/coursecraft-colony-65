
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  BookOpen,
  Clock,
  Users,
  BarChart,
  Award,
  Star,
  CheckCircle,
  PlayCircle,
  FileText,
  Lock,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animation/FadeIn";

// Mock course data
const COURSE = {
  id: "course1",
  title: "Complete Web Development Bootcamp",
  description: "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer. This comprehensive course covers everything you need to know to build modern, responsive websites and web applications from scratch.",
  longDescription: "This course is designed to take you from absolute beginner to professional web developer. You'll learn the latest technologies and best practices used in the industry today. By the end of this course, you'll be able to build complete, full-stack web applications and have a portfolio of projects to show potential employers.\n\nNo prior programming experience is required. We'll start with the basics and gradually introduce more advanced concepts. The course includes hands-on projects, coding challenges, and real-world examples to reinforce your learning.",
  instructor: "Dr. Sarah Johnson",
  instructorBio: "Dr. Sarah Johnson is a full-stack developer with over 10 years of industry experience. She has worked with major tech companies and has taught web development to thousands of students worldwide. Sarah is known for her clear explanations and practical teaching approach.",
  instructorAvatar: "https://i.pravatar.cc/150?u=sarah",
  category: "Web Development",
  level: "Beginner",
  duration: "48 hours",
  students: 12840,
  rating: 4.8,
  reviews: 2450,
  price: 89.99,
  image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  lastUpdated: "August 2023",
  requirements: [
    "Basic computer skills",
    "A computer with internet access",
    "No prior programming experience required"
  ],
  whatYouWillLearn: [
    "Build responsive websites using HTML, CSS, and JavaScript",
    "Create dynamic web applications with React",
    "Develop backend services with Node.js and Express",
    "Work with databases like MongoDB and MySQL",
    "Implement user authentication and authorization",
    "Deploy your applications to the cloud",
    "Optimize your code for performance",
    "Debug and test your applications"
  ],
  curriculum: [
    {
      id: "section1",
      title: "Introduction to Web Development",
      lessons: [
        { id: "lesson1", title: "Course Overview", type: "video", duration: "10:00", isPreview: true },
        { id: "lesson2", title: "Setting Up Your Development Environment", type: "video", duration: "15:00", isPreview: true },
        { id: "lesson3", title: "How the Web Works", type: "video", duration: "12:00", isPreview: false }
      ]
    },
    {
      id: "section2",
      title: "HTML Fundamentals",
      lessons: [
        { id: "lesson4", title: "Introduction to HTML", type: "video", duration: "18:00", isPreview: false },
        { id: "lesson5", title: "HTML Elements and Attributes", type: "video", duration: "22:00", isPreview: false },
        { id: "lesson6", title: "HTML Forms", type: "video", duration: "25:00", isPreview: false },
        { id: "lesson7", title: "HTML Project: Building a Basic Webpage", type: "project", duration: "45:00", isPreview: false }
      ]
    },
    {
      id: "section3",
      title: "CSS Styling",
      lessons: [
        { id: "lesson8", title: "Introduction to CSS", type: "video", duration: "20:00", isPreview: false },
        { id: "lesson9", title: "CSS Selectors and Properties", type: "video", duration: "28:00", isPreview: false },
        { id: "lesson10", title: "CSS Layout and Positioning", type: "video", duration: "30:00", isPreview: false },
        { id: "lesson11", title: "Responsive Design with CSS", type: "video", duration: "35:00", isPreview: false },
        { id: "lesson12", title: "CSS Project: Styling Your Webpage", type: "project", duration: "50:00", isPreview: false }
      ]
    },
    {
      id: "section4",
      title: "JavaScript Basics",
      lessons: [
        { id: "lesson13", title: "Introduction to JavaScript", type: "video", duration: "25:00", isPreview: false },
        { id: "lesson14", title: "Variables, Data Types, and Operators", type: "video", duration: "30:00", isPreview: false },
        { id: "lesson15", title: "Control Flow: Conditionals and Loops", type: "video", duration: "28:00", isPreview: false },
        { id: "lesson16", title: "Functions and Scope", type: "video", duration: "32:00", isPreview: false },
        { id: "lesson17", title: "Working with the DOM", type: "video", duration: "40:00", isPreview: false },
        { id: "lesson18", title: "JavaScript Project: Interactive Webpage", type: "project", duration: "60:00", isPreview: false }
      ]
    }
  ]
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEnrolling, setIsEnrolling] = useState(false);
  
  // Mock check if user is enrolled
  const isEnrolled = isAuthenticated && user?.role === "student";

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to enroll in this course",
        variant: "destructive",
      });
      return;
    }
    
    setIsEnrolling(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Enrollment Successful",
        description: `You have successfully enrolled in ${COURSE.title}`,
      });
      
      // In a real app, you would update the UI to reflect the enrollment
    } catch (error) {
      console.error("Enrollment error:", error);
      toast({
        title: "Enrollment Failed",
        description: "There was an error enrolling you in this course",
        variant: "destructive",
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  // Total course content calculation
  const totalLessons = COURSE.curriculum.reduce(
    (total, section) => total + section.lessons.length, 
    0
  );
  
  // Total course duration calculation
  const totalDuration = COURSE.curriculum.reduce(
    (total, section) => total + section.lessons.reduce(
      (sectionTotal, lesson) => sectionTotal + parseInt(lesson.duration.split(":")[0], 10),
      0
    ),
    0
  );
  
  return (
    <>
      <Navbar />
      
      <main className="flex-1">
        {/* Course Header */}
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-6">
            <FadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    {COURSE.title}
                  </h1>
                  <p className="text-muted-foreground mb-6">
                    {COURSE.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 items-center mb-6">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 font-semibold">{COURSE.rating}</span>
                      <span className="ml-1 text-muted-foreground">({COURSE.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-muted-foreground mr-1" />
                      <span>{COURSE.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                      <span>{COURSE.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BarChart className="h-4 w-4 text-muted-foreground mr-1" />
                      <span>{COURSE.level}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-muted-foreground mr-1" />
                      <span>Last updated: {COURSE.lastUpdated}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <img 
                      src={COURSE.instructorAvatar} 
                      alt={COURSE.instructor} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-medium">Created by</p>
                      <p className="text-primary">{COURSE.instructor}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Card className="overflow-hidden shadow-lg">
                    <div className="aspect-video">
                      <img 
                        src={COURSE.image} 
                        alt={COURSE.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold">${COURSE.price}</h3>
                      </div>
                      
                      {isEnrolled ? (
                        <Button className="w-full mb-4" asChild>
                          <Link to={`/courses/${courseId}/learn`}>
                            Continue Learning
                          </Link>
                        </Button>
                      ) : (
                        <Button 
                          className="w-full mb-4" 
                          onClick={handleEnroll}
                          disabled={isEnrolling}
                        >
                          {isEnrolling ? (
                            <>
                              <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                              Enrolling...
                            </>
                          ) : (
                            "Enroll Now"
                          )}
                        </Button>
                      )}
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 mr-3 text-muted-foreground" />
                          <span>{totalLessons} lessons</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                          <span>{totalDuration} hours of video</span>
                        </div>
                        <div className="flex items-center">
                          <Award className="h-5 w-5 mr-3 text-muted-foreground" />
                          <span>Certificate of completion</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-5 w-5 mr-3 text-muted-foreground" />
                          <span>Full lifetime access</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
        
        {/* Course Content */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <FadeIn>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                  <TabsTrigger value="instructor">Instructor</TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                    <div className="prose prose-sm max-w-none">
                      <p>{COURSE.longDescription}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {COURSE.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex">
                          <CheckCircle className="h-5 w-5 mr-3 text-primary shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {COURSE.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                {/* Curriculum Tab */}
                <TabsContent value="curriculum" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold">Course Content</h2>
                      <p className="text-muted-foreground">
                        {COURSE.curriculum.length} sections • {totalLessons} lessons • {COURSE.duration} total
                      </p>
                    </div>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {COURSE.curriculum.map((section, sectionIndex) => (
                      <AccordionItem key={section.id} value={section.id}>
                        <AccordionTrigger>
                          <div className="text-left">
                            <div>{section.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {section.lessons.length} lessons • 
                              {section.lessons.reduce((total, lesson) => {
                                const [mins] = lesson.duration.split(":");
                                return total + parseInt(mins, 10);
                              }, 0)} min
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-1 pt-1">
                            {section.lessons.map((lesson, lessonIndex) => (
                              <div 
                                key={lesson.id} 
                                className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md"
                              >
                                <div className="flex items-center">
                                  {lesson.type === "video" ? (
                                    <PlayCircle className="h-4 w-4 mr-3 text-muted-foreground" />
                                  ) : (
                                    <FileText className="h-4 w-4 mr-3 text-muted-foreground" />
                                  )}
                                  <div>
                                    <div className="flex items-center">
                                      <span>{lesson.title}</span>
                                      {lesson.isPreview && (
                                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                          Preview
                                        </span>
                                      )}
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      {lesson.duration}
                                    </span>
                                  </div>
                                </div>
                                {!lesson.isPreview && !isEnrolled && (
                                  <Lock className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                
                {/* Instructor Tab */}
                <TabsContent value="instructor">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <img 
                          src={COURSE.instructorAvatar} 
                          alt={COURSE.instructor} 
                          className="w-16 h-16 rounded-full mr-4 object-cover"
                        />
                        <div>
                          <CardTitle>{COURSE.instructor}</CardTitle>
                          <CardDescription>Web Development Instructor</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span>4.8 Instructor Rating</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-muted-foreground mr-1" />
                          <span>25,400 Students</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 text-muted-foreground mr-1" />
                          <span>12 Courses</span>
                        </div>
                      </div>
                      
                      <div className="prose prose-sm max-w-none">
                        <p>{COURSE.instructorBio}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </FadeIn>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default CourseDetails;
