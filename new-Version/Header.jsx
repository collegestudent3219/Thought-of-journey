import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label="Thought of Journey home">
          <span className="brand-mark"><BookOpen size={20} /></span>
          <span>Thought of Journey</span>
        </a>

        <button
          className="icon-button mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav ${open ? "nav-open" : ""}`} aria-label="Main navigation">
          <a href="#home" onClick={() => setOpen(false)}>Home</a>
          <a href="#journey" onClick={() => setOpen(false)}>Journey</a>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
        </nav>
      </div>
    </header>
  );
}