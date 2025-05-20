
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { Course } from "@/types/course";

// Mock courses data
const MOCK_COURSES = [
  {
    id: "course1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer.",
    instructor: "Dr. Sarah Johnson",
    category: "Web Development",
    level: "Beginner",
    duration: "48 hours",
    price: 49.99,
    image_url: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    created_at: "2023-01-15T10:30:00Z",
    updated_at: "2023-05-15T14:20:00Z"
  },
  {
    id: "course2",
    title: "Advanced Data Science with Python",
    description: "Master data analysis, visualization, machine learning and AI with Python.",
    instructor: "Prof. Michael Chen",
    category: "Data Science",
    level: "Advanced",
    duration: "36 hours",
    price: 59.99,
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    created_at: "2023-02-20T09:15:00Z",
    updated_at: "2023-06-20T11:45:00Z"
  },
  {
    id: "course3",
    title: "UX/UI Design Fundamentals",
    description: "Learn the principles of user experience and interface design to create beautiful products.",
    instructor: "Emma Rodriguez",
    category: "Design",
    level: "Intermediate",
    duration: "24 hours",
    price: 39.99,
    image_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    created_at: "2023-03-10T13:40:00Z",
    updated_at: "2023-04-10T16:30:00Z"
  },
  {
    id: "course4",
    title: "Modern JavaScript from Zero to Hero",
    description: "Master JavaScript from the basics to advanced concepts like async/await, ES6+, and more.",
    instructor: "Alan Turing",
    category: "Web Development",
    level: "Beginner",
    duration: "30 hours",
    price: 45.99,
    image_url: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    created_at: "2023-04-05T08:20:00Z",
    updated_at: "2023-07-05T15:10:00Z"
  },
  {
    id: "course5",
    title: "React Native Mobile App Development",
    description: "Build cross-platform mobile apps using React Native and JavaScript.",
    instructor: "Jessica Wang",
    category: "Mobile Development",
    level: "Intermediate",
    duration: "28 hours",
    price: 49.99,
    image_url: "https://images.unsplash.com/photo-1542641371-f2a51b5a585a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    created_at: "2023-05-22T11:00:00Z",
    updated_at: "2023-08-12T09:25:00Z"
  },
  {
    id: "course6",
    title: "Digital Marketing Masterclass",
    description: "Learn SEO, social media marketing, email campaigns, analytics and more.",
    instructor: "Robert Martinez",
    category: "Marketing",
    level: "Beginner",
    duration: "24 hours",
    price: 39.99,
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    created_at: "2023-06-18T14:30:00Z",
    updated_at: "2023-09-18T10:15:00Z"
  }
];

// Mock lessons
const MOCK_LESSONS = {
  "course1": [
    {
      id: "lesson1-1",
      course_id: "course1",
      title: "Introduction to HTML",
      content: "Learn the basics of HTML and start building your first webpage.",
      duration: "45:00",
      order_number: 1,
      type: "video"
    },
    {
      id: "lesson1-2",
      course_id: "course1",
      title: "CSS Fundamentals",
      content: "Styling your HTML with CSS to create beautiful web pages.",
      duration: "1:15:00",
      order_number: 2,
      type: "video"
    },
    {
      id: "lesson1-3",
      course_id: "course1",
      title: "JavaScript Basics",
      content: "Introduction to programming with JavaScript to make your pages interactive.",
      duration: "1:30:00",
      order_number: 3,
      type: "video"
    },
    {
      id: "lesson1-4",
      course_id: "course1",
      title: "Building Your First Website",
      content: "Combine HTML, CSS and JavaScript to build a complete website.",
      duration: "2:00:00",
      order_number: 4,
      type: "document"
    },
    {
      id: "lesson1-5",
      course_id: "course1",
      title: "Introduction to React",
      content: "Getting started with the React framework for building user interfaces.",
      duration: "1:45:00",
      order_number: 5,
      type: "video"
    },
    {
      id: "lesson1-6",
      course_id: "course1",
      title: "Working with APIs",
      content: "Learn how to connect your application to external services using APIs.",
      duration: "1:20:00",
      order_number: 6,
      type: "video"
    }
  ]
};

