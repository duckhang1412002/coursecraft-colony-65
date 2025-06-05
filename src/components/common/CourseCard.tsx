import { Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import FadeIn from "@/components/animation/FadeIn";
import VotingButtons from "@/components/common/VotingButtons";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  students: number;
  rating: number;
  image: string;
}

const CourseCard = ({ 
  id, 
  title, 
  description, 
  instructor, 
  category, 
  level, 
  duration, 
  students, 
  rating, 
  image 
}: CourseCardProps) => {
  return (
    <FadeIn>
      <Link to={`/courses/${id}`}>
        <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 group">
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardContent className="p-6 flex flex-col h-[calc(100%-200px)]">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {level}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
              {description}
            </p>
            
            <div className="mt-auto space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${instructor}`} />
                  <AvatarFallback>{instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="truncate">{instructor}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{students.toLocaleString()}</span>
                </div>
              </div>
              
              <VotingButtons 
                courseId={id} 
                displayOnly={true}
                variant="compact"
                size="sm"
                showCount={true}
              />
            </div>
          </CardContent>
        </Card>
      </Link>
    </FadeIn>
  );
};

export default CourseCard;
