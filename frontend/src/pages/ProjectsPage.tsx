import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LetsConnectSection from "@/layout/LetsConnectSection";
import Footer from "@/layout/Footer";
import CategoryCard from "@/components/CategoryCard";
import {
  getProjects,
  slugFromTitleLines,
  type Project,
} from "@/services/projectService";
import { getCategories } from "@/services/categoryService";

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

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDemo = location.pathname.startsWith("/demo");
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<
    { name: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getProjects(), getCategories()])
      .then(([projectsData, categoriesData]) => {
        if (!cancelled) {
          setProjects(projectsData);
          setCategories(
            categoriesData.map((c) => ({
              name: c.name,
              description: c.description ?? "",
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

  const uniqueCategories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      const cat = p.projectCategory?.trim();
      set.add(cat ? cat : "Other");
    });
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const projectsByCategory = useMemo(() => {
    const map: Record<string, Project[]> = {};
    uniqueCategories.forEach((cat) => {
      map[cat] = [];
    });
    projects.forEach((p) => {
      const cat = p.projectCategory?.trim()
        ? p.projectCategory!.trim()
        : "Other";
      if (map[cat]) map[cat].push(p);
    });
    return map;
  }, [projects, uniqueCategories]);

  const categoryDescMap = useMemo(() => {
    const map: Record<string, string> = {};
    categories.forEach((c) => {
      map[c.name] = c.description ?? "";
    });
    return map;
  }, [categories]);

  return (
    <div className="min-h-screen bg-black">
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <div className="relative w-full pt-12 md:pt-10">
          <img
            src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927519/bg_do9pwv.png"
            className="absolute inset-0 opacity-70 w-full h-full object-cover"
          />
          <div className="relative z-20 min-h-[50vh] flex items-center px-4 md:px-0 w-full">
            <div className="flex flex-col w-full">
              <div className="flex flex-col justify-center items-center text-center w-full min-h-[50vh]">
                <div className="uppercase text-4xl md:text-6xl lg:text-8xl font-bold">
                  projects
                </div>
                <div className="capitalize text-lg md:text-2xl lg:text-4xl  py-4">
                  our <span className="text-red-600">work</span> speaks for{" "}
                  <span className="text-red-600">itself</span>
                </div>
              </div>
              <div className="py-8 w-full">
                <div className="">
                  {loading ? (
                    <div className="py-10 my-8 bg-black text-center text-white/70">
                      Loading…
                    </div>
                  ) : error ? (
                    <div className="py-10 my-8 bg-black text-center text-red-400">
                      {error}
                    </div>
                  ) : uniqueCategories.length === 0 ? (
                    <div className="py-10 my-8 bg-black text-center text-white/70">
                      No projects yet.
                    </div>
                  ) : (
                    uniqueCategories.map((category) => (
                      <CategoryCard
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
      </div>
      <LetsConnectSection bottomPadding={false} />
      <Footer />
    </div>
  );
};

export default ProjectsPage;
