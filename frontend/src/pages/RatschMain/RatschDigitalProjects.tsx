import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getProjects,
  slugFromTitleLines,
  type Project,
} from "@/services/projectService";
import { getCategories } from "@/services/categoryService";
import RatschCategoryCard from "@/components/RatschCategoryCard";
import RatschClientReview from "./RatschClientReview";
import CoreValueSection from "@/layout/CoreValueSection";
import RatschLetsTalk from "./RatschLetsTalk";
import RatschFooter from "./RatschFooter";

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

const RatschDigitalProjects: React.FC = () => {
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
    <div className="min-h-screen">
      <div className="min-h-screen text-[#02244A] m-0 p-0">
        {/* Hero Section */}
        <div className="relative w-full ">
          <img
            src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774924370/Latest_Projects_Frame_qomssa.png"
            className="absolute inset-0 opacity-70 w-full h-full object-fill"
          />
          <div className="min-h-[35vh] lg:min-h-[80vh]">
            <div className="flex flex-col justify-center items-center text-center w-full min-h-[35vh] lg:min-h-[80vh]">
              <div className="uppercase text-4xl md:text-6xl lg:text-8xl font-bold">
                projects
              </div>
              <div className="capitalize text-lg md:text-2xl lg:text-4xl py-8">
                our <span className="text-red-600">work</span> speaks for{" "}
                <span className="text-red-600">itself</span>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full bg-gray-200">
          <img
            src="https://res.cloudinary.com/dybv1h20q/image/upload/v1774861628/Frame_71_zy7obm.png"
            className="absolute inset-0 opacity-70 w-full h-full object-fill pointer-events-none"
          />
          <div className="relative z-10 p-6 py-8 lg:py-12 container mx-auto">
            <div className="text-[#02244A] font-bold text-center text-3xl lg:text-4xl uppercase ">
              Pick a category
            </div>
            <div className="flex justify-center items-center py-8 lg:py-12 gap-10">
              <div className="w-[120px] text-center bg-[#02244A] text-white rounded-3xl p-3 uppercase font-semibold hover:scale-105 transition-all duration-300 cursor-pointer">
                creative
              </div>
              <div className="w-[120px] text-center text-[#02244A] bg-white rounded-3xl p-3 uppercase font-semibold hover:scale-105 transition-all duration-300 cursor-pointer">
                digital
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center items-center lg:text-xl lg:py-6 lg:gap-10 gap-4 flex-wrap uppercase max-w-6xl">
                <div className="hover:text-[#005EC8] cursor-pointer">
                  Logo Design
                </div>
                <div className="hover:text-[#005EC8] cursor-pointer">
                  Brand Identity Development
                </div>
                <div className="hover:text-[#005EC8] cursor-pointer">
                  Graphic Design
                </div>
                <div className="hover:text-[#005EC8] cursor-pointer">
                  Motion Graphics
                </div>
                <div className="hover:text-[#005EC8] cursor-pointer">
                  Animation
                </div>
                <div className="hover:text-[#005EC8] cursor-pointer">
                  Advertising Creative
                </div>
                <div className="hover:text-[#005EC8] cursor-pointer">
                  Social Media Visual Design
                </div>
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
                  <div className="py-10 my-8 bg-black text-center text-white/70">
                    No projects yet.
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
    </div>
  );
};

export default RatschDigitalProjects;
