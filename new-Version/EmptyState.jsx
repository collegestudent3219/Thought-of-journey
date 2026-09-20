import { SearchX } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="empty-state">
      <SearchX size={38} aria-hidden="true" />
      <h3>No thoughts found</h3>
      <p>Try another search or add a new thought to your journey.</p>
    </div>
  );
}