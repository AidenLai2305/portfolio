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

document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
    Theme:
    <select>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
  `
);

const select = document.querySelector('select');

if ('colorScheme' in localStorage) {
  const saved = localStorage.colorScheme;
  document.documentElement.style.setProperty('color-scheme', saved);
  select.value = saved;
}

select.addEventListener('input', function (event) {
  const value = event.target.value;
  document.documentElement.style.setProperty('color-scheme', value);
  localStorage.colorScheme = value;
});

const form = document.querySelector('form');

form?.addEventListener('submit', function (event) {
  event.preventDefault();

  const data = new FormData(form);
  let url = form.action + "?"; // start with form.action and "?"

  for (let [name, value] of data) {
    url += `${name}=${encodeURIComponent(value)}&`; // build URL progressively
  }

  url = url.slice(0, -1); // remove the last "&"

  console.log(url)

  location.href = url;
});