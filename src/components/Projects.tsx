import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, shopping cart, and payment integration.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application built with Next.js and Firebase. Real-time updates and team collaboration features.',
    tags: ['Next.js', 'Firebase', 'TypeScript', 'Tailwind'],
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard that displays current weather and forecasts using OpenWeather API. Built with React and Chart.js.',
    tags: ['React', 'API', 'Chart.js', 'CSS'],
    link: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features dark mode and responsive design.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'React'],
    link: '#',
    github: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-lg border border-border/40 bg-muted/30 p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="space-y-4">
                {/* Project Title */}
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Project Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-2">
                  <Link
                    href={project.link}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View Project →
                  </Link>
                  <Link
                    href={project.github}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
