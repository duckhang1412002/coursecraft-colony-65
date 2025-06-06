
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogIn, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/language/LanguageSelector";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useLanguage();

  // Update scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-8",
        isScrolled 
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-semibold transition-opacity hover:opacity-80"
        >
          <BookOpen className="h-6 w-6 text-primary" />
          <span>MECR DEMO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-all hover:text-primary",
              location.pathname === "/" && "text-primary"
            )}
          >
            {t("nav.home")}
          </Link>
          <Link 
            to="/courses" 
            className={cn(
              "text-sm font-medium transition-all hover:text-primary",
              location.pathname === "/courses" && "text-primary"
            )}
          >
            {t("nav.courses")}
          </Link>
          {isAuthenticated && (
            <Link 
              to="/dashboard" 
              className={cn(
                "text-sm font-medium transition-all hover:text-primary",
                location.pathname === "/dashboard" && "text-primary"
              )}
            >
              {t("nav.dashboard")}
            </Link>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSelector />
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={logout}>{t("nav.signOut")}</Button>
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="ghost" size="sm">{t("nav.signIn")}</Button>
              </Link>
              <Link to="/sign-up">
                <Button>{t("nav.signUp")}</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSelector />
          <button
            className="p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 p-4 bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg border-t">
          <nav className="flex flex-col space-y-4 py-4">
            <Link 
              to="/" 
              className={cn(
                "text-base font-medium p-2 transition-all hover:text-primary hover:bg-muted rounded-md",
                location.pathname === "/" && "text-primary bg-muted"
              )}
            >
              {t("nav.home")}
            </Link>
            <Link 
              to="/courses" 
              className={cn(
                "text-base font-medium p-2 transition-all hover:text-primary hover:bg-muted rounded-md",
                location.pathname === "/courses" && "text-primary bg-muted"
              )}
            >
              {t("nav.courses")}
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className={cn(
                  "text-base font-medium p-2 transition-all hover:text-primary hover:bg-muted rounded-md",
                  location.pathname === "/dashboard" && "text-primary bg-muted"
                )}
              >
                {t("nav.dashboard")}
              </Link>
            )}
            <div className="border-t pt-4 mt-2">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="flex items-center p-2 space-x-2 font-medium hover:bg-muted rounded-md">
                    <User className="h-5 w-5" />
                    <span>{t("nav.myAccount")}</span>
                  </Link>
                  <button 
                    onClick={logout} 
                    className="w-full text-left flex items-center p-2 space-x-2 font-medium text-destructive hover:bg-muted rounded-md"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>{t("nav.signOut")}</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/sign-in" className="flex items-center p-2 space-x-2 font-medium hover:bg-muted rounded-md">
                    <LogIn className="h-5 w-5" />
                    <span>{t("nav.signIn")}</span>
                  </Link>
                  <Link to="/sign-up" className="flex items-center p-2 space-x-2 font-medium text-primary hover:bg-muted rounded-md">
                    <User className="h-5 w-5" />
                    <span>{t("nav.signUp")}</span>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
