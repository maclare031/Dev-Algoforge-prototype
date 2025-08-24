/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
// --- NEW --- Import useRouter
import { useRouter } from 'next/navigation';
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
// --- NEW --- Import the extra icons needed for the upload buttons
import { Loader2, Edit, Trash, Plus, Search, X, Save, Video, FileText, Presentation } from "lucide-react";
// --- NEW --- Import the UploadModal component (you will create this file next)
import { UploadModal } from "@/components/UploadModal";
import { ConfirmationModal } from "@/components/ConfirmationModal";

/* -------------------------------------------------------------------- */
/* Types                                                               */
/* -------------------------------------------------------------------- */
// --- NEW --- Define a type for a module to ensure type safety in your component
interface IModule {
  _id: string;
  title: string;
  content: any[]; // You can define a more specific IContent interface later if you wish
}

interface IContent {
  _id: string;
  title: string;
  type: 'VIDEO' | 'PPT' | 'NOTES';
  thumbnailUrl?: string;
}

// --- NEW --- Update the IModule interface to use the IContent type
interface IModule {
  _id: string;
  title: string;
  content: IContent[]; // Use the new, more specific type
}


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
  modules?: IModule[]; // --- NEW --- Add the modules array to the Course interface
}

/* -------------------------------------------------------------------- */
/* Helper colours for badges - softer colors for eye comfort          */
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
/* Page Component                                                      */
/* -------------------------------------------------------------------- */
const ManageCoursesPage = () => {
  // --- NEW --- Initialize router
  const router = useRouter();
  /* -------------------- state -------------------------------------- */
  const [showDeleteContentConfirm, setShowDeleteContentConfirm] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<string | null>(null);
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

  // --- NEW --- State to manage the delete confirmation modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState<string | null>(null);

  // --- NEW --- State variables to manage the new content functionality inside the modal
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadConfig, setUploadConfig] = useState<{
    courseId: string;
    moduleId: string;
    contentType: 'VIDEO' | 'PPT' | 'NOTES';
  } | null>(null);


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
  /* CRUD handlers                                                     */
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
      modules: [], // --- NEW --- Initialize modules array
    });
    setSkillsInput("");
    setTagsInput("");
    setShowModal(true);
  };

  const handleEditClick = async (course: Course) => {
    setLoading(true);
    try {
      // Use course.id, which is guaranteed to exist after the transform
      const id = course.id ?? course._id;
      const res = await axios.get(`/api/courses/${id}?populate=true`);
      setCurrentCourse({ ...res.data.course, id: res.data.course._id });
      setSkillsInput(res.data.course.skills?.join(", ") || "");
      setTagsInput(res.data.course.tags?.join(", ") || "");
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch full course details. Opening with existing data.");
      // Fallback to original behavior if the API fails
      setCurrentCourse({ ...course, id: course.id ?? course._id });
      setSkillsInput(course.skills?.join(", ") || "");
      setTagsInput(course.tags?.join(", ") || "");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
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
        // --- THIS IS AN UPDATE ---
        const id = currentCourse.id ?? currentCourse._id;
        const res = await axios.put(`/api/courses/${id}`, courseData);
        setCourses((prev) =>
          prev.map((c) => ((c.id ?? c._id) === id ? res.data.course : c)),
        );
        alert("Course updated successfully!");
        setShowModal(false); // Close modal on successful update
      } else {
        // --- THIS IS A NEW COURSE CREATION ---
        const res = await axios.post("/api/courses", courseData);
        const newCourse = res.data.course;
        setCourses((prev) => [...prev, newCourse]);
        alert("Course created successfully! You can now add modules and content.");
        // --- NEW --- Instead of closing, update the state with the new course ID to unlock the content section
        setCurrentCourse({ ...newCourse, id: newCourse._id });
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.error ?? "Failed to save course");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- NEW --- Handlers for adding modules and opening the upload modal
  const handleAddModule = async () => {
    if (!newModuleTitle.trim() || !currentCourse?._id) {
      alert("Module title cannot be empty, and the course must be saved before adding modules.");
      return;
    }
    try {
      const res = await axios.post('/api/modules', {
        title: newModuleTitle,
        courseId: currentCourse._id,
      });
      const newModule = res.data;
      // Update the state to show the new module immediately in the UI
      setCurrentCourse(prev => ({
        ...prev,
        modules: [...(prev?.modules || []), newModule],
      }));
      setNewModuleTitle(""); // Clear the input field after adding
    } catch (err) {
      console.error("Failed to add module", err);
      alert("An error occurred while adding the module.");
    }
  };

  // --- NEW --- Add this handler for deleting modules
  const handleDeleteModule = async () => {
    if (!moduleToDelete) return; // Exit if no module is selected for deletion

    try {
      await axios.delete(`/api/modules/${moduleToDelete}`);

      // Update the UI instantly by removing the module from the state
      setCurrentCourse(prev => {
        if (!prev || !prev.modules) return prev;
        return {
          ...prev,
          modules: prev.modules.filter(m => m._id !== moduleToDelete),
        };
      });

      alert("Module deleted successfully.");
    } catch (err) {
      console.error("Failed to delete module:", err);
      alert("An error occurred while deleting the module.");
    } finally {
      // --- NEW --- Close the confirmation modal and reset the state
      setShowDeleteConfirm(false);
      setModuleToDelete(null);
    }
  };

  const openDeleteConfirm = (moduleId: string) => {
    setModuleToDelete(moduleId);
    setShowDeleteConfirm(true);
  }

  const handleOpenUploadModal = (moduleId: string, contentType: 'VIDEO' | 'PPT' | 'NOTES') => {
    setUploadConfig({
      courseId: currentCourse?._id!,
      moduleId,
      contentType,
    });
    setShowUploadModal(true);
  };

  /* ------------------------------------------------------------------ */
  /* Helpers for dynamic changes                                       */
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

  // --- NEW --- Handlers for deleting a specific content item
  const openDeleteContentConfirm = (contentId: string) => {
    setContentToDelete(contentId);
    setShowDeleteContentConfirm(true);
  };

  const handleDeleteContent = async () => {
    if (!contentToDelete) return;

    try {
      await axios.delete(`/api/content/${contentToDelete}`);

      // Instantly update the UI
      setCurrentCourse(prev => {
        if (!prev || !prev.modules) return prev;
        const newModules = prev.modules.map(module => ({
          ...module,
          content: module.content.filter(c => c._id !== contentToDelete),
        }));
        return { ...prev, modules: newModules };
      });

      alert("Content deleted successfully.");
    } catch (err) {
      console.error("Failed to delete content:", err);
      alert("An error occurred while deleting the content.");
    } finally {
      setShowDeleteContentConfirm(false);
      setContentToDelete(null);
    }
  };

  const handleEditContentClick = (contentId: string) => {
    // Navigate to the new edit page
    router.push(`/super-admin/courses/${currentCourse?._id}/edit-content/${contentId}`);
  };

  /* ------------------------------------------------------------------ */
  /* UI                                                                */
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
                            className={`text-xs px-2 py-0.5 ${levelColours[course.level ?? ""] ??
                              "bg-gray-800/50 border-gray-700 text-gray-400"
                              }`}
                          >
                            {course.level}
                          </Badge>
                          <Badge
                            className={`text-xs px-2 py-0.5 ${categoryColours[course.category] ??
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
                disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                  disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                  disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                  disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                  disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                  disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                  disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                  disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                  disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                  disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                  disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                  disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
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
                  disabled={!!currentCourse?._id} // --- NEW --- Disable after creation
                />
                Certificate
              </label>
            </div>

            {/* --- NEW SECTION FOR COURSE CONTENT & MODULES --- */}
            {/* --- This section is now always visible, but its content changes based on if the course is saved --- */}
            <div className="pt-6 border-t border-gray-700 mt-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-100 mb-4">Course Content & Modules</h3>

              {/* --- This logic shows the content manager if the course has an ID, or a message if it's a new course --- */}
              {currentCourse?._id ? (
                <>
                  {/* Display Existing Modules */}
                  <div className="space-y-4">
                    {currentCourse.modules?.map(module => (
                      <div key={module._id} className="bg-gray-850/50 p-4 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center mb-3">
                          <p className="font-semibold text-gray-100 text-base">{module.title}</p>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="h-7 w-7 bg-red-900/40 text-red-400 hover:bg-red-900/80"
                            onClick={() => openDeleteConfirm(module._id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* --- NEW --- Content Item List */}
                        <div className="space-y-2 pt-3 border-t border-gray-700/50">
                          {module.content && module.content.length > 0 ? (
                            module.content.map(item => (
                              <div key={item._id} className="flex items-center justify-between bg-gray-900/50 p-2 rounded-md">
                                <div className="flex items-center gap-3">
                                  <div className="flex-shrink-0 h-10 w-16 bg-gray-700 rounded-sm flex items-center justify-center">
                                    {item.thumbnailUrl ? (
                                      <img src={item.thumbnailUrl} alt={item.title} className="h-full w-full object-cover rounded-sm" />
                                    ) : (
                                      item.type === 'VIDEO' ? <Video className="h-5 w-5 text-gray-400" /> :
                                        item.type === 'PPT' ? <Presentation className="h-5 w-5 text-gray-400" /> :
                                          <FileText className="h-5 w-5 text-gray-400" />
                                    )}
                                  </div>
                                  <p className="text-sm font-medium text-gray-300 truncate">{item.title}</p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7 border-gray-600 hover:bg-gray-700"
                                    onClick={() => handleEditContentClick(item._id)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="destructive" size="icon" onClick={() => openDeleteContentConfirm(item._id)} className="h-7 w-7 bg-red-900/40 text-red-400 hover:bg-red-900/80">
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-gray-500 text-center py-2">No content has been added to this module yet.</p>
                          )}
                        </div>

                        {/* Add Content Buttons */}
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-700/50">
                          <Button size="sm" variant="outline" onClick={() => handleOpenUploadModal(module._id, 'VIDEO')} className="border-gray-600 hover:bg-gray-700 text-xs"><Video className="h-3 w-3 mr-1.5" /> Add Video</Button>
                          <Button size="sm" variant="outline" onClick={() => handleOpenUploadModal(module._id, 'PPT')} className="border-gray-600 hover:bg-gray-700 text-xs"><Presentation className="h-3 w-3 mr-1.5" /> Add PPT</Button>
                          <Button size="sm" variant="outline" onClick={() => handleOpenUploadModal(module._id, 'NOTES')} className="border-gray-600 hover:bg-gray-700 text-xs"><FileText className="h-3 w-3 mr-1.5" /> Add Notes</Button>
                        </div>
                      </div>
                    ))}
                    {currentCourse.modules?.length === 0 && (
                      <p className="text-sm text-gray-500 text-center py-4">No modules created yet. Add one below to start.</p>
                    )}
                  </div>

                  {/* Add New Module */}
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <label className="mb-2 block text-sm font-semibold text-gray-300">Add a New Module</label>
                    <div className="flex items-center gap-2">
                      <Input
                        value={newModuleTitle}
                        onChange={(e) => setNewModuleTitle(e.target.value)}
                        placeholder="e.g., Module 1: Introduction to Data Science"
                        className="bg-gray-800 border-gray-700"
                      />
                      <Button onClick={handleAddModule} disabled={!newModuleTitle || isSubmitting}>
                        <Plus className="h-4 w-4 mr-2" /> Add Module
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                // --- This message shows for brand new courses ---
                <div className="text-center text-gray-500 text-sm py-4 bg-gray-900 rounded-lg">
                  <p>Please save the course details first to enable adding modules and content.</p>
                </div>
              )}
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
                {/* --- NEW --- The button text changes to "Close" after the first save */}
                {currentCourse?._id ? "Close" : "Cancel"}
              </Button>
              {/* --- NEW --- The main submit button is only shown if the course has NOT been created yet */}
              {!currentCourse?._id && (
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
                      Save and Continue
                    </>
                  )}
                </Button>
              )}
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* --- NEW --- This renders the separate Upload Modal when triggered by the buttons above */}
      {uploadConfig && (
        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          courseId={uploadConfig.courseId}
          moduleId={uploadConfig.moduleId}
          contentType={uploadConfig.contentType}
        />
      )}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteModule}
        title="Delete Module"
        description="Are you sure you want to delete this module? All of its content (videos, notes, etc.) will be permanently removed. This action cannot be undone."
      />

      <ConfirmationModal
        isOpen={showDeleteContentConfirm}
        onClose={() => setShowDeleteContentConfirm(false)}
        onConfirm={handleDeleteContent}
        title="Delete Content Item"
        description="Are you sure you want to delete this content item? This action cannot be undone."
      />
    </div>
  );
};

export default ManageCoursesPage;