/**
 * GAUSS Navigation Bar Component
 * Handles navbar functionality and active state management
 */

class GaussNavbar {
  constructor() {
    this.currentPath = this.getCurrentPath();
    this.rootPath = this.getRootPath();
    this.init();
  }

  /**
   * Get current path info from URL
   */
  getCurrentPath() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment !== '');
    
    return {
      full: path,
      segments: segments,
      isRoot: segments.length === 0 || (segments.length === 1 && segments[0].endsWith('.html')),
      isBlog: segments.includes('blogs'),
      blogType: segments.includes('blogs') ? segments[segments.indexOf('blogs') + 1] : null
    };
  }

  /**
   * Get root path based on current location
   */
  getRootPath() {
    const segments = this.currentPath.segments;
    
    console.log('Calculating root path for segments:', segments);
    
    if (this.currentPath.isRoot) {
      console.log('At root level, using "./"');
      return './';
    } else if (this.currentPath.isBlog) {
      const blogIndex = segments.indexOf('blogs');
      // Calculate how many levels deep we are from the blogs directory
      const levelsUp = segments.length - blogIndex - 1;
      const rootPath = '../'.repeat(levelsUp);
      
      console.log('In blog directory:', {
        blogIndex,
        levelsUp,
        rootPath
      });
      
      return rootPath;
    }
    
    // Fallback: calculate based on total depth
    const levelsUp = segments.length;
    const rootPath = '../'.repeat(levelsUp);
    
    console.log('Fallback calculation:', {
      totalSegments: segments.length,
      levelsUp,
      rootPath
    });
    
    return rootPath;
  }

  /**
   * Initialize navbar functionality
   */
  init() {
    this.setActiveLink();
    this.addEventListeners();
  }

  /**
   * Set active state for current page link
   */
  setActiveLink() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      const href = link.getAttribute('href');
      
      // Check for active states
      if (this.currentPath.isRoot && (href === 'index.html' || href === './index.html')) {
        link.classList.add('active');
      } else if (this.currentPath.isBlog) {
        if (this.currentPath.blogType === 'home' && href.includes('/home/')) {
          link.classList.add('active');
        } else if (this.currentPath.blogType === 'bench' && href.includes('/bench/')) {
          link.classList.add('active');
        } else if (this.currentPath.blogType === 'eval' && href.includes('/eval/')) {
          link.classList.add('active');
        }
      }
    });
  }

  /**
   * Add event listeners for navbar interactions
   */
  addEventListeners() {
    // Smooth scroll for anchor links (if any)
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', this.handleAnchorClick.bind(this));
    });

    // Handle window resize for responsive behavior
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  /**
   * Handle anchor link clicks with smooth scrolling
   */
  handleAnchorClick(event) {
    const href = event.target.getAttribute('href');
    if (href.startsWith('#')) {
      event.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 70; // Account for fixed navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }

  /**
   * Handle window resize events
   */
  handleResize() {
    // Add responsive behavior if needed
    // Currently navbar is responsive via CSS
  }

  /**
   * Update active link programmatically
   */
  updateActiveLink(pageName) {
    this.currentPage = pageName;
    this.setActiveLink();
  }
}

/**
 * Load and insert navbar HTML with dynamic path resolution
 */
function loadNavbar() {
  return new Promise((resolve, reject) => {
    // Use the same path calculation logic as the class
    const pathInfo = {
      full: window.location.pathname,
      segments: window.location.pathname.split('/').filter(segment => segment !== ''),
    };
    pathInfo.isRoot = pathInfo.segments.length === 0 || (pathInfo.segments.length === 1 && pathInfo.segments[0].endsWith('.html'));
    pathInfo.isBlog = pathInfo.segments.includes('blogs');
    
    let rootPath = './';
    
    if (pathInfo.isRoot) {
      rootPath = './';
    } else if (pathInfo.isBlog) {
      const blogIndex = pathInfo.segments.indexOf('blogs');
      const levelsUp = pathInfo.segments.length - blogIndex - 1;
      rootPath = '../'.repeat(levelsUp);
    } else {
      // Fallback: calculate based on total depth
      const levelsUp = pathInfo.segments.length;
      rootPath = '../'.repeat(levelsUp);
    }
    
    const navbarPath = rootPath + 'navbar.html';
    
    console.log('Loading navbar:', {
      currentPath,
      segments,
      navbarPath,
      rootPath,
      fullUrl: new URL(navbarPath, window.location.href).href
    });
    
    // Try to fetch navbar, with fallback to embedded HTML
    fetch(navbarPath)
      .then(response => {
        console.log('Navbar fetch response:', response.status, response.statusText);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        console.log('Navbar HTML loaded, length:', html.length);
        // Update paths in the navbar HTML based on current location
        const updatedHtml = updateNavbarPaths(html, rootPath);
        
        // Insert navbar at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', updatedHtml);
        console.log('Navbar inserted into DOM');
        resolve();
      })
      .catch(error => {
        console.warn('Failed to load navbar.html, using embedded navbar:', error);
        // Fallback to embedded navbar HTML
        const embeddedNavbar = createEmbeddedNavbar(rootPath);
        document.body.insertAdjacentHTML('afterbegin', embeddedNavbar);
        console.log('Embedded navbar inserted into DOM');
        resolve();
      });
  });
}

/**
 * Create embedded navbar HTML as fallback
 */
function createEmbeddedNavbar(rootPath) {
  console.log('Creating embedded navbar with rootPath:', rootPath);
  
  return `
<!-- Navigation Bar Component -->
<nav class="navbar">
  <div class="nav-container">
    <!-- 左侧 Logo + 链接 -->
    <div class="nav-left">
      <!-- Logo 链接 -->
      <a href="${rootPath}index.html" class="nav-logo">
        <img src="${rootPath}gauss_logo.png" alt="GAUSS Logo" class="logo-img">
      </a>
      <ul class="nav-links">
        <li><a href="${rootPath}index.html">Home</a></li>
        <li><a href="${rootPath}blogs/home/">About</a></li>
        <li><a href="${rootPath}blogs/bench/">Benchmark</a></li>
        <li><a href="${rootPath}blogs/eval/">Evaluation</a></li>
        <li><a href="${rootPath}submission.html">Submit</a></li>
        <li><a href="https://huggingface.co/datasets/GaussMath/GAUSS">Dataset</a></li>
        <li><a href="https://arxiv.org/abs/2509.18122">arXiv</a></li>
        <li><a href="https://drive.google.com/file/d/1ka15SjUl2FhzQMPOv4GQyyu5rb0tVAJT/view?usp=sharing">PDF</a></li>
      </ul>
    </div>
  </div>
</nav>`;
}

/**
 * Update navbar paths based on current directory level
 */
function updateNavbarPaths(html, rootPath) {
  console.log('Updating navbar paths with rootPath:', rootPath);
  
  // Replace all {{ROOT_PATH}} placeholders with the actual root path
  let updatedHtml = html.replace(/\{\{ROOT_PATH\}\}/g, rootPath);
  
  console.log('Navbar HTML after path replacement:', updatedHtml.substring(0, 200) + '...');
  
  return updatedHtml;
}

/**
 * Initialize navbar when DOM is loaded
 */
function initNavbar() {
  console.log('Initializing navbar...', {
    pathname: window.location.pathname,
    readyState: document.readyState
  });
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('DOM loaded, loading navbar...');
      loadNavbar().then(() => {
        console.log('Navbar loaded successfully, initializing GaussNavbar...');
        window.gaussNavbar = new GaussNavbar();
      }).catch(error => {
        console.error('Failed to initialize navbar:', error);
      });
    });
  } else {
    console.log('DOM already loaded, loading navbar immediately...');
    loadNavbar().then(() => {
      console.log('Navbar loaded successfully, initializing GaussNavbar...');
      window.gaussNavbar = new GaussNavbar();
    }).catch(error => {
      console.error('Failed to initialize navbar:', error);
    });
  }
}

// Auto-initialize if this script is loaded
if (typeof window !== 'undefined') {
  initNavbar();
}
