import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  HiOutlineExclamation,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import {
  type NavbarCategory,
  getNavbarCategories,
  addNavbarCategory,
  updateNavbarCategory,
  deleteNavbarCategory,
} from "../../services/navbarCategoryService";
import { useToast } from "../../context/ToastContext";

interface EditState {
  id?: string;
  key: string;
  title: string;
  order: string;
  itemsText: string;
}

const emptyEditState: EditState = {
  id: undefined,
  key: "",
  title: "",
  order: "0",
  itemsText: "",
};

const AdminNavbarCategoriesPage: React.FC = () => {
  const toast = useToast();
  const [categories, setCategories] = useState<NavbarCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<EditState | null>(null);
  const [deleting, setDeleting] = useState<NavbarCategory | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const sortedCategories = useMemo(
    () =>
      categories
        .slice()
        .sort((a, b) => (a.order || 0) - (b.order || 0) || a.key.localeCompare(b.key)),
    [categories],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNavbarCategories();
      setCategories(data);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to load navbar categories";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const openAdd = () => {
    setEditing({ ...emptyEditState });
  };

  const openEdit = (cat: NavbarCategory) => {
    setEditing({
      id: cat.id,
      key: cat.key,
      title: cat.title,
      order: String(cat.order ?? 0),
      itemsText: (cat.items || []).join("\n"),
    });
  };

  const closeEdit = () => {
    if (!saving) setEditing(null);
  };

  const openDelete = (cat: NavbarCategory) => setDeleting(cat);
  const closeDelete = () => {
    if (!deletingId) setDeleting(null);
  };

  const handleChange = (field: keyof EditState, value: string) => {
    setEditing((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    if (!editing) return;
    const key = editing.key.trim();
    if (!key) {
      toast.error("Key is required");
      return;
    }
    setSaving(true);
    try {
      const orderNum = Number.parseInt(editing.order || "0", 10) || 0;
      const items = editing.itemsText
        .split("\n")
        .map((v) => v.trim())
        .filter(Boolean);
      const payload = {
        key,
        title: editing.title.trim() || key,
        order: orderNum,
        items,
      };
      if (editing.id) {
        await updateNavbarCategory(editing.id, payload);
        toast.success("Navbar category updated.");
      } else {
        await addNavbarCategory(payload);
        toast.success("Navbar category added.");
      }
      setEditing(null);
      void load();
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to save navbar category";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleting?.id) return;
    setDeletingId(deleting.id);
    try {
      await deleteNavbarCategory(deleting.id);
      toast.success("Navbar category deleted.");
      setDeleting(null);
      void load();
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to delete navbar category";
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
              Navbar Categories
            </h2>
            <p className="text-white/70 text-sm md:text-base">
              Manage Digital, Creative, and Production dropdown content that
              appears when hovering the main navbar.
            </p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="border border-white hover:border-[#E30514] transition-all duration-300 py-3 px-6 text-white text-sm md:text-base uppercase font-semibold rounded-md hover:bg-[#E30514]/10"
          >
            Add Category
          </button>
        </div>

        {loading ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-white/70">Loading navbar categories…</p>
          </div>
        ) : error ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : sortedCategories.length === 0 ? (
          <div className="bg-[#333333]/30 border border-[#333333] rounded-lg p-8 text-center">
            <p className="text-white/50 text-lg">No navbar categories yet.</p>
            <p className="text-white/40 text-sm mt-2">
              Add one using the button above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold">
                    Key
                  </th>
                  <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold">
                    Title
                  </th>
                  <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold hidden md:table-cell">
                    Order
                  </th>
                  <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold">
                    Items
                  </th>
                  <th className="py-3 px-2 text-white/70 text-xs uppercase tracking-wider font-semibold text-right w-32">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedCategories.map((cat) => (
                  <tr
                    key={cat.id || cat.key}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-2 font-mono text-xs md:text-sm">
                      {cat.key}
                    </td>
                    <td className="py-3 px-2 font-medium">{cat.title}</td>
                    <td className="py-3 px-2 hidden md:table-cell text-sm text-white/80">
                      {cat.order ?? 0}
                    </td>
                    <td className="py-3 px-2 text-xs md:text-sm text-white/80">
                      {cat.items?.length ?? 0} item
                      {(cat.items?.length ?? 0) === 1 ? "" : "s"}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(cat)}
                          className="inline-flex items-center gap-2 border border-white/40 hover:border-[#E30514] hover:bg-[#E30514]/10 transition-all duration-300 py-2 px-3 text-white text-xs uppercase font-semibold rounded-md"
                        >
                          <HiOutlinePencil className="w-4 h-4 flex-shrink-0" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => openDelete(cat)}
                          disabled={deletingId === cat.id}
                          className="inline-flex items-center gap-2 border border-white/40 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 py-2 px-3 text-white text-xs uppercase font-semibold rounded-md disabled:opacity-50"
                        >
                          <HiOutlineTrash className="w-4 h-4 flex-shrink-0" />
                          {deletingId === cat.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeEdit}
          />
          <div
            className="relative z-50 w-full max-w-lg backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold uppercase text-white mb-4">
              {editing.id ? "Edit Navbar Category" : "Add Navbar Category"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wide text-white/70 mb-1">
                  Key (used in code)
                </label>
                <input
                  type="text"
                  value={editing.key}
                  onChange={(e) => handleChange("key", e.target.value)}
                  placeholder='e.g. "digital", "creative", "production"'
                  className="w-full bg-black/40 border border-white/20 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-[#E30514]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide text-white/70 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder='e.g. "DIGITAL"'
                  className="w-full bg-black/40 border border-white/20 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-[#E30514]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-white/70 mb-1">
                    Order
                  </label>
                  <input
                    type="number"
                    value={editing.order}
                    onChange={(e) => handleChange("order", e.target.value)}
                    className="w-full bg-black/40 border border-white/20 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-[#E30514]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide text-white/70 mb-1">
                  Items (one per line)
                </label>
                <textarea
                  value={editing.itemsText}
                  onChange={(e) => handleChange("itemsText", e.target.value)}
                  rows={7}
                  placeholder={`Website Design\nWebsite Development\nDigital Marketing\nSocial Media Management\nSEO Optimization\nOnline Advertising Campaigns\nContent Strategy`}
                  className="w-full bg-black/40 border border-white/20 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-[#E30514] resize-none"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={closeEdit}
                disabled={saving}
                className="flex-1 border border-white/30 hover:border-white/50 hover:bg-white/5 transition-all duration-300 py-3 px-6 text-white text-sm uppercase font-semibold rounded-md disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex-1 border border-[#E30514] bg-[#E30514]/20 hover:bg-[#E30514]/30 text-white transition-all duration-300 py-3 px-6 text-sm uppercase font-semibold rounded-md disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleting && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeDelete}
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
                  This will permanently delete the navbar category{" "}
                  <span className="font-semibold text-white">
                    {deleting.title || deleting.key}
                  </span>
                  . This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={closeDelete}
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

export default AdminNavbarCategoriesPage;

