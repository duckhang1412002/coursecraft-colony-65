
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { Course } from "@/types/course";

export const useCourses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all courses
  const { data: courses = [], isLoading: isLoadingCourses } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast({
          title: "Error fetching courses",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data as Course[];
    },
  });

  // Fetch a single course by ID
  const getCourse = async (courseId: string) => {
    const { data, error } = await supabase
      .from("courses")
      .select(`
        *,
        lessons: lessons(*),
        course_reviews: course_reviews(*)
      `)
      .eq("id", courseId)
      .single();

    if (error) {
      toast({
        title: "Error fetching course",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }

    return data;
  };

  // Create a new course
  const createCourseMutation = useMutation({
    mutationFn: async (course: Omit<Course, "id">) => {
      if (!user) {
        throw new Error("You must be logged in to create a course");
      }

      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("courses")
        .insert({
          ...course,
          instructor: user.id // Use the current user's ID as the instructor
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
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

  // Update an existing course
  const updateCourseMutation = useMutation({
    mutationFn: async ({ courseId, courseData }: { courseId: string; courseData: Partial<Course> }) => {
      if (!user) {
        throw new Error("You must be logged in to update a course");
      }

      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("courses")
        .update(courseData)
        .eq("id", courseId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
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

  // Delete a course
  const deleteCourseMutation = useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) {
        throw new Error("You must be logged in to delete a course");
      }

      setIsLoading(true);
      
      const { error } = await supabase
        .from("courses")
        .delete()
        .eq("id", courseId);

      if (error) {
        throw new Error(error.message);
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

  // Enroll in a course
  const enrollCourseMutation = useMutation({
    mutationFn: async (courseId: string) => {
      if (!user) {
        throw new Error("You must be logged in to enroll in a course");
      }

      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("user_courses")
        .insert({
          user_id: user.id,
          course_id: courseId,
        })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
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
