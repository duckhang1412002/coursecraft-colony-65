
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  BookOpen, Clock, Users, BarChart, Award, Star, 
  CheckCircle, PlayCircle, FileText, Lock, ShoppingCart
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animation/FadeIn";
import { useCart } from "@/hooks/useCart";

// Mock course data
const COURSES = {
  "course1": {
    id: "course1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer. This comprehensive course takes you from beginner to advanced with practical projects and real-world applications.",
    instructor: "Dr. Sarah Johnson",
    instructorTitle: "Web Development Instructor",
    category: "Web Development",
    level: "Beginner",
    duration: "48 hours",
    price: 49.99,
    rating: 4.8,
    totalStudents: 12840,
    totalCourses: 8,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    updatedAt: "2023-05-15",
    lessons: [
      {
        id: "lesson1",
        title: "Introduction to HTML",
        duration: "45:00",
        type: "video"
      },
      {
        id: "lesson2",
        title: "CSS Fundamentals",
        duration: "1:15:00",
        type: "video"
      },
      {
        id: "lesson3",
        title: "JavaScript Basics",
        duration: "1:30:00",
        type: "video"
      },
      {
        id: "lesson4",
        title: "Building Your First Website",
        duration: "2:00:00",
        type: "document"
      },
      {
        id: "lesson5",
        title: "Introduction to React",
        duration: "1:45:00",
        type: "video"
      },
      {
        id: "lesson6",
        title: "Working with APIs",
        duration: "1:20:00",
        type: "video"
      }
    ]
  },
  "course2": {
    id: "course2",
    title: "Advanced Data Science with Python",
    description: "Master data analysis, visualization, machine learning and AI with Python. This course will take you from fundamental concepts to advanced techniques in data science.",
    instructor: "Prof. Michael Chen",
    instructorTitle: "Data Science Professor",
    category: "Data Science",
    level: "Advanced",
    duration: "36 hours",
    price: 59.99,
    rating: 4.9,
    totalStudents: 8754,
    totalCourses: 5,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    updatedAt: "2023-06-20",
    lessons: [
      {
        id: "lesson1",
        title: "Python for Data Science",
        duration: "1:30:00",
        type: "video"
      },
      {
        id: "lesson2",
        title: "Data Visualization with Matplotlib",
        duration: "1:45:00",
        type: "video"
      },
      {
        id: "lesson3",
        title: "Machine Learning Fundamentals",
        duration: "2:00:00",
        type: "video"
      }
    ]
  },
  "course3": {
    id: "course3",
    title: "UX/UI Design Fundamentals",
    description: "Learn the principles of user experience and interface design to create beautiful products. This course covers design thinking, wireframing, prototyping, and user testing.",
    instructor: "Emma Rodriguez",
    instructorTitle: "UX Design Lead",
    category: "Design",
    level: "Intermediate",
    duration: "24 hours",
    price: 39.99,
    rating: 4.7,
    totalStudents: 6240,
    totalCourses: 3,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    updatedAt: "2023-04-10",
    lessons: [
      {
        id: "lesson1",
        title: "Introduction to UX Design",
        duration: "1:15:00",
        type: "video"
      },
      {
        id: "lesson2",
        title: "User Research Methods",
        duration: "1:30:00",
        type: "video"
      },
      {
        id: "lesson3",
        title: "Wireframing and Prototyping",
        duration: "1:45:00",
        type: "video"
      }
    ]
  },
  "course4": {
    id: "course4",
    title: "Modern JavaScript from Zero to Hero",
    description: "Master JavaScript from the basics to advanced concepts like async/await, ES6+, and more. This course is designed for anyone who wants to learn modern JavaScript from scratch.",
    instructor: "Alan Turing",
    instructorTitle: "JavaScript Expert",
    category: "Web Development",
    level: "Beginner",
    duration: "30 hours",
    price: 45.99,
    rating: 4.9,
    totalStudents: 15320,
    totalCourses: 6,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    updatedAt: "2023-07-05",
    lessons: [
      {
        id: "lesson1",
        title: "JavaScript Basics",
        duration: "1:30:00",
        type: "video"
      },
      {
        id: "lesson2",
        title: "Working with Functions",
        duration: "1:45:00",
        type: "video"
      },
      {
        id: "lesson3",
        title: "ES6+ Features",
        duration: "2:00:00",
        type: "video"
      }
    ]
  },
  "course5": {
    id: "course5",
    title: "React Native Mobile App Development",
    description: "Build cross-platform mobile apps using React Native and JavaScript. Learn to create native mobile apps for iOS and Android using a single codebase.",
    instructor: "Jessica Wang",
    instructorTitle: "Mobile App Developer",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "28 hours",
    price: 49.99,
    rating: 4.6,
    totalStudents: 5670,
    totalCourses: 4,
    image: "https://images.unsplash.com/photo-1542641371-f2a51b5a585a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    updatedAt: "2023-08-12",
    lessons: [
      {
        id: "lesson1",
        title: "Getting Started with React Native",
        duration: "1:15:00",
        type: "video"
      },
      {
        id: "lesson2",
        title: "Building UI Components",
        duration: "1:30:00",
        type: "video"
      },
      {
        id: "lesson3",
        title: "Navigation in React Native",
        duration: "1:45:00",
        type: "video"
      }
    ]
  },
  "course6": {
    id: "course6",
    title: "Digital Marketing Masterclass",
    description: "Learn SEO, social media marketing, email campaigns, analytics and more. This comprehensive course covers all aspects of digital marketing for businesses of all sizes.",
    instructor: "Robert Martinez",
    instructorTitle: "Digital Marketing Strategist",
    category: "Marketing",
    level: "Beginner",
    duration: "24 hours",
    price: 39.99,
    rating: 4.7,
    totalStudents: 9350,
    totalCourses: 5,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    updatedAt: "2023-09-18",
    lessons: [
      {
        id: "lesson1",
        title: "Digital Marketing Fundamentals",
        duration: "1:00:00",
        type: "video"
      },
      {
        id: "lesson2",
        title: "Search Engine Optimization",
        duration: "1:30:00",
        type: "video"
      },
      {
        id: "lesson3",
        title: "Social Media Marketing",
        duration: "1:45:00",
        type: "video"
      }
    ]
  }
};

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { addToCart, isInCart } = useCart();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Get course data based on courseId
  const course = courseId ? COURSES[courseId as keyof typeof COURSES] || null : null;
  
  if (!course) {
    return (
      <>
        <Navbar />
        <main className="flex-1 container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The course you are looking for does not exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Calculate total course content
  const totalLessons = course.lessons.length;
  
  // Calculate total duration from lessons
  const totalDuration = course.lessons.reduce(
    (total, lesson) => {
      const [mins, secs] = lesson.duration.split(":");
      return total + parseInt(mins) + (parseInt(secs || "0") / 60);
    }, 0
  );
  
  // Format hours and minutes
  const hours = Math.floor(totalDuration / 60);
  const minutes = Math.floor(totalDuration % 60);
  const formattedDuration = hours > 0 
    ? `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 0 ? `${minutes} min` : ''}`
    : `${minutes} minutes`;
  
  // Check if the course is already in the cart
  const courseInCart = isInCart(course.id);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add this course to your cart",
        variant: "destructive",
      });
      return;
    }
    
    setIsAddingToCart(true);
    
    try {
      await addToCart(course);
      
      toast({
        title: "Added to Cart",
        description: `${course.title} has been added to your cart`,
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      toast({
        title: "Failed to Add to Cart",
        description: "There was an error adding this course to your cart",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

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
      // Simulate enrollment process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Enrollment Successful",
        description: "You have been enrolled in this course",
      });
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
                    {course.title}
                  </h1>
                  <p className="text-muted-foreground mb-6">
                    {course.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 items-center mb-6">
                    <div className="flex items-center">
                      <BarChart className="h-4 w-4 text-muted-foreground mr-1" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-muted-foreground mr-1" />
                      <span>Last updated: {course.updatedAt}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div>
                      <p className="font-medium">Created by</p>
                      <p className="text-primary">{course.instructor}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Card className="overflow-hidden shadow-lg">
                    <div className="aspect-video">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold">${course.price}</h3>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <Button 
                          className="w-full" 
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
                        
                        {!courseInCart ? (
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={handleAddToCart}
                            disabled={isAddingToCart}
                          >
                            {isAddingToCart ? (
                              <>
                                <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-primary rounded-full"></div>
                                Adding...
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add to Cart
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button 
                            variant="secondary" 
                            className="w-full"
                            asChild
                          >
                            <Link to="/cart">
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              View in Cart
                            </Link>
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 mr-3 text-muted-foreground" />
                          <span>{totalLessons} lessons</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                          <span>{formattedDuration} of content</span>
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
                      <p>{course.description}</p>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Curriculum Tab */}
                <TabsContent value="curriculum" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold">Course Content</h2>
                      <p className="text-muted-foreground">
                        {totalLessons} lessons • {course.duration}
                      </p>
                    </div>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="section-1">
                      <AccordionTrigger>
                        <div className="text-left">
                          <div>Section 1: Getting Started</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {Math.min(3, course.lessons.length)} lessons • {course.lessons.slice(0, 3).reduce((total, lesson) => {
                              const [mins] = lesson.duration.split(":");
                              return total + parseInt(mins);
                            }, 0)} minutes
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-1 pt-1">
                          {course.lessons.slice(0, 3).map((lesson) => (
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
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {lesson.duration}
                                  </span>
                                </div>
                              </div>
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    {course.lessons.length > 3 && (
                      <AccordionItem value="section-2">
                        <AccordionTrigger>
                          <div className="text-left">
                            <div>Section 2: Advanced Topics</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {course.lessons.length - 3} lessons • {course.lessons.slice(3).reduce((total, lesson) => {
                                const [mins] = lesson.duration.split(":");
                                return total + parseInt(mins);
                              }, 0)} minutes
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-1 pt-1">
                            {course.lessons.slice(3).map((lesson) => (
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
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      {lesson.duration}
                                    </span>
                                  </div>
                                </div>
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                </TabsContent>
                
                {/* Instructor Tab */}
                <TabsContent value="instructor">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center">
                        <div>
                          <CardTitle>{course.instructor}</CardTitle>
                          <CardDescription>{course.instructorTitle}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-muted-foreground mr-1" />
                          <span>{course.totalStudents.toLocaleString()} Students</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 text-muted-foreground mr-1" />
                          <span>{course.totalCourses} Courses</span>
                        </div>
                      </div>
                      
                      <div className="prose prose-sm max-w-none">
                        <p>
                          {course.instructor} is an experienced {course.category.toLowerCase()} instructor with over 10 years 
                          of industry experience. They specialize in {course.category.toLowerCase()} and have 
                          helped thousands of students achieve their learning goals.
                        </p>
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
