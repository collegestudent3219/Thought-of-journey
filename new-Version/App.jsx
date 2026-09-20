import { useMemo, useState } from "react";
import { ArrowDown, Compass, Search, Sparkles } from "lucide-react";
import Header from "./components/Header";
import ThoughtCard from "./components/ThoughtCard";
import ThoughtForm from "./components/ThoughtForm";
import EmptyState from "./components/EmptyState";
import { starterThoughts } from "./data/thoughts";
import { useLocalStorage } from "./hooks/useLocalStorage";

const categories = ["All", "Growth", "Life", "Hope", "Journey", "Dreams"];

export default function App() {
  const [thoughts, setThoughts] = useLocalStorage("toj-thoughts", starterThoughts);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredThoughts = useMemo(() => {
    const normalized = query.toLowerCase().trim();

    return thoughts.filter((thought) => {
      const matchesCategory =
        category === "All" || thought.category === category;

      const matchesQuery =
        !normalized ||
        `${thought.title} ${thought.text} ${thought.category}`
          .toLowerCase()
          .includes(normalized);

      return matchesCategory && matchesQuery;
    });
  }, [thoughts, query, category]);

  function addThought(newThought) {
    const item = {
      ...newThought,
      id: crypto.randomUUID(),
      date: "Just now",
      favorite: false
    };

    setThoughts((current) => [item, ...current]);
  }

  function deleteThought(id) {
    setThoughts((current) => current.filter((thought) => thought.id !== id));
  }

  function toggleFavorite(id) {
    setThoughts((current) =>
      current.map((thought) =>
        thought.id === id
          ? { ...thought, favorite: !thought.favorite }
          : thought
      )
    );
  }

  const favoriteCount = thoughts.filter((thought) => thought.favorite).length;

  return (
    <>
      <Header />

      <main id="home">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><Sparkles size={15} /> Your personal journey</span>
              <h1>Every journey begins with a <span>thought.</span></h1>
              <p>
                Capture the little ideas, lessons and memories that make your
                journey meaningful. Keep them close and watch your story grow.
              </p>

              <div className="hero-buttons">
                <a className="primary-button" href="#journey">
                  Explore journey <ArrowDown size={18} />
                </a>
                <a className="secondary-button" href="#write">
                  Write a thought
                </a>
              </div>

              <div className="stats" aria-label="Journey statistics">
                <div><strong>{thoughts.length}</strong><span>Thoughts</span></div>
                <div><strong>{favoriteCount}</strong><span>Favorites</span></div>
                <div><strong>∞</strong><span>Possibilities</span></div>
              </div>
            </div>

            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit-one"></div>
              <div className="orbit orbit-two"></div>
              <div className="journey-card">
                <Compass size={30} />
                <span>Keep moving</span>
                <strong>Your story matters.</strong>
              </div>
            </div>
          </div>
        </section>

        <section id="journey" className="journey-section section">
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Your collection</span>
                <h2>Thoughts from the journey</h2>
                <p>Search, filter, save and manage your personal moments.</p>
              </div>
            </div>

            <div className="toolbar">
              <label className="search-box">
                <Search size={19} aria-hidden="true" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search thoughts..."
                  aria-label="Search thoughts"
                />
              </label>

              <div className="filters" role="group" aria-label="Filter by category">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={category === item ? "filter active" : "filter"}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {filteredThoughts.length ? (
              <div className="thought-grid">
                {filteredThoughts.map((thought) => (
                  <ThoughtCard
                    key={thought.id}
                    thought={thought}
                    onDelete={deleteThought}
                    onFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        </section>

        <section id="write" className="write-section section">
          <div className="container write-grid">
            <ThoughtForm onAdd={addThought} />

            <div className="write-copy">
              <span className="eyebrow">Make it yours</span>
              <h2>Turn a passing thought into a lasting memory.</h2>
              <p>
                Your entries are stored in your browser, so your thoughts stay
                available when you return to this device.
              </p>
              <ul>
                <li>Simple and distraction-free writing</li>
                <li>Instant search and category filters</li>
                <li>Favorites for moments worth revisiting</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="about" className="about-section section">
          <div className="container about-box">
            <span className="eyebrow">About the project</span>
            <h2>Thought of Journey</h2>
            <p>
              A responsive, accessible and performance-conscious project built
              with reusable React components and a clean architecture.
            </p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© 2026 Thought of Journey</span>
          <span>Made for meaningful moments.</span>
        </div>
      </footer>
    </>
  );
}