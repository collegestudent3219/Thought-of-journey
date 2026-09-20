import { useState } from "react";
import { Plus } from "lucide-react";

const categories = ["Growth", "Life", "Hope", "Journey", "Dreams"];

export default function ThoughtForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    text: "",
    category: "Growth"
  });

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.text.trim()) return;

    onAdd({
      title: form.title.trim(),
      text: form.text.trim(),
      category: form.category
    });

    setForm({ title: "", text: "", category: "Growth" });
  }

  return (
    <form className="thought-form" onSubmit={submit}>
      <div className="form-heading">
        <div>
          <span className="eyebrow">Add a new memory</span>
          <h2>Write your thought</h2>
        </div>
        <Plus size={22} aria-hidden="true" />
      </div>

      <label>
        Title
        <input
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Give your thought a title"
          maxLength={80}
          required
        />
      </label>

      <label>
        Thought
        <textarea
          value={form.text}
          onChange={(e) => update("text", e.target.value)}
          placeholder="Write something meaningful..."
          rows="4"
          maxLength={400}
          required
        />
      </label>

      <label>
        Category
        <select
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </label>

      <button className="primary-button" type="submit">
        <Plus size={18} />
        Add to my journey
      </button>
    </form>
  );
}