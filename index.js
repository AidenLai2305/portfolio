import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

(async () => {
  const projects = await fetchJSON('./lib/projects.json');
  const latestProjects = projects.slice(0, 3); // Get first 3

  const projectsContainer = document.querySelector('.projects');
  renderProjects(latestProjects, projectsContainer, 'h2');
})();

const githubData = await fetchGitHubData('AidenLai2305');
const profileStats = document.querySelector('#profile-stats');

console.log(githubData)
// console.log(profileStats)

if (profileStats) {
    profileStats.innerHTML = `
          <dl class = "github-grid">
            <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
            <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
            <dt>Followers:</dt><dd>${githubData.followers}</dd>
            <dt>Following:</dt><dd>${githubData.following}</dd>
          </dl>
      `;
  }