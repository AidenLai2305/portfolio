import { fetchJSON, renderProjects } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');

renderProjects(projects, projectsContainer, 'h2');

const title = document.querySelector('.project-title');
if (title) {
  title.textContent = `${projects.length} Projects`;

  console.log(projects.length)

}

import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);


// let rolledData = d3.rollups(
//   projects,
//   (v) => v.length,
//   (d) => d.year,
// );


// let data = rolledData.map(([year, count]) => {
//   return { value: count, label: year };
// });

// let sliceGenerator = d3.pie().value((d) => d.value);
// let arcData = sliceGenerator(data);
// let arcs = arcData.map((d) => arcGenerator(d));


// let colors = d3.scaleOrdinal(d3.schemeTableau10);

// arcs.forEach((arc, idx) => {
//   d3.select('svg')
//       .append('path')
//       .attr('d', arc)
//       .attr('fill', colors(idx))
// });

// let legend = d3.select('.legend');

// data.forEach((d, idx) => {
//   legend
//     .append('li')
//     .attr('style', `--color:${colors(idx)}`) // set the style attribute while passing in parameters
//     .attr("class", "legend-item")
//     // .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`); // set the inner html of <li>
//     .html(`<span class="swatch" style="background-color:${colors(idx)};"></span> ${d.label} <em>(${d.value})</em>`);
// });






// function renderPieChart(projectsGiven) {
//   // Clear previous chart
//   let newSVG = d3.select('svg');
//   newSVG.selectAll('path').remove();

//   let newLegend = d3.select('.legend');
//   newLegend.selectAll('li').remove();
  

//   // Step 1: Roll up data by year
//   let rolledData = d3.rollups(
//     projectsGiven,
//     v => v.length,
//     d => d.year
//   );

//   // Step 2: Map to { label, value }
//   let data = rolledData.map(([year, count]) => ({
//     label: year,
//     value: count
//   }));

//   // Step 3: Create arcs and colors
//   let sliceGenerator = d3.pie().value(d => d.value);
//   let arcData = sliceGenerator(data);
//   let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
//   let arcs = arcData.map(d => arcGenerator(d));
//   let colors = d3.scaleOrdinal(d3.schemeTableau10);

//   // Step 4: Render pie
//   arcs.forEach((arc, idx) => {
//     d3.select('svg')
//       .append('path')
//       .attr('d', arc)
//       .attr('fill', colors(idx));
//   });

//   // Step 5: Render legend
//   const legend = d3.select('.legend');
//   legend.html(''); // Always clear the legend before updating

//   if (data.length === 0) {
//     legend.append('li')
//       .attr('class', 'legend-empty')
//       .text('No projects found');
//   } else {
//     data.forEach((d, idx) => {
//       legend.append('li')
//         .attr('class', 'legend-item')
//         .html(
//           `<span class="swatch" style="background-color:${colors(idx)};"></span> ${d.label} <em>(${d.value})</em>`
//         );
//     });
//   }
// }

let selectedIndex = -1;

function renderPieChart(projectsGiven) {
  // Clear previous chart and legend
  let newSVG = d3.select('svg');
  newSVG.selectAll('path').remove();
  d3.select('.legend').selectAll('li').remove();

  // Step 1: Roll up data by year
  let rolledData = d3.rollups(
    projectsGiven,
    v => v.length,
    d => d.year
  );

  // Step 2: Map to [{ label, value }]
  let data = rolledData.map(([year, count]) => ({
    label: year,
    value: count
  }));

  // Step 2.5: Show fallback if empty
  if (data.length === 0) {
    d3.select('.legend')
      .append('li')
      .text('No projects found.')
      .style('font-style', 'italic');
    return;
  }

  // Step 3: Set up pie + arcs
  let sliceGenerator = d3.pie().value(d => d.value);
  let arcData = sliceGenerator(data);
  let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
  let arcs = arcData.map(d => arcGenerator(d));

  let colors = d3.scaleOrdinal(d3.schemeTableau10);

  // Step 4: Render pie
  arcs.forEach((arc, i) => {
    d3.select('svg')
      .append('path')
      .attr('d', arc)
      .attr('fill', colors(i))
      .on('click', () => {
        selectedIndex = selectedIndex === i ? -1 : i;

        // Highlight selected pie slice
        d3.select('svg')
          .selectAll('path')
          .attr('class', (_, idx) => idx === selectedIndex ? 'selected' : '');

        // Highlight matching legend
        d3.select('.legend')
          .selectAll('li')
          .attr('class', (_, idx) => idx === selectedIndex ? 'legend-item selected' : 'legend-item');

        // Filter + re-render projects
        if (selectedIndex === -1) {
          renderProjects(projectsGiven, projectsContainer, 'h2');
        } else {
          const year = data[selectedIndex].label;
          const filtered = projectsGiven.filter(p => p.year === year);
          renderProjects(filtered, projectsContainer, 'h2');
        }
      });
  });

  // Step 5: Render legend
  let legend = d3.select('.legend');
  data.forEach((d, idx) => {
    legend.append('li')
      .attr('class', 'legend-item')
      .attr('style', `--color:${colors(idx)}`)
      .html(`<span class="swatch" style="background-color:${colors(idx)};"></span> ${d.label} <em>(${d.value})</em>` )
  });
}

// Call this function on page load
renderPieChart(projects);

let query = '';
let searchInput = document.querySelector('.searchBar');

searchInput.addEventListener('input', (event) => {
  query = event.target.value;
  // filter projects
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });

  // re-render legends and pie chart when event triggers
  renderProjects(filteredProjects, projectsContainer, 'h2');
  renderPieChart(filteredProjects);
});


