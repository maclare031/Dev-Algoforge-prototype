import { dbConnect } from '../lib/db';
import Course from '../models/Course';
import { getCourses } from '../lib/courseData';
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

// Icon mapping to store icon names in database
const iconMapping: Record<string, string> = {
  'Code': 'Code',
  'Globe': 'Globe',
  'Brain': 'Brain',
  'BarChart3': 'BarChart3',
  'TrendingUp': 'TrendingUp',
  'Database': 'Database',
  'Sparkles': 'Sparkles',
  'MessageSquare': 'MessageSquare',
  'Megaphone': 'Megaphone',
  'Palette': 'Palette',
  'Shield': 'Shield',
};

// Helper function to get icon name
function getIconName(icon: any): string {
  if (typeof icon === 'string') {
    return iconMapping[icon] || 'Code';
  }
  
  // If icon is a React component, try to get its name
  if (icon && typeof icon === 'function') {
    const iconName = icon.name || icon.displayName;
    return iconMapping[iconName] || 'Code';
  }
  
  return 'Code';
}

async function seedCourses() {
  try {
    console.log('🌱 Starting course seeding...');
    
    // Connect to database
    await dbConnect();
    console.log('✅ Connected to database');
    
    // Clear existing courses
    await Course.deleteMany({});
    console.log('🗑️ Cleared existing courses');
    
    // Get courses from existing data
    const coursesData = getCourses();
    console.log(`📚 Found ${coursesData.length} courses to seed`);
    
    // Prepare courses for database insertion
    const coursesToInsert = coursesData.map(course => {
      const iconName = getIconName(course.icon);
      
      return {
        title: course.title,
        subtitle: course.subtitle,
        description: course.description,
        longDescription: course.longDescription,
        duration: course.duration,
        mode: course.mode,
        students: course.students,
        rating: course.rating,
        level: course.level,
        skills: course.skills,
        price: course.price,
        originalPrice: course.originalPrice,
        tags: course.tags,
        category: course.category,
        instructor: course.instructor,
        lessons: course.lessons,
        projects: course.projects,
        certificate: course.certificate,
        language: course.language,
        prerequisites: course.prerequisites,
        curriculum: course.curriculum,
        featured: course.featured,
        trending: course.trending,
        iconName,
      };
    });
    
    // Insert courses into database
    const insertedCourses = await Course.insertMany(coursesToInsert);
    console.log(`✅ Successfully seeded ${insertedCourses.length} courses`);
    
    // Log summary - Fixed category counting logic
    const categoryCounts = insertedCourses.reduce((acc, course) => {
      const category = course.category || 'unknown';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('📊 Seeding Summary:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   - ${category}: ${count} courses`);
    });
    console.log(`   - Featured: ${insertedCourses.filter(c => c.featured).length} courses`);
    console.log(`   - Trending: ${insertedCourses.filter(c => c.trending).length} courses`);
    
    console.log('🎉 Course seeding completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
    process.exit(1);
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedCourses();
}

export { seedCourses };
