import React, { useState, useEffect, useCallback } from "react";
import {
  HiOutlineExclamation,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import AddCoreValueModal from "../../components/AddCoreValueModal";
import {
  getCoreValues,
  deleteCoreValue,
  type CoreValue,
} from "../../services/coreValueService";
import { useToast } from "../../context/ToastContext";

const AdminCoreValuesPage: React.FC = () => {
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingValue, setEditingValue] = useState<CoreValue | null>(null);
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [valueToDelete, setValueToDelete] = useState<CoreValue | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadCoreValues = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCoreValues();
      setCoreValues(data);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to load core values";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadCoreValues();
  }, [loadCoreValues]);

  const handleSuccess = (message?: string) => {
    setEditingValue(null);
    void loadCoreValues();
    if (message) toast.success(message);
  };

  const openAddModal = () => {
    setEditingValue(null);
    setIsModalOpen(true);
  };

  const openEditModal = (value: CoreValue) => {
    setEditingValue(value);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingValue(null);
  };

  const openDeleteConfirm = (value: CoreValue) => setValueToDelete(value);
  const closeDeleteConfirm = () => {
    if (!deletingId) setValueToDelete(null);
  };

  const confirmDelete = async () => {
    if (!valueToDelete?.id) return;
    setDeletingId(valueToDelete.id);
    try {
      await deleteCoreValue(valueToDelete.id);
      setValueToDelete(null);
      void loadCoreValues();
      toast.success("Core value deleted.");
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to delete core value";
      setError(msg);
      toast.error(msg);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="text-white">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2">
              Core Values Management
            </h2>
            <p className="text-white/70 text-sm md:text-base">
              Manage your company's core values and principles.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="border border-white hover:border-[#FF0000] transition-all duration-300 py-3 px-6 text-white text-sm md:text-base uppercase font-semibold rounded-md hover:bg-[#FF0000]/10"
          >
            Add Core Value
          </button>
        </div>

        {loading ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-white/70">Loading core values…</p>
          </div>
        ) : error ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : coreValues.length === 0 ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-white/50 text-lg">No core values yet.</p>
            <p className="text-white/40 text-sm mt-2">
              Add one using the button above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {coreValues.map((cv) => (
              <div
                key={cv.id}
                className="bg-[#333333]/30 border border-[#333333] rounded-lg overflow-hidden hover:border-white/20 transition-colors"
              >
                <div className="aspect-video bg-black/30 relative">
                  {cv.imageUrl ? (
                    <img
                      src={cv.imageUrl}
                      alt={cv.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/40 text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white uppercase mb-2">
                    {cv.title}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-3 mb-4">
                    {cv.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(cv)}
                      className="inline-flex items-center gap-2 border border-white/40 hover:border-[#FF0000] hover:bg-[#FF0000]/10 transition-all duration-300 py-2 px-4 text-white text-xs uppercase font-semibold rounded-md"
                    >
                      <HiOutlinePencil className="w-4 h-4 flex-shrink-0" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteConfirm(cv)}
                      disabled={deletingId === cv.id}
                      className="inline-flex items-center gap-2 border border-white/40 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 py-2 px-4 text-white text-xs uppercase font-semibold rounded-md disabled:opacity-50"
                    >
                      <HiOutlineTrash className="w-4 h-4 flex-shrink-0" />
                      {deletingId === cv.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddCoreValueModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        initialCoreValue={editingValue}
      />

      {valueToDelete && (
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
                  This will permanently delete the core value{" "}
                  <span className="font-semibold text-white">
                    {valueToDelete.title}
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
    </div>
  );
};

export default AdminCoreValuesPage;
