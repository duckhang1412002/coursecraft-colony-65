import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Users, Star, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import VotingButtons from "./VotingButtons";

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
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedTitle, setTranslatedTitle] = useState<string | null>(null);
  const [translatedDescription, setTranslatedDescription] = useState<string | null>(null);
  const { language, t } = useLanguage();
  const { toast } = useToast();

  // Get level badge color
  const getLevelColor = () => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Intermediate": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Advanced": return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default: return "";
    }
  };

  const translateContent = async () => {
    if (isTranslating) return;

    try {
      setIsTranslating(true);
      
      // Only translate if current language is not English
      if (language !== "en") {
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: [title, description],
            target: language,
            format: "text"
          })
        });

        const data = await response.json();
        
        if (data.data && data.data.translations) {
          setTranslatedTitle(data.data.translations[0].translatedText);
          setTranslatedDescription(data.data.translations[1].translatedText);
          toast({
            title: t("courses.translationSuccess"),
            description: t("courses.translationCompleted"),
          });
        } else {
          throw new Error("Translation failed");
        }
      } else {
        // Reset translations when language is English
        setTranslatedTitle(null);
        setTranslatedDescription(null);
      }
    } catch (error) {
      console.error("Translation error:", error);
      toast({
        title: t("courses.translationError"),
        description: t("courses.translationFailed"),
        variant: "destructive"
      });
    } finally {
      setIsTranslating(false);
    }
  };

  // Determine which content to display
  const displayTitle = translatedTitle || title;
  const displayDescription = translatedDescription || description;

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
          alt={displayTitle}
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
        
        {language !== "en" && (
          <Button 
            size="icon" 
            variant="secondary" 
            className="absolute top-3 left-3 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              translateContent();
            }}
            disabled={isTranslating}
          >
            <RefreshCw className={cn(
              "h-4 w-4", 
              isTranslating && "animate-spin"
            )} />
            <span className="sr-only">{t("courses.translate")}</span>
          </Button>
        )}
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
        
        <Link to={`/courses/${id}`}>
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
            {displayTitle}
          </h3>
        </Link>
        
        <p className="text-muted-foreground line-clamp-2 text-sm mb-4">
          {displayDescription}
        </p>
        
        <p className="text-sm font-medium mb-4">
          {t("courses.instructor")}: {instructor}
        </p>
        
        <div className="flex items-center justify-between mb-4">
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
          
          <VotingButtons 
            courseId={id} 
            size="sm" 
            showCounts={false}
            className="ml-auto"
          />
        </div>
      </CardContent>
      
      <CardFooter className="px-5 pb-5 pt-0">
        <Button className="w-full" asChild>
          <Link to={`/courses/${id}`}>{t("courses.viewCourse")}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
