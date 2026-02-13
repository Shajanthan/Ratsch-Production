import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  HiX,
  HiOutlineExclamation,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import AddClientReviewModal from "../../components/AddClientReviewModal";
import {
  getClientReviews,
  deleteClientReview,
  type ClientReview,
} from "../../services/clientReviewService";
import { useToast } from "../../context/ToastContext";

const AdminClientReviewPage: React.FC = () => {
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<ClientReview | null>(null);
  const [viewingReview, setViewingReview] = useState<ClientReview | null>(null);
  const [viewingPhoto, setViewingPhoto] = useState<{
    url: string;
    name: string;
  } | null>(null);
  const [reviewToDelete, setReviewToDelete] = useState<ClientReview | null>(
    null,
  );
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const PER_PAGE = 8;
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(reviews.length / PER_PAGE)),
    [reviews.length],
  );
  const paginatedReviews = useMemo(
    () => reviews.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE),
    [reviews, currentPage],
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getClientReviews();
      setReviews(data);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to load client reviews";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleAddSuccess = (message?: string) => {
    setEditingReview(null);
    void loadReviews();
    if (message) toast.success(message);
  };

  const openAddModal = () => {
    setEditingReview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (review: ClientReview) => {
    setEditingReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
  };

  const openDeleteConfirm = (review: ClientReview) => {
    setReviewToDelete(review);
  };

  const closeDeleteConfirm = () => {
    if (!deletingId) setReviewToDelete(null);
  };

  const confirmDelete = async () => {
    if (!reviewToDelete?.id) return;
    setDeletingId(reviewToDelete.id);
    try {
      await deleteClientReview(reviewToDelete.id);
      setReviewToDelete(null);
      void loadReviews();
      toast.success("Client review deleted.");
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to delete client review";
      setError(msg);
      toast.error(msg);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDateTime = (iso?: string | null) => {
    if (!iso) return "—";
    try {
      return new Date(iso).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="text-white">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2">
              Client Reviews
            </h2>
            <p className="text-white/70 text-sm md:text-base">
              Manage client testimonials and reviews displayed on your website.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="border border-white hover:border-[#E30514] transition-all duration-300 py-3 px-6 text-white text-sm md:text-base uppercase font-semibold rounded-md hover:bg-[#E30514]/10"
          >
            Add New Client Review
          </button>
        </div>

        {loading ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-white/70">Loading client reviews…</p>
          </div>
        ) : error ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-white/50 text-lg">No client reviews yet.</p>
            <p className="text-white/40 text-sm mt-2">
              Add one using the button above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto h-[35.1rem]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold">
                    Photo
                  </th>
                  <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold">
                    Name
                  </th>
                  <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold hidden sm:table-cell">
                    Company
                  </th>
                  <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold hidden md:table-cell">
                    Position
                  </th>
                  <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold hidden lg:table-cell">
                    Created | Updated
                  </th>
                  <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold text-right w-28">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedReviews.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                        {r.profilePictureUrl ? (
                          <button
                            type="button"
                            onClick={() =>
                              setViewingPhoto({
                                url: r.profilePictureUrl,
                                name: `${r.firstName} ${r.lastName}`,
                              })
                            }
                            className="w-full h-full block cursor-pointer hover:ring-2 hover:ring-[#E30514]/60 hover:ring-offset-2 hover:ring-offset-black transition-all rounded-full focus:outline-none focus:ring-2 focus:ring-[#E30514]/60"
                          >
                            <img
                              src={r.profilePictureUrl}
                              alt={`${r.firstName} ${r.lastName}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ) : (
                          <span className="w-full h-full flex items-center justify-center text-white/60 text-sm font-bold">
                            {(r.firstName || "?").charAt(0)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2 font-medium">
                      {r.firstName} {r.lastName}
                    </td>
                    <td className="py-3 px-2 text-white/80 hidden sm:table-cell">
                      {r.companyName || "—"}
                    </td>
                    <td className="py-3 px-2 text-white/80 hidden md:table-cell">
                      {r.position}
                    </td>

                    <td className="py-3 px-2 text-white/60 text-sm hidden lg:table-cell whitespace-nowrap">
                      {formatDateTime(r.updatedAt)}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(r)}
                          className="inline-flex items-center gap-2 border border-white/40 hover:border-[#E30514] hover:bg-[#E30514]/10 transition-all duration-300 py-2 px-4 text-white text-xs uppercase font-semibold rounded-md"
                          title="Edit"
                        >
                          <HiOutlinePencil className="w-4 h-4 flex-shrink-0" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteConfirm(r)}
                          disabled={deletingId === r.id}
                          className="inline-flex items-center gap-2 border border-white/40 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 py-2 px-4 text-white text-xs uppercase font-semibold rounded-md disabled:opacity-50"
                          title="Delete"
                        >
                          <HiOutlineTrash className="w-4 h-4 flex-shrink-0" />
                          {deletingId === r.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination – only when there are reviews */}
        {!loading && !error && reviews.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
            <p className="text-white/60 text-sm">
              Showing{" "}
              <span className="font-medium text-white">
                {(currentPage - 1) * PER_PAGE + 1}–
                {Math.min(currentPage * PER_PAGE, reviews.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-white">{reviews.length}</span>{" "}
              reviews
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="select-none border border-white/30 hover:border-[#E30514] hover:bg-[#E30514]/10 disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 py-2 px-4 text-white text-sm font-semibold rounded-md"
              >
                Previous
              </button>
              <span className="text-white/70 text-sm px-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage >= totalPages}
                className="select-none border border-white/30 hover:border-[#E30514] hover:bg-[#E30514]/10 disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 py-2 px-4 text-white text-sm font-semibold rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <AddClientReviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleAddSuccess}
        initialReview={editingReview}
      />

      {/* Delete confirmation modal */}
      {reviewToDelete && (
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
                  This will permanently delete the review by{" "}
                  <span className="font-semibold text-white">
                    {reviewToDelete.firstName} {reviewToDelete.lastName}
                  </span>
                  . This action cannot be undone.
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

      {/* Photo lightbox – full-size image */}
      {viewingPhoto && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-6 md:p-8 bg-black/95 backdrop-blur-sm"
          onClick={() => setViewingPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setViewingPhoto(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <HiX className="w-8 h-8" />
          </button>
          <div
            className="flex flex-col items-center gap-4 max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={viewingPhoto.url}
              alt={viewingPhoto.name}
              className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-2xl ring-1 ring-white/10"
            />
            <p className="text-white/80 text-sm font-medium">
              {viewingPhoto.name}
            </p>
          </div>
        </div>
      )}

      {/* Full review view modal */}
      {viewingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setViewingReview(null)}
          />
          <div className="relative z-50 w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg shadow-2xl">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                  {viewingReview.profilePictureUrl ? (
                    <button
                      type="button"
                      onClick={() =>
                        setViewingPhoto({
                          url: viewingReview.profilePictureUrl,
                          name: `${viewingReview.firstName} ${viewingReview.lastName}`,
                        })
                      }
                      className="w-full h-full block cursor-pointer hover:ring-2 hover:ring-[#E30514]/60 rounded-full focus:outline-none focus:ring-2 focus:ring-[#E30514]/60"
                    >
                      <img
                        src={viewingReview.profilePictureUrl}
                        alt={`${viewingReview.firstName} ${viewingReview.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ) : (
                    <span className="w-full h-full flex items-center justify-center text-white/60 text-sm font-bold">
                      {(viewingReview.firstName || "?").charAt(0)}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate">
                    {viewingReview.firstName} {viewingReview.lastName}
                  </h3>
                  <p className="text-white/60 text-sm truncate">
                    {viewingReview.position}{" "}
                    {viewingReview.companyName &&
                      `· ${viewingReview.companyName}`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingReview(null)}
                className="flex-shrink-0 p-2 text-white/70 hover:text-white transition-colors rounded"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              <p className="text-white/90 text-sm md:text-base whitespace-pre-wrap">
                {viewingReview.review}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClientReviewPage;
