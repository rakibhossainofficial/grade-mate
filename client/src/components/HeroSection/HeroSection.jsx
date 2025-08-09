import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section
      className="relative h-[80vh] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1588072432836-e10032774350')",
      }}
    >
      {/* Black shade overlay, adjusts for dark mode */}
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 z-0" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Learn Together. Grow Together.
        </h1>
        <p className="text-lg max-w-xl text-white/80 dark:text-white/90">
          Create assignments. Share ideas. Grade your friends. This is
          collaborative learning at its best.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/assignments">
            <Button>Explore Assignments</Button>
          </Link>
          <Link to="/create-assignment">
            <Button variant={"outline"}>Create Assignment</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
