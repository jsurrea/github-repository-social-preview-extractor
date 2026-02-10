export interface ParsedRepo {
  owner: string;
  repo: string;
}

/**
 * Parses a GitHub repository URL or shorthand and extracts the owner and repo name.
 *
 * Supported formats:
 *  - https://github.com/owner/repo
 *  - http://github.com/owner/repo
 *  - github.com/owner/repo
 *  - owner/repo
 *  - With trailing slashes, .git suffix, or extra path segments
 */
export function parseGitHubUrl(input: string): ParsedRepo | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  let path: string;

  // Try to parse as a full URL first
  if (trimmed.includes("github.com")) {
    try {
      // Handle cases without protocol
      const urlString = trimmed.startsWith("http")
        ? trimmed
        : `https://${trimmed}`;
      const url = new URL(urlString);

      if (url.hostname !== "github.com" && url.hostname !== "www.github.com") {
        return null;
      }

      path = url.pathname;
    } catch {
      return null;
    }
  } else {
    // Assume it's a shorthand: owner/repo
    path = trimmed;
  }

  // Clean up the path
  path = path
    .replace(/^\/+/, "") // Remove leading slashes
    .replace(/\/+$/, "") // Remove trailing slashes
    .replace(/\.git$/, ""); // Remove .git suffix

  const segments = path.split("/").filter(Boolean);

  if (segments.length < 2) return null;

  const owner = segments[0];
  const repo = segments[1];

  // Basic validation: GitHub usernames and repo names
  if (!isValidGitHubName(owner) || !isValidGitHubName(repo)) {
    return null;
  }

  return { owner, repo };
}

function isValidGitHubName(name: string): boolean {
  // GitHub usernames: alphanumeric + hyphens, no double hyphens, no leading/trailing hyphens
  // Repo names: alphanumeric + hyphens + underscores + dots
  // We use a permissive regex that covers both
  return /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(name) && name.length <= 100;
}
