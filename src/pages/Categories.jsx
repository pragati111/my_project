import { categories } from "../data/categories";
import CategoryList from "../components/CategoryList";

export default function Categories() {
  return (
    <div className="p-4 md:hidden">
      <h1 className="text-xl font-bold mb-4">Categories</h1>

      <div>
        {categories.map((cat, i) => (
          <CategoryList key={i} category={cat} />
        ))}
      </div>
    </div>
  );
}