document.addEventListener('DOMContentLoaded', function() {
    // 1. Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'navbar.css';
    document.head.appendChild(link);

    // 2. Define Navbar HTML
    // Note: Evaluation link is commented out as per previous requests
    const navbarHTML = `
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-left">
                <a href="index.html" class="nav-logo">
                    <img src="gauss_logo.png" alt="GAUSS Logo" class="logo-img">
                </a>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="submission.html">Problem Submission</a></li>
                    <!-- <li><a href="eval.html">Evaluation</a></li> -->
                    <li><a href="https://huggingface.co/datasets/GaussMath/GAUSS">Dataset</a></li>
                </ul>
            </div>
        </div>
    </nav>
    `;

    // 3. Prepend to Body
    const div = document.createElement('div');
    div.innerHTML = navbarHTML;
    document.body.insertBefore(div.firstElementChild, document.body.firstChild);

    // 4. Set Active Class
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
});

