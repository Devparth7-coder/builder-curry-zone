export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-muted/20">
      <div className="container grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-primary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 2c-2.5 2.6-5.5 4.4-9 5 1.9 6.9 6.1 11.4 9 15 2.9-3.6 7.1-8.1 9-15-3.5-.6-6.5-2.4-9-5z" />
            </svg>
            AgriSense
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Empowering farmers with modern insights and tools to grow smarter.
          </p>
        </div>
        <nav>
          <h4 className="font-semibold">Quick links</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#crop-recommendation" className="hover:text-foreground">
                Crop recommendation
              </a>
            </li>
            <li>
              <a href="#disease-detection" className="hover:text-foreground">
                Disease detection
              </a>
            </li>
            <li>
              <a href="#expert-finder" className="hover:text-foreground">
                Expert finder
              </a>
            </li>
          </ul>
        </nav>
        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="mt-3 text-sm text-muted-foreground">
            support@agrisense.app
          </p>
          <p className="text-sm text-muted-foreground">+91 1800-123-4567</p>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AgriSense. All rights reserved.
      </div>
    </footer>
  );
}
