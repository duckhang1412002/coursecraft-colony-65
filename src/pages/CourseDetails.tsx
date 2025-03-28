import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
import { useCourses } from "@/hooks/useCourses";
import type { Course, Lesson } from "@/types/course";

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const { addToCart, isInCart } = useCart();
  const { enrollCourse } = useCourses();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Fetch course details
  const { data: course, isLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: async () => {
      if (!courseId) return null;
      
      const { data, error } = await supabase
        .from("courses")
        .select(`
          *,
          lessons:lessons(*)
        `)
        .eq("id", courseId)
        .single();
      
      if (error) {
        toast({
          title: "Error loading course",
          description: error.message,
          variant: "destructive",
        });
        return null;
      }
      
      return data as Course & { lessons: Lesson[] };
    },
    enabled: !!courseId,
  });
  
  // Check if user is enrolled in this course
  const { data: enrollment, isLoading: isLoadingEnrollment } = useQuery({
    queryKey: ["enrollment", courseId, user?.id],
    queryFn: async () => {
      if (!courseId || !user) return null;
      
      const { data, error } = await supabase
        .from("user_courses")
        .select("*")
        .eq("course_id", courseId)
        .eq("user_id", user.id)
        .maybeSingle();
      
      if (error) {
        console.error("Error checking enrollment:", error);
        return null;
      }
      
      return data;
    },
    enabled: !!courseId && !!user,
  });
  
  const isEnrolled = !!enrollment;
  
  const handleAddToCart = async () => {
    if (!course) return;
    
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
    if (!courseId) return;
    
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
      enrollCourse(courseId);
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

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 container mx-auto px-6 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-muted rounded-md w-1/3"></div>
            <div className="h-6 bg-muted rounded-md w-2/3"></div>
            <div className="h-64 bg-muted rounded-md w-full"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (!course) {
    return (
      <>
        <Navbar />
        <main className="flex-1 container mx-auto px-6 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
          <p className="mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/courses">Browse Courses</Link>
          </Button>
        </main>
        <Footer />
      </>
    );
  }
  
  // Total course content calculation
  const totalLessons = course.lessons?.length || 0;
  
  // Calculate total duration from lessons
  const totalDuration = course.lessons?.reduce(
    (total, lesson) => {
      const [mins] = lesson.duration.split(":");
      return total + parseInt(mins || "0", 10);
    }, 0
  ) || 0;
  
  // Format hours and minutes
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  const formattedDuration = hours > 0 
    ? `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 0 ? `${minutes} min` : ''}`
    : `${minutes} minutes`;
  
  // Check if the course is already in the cart
  const courseInCart = isInCart(course.id);

  
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
                      <span>Last updated: {new Date(course.updated_at || "").toLocaleDateString()}</span>
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
                        src={course.image_url || "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold">${course.price}</h3>
                      </div>
                      
                      {isEnrolled ? (
                        <Button className="w-full mb-4" asChild>
                          <Link to={`/courses/${courseId}/learn`}>
                            Continue Learning
                          </Link>
                        </Button>
                      ) : (
                        <div className="space-y-3 mb-4">
                          <Button 
                            className="w-full" 
                            onClick={handleEnroll}
                            disabled={isEnrolling || isLoadingEnrollment}
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
                      )}
                      
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
                        {course?.lessons?.length} lessons • {course?.duration}
                      </p>
                    </div>
                  </div>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {course?.lessons?.map((lesson, lessonIndex) => (
                      <AccordionItem key={lesson.id} value={lesson.id}>
                        <AccordionTrigger>
                          <div className="text-left">
                            <div>{lesson.title}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {lesson.duration}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-1 pt-1">
                              <div 
                                className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md"
                              >
                                <div className="flex items-center">
                                  {(lesson.type === "video" || !lesson.type) ? (
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
                        <div>
                          <CardTitle>{course.instructor}</CardTitle>
                          <CardDescription>Web Development Instructor</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 mb-4 text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-muted-foreground mr-1" />
                          <span> Students</span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 text-muted-foreground mr-1" />
                          <span> Courses</span>
                        </div>
                      </div>
                      
                      <div className="prose prose-sm max-w-none">
                        <p>Instructor Bio</p>
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
