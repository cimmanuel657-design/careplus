import { Button } from "@/components/ui/button";
import { Link, Outlet, useRouter } from "@tanstack/react-router";
import { CalendarHeart, Mail, Menu, X } from "lucide-react";
import { useState } from "react";

const CONTACT_EMAIL = "harithapaadiri@gmail.com";

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/book", label: "Book Appointment" },
    { to: "/my-appointments", label: "My Appointments" },
    { to: "/contact", label: "Contact" },
    { to: "/admin", label: "Admin" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Developer bar */}
      <div className="bg-gray-900 text-yellow-400 text-xs text-center py-1.5 font-medium tracking-wide">
        Developed by Haritha &nbsp;|&nbsp;{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="underline hover:text-yellow-300 transition-colors"
        >
          {CONTACT_EMAIL}
        </a>
      </div>

      <header className="med-header sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
              <CalendarHeart className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              CarePlus
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPath === link.to
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/book" className="hidden md:block">
              <Button
                size="sm"
                className="bg-white text-navy font-semibold px-5 hover:bg-white/90 rounded-full"
                data-ocid="nav.primary_button"
              >
                Book Now
              </Button>
            </Link>
            <button
              type="button"
              className="md:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-navy-dark px-4 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                  currentPath === link.to
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <CalendarHeart className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">CarePlus</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <Link
                to="/book"
                className="hover:text-foreground transition-colors"
              >
                Book Appointment
              </Link>
              <Link
                to="/my-appointments"
                className="hover:text-foreground transition-colors"
              >
                My Appointments
              </Link>
              <Link
                to="/contact"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </div>
            <div className="flex flex-col items-center md:items-end gap-1">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Mail className="w-4 h-4" />
                {CONTACT_EMAIL}
              </a>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()}.{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Built with ❤ using caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
