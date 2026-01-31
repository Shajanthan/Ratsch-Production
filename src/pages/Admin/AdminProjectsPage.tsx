import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  HiOutlineExclamation,
  HiOutlinePencil,
  HiOutlineTrash,
  HiX,
} from "react-icons/hi";
import AddProjectModal from "../../components/AddProjectModal";
import {
  getProjects,
  deleteProject,
  type Project,
} from "../../services/projectService";
import {
  getCategories,
  updateCategory,
  deleteCategory,
  type Category,
} from "../../services/categoryService";
import { useToast } from "../../context/ToastContext";

type ProjectsTab = "projects" | "categories";

const TABS: { id: ProjectsTab; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "categories", label: "Categories" },
];

const AdminProjectsPage: React.FC = () => {
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [savingCategory, setSavingCategory] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<ProjectsTab>("projects");
  const [projectPage, setProjectPage] = useState(1);
  const [categoryPage, setCategoryPage] = useState(1);

  const PROJECT_PER_PAGE = 5;
  const projectTotalPages = useMemo(
    () => Math.max(1, Math.ceil(projects.length / PROJECT_PER_PAGE)),
    [projects.length],
  );
  const paginatedProjects = useMemo(
    () =>
      projects.slice(
        (projectPage - 1) * PROJECT_PER_PAGE,
        projectPage * PROJECT_PER_PAGE,
      ),
    [projects, projectPage],
  );

  const CATEGORY_PER_PAGE = 7;
  const categoryTotalPages = useMemo(
    () => Math.max(1, Math.ceil(categories.length / CATEGORY_PER_PAGE)),
    [categories.length],
  );
  const paginatedCategories = useMemo(
    () =>
      categories.slice(
        (categoryPage - 1) * CATEGORY_PER_PAGE,
        categoryPage * CATEGORY_PER_PAGE,
      ),
    [categories, categoryPage],
  );

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to load projects";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const loadCategories = useCallback(async () => {
    setCategoriesLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load categories");
    } finally {
      setCategoriesLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    if (projectPage > projectTotalPages) setProjectPage(1);
  }, [projectPage, projectTotalPages]);

  useEffect(() => {
    if (categoryPage > categoryTotalPages) setCategoryPage(1);
  }, [categoryPage, categoryTotalPages]);

  const handleSuccess = (message?: string) => {
    setEditingProject(null);
    void loadProjects();
    void loadCategories();
    if (message) toast.success(message);
  };

  const openEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryName(cat.name ?? "");
    setCategoryDescription(cat.description ?? "");
  };
  const openDeleteCategoryConfirm = (cat: Category) => setCategoryToDelete(cat);
  const closeDeleteCategoryConfirm = () => {
    if (!deletingCategoryId) setCategoryToDelete(null);
  };
  const confirmDeleteCategory = async () => {
    if (!categoryToDelete?.id) return;
    setDeletingCategoryId(categoryToDelete.id);
    try {
      await deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
      void loadCategories();
      toast.success("Category deleted.");
    } catch (e: unknown) {
      const msg =
        e && typeof e === "object" && "response" in e
          ? (e as { response?: { data?: { message?: string } } }).response?.data
              ?.message
          : e instanceof Error
          ? e.message
          : "Failed to delete category";
      toast.error(msg ?? "Failed to delete category");
    } finally {
      setDeletingCategoryId(null);
    }
  };
  const closeEditCategory = () => {
    setEditingCategory(null);
    setCategoryName("");
    setCategoryDescription("");
  };
  const saveCategory = async () => {
    if (!editingCategory?.id) return;
    if (!categoryName.trim()) {
      toast.error("Category name is required.");
      return;
    }
    setSavingCategory(true);
    try {
      await updateCategory(editingCategory.id, {
        name: categoryName.trim(),
        description: categoryDescription,
      });
      void loadCategories();
      void loadProjects();
      closeEditCategory();
      toast.success(
        "Category updated. Associated projects will show the new name.",
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update category");
    } finally {
      setSavingCategory(false);
    }
  };

  const openAddModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const openDeleteConfirm = (project: Project) => setProjectToDelete(project);
  const closeDeleteConfirm = () => {
    if (!deletingId) setProjectToDelete(null);
  };

  const confirmDelete = async () => {
    if (!projectToDelete?.id) return;
    setDeletingId(projectToDelete.id);
    try {
      await deleteProject(projectToDelete.id);
      setProjectToDelete(null);
      void loadProjects();
      toast.success("Project deleted.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to delete project";
      setError(msg);
      toast.error(msg);
    } finally {
      setDeletingId(null);
    }
  };

  const thumbnail = (p: Project) =>
    p.coverImageUrl || (p.imageUrls?.length ? p.imageUrls[0] : "");

  /** Categories from API (id + name) for AddProjectModal; modal sends projectCategoryId when selected. */
  const existingCategories = categories;

  return (
    <div className="text-white">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2">
            Projects Management
          </h2>
          <p className="text-white/70 text-sm md:text-base">
            Manage your portfolio projects and categories.
          </p>
        </div>

        {/* Tabs + Add Project (same row when Projects tab active) */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6 border-b border-white/10 pb-4">
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-semibold uppercase rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-[#FF0000]/30 border border-[#FF0000] text-white"
                    : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === "projects" && (
            <button
              onClick={openAddModal}
              className="border border-white hover:border-[#FF0000] transition-all duration-300 py-2 px-6 text-white text-sm md:text-base uppercase font-semibold rounded-md hover:bg-[#FF0000]/10"
            >
              Add Project
            </button>
          )}
        </div>

        {/* Projects tab */}
        {activeTab === "projects" && (
          <>
            {loading ? (
              <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
                <p className="text-white/70">Loading projects…</p>
              </div>
            ) : error ? (
              <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
                <p className="text-red-400">{error}</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
                <p className="text-white/50 text-lg">No projects yet.</p>
                <p className="text-white/40 text-sm mt-2">
                  Add one using the button above.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto overflow-y-auto h-[30.4rem]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold w-20">
                          Image
                        </th>
                        <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold">
                          Title
                        </th>
                        <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold hidden sm:table-cell">
                          Date
                        </th>
                        <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold hidden md:table-cell">
                          Type
                        </th>
                        <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold hidden lg:table-cell">
                          Category
                        </th>
                        <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold hidden lg:table-cell">
                          Client
                        </th>
                        <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold text-right w-28">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedProjects.map((p) => (
                        <tr
                          key={p.id}
                          className="border-b border-white/10 hover:bg-white/5 transition-colors"
                        >
                          <td className="py-3 px-2">
                            <div className="w-16 h-16 rounded overflow-hidden bg-white/10 flex-shrink-0">
                              {thumbnail(p) ? (
                                <img
                                  src={thumbnail(p)}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="w-full h-full flex items-center justify-center text-white/40 text-xs">
                                  —
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-2 font-medium">
                            {p.titleLine1} {p.titleLine2}
                          </td>
                          <td className="py-3 px-2 text-white/80 hidden sm:table-cell">
                            {p.date || "—"}
                          </td>
                          <td className="py-3 px-2 text-white/80 hidden md:table-cell">
                            {p.type || "—"}
                          </td>
                          <td className="py-3 px-2 text-white/80 hidden lg:table-cell">
                            {p.projectCategory || "—"}
                          </td>
                          <td className="py-3 px-2 text-white/80 hidden lg:table-cell">
                            {p.client || "—"}
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => openEditModal(p)}
                                className="inline-flex items-center gap-2 border border-white/40 hover:border-[#FF0000] hover:bg-[#FF0000]/10 transition-all duration-300 py-2 px-4 text-white text-xs uppercase font-semibold rounded-md"
                              >
                                <HiOutlinePencil className="w-4 h-4 flex-shrink-0" />
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => openDeleteConfirm(p)}
                                disabled={deletingId === p.id}
                                className="inline-flex items-center gap-2 border border-white/40 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 py-2 px-4 text-white text-xs uppercase font-semibold rounded-md disabled:opacity-50"
                              >
                                <HiOutlineTrash className="w-4 h-4 flex-shrink-0" />
                                {deletingId === p.id ? "Deleting…" : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <p className="text-white/60 text-sm">
                    Showing{" "}
                    <span className="font-medium text-white">
                      {(projectPage - 1) * PROJECT_PER_PAGE + 1}–
                      {Math.min(
                        projectPage * PROJECT_PER_PAGE,
                        projects.length,
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-white">
                      {projects.length}
                    </span>{" "}
                    projects
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setProjectPage((p) => Math.max(1, p - 1))}
                      disabled={projectPage <= 1}
                      className="select-none border border-white/30 hover:border-[#FF0000] hover:bg-[#FF0000]/10 disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 py-2 px-4 text-white text-sm font-semibold rounded-md"
                    >
                      Previous
                    </button>
                    <span className="text-white/70 text-sm px-2">
                      Page {projectPage} of {projectTotalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setProjectPage((p) =>
                          Math.min(projectTotalPages, p + 1),
                        )
                      }
                      disabled={projectPage >= projectTotalPages}
                      className="select-none border border-white/30 hover:border-[#FF0000] hover:bg-[#FF0000]/10 disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 py-2 px-4 text-white text-sm font-semibold rounded-md"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* Categories tab – table like Admin Client Review */}
        {activeTab === "categories" && (
          <div>
            {categoriesLoading ? (
              <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
                <p className="text-white/70">Loading categories…</p>
              </div>
            ) : categories.length === 0 ? (
              <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
                <p className="text-white/50 text-lg">No categories yet.</p>
                <p className="text-white/40 text-sm mt-2">
                  Add a project with a category to create one.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto overflow-y-auto h-[30.4rem]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold">
                          Name
                        </th>
                        <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold hidden md:table-cell">
                          Description
                        </th>
                        <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold text-right w-28">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedCategories.map((cat) => (
                        <tr
                          key={cat.id}
                          className="border-b border-white/10 hover:bg-white/5 transition-colors"
                        >
                          <td className="py-3 px-2 font-medium text-white">
                            {cat.name}
                          </td>
                          <td
                            className="py-3 px-2 text-white/80 text-sm hidden md:table-cell max-w-md truncate"
                            title={cat.description || undefined}
                          >
                            {cat.description || "—"}
                          </td>
                          <td className="py-3 px-2 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => openEditCategory(cat)}
                                className="inline-flex items-center gap-2 border border-white/40 hover:border-[#FF0000] hover:bg-[#FF0000]/10 transition-all duration-300 py-2 px-4 text-white text-xs uppercase font-semibold rounded-md"
                                title="Edit"
                              >
                                <HiOutlinePencil className="w-4 h-4 flex-shrink-0" />
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => openDeleteCategoryConfirm(cat)}
                                disabled={deletingCategoryId === cat.id}
                                className="inline-flex items-center gap-2 border border-white/40 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 py-2 px-4 text-white text-xs uppercase font-semibold rounded-md disabled:opacity-50"
                                title="Delete"
                              >
                                <HiOutlineTrash className="w-4 h-4 flex-shrink-0" />
                                {deletingCategoryId === cat.id
                                  ? "Deleting…"
                                  : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <p className="text-white/60 text-sm">
                    Showing{" "}
                    <span className="font-medium text-white">
                      {(categoryPage - 1) * CATEGORY_PER_PAGE + 1}–
                      {Math.min(
                        categoryPage * CATEGORY_PER_PAGE,
                        categories.length,
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-white">
                      {categories.length}
                    </span>{" "}
                    categories
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCategoryPage((p) => Math.max(1, p - 1))}
                      disabled={categoryPage <= 1}
                      className="select-none border border-white/30 hover:border-[#FF0000] hover:bg-[#FF0000]/10 disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 py-2 px-4 text-white text-sm font-semibold rounded-md"
                    >
                      Previous
                    </button>
                    <span className="text-white/70 text-sm px-2">
                      Page {categoryPage} of {categoryTotalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setCategoryPage((p) =>
                          Math.min(categoryTotalPages, p + 1),
                        )
                      }
                      disabled={categoryPage >= categoryTotalPages}
                      className="select-none border border-white/30 hover:border-[#FF0000] hover:bg-[#FF0000]/10 disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 py-2 px-4 text-white text-sm font-semibold rounded-md"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <AddProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        initialProject={editingProject}
        existingCategories={existingCategories}
      />

      {/* Delete category confirm modal */}
      {categoryToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeDeleteCategoryConfirm}
          />
          <div
            className="relative z-50 w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                <HiOutlineExclamation className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold uppercase text-white mb-2">
                  Delete category?
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  This will delete the category{" "}
                  <span className="font-semibold text-white">
                    {categoryToDelete.name}
                  </span>
                  . This is only allowed if no project uses this category. If
                  any project is linked to it, the delete will be cancelled.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={closeDeleteCategoryConfirm}
                disabled={!!deletingCategoryId}
                className="flex-1 border border-white/30 hover:border-white/50 hover:bg-white/5 transition-all duration-300 py-3 px-6 text-white text-sm uppercase font-semibold rounded-md disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteCategory}
                disabled={!!deletingCategoryId}
                className="flex-1 border border-red-500 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-white transition-all duration-300 py-3 px-6 text-sm uppercase font-semibold rounded-md disabled:opacity-50"
              >
                {deletingCategoryId ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit category (name + description) modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeEditCategory}
          />
          <div
            className="relative z-50 w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold uppercase text-white">
                Edit category
              </h3>
              <button
                type="button"
                onClick={closeEditCategory}
                className="text-white/70 hover:text-white"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>
            <label className="block text-white/80 text-sm uppercase mb-1">
              Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm mb-4"
              placeholder="Category name"
            />
            <label className="block text-white/80 text-sm uppercase mb-1">
              Description
            </label>
            <textarea
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              rows={4}
              className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm resize-y mb-4"
              placeholder="Add a description for this category…"
            />
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={closeEditCategory}
                className="border border-white/30 hover:border-white/50 py-2 px-4 text-white text-sm uppercase font-semibold rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCategory}
                disabled={savingCategory}
                className="border border-[#FF0000] bg-[#FF0000]/20 hover:bg-[#FF0000]/30 py-2 px-4 text-white text-sm uppercase font-semibold rounded-md disabled:opacity-50"
              >
                {savingCategory ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {projectToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeDeleteConfirm}
          />
          <div
            className="relative z-50 w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                <HiOutlineExclamation className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold uppercase text-white mb-2">
                  Are you sure?
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  This will permanently delete the project{" "}
                  <span className="font-semibold text-white">
                    {projectToDelete.titleLine1} {projectToDelete.titleLine2}
                  </span>{" "}
                  and all its images. This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={closeDeleteConfirm}
                disabled={!!deletingId}
                className="flex-1 border border-white/30 hover:border-white/50 hover:bg-white/5 transition-all duration-300 py-3 px-6 text-white text-sm uppercase font-semibold rounded-md disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={!!deletingId}
                className="flex-1 border border-red-500 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-white transition-all duration-300 py-3 px-6 text-sm uppercase font-semibold rounded-md disabled:opacity-50"
              >
                {deletingId ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjectsPage;
