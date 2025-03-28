
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import type { Lesson } from "@/types/course";

export const useLessons = (courseId?: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch lessons for a course
  const { data: lessons = [], isLoading: isLoadingLessons } = useQuery({
    queryKey: ["lessons", courseId],
    queryFn: async () => {
      if (!courseId) return [];

      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId)
        .order("order_number", { ascending: true });

      if (error) {
        toast({
          title: "Error fetching lessons",
          description: error.message,
          variant: "destructive",
        });
        return [];
      }

      return data as Lesson[];
    },
    enabled: !!courseId,
  });

  // Create a new lesson
  const createLessonMutation = useMutation({
    mutationFn: async (lesson: Omit<Lesson, "id">) => {
      if (!user) {
        throw new Error("You must be logged in to create a lesson");
      }

      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("lessons")
        .insert(lesson)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Lesson created",
        description: "Your lesson has been created successfully",
      });
      if (courseId) {
        queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
        queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create lesson",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  // Update an existing lesson
  const updateLessonMutation = useMutation({
    mutationFn: async ({ lessonId, lessonData }: { lessonId: string; lessonData: Partial<Lesson> }) => {
      if (!user) {
        throw new Error("You must be logged in to update a lesson");
      }

      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("lessons")
        .update(lessonData)
        .eq("id", lessonId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Lesson updated",
        description: "Lesson has been updated successfully",
      });
      if (courseId) {
        queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
        queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to update lesson",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  // Delete a lesson
  const deleteLessonMutation = useMutation({
    mutationFn: async (lessonId: string) => {
      if (!user) {
        throw new Error("You must be logged in to delete a lesson");
      }

      setIsLoading(true);
      
      const { error } = await supabase
        .from("lessons")
        .delete()
        .eq("id", lessonId);

      if (error) {
        throw new Error(error.message);
      }

      return lessonId;
    },
    onSuccess: () => {
      toast({
        title: "Lesson deleted",
        description: "Lesson has been deleted successfully",
      });
      if (courseId) {
        queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
        queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete lesson",
        description: error.message,
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  return {
    lessons,
    isLoadingLessons,
    isLoading,
    createLesson: createLessonMutation.mutate,
    updateLesson: updateLessonMutation.mutate,
    deleteLesson: deleteLessonMutation.mutate,
  };
};
