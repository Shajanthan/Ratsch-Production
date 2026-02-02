import React, { useState, useEffect, useCallback } from "react";
import { HiX } from "react-icons/hi";
import {
  uploadImage,
  deleteCloudinaryImage,
} from "../services/cloudinaryService";
import {
  addService,
  updateService,
  type Service,
  MAX_SERVICE_IMAGES,
  MAX_BRAND_IMAGES,
  TAG_COLOR_PRESETS,
} from "../services/serviceService";
import { useToast } from "../context/ToastContext";

type ImageSlot =
  | { type: "existing"; url: string; publicId?: string }
  | { type: "new"; file: File; preview: string };

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message?: string) => void;
  initialService?: Service | null;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialService = null,
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [aboutDescription, setAboutDescription] = useState("");
  const [deliverables, setDeliverables] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [tagColor, setTagColor] = useState<string>(
    TAG_COLOR_PRESETS[0].tagColor,
  );
  const [textColor, setTextColor] = useState<string>(
    TAG_COLOR_PRESETS[0].textColor,
  );
  const [serviceImageSlots, setServiceImageSlots] = useState<ImageSlot[]>([]);
  const [brandImageSlots, setBrandImageSlots] = useState<ImageSlot[]>([]);
  const [aboutDescriptionModalOpen, setAboutDescriptionModalOpen] = useState(false);

  const isEdit = Boolean(initialService?.id);

  // Lock background scroll when About description modal is open
  useEffect(() => {
    if (!aboutDescriptionModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [aboutDescriptionModalOpen]);

  const resetForm = useCallback(() => {
    setMainImageFile(null);
    setMainImagePreview("");
    setTitle("");
    setTagLine("");
    setShortDescription("");
    setAboutDescription("");
    setDeliverables("");
    setTagsInput("");
    setTagColor(TAG_COLOR_PRESETS[0].tagColor);
    setTextColor(TAG_COLOR_PRESETS[0].textColor);
    setServiceImageSlots([]);
    setBrandImageSlots([]);
    setError("");
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    if (initialService) {
      setTitle(initialService.title || "");
      setTagLine(initialService.tagLine || "");
      setShortDescription(initialService.shortDescription || "");
      setAboutDescription(initialService.aboutDescription || "");
      setDeliverables(initialService.deliverables || "");
      setTagsInput(
        Array.isArray(initialService.tags)
          ? initialService.tags.join(", ")
          : "",
      );
      setTagColor(
        initialService.tagColor || TAG_COLOR_PRESETS[0].tagColor,
      );
      setTextColor(
        initialService.textColor || TAG_COLOR_PRESETS[0].textColor,
      );
      setMainImageFile(null);
      setMainImagePreview(initialService.mainImageUrl || "");
      const serviceUrls = initialService.serviceImageUrls || [];
      const serviceIds = initialService.serviceImagePublicIds || [];
      setServiceImageSlots(
        serviceUrls.map((url, i) => ({
          type: "existing" as const,
          url,
          publicId: serviceIds[i],
        })),
      );
      const brandUrls = initialService.brandImageUrls || [];
      const brandIds = initialService.brandImagePublicIds || [];
      setBrandImageSlots(
        brandUrls.map((url, i) => ({
          type: "existing" as const,
          url,
          publicId: brandIds[i],
        })),
      );
    } else {
      resetForm();
    }
  }, [isOpen, initialService, resetForm]);

  const revokeNewPreviews = () => {
    if (mainImageFile && mainImagePreview) URL.revokeObjectURL(mainImagePreview);
    [...serviceImageSlots, ...brandImageSlots].forEach((slot) => {
      if (slot.type === "new") URL.revokeObjectURL(slot.preview);
    });
  };

  const handleClose = () => {
    revokeNewPreviews();
    resetForm();
    onClose();
  };

  const handleMainFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) {
      if (mainImageFile && mainImagePreview)
        URL.revokeObjectURL(mainImagePreview);
      setMainImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleRemoveMain = () => {
    setMainImageFile(null);
    if (mainImagePreview && mainImageFile)
      URL.revokeObjectURL(mainImagePreview);
    setMainImagePreview("");
  };

  const handleAddServiceImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || serviceImageSlots.length >= MAX_SERVICE_IMAGES) return;
    setServiceImageSlots((prev) => [
      ...prev,
      { type: "new", file, preview: URL.createObjectURL(file) },
    ]);
    setError("");
  };

  const handleRemoveServiceImage = (index: number) => {
    setServiceImageSlots((prev) => {
      const slot = prev[index];
      if (slot.type === "new") URL.revokeObjectURL(slot.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleAddBrandImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || brandImageSlots.length >= MAX_BRAND_IMAGES) return;
    setBrandImageSlots((prev) => [
      ...prev,
      { type: "new", file, preview: URL.createObjectURL(file) },
    ]);
    setError("");
  };

  const handleRemoveBrandImage = (index: number) => {
    setBrandImageSlots((prev) => {
      const slot = prev[index];
      if (slot.type === "new") URL.revokeObjectURL(slot.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("Title is required.");
      toast.error("Title is required.");
      return;
    }
    if (!mainImagePreview && !initialService?.mainImageUrl) {
      setError("Service main image is required.");
      toast.error("Service main image is required.");
      return;
    }

    setLoading(true);
    try {
      const tags = tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const basePayload = {
        title: title.trim(),
        tagLine: tagLine.trim(),
        shortDescription: shortDescription.trim(),
        aboutDescription: aboutDescription.trim(),
        deliverables: deliverables.trim(),
        tags,
        tagColor: tagColor.trim() || undefined,
        textColor: textColor.trim() || undefined,
      };

      let mainImageUrl = initialService?.mainImageUrl ?? "";
      let mainImagePublicId = initialService?.mainImagePublicId ?? "";

      if (isEdit && initialService?.id && mainImageFile) {
        const oldId =
          initialService.mainImagePublicId ||
          `services/${initialService.id}_main`;
        try {
          await deleteCloudinaryImage(oldId);
        } catch {
          // ignore
        }
        const { url, publicId } = await uploadImage(
          mainImageFile,
          "services",
          `${initialService.id}_main`,
        );
        mainImageUrl = url;
        mainImagePublicId = publicId;
      }

      const uploadSlots = async (
        slots: ImageSlot[],
        prefix: string,
        docId: string,
      ) => {
        const urls: string[] = [];
        const publicIds: string[] = [];
        for (let i = 0; i < slots.length; i++) {
          const slot = slots[i];
          if (slot.type === "existing") {
            urls.push(slot.url);
            if (slot.publicId) publicIds.push(slot.publicId);
          } else {
            const { url, publicId } = await uploadImage(
              slot.file,
              "services",
              `${docId}_${prefix}_${i}`,
            );
            urls.push(url);
            publicIds.push(publicId);
          }
        }
        return { urls, publicIds };
      };

      if (isEdit && initialService?.id) {
        const { urls: serviceUrls, publicIds: serviceIds } =
          await uploadSlots(
            serviceImageSlots,
            "service",
            initialService.id,
          );
        const { urls: brandUrls, publicIds: brandIds } = await uploadSlots(
          brandImageSlots,
          "brand",
          initialService.id,
        );
        await updateService(initialService.id, {
          ...basePayload,
          mainImageUrl,
          mainImagePublicId,
          serviceImageUrls: serviceUrls,
          serviceImagePublicIds: serviceIds,
          brandImageUrls: brandUrls,
          brandImagePublicIds: brandIds,
        });
        handleClose();
        onSuccess("Service updated.");
      } else {
        const id = await addService({
          ...basePayload,
          mainImageUrl: "",
          mainImagePublicId: "",
          serviceImageUrls: [],
          serviceImagePublicIds: [],
          brandImageUrls: [],
          brandImagePublicIds: [],
        });
        if (mainImageFile) {
          const { url, publicId } = await uploadImage(
            mainImageFile,
            "services",
            `${id}_main`,
          );
          mainImageUrl = url;
          mainImagePublicId = publicId;
        }
        const { urls: serviceUrls, publicIds: serviceIds } =
          await uploadSlots(serviceImageSlots, "service", id);
        const { urls: brandUrls, publicIds: brandIds } = await uploadSlots(
          brandImageSlots,
          "brand",
          id,
        );
        await updateService(id, {
          ...basePayload,
          mainImageUrl,
          mainImagePublicId,
          serviceImageUrls: serviceUrls,
          serviceImagePublicIds: serviceIds,
          brandImageUrls: brandUrls,
          brandImagePublicIds: brandIds,
        });
        handleClose();
        onSuccess("Service added.");
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : isEdit
            ? "Failed to update service. Please try again."
            : "Failed to add service. Please try again.";
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
            {isEdit ? "Edit Service" : "Add Service"}
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
          <div>
            <label className="block text-white text-sm uppercase mb-1">
              Service main image *
            </label>
            {!mainImagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#333333] hover:border-[#FF0000] transition-all duration-500 rounded-md cursor-pointer bg-[#333333]/30">
                <span className="text-white/70 text-sm mb-1">
                  Click or drag to upload
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative">
                <div className="w-full max-h-40 rounded-md overflow-hidden bg-[#333333]/30 border border-[#333333]">
                  <img
                    src={mainImagePreview}
                    alt="Main"
                    className="w-full h-40 object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRemoveMain}
                  className="absolute top-2 right-2 p-2 rounded-full bg-black/60 hover:bg-red-500/80 text-white transition-colors"
                >
                  <HiX className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-1">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-1">
              Tag line *
            </label>
            <input
              type="text"
              value={tagLine}
              onChange={(e) => setTagLine(e.target.value)}
              className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm"
            />
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-1">
              Short description (Service Section card)
            </label>
            <input
              type="text"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Brief text shown on the homepage service cards"
              className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm placeholder-white/40"
            />
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-1">
              Tag color (for tags on service card)
            </label>
            <div className="flex flex-wrap gap-2 mt-1">
              {TAG_COLOR_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setTagColor(preset.tagColor);
                    setTextColor(preset.textColor);
                  }}
                  className={`rounded-full px-3 py-2 text-xs font-medium transition-all ${
                    tagColor === preset.tagColor
                      ? "ring-2 ring-white ring-offset-2 ring-offset-[#333333]"
                      : "opacity-80 hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor: preset.tagColor,
                    color: preset.textColor,
                  }}
                  title={`${preset.tagColor} / ${preset.textColor}`}
                >
                  Tag
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Video, Graphic Design, Photography"
              className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm placeholder-white/40"
            />
            {(() => {
              const tagsList = tagsInput
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);
              return tagsList.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tagsList.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-white text-xs"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => {
                          const arr = tagsInput
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean);
                          arr.splice(i, 1);
                          setTagsInput(arr.join(", "));
                        }}
                        className="hover:text-red-400 transition-colors"
                        aria-label="Remove tag"
                      >
                        <HiX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : null;
            })()}
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-1">
              About description *
            </label>
            <p className="text-white/60 text-xs mb-2">
              Type your text with indents (spaces or tabs); line breaks and indentation will show on the service page as you type.
            </p>
            <button
              type="button"
              onClick={() => setAboutDescriptionModalOpen(true)}
              className="w-full min-h-[120px] text-left border border-[#333333] hover:border-[#FF0000] rounded-md py-3 px-4 bg-[#333333]/50 focus:ring-0 focus:outline-none text-white text-sm font-mono placeholder-white/40 flex items-start justify-between gap-2"
              style={{ whiteSpace: "pre-wrap" }}
            >
              <span className="flex-1 truncate line-clamp-4">
                {aboutDescription || "Click to open editor…"}
              </span>
              <span className="flex-shrink-0 text-white/60 text-xs uppercase font-semibold">Edit</span>
            </button>
          </div>

          {/* About description – larger modal */}
          {aboutDescriptionModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setAboutDescriptionModalOpen(false)}
              />
              <div
                className="relative z-[101] w-full max-w-6xl max-h-[92vh] min-h-[560px] flex flex-col backdrop-blur-xl bg-[#1a1a1a] border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0">
                  <h3 className="text-lg font-bold uppercase text-white">
                    About description
                  </h3>
                  <button
                    type="button"
                    onClick={() => setAboutDescriptionModalOpen(false)}
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <HiX className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex-1 min-h-0 px-6 py-4">
                  <textarea
                    value={aboutDescription}
                    onChange={(e) => setAboutDescription(e.target.value)}
                    placeholder="Type your text. Use Enter for new lines and spaces/tabs for indentation—they will appear the same on the service page."
                    className="w-full h-full min-h-[480px] border border-[#333333] focus:border-[#FF0000] rounded-md py-3 px-4 bg-[#333333] focus:ring-0 focus:outline-none text-white text-sm resize-none font-mono placeholder-white/40"
                    style={{ whiteSpace: "pre" }}
                    spellCheck="true"
                    autoFocus
                  />
                </div>
                <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setAboutDescriptionModalOpen(false)}
                    className="border border-white/30 hover:border-[#FF0000] hover:bg-[#FF0000]/10 px-6 py-2.5 text-white text-sm uppercase font-semibold rounded-md transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-white text-sm uppercase mb-1">
              Deliverables *
            </label>
            <textarea
              value={deliverables}
              onChange={(e) => setDeliverables(e.target.value)}
              rows={4}
              className="w-full border border-[#333333] focus:border-[#FF0000] rounded-md py-2 bg-[#333333] focus:ring-0 focus:outline-none px-3 text-white text-sm resize-y"
            />
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-1">
              Service images (max {MAX_SERVICE_IMAGES})
            </label>
            <div className="flex flex-wrap gap-3">
              {serviceImageSlots.map((slot, index) => (
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
                    onClick={() => handleRemoveServiceImage(index)}
                    className="absolute top-0.5 right-0.5 p-1 rounded-full bg-black/70 hover:bg-red-500/80 text-white"
                  >
                    <HiX className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {serviceImageSlots.length < MAX_SERVICE_IMAGES && (
                <label className="w-24 h-24 rounded-md border-2 border-dashed border-[#333333] hover:border-[#FF0000] flex items-center justify-center cursor-pointer flex-shrink-0 text-white/50 text-xs">
                  <span>+ Add</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAddServiceImage}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-1">
              Brands images (max {MAX_BRAND_IMAGES})
            </label>
            <div className="flex flex-wrap gap-3">
              {brandImageSlots.map((slot, index) => (
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
                    onClick={() => handleRemoveBrandImage(index)}
                    className="absolute top-0.5 right-0.5 p-1 rounded-full bg-black/70 hover:bg-red-500/80 text-white"
                  >
                    <HiX className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {brandImageSlots.length < MAX_BRAND_IMAGES && (
                <label className="w-24 h-24 rounded-md border-2 border-dashed border-[#333333] hover:border-[#FF0000] flex items-center justify-center cursor-pointer flex-shrink-0 text-white/50 text-xs">
                  <span>+ Add</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAddBrandImage}
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
                  ? "Update Service"
                  : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
