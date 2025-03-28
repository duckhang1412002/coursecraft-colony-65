
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  image_url?: string;
  thumbnail?: string; // Add thumbnail field
  created_at?: string;
  updated_at?: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  content: string;
  duration: string;
  order_number: number;
  type?: string; // Add type field
  created_at?: string;
  updated_at?: string;
}

export interface UserCourse {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed: boolean;
}

export interface CourseReview {
  id: string;
  course_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  created_at: string;
}
