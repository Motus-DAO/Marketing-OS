import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { EmptyState } from '../components/EmptyState';
import { ProjectCard } from '../components/dashboard';

export function ProjectHomePage() {
  const projects = useQuery(api.dashboard.listProjects);

  if (projects === undefined) {
    return <div className="loading-state">Loading projects…</div>;
  }

  return (
    <section className="page-stack">
      <div>
        <p className="eyebrow">Project Home</p>
        <h1>Select a project</h1>
        <p className="muted">Minimal dashboard for internal asset review.</p>
      </div>
      {projects.length ? (
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState title="No projects yet" body="Create or seed projects in Convex to start reviewing assets." />
      )}
    </section>
  );
}
