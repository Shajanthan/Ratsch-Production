import ProjectCard from "@/components/ProjectCard";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsArrowUpRight } from "react-icons/bs";
import { getHomepageSettings } from "../services/homepageService";
import { getProjects } from "../services/projectService";

const ProjectSection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.startsWith("/demo") ? "/demo" : "";
  const [projects, setProjects] = useState<
    {
      id: string;
      titleLine: string;
      titleLine2: string;
      description: string;
      image: string;
      date: string;
      type: string;
      client: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getHomepageSettings(), getProjects()])
      .then(([settings, allProjects]) => {
        if (cancelled) return;
        const ids = [
          settings.latestProjectId1,
          settings.latestProjectId2,
          settings.latestProjectId3,
          settings.latestProjectId4,
        ];
        const list: {
          id: string;
          titleLine: string;
          titleLine2: string;
          description: string;
          image: string;
          date: string;
          type: string;
          client: string;
        }[] = [];
        for (const id of ids) {
          if (!id) continue;
          const p = allProjects.find((x) => x.id === id);
          if (!p) continue;
          list.push({
            id: p.id ?? "",
            titleLine: p.titleLine1,
            titleLine2: p.titleLine2,
            description: p.smallDescription,
            image:
              p.coverImageUrl ||
              (p.imageUrls?.length ? p.imageUrls[0] : "") ||
              "",
            date: p.date,
            type: p.type,
            client: p.client,
          });
        }
        setProjects(list);
      })
      .catch(() => {
        if (!cancelled) setProjects([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-black relative">
      <img
        src="https://res.cloudinary.com/dybv1h20q/image/upload/v1769927519/bg_do9pwv.png"
        className="absolute inset-0 opacity-50 w-full h-full object-cover"
      />
      <div className="relative z-10 py-6 md:py-12">
        <div className=" bg-black py-6 md:py-12">
          <div className="container lg:max-w-[1400px] mx-auto px-4 md:px-0">
            <div className="text-white flex flex-col sm:flex-row justify-between gap-4">
              <div className="text-3xl md:text-5xl uppercase font-bold">
                Latest Projects
              </div>
              <button
                type="button"
                onClick={() => navigate(`${basePath}/projects`)}
                className="uppercase rounded-full font-bold px-6 md:px-10 py-2 md:py-3 flex items-center gap-2 md:gap-3 text-sm md:text-lg bg-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 w-fit group"
              >
                more projects
                <BsArrowUpRight
                  strokeWidth={2}
                  size={14}
                  className="md:w-4 md:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                />
              </button>
            </div>
            <p className="text-white w-full md:w-1/2 py-4 text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur. Maecenas varius sit
              consequat vulputate urna augue. Faucibus adipiscing aenean mi
              diam. Ac bibendum elementum aliquet
            </p>

            <div className="text-white flex flex-col gap-3 px-2 md:px-8">
              {loading ? (
                <p className="text-white/50 py-8">Loading projects…</p>
              ) : projects.length === 0 ? (
                <p className="text-white/50 py-8">
                  No projects selected for Latest Projects. Choose 4 in Admin →
                  Homepage Management.
                </p>
              ) : (
                projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    titleLine={project.titleLine}
                    titleLine2={project.titleLine2}
                    description={project.description}
                    image={project.image}
                    date={project.date}
                    type={project.type}
                    client={project.client}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
