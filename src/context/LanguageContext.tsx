
import { createContext, useState, useEffect, ReactNode, useContext } from "react";

// Define available languages
export type Language = "en" | "vi";

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

// Hook for using language context
export const useLanguage = () => useContext(LanguageContext);

// Define translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.courses": "Courses",
    "nav.dashboard": "Dashboard",
    "nav.signIn": "Sign In",
    "nav.signUp": "Sign Up",
    "nav.signOut": "Sign Out",
    "nav.myAccount": "My Account",
    
    // Auth
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.name": "Name",
    "auth.role": "Role",
    "auth.student": "Student",
    "auth.teacher": "Teacher",
    "auth.admin": "Admin",
    "auth.loginSuccess": "Login successful",
    "auth.loginFailed": "Login failed",
    "auth.registerSuccess": "Registration successful",
    "auth.registerFailed": "Registration failed",
    "auth.loggedOut": "You have been successfully logged out",
    "auth.welcomeBack": "Welcome back",
    "auth.createAccount": "Create an account",
    "auth.alreadyHaveAccount": "Already have an account?",
    "auth.dontHaveAccount": "Don't have an account?",
    "auth.forgotPassword": "Forgot password?",
    "auth.rememberMe": "Remember me",
    
    // Courses
    "courses.browse": "Browse Courses",
    "courses.create": "Create Course",
    "courses.enroll": "Enroll Now",
    "courses.addToCart": "Add to Cart",
    "courses.removeFromCart": "Remove from Cart",
    "courses.price": "Price",
    "courses.instructor": "Instructor",
    "courses.description": "Description",
    "courses.lessons": "Lessons",
    "courses.duration": "Duration",
    "courses.level": "Level",
    "courses.category": "Category",
    "courses.rating": "Rating",
    "courses.reviews": "Reviews",
    "courses.students": "Students",
    "courses.lastUpdated": "Last Updated",
    "courses.created": "Created",
    "courses.enrolledCourses": "Enrolled Courses",
    "courses.myCourses": "My Courses",
    "courses.popularCourses": "Popular Courses",
    "courses.featuredCourses": "Featured Courses",
    "courses.newCourses": "New Courses",
    "courses.searchCourses": "Search courses...",
    "courses.filterBy": "Filter by",
    "courses.sortBy": "Sort by",
    "courses.noCourses": "No courses found",
    "courses.viewAll": "View All",
    "courses.readMore": "Read More",
    "courses.startLearning": "Start Learning",
    "courses.continueLearning": "Continue Learning",
    "courses.completed": "Completed",
    "courses.in-progress": "In Progress",
    "courses.not-started": "Not Started",
    
    // Cart
    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty",
    "cart.total": "Total",
    "cart.checkout": "Checkout",
    "cart.remove": "Remove",
    "cart.continueShopping": "Continue Shopping",
    "cart.applyCoupon": "Apply Coupon",
    "cart.orderSummary": "Order Summary",
    "cart.items": "Items",
    "cart.subtotal": "Subtotal",
    "cart.discount": "Discount",
    "cart.tax": "Tax",
    
    // Dashboard
    "dashboard.welcome": "Welcome to your Dashboard",
    "dashboard.myCourses": "My Courses",
    "dashboard.progress": "Progress",
    "dashboard.stats": "Statistics",
    "dashboard.achievements": "Achievements",
    "dashboard.certificates": "Certificates",
    "dashboard.recentActivity": "Recent Activity",
    "dashboard.accountSettings": "Account Settings",
    "dashboard.notifications": "Notifications",
    "dashboard.savedCourses": "Saved Courses",
    
    // Admin
    "admin.dashboard": "Admin Dashboard",
    "admin.users": "Users Management",
    "admin.courses": "Courses Management",
    "admin.stats": "Platform Statistics",
    "admin.sales": "Sales Analytics",
    "admin.reports": "Reports",
    "admin.settings": "System Settings",
    "admin.editUser": "Edit User",
    "admin.deleteUser": "Delete User",
    "admin.totalUsers": "Total Users",
    "admin.activeUsers": "Active Users",
    "admin.totalCourses": "Total Courses",
    "admin.totalRevenue": "Total Revenue",
    "admin.confirmDelete": "Are you sure you want to delete this user?",
    "admin.cancel": "Cancel",
    "admin.confirm": "Confirm",
    "admin.search": "Search...",
    "admin.usersTable": "Users Table",
    
    // Learning
    "learning.markComplete": "Mark as Complete",
    "learning.previousLesson": "Previous Lesson",
    "learning.nextLesson": "Next Lesson",
    "learning.lessonContent": "Lesson Content",
    "learning.takingQuiz": "Taking Quiz",
    "learning.submitQuiz": "Submit Quiz",
    "learning.quizScore": "Your Score",
    "learning.correctAnswers": "Correct Answers",
    "learning.wrongAnswers": "Wrong Answers",
    "learning.quizCompleted": "Quiz Completed",
    "learning.tryAgain": "Try Again",
    "learning.lessonProgress": "Lesson Progress",
    "learning.quizProgress": "Quiz Progress",
    
    // Teacher
    "teacher.createCourse": "Create Course",
    "teacher.updateCourse": "Update Course",
    "teacher.myCourses": "My Courses",
    "teacher.courseAnalytics": "Course Analytics",
    "teacher.studentProgress": "Student Progress",
    "teacher.earnings": "Earnings",
    "teacher.reviews": "Reviews",
    "teacher.courseTitle": "Course Title",
    "teacher.courseDescription": "Course Description",
    "teacher.courseImage": "Course Image",
    "teacher.coursePrice": "Course Price",
    "teacher.courseCategory": "Course Category",
    "teacher.courseLevel": "Course Level",
    "teacher.courseDuration": "Course Duration",
    "teacher.addLesson": "Add Lesson",
    "teacher.editLesson": "Edit Lesson",
    "teacher.deleteLesson": "Delete Lesson",
    "teacher.addQuiz": "Add Quiz",
    "teacher.editQuiz": "Edit Quiz",
    "teacher.deleteQuiz": "Delete Quiz",
    "teacher.publishCourse": "Publish Course",
    "teacher.saveDraft": "Save as Draft",
    
    // Footer
    "footer.rights": "All rights reserved",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.help": "Help Center",
    "footer.contact": "Contact Us",
    "footer.about": "About Us",
    "footer.faq": "FAQ",
    "footer.blog": "Blog",
    "footer.platform": "Platform",
    "footer.resources": "Resources",
    "footer.legal": "Legal",
    "footer.subscribe": "Subscribe to our newsletter",
    "footer.emailPlaceholder": "Enter your email",
    "footer.subscribeButton": "Subscribe",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.success": "Success",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.view": "View",
    "common.add": "Add",
    "common.remove": "Remove",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.apply": "Apply",
    "common.reset": "Reset",
    "common.submit": "Submit",
    "common.continue": "Continue",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.all": "All",
    
    // Language
    "language.select": "Language",
    "language.en": "English",
    "language.vi": "Vietnamese",
  },
  vi: {
    // Navigation
    "nav.home": "Trang chủ",
    "nav.courses": "Khóa học",
    "nav.dashboard": "Bảng điều khiển",
    "nav.signIn": "Đăng nhập",
    "nav.signUp": "Đăng ký",
    "nav.signOut": "Đăng xuất",
    "nav.myAccount": "Tài khoản của tôi",
    
    // Auth
    "auth.email": "Email",
    "auth.password": "Mật khẩu",
    "auth.name": "Tên",
    "auth.role": "Vai trò",
    "auth.student": "Học viên",
    "auth.teacher": "Giáo viên",
    "auth.admin": "Quản trị viên",
    "auth.loginSuccess": "Đăng nhập thành công",
    "auth.loginFailed": "Đăng nhập thất bại",
    "auth.registerSuccess": "Đăng ký thành công",
    "auth.registerFailed": "Đăng ký thất bại",
    "auth.loggedOut": "Bạn đã đăng xuất thành công",
    "auth.welcomeBack": "Chào mừng trở lại",
    "auth.createAccount": "Tạo tài khoản",
    "auth.alreadyHaveAccount": "Đã có tài khoản?",
    "auth.dontHaveAccount": "Chưa có tài khoản?",
    "auth.forgotPassword": "Quên mật khẩu?",
    "auth.rememberMe": "Ghi nhớ đăng nhập",
    
    // Courses
    "courses.browse": "Duyệt khóa học",
    "courses.create": "Tạo khóa học",
    "courses.enroll": "Ghi danh ngay",
    "courses.addToCart": "Thêm vào giỏ hàng",
    "courses.removeFromCart": "Xóa khỏi giỏ hàng",
    "courses.price": "Giá",
    "courses.instructor": "Giảng viên",
    "courses.description": "Mô tả",
    "courses.lessons": "Bài học",
    "courses.duration": "Thời lượng",
    "courses.level": "Cấp độ",
    "courses.category": "Danh mục",
    "courses.rating": "Đánh giá",
    "courses.reviews": "Nhận xét",
    "courses.students": "Học viên",
    "courses.lastUpdated": "Cập nhật lần cuối",
    "courses.created": "Đã tạo",
    "courses.enrolledCourses": "Khóa học đã đăng ký",
    "courses.myCourses": "Khóa học của tôi",
    "courses.popularCourses": "Khóa học phổ biến",
    "courses.featuredCourses": "Khóa học nổi bật",
    "courses.newCourses": "Khóa học mới",
    "courses.searchCourses": "Tìm kiếm khóa học...",
    "courses.filterBy": "Lọc theo",
    "courses.sortBy": "Sắp xếp theo",
    "courses.noCourses": "Không tìm thấy khóa học",
    "courses.viewAll": "Xem tất cả",
    "courses.readMore": "Đọc thêm",
    "courses.startLearning": "Bắt đầu học",
    "courses.continueLearning": "Tiếp tục học",
    "courses.completed": "Đã hoàn thành",
    "courses.in-progress": "Đang học",
    "courses.not-started": "Chưa bắt đầu",
    
    // Cart
    "cart.title": "Giỏ hàng của bạn",
    "cart.empty": "Giỏ hàng của bạn trống",
    "cart.total": "Tổng cộng",
    "cart.checkout": "Thanh toán",
    "cart.remove": "Xóa",
    "cart.continueShopping": "Tiếp tục mua sắm",
    "cart.applyCoupon": "Áp dụng mã giảm giá",
    "cart.orderSummary": "Tóm tắt đơn hàng",
    "cart.items": "Sản phẩm",
    "cart.subtotal": "Tạm tính",
    "cart.discount": "Giảm giá",
    "cart.tax": "Thuế",
    
    // Dashboard
    "dashboard.welcome": "Chào mừng đến với Bảng điều khiển",
    "dashboard.myCourses": "Khóa học của tôi",
    "dashboard.progress": "Tiến độ",
    "dashboard.stats": "Thống kê",
    "dashboard.achievements": "Thành tích",
    "dashboard.certificates": "Chứng chỉ",
    "dashboard.recentActivity": "Hoạt động gần đây",
    "dashboard.accountSettings": "Cài đặt tài khoản",
    "dashboard.notifications": "Thông báo",
    "dashboard.savedCourses": "Khóa học đã lưu",
    
    // Admin
    "admin.dashboard": "Bảng điều khiển quản trị",
    "admin.users": "Quản lý người dùng",
    "admin.courses": "Quản lý khóa học",
    "admin.stats": "Thống kê nền tảng",
    "admin.sales": "Phân tích bán hàng",
    "admin.reports": "Báo cáo",
    "admin.settings": "Cài đặt hệ thống",
    "admin.editUser": "Chỉnh sửa người dùng",
    "admin.deleteUser": "Xóa người dùng",
    "admin.totalUsers": "Tổng số người dùng",
    "admin.activeUsers": "Người dùng đang hoạt động",
    "admin.totalCourses": "Tổng số khóa học",
    "admin.totalRevenue": "Tổng doanh thu",
    "admin.confirmDelete": "Bạn có chắc chắn muốn xóa người dùng này?",
    "admin.cancel": "Hủy bỏ",
    "admin.confirm": "Xác nhận",
    "admin.search": "Tìm kiếm...",
    "admin.usersTable": "Bảng người dùng",
    
    // Learning
    "learning.markComplete": "Đánh dấu hoàn thành",
    "learning.previousLesson": "Bài học trước",
    "learning.nextLesson": "Bài học tiếp theo",
    "learning.lessonContent": "Nội dung bài học",
    "learning.takingQuiz": "Đang làm bài kiểm tra",
    "learning.submitQuiz": "Gửi bài kiểm tra",
    "learning.quizScore": "Điểm của bạn",
    "learning.correctAnswers": "Câu trả lời đúng",
    "learning.wrongAnswers": "Câu trả lời sai",
    "learning.quizCompleted": "Đã hoàn thành bài kiểm tra",
    "learning.tryAgain": "Thử lại",
    "learning.lessonProgress": "Tiến độ bài học",
    "learning.quizProgress": "Tiến độ bài kiểm tra",
    
    // Teacher
    "teacher.createCourse": "Tạo khóa học",
    "teacher.updateCourse": "Cập nhật khóa học",
    "teacher.myCourses": "Khóa học của tôi",
    "teacher.courseAnalytics": "Phân tích khóa học",
    "teacher.studentProgress": "Tiến độ học viên",
    "teacher.earnings": "Thu nhập",
    "teacher.reviews": "Đánh giá",
    "teacher.courseTitle": "Tiêu đề khóa học",
    "teacher.courseDescription": "Mô tả khóa học",
    "teacher.courseImage": "Hình ảnh khóa học",
    "teacher.coursePrice": "Giá khóa học",
    "teacher.courseCategory": "Danh mục khóa học",
    "teacher.courseLevel": "Cấp độ khóa học",
    "teacher.courseDuration": "Thời lượng khóa học",
    "teacher.addLesson": "Thêm bài học",
    "teacher.editLesson": "Chỉnh sửa bài học",
    "teacher.deleteLesson": "Xóa bài học",
    "teacher.addQuiz": "Thêm bài kiểm tra",
    "teacher.editQuiz": "Chỉnh sửa bài kiểm tra",
    "teacher.deleteQuiz": "Xóa bài kiểm tra",
    "teacher.publishCourse": "Xuất bản khóa học",
    "teacher.saveDraft": "Lưu bản nháp",
    
    // Footer
    "footer.rights": "Đã đăng ký bản quyền",
    "footer.privacy": "Chính sách bảo mật",
    "footer.terms": "Điều khoản dịch vụ",
    "footer.help": "Trung tâm trợ giúp",
    "footer.contact": "Liên hệ với chúng tôi",
    "footer.about": "Về chúng tôi",
    "footer.faq": "Câu hỏi thường gặp",
    "footer.blog": "Blog",
    "footer.platform": "Nền tảng",
    "footer.resources": "Tài nguyên",
    "footer.legal": "Pháp lý",
    "footer.subscribe": "Đăng ký nhận bản tin",
    "footer.emailPlaceholder": "Nhập email của bạn",
    "footer.subscribeButton": "Đăng ký",
    
    // Common
    "common.loading": "Đang tải...",
    "common.error": "Đã xảy ra lỗi",
    "common.success": "Thành công",
    "common.save": "Lưu",
    "common.cancel": "Hủy bỏ",
    "common.delete": "Xóa",
    "common.edit": "Chỉnh sửa",
    "common.view": "Xem",
    "common.add": "Thêm",
    "common.remove": "Xóa",
    "common.search": "Tìm kiếm",
    "common.filter": "Lọc",
    "common.sort": "Sắp xếp",
    "common.apply": "Áp dụng",
    "common.reset": "Đặt lại",
    "common.submit": "Gửi",
    "common.continue": "Tiếp tục",
    "common.back": "Quay lại",
    "common.next": "Tiếp theo",
    "common.previous": "Trước đó",
    "common.all": "Tất cả",
    
    // Language
    "language.select": "Ngôn ngữ",
    "language.en": "Tiếng Anh",
    "language.vi": "Tiếng Việt",
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get saved language from localStorage or default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage && (savedLanguage === "en" || savedLanguage === "vi") 
      ? savedLanguage 
      : "en";
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
