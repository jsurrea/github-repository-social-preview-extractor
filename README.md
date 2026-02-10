# GitHub Repository Social Preview Extractor

Extract and download GitHub's auto-generated social preview images from any public repository.

**[Live Demo](https://jsurrea.github.io/github-repository-social-preview-extractor/)**

---

## What is this?

When you share a GitHub repository link on platforms like Twitter, Slack, or Discord, a social preview image is displayed. GitHub auto-generates these images for every public repository, showing the repo name, owner, star count, description, language, and more.

This tool lets you **extract and download** that auto-generated image from any public GitHub repository.

## How it works

GitHub serves auto-generated OpenGraph images from `opengraph.githubassets.com`. This tool:

1. **Parses** the GitHub URL you provide to extract the repository owner and name.
2. **Fetches** the repository page through a CORS proxy to read the `og:image` meta tag and determine whether the repo uses a custom or auto-generated social preview.
3. **Constructs** the direct URL to the auto-generated image at `opengraph.githubassets.com`.
4. **Displays** the image and lets you download it with one click.

If the repository owner has set a custom social preview, the tool will let you know and still show the auto-generated version.

## Local development

```bash
# Clone the repository
git clone https://github.com/jsurrea/github-repository-social-preview-extractor.git
cd github-repository-social-preview-extractor

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## Tech stack

- **TypeScript** — type-safe logic for URL parsing, image extraction, and download
- **Vite** — fast dev server and build tool
- **Vanilla HTML/CSS** — no framework, no runtime dependencies
- **GitHub Pages** — hosted and deployed automatically via GitHub Actions

## License

[MIT](LICENSE)
