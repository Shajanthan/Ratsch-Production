import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  getProjects,
  slugFromTitleLines,
  type Project,
} from "@/services/projectService";
import { getCategories } from "@/services/categoryService";
import { getNavbarCategories } from "@/services/navbarCategoryService";
import RatschCategoryCard from "@/components/RatschCategoryCard";
import RatschClientReview from "./RatschClientReview";
import CoreValueSection from "@/layout/CoreValueSection";
import RatschLetsTalk from "./RatschLetsTalk";
import RatschFooter from "./RatschFooter";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

function formatProjectDate(dateStr: string): string {
  if (!dateStr?.trim()) return "—";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type MainCategoryTab = "creative" | "digital";

const RatschDigitalProjects: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isDemo = location.pathname.startsWith("/demo");
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<
    { name: string; description: string }[]
  >([]);
  const [navbarCats, setNavbarCats] = useState<
    { key: string; title: string; items: string[] }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeCategory: MainCategoryTab =
    searchParams.get("category") === "digital" ? "digital" : "creative";
  const activeSub = searchParams.get("sub")?.trim() ?? "";

  const setMainTab = useCallback(
    (cat: MainCategoryTab) => {
      const next = new URLSearchParams(searchParams);
      next.set("category", cat);
      next.delete("sub");
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  const setSubFilter = useCallback(
    (label: string | null) => {
      const next = new URLSearchParams(searchParams);
      next.set("category", activeCategory);
      if (label) next.set("sub", label);
      else next.delete("sub");
      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams, activeCategory],
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hasSub = !!params.get("sub")?.trim();
    if (hasSub) {
      const scrollToTarget = () => {
        const element = document.getElementById("digital-category-picker");
        if (!element) return;
        const navOffset = 110; // fixed navbar + small breathing space
        const y =
          element.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      };

      // First pass + delayed pass for direct URL loads
      const timer1 = setTimeout(scrollToTarget, 120);
      const timer2 = setTimeout(scrollToTarget, 380);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }

    window.scrollTo(0, 0);
  }, [location.search]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getProjects(), getCategories(), getNavbarCategories()])
      .then(([projectsData, categoriesData, navData]) => {
        if (!cancelled) {
          setProjects(projectsData);
          setCategories(
            categoriesData.map((c) => ({
              name: c.name,
              description: c.description ?? "",
            })),
          );
          setNavbarCats(
            navData.map((c) => ({
              key: (c.key || "").toLowerCase(),
              title: c.title || c.key,
              items: Array.isArray(c.items) ? c.items : [],
            })),
          );
        }
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load projects");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const subItemsForTab = useMemo(() => {
    const def = navbarCats.find((c) => c.key === activeCategory);
    return def?.items ?? [];
  }, [navbarCats, activeCategory]);

  const projectsForMainTab = useMemo(() => {
    return projects.filter((p) => {
      const key = (p.navbarCategoryKey || "").toLowerCase();
      if (key === activeCategory) return true;
      if (key) return false;
      const pc = (p.projectCategory || "").trim();
      if (!pc) return false;
      const items = navbarCats.find((c) => c.key === activeCategory)?.items;
      if (items?.length && items.some((it) => it === pc)) return true;
      if (pc.startsWith(`${activeCategory} -`) || pc.startsWith(`${activeCategory}-`))
        return true;
      return false;
    });
  }, [projects, activeCategory, navbarCats]);

  const filteredProjects = useMemo(() => {
    if (!activeSub) return projectsForMainTab;
    return projectsForMainTab.filter((p) => {
      const sub = (p.navbarSubItem || "").trim() || (p.projectCategory || "").trim();
      return sub === activeSub;
    });
  }, [projectsForMainTab, activeSub]);

  const uniqueCategories = useMemo(() => {
    const set = new Set<string>();
    filteredProjects.forEach((p) => {
      const cat = p.projectCategory?.trim();
      set.add(cat ? cat : "Other");
    });
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [filteredProjects]);

  const projectsByCategory = useMemo(() => {
    const map: Record<string, Project[]> = {};
    uniqueCategories.forEach((cat) => {
      map[cat] = [];
    });
    filteredProjects.forEach((p) => {
      const cat = p.projectCategory?.trim()
        ? p.projectCategory!.trim()
        : "Other";
      if (map[cat]) map[cat].push(p);
    });
    return map;
  }, [filteredProjects, uniqueCategories]);

  const categoryDescMap = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((c) => {
      map[c.name] = c.description ?? "";
    });
    return map;
  }, [categories]);

  return (
    <div className="min-h-screen">
      <div className="min-h-screen text-[#02244A] m-0 p-0">
        {/* Hero Section */}
        <div className="relative w-full ">
          <img
            src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774924370/Latest_Projects_Frame_qomssa.png"
            className="absolute inset-0 opacity-70 w-full h-full object-fill"
          />
          <div className="min-h-[35vh] lg:min-h-[50vh] xl:min-h-[80vh]">
            <div className="flex flex-col justify-center items-center text-center w-full min-h-[35vh] lg:min-h-[50vh] xl:min-h-[80vh]">
              <div className="uppercase text-4xl md:text-6xl lg:text-6xl xl:text-8xl font-bold px-2">
                projects
              </div>
              <div className="capitalize text-lg md:text-2xl lg:text-3xl xl:text-4xl py-8 px-4">
                our <span className="text-red-600">work</span> speaks for{" "}
                <span className="text-red-600">itself</span>
              </div>
            </div>
          </div>
        </div>
        <div id="digital-category-picker" className="relative w-full bg-gray-200">
          <img
            src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774861628/Frame_71_zy7obm.png"
            className="absolute inset-0 opacity-70 w-full h-full object-fill pointer-events-none"
          />
          <div className="relative z-10 p-6 py-8 xl:py-12 container mx-auto">
            <div className="text-[#02244A] font-bold text-center text-3xl xl:text-4xl uppercase ">
              Pick a category
            </div>
            <div className="flex justify-center items-center py-8 xl:py-12 gap-10">
              <button
                type="button"
                onClick={() => setMainTab("creative")}
                className={`w-[120px] text-center rounded-3xl p-3 uppercase font-semibold hover:scale-105 transition-all duration-300 cursor-pointer ${
                  activeCategory === "creative"
                    ? "bg-[#02244A] text-white shadow-md"
                    : "text-[#02244A] bg-white"
                }`}
              >
                creative
              </button>
              <button
                type="button"
                onClick={() => setMainTab("digital")}
                className={`w-[120px] text-center rounded-3xl p-3 uppercase font-semibold hover:scale-105 transition-all duration-300 cursor-pointer ${
                  activeCategory === "digital"
                    ? "bg-[#02244A] text-white shadow-md"
                    : "text-[#02244A] bg-white "
                }`}
              >
                digital
              </button>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center items-center xl:text-xl lg:py-4 xl:py-6 lg:gap-6 xl:gap-10 gap-4 flex-wrap uppercase max-w-6xl px-2">
                {subItemsForTab.length > 0 ? (
                  subItemsForTab.map((label) => {
                    const isActive = activeSub === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() =>
                          setSubFilter(isActive ? null : label)
                        }
                        className={`cursor-pointer transition-colors ${
                          isActive
                            ? "text-[#005EC8] font-semibold"
                            : "hover:text-[#005EC8]"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })
                ) : (
                  <span className="text-sm text-[#02244A]/70 normal-case">
                    Subcategories appear here when configured in admin.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 min-h-[50vh] flex items-center px-0 w-full">
          <div className="flex flex-col w-full">
            <div className="pb-8 w-full">
              <div className="">
                {loading ? (
                  <div className="py-10 bg-black text-center text-white/70">
                    Loading…
                  </div>
                ) : error ? (
                  <div className="py-10 my-8 bg-black text-center text-red-400">
                    {error}
                  </div>
                ) : uniqueCategories.length === 0 ? (
                  <div className="py-10 my-8 bg-white text-center text-[#02244A]">
                    No projects found.
                  </div>
                ) : (
                  uniqueCategories.map((category) => (
                    <RatschCategoryCard
                      key={category}
                      title={category}
                      desc={categoryDescMap[category] ?? ""}
                      items={projectsByCategory[category].map((p) => ({
                        projectTitle1: p.titleLine1,
                        projectTitle2: p.titleLine2,
                        shortdesc: p.smallDescription ?? "",
                        date: formatProjectDate(p.date ?? ""),
                        image:
                          p.coverImageUrl ||
                          (p.imageUrls?.length ? p.imageUrls[0] : "") ||
                          "",
                        onExplore: () =>
                          navigate(
                            isDemo
                              ? `/demo/project/${slugFromTitleLines(
                                  p.titleLine1,
                                  p.titleLine2,
                                )}`
                              : `/project/${slugFromTitleLines(
                                  p.titleLine1,
                                  p.titleLine2,
                                )}`,
                          ),
                      }))}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <RatschClientReview />
      <CoreValueSection aboutUs={true} />
      <RatschLetsTalk />
      <RatschFooter />
      <WhatsAppFloatingButton />
    </div>
  );
};

export default RatschDigitalProjects;
