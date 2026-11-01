import { Icon } from './Icon';

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="product-search">
      <label htmlFor="product-search" className="visually-hidden">
        ابحث في القائمة
      </label>
      <span className="product-search__icon">
        <Icon name="search" />
      </span>
      <input
        id="product-search"
        type="search"
        value={value}
        placeholder="ابحث عن مشروب أو حلوى…"
        autoComplete="off"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
