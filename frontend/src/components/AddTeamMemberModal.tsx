import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import { uploadImage } from "../services/cloudinaryService";
import {
  addTeamMember,
  updateTeamMember,
  type TeamMember,
} from "../services/teamMemberService";
import { useToast } from "../context/ToastContext";

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message?: string) => void;
  initialTeamMember?: TeamMember | null;
}

const AddTeamMemberModal: React.FC<AddTeamMemberModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialTeamMember = null,
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");

  const isEdit = Boolean(initialTeamMember?.id);

  useEffect(() => {
    if (isOpen && initialTeamMember) {
      setFullName(initialTeamMember.fullName || "");
      setPosition(initialTeamMember.position || "");
      setImageFile(null);
      setImagePreview(initialTeamMember.imageUrl || "");
    } else if (isOpen && !initialTeamMember) {
      setFullName("");
      setPosition("");
      setImageFile(null);
      setImagePreview("");
    }
  }, [isOpen, initialTeamMember]);

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
    if (imagePreview && imagePreview.startsWith("blob:"))
      URL.revokeObjectURL(imagePreview);
    setImagePreview("");
    setFullName("");
    setPosition("");
    setError("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim()) {
      setError("Full name is required.");
      toast.error("Full name is required.");
      return;
    }
    setLoading(true);
    try {
      let imageUrl = initialTeamMember?.imageUrl ?? "";
      if (imageFile) {
        const { url } = await uploadImage(imageFile, "team-members");
        imageUrl = url;
      }
      if (isEdit && initialTeamMember?.id) {
        await updateTeamMember(initialTeamMember.id, {
          imageUrl: imageUrl || undefined,
          fullName: fullName.trim(),
          position: position.trim(),
        });
        handleClose();
        onSuccess("Team member updated.");
      } else {
        await addTeamMember({
          imageUrl,
          fullName: fullName.trim(),
          position: position.trim(),
        });
        handleClose();
        onSuccess("Team member added.");
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : isEdit
            ? "Failed to update team member. Please try again."
            : "Failed to add team member. Please try again.";
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
            {isEdit ? "Edit Team Member" : "Add Team Member"}
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
              Image
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

          <div>
            <label className="block text-white text-sm uppercase mb-2">
              Full name *
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full border border-[#333333] hover:border-[#E30514] focus:border-[#E30514] transition-all duration-500 rounded-md py-3 bg-[#333333] focus:ring-0 focus:outline-none px-4 text-white"
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-2">
              Position
            </label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full border border-[#333333] hover:border-[#E30514] focus:border-[#E30514] transition-all duration-500 rounded-md py-3 bg-[#333333] focus:ring-0 focus:outline-none px-4 text-white"
              placeholder="e.g. Creative Director"
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
              disabled={loading || !fullName.trim()}
              className="flex-1 border border-[#E30514] bg-[#E30514]/20 hover:bg-[#E30514]/30 text-white transition-all duration-300 py-3 px-6 text-sm uppercase font-semibold rounded-md disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading
                ? isEdit
                  ? "Updating…"
                  : "Adding…"
                : isEdit
                  ? "Update Team Member"
                  : "Add Team Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamMemberModal;
