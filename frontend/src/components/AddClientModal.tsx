import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import { uploadImage } from "../services/cloudinaryService";
import { addClient } from "../services/clientService";
import { useToast } from "../context/ToastContext";

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message?: string) => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview("");
  };

  const handleClose = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview("");
    setError("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!imageFile) {
      setError("Please select an image.");
      toast.error("Please select an image.");
      return;
    }
    setLoading(true);
    try {
      const { url, publicId } = await uploadImage(imageFile, "clients");
      await addClient({ imageUrl: url, imagePublicId: publicId });
      handleClose();
      onSuccess("Client logo added.");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to add client. Please try again.";
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

      <div className="relative z-50 w-full max-w-md max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-white">
            Add Client Logo
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
              Client Logo Image *
            </label>
            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#333333] hover:border-[#E30514] transition-all duration-500 rounded-md cursor-pointer bg-[#333333]/30">
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
              disabled={loading || !imageFile}
              className="flex-1 border border-[#E30514] bg-[#E30514]/20 hover:bg-[#E30514]/30 text-white transition-all duration-300 py-3 px-6 text-sm uppercase font-semibold rounded-md disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? "Adding…" : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
