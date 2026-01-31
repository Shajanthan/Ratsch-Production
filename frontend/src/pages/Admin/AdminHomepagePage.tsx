import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  getHomepageSettings,
  updateHomepageSettings,
  type HomepageSettings,
} from "../../services/homepageService";
import { getProjects, type Project } from "../../services/projectService";
import { getClients, type Client } from "../../services/clientService";
import { getCoreValues, type CoreValue } from "../../services/coreValueService";
import { useToast } from "../../context/ToastContext";
import Dropdown from "../../components/Dropdown";

type HomepageTab = "homeBanner" | "latestProjects" | "clients" | "coreValues";

const TABS: { id: HomepageTab; label: string }[] = [
  { id: "homeBanner", label: "Home Banner" },
  { id: "latestProjects", label: "Latest Projects" },
  { id: "clients", label: "Clients" },
  { id: "coreValues", label: "Core Values" },
];

const AdminHomepagePage: React.FC = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<HomepageTab>("homeBanner");
  const HOME_BANNER_SLOTS: (keyof HomepageSettings)[] = [
    "projectId1",
    "projectId2",
    "projectId3",
  ];
  const LATEST_PROJECT_SLOTS: (keyof HomepageSettings)[] = [
    "latestProjectId1",
    "latestProjectId2",
    "latestProjectId3",
    "latestProjectId4",
  ];
  const ALL_CLIENT_SLOTS: (keyof HomepageSettings)[] = [
    "clientId1",
    "clientId2",
    "clientId3",
    "clientId4",
  ];
  const ALL_CORE_VALUE_SLOTS: (keyof HomepageSettings)[] = [
    "coreValueId1",
    "coreValueId2",
    "coreValueId3",
  ];

  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [coreValues, setCoreValues] = useState<CoreValue[]>([]);
  const [settings, setSettings] = useState<HomepageSettings>({
    projectId1: "",
    projectId2: "",
    projectId3: "",
    latestProjectId1: "",
    latestProjectId2: "",
    latestProjectId3: "",
    latestProjectId4: "",
    clientId1: "",
    clientId2: "",
    clientId3: "",
    clientId4: "",
    coreValueId1: "",
    coreValueId2: "",
    coreValueId3: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [projectsData, clientsData, coreValuesData, settingsData] =
        await Promise.all([
          getProjects(),
          getClients(),
          getCoreValues(),
          getHomepageSettings(),
        ]);
      setProjects(projectsData);
      setClients(clientsData);
      setCoreValues(coreValuesData);
      setSettings(settingsData);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to load homepage settings";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleHomeBannerChange = (
    slot: keyof HomepageSettings,
    value: string,
  ) => {
    setSettings((prev) => {
      const next = { ...prev, [slot]: value };
      if (value) {
        HOME_BANNER_SLOTS.forEach((k) => {
          if (k !== slot && next[k] === value) next[k] = "";
        });
      }
      return next;
    });
  };

  const handleLatestProjectsChange = (
    slot: keyof HomepageSettings,
    value: string,
  ) => {
    setSettings((prev) => {
      const next = { ...prev, [slot]: value };
      if (value) {
        LATEST_PROJECT_SLOTS.forEach((k) => {
          if (k !== slot && next[k] === value) next[k] = "";
        });
      }
      return next;
    });
  };

  const handleClientChange = (slot: keyof HomepageSettings, value: string) => {
    setSettings((prev) => {
      const next = { ...prev, [slot]: value };
      if (value) {
        ALL_CLIENT_SLOTS.forEach((k) => {
          if (k !== slot && next[k] === value) next[k] = "";
        });
      }
      return next;
    });
  };

  const handleCoreValueChange = (
    slot: keyof HomepageSettings,
    value: string,
  ) => {
    setSettings((prev) => {
      const next = { ...prev, [slot]: value };
      if (value) {
        ALL_CORE_VALUE_SLOTS.forEach((k) => {
          if (k !== slot && next[k] === value) next[k] = "";
        });
      }
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await updateHomepageSettings(settings);
      toast.success("Homepage settings saved.");
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to save homepage settings";
      setError(msg);
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const projectLabel = (p: Project) =>
    `${p.titleLine1} ${p.titleLine2}`.trim() || p.id || "—";

  const projectDropdownOptions = useMemo(
    () =>
      projects.map((p) => ({
        value: p.id ?? "",
        label: projectLabel(p),
        imageUrl:
          p.coverImageUrl ||
          (p.imageUrls?.length ? p.imageUrls[0] : "") ||
          undefined,
      })),
    [projects],
  );

  const clientDropdownOptions = useMemo(
    () =>
      clients.map((c, i) => ({
        value: c.id ?? "",
        label: `Client ${i + 1}`,
        imageUrl: c.imageUrl,
      })),
    [clients],
  );

  const coreValueDropdownOptions = useMemo(
    () =>
      coreValues.map((v) => ({
        value: v.id ?? "",
        label: v.title,
        imageUrl: v.imageUrl,
      })),
    [coreValues],
  );

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
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2">
          Homepage Management
        </h2>
        <p className="text-white/70 text-sm md:text-base mb-6">
          Choose projects, clients, and core values for the homepage sections.
        </p>

        {error && (
          <div className="p-3 bg-red-900/30 border border-red-500/50 rounded-md mb-6">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-semibold uppercase rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#FF0000]/30 border border-[#FF0000] text-white"
                  : "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/20"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content for selected tab */}
        {activeTab === "homeBanner" && (
          <div className="space-y-4 max-w-6xl mb-6">
            <h3 className="text-lg font-semibold uppercase text-white/90">
              Select 3 projects (Home hero)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {(["projectId1", "projectId2", "projectId3"] as const).map(
                (key, index) => (
                  <Dropdown
                    key={key}
                    label={`Project ${index + 1}`}
                    options={projectDropdownOptions}
                    value={settings[key]}
                    onChange={(value) => handleHomeBannerChange(key, value)}
                    placeholder="— Select project —"
                  />
                ),
              )}
            </div>
          </div>
        )}

        {activeTab === "latestProjects" && (
          <div className="space-y-4 max-w-6xl mb-6">
            <h3 className="text-lg font-semibold uppercase text-white/90">
              Select 4 projects (Latest Projects section)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {(
                [
                  "latestProjectId1",
                  "latestProjectId2",
                  "latestProjectId3",
                  "latestProjectId4",
                ] as const
              ).map((key, index) => (
                <Dropdown
                  key={key}
                  label={`Project ${index + 1}`}
                  options={projectDropdownOptions}
                  value={settings[key]}
                  onChange={(value) => handleLatestProjectsChange(key, value)}
                  placeholder="— Select project —"
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "clients" && (
          <div className="space-y-4 max-w-6xl mb-6">
            <h3 className="text-lg font-semibold uppercase text-white/90">
              Select 4 clients (Our Clients section)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {(
                ["clientId1", "clientId2", "clientId3", "clientId4"] as const
              ).map((key, index) => (
                <Dropdown
                  key={key}
                  label={`Client ${index + 1}`}
                  options={clientDropdownOptions}
                  value={settings[key]}
                  onChange={(value) => handleClientChange(key, value)}
                  placeholder="— Select client —"
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "coreValues" && (
          <div className="space-y-4 max-w-6xl mb-6">
            <h3 className="text-lg font-semibold uppercase text-white/90">
              Select 3 core values (Core Values section)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {(["coreValueId1", "coreValueId2", "coreValueId3"] as const).map(
                (key, index) => (
                  <Dropdown
                    key={key}
                    label={`Core value ${index + 1}`}
                    options={coreValueDropdownOptions}
                    value={settings[key]}
                    onChange={(value) => handleCoreValueChange(key, value)}
                    placeholder="— Select core value —"
                  />
                ),
              )}
            </div>
          </div>
        )}

        <div className="pt-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="border border-[#FF0000] bg-[#FF0000]/20 hover:bg-[#FF0000]/30 text-white transition-all duration-300 py-3 px-6 text-sm uppercase font-semibold rounded-md disabled:opacity-50 disabled:pointer-events-none"
          >
            {saving ? "Saving…" : "Save homepage settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepagePage;
