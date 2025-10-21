const skillCategories = [
  {
    title: 'Video Production',
    skills: [
      { name: 'Adobe Premiere Pro', level: 95 },
      { name: 'DaVinci Resolve', level: 90 },
      { name: 'After Effects', level: 85 },
      { name: 'Final Cut Pro', level: 88 },
      { name: 'Color Grading', level: 90 },
    ],
  },
  {
    title: 'Scriptwriting',
    skills: [
      { name: 'Commercial Scripts', level: 92 },
      { name: 'Documentary Writing', level: 88 },
      { name: 'Short Film Scripts', level: 85 },
      { name: 'Social Media Content', level: 95 },
      { name: 'Corporate Narratives', level: 90 },
    ],
  },
  {
    title: 'Production & Tools',
    skills: [
      { name: 'Cinematography', level: 85 },
      { name: 'Sound Design', level: 80 },
      { name: 'Motion Graphics', level: 82 },
      { name: 'Storyboarding', level: 88 },
      { name: 'Project Management', level: 90 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-muted/30">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)]">
            Skills & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Two decades of mastering video production, scriptwriting, and creative content creation for premium brands
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="space-y-6 rounded-lg border border-border/40 bg-background p-6"
            >
              {/* Category Title */}
              <h3 className="text-xl font-bold text-primary">{category.title}</h3>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    {/* Skill Name */}
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
