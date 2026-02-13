import React, { useState, useEffect, useCallback } from "react";
import {
  HiOutlinePencil,
  HiOutlineExclamation,
  HiOutlineTrash,
  HiOutlineUserGroup,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";
import EditCeoModal from "../../components/EditCeoModal";
import AddTeamMemberModal from "../../components/AddTeamMemberModal";
import { getCeoSection, type CeoSection } from "../../services/aboutUsService";
import {
  getTeamMembers,
  deleteTeamMember,
  type TeamMember,
} from "../../services/teamMemberService";
import { useToast } from "../../context/ToastContext";

type TabId = "ceo" | "team";

const INITIAL_CEO: CeoSection = {
  imageUrl: "",
  firstName: "",
  lastName: "",
  position: "",
  companyName: "",
  description: "",
};

const AdminAboutUsPage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<TabId>("ceo");
  const [ceo, setCeo] = useState<CeoSection>(INITIAL_CEO);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [teamError, setTeamError] = useState<string | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadCeo = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCeoSection();
      setCeo(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to load CEO section";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const loadTeamMembers = useCallback(async () => {
    setTeamLoading(true);
    setTeamError(null);
    try {
      const data = await getTeamMembers();
      setTeamMembers(data);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to load team members";
      setTeamError(msg);
      toast.error(msg);
    } finally {
      setTeamLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadCeo();
  }, [loadCeo]);

  useEffect(() => {
    if (activeTab === "team") void loadTeamMembers();
  }, [activeTab, loadTeamMembers]);

  const handleSuccess = (message?: string) => {
    void loadCeo();
    if (message) toast.success(message);
  };

  const handleTeamSuccess = (message?: string) => {
    setEditingMember(null);
    void loadTeamMembers();
    if (message) toast.success(message);
  };

  const openEditModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const openAddTeamModal = () => {
    setEditingMember(null);
    setIsTeamModalOpen(true);
  };
  const openEditTeamModal = (member: TeamMember) => {
    setEditingMember(member);
    setIsTeamModalOpen(true);
  };
  const handleCloseTeamModal = () => {
    setIsTeamModalOpen(false);
    setEditingMember(null);
  };

  const openDeleteConfirm = (member: TeamMember) => setMemberToDelete(member);
  const closeDeleteConfirm = () => {
    if (!deletingId) setMemberToDelete(null);
  };
  const confirmDeleteMember = async () => {
    if (!memberToDelete?.id) return;
    setDeletingId(memberToDelete.id);
    try {
      await deleteTeamMember(memberToDelete.id);
      setMemberToDelete(null);
      void loadTeamMembers();
      toast.success("Team member deleted.");
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to delete team member";
      setTeamError(msg);
      toast.error(msg);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="text-white">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2">
            About Us Management
          </h2>
          <p className="text-white/70 text-sm md:text-base">
            Manage your About Us page content: CEO section and team members.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/10 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("ceo")}
            className={`flex items-center gap-2 py-2 px-4 text-sm uppercase font-semibold rounded-t transition-all duration-300 ${
              activeTab === "ceo"
                ? "bg-white/10 text-white border-b-2 border-[#E30514] -mb-0.5"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <HiOutlineOfficeBuilding className="w-5 h-5" />
            CEO Section
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("team")}
            className={`flex items-center gap-2 py-2 px-4 text-sm uppercase font-semibold rounded-t transition-all duration-300 ${
              activeTab === "team"
                ? "bg-white/10 text-white border-b-2 border-[#E30514] -mb-0.5"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <HiOutlineUserGroup className="w-5 h-5" />
            Team Members
          </button>
        </div>

        {/* CEO Section tab */}
        {activeTab === "ceo" && (
          <section className="mb-8">
            <h3 className="text-xl font-semibold uppercase mb-4 border-b border-white/10 pb-2">
              CEO Section
            </h3>
            {loading ? (
              <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
                <p className="text-white/70">Loading CEO section…</p>
              </div>
            ) : error ? (
              <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
                <p className="text-red-400">{error}</p>
              </div>
            ) : (
              <div className="bg-[#333333]/30 border border-[#333333] rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
                  {/* CEO Image */}
                  <div className="flex-shrink-0 w-40 sm:w-48">
                    {ceo.imageUrl ? (
                      <img
                        src={ceo.imageUrl}
                        alt={`${ceo.firstName} ${ceo.lastName}`.trim() || "CEO"}
                        className="w-full aspect-square object-cover rounded-md border border-white/10"
                      />
                    ) : (
                      <div className="w-full aspect-square rounded-md bg-[#222222] border border-white/10 flex items-center justify-center text-white/40 text-sm">
                        No image
                      </div>
                    )}
                  </div>
                  {/* CEO details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xl md:text-2xl font-bold text-white uppercase mb-2">
                      {ceo.firstName || ceo.lastName ? (
                        <>
                          {ceo.firstName && (
                            <span className="text-[#E30514]">
                              {ceo.firstName}{" "}
                            </span>
                          )}
                          {ceo.lastName}
                        </>
                      ) : (
                        <span className="text-white/50">No name set</span>
                      )}
                    </h4>
                    {ceo.description ? (
                      <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-4">
                        {ceo.description}
                      </p>
                    ) : (
                      <p className="text-white/50 text-sm">
                        No description set.
                      </p>
                    )}
                  </div>
                  {/* Edit button */}
                  <div className="flex-shrink-0 flex items-start">
                    <button
                      type="button"
                      onClick={openEditModal}
                      className="flex items-center gap-2 border border-white/30 hover:border-[#E30514] hover:bg-[#E30514]/10 transition-all duration-300 py-3 px-6 text-white text-sm uppercase font-semibold rounded-md"
                    >
                      <HiOutlinePencil className="w-5 h-5" />
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Team Members tab */}
        {activeTab === "team" && (
          <section className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
              <h3 className="text-xl font-semibold uppercase border-b border-white/10 pb-2">
                Our Team
              </h3>
              <button
                type="button"
                onClick={openAddTeamModal}
                className="border border-white hover:border-[#E30514] transition-all duration-300 py-3 px-6 text-white text-sm md:text-base uppercase font-semibold rounded-md hover:bg-[#E30514]/10"
              >
                Add Team Member
              </button>
            </div>
            {teamLoading ? (
              <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
                <p className="text-white/70">Loading team members…</p>
              </div>
            ) : teamError ? (
              <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
                <p className="text-red-400">{teamError}</p>
              </div>
            ) : teamMembers.length === 0 ? (
              <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
                <p className="text-white/50 text-lg">No team members yet.</p>
                <p className="text-white/40 text-sm mt-2">
                  Add one using the button above.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-[#333333]/30 border border-[#333333] rounded-lg p-4 flex flex-col items-center gap-3 hover:border-white/20 transition-colors"
                  >
                    <div className="w-full aspect-square max-h-32 flex items-center justify-center bg-black/30 rounded overflow-hidden">
                      {member.imageUrl ? (
                        <img
                          src={member.imageUrl}
                          alt={member.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white/40 text-sm">No image</span>
                      )}
                    </div>
                    <div className="text-center min-w-0 w-full">
                      <p className="text-white font-semibold truncate">
                        {member.fullName}
                      </p>
                      {member.position && (
                        <p className="text-white/60 text-sm truncate">
                          {member.position}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 w-full">
                      <button
                        type="button"
                        onClick={() => openEditTeamModal(member)}
                        className="flex-1 inline-flex items-center justify-center gap-2 border border-white/40 hover:border-[#E30514] hover:bg-[#E30514]/10 transition-all duration-300 py-2 px-3 text-white text-xs uppercase font-semibold rounded-md"
                      >
                        <HiOutlinePencil className="w-4 h-4 flex-shrink-0" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteConfirm(member)}
                        disabled={deletingId === member.id}
                        className="inline-flex items-center gap-2 border border-white/40 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 py-2 px-3 text-white text-xs uppercase font-semibold rounded-md disabled:opacity-50"
                      >
                        <HiOutlineTrash className="w-4 h-4 flex-shrink-0" />
                        {deletingId === member.id ? "…" : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      <EditCeoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
        initialCeo={ceo}
      />

      <AddTeamMemberModal
        isOpen={isTeamModalOpen}
        onClose={handleCloseTeamModal}
        onSuccess={handleTeamSuccess}
        initialTeamMember={editingMember}
      />

      {memberToDelete && (
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
                  Delete team member?
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  This will permanently remove{" "}
                  <strong>{memberToDelete.fullName}</strong> from the team. This
                  action cannot be undone.
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
                onClick={confirmDeleteMember}
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

export default AdminAboutUsPage;
