import React, { useState, useEffect, useCallback, useRef } from "react";
import { HiX, HiChevronDown } from "react-icons/hi";
import {
  uploadImage,
  deleteCloudinaryImage,
} from "../services/cloudinaryService";
import {
  addProject,
  updateProject,
  type Project,
  MAX_IMAGES,
} from "../services/projectService";
import type { Category } from "../services/categoryService";
import { useToast } from "../context/ToastContext";
import DatePicker from "./DatePicker";

function parseDateToIso(str: string): string {
  if (!str.trim()) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(str.trim())) return str.trim();
  const d = new Date(str);
  if (!Number.isNaN(d.getTime())) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  return "";
}

function formatIsoToDisplay(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T12:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type ImageSlot =
  | { type: "existing"; url: string; publicId?: string }
  | { type: "new"; file: File; preview: string };

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message?: string) => void;
  initialProject?: Project | null;
  /** Categories from API (id + name) for dropdown; selecting sends projectCategoryId, typing sends projectCategory name. */
  existingCategories?: Category[];
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialProject = null,
  existingCategories = [],
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [titleLine1, setTitleLine1] = useState("");
  const [titleLine2, setTitleLine2] = useState("");
  const [projectCategoryId, setProjectCategoryId] = useState<string | null>(null);
  const [projectCategoryInput, setProjectCategoryInput] = useState("");
  const [smallDescription, setSmallDescription] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [client, setClient] = useState("");
  const [overview, setOverview] = useState("");
  const [results, setResults] = useState("");
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([]);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  const isEdit = Boolean(initialProject?.id);

  useEffect(() => {
    if (!categoryDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(e.target as Node)
      ) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [categoryDropdownOpen]);

  const categorySuggestions = projectCategoryInput.trim()
    ? existingCategories.filter((c) =>
        (c.name || "")
          .toLowerCase()
          .includes(projectCategoryInput.trim().toLowerCase()),
      )
    : existingCategories;

  const resetForm = useCallback(() => {
    setTitleLine1("");
    setTitleLine2("");
    setProjectCategoryId(null);
    setProjectCategoryInput("");
    setSmallDescription("");
    setDate("");
    setType("");
    setClient("");
    setOverview("");
    setResults("");
    setCoverImageFile(null);
    setCoverImagePreview("");
    setImageSlots([]);
    setError("");
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    if (initialProject) {
      setTitleLine1(initialProject.titleLine1);
      setTitleLine2(initialProject.titleLine2);
      setProjectCategoryId(initialProject.projectCategoryId ?? null);
      setProjectCategoryInput(initialProject.projectCategory ?? "");
      setSmallDescription(initialProject.smallDescription || "");
      setDate(parseDateToIso(initialProject.date || ""));
      setType(initialProject.type || "");
      setClient(initialProject.client || "");
      setOverview(initialProject.overview || "");
      setResults(initialProject.results || "");
      setCoverImageFile(null);
      setCoverImagePreview(initialProject.coverImageUrl || "");
      const urls = initialProject.imageUrls || [];
      const ids = initialProject.imagePublicIds || [];
      setImageSlots(
        urls.map((url, i) => ({
          type: "existing" as const,
          url,
          publicId: ids[i],
        })),
      );
    } else {
      resetForm();
    }
  }, [isOpen, initialProject, resetForm]);

  const revokeNewPreviews = () => {
    if (coverImageFile && coverImagePreview) URL.revokeObjectURL(coverImagePreview);
    imageSlots.forEach((slot) => {
      if (slot.type === "new") URL.revokeObjectURL(slot.preview);
    });
  };

  const handleClose = () => {
    revokeNewPreviews();
    resetForm();
    onClose();
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) {
      if (coverImageFile && coverImagePreview) URL.revokeObjectURL(coverImagePreview);
      setCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleRemoveCover = () => {
    setCoverImageFile(null);
    if (coverImagePreview && coverImageFile) URL.revokeObjectURL(coverImagePreview);
    setCoverImagePreview("");
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || imageSlots.length >= MAX_IMAGES) return;
    setImageSlots((prev) => [
      ...prev,
      { type: "new", file, preview: URL.createObjectURL(file) },
    ]);
    setError("");
  };

  const handleRemoveImage = (index: number) => {
    setImageSlots((prev) => {
      const slot = prev[index];
      if (slot.type === "new") URL.revokeObjectURL(slot.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!titleLine1.trim() || !titleLine2.trim()) {
      setError("Title 1st Line and Title 2nd Line are required.");
      toast.error("Title 1st Line and Title 2nd Line are required.");
      return;
    }
    if (!projectCategoryInput.trim()) {
      setError("Project category is required.");
      toast.error("Project category is required.");
      return;
    }
    if (imageSlots.length === 0) {
      setError("Add at least one project image (max 10).");
      toast.error("Add at least one project image (max 10).");
      return;
    }

    setLoading(true);
    try {
      const basePayload = {
        titleLine1: titleLine1.trim(),
        titleLine2: titleLine2.trim(),
        smallDescription: smallDescription.trim(),
        date: date ? formatIsoToDisplay(date) : "",
        type: type.trim(),
        client: client.trim(),
        overview: overview.trim(),
        results: results.trim(),
      };
      const categoryPayload = projectCategoryId
        ? { projectCategoryId }
        : { projectCategory: projectCategoryInput.trim() };

      let coverImageUrl = initialProject?.coverImageUrl ?? "";
      let coverImagePublicId = initialProject?.coverImagePublicId ?? "";

      if (isEdit && initialProject?.id && coverImageFile) {
        const oldCoverId =
          initialProject.coverImagePublicId ||
          `${initialProject.id}_cover`;
        try {
          await deleteCloudinaryImage(oldCoverId);
        } catch {
          // ignore
        }
        const { url, publicId } = await uploadImage(
          coverImageFile,
          "projects",
          `${initialProject.id}_cover`,
        );
        coverImageUrl = url;
        coverImagePublicId = publicId;
      }

      if (isEdit && initialProject?.id) {
        const imageUrls: string[] = [];
        const imagePublicIds: string[] = [];
        for (let i = 0; i < imageSlots.length; i++) {
          const slot = imageSlots[i];
          if (slot.type === "existing") {
            imageUrls.push(slot.url);
            if (slot.publicId) imagePublicIds.push(slot.publicId);
          } else {
            const { url, publicId } = await uploadImage(
              slot.file,
              "projects",
              `${initialProject.id}_${i}`,
            );
            imageUrls.push(url);
            imagePublicIds.push(publicId);
          }
        }
        await updateProject(initialProject.id, {
          ...basePayload,
          ...categoryPayload,
          coverImageUrl,
          coverImagePublicId,
          imageUrls,
          imagePublicIds,
        });
        handleClose();
        onSuccess("Project updated.");
      } else {
        const id = await addProject({
          ...basePayload,
          ...categoryPayload,
          coverImageUrl: "",
          coverImagePublicId: "",
          imageUrls: [],
          imagePublicIds: [],
        });
        if (coverImageFile) {
          const { url, publicId } = await uploadImage(
            coverImageFile,
            "projects",
            `${id}_cover`,
          );
          coverImageUrl = url;
          coverImagePublicId = publicId;
        }
        const imageUrls: string[] = [];
        const imagePublicIds: string[] = [];
        for (let i = 0; i < imageSlots.length; i++) {
          const slot = imageSlots[i];
          if (slot.type === "existing") {
            imageUrls.push(slot.url);
            if (slot.publicId) imagePublicIds.push(slot.publicId);
          } else {
            const { url, publicId } = await uploadImage(
              slot.file,
              "projects",
              `${id}_${i}`,
            );
            imageUrls.push(url);
            imagePublicIds.push(publicId);
          }
        }
        await updateProject(id, {
          ...basePayload,
          ...categoryPayload,
          coverImageUrl,
          coverImagePublicId,
          imageUrls,
          imagePublicIds,
        });
        handleClose();
        onSuccess("Project added.");
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : isEdit
            ? "Failed to update project. Please try again."
            : "Failed to add project. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-white">
            {isEdit ? "Edit Project" : "Add Project"}
          </h2>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/30 border border-red-500/50 rounded-md">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm uppercase mb-1">
                Title 1st Line *
              </label>
              <input
                type="text"
                value={titleLine1}
                onChange={(e) => setTitleLine1(e.target.value)}
                required
                className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-white text-sm uppercase mb-1">
                Title 2nd Line *
              </label>
              <input
                type="text"
                value={titleLine2}
                onChange={(e) => setTitleLine2(e.target.value)}
                required
                className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm"
              />
            </div>
          </div>

          <div ref={categoryDropdownRef} className="relative">
            <label className="block text-white text-sm uppercase mb-1">
              Project category *
            </label>
            <div className="relative flex items-stretch">
              <input
                type="text"
                value={projectCategoryInput}
                onChange={(e) => {
                  setProjectCategoryInput(e.target.value);
                  setProjectCategoryId(null);
                  setCategoryDropdownOpen(true);
                }}
                onFocus={() => setCategoryDropdownOpen(true)}
                placeholder="Type or select a category"
                required
                className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md rounded-r-none py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm pr-2"
              />
              {projectCategoryInput.trim() ? (
                <button
                  type="button"
                  onClick={() => {
                    setProjectCategoryId(null);
                    setProjectCategoryInput("");
                    setCategoryDropdownOpen(false);
                  }}
                  className="border border-l-0 border-[#333333] bg-[#333333] text-white/70 hover:text-white hover:bg-[#404040] px-3 focus:outline-none focus:ring-0"
                  aria-label="Clear category"
                >
                  <HiX className="w-5 h-5" />
                </button>
              ) : null}
              <button
                type="button"
                onClick={() =>
                  setCategoryDropdownOpen((open) => !open)
                }
                className="border border-l-0 border-[#333333] rounded-r-md bg-[#333333] text-white/70 hover:text-white hover:bg-[#404040] px-3 focus:outline-none focus:ring-0"
                aria-label="Toggle category list"
              >
                <HiChevronDown
                  className={`w-5 h-5 transition-transform ${
                    categoryDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
            {categoryDropdownOpen && (
              <ul
                className="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto border border-[#333333] rounded-md bg-[#262626] shadow-lg py-1"
                role="listbox"
              >
                {categorySuggestions.length > 0 ? (
                  categorySuggestions.map((cat) => (
                    <li
                      key={cat.id}
                      role="option"
                      className="px-3 py-2 text-white text-sm cursor-pointer hover:bg-[#FF0000]/20 focus:bg-[#FF0000]/20 focus:outline-none"
                      onClick={() => {
                        setProjectCategoryId(cat.id);
                        setProjectCategoryInput(cat.name || "");
                        setCategoryDropdownOpen(false);
                      }}
                    >
                      {cat.name}
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-white/50 text-sm">
                    No matching category. Type and use your own.
                  </li>
                )}
              </ul>
            )}
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-1">
              Small description
            </label>
            <textarea
              value={smallDescription}
              onChange={(e) => setSmallDescription(e.target.value)}
              rows={2}
              className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm resize-y"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white text-sm uppercase mb-1">
                Date
              </label>
              <DatePicker
                value={date}
                onChange={setDate}
                placeholder="e.g. Jan 12, 2026"
              />
            </div>
            <div>
              <label className="block text-white text-sm uppercase mb-1">
                Type
              </label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g. Graphic Design"
                className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-white text-sm uppercase mb-1">
                Client
              </label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. TD Creative"
                className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-1">
              Overview
            </label>
            <textarea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              rows={3}
              className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm resize-y"
            />
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-1">
              Results
            </label>
            <textarea
              value={results}
              onChange={(e) => setResults(e.target.value)}
              rows={3}
              className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm resize-y"
            />
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-1">
              Cover image
            </label>
            {!coverImagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#333333] hover:border-[#FF0000] transition-all duration-500 rounded-md cursor-pointer bg-[#333333]/30">
                <span className="text-white/70 text-sm mb-1">
                  Click or drag to upload cover
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative">
                <div className="w-full max-h-40 rounded-md overflow-hidden bg-[#333333]/30 border border-[#333333]">
                  <img
                    src={coverImagePreview}
                    alt="Cover"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCover}
                  className="absolute top-2 right-2 p-2 rounded-full bg-black/60 hover:bg-red-500/80 text-white transition-colors"
                >
                  <HiX className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-1">
              Project images (max {MAX_IMAGES}) *
            </label>
            <div className="flex flex-wrap gap-3">
              {imageSlots.map((slot, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 rounded-md overflow-hidden bg-[#333333]/50 border border-[#333333] flex-shrink-0"
                >
                  <img
                    src={slot.type === "existing" ? slot.url : slot.preview}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0.5 right-0.5 p-1 rounded-full bg-black/70 hover:bg-red-500/80 text-white"
                  >
                    <HiX className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {imageSlots.length < MAX_IMAGES && (
                <label className="w-24 h-24 rounded-md border-2 border-dashed border-[#333333] hover:border-[#FF0000] flex items-center justify-center cursor-pointer flex-shrink-0 text-white/50 text-xs">
                  <span>+ Add</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAddImage}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 border border-white/30 hover:border-white/50 hover:bg-white/5 transition-all duration-300 py-3 px-6 text-white text-sm uppercase font-semibold rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 border border-[#FF0000] bg-[#FF0000]/20 hover:bg-[#FF0000]/30 text-white transition-all duration-300 py-3 px-6 text-sm uppercase font-semibold rounded-md disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading
                ? isEdit
                  ? "Updating…"
                  : "Adding…"
                : isEdit
                  ? "Update Project"
                  : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