// Mock reviews
const MOCK_REVIEWS = {
  "course1": [
    {
      id: "review1",
      course_id: "course1",
      user_id: "user1",
      rating: 5,
      comment: "Excellent course, very comprehensive and well-structured!",
      created_at: "2023-06-10T08:25:00Z"
    },
    {
      id: "review2",
      course_id: "course1",
      user_id: "user2",
      rating: 4,
      comment: "Great content, but could use more exercises.",
      created_at: "2023-07-15T14:30:00Z"
    }
  ]
};

export const useCourses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all courses (using mock data)
  const { data: courses = [], isLoading: isLoadingCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      // Simulate network delay for realistic behavior
      await new Promise(resolve => setTimeout(resolve, 300));
      return MOCK_COURSES as Course[];
    },
  });

  // Fetch a single course by ID (using mock data)
  const getCourse = async (courseId: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const course = MOCK_COURSES.find(c => c.id === courseId);
    
    if (!course) {
      toast({
        title: "Error fetching course",
        description: "Course not found",
        variant: "destructive",
      });
      return null;
    }
    
    const lessons = MOCK_LESSONS[courseId as keyof typeof MOCK_LESSONS] || [];
    const reviews = MOCK_REVIEWS[courseId as keyof typeof MOCK_REVIEWS] || [];
    
    return {
      ...course,
      lessons,
      course_reviews: reviews
    };
  };

  // Create a new course (mocked)
  const createCourseMutation = useMutation({
    mutationFn: async (course: Omit<Course, "id">) => {
      if (!user) {
        throw new Error("You must be logged in to create a course");
      }

      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create a new course with generated ID
      const newCourse = {
        ...course,
        id: `course${MOCK_COURSES.length + 1}`,
        instructor: user.id, // Use the current user's ID as the instructor
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // In a real app, we would push to the database here
      // Instead, we'll just return the new course
      return newCourse;
    },
    onSuccess: () => {
      toast({
        title: "Course created",
        description: "Your course has been created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create course",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  // Update an existing course (mocked)
  const updateCourseMutation = useMutation({
    mutationFn: async ({ courseId, courseData }: { courseId: string; courseData: Partial<Course> }) => {
      if (!user) {
        throw new Error("You must be logged in to update a course");
      }

      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const course = MOCK_COURSES.find(c => c.id === courseId);
      
      if (!course) {
        throw new Error("Course not found");
      }
      
      // Update the course
      const updatedCourse = {
        ...course,
        ...courseData,
        updated_at: new Date().toISOString()
      };
      
      return updatedCourse;
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Course updated",
        description: "Course has been updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course", variables.courseId] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update course",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  // Delete a course (mocked)
  const deleteCourseMutation = useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) {
        throw new Error("You must be logged in to delete a course");
      }

      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const course = MOCK_COURSES.find(c => c.id === courseId);
      
      if (!course) {
        throw new Error("Course not found");
      }
      
      return courseId;
    },
    onSuccess: () => {
      toast({
        title: "Course deleted",
        description: "Course has been deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete course",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  // Enroll in a course (mocked)
  const enrollCourseMutation = useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) {
        throw new Error("You must be logged in to enroll in a course");
      }

      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const course = MOCK_COURSES.find(c => c.id === courseId);
      
      if (!course) {
        throw new Error("Course not found");
      }
      
      // In a real app, we would create an enrollment record here
      const enrollment = {
        id: `enrollment-${Date.now()}`,
        user_id: user.id,
        course_id: courseId,
        enrolled_at: new Date().toISOString()
      };
      
      return enrollment;
    },
    onSuccess: () => {
      toast({
        title: "Enrolled successfully",
        description: "You have been enrolled in the course",
      });
      queryClient.invalidateQueries({ queryKey: ["user-courses"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to enroll",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  return {
    courses,
    isLoadingCourses,
    isLoading,
    getCourse,
    createCourse: createCourseMutation.mutate,
    updateCourse: updateCourseMutation.mutate,
    deleteCourse: deleteCourseMutation.mutate,
    enrollCourse: enrollCourseMutation.mutate,
  };
};
