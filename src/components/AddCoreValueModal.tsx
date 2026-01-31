import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import {
  uploadImage,
  deleteCloudinaryImage,
} from "../services/cloudinaryService";
import {
  addCoreValue,
  updateCoreValue,
  type CoreValue,
} from "../services/coreValueService";
import { useToast } from "../context/ToastContext";

interface AddCoreValueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message?: string) => void;
  initialCoreValue?: CoreValue | null;
}

const AddCoreValueModal: React.FC<AddCoreValueModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialCoreValue = null,
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageRemoved, setImageRemoved] = useState(false);

  const isEdit = Boolean(initialCoreValue?.id);

  useEffect(() => {
    if (isOpen && initialCoreValue) {
      setTitle(initialCoreValue.title);
      setDescription(initialCoreValue.description);
      setImageFile(null);
      setImagePreview(initialCoreValue.imageUrl || "");
      setImageRemoved(false);
    } else if (isOpen && !initialCoreValue) {
      setTitle("");
      setDescription("");
      setImageFile(null);
      setImagePreview("");
      setImageRemoved(false);
    }
  }, [isOpen, initialCoreValue]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageRemoved(false);
      setError("");
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (imagePreview && imageFile) URL.revokeObjectURL(imagePreview);
    setImagePreview("");
    setImageRemoved(true);
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setImageFile(null);
    if (imagePreview && imageFile) URL.revokeObjectURL(imagePreview);
    setImagePreview("");
    setImageRemoved(false);
    setError("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim()) {
      setError("Title is required.");
      toast.error("Title is required.");
      return;
    }
    if (!description.trim()) {
      setError("Description is required.");
      toast.error("Description is required.");
      return;
    }
    const hasImageForEdit =
      isEdit &&
      initialCoreValue &&
      (imageFile || (initialCoreValue.imageUrl && !imageRemoved));
    if (!isEdit && !imageFile) {
      setError("Image is required.");
      toast.error("Image is required.");
      return;
    }
    if (isEdit && !hasImageForEdit) {
      setError("Image is required.");
      toast.error("Image is required.");
      return;
    }

    setLoading(true);
    try {
      if (isEdit && initialCoreValue?.id) {
        let imageUrl = initialCoreValue.imageUrl;
        let imagePublicId = initialCoreValue.imagePublicId ?? "";

        if (imageFile) {
          const oldPublicId =
            initialCoreValue.imagePublicId ||
            `core-values/${initialCoreValue.id}`;
          try {
            await deleteCloudinaryImage(oldPublicId);
          } catch {
            // ignore
          }
          const { url, publicId } = await uploadImage(
            imageFile,
            "core-values",
            initialCoreValue.id,
          );
          imageUrl = url;
          imagePublicId = publicId;
        }
        // else: keep existing imageUrl and imagePublicId

        await updateCoreValue(initialCoreValue.id, {
          title: title.trim(),
          description: description.trim(),
          imageUrl,
          imagePublicId,
        });
        handleClose();
        onSuccess("Core value updated.");
      } else {
        if (!imageFile) {
          setError("Image is required.");
          toast.error("Image is required.");
          setLoading(false);
          return;
        }
        const { url, publicId } = await uploadImage(
          imageFile,
          "core-values",
        );
        await addCoreValue({
          title: title.trim(),
          description: description.trim(),
          imageUrl: url,
          imagePublicId: publicId,
        });
        handleClose();
        onSuccess("Core value added.");
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : isEdit
            ? "Failed to update core value. Please try again."
            : "Failed to add core value. Please try again.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative z-50 w-full max-w-lg max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-white">
            {isEdit ? "Edit Core Value" : "Add Core Value"}
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm uppercase mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-[#333333] hover:border-[#FF0000] focus:border-[#FF0000] transition-all duration-500 rounded-md py-3 bg-[#333333] focus:ring-0 focus:outline-none px-4 text-white"
              placeholder="e.g. Quality, Creativity"
            />
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="w-full border border-[#333333] hover:border-[#FF0000] focus:border-[#FF0000] transition-all duration-500 rounded-md py-3 bg-[#333333] focus:ring-0 focus:outline-none px-4 text-white resize-y"
              placeholder="Describe this core value"
            />
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-2">
              Image *
            </label>
            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#333333] hover:border-[#FF0000] transition-all duration-500 rounded-md cursor-pointer bg-[#333333]/30">
                <span className="text-white/70 text-sm mb-2">
                  Click or drag to upload
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative">
                <div className="w-full max-h-48 rounded-md overflow-hidden bg-[#333333]/30 border border-[#333333]">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 rounded-full bg-black/60 hover:bg-red-500/80 text-white transition-colors"
                >
                  <HiX className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
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
                  ? "Update Core Value"
                  : "Add Core Value"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoreValueModal;
