
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export type VoteType = "up" | "down" | null;

interface VoteData {
  courseId: string;
  userId: string;
  voteType: VoteType;
  timestamp: string;
}

// Mock votes storage (in a real app, this would be in a database)
const MOCK_VOTES: Record<string, VoteData[]> = {};

export const useVoting = (courseId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isVoting, setIsVoting] = useState(false);

  // Get current user's vote for this course
  const getUserVote = (): VoteType => {
    if (!user || !MOCK_VOTES[courseId]) return null;
    
    const userVote = MOCK_VOTES[courseId].find(vote => vote.userId === user.id);
    return userVote?.voteType || null;
  };

  // Get vote counts for the course
  const getVoteCounts = () => {
    if (!MOCK_VOTES[courseId]) {
      return { upvotes: 0, downvotes: 0 };
    }

    const votes = MOCK_VOTES[courseId];
    const upvotes = votes.filter(vote => vote.voteType === "up").length;
    const downvotes = votes.filter(vote => vote.voteType === "down").length;

    return { upvotes, downvotes };
  };

  // Cast a vote
  const vote = async (voteType: VoteType) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to vote",
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

      // Add new vote if it's not null (null means removing vote)
      if (voteType) {
        MOCK_VOTES[courseId].push({
          courseId,
          userId: user.id,
          voteType,
          timestamp: new Date().toISOString()
        });
      }

      toast({
        title: "Vote Recorded",
        description: voteType 
          ? `You ${voteType === "up" ? "upvoted" : "downvoted"} this course`
          : "Your vote has been removed",
      });

    } catch (error) {
      console.error("Voting error:", error);
      toast({
        title: "Voting Failed",
        description: "There was an error recording your vote",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  return {
    userVote: getUserVote(),
    voteCounts: getVoteCounts(),
    vote,
    isVoting
  };
};
