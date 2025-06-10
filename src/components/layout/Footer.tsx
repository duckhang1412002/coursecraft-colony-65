
import { Link } from "react-router-dom";
import { BookOpen, Github, Twitter, Instagram } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import FadeIn from "@/components/animation/FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-muted/30 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <Link to="/" className="flex items-center space-x-2 text-xl font-semibold mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <span>LearnWave</span>
              </Link>
              <p className="text-muted-foreground text-sm mb-6">
                Premium e-learning platform for students and teachers. Expand your knowledge with our curated courses.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4">{t("footer.platform")}</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/courses" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("courses.browse")}
                  </Link>
                </li>
                <li>
                  <Link to="/sign-up" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("auth.student")}
                  </Link>
                </li>
                <li>
                  <Link to="/sign-up" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("auth.teacher")}
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("courses.price")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">{t("footer.resources")}</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("footer.help")}
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("footer.blog")}
                  </Link>
                </li>
                <li>
                  <Link to="/tutorials" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("courses.lessons")}
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("footer.faq")}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-4">{t("footer.legal")}</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("footer.terms")}
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {t("footer.privacy")}
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>

        <Separator className="mb-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>© {currentYear} LearnWave. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
