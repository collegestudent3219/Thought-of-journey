import { Heart, Trash2 } from "lucide-react";

export default function ThoughtCard({ thought, onDelete, onFavorite }) {
  return (
    <article className="thought-card">
      <div className="card-top">
        <span className="category">{thought.category}</span>
        <span className="date">{thought.date}</span>
      </div>

      <h3>{thought.title}</h3>
      <p>{thought.text}</p>

      <div className="card-actions">
        <button
          className={`action-button ${thought.favorite ? "active" : ""}`}
          onClick={() => onFavorite(thought.id)}
          aria-label={thought.favorite ? "Remove favorite" : "Add favorite"}
          title={thought.favorite ? "Remove favorite" : "Favorite"}
        >
          <Heart size={18} fill={thought.favorite ? "currentColor" : "none"} />
          {thought.favorite ? "Favorite" : "Save"}
        </button>

        <button
          className="action-button danger"
          onClick={() => onDelete(thought.id)}
          aria-label={`Delete ${thought.title}`}
          title="Delete"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </article>
  );
}