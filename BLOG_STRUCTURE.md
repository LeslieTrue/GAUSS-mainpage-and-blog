# GAUSS Blog Structure

## New Directory Structure

The GAUSS website has been reorganized with a clean blog structure:

```
├── index.html                    # Main landing page
├── navbar.html/css/js           # Shared navbar components
├── submission.html              # Problem submission page
├── gauss_logo.png              # Site logo
├── gauss_favicon.png           # Site favicon
└── blogs/                      # Blog directory
    ├── home/                   # About GAUSS (formerly home.html)
    │   ├── index.html
    │   ├── navbar.html/css/js
    │   ├── gauss_logo.png
    │   ├── gauss_favicon.png
    │   └── GAUSS General Assessment.../  # Image folder
    ├── bench/                  # Benchmark blog (formerly blog.html)
    │   ├── index.html
    │   ├── navbar.html/css/js
    │   ├── gauss_logo.png
    │   ├── gauss_favicon.png
    │   └── GAUSS Project Blog.../        # Image folder
    └── eval/                   # Evaluation blog (formerly eval.html)
        ├── index.html
        ├── navbar.html/css/js
        ├── gauss_logo.png
        ├── gauss_favicon.png
        └── GAUSS Eval Human–LLM.../      # Image folder
```

## Navigation Updates

### Main Navigation (Root Level)
- **Home** → `index.html` (landing page)
- **About** → `blogs/home/` (about GAUSS)
- **Benchmark** → `blogs/bench/` (benchmark details)
- **Evaluation** → `blogs/eval/` (evaluation analysis)
- **Submit** → `submission.html` (problem submission)
- External links remain the same

### Blog Navigation (Within Blog Directories)
Each blog directory has its own navbar with relative paths:
- **Home** → `../../index.html`
- **About** → `../home/`
- **Benchmark** → `../bench/`
- **Evaluation** → `../eval/`
- **Submit** → `../../submission.html`

## Key Changes

1. **File Organization**:
   - `home.html` → `blogs/home/index.html`
   - `blog.html` → `blogs/bench/index.html`
   - `eval.html` → `blogs/eval/index.html`

2. **Image Folders Moved**:
   - Each blog's images moved to its respective directory
   - Image paths remain correct (relative to new HTML locations)

3. **Navigation Structure**:
   - Cleaner, more intuitive navigation
   - Each blog is accessible via `/blogs/{name}/`
   - Active states properly set for each blog section

4. **Self-Contained Blogs**:
   - Each blog directory contains all necessary files
   - Independent navbar, CSS, JS, and assets
   - Can be accessed directly via URL

## Benefits

- **Clean URLs**: `/blogs/home/`, `/blogs/bench/`, `/blogs/eval/`
- **Organized Structure**: Related content grouped together
- **Maintainable**: Each blog is self-contained
- **Scalable**: Easy to add new blog sections
- **SEO Friendly**: Clear content hierarchy

## Usage

### Accessing Blogs
- About GAUSS: `https://yoursite.com/blogs/home/`
- Benchmark: `https://yoursite.com/blogs/bench/`
- Evaluation: `https://yoursite.com/blogs/eval/`

### Adding New Blogs
1. Create new directory under `blogs/`
2. Copy navbar files and assets
3. Update navbar links in all locations
4. Add navigation link to main navbar

## Technical Notes

- All original Notion content preserved
- Image paths automatically correct due to co-location
- Navbar system maintains consistency across all pages
- Each blog can be developed independently
