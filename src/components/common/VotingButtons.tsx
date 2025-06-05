
import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useVoting } from "@/hooks/useVoting";

interface VotingButtonsProps {
  courseId: string;
  className?: string;
  size?: "sm" | "default" | "lg";
  showCount?: boolean;
  showDetailed?: boolean;
  variant?: "horizontal" | "compact";
  isCompleted?: boolean; // New prop to check if course is 100% completed
}

const VotingButtons = ({ 
  courseId, 
  className, 
  size = "default",
  showCount = true,
  showDetailed = false,
  variant = "horizontal",
  isCompleted = false
}: VotingButtonsProps) => {
  const { userVote, averageRating, totalRatings, vote, isVoting } = useVoting(courseId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(userVote?.rating || 0);
  const [comment, setComment] = useState(userVote?.comment || "");
  const [hoverRating, setHoverRating] = useState(0);

  const handleQuickRating = (rating: number) => {
    if (!isCompleted) return;
    vote(rating);
  };

  const submitDetailedRating = () => {
    if (!isCompleted) return;
    vote(selectedRating, comment);
    setIsDialogOpen(false);
  };

  const renderStars = (rating: number, interactive: boolean = false, onClick?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "transition-colors",
              size === "sm" && "h-4 w-4",
              size === "default" && "h-5 w-5", 
              size === "lg" && "h-6 w-6",
              interactive && isCompleted && "cursor-pointer hover:scale-110 transition-transform",
              !interactive || !isCompleted && "cursor-default",
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            )}
            onClick={() => interactive && isCompleted && onClick?.(star)}
            onMouseEnter={() => interactive && isCompleted && setHoverRating(star)}
            onMouseLeave={() => interactive && isCompleted && setHoverRating(0)}
          />
        ))}
      </div>
    );
  };

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {renderStars(userVote?.rating || (isCompleted ? hoverRating : 0), isCompleted, handleQuickRating)}
        {showCount && totalRatings > 0 && (
          <span className="text-sm text-muted-foreground">
            ({totalRatings})
          </span>
        )}
        {!isCompleted && (
          <span className="text-xs text-muted-foreground">
            Complete course to rate
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-2">
        {renderStars(averageRating)}
        {showCount && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{averageRating.toFixed(1)}</span>
            {totalRatings > 0 && (
              <span className="ml-1">({totalRatings} rating{totalRatings !== 1 ? 's' : ''})</span>
            )}
          </div>
        )}
      </div>

      {!isCompleted ? (
        <span className="text-sm text-muted-foreground">
          Complete course to rate
        </span>
      ) : userVote ? (
        <Button variant="outline" size={size} disabled>
          You rated {userVote.rating} star{userVote.rating !== 1 ? 's' : ''}
        </Button>
      ) : (
        <>
          <div className="flex items-center gap-1">
            {renderStars(hoverRating, true, handleQuickRating)}
          </div>
          
          {showDetailed && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size={size}>
                  Write Review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rate and Review Course</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Your Rating</Label>
                    <div className="mt-2 flex items-center gap-1">
                      {renderStars(selectedRating || hoverRating, true, setSelectedRating)}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="comment">Review (optional)</Label>
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
                    <Button 
                      onClick={submitDetailedRating} 
                      disabled={selectedRating === 0 || isVoting}
                    >
                      {isVoting ? "Submitting..." : "Submit Rating"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </>
      )}
    </div>
  );
};

export default VotingButtons;
