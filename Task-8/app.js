const routes = {
    home: `
        <div class="page">
          <h1>Home</h1>
          <p>Welcome to the homepage! This is a simple Single-Page Application using hash-based routing.</p>
        </div>`,

    about: `
        <div class="page">
          <h1>About</h1>
          <p>This SPA was built using plain HTML, CSS, and JavaScript — no frameworks or libraries needed.</p>
        </div>`,

    contact: `
        <div class="page">
          <h1>Contact</h1>
          <p>You can reach us at <strong>hello@example.com</strong>. We'll get back to you soon!</p>
        </div>`,

    404: `
        <div class="page">
          <h1>404 — Page Not Found</h1>
          <p>The page you're looking for doesn't exist. <a href="#home">Go Home</a></p>
        </div>`
    };


    function loadPage() {
      const hash = location.hash.replace('#', '') || 'home';

      const content = routes[hash] || routes['404'];
      document.getElementById('app').innerHTML = content;

      document.querySelectorAll('nav a').forEach(link => {
        const linkHash = link.getAttribute('href').replace('#', '');
        link.classList.toggle('active', linkHash === hash);
      });
    }


    onhashchange = loadPage;

    onload = loadPage;
