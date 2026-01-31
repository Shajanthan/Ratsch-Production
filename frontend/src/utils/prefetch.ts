import { getHomepageSettings } from "../services/homepageService";
import { getProjects } from "../services/projectService";
import {
  getServices,
  getServiceById,
} from "../services/serviceService";
import { getCategories } from "../services/categoryService";
import { getCoreValues } from "../services/coreValueService";
import { getClients } from "../services/clientService";
import { getClientReviews } from "../services/clientReviewService";

/**
 * Prefetch all public data in parallel so the cache is warm when the app loads.
 * Also prefetches each service detail so service detail view has no wait.
 * Calls onProgress(0..100) so the splash bar can show real loading progress.
 */
export function prefetchAppData(
  onProgress?: (percent: number) => void,
): Promise<void> {
  onProgress?.(0);
  return Promise.all([
    getHomepageSettings(),
    getProjects(),
    getServices(),
    getCategories(),
    getCoreValues(),
    getClients(),
    getClientReviews(),
  ])
    .then(() => {
      onProgress?.(60);
      return getServices();
    })
    .then((services) =>
      Promise.all(
        services
          .filter((s): s is typeof s & { id: string } => !!s.id)
          .map((s) => getServiceById(s.id)),
      ),
    )
    .then(() => {
      onProgress?.(100);
    });
}
