import type { ParsedRepo } from "./github-url-parser.ts";

/**
 * Triggers a browser download from a blob URL.
 */
export function downloadImage(blobUrl: string, repo: ParsedRepo): void {
  const anchor = document.createElement("a");
  anchor.href = blobUrl;
  anchor.download = `${repo.owner}-${repo.repo}-social-preview.png`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
