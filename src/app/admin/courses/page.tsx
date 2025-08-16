"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "@/components/ui/modal";
import { Loader2, Edit, Trash, Plus, Search, X, Save } from "lucide-react";

/* -------------------------------------------------------------------- */
/*  Types                                                               */
/* -------------------------------------------------------------------- */
interface Course {
  id?: string;
  _id?: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  duration: string;
  mode?: string;
  students?: string;
  rating?: number;
  level?: string;
  skills?: string[];
  price?: string;
  originalPrice?: string;
  tags?: string[];
  category: string;
  courseCategory?: string;
  instructor?: string;
  lessons?: number;
  projects?: number;
  certificate?: boolean;
  language?: string;
  prerequisites?: string;
  curriculum?: Array<{
    module: string;
    lessons: number;
    duration: string;
    description?: string;
  }>;
  syllabus?: Array<{
    module: string;
    topics: string[];
  }>;
  featured?: boolean;
  trending?: boolean;
  iconName: string;
  createdAt?: string;
  updatedAt?: string;
}

/* -------------------------------------------------------------------- */
/*  Helper colours for badges - softer colors for eye comfort          */
/* -------------------------------------------------------------------- */
const levelColours: Record<string, string> = {
  Beginner: "bg-emerald-900/40 border-emerald-700/50 text-emerald-400",
  Intermediate: "bg-amber-900/40 border-amber-700/50 text-amber-400",
  Advanced: "bg-rose-900/40 border-rose-700/50 text-rose-400",
  "All Levels": "bg-blue-900/40 border-blue-700/50 text-blue-400",
};

const categoryColours: Record<string, string> = {
  students: "bg-cyan-900/40 border-cyan-700/50 text-cyan-400",
  professionals: "bg-violet-900/40 border-violet-700/50 text-violet-400",
  corporates: "bg-purple-900/40 border-purple-700/50 text-purple-400",
};

