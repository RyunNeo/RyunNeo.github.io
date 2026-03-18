import { cache } from "react";
import { projectOverrides } from "@/content/projects";
import { siteConfig } from "./site-config";
import type { GitHubRepo, Project } from "./types";

function getHeaders() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  return {
    "User-Agent": "red-lemon-blog",
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${siteConfig.githubUsername}/repos?per_page=100&sort=updated`,
    {
      headers: getHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub API 请求失败：${response.status}`);
  }

  return (await response.json()) as GitHubRepo[];
}

function mergeProjects(repos: GitHubRepo[]) {
  const repoMap = new Map(repos.map((repo) => [repo.name, repo]));

  const overrideProjects: Project[] = projectOverrides.map((override) => {
    const matched = repoMap.get(override.repo);

    return {
      ...override,
      htmlUrl:
        matched?.html_url ??
        `https://github.com/${siteConfig.githubUsername}/${override.repo}`,
      homepage: matched?.homepage ?? override.demoUrl,
      stars: matched?.stargazers_count ?? 0,
      updatedAt: matched?.pushed_at,
      source: matched ? "github" : "local",
    };
  });

  const automaticProjects: Project[] = repos
    .filter((repo) => !repo.archived)
    .filter((repo) => !repo.fork)
    .filter((repo) => !overrideProjects.some((project) => project.repo === repo.name))
    .map((repo) => ({
      repo: repo.name,
      name: repo.name,
      description: repo.description ?? "来自 GitHub 的项目展示卡片。",
      techStack: repo.topics.length > 0 ? repo.topics : [repo.language ?? "GitHub"],
      demoUrl: repo.homepage ?? undefined,
      htmlUrl: repo.html_url,
      homepage: repo.homepage ?? undefined,
      stars: repo.stargazers_count,
      updatedAt: repo.pushed_at,
      featured: false,
      pinnedOrder: 99,
      source: "github",
    }));

  return [...overrideProjects, ...automaticProjects].sort((left, right) => {
    const leftFeatured = left.featured ? 0 : 1;
    const rightFeatured = right.featured ? 0 : 1;

    return (
      leftFeatured - rightFeatured ||
      (left.pinnedOrder ?? 99) - (right.pinnedOrder ?? 99) ||
      right.stars - left.stars ||
      new Date(right.updatedAt ?? 0).getTime() - new Date(left.updatedAt ?? 0).getTime()
    );
  });
}

export const getProjects = cache(async () => {
  try {
    const repos = await fetchGitHubRepos();
    return mergeProjects(repos);
  } catch {
    return mergeProjects([]);
  }
});

export async function getFeaturedProjects(limit = 3) {
  const projects = await getProjects();
  return projects.filter((project) => project.featured).slice(0, limit);
}
