
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  MenuIcon, 
  PlayCircle,
  Award 
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import FadeIn from "@/components/animation/FadeIn";

// Mock course data
const COURSE = {
  id: "course1",
  title: "Complete Web Development Bootcamp",
  description: "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer.",
  instructor: "Dr. Sarah Johnson",
  instructorAvatar: "https://i.pravatar.cc/150?u=sarah",
  curriculum: [
    {
      id: "section1",
      title: "Introduction to Web Development",
      lessons: [
        { 
          id: "lesson1", 
          title: "Course Overview", 
          type: "video", 
          duration: "10:00", 
          content: `
            <div class="prose prose-sm max-w-none">
              <h2>Welcome to the Complete Web Development Bootcamp!</h2>
              <p>In this course, you'll learn everything you need to know to become a full-stack web developer. We'll start with the basics of HTML, CSS, and JavaScript, and then move on to more advanced topics like React, Node.js, and MongoDB.</p>
              <p>By the end of this course, you'll be able to build complete, full-stack web applications from scratch.</p>
              <h3>What You'll Learn</h3>
              <ul>
                <li>Build responsive websites using HTML, CSS, and JavaScript</li>
                <li>Create dynamic web applications with React</li>
                <li>Develop backend services with Node.js and Express</li>
                <li>Work with databases like MongoDB and MySQL</li>
                <li>Implement user authentication and authorization</li>
                <li>Deploy your applications to the cloud</li>
                <li>Optimize your code for performance</li>
              </ul>
              <p>Let's get started!</p>
            </div>
          ` 
        },
        { 
          id: "lesson2", 
          title: "Setting Up Your Development Environment", 
          type: "video", 
          duration: "15:00",
          content: `
            <div class="prose prose-sm max-w-none">
              <h2>Setting Up Your Development Environment</h2>
              <p>In this lesson, we'll set up the tools you need to start building web applications. We'll install a code editor, a web browser, and Node.js.</p>
              <h3>Code Editor</h3>
              <p>We'll be using Visual Studio Code as our code editor. It's free, open-source, and has great support for web development.</p>
              <h3>Web Browser</h3>
              <p>You can use any modern web browser for development, but we recommend Google Chrome or Firefox Developer Edition.</p>
              <h3>Node.js</h3>
              <p>Node.js is a JavaScript runtime that allows you to run JavaScript code outside of a web browser. We'll use it to run our backend code and install packages.</p>
              <h3>Installing the Tools</h3>
              <ol>
                <li>Download and install Visual Studio Code from <a href="https://code.visualstudio.com/" target="_blank">https://code.visualstudio.com/</a></li>
                <li>Download and install Google Chrome from <a href="https://www.google.com/chrome/" target="_blank">https://www.google.com/chrome/</a></li>
                <li>Download and install Node.js from <a href="https://nodejs.org/" target="_blank">https://nodejs.org/</a></li>
              </ol>
              <p>Once you have all these tools installed, you're ready to start building web applications!</p>
            </div>
          `
        },
        { 
          id: "lesson3", 
          title: "How the Web Works", 
          type: "video", 
          duration: "12:00",
          content: `
            <div class="prose prose-sm max-w-none">
              <h2>How the Web Works</h2>
              <p>In this lesson, we'll learn about the fundamentals of how the web works. We'll cover topics like HTTP, DNS, and the client-server model.</p>
              <h3>The Client-Server Model</h3>
              <p>The web operates on a client-server model. Clients (usually web browsers) request resources from servers, which respond with the requested resources.</p>
              <h3>HTTP</h3>
              <p>HTTP (Hypertext Transfer Protocol) is the protocol used for communication between clients and servers on the web. When you enter a URL in your browser, your browser sends an HTTP request to the server, which responds with an HTTP response.</p>
              <h3>DNS</h3>
              <p>DNS (Domain Name System) is a system that translates human-readable domain names (like example.com) into IP addresses that computers can understand.</p>
              <h3>The Request-Response Cycle</h3>
              <ol>
                <li>You enter a URL in your browser</li>
                <li>Your browser uses DNS to look up the IP address for the domain</li>
                <li>Your browser sends an HTTP request to the server at that IP address</li>
                <li>The server processes the request and sends back an HTTP response</li>
                <li>Your browser renders the response (usually HTML, CSS, and JavaScript) into a web page</li>
              </ol>
              <p>Understanding this fundamental process is essential for web development.</p>
            </div>
          `
        }
      ]
    },
    {
      id: "section2",
      title: "HTML Fundamentals",
      lessons: [
        { 
          id: "lesson4", 
          title: "Introduction to HTML", 
          type: "video", 
          duration: "18:00",
          content: `
            <div class="prose prose-sm max-w-none">
              <h2>Introduction to HTML</h2>
              <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page semantically.</p>
              <h3>Basic Structure</h3>
              <p>Here's the basic structure of an HTML document:</p>
              <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;Page Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;My First Heading&lt;/h1&gt;
  &lt;p&gt;My first paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
              <h3>Elements and Tags</h3>
              <p>HTML elements are defined by tags. Tags are keywords surrounded by angle brackets like &lt;tagname&gt;content&lt;/tagname&gt;.</p>
              <h3>Common HTML Elements</h3>
              <ul>
                <li>&lt;h1&gt; to &lt;h6&gt; - Headings</li>
                <li>&lt;p&gt; - Paragraphs</li>
                <li>&lt;a&gt; - Links</li>
                <li>&lt;img&gt; - Images</li>
                <li>&lt;ul&gt; and &lt;ol&gt; - Lists</li>
                <li>&lt;div&gt; - Containers</li>
              </ul>
              <p>In the next lesson, we'll dive deeper into HTML elements and attributes.</p>
            </div>
          `
        },
        { 
          id: "lesson5", 
          title: "HTML Elements and Attributes", 
          type: "video", 
          duration: "22:00",
          content: "Lesson content about HTML elements and attributes..."
        },
        { 
          id: "lesson6", 
          title: "HTML Forms", 
          type: "video", 
          duration: "25:00",
          content: "Lesson content about HTML forms..."
        },
        { 
          id: "lesson7", 
          title: "HTML Project: Building a Basic Webpage", 
          type: "project", 
          duration: "45:00",
          content: "Project instructions for building a basic webpage with HTML..."
        }
      ]
    }
  ]
};

