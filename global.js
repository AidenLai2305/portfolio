console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
{ url: '', title: 'Home' },
{ url: 'projects/', title: 'Projects' },
{ url: 'contact/', title: 'Contact' },
{ url: 'resume/', title: 'Resume' },
{ url: 'https://github.com/AidenLai2305', title: 'Profile' },

];

let nav = document.createElement('nav');
document.body.prepend(nav);

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"                  // Local server
  : "/portfolio/";         // GitHub Pages repo name

for (let p of pages) {
    let url = p.url;
    let title = p.title;

    if (!url.startsWith('http')) {
        url = BASE_PATH + url;
    }

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);

    a.classList.toggle(
        'current',
        a.host === location.host && a.pathname === location.pathname,
    );

    a.target = a.host !== location.host ? "_blank" : "";
}


