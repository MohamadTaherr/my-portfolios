export default function Hero() {
  return (
    <section id="about" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div className="flex flex-col items-center text-center space-y-8">
        {/* Profile Image */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
          <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
            <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              YN
            </span>
          </div>
        </div>

        {/* Name & Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Hi, I&apos;m <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Your Name</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Full Stack Developer & Designer
          </p>
        </div>

        {/* Bio */}
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
          I&apos;m a passionate developer who loves building modern web applications.
          With expertise in React, Next.js, and TypeScript, I create beautiful and
          performant user experiences. Welcome to my portfolio!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 font-medium transition-transform hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="rounded-full border-2 border-primary text-primary px-8 py-3 font-medium transition-all hover:bg-primary hover:text-white"
          >
            Get In Touch
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="pt-12 animate-bounce">
          <svg
            className="w-6 h-6 text-muted-foreground"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
