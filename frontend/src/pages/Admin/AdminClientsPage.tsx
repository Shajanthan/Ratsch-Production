import React, { useState, useEffect, useCallback } from "react";
import { HiOutlineExclamation, HiOutlineTrash } from "react-icons/hi";
import AddClientModal from "../../components/AddClientModal";
import {
  getClients,
  deleteClient,
  type Client,
} from "../../services/clientService";
import { useToast } from "../../context/ToastContext";

const AdminClientsPage: React.FC = () => {
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getClients();
      setClients(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to load clients";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const handleAddSuccess = (message?: string) => {
    void loadClients();
    if (message) toast.success(message);
  };

  const openAddModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const openDeleteConfirm = (client: Client) => setClientToDelete(client);
  const closeDeleteConfirm = () => {
    if (!deletingId) setClientToDelete(null);
  };

  const confirmDelete = async () => {
    if (!clientToDelete?.id) return;
    setDeletingId(clientToDelete.id);
    try {
      await deleteClient(clientToDelete.id);
      setClientToDelete(null);
      void loadClients();
      toast.success("Client logo deleted.");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to delete client";
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
              Clients Management
            </h2>
            <p className="text-white/70 text-sm md:text-base">
              Manage your clients list and client logos.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="border border-white hover:border-[#E30514] transition-all duration-300 py-3 px-6 text-white text-sm md:text-base uppercase font-semibold rounded-md hover:bg-[#E30514]/10"
          >
            Add Client
          </button>
        </div>

        {loading ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-white/70">Loading clients…</p>
          </div>
        ) : error ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-white/50 text-lg">No client logos yet.</p>
            <p className="text-white/40 text-sm mt-2">
              Add one using the button above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-[#333333]/30 border border-[#333333] rounded-lg p-4 flex flex-col items-center gap-3 hover:border-white/20 transition-colors"
              >
                <div className="w-full aspect-square max-h-32 flex items-center justify-center bg-black/30 rounded overflow-hidden">
                  {client.imageUrl ? (
                    <img
                      src={client.imageUrl}
                      alt="Client logo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-white/40 text-sm">No image</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => openDeleteConfirm(client)}
                  disabled={deletingId === client.id}
                  className="inline-flex items-center gap-2 border border-white/40 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 py-2 px-4 text-white text-xs uppercase font-semibold rounded-md disabled:opacity-50"
                >
                  <HiOutlineTrash className="w-4 h-4 flex-shrink-0" />
                  {deletingId === client.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddClientModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleAddSuccess}
      />

      {/* Delete confirmation modal */}
      {clientToDelete && (
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
                  This will permanently delete this client logo. This action
                  cannot be undone.
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

export default AdminClientsPage;