// Find all lessons across all sections
const getAllLessons = () => {
  return COURSE.curriculum.flatMap(section => section.lessons);
};

// Find a lesson by ID
const findLessonById = (lessonId: string) => {
  return getAllLessons().find(lesson => lesson.id === lessonId);
};

// Find the next lesson
const findNextLesson = (currentLessonId: string) => {
  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);
  return currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
};

// Find the previous lesson
const findPrevLesson = (currentLessonId: string) => {
  const allLessons = getAllLessons();
  const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLessonId);
  return currentIndex > 0 ? allLessons[currentIndex - 1] : null;
};

const CourseLearn = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeLesson, setActiveLesson] = useState<any>(null);
  const [progress, setProgress] = useState<string[]>([]);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  // Initialize with first lesson if no lessonId is provided
  useEffect(() => {
    if (!lessonId) {
      const firstLesson = COURSE.curriculum[0].lessons[0];
      if (firstLesson) {
        navigate(`/courses/${courseId}/learn/${firstLesson.id}`, { replace: true });
      }
    } else {
      const lesson = findLessonById(lessonId);
      setActiveLesson(lesson);
    }
  }, [courseId, lessonId, navigate]);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`course_${courseId}_progress`);
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error("Failed to parse saved progress", error);
      }
    }
  }, [courseId]);

  // Mark lesson as completed
  const markAsCompleted = (lessonId: string) => {
    if (!progress.includes(lessonId)) {
      const updatedProgress = [...progress, lessonId];
      setProgress(updatedProgress);
      localStorage.setItem(`course_${courseId}_progress`, JSON.stringify(updatedProgress));
    }
  };

  // Navigate to next lesson
  const goToNextLesson = () => {
    if (activeLesson) {
      markAsCompleted(activeLesson.id);
      const nextLesson = findNextLesson(activeLesson.id);
      if (nextLesson) {
        navigate(`/courses/${courseId}/learn/${nextLesson.id}`);
      }
    }
  };

  // Navigate to previous lesson
  const goToPrevLesson = () => {
    if (activeLesson) {
      const prevLesson = findPrevLesson(activeLesson.id);
      if (prevLesson) {
        navigate(`/courses/${courseId}/learn/${prevLesson.id}`);
      }
    }
  };

  // Calculate course progress
  const totalLessons = getAllLessons().length;
  const completedLessons = progress.length;
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden bg-background border-b p-4 flex items-center justify-between">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open course navigation"
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            <div className="text-sm truncate">{activeLesson?.title}</div>
            <div className="text-sm font-medium">{completedLessons}/{totalLessons}</div>
          </div>
          
          {/* Mobile Navigation Sidebar */}
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
              <SheetHeader className="p-6 border-b">
                <SheetTitle>Course Content</SheetTitle>
              </SheetHeader>
              <div className="overflow-y-auto h-[calc(100vh-80px)]">
                <div className="p-6 border-b">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Your Progress</span>
                    <span className="text-sm">{progressPercentage}% complete</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <CourseSidebar 
                  course={COURSE} 
                  activeLesson={activeLesson} 
                  progress={progress}
                  courseId={courseId as string}
                  onLessonSelect={() => setIsMobileNavOpen(false)}
                />
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-80 border-r flex-shrink-0 h-[calc(100vh-64px)] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="font-semibold mb-1">{COURSE.title}</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{totalLessons} lessons</span>
              </div>
              <div className="mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Your Progress</span>
                  <span className="text-sm">{progressPercentage}% complete</span>
                </div>
                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <CourseSidebar 
              course={COURSE} 
              activeLesson={activeLesson} 
              progress={progress}
              courseId={courseId as string}
            />
          </div>
          
          {/* Lesson Content */}
          <div className="flex-1 overflow-y-auto h-[calc(100vh-64px)]">
            {activeLesson ? (
              <FadeIn>
                <div className="p-6 md:p-10">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {activeLesson.title}
                  </h1>
                  <div className="flex items-center text-sm text-muted-foreground mb-6">
                    {activeLesson.type === "video" ? (
                      <PlayCircle className="h-4 w-4 mr-1" />
                    ) : (
                      <FileText className="h-4 w-4 mr-1" />
                    )}
                    <span>{activeLesson.type === "video" ? "Video" : "Reading"} • {activeLesson.duration}</span>
                  </div>
                  
                  {/* Video Placeholder */}
                  {activeLesson.type === "video" && (
                    <div className="aspect-video bg-muted rounded-md mb-8 flex items-center justify-center">
                      <PlayCircle className="h-16 w-16 text-muted-foreground/50" />
                    </div>
                  )}
                  
                  {/* Lesson Content */}
                  <div 
                    dangerouslySetInnerHTML={{ __html: activeLesson.content || "Content not available for this lesson." }}
                    className="mb-10"
                  />
                  
                  {/* Navigation Controls */}
                  <div className="flex justify-between items-center border-t pt-6 mt-10">
                    <Button 
                      variant="outline" 
                      onClick={goToPrevLesson}
                      disabled={!findPrevLesson(activeLesson.id)}
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous Lesson
                    </Button>
                    
                    {progress.includes(activeLesson.id) ? (
                      <span className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                        Completed
                      </span>
                    ) : (
                      <Button 
                        variant="outline" 
                        onClick={() => markAsCompleted(activeLesson.id)}
                      >
                        Mark as Completed
                      </Button>
                    )}
                    
                    <Button 
                      onClick={goToNextLesson}
                      disabled={!findNextLesson(activeLesson.id)}
                    >
                      Next Lesson
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </FadeIn>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

// Course Sidebar Component
interface CourseSidebarProps {
  course: typeof COURSE;
  activeLesson: any;
  progress: string[];
  courseId: string;
  onLessonSelect?: () => void;
}

const CourseSidebar = ({ course, activeLesson, progress, courseId, onLessonSelect }: CourseSidebarProps) => {
  return (
    <Accordion type="multiple" defaultValue={course.curriculum.map(section => section.id)}>
      {course.curriculum.map((section) => (
        <AccordionItem key={section.id} value={section.id}>
          <AccordionTrigger className="px-6 py-3 text-left">
            <div>
              <div className="font-medium">{section.title}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {section.lessons.length} lessons • 
                {section.lessons.filter(lesson => progress.includes(lesson.id)).length} completed
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1 px-6 pb-3">
              {section.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={`/courses/${courseId}/learn/${lesson.id}`}
                  onClick={onLessonSelect}
                  className={`flex items-center justify-between p-2 rounded-md text-sm ${
                    activeLesson && activeLesson.id === lesson.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted/80"
                  }`}
                >
                  <div className="flex items-center">
                    {lesson.type === "video" ? (
                      <PlayCircle className="h-4 w-4 mr-3 flex-shrink-0" />
                    ) : (
                      <FileText className="h-4 w-4 mr-3 flex-shrink-0" />
                    )}
                    <span className="line-clamp-1">{lesson.title}</span>
                  </div>
                  {progress.includes(lesson.id) && (
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  )}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
      
      <div className="px-6 py-4 border-t">
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/courses/${courseId}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Link>
        </Button>
        {progress.length === getAllLessons().length && (
          <div className="mt-4 p-4 bg-primary/10 rounded-md flex items-center">
            <Award className="h-10 w-10 text-primary mr-3" />
            <div>
              <h3 className="font-medium">Course Completed!</h3>
              <p className="text-sm text-muted-foreground">Congratulations on finishing this course.</p>
            </div>
          </div>
        )}
      </div>
    </Accordion>
  );
};

export default CourseLearn;
