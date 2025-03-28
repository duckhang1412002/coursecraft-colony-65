import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Shield, GraduationCap, Users, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import FadeIn from "@/components/animation/FadeIn";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CourseCard from "@/components/common/CourseCard";
import { useLanguage } from "@/context/LanguageContext";

// Mock featured courses
const FEATURED_COURSES = [
  {
    id: "course1",
    title: "Complete Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript, React, Node.js and more to become a full-stack web developer.",
    instructor: "Dr. Sarah Johnson",
    category: "Web Development",
    level: "Beginner" as const,
    duration: "48 hours",
    students: 12840,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "course2",
    title: "Advanced Data Science with Python",
    description: "Master data analysis, visualization, machine learning and AI with Python.",
    instructor: "Prof. Michael Chen",
    category: "Data Science",
    level: "Advanced" as const,
    duration: "36 hours",
    students: 8754,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "course3",
    title: "UX/UI Design Fundamentals",
    description: "Learn the principles of user experience and interface design to create beautiful products.",
    instructor: "Emma Rodriguez",
    category: "Design",
    level: "Intermediate" as const,
    duration: "24 hours",
    students: 6240,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

// Testimonials
const TESTIMONIALS = [
  {
    id: "1",
    content: "LearnWave transformed my career. The courses are well-structured and the teachers are industry experts. I landed my dream job after completing just two courses!",
    author: "Alex Richardson",
    role: "Software Engineer",
    company: "TechCorp",
    avatar: "https://i.pravatar.cc/150?u=alex"
  },
  {
    id: "2",
    content: "As a teacher on LearnWave, I'm impressed by the platform's ease of use and the engagement from students. The analytics tools help me improve my course content continuously.",
    author: "Maya Patel",
    role: "UX Design Instructor",
    company: "Design Masters",
    avatar: "https://i.pravatar.cc/150?u=maya"
  },
  {
    id: "3",
    content: "The quality of courses on LearnWave is outstanding. Clear explanations, practical projects, and responsive instructors. I've recommended it to all my colleagues.",
    author: "James Wilson",
    role: "Marketing Director",
    company: "Growth Labs",
    avatar: "https://i.pravatar.cc/150?u=james"
  }
];

// Course categories
const CATEGORIES = [
  { id: "1", name: "Programming", icon: <BookOpen className="h-5 w-5" />, count: 186 },
  { id: "2", name: "Design", icon: <BookOpen className="h-5 w-5" />, count: 142 },
  { id: "3", name: "Business", icon: <BookOpen className="h-5 w-5" />, count: 97 },
  { id: "4", name: "Marketing", icon: <BookOpen className="h-5 w-5" />, count: 76 },
  { id: "5", name: "Photography", icon: <BookOpen className="h-5 w-5" />, count: 58 },
  { id: "6", name: "Music", icon: <BookOpen className="h-5 w-5" />, count: 43 }
];

const Index = () => {
  const { t } = useLanguage();
  
  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroSection = document.getElementById("hero-background");
      if (heroSection) {
        heroSection.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-32">
        <div 
          id="hero-background"
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 z-0"
        />
        <div className="absolute inset-0 bg-grid-white/[0.02] z-0" />
        
        <div className="relative container mx-auto px-6 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn className="text-center lg:text-left">
              <Badge className="mb-4 text-xs px-3 py-1">{t("home.hero.features").split(",")[0]}</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                {t("home.hero.title")}
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                {t("home.hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild>
                  <Link to="/sign-up">{t("home.hero.getStarted")}</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/courses">{t("home.hero.exploreCourses")}</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-4 text-sm text-muted-foreground">
                {t("home.hero.features").split(",").map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-1.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={300} className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl blur-2xl opacity-70" />
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Students learning"
                  className="relative rounded-xl shadow-lg w-full max-w-md h-auto object-cover z-10"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">{t("home.stats.activeLearnersCount")}</h3>
                <p className="text-muted-foreground">{t("home.stats.activeLearnersTitle")}</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">{t("home.stats.expertInstructorsCount")}</h3>
                <p className="text-muted-foreground">{t("home.stats.expertInstructorsTitle")}</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">{t("home.stats.premiumCoursesCount")}</h3>
                <p className="text-muted-foreground">{t("home.stats.premiumCoursesTitle")}</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-primary mb-2">{t("home.stats.satisfactionRateCount")}</h3>
                <p className="text-muted-foreground">{t("home.stats.satisfactionRateTitle")}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3">{t("home.featuredCourses.title")}</Badge>
              <h2 className="text-3xl font-bold mb-4">{t("home.featuredCourses.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("home.featuredCourses.subtitle")}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURED_COURSES.map((course, index) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild variant="outline" size="lg">
                <Link to="/courses">
                  {t("home.featuredCourses.viewAll")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge className="mb-3">{t("home.features.title")}</Badge>
              <h2 className="text-3xl font-bold mb-4">{t("home.features.subtitle")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("home.features.description")}
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FadeIn delay={100}>
              <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t("home.features.expertInstructors.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("home.features.expertInstructors.description")}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={200}>
              <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t("home.features.flexibleLearning.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("home.features.flexibleLearning.description")}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={300}>
              <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t("home.features.verifiedCertificates.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("home.features.verifiedCertificates.description")}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={400}>
              <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t("home.features.communitySupport.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("home.features.communitySupport.description")}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={500}>
              <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t("home.features.qualityContent.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("home.features.qualityContent.description")}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={600}>
              <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t("home.features.careerAdvancement.title")}</h3>
                  <p className="text-muted-foreground">
                    {t("home.features.careerAdvancement.description")}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-3">{t("courses.category")}</Badge>
              <h2 className="text-3xl font-bold mb-4">{t("home.categories.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("home.categories.subtitle")}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {CATEGORIES.map((category, index) => (
                <Link to="/courses" key={category.id}>
                  <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1">
                    <CardContent className="p-4 text-center">
                      <div className="mx-auto mb-2 rounded-full w-10 h-10 flex items-center justify-center bg-primary/10 text-primary">
                        {category.icon}
                      </div>
                      <h3 className="font-medium text-sm">{category.name}</h3>
                      <p className="text-xs text-muted-foreground">{category.count} {t("courses.lessons")}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <Badge className="mb-3">{t("home.testimonials.title")}</Badge>
              <h2 className="text-3xl font-bold mb-4">{t("home.testimonials.title")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t("home.testimonials.subtitle")}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <Tabs defaultValue="all" className="mx-auto max-w-4xl">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="all">{t("home.testimonials.all")}</TabsTrigger>
                <TabsTrigger value="students">{t("home.testimonials.students")}</TabsTrigger>
                <TabsTrigger value="teachers">{t("home.testimonials.teachers")}</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-6">
                {TESTIMONIALS.map((testimonial) => (
                  <Card key={testimonial.id} className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <div className="flex items-start">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <p className="italic mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                          <div>
                            <p className="font-medium">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="students" className="space-y-6">
                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <img 
                        src={TESTIMONIALS[0].avatar} 
                        alt={TESTIMONIALS[0].author} 
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <p className="italic mb-4">&ldquo;{TESTIMONIALS[0].content}&rdquo;</p>
                        <div>
                          <p className="font-medium">{TESTIMONIALS[0].author}</p>
                          <p className="text-sm text-muted-foreground">{TESTIMONIALS[0].role}, {TESTIMONIALS[0].company}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <img 
                        src={TESTIMONIALS[2].avatar} 
                        alt={TESTIMONIALS[2].author} 
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <p className="italic mb-4">&ldquo;{TESTIMONIALS[2].content}&rdquo;</p>
                        <div>
                          <p className="font-medium">{TESTIMONIALS[2].author}</p>
                          <p className="text-sm text-muted-foreground">{TESTIMONIALS[2].role}, {TESTIMONIALS[2].company}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="teachers" className="space-y-6">
                <Card className="border-none shadow-sm bg-card/50 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <img 
                        src={TESTIMONIALS[1].avatar} 
                        alt={TESTIMONIALS[1].author} 
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <p className="italic mb-4">&ldquo;{TESTIMONIALS[1].content}&rdquo;</p>
                        <div>
                          <p className="font-medium">{TESTIMONIALS[1].author}</p>
                          <p className="text-sm text-muted-foreground">{TESTIMONIALS[1].role}, {TESTIMONIALS[1].company}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] mix-blend-overlay opacity-20"></div>
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("home.cta.title")}</h2>
                <p className="text-primary-foreground/80 mb-8">
                  {t("home.cta.description")}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/sign-up">{t("home.cta.getStarted")}</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
                    <Link to="/courses">{t("home.cta.exploreCourses")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Index;
