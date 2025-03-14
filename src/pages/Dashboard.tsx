
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, PlusCircle, Layers } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animation/FadeIn";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import CourseCard from "@/components/common/CourseCard";

// Mock enrolled/created courses data
const MOCK_COURSES = [
  {
    id: "course1",
    title: "Introduction to React",
    description: "Learn the fundamentals of React and build modern web applications.",
    instructor: "John Teacher",
    category: "Web Development",
    level: "Beginner" as const,
    duration: "6 hours",
    students: 1240,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    progress: 65,
  },
  {
    id: "course2",
    title: "Advanced JavaScript Patterns",
    description: "Master advanced JavaScript patterns and techniques for better code.",
    instructor: "Jane Student",
    category: "Programming",
    level: "Advanced" as const,
    duration: "8 hours",
    students: 980,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    progress: 30,
  },
  {
    id: "course3",
    title: "UI/UX Design Fundamentals",
    description: "Learn the basics of UI/UX design and create beautiful interfaces.",
    instructor: "John Teacher",
    category: "Design",
    level: "Intermediate" as const,
    duration: "5 hours",
    students: 1560,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    progress: 10,
  }
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(user?.role === "teacher" ? "teaching" : "learning");

  return (
    <>
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 py-8 md:py-12">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">
                Welcome back, {user?.name}
              </h1>
              <p className="text-muted-foreground">
                Manage your courses and track your learning progress
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              {user?.role === "teacher" && (
                <Button asChild>
                  <Link to="/courses/create">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Course
                  </Link>
                </Button>
              )}
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>

          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList>
              {user?.role === "student" && (
                <TabsTrigger value="learning">My Learning</TabsTrigger>
              )}
              {user?.role === "teacher" && (
                <TabsTrigger value="teaching">My Courses</TabsTrigger>
              )}
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Student Learning Tab */}
            {user?.role === "student" && (
              <TabsContent value="learning" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {MOCK_COURSES.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="relative">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-6">
                        <div className="text-sm text-muted-foreground mb-4">
                          <span>{course.progress}% complete</span>
                        </div>
                        <Button asChild size="sm" className="w-full">
                          <Link to={`/courses/${course.id}`}>
                            Continue Learning
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </TabsContent>
            )}

            {/* Teacher Courses Tab */}
            {user?.role === "teacher" && (
              <TabsContent value="teaching" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {MOCK_COURSES.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="relative">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-40 object-cover"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-6">
                        <div className="text-sm text-muted-foreground mb-4">
                          <div className="flex items-center mt-1">
                            <BookOpen className="h-4 w-4 mr-1" />
                            <span>{course.students} students enrolled</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button asChild size="sm" variant="outline" className="flex-1">
                            <Link to={`/courses/${course.id}/edit`}>
                              Edit
                            </Link>
                          </Button>
                          <Button asChild size="sm" className="flex-1">
                            <Link to={`/courses/${course.id}`}>
                              View
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </TabsContent>
            )}

            {/* Stats Tab */}
            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {user?.role === "teacher" ? "Total Students" : "Courses Enrolled"}
                    </CardTitle>
                    <CardDescription className="text-3xl font-bold text-foreground">
                      {user?.role === "teacher" ? "3,780" : "12"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 font-medium">↑ 12%</span> from last month
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {user?.role === "teacher" ? "Courses Created" : "Completed Courses"}
                    </CardTitle>
                    <CardDescription className="text-3xl font-bold text-foreground">
                      {user?.role === "teacher" ? "24" : "8"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 font-medium">↑ 4%</span> from last month
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {user?.role === "teacher" ? "Total Revenue" : "Hours Learned"}
                    </CardTitle>
                    <CardDescription className="text-3xl font-bold text-foreground">
                      {user?.role === "teacher" ? "$12,450" : "64"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 font-medium">↑ 8%</span> from last month
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Average Rating
                    </CardTitle>
                    <CardDescription className="text-3xl font-bold text-foreground">
                      4.8
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      <span className="text-emerald-500 font-medium">↑ 0.2</span> from last month
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Activity Overview</CardTitle>
                  <CardDescription>
                    Your learning/teaching activity in the past 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                    <p className="text-muted-foreground">
                      [Activity Chart will be displayed here]
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                      <img 
                        src={user?.avatar || "https://i.pravatar.cc/150"} 
                        alt={user?.name || "User"} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{user?.name}</h3>
                    <p className="text-muted-foreground mb-2">{user?.email}</p>
                    <div className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium mb-4">
                      {user?.role === "teacher" ? "Teacher" : "Student"}
                    </div>
                    <Button variant="outline" size="sm">
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Manage your email notification preferences
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Course updates</span>
                        <div className="w-10 h-5 bg-primary rounded-full relative">
                          <div className="absolute right-0.5 top-0.5 bg-white w-4 h-4 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">New messages</span>
                        <div className="w-10 h-5 bg-primary rounded-full relative">
                          <div className="absolute right-0.5 top-0.5 bg-white w-4 h-4 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Promotional emails</span>
                        <div className="w-10 h-5 bg-muted rounded-full relative">
                          <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Privacy Settings</h4>
                      <p className="text-sm text-muted-foreground">
                        Manage your privacy settings
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Profile visibility</span>
                        <div className="w-10 h-5 bg-primary rounded-full relative">
                          <div className="absolute right-0.5 top-0.5 bg-white w-4 h-4 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">Show learning progress</span>
                        <div className="w-10 h-5 bg-primary rounded-full relative">
                          <div className="absolute right-0.5 top-0.5 bg-white w-4 h-4 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </FadeIn>
      </main>
      
      <Footer />
    </>
  );
};

export default Dashboard;
