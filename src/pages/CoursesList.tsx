import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animation/FadeIn";
import CourseCard from "@/components/common/CourseCard";
import { useCourses } from "@/hooks/useCourses";

// Mock courses data
const COURSES = [
  {
    id: "course1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer.",
    instructor: "Dr. Sarah Johnson",
    category: "Web Development",
    level: "Beginner" as const,
    duration: "48 hours",
    students: 12840,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "course2",
    title: "Advanced Data Science with Python",
    description: "Master data analysis, visualization, machine learning and AI with Python.",
    instructor: "Prof. Michael Chen",
    category: "Data Science",
    level: "Advanced" as const,
    duration: "36 hours",
    students: 8754,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "course3",
    title: "UX/UI Design Fundamentals",
    description: "Learn the principles of user experience and interface design to create beautiful products.",
    instructor: "Emma Rodriguez",
    category: "Design",
    level: "Intermediate" as const,
    duration: "24 hours",
    students: 6240,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "course4",
    title: "Modern JavaScript from Zero to Hero",
    description: "Master JavaScript from the basics to advanced concepts like async/await, ES6+, and more.",
    instructor: "Alan Turing",
    category: "Web Development",
    level: "Beginner" as const,
    duration: "30 hours",
    students: 15320,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "course5",
    title: "React Native Mobile App Development",
    description: "Build cross-platform mobile apps using React Native and JavaScript.",
    instructor: "Jessica Wang",
    category: "Mobile Development",
    level: "Intermediate" as const,
    duration: "28 hours",
    students: 5670,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542641371-f2a51b5a585a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "course6",
    title: "Digital Marketing Masterclass",
    description: "Learn SEO, social media marketing, email campaigns, analytics and more.",
    instructor: "Robert Martinez",
    category: "Marketing",
    level: "Beginner" as const,
    duration: "24 hours",
    students: 9350,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

// Categories
const CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Design",
  "Marketing",
  "Business",
  "Photography",
  "Music"
];

// Levels
const LEVELS = ["Beginner", "Intermediate", "Advanced"];

const CoursesList = () => {
  const { courses, isLoadingCourses } = useCourses();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter functionality
  const filteredCourses = courses.filter(course => {
    // Search query filter
    const matchesSearch = 
      searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(course.category);
    
    // Level filter
    const matchesLevel = 
      selectedLevels.length === 0 || 
      selectedLevels.includes(course.level);
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const toggleLevel = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSearchQuery("");
  };
  
  return (
    <>
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 py-8 md:py-12">
        <FadeIn>
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Explore Courses
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover a wide range of courses taught by expert instructors to help you achieve your learning goals.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Filter sidebar - visible on desktop, hidden drawer on mobile */}
            <aside className={`md:w-64 md:block ${isFilterOpen ? "fixed inset-0 z-50 bg-background p-6 md:relative md:p-0 md:z-0" : "hidden"}`}>
              <div className="md:hidden flex justify-between items-center mb-6">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Categories</h3>
                      <div className="space-y-2">
                        {CATEGORIES.map(category => (
                          <div key={category} className="flex items-center">
                            <Checkbox 
                              id={`category-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                              className="mr-2"
                            />
                            <label 
                              htmlFor={`category-${category}`}
                              className="text-sm cursor-pointer"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Level</h3>
                      <div className="space-y-2">
                        {LEVELS.map(level => (
                          <div key={level} className="flex items-center">
                            <Checkbox 
                              id={`level-${level}`}
                              checked={selectedLevels.includes(level)}
                              onCheckedChange={() => toggleLevel(level)}
                              className="mr-2"
                            />
                            <label 
                              htmlFor={`level-${level}`}
                              className="text-sm cursor-pointer"
                            >
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </aside>
            
            <div className="flex-1">
              {/* Search and filter controls */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button 
                  variant="outline"
                  onClick={() => setIsFilterOpen(true)}
                  className="md:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              
              {/* Selected filters */}
              {(selectedCategories.length > 0 || selectedLevels.length > 0) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedCategories.map(category => (
                    <Badge key={category} variant="secondary" className="flex items-center gap-1">
                      {category}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => toggleCategory(category)}
                      />
                    </Badge>
                  ))}
                  {selectedLevels.map(level => (
                    <Badge key={level} variant="secondary" className="flex items-center gap-1">
                      {level}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => toggleLevel(level)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Results count */}
              <p className="text-sm text-muted-foreground mb-6">
                {isLoadingCourses ? "Loading courses..." : `Showing ${filteredCourses.length} courses`}
              </p>
              
              {/* Courses grid */}
              {isLoadingCourses ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="h-96 animate-pulse">
                      <div className="bg-muted h-48"></div>
                      <CardContent className="p-5 space-y-3">
                        <div className="h-5 bg-muted rounded-md w-3/4"></div>
                        <div className="h-4 bg-muted rounded-md w-full"></div>
                        <div className="h-4 bg-muted rounded-md w-2/3"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map(course => (
                    <CourseCard 
                      key={course.id} 
                      id={course.id}
                      title={course.title}
                      description={course.description}
                      instructor={course.instructor}
                      category={course.category}
                      level={course.level as "Beginner" | "Intermediate" | "Advanced"}
                      duration={course.duration}
                      students={0}
                      rating={4.5}
                      image={course.image_url || "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No courses found matching your criteria</p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
              
              {/* Pagination */}
              <Pagination className="mt-8">
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
            </div>
          </div>
        </FadeIn>
      </main>
      
      <Footer />
    </>
  );
};

export default CoursesList;
