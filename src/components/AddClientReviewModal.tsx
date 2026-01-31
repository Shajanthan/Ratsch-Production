import React, { useState, useRef, useEffect } from "react";
import { HiX } from "react-icons/hi";
import {
  uploadImage,
  deleteCloudinaryImage,
} from "../services/cloudinaryService";
import {
  addClientReview,
  updateClientReview,
  deleteClientReview,
  type ClientReview,
} from "../services/clientReviewService";
import { useToast } from "../context/ToastContext";

interface AddClientReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message?: string) => void;
  /** When set, modal is in edit mode and form is pre-filled */
  initialReview?: ClientReview | null;
}

const emptyForm = {
  firstName: "",
  lastName: "",
  position: "",
  companyName: "",
  review: "",
  profilePicture: null as File | null,
};

const AddClientReviewModal: React.FC<AddClientReviewModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialReview = null,
}) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState(emptyForm);
  const [profilePreview, setProfilePreview] = useState("");
  const [photoRemoved, setPhotoRemoved] = useState(false);
  /** When adding: Firebase doc id after create-before-upload; used to upload with this id and to cleanup on cancel/failure */
  const pendingReviewIdRef = useRef<string | null>(null);

  const isEdit = Boolean(initialReview?.id);

  useEffect(() => {
    if (isOpen && initialReview) {
      setFormData({
        firstName: initialReview.firstName,
        lastName: initialReview.lastName,
        position: initialReview.position,
        companyName: initialReview.companyName,
        review: initialReview.review,
        profilePicture: null,
      });
      setProfilePreview(initialReview.profilePictureUrl || "");
      setPhotoRemoved(false);
    } else if (isOpen && !initialReview) {
      setFormData(emptyForm);
      setProfilePreview("");
      setPhotoRemoved(false);
    }
  }, [isOpen, initialReview]);

  if (!isOpen) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
      setProfilePreview(URL.createObjectURL(file));
      setPhotoRemoved(false);
    }
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, profilePicture: null }));
    setProfilePreview("");
    setPhotoRemoved(true);
  };

  const handleClose = async () => {
    const reviewId = pendingReviewIdRef.current;
    if (reviewId) {
      pendingReviewIdRef.current = null;
      try {
        await deleteClientReview(reviewId);
      } catch {
        // ignore; may already be deleted or network error
      }
    }
    setFormData(emptyForm);
    setProfilePreview("");
    setPhotoRemoved(false);
    setError("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      position: formData.position,
      companyName: formData.companyName,
      review: formData.review,
      profilePictureUrl: "",
    };

    try {
      if (isEdit && initialReview?.id) {
        let profilePictureUrl: string;
        let profilePicturePublicId: string | undefined;
        if (formData.profilePicture) {
          const oldPublicId =
            initialReview.profilePicturePublicId ||
            `reviews/${initialReview.id}`;
          try {
            await deleteCloudinaryImage(oldPublicId);
          } catch {
            // ignore; image may not exist or already removed
          }
          const { url, publicId } = await uploadImage(
            formData.profilePicture,
            "reviews",
            initialReview.id,
          );
          profilePictureUrl = url;
          profilePicturePublicId = publicId;
        } else if (photoRemoved) {
          const oldPublicId =
            initialReview.profilePicturePublicId ||
            `reviews/${initialReview.id}`;
          try {
            await deleteCloudinaryImage(oldPublicId);
          } catch {
            // ignore
          }
          profilePictureUrl = "";
          profilePicturePublicId = undefined;
        } else if (initialReview.profilePictureUrl) {
          profilePictureUrl = initialReview.profilePictureUrl;
          profilePicturePublicId = initialReview.profilePicturePublicId;
        } else {
          profilePictureUrl = "";
          profilePicturePublicId = undefined;
        }
        await updateClientReview(initialReview.id, {
          ...payload,
          profilePictureUrl,
          ...(profilePicturePublicId !== undefined && {
            profilePicturePublicId,
          }),
        });
        handleClose();
        onSuccess("Client review updated.");
      } else {
        const id = await addClientReview(payload);
        pendingReviewIdRef.current = id;
        if (formData.profilePicture) {
          const { url: profilePictureUrl, publicId: profilePicturePublicId } =
            await uploadImage(formData.profilePicture, "reviews", id);
          await updateClientReview(id, {
            ...payload,
            profilePictureUrl,
            profilePicturePublicId,
          });
        } else {
          await updateClientReview(id, {
            ...payload,
            profilePictureUrl: "",
          });
        }
        pendingReviewIdRef.current = null;
        handleClose();
        onSuccess("Client review added.");
      }
    } catch (err) {
      const reviewId = pendingReviewIdRef.current;
      if (reviewId) {
        pendingReviewIdRef.current = null;
        try {
          await deleteClientReview(reviewId);
        } catch {
          // ignore cleanup errors
        }
      }
      const msg =
        err instanceof Error
          ? err.message
          : isEdit
            ? "Failed to update client review. Please try again."
            : "Failed to add client review. Please try again.";
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

      <div className="relative z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-white">
            {isEdit ? "Edit Client Review" : "Add New Client Review"}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-sm uppercase mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full border border-[#333333] hover:border-[#FF0000] focus:border-[#FF0000] transition-all duration-500 rounded-md py-3 bg-[#333333] focus:ring-0 focus:outline-none px-4 text-white"
              />
            </div>
            <div>
              <label className="block text-white text-sm uppercase mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full border border-[#333333] hover:border-[#FF0000] focus:border-[#FF0000] transition-all duration-500 rounded-md py-3 bg-[#333333] focus:ring-0 focus:outline-none px-4 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-2">
              Position *
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              required
              placeholder="e.g. CEO, Marketing Director"
              className="w-full border border-[#333333] hover:border-[#FF0000] focus:border-[#FF0000] transition-all duration-500 rounded-md py-3 bg-[#333333] focus:ring-0 focus:outline-none px-4 text-white"
            />
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-2">
              Company Name (optional)
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full border border-[#333333] hover:border-[#FF0000] focus:border-[#FF0000] transition-all duration-500 rounded-md py-3 bg-[#333333] focus:ring-0 focus:outline-none px-4 text-white"
            />
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-2">
              Review *
            </label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              required
              rows={5}
              placeholder="Client testimonial or review text..."
              className="w-full border border-[#333333] hover:border-[#FF0000] focus:border-[#FF0000] transition-all duration-500 rounded-md py-3 bg-[#333333] focus:ring-0 focus:outline-none px-4 text-white resize-none"
            />
          </div>

          <div>
            <label className="block text-white text-sm uppercase mb-2">
              Profile Picture (optional)
              {isEdit ? " — leave empty to keep current" : ""}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-[#333333] hover:border-[#FF0000] focus:border-[#FF0000] transition-all duration-500 rounded-md py-3 bg-[#333333] focus:ring-0 focus:outline-none px-4 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#FF0000] file:text-white hover:file:bg-[#CC0000]"
            />
            {(profilePreview ||
              (isEdit &&
                initialReview?.profilePictureUrl &&
                !photoRemoved)) && (
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={profilePreview || initialReview?.profilePictureUrl}
                  alt="Profile preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-white/20 flex-shrink-0"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="text-red-400 hover:text-red-300 text-sm font-semibold uppercase border border-red-500/50 hover:border-red-500 px-4 py-2 rounded-md transition-colors"
                >
                  Remove photo
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="border border-white/30 hover:border-white/50 transition-all duration-300 py-3 px-6 text-white text-sm uppercase font-semibold rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="border border-[#FF0000] hover:bg-[#FF0000]/20 transition-all duration-300 py-3 px-6 text-white text-sm uppercase font-semibold rounded-md disabled:opacity-50"
            >
              {loading
                ? isEdit
                  ? "Saving..."
                  : "Adding..."
                : isEdit
                  ? "Save Changes"
                  : "Add Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientReviewModal;
