
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Plus, Trash2, FileText, Image, Upload } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FadeIn from "@/components/animation/FadeIn";

const COURSE_CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Design",
  "Business",
  "Marketing",
  "Photography",
  "Music",
  "Health & Fitness",
];

const COURSE_LEVELS = ["Beginner", "Intermediate", "Advanced"];

const CourseCreation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Course details state
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: "",
    duration: "",
    thumbnail: "",
  });
  
  // Course content state
  const [sections, setSections] = useState([
    { 
      id: "section-1", 
      title: "Introduction", 
      lessons: [
        { id: "lesson-1", title: "Welcome", type: "video", content: "", duration: "5:00" }
      ] 
    }
  ]);
  
  const handleCourseDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourseDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setCourseDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const addSection = () => {
    setSections(prev => [
      ...prev, 
      { 
        id: `section-${prev.length + 1}`, 
        title: `Section ${prev.length + 1}`, 
        lessons: [] 
      }
    ]);
  };
  
  const addLesson = (sectionId: string) => {
    setSections(prev => 
      prev.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            lessons: [
              ...section.lessons,
              {
                id: `lesson-${section.lessons.length + 1}`,
                title: `New Lesson`,
                type: "video",
                content: "",
                duration: "0:00"
              }
            ]
          };
        }
        return section;
      })
    );
  };
  
  const deleteSection = (sectionId: string) => {
    setSections(prev => prev.filter(section => section.id !== sectionId));
  };
  
  const deleteLesson = (sectionId: string, lessonId: string) => {
    setSections(prev => 
      prev.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            lessons: section.lessons.filter(lesson => lesson.id !== lessonId)
          };
        }
        return section;
      })
    );
  };
  
  const updateSectionTitle = (sectionId: string, newTitle: string) => {
    setSections(prev => 
      prev.map(section => {
        if (section.id === sectionId) {
          return { ...section, title: newTitle };
        }
        return section;
      })
    );
  };
  
  const updateLessonDetails = (sectionId: string, lessonId: string, field: string, value: string) => {
    setSections(prev => 
      prev.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            lessons: section.lessons.map(lesson => {
              if (lesson.id === lessonId) {
                return { ...lesson, [field]: value };
              }
              return lesson;
            })
          };
        }
        return section;
      })
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!courseDetails.title || !courseDetails.description || !courseDetails.category || !courseDetails.level) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Simulate API call to create course
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Course Created",
        description: "Your course has been created successfully",
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating course:", error);
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 py-8 md:py-12">
        <FadeIn>
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
              <p className="text-muted-foreground">
                Create and publish your course in a few simple steps
              </p>
            </div>
          </div>
          
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Course Details</TabsTrigger>
              <TabsTrigger value="content">Course Content</TabsTrigger>
            </TabsList>
            
            {/* Course Details Tab */}
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Provide essential information about your course
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">
                          Course Title <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="e.g., Complete JavaScript Course"
                          value={courseDetails.title}
                          onChange={handleCourseDetailsChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={courseDetails.category}
                          onValueChange={(value) => handleSelectChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {COURSE_CATEGORIES.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Provide a detailed description of your course..."
                        rows={5}
                        value={courseDetails.description}
                        onChange={handleCourseDetailsChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <label htmlFor="level" className="text-sm font-medium">
                          Difficulty Level <span className="text-red-500">*</span>
                        </label>
                        <Select
                          value={courseDetails.level}
                          onValueChange={(value) => handleSelectChange("level", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            {COURSE_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="price" className="text-sm font-medium">
                          Price ($)
                        </label>
                        <Input
                          id="price"
                          name="price"
                          placeholder="e.g., 49.99"
                          type="number"
                          min="0"
                          step="0.01"
                          value={courseDetails.price}
                          onChange={handleCourseDetailsChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="duration" className="text-sm font-medium">
                          Duration
                        </label>
                        <Input
                          id="duration"
                          name="duration"
                          placeholder="e.g., 6 hours"
                          value={courseDetails.duration}
                          onChange={handleCourseDetailsChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Course Thumbnail
                      </label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-md p-6 flex flex-col items-center justify-center">
                        {courseDetails.thumbnail ? (
                          <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden">
                            <img
                              src={courseDetails.thumbnail}
                              alt="Course thumbnail"
                              className="w-full h-full object-cover"
                            />
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => setCourseDetails(prev => ({ ...prev, thumbnail: "" }))}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-sm text-muted-foreground mb-1">
                              Drag and drop an image or click to browse
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Recommended size: 1280x720px (16:9 ratio)
                            </p>
                            <Button variant="outline" className="mt-4">
                              <Image className="h-4 w-4 mr-2" />
                              Select Image
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => navigate("/dashboard")}>
                      Cancel
                    </Button>
                    <Button onClick={() => setActiveTab("content")}>
                      Continue to Course Content
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Course Content Tab */}
            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Course Curriculum</CardTitle>
                  <CardDescription>
                    Organize your course into sections and lessons
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {sections.map((section, sectionIndex) => (
                    <div key={section.id} className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex-1">
                          <Input
                            value={section.title}
                            onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                            className="font-medium"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSection(section.id)}
                          className="text-red-500 hover:text-red-700"
                          disabled={sections.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-3 pl-4">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div key={lesson.id} className="border-l pl-4 py-2">
                            <div className="flex items-center gap-3 mb-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <Input
                                value={lesson.title}
                                onChange={(e) => updateLessonDetails(section.id, lesson.id, "title", e.target.value)}
                                className="flex-1"
                                placeholder="Lesson title"
                              />
                              <Select
                                value={lesson.type}
                                onValueChange={(value) => updateLessonDetails(section.id, lesson.id, "type", value)}
                              >
                                <SelectTrigger className="w-[130px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="video">Video</SelectItem>
                                  <SelectItem value="text">Text</SelectItem>
                                  <SelectItem value="quiz">Quiz</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input
                                value={lesson.duration}
                                onChange={(e) => updateLessonDetails(section.id, lesson.id, "duration", e.target.value)}
                                className="w-[100px]"
                                placeholder="Duration"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteLesson(section.id, lesson.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addLesson(section.id)}
                          className="ml-4 mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Lesson
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    variant="outline"
                    onClick={addSection}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Section
                  </Button>
                  
                  <div className="flex justify-between gap-2 pt-4">
                    <Button variant="outline" onClick={() => setActiveTab("details")}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Details
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        Save as Draft
                      </Button>
                      <Button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></div>
                            Creating...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Publish Course
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </FadeIn>
      </main>
      
      <Footer />
    </>
  );
};

export default CourseCreation;
