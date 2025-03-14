
import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
  className?: string;
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
  image,
  className,
}: CourseCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get level badge color
  const getLevelColor = () => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Intermediate": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Advanced": return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default: return "";
    }
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 h-full",
        isHovered && "shadow-lg translate-y-[-4px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered && "scale-105"
          )}
        />
        <Badge 
          className={cn(
            "absolute top-3 right-3 font-medium",
            getLevelColor()
          )}
        >
          {level}
        </Badge>
      </div>
      
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-secondary/50">
            {category}
          </Badge>
          <div className="flex items-center text-amber-500">
            <Star className="h-4 w-4 fill-current mr-1" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <Link to={`/course/${id}`}>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground line-clamp-2 text-sm mb-4">
          {description}
        </p>
        
        <p className="text-sm font-medium mb-4">
          By {instructor}
        </p>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{students.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-5 pb-5 pt-0">
        <Button className="w-full" asChild>
          <Link to={`/course/${id}`}>View Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
