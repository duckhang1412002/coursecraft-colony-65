
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useVoting, type VoteType } from "@/hooks/useVoting";

interface VotingButtonsProps {
  courseId: string;
  className?: string;
  size?: "sm" | "default" | "lg";
  showCounts?: boolean;
}

const VotingButtons = ({ 
  courseId, 
  className, 
  size = "default",
  showCounts = true 
}: VotingButtonsProps) => {
  const { userVote, voteCounts, vote, isVoting } = useVoting(courseId);

  const handleVote = (voteType: VoteType) => {
    // If user clicks the same vote type, remove the vote
    const newVoteType = userVote === voteType ? null : voteType;
    vote(newVoteType);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant={userVote === "up" ? "default" : "outline"}
        size={size}
        onClick={() => handleVote("up")}
        disabled={isVoting}
        className={cn(
          "flex items-center gap-1",
          userVote === "up" && "bg-green-600 hover:bg-green-700"
        )}
      >
        <ThumbsUp className={cn(
          "h-4 w-4",
          size === "sm" && "h-3 w-3",
          size === "lg" && "h-5 w-5"
        )} />
        {showCounts && <span>{voteCounts.upvotes}</span>}
      </Button>

      <Button
        variant={userVote === "down" ? "default" : "outline"}
        size={size}
        onClick={() => handleVote("down")}
        disabled={isVoting}
        className={cn(
          "flex items-center gap-1",
          userVote === "down" && "bg-red-600 hover:bg-red-700"
        )}
      >
        <ThumbsDown className={cn(
          "h-4 w-4",
          size === "sm" && "h-3 w-3",
          size === "lg" && "h-5 w-5"
        )} />
        {showCounts && <span>{voteCounts.downvotes}</span>}
      </Button>
    </div>
  );
};

export default VotingButtons;
