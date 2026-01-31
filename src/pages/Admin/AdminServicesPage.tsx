import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  HiOutlineExclamation,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import AddServiceModal from "../../components/AddServiceModal";
import {
  getServices,
  deleteService,
  type Service,
} from "../../services/serviceService";
import { useToast } from "../../context/ToastContext";

const AdminServicesPage: React.FC = () => {
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [servicePage, setServicePage] = useState(1);

  const SERVICE_PER_PAGE = 6;
  const serviceTotalPages = useMemo(
    () => Math.max(1, Math.ceil(services.length / SERVICE_PER_PAGE)),
    [services.length],
  );
  const paginatedServices = useMemo(
    () =>
      services.slice(
        (servicePage - 1) * SERVICE_PER_PAGE,
        servicePage * SERVICE_PER_PAGE,
      ),
    [services, servicePage],
  );

  useEffect(() => {
    if (servicePage > serviceTotalPages) setServicePage(1);
  }, [servicePage, serviceTotalPages]);

  const loadServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getServices();
      setServices(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to load services";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleSuccess = (message?: string) => {
    setEditingService(null);
    void loadServices();
    if (message) toast.success(message);
  };

  const openAddModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  const openDeleteConfirm = (service: Service) => setServiceToDelete(service);
  const closeDeleteConfirm = () => {
    if (!deletingId) setServiceToDelete(null);
  };

  const confirmDelete = async () => {
    if (!serviceToDelete?.id) return;
    setDeletingId(serviceToDelete.id);
    try {
      await deleteService(serviceToDelete.id);
      setServiceToDelete(null);
      void loadServices();
      toast.success("Service deleted.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to delete service";
      setError(msg);
      toast.error(msg);
    } finally {
      setDeletingId(null);
    }
  };

  const thumbnail = (s: Service) => s.mainImageUrl || "";

  return (
    <div className="text-white">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2">
              Services Management
            </h2>
            <p className="text-white/70 text-sm md:text-base">
              Manage service main image, title, tag line, about description,
              deliverables, service images, and brands images.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="border border-white hover:border-[#FF0000] transition-all duration-300 py-3 px-6 text-white text-sm md:text-base uppercase font-semibold rounded-md hover:bg-[#FF0000]/10"
          >
            Add Service
          </button>
        </div>

        {loading ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-white/70">Loading services…</p>
          </div>
        ) : error ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-white/50 text-lg">No services yet.</p>
            <p className="text-white/40 text-sm mt-2">
              Add one using the button above.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto overflow-y-auto h-[34.4rem]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold w-20">
                      Image
                    </th>
                    <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold">
                      Title
                    </th>
                    <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold hidden md:table-cell">
                      Tag line
                    </th>
                    <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold hidden lg:table-cell">
                      Tags
                    </th>
                    <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold text-right w-28">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedServices.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-2">
                        <div className="w-16 h-16 rounded overflow-hidden bg-white/10 flex-shrink-0">
                          {thumbnail(s) ? (
                            <img
                              src={thumbnail(s)}
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
                      <td className="py-3 px-2 font-medium">{s.title}</td>
                      <td className="py-3 px-2 text-white/80 hidden md:table-cell truncate max-w-[200px]">
                        {s.tagLine || "—"}
                      </td>
                      <td className="py-3 px-2 text-white/80 hidden lg:table-cell truncate max-w-[180px]">
                        {Array.isArray(s.tags) && s.tags.length > 0
                          ? s.tags.join(", ")
                          : "—"}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(s)}
                            className="inline-flex items-center gap-2 border border-white/40 hover:border-[#FF0000] hover:bg-[#FF0000]/10 transition-all duration-300 py-2 px-4 text-white text-xs uppercase font-semibold rounded-md"
                          >
                            <HiOutlinePencil className="w-4 h-4 flex-shrink-0" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => openDeleteConfirm(s)}
                            disabled={deletingId === s.id}
                            className="inline-flex items-center gap-2 border border-white/40 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 py-2 px-4 text-white text-xs uppercase font-semibold rounded-md disabled:opacity-50"
                          >
                            <HiOutlineTrash className="w-4 h-4 flex-shrink-0" />
                            {deletingId === s.id ? "Deleting…" : "Delete"}
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
                  {(servicePage - 1) * SERVICE_PER_PAGE + 1}–
                  {Math.min(servicePage * SERVICE_PER_PAGE, services.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-white">
                  {services.length}
                </span>{" "}
                services
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setServicePage((p) => Math.max(1, p - 1))}
                  disabled={servicePage <= 1}
                  className="select-none border border-white/30 hover:border-[#FF0000] hover:bg-[#FF0000]/10 disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 py-2 px-4 text-white text-sm font-semibold rounded-md"
                >
                  Previous
                </button>
                <span className="text-white/70 text-sm px-2">
                  Page {servicePage} of {serviceTotalPages}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setServicePage((p) => Math.min(serviceTotalPages, p + 1))
                  }
                  disabled={servicePage >= serviceTotalPages}
                  className="select-none border border-white/30 hover:border-[#FF0000] hover:bg-[#FF0000]/10 disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 py-2 px-4 text-white text-sm font-semibold rounded-md"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <AddServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        initialService={editingService}
      />

      {serviceToDelete && (
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
                  This will permanently delete the service{" "}
                  <span className="font-semibold text-white">
                    {serviceToDelete.title}
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

export default AdminServicesPage;