/* -------------------------------------------------------------------- */
/*  Page Component                                                      */
/* -------------------------------------------------------------------- */
const ManageCoursesPage = () => {
  /* -------------------- state -------------------------------------- */
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Partial<Course> | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterCourseCategory, setFilterCourseCategory] = useState("all");

  const [skillsInput, setSkillsInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  /* -------------------- effects ------------------------------------ */
  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    let results = courses;

    if (filterLevel !== "all") {
      results = results.filter((c) => c.level === filterLevel);
    }
    if (filterCategory !== "all") {
      results = results.filter((c) => c.category === filterCategory);
    }
    if (filterCourseCategory !== "all") {
      results = results.filter((c) => c.courseCategory === filterCourseCategory);
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      results = results.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          (c.instructor && c.instructor.toLowerCase().includes(q)),
      );
    }
    setFilteredCourses(results);
  }, [courses, searchTerm, filterLevel, filterCategory, filterCourseCategory]);

  /* -------------------- api ---------------------------------------- */
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/courses");
      setCourses(res.data.courses || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  CRUD handlers                                                     */
  /* ------------------------------------------------------------------ */
  const handleAddNew = () => {
    setCurrentCourse({
      title: "",
      description: "",
      duration: "",
      level: "Beginner",
      category: "students",
      courseCategory: "Data Analytics & Business Intelligence",
      iconName: "Code",
      featured: false,
      trending: false,
      certificate: false,
      lessons: 0,
      projects: 0,
      rating: 0,
      skills: [],
      tags: [],
      curriculum: [],
      syllabus: [],
    });
    setSkillsInput("");
    setTagsInput("");
    setShowModal(true);
  };

  const handleEditClick = (course: Course) => {
    setCurrentCourse({ ...course, id: course.id ?? course._id });
    setSkillsInput(course.skills?.join(", ") || "");
    setTagsInput(course.tags?.join(", ") || "");
    setShowModal(true);
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm("Delete this course?")) return;
    setLoading(true);
    try {
      await axios.delete(`/api/courses/${courseId}`);
      setCourses((prev) => prev.filter((c) => (c.id ?? c._id) !== courseId));
      alert("Course deleted.");
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- submit (create / update) ------------------- */
  const handleSubmit = async () => {
    if (
      !currentCourse?.title ||
      !currentCourse?.description ||
      !currentCourse?.duration ||
      !currentCourse?.category
    ) {
      alert("Title, description, duration and category are required.");
      return;
    }

    setIsSubmitting(true);

    const courseData = {
      ...currentCourse,
      skills: skillsInput.split(",").map((s) => s.trim()).filter(Boolean),
      tags: tagsInput.split(",").map((s) => s.trim()).filter(Boolean),
      lessons: Number(currentCourse.lessons) || 0,
      projects: Number(currentCourse.projects) || 0,
      rating: Number(currentCourse.rating) || 0,
    };

    try {
      if (currentCourse.id || currentCourse._id) {
        // update
        const id = currentCourse.id ?? currentCourse._id;
        const res = await axios.put(`/api/courses/${id}`, courseData);
        setCourses((prev) =>
          prev.map((c) => ((c.id ?? c._id) === id ? res.data.course : c)),
        );
        alert("Course updated successfully!");
      } else {
        // create
        const res = await axios.post("/api/courses", courseData);
        setCourses((prev) => [...prev, res.data.course]);
        alert("Course created successfully!");
      }
      setShowModal(false);
      setCurrentCourse(null);
      setSkillsInput("");
      setTagsInput("");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error ?? "Failed to save course");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /*  Helpers for dynamic changes                                       */
  /* ------------------------------------------------------------------ */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCurrentCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setCurrentCourse((prev) => ({ ...prev, [name]: value }));
  };

  /* ------------------------------------------------------------------ */
  /*  UI                                                                */
  /* ------------------------------------------------------------------ */
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 py-4 sm:py-8">
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        {/* Header ---------------------------------------------------- */}
        <Card className="mb-6 sm:mb-8 bg-gray-900 border border-gray-800">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6">
            <div>
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-100">
                Manage Courses
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-400 mt-1 sm:mt-2">
                Add, edit, or remove courses from your platform.
              </CardDescription>
            </div>
            <Button
              onClick={handleAddNew}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-100 w-full sm:w-auto justify-center"
            >
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </CardHeader>
        </Card>

        {/* Filters --------------------------------------------------- */}
        <Card className="mb-6 sm:mb-8 bg-gray-900 border border-gray-800">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg text-gray-100">Filters</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            {/* Mobile: Stack filters vertically, Tablet+: Grid layout */}
            <div className="flex flex-col space-y-4 sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:space-y-0 sm:gap-4 lg:gap-4">
              {/* Search */}
              <div className="flex items-center gap-2 lg:min-w-60">
                <Search className="h-4 w-4 text-gray-400 shrink-0" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500 text-sm"
                />
              </div>

              {/* Level */}
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="bg-gray-800 border border-gray-700 text-gray-200 focus:ring-gray-500 text-sm">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border border-gray-700 text-gray-200">
                  <SelectItem value="all" className="focus:bg-gray-800 focus:text-gray-100 text-sm">All Levels</SelectItem>
                  <SelectItem value="Beginner" className="focus:bg-gray-800 focus:text-gray-100 text-sm">Beginner</SelectItem>
                  <SelectItem value="Intermediate" className="focus:bg-gray-800 focus:text-gray-100 text-sm">Intermediate</SelectItem>
                  <SelectItem value="Advanced" className="focus:bg-gray-800 focus:text-gray-100 text-sm">Advanced</SelectItem>
                </SelectContent>
              </Select>

              {/* Category */}
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="bg-gray-800 border border-gray-700 text-gray-200 focus:ring-gray-500 text-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border border-gray-700 text-gray-200">
                  <SelectItem value="all" className="focus:bg-gray-800 focus:text-gray-100 text-sm">All Categories</SelectItem>
                  <SelectItem value="students" className="focus:bg-gray-800 focus:text-gray-100 text-sm">Students</SelectItem>
                  <SelectItem value="professionals" className="focus:bg-gray-800 focus:text-gray-100 text-sm">Professionals</SelectItem>
                  <SelectItem value="corporates" className="focus:bg-gray-800 focus:text-gray-100 text-sm">Corporates</SelectItem>
                </SelectContent>
              </Select>

              {/* Course Category */}
              <Select
                value={filterCourseCategory}
                onValueChange={setFilterCourseCategory}
              >
                <SelectTrigger className="bg-gray-800 border border-gray-700 text-gray-200 focus:ring-gray-500 text-sm sm:col-span-2 lg:col-span-1 lg:min-w-56">
                  <SelectValue placeholder="Course Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border border-gray-700 text-gray-200">
                  <SelectItem value="all" className="focus:bg-gray-800 focus:text-gray-100 text-sm">All Course Categories</SelectItem>
                  <SelectItem value="Data Analytics & Business Intelligence" className="focus:bg-gray-800 focus:text-gray-100 text-sm">
                    Data Analytics &amp; Business Intelligence
                  </SelectItem>
                  <SelectItem value="Data Science" className="focus:bg-gray-800 focus:text-gray-100 text-sm">
                    Data Science
                  </SelectItem>
                  <SelectItem value="Machine Learning" className="focus:bg-gray-800 focus:text-gray-100 text-sm">
                    Machine Learning
                  </SelectItem>
                  <SelectItem value="Generative AI (Gen AI)" className="focus:bg-gray-800 focus:text-gray-100 text-sm">
                    Generative AI (Gen AI)
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Clear */}
              {(searchTerm !== "" ||
                filterLevel !== "all" ||
                filterCategory !== "all" ||
                filterCourseCategory !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterLevel("all");
                    setFilterCategory("all");
                    setFilterCourseCategory("all");
                  }}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100 text-sm w-full sm:w-auto"
                >
                  <X className="mr-2 h-4 w-4" /> Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Courses list --------------------------------------------- */}
        <Card className="bg-gray-900 border border-gray-800">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg text-gray-100">
              Courses ({filteredCourses.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="py-10 text-center text-gray-500 text-sm sm:text-base">
                No courses found.
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filteredCourses.map((course) => (
                  <Card
                    key={course.id ?? course._id}
                    className="p-3 sm:p-4 bg-gray-850 border border-gray-800 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Title & badges */}
                        <div className="mb-2 sm:mb-3">
                          <div className="flex flex-col sm:flex-row sm:items-start gap-2 mb-2">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-100 leading-tight">
                              {course.title}
                            </h3>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {course.featured && (
                                <Badge className="bg-cyan-900/40 border-cyan-700/50 text-cyan-400 text-xs px-2 py-0.5">
                                  Featured
                                </Badge>
                              )}
                              {course.trending && (
                                <Badge className="bg-violet-900/40 border-violet-700/50 text-violet-400 text-xs px-2 py-0.5">
                                  Trending
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <p className="mb-3 text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2 sm:line-clamp-none">
                          {course.description}
                        </p>

                        {/* Badges - Responsive layout */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          <Badge
                            className={`text-xs px-2 py-0.5 ${
                              levelColours[course.level ?? ""] ??
                              "bg-gray-800/50 border-gray-700 text-gray-400"
                            }`}
                          >
                            {course.level}
                          </Badge>
                          <Badge
                            className={`text-xs px-2 py-0.5 ${
                              categoryColours[course.category] ??
                              "bg-gray-800/50 border-gray-700 text-gray-400"
                            }`}
                          >
                            {course.category}
                          </Badge>
                          {course.courseCategory && (
                            <Badge className="bg-blue-900/40 border-blue-700/50 text-blue-400 text-xs px-2 py-0.5 hidden sm:inline-flex">
                              {course.courseCategory}
                            </Badge>
                          )}
                          <Badge className="bg-gray-800/50 border-gray-700 text-gray-400 text-xs px-2 py-0.5">
                            ⏳ {course.duration}
                          </Badge>
                          {course.rating !== undefined && course.rating > 0 && (
                            <Badge className="bg-amber-900/40 border-amber-700/50 text-amber-400 text-xs px-2 py-0.5">
                              ⭐ {course.rating}
                            </Badge>
                          )}
                        </div>

                        {/* Mobile: Show course category if hidden above */}
                        {course.courseCategory && (
                          <div className="mt-2 sm:hidden">
                            <Badge className="bg-blue-900/40 border-blue-700/50 text-blue-400 text-xs px-2 py-0.5">
                              {course.courseCategory}
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Actions - Responsive positioning */}
                      <div className="flex gap-2 lg:flex-col lg:w-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(course)}
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100 flex-1 lg:flex-none text-xs sm:text-sm px-3 py-1.5"
                        >
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="ml-1 sm:hidden">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(course.id ?? course._id!)}
                          className="border-red-800/50 text-red-400 hover:bg-red-950/50 hover:text-red-300 flex-1 lg:flex-none text-xs sm:text-sm px-3 py-1.5"
                        >
                          <Trash className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="ml-1 sm:hidden">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal ------------------------------------------------------- */}
      <Modal open={showModal} onOpenChange={setShowModal}>
        <ModalContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-gray-900 border border-gray-800 m-2 sm:m-4">
          <ModalHeader className="p-4 sm:p-6">
            <ModalTitle className="text-gray-100 text-lg sm:text-xl">
              {currentCourse?.id || currentCourse?._id
                ? "Edit Course"
                : "Add Course"}
            </ModalTitle>
          </ModalHeader>

          {/* ---------------- Modal Body ------------------- */}
          <ModalBody className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
            {/* TITLE ------------------------------------------------ */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-300">
                Title *
              </label>
              <Input
                name="title"
                value={currentCourse?.title || ""}
                onChange={handleInputChange}
                placeholder="Course title"
                className="bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500 text-sm sm:text-base"
              />
            </div>

            {/* SUBTITLE -------------------------------------------- */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-300">
                Subtitle
              </label>
              <Input
                name="subtitle"
                value={currentCourse?.subtitle || ""}
                onChange={handleInputChange}
                placeholder="Course subtitle"
                className="bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500 text-sm sm:text-base"
              />
            </div>

            {/* DESCRIPTION ----------------------------------------- */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-300">
                Description *
              </label>
              <Textarea
                name="description"
                value={currentCourse?.description || ""}
                onChange={handleInputChange}
                placeholder="Short description"
                rows={3}
                className="bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500 text-sm sm:text-base resize-none"
              />
            </div>

            {/* LONG DESCRIPTION ------------------------------------ */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-300">
                Long Description
              </label>
              <Textarea
                name="longDescription"
                value={currentCourse?.longDescription || ""}
                onChange={handleInputChange}
                placeholder="Detailed description"
                rows={4}
                className="bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500 text-sm sm:text-base resize-none"
              />
            </div>

            {/* DETAILS GRID ---------------------------------------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Duration */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-300">
                  Duration *
                </label>
                <Input
                  name="duration"
                  value={currentCourse?.duration || ""}
                  onChange={handleInputChange}
                  placeholder="e.g., 8 weeks"
                  className="bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500 text-sm sm:text-base"
                />
              </div>

              {/* Level */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-300">
                  Level
                </label>
                <Select
                  value={currentCourse?.level || ""}
                  onValueChange={(v) => handleSelectChange("level", v)}
                >
                  <SelectTrigger className="bg-gray-800 border border-gray-700 text-gray-200 focus:ring-gray-500 text-sm sm:text-base">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border border-gray-700 text-gray-200">
                    <SelectItem value="Beginner" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">Beginner</SelectItem>
                    <SelectItem value="Intermediate" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">Intermediate</SelectItem>
                    <SelectItem value="Advanced" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">Advanced</SelectItem>
                    <SelectItem value="All Levels" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">All Levels</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-300">
                  Category *
                </label>
                <Select
                  value={currentCourse?.category || ""}
                  onValueChange={(v) => handleSelectChange("category", v)}
                >
                  <SelectTrigger className="bg-gray-800 border border-gray-700 text-gray-200 focus:ring-gray-500 text-sm sm:text-base">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border border-gray-700 text-gray-200">
                    <SelectItem value="students" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">Students</SelectItem>
                    <SelectItem value="professionals" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">Professionals</SelectItem>
                    <SelectItem value="corporates" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">Corporates</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Course Category */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-300">
                  Course Category
                </label>
                <Select
                  value={currentCourse?.courseCategory || ""}
                  onValueChange={(v) => handleSelectChange("courseCategory", v)}
                >
                  <SelectTrigger className="bg-gray-800 border border-gray-700 text-gray-200 focus:ring-gray-500 text-sm sm:text-base">
                    <SelectValue placeholder="Course category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border border-gray-700 text-gray-200">
                    <SelectItem value="Data Analytics & Business Intelligence" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">
                      Data Analytics &amp; Business Intelligence
                    </SelectItem>
                    <SelectItem value="Data Science" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">
                      Data Science
                    </SelectItem>
                    <SelectItem value="Machine Learning" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">
                      Machine Learning
                    </SelectItem>
                    <SelectItem value="Generative AI (Gen AI)" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">
                      Generative AI (Gen AI)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mode */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-300">
                  Mode
                </label>
                <Select
                  value={currentCourse?.mode || ""}
                  onValueChange={(v) => handleSelectChange("mode", v)}
                >
                  <SelectTrigger className="bg-gray-800 border border-gray-700 text-gray-200 focus:ring-gray-500 text-sm sm:text-base">
                    <SelectValue placeholder="Mode" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border border-gray-700 text-gray-200">
                    <SelectItem value="Online" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">Online</SelectItem>
                    <SelectItem value="Hybrid" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">Hybrid</SelectItem>
                    <SelectItem value="Weekend" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">Weekend</SelectItem>
                    <SelectItem value="Evening" className="focus:bg-gray-800 focus:text-gray-100 text-sm sm:text-base">Evening</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-300">
                  Price
                </label>
                <Input
                  name="price"
                  value={currentCourse?.price || ""}
                  onChange={handleInputChange}
                  placeholder="$299"
                  className="bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500 text-sm sm:text-base"
                />
              </div>

              {/* Original Price */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-300">
                  Original Price
                </label>
                <Input
                  name="originalPrice"
                  value={currentCourse?.originalPrice || ""}
                  onChange={handleInputChange}
                  placeholder="$399"
                  className="bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500 text-sm sm:text-base"
                />
              </div>

              {/* Lessons */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-300">
                  Lessons
                </label>
                <Input
                  name="lessons"
                  type="number"
                  value={currentCourse?.lessons || ""}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500 text-sm sm:text-base"
                />
              </div>

              {/* Projects */}
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-300">
                  Projects
                </label>
                <Input
                  name="projects"
                  type="number"
                  value={currentCourse?.projects || ""}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500 text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Instructor */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-300">
                Instructor
              </label>
              <Input
                name="instructor"
                value={currentCourse?.instructor || ""}
                onChange={handleInputChange}
                placeholder="Instructor name"
                className="bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500 text-sm sm:text-base"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-300">
                Skills (comma separated)
              </label>
              <Input
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="JavaScript, React"
                className="bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500 text-sm sm:text-base"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-300">
                Tags (comma separated)
              </label>
              <Input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="web-dev, frontend"
                className="bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500 text-sm sm:text-base"
              />
            </div>

            {/* Prerequisites */}
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-300">
                Prerequisites
              </label>
              <Textarea
                name="prerequisites"
                value={currentCourse?.prerequisites || ""}
                onChange={handleInputChange}
                placeholder="Any prerequisites"
                rows={3}
                className="bg-gray-800 border border-gray-700 focus:border-gray-500 focus:ring-gray-500 text-gray-200 placeholder:text-gray-500 text-sm sm:text-base resize-none"
              />
            </div>

            {/* Toggles */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 text-sm font-semibold text-gray-300">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentCourse?.featured || false}
                  onChange={(e) =>
                    setCurrentCourse((prev) => ({
                      ...prev,
                      featured: e.target.checked,
                    }))
                  }
                  className="accent-cyan-500"
                />
                Featured
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentCourse?.trending || false}
                  onChange={(e) =>
                    setCurrentCourse((prev) => ({
                      ...prev,
                      trending: e.target.checked,
                    }))
                  }
                  className="accent-violet-500"
                />
                Trending
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={currentCourse?.certificate || false}
                  onChange={(e) =>
                    setCurrentCourse((prev) => ({
                      ...prev,
                      certificate: e.target.checked,
                    }))
                  }
                  className="accent-purple-500"
                />
                Certificate
              </label>
            </div>
          </ModalBody>

          {/* ---------------- Modal Footer ------------------ */}
          <ModalFooter className="p-4 sm:p-6">
            <div className="flex flex-col-reverse sm:flex-row gap-3 w-full sm:w-auto sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
                disabled={isSubmitting}
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-gray-100 text-sm sm:text-base px-4 py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-100 text-sm sm:text-base px-4 py-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {currentCourse?.id || currentCourse?._id
                      ? "Update Course"
                      : "Create Course"}
                  </>
                )}
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ManageCoursesPage;
