import  dbConnect  from './db';
import Course from '@/models/Course';
import { Course as CourseType, CourseCategory, NavigationCourseCategory, NavigationCourse } from '@/types/course';
import {
  Brain,
  Code,
  Database,
  Sparkles,
  MessageSquare,
  Megaphone,
  Palette,
  TrendingUp,
  BarChart3,
  Shield,
  Globe,
} from "lucide-react";

// Icon mapping for database courses
const iconMapping: Record<string, any> = {
  'Code': Code,
  'Globe': Globe,
  'Brain': Brain,
  'BarChart3': BarChart3,
  'TrendingUp': TrendingUp,
  'Database': Database,
  'Sparkles': Sparkles,
  'MessageSquare': MessageSquare,
  'Megaphone': Megaphone,
  'Palette': Palette,
  'Shield': Shield,
};

export class CourseService {
  // Helper method to transform database course to CourseType
  private static transformCourse(course: any): CourseType {
    return {
      ...course,
      id: course._id.toString(),
      _id: undefined,
      icon: iconMapping[course.iconName] || Code,
    } as CourseType;
  }

  // Get all courses with optional filtering (Enhanced version)
  static async getCourses(filters: {
    category?: CourseCategory;
    courseCategory?: string;
    featured?: boolean;
    trending?: boolean;
    search?: string;
    level?: string;
    mode?: string;
    limit?: number;
    skip?: number;
  } = {}): Promise<CourseType[]> {
    await dbConnect();
    
    const query: any = {};
    
    // Apply filters
    if (filters.category) {
      query.category = filters.category;
    }
    if (filters.courseCategory) {
      query.courseCategory = filters.courseCategory;
    }
    
    if (filters.featured) {
      query.featured = true;
    }
    
    if (filters.trending) {
      query.trending = true;
    }
    
    if (filters.level) {
      query.level = filters.level;
    }
    
    if (filters.mode) {
      query.mode = filters.mode;
    }
    
    // Search functionality
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
        { skills: { $in: [new RegExp(filters.search, 'i')] } },
        { tags: { $in: [new RegExp(filters.search, 'i')] } }
      ];
    }
    
    let courseQuery = Course.find(query).sort({ createdAt: -1 });
    
    if (filters.skip) {
      courseQuery = courseQuery.skip(filters.skip);
    }
    
    if (filters.limit) {
      courseQuery = courseQuery.limit(filters.limit);
    }
    
    const courses = await courseQuery.lean();
    return courses.map(this.transformCourse);
  }

  static async getAllCourses(): Promise<CourseType[]> {
    await dbConnect();
    const courses = await Course.find({}).lean();
    return courses.map(this.transformCourse);
  }

  static async getCourseById(id: string): Promise<CourseType | null> {
    await dbConnect();
    const course = await Course.findById(id).lean();
    
    if (!course) return null;
    
    return this.transformCourse(course);
  }

  static async getNavigationCourses(): Promise<NavigationCourseCategory[]> {
    const courses = await this.getAllCourses();
    const categories: CourseCategory[] = ["students", "professionals", "corporates"];
    
    const navCourses: NavigationCourseCategory[] = categories.map(category => {
      const items: NavigationCourse[] = courses
        .filter(course => course.category === category)
        .map(course => ({
          name: course.title,
          description: course.description,
          icon: course.icon!,
          duration: course.duration,
          level: course.level,
          featured: course.featured || false,
          trending: course.trending || false,
          rating: course.rating,
          learners: course.students,
          path: `/courses/${course.id}`
        }));

      const categoryName = {
        students: "For Students",
        professionals: "For Professionals", 
        corporates: "For Corporates"
      }[category] || category;
      
      return {
        category: categoryName,
        items
      };
    });

    return navCourses;
  }

  static async createCourse(courseData: any): Promise<CourseType> {
    await dbConnect();
    
    console.log('CourseService: Creating course with data:', JSON.stringify(courseData, null, 2));
    console.log('CourseService: Syllabus in input data:', JSON.stringify(courseData.syllabus, null, 2));
    
    // Extract icon name for database storage
    const iconName = courseData.icon ? 
      Object.keys(iconMapping).find(key => iconMapping[key] === courseData.icon) || 'Code'
      : courseData.iconName || 'Code';
    
    // Ensure syllabus is properly formatted
    const syllabus = courseData.syllabus || [];
    console.log('CourseService: Processed syllabus:', JSON.stringify(syllabus, null, 2));
    
    const courseDocument = {
      ...courseData,
      iconName,
      syllabus,
      icon: undefined, // Remove icon from database document
    };
    
    console.log('CourseService: Final course document for save:', JSON.stringify(courseDocument, null, 2));
    
    try {
      const course = new Course(courseDocument);
      console.log('CourseService: Course model instance before save:', JSON.stringify(course.toObject(), null, 2));
      
      const savedCourse = await course.save();
      console.log('CourseService: Course saved successfully:', JSON.stringify(savedCourse.toObject(), null, 2));
      console.log('CourseService: Syllabus in saved course:', JSON.stringify(savedCourse.syllabus, null, 2));
      
      const transformedCourse = {
        ...savedCourse.toObject(),
        id: savedCourse._id.toString(),
        _id: undefined,
        icon: iconMapping[iconName] || Code,
      } as CourseType;
      
      console.log('CourseService: Transformed course for return:', JSON.stringify(transformedCourse, null, 2));
      console.log('CourseService: Syllabus in transformed course:', JSON.stringify(transformedCourse.syllabus, null, 2));
      
      return transformedCourse;
    } catch (error) {
      console.error('CourseService: Error saving course:', error);
      if (error instanceof Error) {
        console.error('CourseService: Error message:', error.message);
        console.error('CourseService: Error stack:', error.stack);
      }
      throw error;
    }
  }
  

  // Full update (PUT)
  static async updateCourse(id: string, courseData: Partial<CourseType>): Promise<CourseType | null> {
    await dbConnect();
    
    // Extract icon name for database storage
    const iconName = courseData.icon ? 
      Object.keys(iconMapping).find(key => iconMapping[key] === courseData.icon) || 'Code' 
      : undefined;
    
    const updateData = {
      ...courseData,
      iconName,
      icon: undefined, // Remove icon from database document
    };
    
    const course = await Course.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    }).lean();
    
    if (!course) return null;
    
    return this.transformCourse(course);
  }

  // Partial update (PATCH)
  static async patchCourse(id: string, courseData: Partial<CourseType>): Promise<CourseType | null> {
    await dbConnect();
    
    // Extract icon name for database storage if icon is provided
    const updateData: any = { ...courseData };
    
    if (courseData.icon) {
      updateData.iconName = Object.keys(iconMapping).find(key => 
        iconMapping[key] === courseData.icon
      ) || 'Code';
    }
    
    delete updateData.icon; // Remove icon from database document
    
    const course = await Course.findByIdAndUpdate(
      id, 
      { $set: updateData }, 
      { 
        new: true, 
        runValidators: true 
      }
    ).lean();
    
    if (!course) return null;
    
    return this.transformCourse(course);
  }

  static async deleteCourse(id: string): Promise<CourseType | null> {
    await dbConnect();
    const course = await Course.findByIdAndDelete(id).lean();
    
    if (!course) return null;
    
    return this.transformCourse(course);
  }

  static async getCoursesByCategory(category: CourseCategory): Promise<CourseType[]> {
    return this.getCourses({ category });
  }

  static async getFeaturedCourses(): Promise<CourseType[]> {
    return this.getCourses({ featured: true });
  }

  static async getTrendingCourses(): Promise<CourseType[]> {
    return this.getCourses({ trending: true });
  }

  // Additional utility methods
  static async bulkCreateCourses(coursesData: Omit<CourseType, 'id'>[]): Promise<CourseType[]> {
    await dbConnect();
    
    const preparedCourses = coursesData.map(courseData => {
      const iconName = Object.keys(iconMapping).find(key => 
        iconMapping[key] === courseData.icon
      ) || 'Code';
      
      return {
        ...courseData,
        iconName,
        icon: undefined,
      };
    });
    
    const savedCourses = await Course.insertMany(preparedCourses);
    
    return savedCourses.map((course, index) => ({
      ...course.toObject(),
      id: course._id.toString(),
      _id: undefined,
      icon: coursesData[index].icon,
    })) as CourseType[];
  }

  static async bulkDeleteCourses(ids: string[]): Promise<number> {
    await dbConnect();
    const result = await Course.deleteMany({ _id: { $in: ids } });
    return result.deletedCount || 0;
  }

  static async getCoursesCount(filters: {
    category?: CourseCategory;
    courseCategory?: string;
    featured?: boolean;
    trending?: boolean;
    search?: string;
  } = {}): Promise<number> {
    await dbConnect();
    
    const query: any = {};
    
    if (filters.category) {
      query.category = filters.category;
    }
    if (filters.courseCategory) {
      query.courseCategory = filters.courseCategory;
    }
    
    if (filters.featured) {
      query.featured = true;
    }
    
    if (filters.trending) {
      query.trending = true;
    }
    
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } },
        { skills: { $in: [new RegExp(filters.search, 'i')] } },
        { tags: { $in: [new RegExp(filters.search, 'i')] } }
      ];
    }
    
    return Course.countDocuments(query);
  }

  // Toggle methods for quick updates
  static async toggleFeatured(id: string): Promise<CourseType | null> {
    await dbConnect();
    const course = await Course.findById(id);
    
    if (!course) return null;
    
    course.featured = !course.featured;
    const updatedCourse = await course.save();
    
    return this.transformCourse(updatedCourse.toObject());
  }

  static async toggleTrending(id: string): Promise<CourseType | null> {
    await dbConnect();
    const course = await Course.findById(id);
    
    if (!course) return null;
    
    course.trending = !course.trending;
    const updatedCourse = await course.save();
    
    return this.transformCourse(updatedCourse.toObject());
  }
}
