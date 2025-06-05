
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface VoteData {
  courseId: string;
  userId: string;
  rating: number; // 1-5 stars
  comment: string;
  timestamp: string;
}

// Mock votes storage (in a real app, this would be in a database)
const MOCK_VOTES: Record<string, VoteData[]> = {};

export const useVoting = (courseId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isVoting, setIsVoting] = useState(false);

  // Get current user's vote for this course
  const getUserVote = (): VoteData | null => {
    if (!user || !MOCK_VOTES[courseId]) return null;
    
    const userVote = MOCK_VOTES[courseId].find(vote => vote.userId === user.id);
    return userVote || null;
  };

  // Get average rating for the course
  const getAverageRating = () => {
    if (!MOCK_VOTES[courseId] || MOCK_VOTES[courseId].length === 0) {
      return 0;
    }

    const votes = MOCK_VOTES[courseId];
    const totalRating = votes.reduce((sum, vote) => sum + vote.rating, 0);
    return totalRating / votes.length;
  };

  // Get total number of ratings
  const getTotalRatings = () => {
    if (!MOCK_VOTES[courseId]) return 0;
    return MOCK_VOTES[courseId].length;
  };

  // Get rating distribution (how many 1-star, 2-star, etc.)
  const getRatingDistribution = () => {
    if (!MOCK_VOTES[courseId]) {
      return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    }

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    MOCK_VOTES[courseId].forEach(vote => {
      if (vote.rating >= 1 && vote.rating <= 5) {
        distribution[vote.rating as keyof typeof distribution]++;
      }
    });

    return distribution;
  };

  // Get all comments for the course
  const getComments = () => {
    if (!MOCK_VOTES[courseId]) return [];
    
    return MOCK_VOTES[courseId]
      .filter(vote => vote.comment.trim() !== "")
      .map(vote => ({
        userId: vote.userId,
        rating: vote.rating,
        comment: vote.comment,
        timestamp: vote.timestamp
      }));
  };

  // Submit a rating with optional comment
  const vote = async (rating: number, comment: string = "") => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to rate this course",
        variant: "destructive",
      });
      return;
    }

    if (rating < 1 || rating > 5) {
      toast({
        title: "Invalid Rating",
        description: "Rating must be between 1 and 5 stars",
        variant: "destructive",
      });
      return;
    }

    setIsVoting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Initialize votes array for course if it doesn't exist
      if (!MOCK_VOTES[courseId]) {
        MOCK_VOTES[courseId] = [];
      }

      // Remove existing vote from this user
      MOCK_VOTES[courseId] = MOCK_VOTES[courseId].filter(
        vote => vote.userId !== user.id
      );

      // Add new vote
      MOCK_VOTES[courseId].push({
        courseId,
        userId: user.id,
        rating,
        comment,
        timestamp: new Date().toISOString()
      });

      toast({
        title: "Rating Submitted",
        description: `You rated this course ${rating} star${rating !== 1 ? 's' : ''}`,
      });

    } catch (error) {
      console.error("Rating error:", error);
      toast({
        title: "Rating Failed",
        description: "There was an error submitting your rating",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  return {
    userVote: getUserVote(),
    averageRating: getAverageRating(),
    totalRatings: getTotalRatings(),
    ratingDistribution: getRatingDistribution(),
    comments: getComments(),
    vote,
    isVoting
  };
};
