
import { useState } from "react";
import { ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useVoting, type VoteType } from "@/hooks/useVoting";

interface VotingButtonsProps {
  courseId: string;
  className?: string;
  size?: "sm" | "default" | "lg";
  showCounts?: boolean;
  showRating?: boolean;
  showComments?: boolean;
}

const VotingButtons = ({ 
  courseId, 
  className, 
  size = "default",
  showCounts = true,
  showRating = false,
  showComments = false
}: VotingButtonsProps) => {
  const { userVote, voteCounts, averageRating, comments, vote, isVoting } = useVoting(courseId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVoteType, setSelectedVoteType] = useState<VoteType>(null);
  const [rating, setRating] = useState(userVote?.rating || 0);
  const [comment, setComment] = useState(userVote?.comment || "");

  const handleQuickVote = (voteType: VoteType) => {
    // If user clicks the same vote type, remove the vote
    const newVoteType = userVote?.voteType === voteType ? null : voteType;
    vote(newVoteType, userVote?.rating || 0, userVote?.comment || "");
  };

  const handleVoteWithDetails = (voteType: VoteType) => {
    setSelectedVoteType(voteType);
    setIsDialogOpen(true);
  };

  const submitVote = () => {
    vote(selectedVoteType, rating, comment);
    setIsDialogOpen(false);
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-5 w-5 cursor-pointer transition-colors",
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 hover:text-yellow-200"
            )}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        variant={userVote?.voteType === "up" ? "default" : "outline"}
        size={size}
        onClick={() => handleQuickVote("up")}
        disabled={isVoting}
        className={cn(
          "flex items-center gap-1",
          userVote?.voteType === "up" && "bg-green-600 hover:bg-green-700"
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
        variant={userVote?.voteType === "down" ? "default" : "outline"}
        size={size}
        onClick={() => handleQuickVote("down")}
        disabled={isVoting}
        className={cn(
          "flex items-center gap-1",
          userVote?.voteType === "down" && "bg-red-600 hover:bg-red-700"
        )}
      >
        <ThumbsDown className={cn(
          "h-4 w-4",
          size === "sm" && "h-3 w-3",
          size === "lg" && "h-5 w-5"
        )} />
        {showCounts && <span>{voteCounts.downvotes}</span>}
      </Button>

      {(showRating || showComments) && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size={size}>
              Rate & Review
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rate and Review Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Vote Type</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={selectedVoteType === "up" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVoteType("up")}
                    className={selectedVoteType === "up" ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Upvote
                  </Button>
                  <Button
                    variant={selectedVoteType === "down" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVoteType("down")}
                    className={selectedVoteType === "down" ? "bg-red-600 hover:bg-red-700" : ""}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Downvote
                  </Button>
                </div>
              </div>

              <div>
                <Label>Rating (1-5 stars)</Label>
                <div className="mt-2">
                  {renderStarRating()}
                </div>
              </div>

              <div>
                <Label htmlFor="comment">Comment (optional)</Label>
                <Textarea
                  id="comment"
                  placeholder="Share your thoughts about this course..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={submitVote} disabled={!selectedVoteType}>
                  Submit Vote
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {showRating && averageRating > 0 && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span>{averageRating.toFixed(1)}</span>
        </div>
      )}
    </div>
  );
};

export default VotingButtons;
