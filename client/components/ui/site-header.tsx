import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2 text-lg font-bold text-primary"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 2c-2.5 2.6-5.5 4.4-9 5 1.9 6.9 6.1 11.4 9 15 2.9-3.6 7.1-8.1 9-15-3.5-.6-6.5-2.4-9-5z" />
          </svg>
          <span>AgriSense</span>
        </a>
        <nav className="hidden gap-6 md:flex">
          <a
            href="#services"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Services
          </a>
          <a
            href="#crop-recommendation"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Crops
          </a>
          <a
            href="#disease-detection"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Diseases
          </a>
          <a
            href="#expert-finder"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Experts
          </a>
          <a
            href="#gov-schemes"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Schemes
          </a>
          <a
            href="#profile"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Profile
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="secondary" size="sm">
            <a href="#get-started">Get started</a>
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border bg-card text-foreground"
            aria-label="Toggle menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
      <div className={cn("md:hidden border-t", open ? "block" : "hidden")}>
        <div className="container grid gap-3 py-3">
          <a href="#services" className="text-sm">
            Services
          </a>
          <a href="#crop-recommendation" className="text-sm">
            Crops
          </a>
          <a href="#disease-detection" className="text-sm">
            Diseases
          </a>
          <a href="#expert-finder" className="text-sm">
            Experts
          </a>
          <a href="#gov-schemes" className="text-sm">
            Schemes
          </a>
          <a href="#profile" className="text-sm">
            Profile
          </a>
        </div>
      </div>
    </header>
  );
}
