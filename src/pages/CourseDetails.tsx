
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Clock, Users, BookOpen, CheckCircle, PlayCircle, FileText, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VotingButtons from "@/components/common/VotingButtons";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Mock course data (replace with your actual data fetching)
const mockCourse = {
  id: "course1",
  title: "Complete Web Development Bootcamp",
  description: "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer.",
  instructor: "Dr. Sarah Johnson",
  instructorAvatar: "https://i.pravatar.cc/150?u=sarah",
  category: "Web Development",
  level: "Beginner",
  duration: "48 hours",
  students: 12840,
  rating: 4.8,
  sections: [
    {
      id: "section1",
      title: "Introduction to Web Development",
      lessons: [
        { id: "lesson1", title: "Course Overview", type: "video", duration: "10:00" },
        { id: "lesson2", title: "Setting Up Your Development Environment", type: "video", duration: "15:00" },
        { id: "lesson3", title: "How the Web Works", type: "video", duration: "12:00" }
      ]
    },
    {
      id: "section2",
      title: "HTML Fundamentals",
      lessons: [
        { id: "lesson4", title: "Introduction to HTML", type: "video", duration: "18:00" },
        { id: "lesson5", title: "HTML Elements and Attributes", type: "video", duration: "22:00" },
        { id: "lesson6", title: "HTML Forms", type: "video", duration: "25:00" },
        { id: "lesson7", title: "HTML Project: Building a Basic Webpage", type: "project", duration: "45:00" }
      ]
    }
  ],
  reviews: [
    {
      id: "review1",
      author: "Alice Smith",
      rating: 5,
      comment: "This course is amazing! The instructor is very knowledgeable and explains everything clearly.",
      date: "2024-03-15"
    },
    {
      id: "review2",
      author: "Bob Johnson",
      rating: 4,
      comment: "Good course, but could use more examples.",
      date: "2024-03-10"
    },
    {
      id: "review3",
      author: "Charlie Brown",
      rating: 3,
      comment: "The content is good, but the video quality could be better.",
      date: "2024-03-05"
    }
  ]
};

const CourseDetails = () => {
  const { courseId } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);

  // useEffect(() => {
  //   // Fetch course details based on courseId (replace with your actual data fetching)
  //   // Example:
  //   // const fetchCourseDetails = async () => {
  //   //   const data = await fetch(`/api/courses/${courseId}`);
  //   //   const course = await data.json();
  //   //   setCourse(course);
  //   // };
  //   // fetchCourseDetails();
  // }, [courseId]);

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow py-12">
          <div className="container mx-auto px-6">
            <div className="md:flex md:items-start md:justify-between md:space-x-8">
              {/* Left Column: Course Content */}
              <div className="md:w-2/3">

                {/* Course Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2 space-y-8">
                    {/* Course Info */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary">{mockCourse.category}</Badge>
                        <Badge variant="outline">{mockCourse.level}</Badge>
                      </div>
                      
                      <h1 className="text-3xl font-bold mb-4">{mockCourse.title}</h1>
                      <p className="text-lg text-muted-foreground mb-6">{mockCourse.description}</p>
                      
                      <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={mockCourse.instructorAvatar} />
                            <AvatarFallback>{mockCourse.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{mockCourse.instructor}</p>
                            <p className="text-sm text-muted-foreground">Course Instructor</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{mockCourse.duration}</span>
                          <Users className="h-4 w-4 ml-4 mr-1" />
                          <span>{mockCourse.students.toLocaleString()} students</span>
                        </div>
                      </div>

                      <VotingButtons 
                        courseId={courseId as string} 
                        displayOnly={true}
                        showDetailed={false}
                        showCount={true}
                      />
                    </div>

                    {/* Curriculum */}
                    <div>
                      <h2 className="text-2xl font-semibold mb-4">Course Curriculum</h2>
                      <Accordion type="single" collapsible>
                        {mockCourse.sections.map((section) => (
                          <AccordionItem key={section.id} value={section.id}>
                            <AccordionTrigger className="text-lg font-medium">{section.title}</AccordionTrigger>
                            <AccordionContent>
                              <ul className="mt-2 space-y-2">
                                {section.lessons.map((lesson) => (
                                  <li key={lesson.id} className="flex items-center justify-between px-4 py-2 rounded-md hover:bg-secondary/50">
                                    <div className="flex items-center">
                                      {lesson.type === "video" ? (
                                        <PlayCircle className="h-4 w-4 mr-2" />
                                      ) : (
                                        <FileText className="h-4 w-4 mr-2" />
                                      )}
                                      <span>{lesson.title}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                      <Button variant="link" asChild className="w-full mt-4">
                        <Link to={`/courses/${courseId}/learn/lesson1`}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Start Learning
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right Column: Course Image */}
                  <div className="lg:block hidden">
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt={mockCourse.title}
                      className="rounded-md shadow-md aspect-video object-cover"
                    />
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Reviews Section */}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                  {mockCourse.reviews.map((review) => (
                    <div key={review.id} className="mb-6 p-4 rounded-md bg-secondary/50">
                      <div className="flex items-start mb-2">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${review.author}`} />
                          <AvatarFallback>{review.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{review.author}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            {[...Array(review.rating)].map((_, i) => (
                              <CheckCircle key={i} className="h-4 w-4 text-yellow-500 mr-0.5" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="md:w-1/3">
                <div className="sticky top-20 space-y-4">
                  <Button variant="default" size="lg" className="w-full" asChild>
                    <Link to={`/courses/${courseId}/learn/lesson1`}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Learning
                    </Link>
                  </Button>
                  <Button variant="secondary" size="lg" className="w-full">
                    Add to Wishlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CourseDetails;
