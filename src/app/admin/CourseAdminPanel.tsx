"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Code, Brain, BarChart3, Users } from "lucide-react";

interface Course {
  title: string;
  description: string;
  level: string;
  category: string;
  iconName: string;
}

const CourseAdminPanel = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<Course>({
    title: "",
    description: "",
    level: "",
    category: "",
    iconName: "Code",
  });
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/api/courses");
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const addCourse = async () => {
    try {
      setLoading(true);
      await axios.post("/api/courses", newCourse);
      setNewCourse({ title: "", description: "", level: "", category: "", iconName: "Code" });
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Course</CardTitle>
          <CardDescription>Fill in the details to add a new course.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              name="title"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={handleInputChange}
              className="bg-gray-800/50 text-white"
            />
            <Input
              name="description"
              placeholder="Short Description"
              value={newCourse.description}
              onChange={handleInputChange}
              className="bg-gray-800/50 text-white"
            />
            <Select
              value={newCourse.level}
              onValueChange={(value) => handleSelectChange("level", value)}
            >
              <SelectTrigger className="bg-gray-800/50 text-white">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800">
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={newCourse.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger className="bg-gray-800/50 text-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800">
                <SelectItem value="students">Students</SelectItem>
                <SelectItem value="professionals">Professionals</SelectItem>
                <SelectItem value="corporates">Corporates</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={addCourse}
            disabled={loading}
            className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Add Course"}
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Manage Courses</CardTitle>
          <CardDescription>Edit or remove existing courses.</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            {courses.map((course) => (
              <Badge key={course.title} className="bg-gray-800 text-white mb-2">
                {course.title} - {course.level}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseAdminPanel;
