import React, { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import {
  getRatschHomeSettings,
  updateRatschHomeSettings,
  type RatschHomeSettings,
} from "../../services/ratschHomeService";
import { uploadImage } from "../../services/cloudinaryService";

const AdminRatschHomepagePage: React.FC = () => {
  const toast = useToast();

  const [settings, setSettings] = useState<RatschHomeSettings>({
    bannerImageUrl: "",
    bannerImagePublicId: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getRatschHomeSettings();
        if (cancelled) return;
        setSettings(data);
        setImagePreview(data.bannerImageUrl || "");
      } catch (e) {
        if (cancelled) return;
        const msg =
          e instanceof Error
            ? e.message
            : "Failed to load Ratsch homepage settings";
        setError(msg);
        toast.error(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      let bannerImageUrl = settings.bannerImageUrl;
      let bannerImagePublicId = settings.bannerImagePublicId;

      if (imageFile) {
        // Store in dedicated folder; reuse existing publicId if present to avoid duplicates
        const publicId =
          bannerImagePublicId && bannerImagePublicId.length > 0
            ? bannerImagePublicId
            : "home-banner";
        const { url, publicId: uploadedId } = await uploadImage(
          imageFile,
          "ratsch-home",
          publicId,
        );
        bannerImageUrl = url;
        bannerImagePublicId = uploadedId;
      }

      const updated = await updateRatschHomeSettings({
        bannerImageUrl,
        bannerImagePublicId,
      });

      setSettings(updated);
      setImagePreview(updated.bannerImageUrl || "");
      setImageFile(null);

      toast.success("Ratsch homepage banner updated.");
    } catch (e) {
      const msg =
        e instanceof Error
          ? e.message
          : "Failed to save Ratsch homepage banner";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 md:p-8">
          <p className="text-white/70">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 mb-6 w-full">
        <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2">
          Ratsch Homepage Banner
        </h2>
        <p className="text-white/70 text-sm md:text-base mb-6">
          Upload and manage the hero banner image used on the Ratsch homepage.
        </p>

        {error && (
          <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-md mb-6">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-semibold uppercase mb-2 text-white/80 w-full">
              Current banner preview
            </label>
            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 w-full">
                <img
                  src={imagePreview}
                  alt="Ratsch homepage banner preview"
                  className="w-full h-48 md:h-72 object-cover"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/20 bg-black/40 p-8 text-center text-white/50 text-sm">
                No banner image configured yet.
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold uppercase mb-2 text-white/80">
              Choose new banner image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#E30514]/80 file:text-white hover:file:bg-[#E30514] cursor-pointer"
            />
            <p className="mt-2 text-xs text-white/50">
              Recommended: wide image with at least 1600px width for best
              quality.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || (!imageFile && !settings.bannerImageUrl)}
            className="border border-[#E30514] bg-[#E30514]/20 hover:bg-[#E30514]/30 text-white transition-all duration-300 py-3 px-6 text-sm uppercase font-semibold rounded-md disabled:opacity-50 disabled:pointer-events-none"
          >
            {saving ? "Saving…" : "Save banner"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminRatschHomepagePage;
