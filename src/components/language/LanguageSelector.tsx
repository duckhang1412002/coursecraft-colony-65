
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const [showAlert, setShowAlert] = useState(false);

  const handleLanguageChange = (newLanguage: "en" | "vi") => {
    setLanguage(newLanguage);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  return (
    <>
      {showAlert && (
        <Alert className="fixed top-20 right-4 w-auto z-50 animate-in fade-in-0 bg-primary/10 border-primary/20">
          <AlertDescription>
            {language === "en" ? "Language changed to English" : "Đã chuyển sang Tiếng Việt"}
          </AlertDescription>
        </Alert>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label={t("language.select")}>
            <Globe className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            onClick={() => handleLanguageChange("en")}
            className={language === "en" ? "bg-accent" : ""}
          >
            {t("language.en")}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleLanguageChange("vi")}
            className={language === "vi" ? "bg-accent" : ""}
          >
            {t("language.vi")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default LanguageSelector;
