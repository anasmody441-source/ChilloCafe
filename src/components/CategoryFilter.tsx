import { categoryLabels, productCategories } from '../data/categories';
import type { ProductCategory } from '../types/product';

interface CategoryFilterProps {
  value: ProductCategory | null;
  onChange: (value: ProductCategory | null) => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const options: { id: ProductCategory | null; label: string }[] = [
    { id: null, label: 'الكل' },
    ...productCategories.map((id) => ({ id, label: categoryLabels[id] })),
  ];

  return (
    <div className="category-filter" role="group" aria-label="تصنيفات المنتجات">
      {options.map((option) => (
        <button
          key={option.label}
          type="button"
          className="chip"
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
