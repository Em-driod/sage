import { useState, useEffect } from "react";
import { Link as LINK } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = ["AI Labs", "Research", "API", "Contact"];

  return (
    <>
      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 mt-16  bg-black/80 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full mb-6 z-50 transition-colors duration-500 ${
          scrolled ? "bg-black text-white" : "bg-white text-black"
        } shadow-xl`}
        style={{
          borderBottom: scrolled ? "2px solid red" : "2px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between select-none">
          {/* LOGO */}
          <h1
            className="font-black text-3xl cursor-default"
            style={{
              fontFamily: "'Roboto Mono', monospace",
              color: scrolled ? "red" : "black",
              userSelect: "none",
              filter: scrolled ? "drop-shadow(0 0 6px red)" : "none",
            }}
          >
            <LINK to={"/"} className="hover:underline">
            Luz AI
            </LINK>
          </h1>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex space-x-10 font-mono font-semibold text-lg">
            {menuItems.map((item) => (
              <li key={item} className="relative group cursor-pointer">
                <a
                  href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                  className="relative uppercase tracking-wider"
                  style={{
                    color: scrolled ? "red" : "black",
                    fontWeight: 700,
                  }}
                >
                  {item}
                </a>
                <span
                  className="absolute left-0 bottom-0 h-[2px] w-0 bg-red-500 transition-all group-hover:w-full"
                  style={{
                    filter: "drop-shadow(0 0 5px red)",
                    mixBlendMode: "screen",
                  }}
                />
              </li>
            ))}
          </ul>

          {/* HAMBURGER/CANCEL ICON */}
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center"
          >
            {menuOpen ? (
              // Cancel Icon (X)
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <>
                <span className="block w-7 h-0.5 bg-red-500 mb-1 rounded" />
                <span className="block w-7 h-0.5 bg-red-500 mb-1 rounded" />
                <span className="block w-7 h-0.5 bg-red-500 rounded" />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE SLIDE-IN MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-black text-red-500 transition-transform duration-500 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ borderLeft: "2px solid red" }}
      >
        <nav className="flex flex-col mt-28 px-8 space-y-10 font-mono text-lg font-semibold tracking-wider">
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "")}`}
              onClick={() => setMenuOpen(false)}
              className="hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
