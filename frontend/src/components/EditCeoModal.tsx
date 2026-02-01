import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import { uploadImage } from "../services/cloudinaryService";
import {
  updateCeoSection,
  type CeoSection,
} from "../services/aboutUsService";
import { useToast } from "../context/ToastContext";

interface EditCeoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message?: string) => void;
  initialCeo: CeoSection | null;
}

const EditCeoModal: React.FC<EditCeoModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialCeo,
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageRemoved, setImageRemoved] = useState(false);

  useEffect(() => {
    if (isOpen && initialCeo) {
      setFirstName(initialCeo.firstName);
      setLastName(initialCeo.lastName);
      setDescription(initialCeo.description);
      setImageFile(null);
      setImagePreview(initialCeo.imageUrl || "");
      setImageRemoved(false);
    }
  }, [isOpen, initialCeo]);

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
    setFirstName("");
    setLastName("");
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
    const hasImage = imageFile || (initialCeo?.imageUrl && !imageRemoved);
    if (!hasImage) {
      setError("CEO image is required.");
      toast.error("CEO image is required.");
      return;
    }
    setLoading(true);
    try {
      let imageUrl = initialCeo?.imageUrl || "";
      if (imageFile) {
        const { url } = await uploadImage(imageFile, "about-us", "ceo");
        imageUrl = url;
      } else if (imageRemoved) {
        imageUrl = "";
      }
      await updateCeoSection({
        imageUrl,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        position: initialCeo?.position || "",
        companyName: initialCeo?.companyName || "",
        description: description.trim(),
      });
      handleClose();
      onSuccess("CEO section updated.");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to update CEO section. Please try again.";
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
            Edit CEO Section
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
              CEO Image *
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm uppercase mb-2">
                First name *
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full border border-[#333333] hover:border-[#FF0000] focus:border-[#FF0000] transition-all duration-500 rounded-md py-3 bg-[#333333] focus:ring-0 focus:outline-none px-4 text-white"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-white text-sm uppercase mb-2">
                Last name *
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full border border-[#333333] hover:border-[#FF0000] focus:border-[#FF0000] transition-all duration-500 rounded-md py-3 bg-[#333333] focus:ring-0 focus:outline-none px-4 text-white"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full border border-[#333333] hover:border-[#FF0000] focus:border-[#FF0000] transition-all duration-500 rounded-md py-3 bg-[#333333] focus:ring-0 focus:outline-none px-4 text-white resize-y"
              placeholder="A short bio or message from the CEO…"
            />
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
              {loading ? "Updating…" : "Update CEO Section"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCeoModal;
