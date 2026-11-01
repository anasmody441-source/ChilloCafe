import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { categoryLabels, isProductCategory, productCategories } from '../data/categories';
import type { NewProductInput } from '../types/product';
import { Icon } from './Icon';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const MAX_PRICE = 1000;

type FieldName = 'name' | 'description' | 'category' | 'price' | 'image';
type FormErrors = Partial<Record<FieldName, string>>;

/** Accepts Arabic-Indic digits and the Arabic decimal separator as well as Latin input. */
function parsePrice(raw: string) {
  const latin = raw
    .trim()
    .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
    .replace('٫', '.');
  return /^\d+(\.\d{1,2})?$/.test(latin) ? Number(latin) : NaN;
}

/** Reads the file into an in-memory data URL and confirms that it really decodes as an image. */
function readImageFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const url = String(reader.result);
      const probe = new Image();
      probe.onload = () => resolve(url);
      probe.onerror = () => reject(new Error('undecodable image'));
      probe.src = url;
    };
    reader.readAsDataURL(file);
  });
}

interface ProductFormProps {
  titleId: string;
  onSubmit: (input: NewProductInput) => void;
  onCancel: () => void;
}

export function ProductForm({ titleId, onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [processingImage, setProcessingImage] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const submitted = useRef(false);
  const uid = useId();

  const fieldProps = (field: FieldName) => ({
    id: `${uid}-${field}`,
    name: field,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${uid}-${field}-error` : undefined,
  });

  const clearError = (field: FieldName) => setErrors((current) => ({ ...current, [field]: undefined }));

  const fieldError = (field: FieldName) =>
    errors[field] && (
      <p id={`${uid}-${field}-error`} className="field__error">
        {errors[field]}
      </p>
    );

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setImage(null);
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setErrors((current) => ({ ...current, image: 'صيغة الملف غير مدعومة. اختر صورة JPG أو PNG أو WebP.' }));
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setErrors((current) => ({ ...current, image: 'حجم الصورة كبير. الحد الأقصى هو 3 ميغابايت.' }));
      return;
    }

    setProcessingImage(true);
    try {
      setImage(await readImageFile(file));
      clearError('image');
    } catch {
      setErrors((current) => ({ ...current, image: 'تعذّرت قراءة الملف. تأكد من أنه صورة سليمة.' }));
    } finally {
      setProcessingImage(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (submitted.current || processingImage) return;

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const parsedPrice = parsePrice(price);

    const nextErrors: FormErrors = {};
    if (!trimmedName) nextErrors.name = 'أدخل اسم المنتج.';
    if (!trimmedDescription) nextErrors.description = 'أدخل وصفاً للمنتج.';
    if (!isProductCategory(category)) nextErrors.category = 'اختر تصنيف المنتج.';
    if (!price.trim()) nextErrors.price = 'أدخل سعر المنتج.';
    else if (!(parsedPrice > 0)) nextErrors.price = 'أدخل سعراً صحيحاً أكبر من صفر، مثل 4.50.';
    else if (parsedPrice > MAX_PRICE) nextErrors.price = `يجب ألا يتجاوز السعر ${MAX_PRICE} دولار.`;
    if (!image) nextErrors.image = errors.image ?? 'اختر صورة للمنتج.';

    setErrors(nextErrors);
    const firstInvalid = (['name', 'description', 'category', 'price', 'image'] as const).find((f) => nextErrors[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    submitted.current = true;
    onSubmit({
      name: trimmedName,
      description: trimmedDescription,
      category: category as NewProductInput['category'],
      price: parsedPrice,
      image: image as string,
    });
  };

  return (
    <form ref={formRef} className="product-form" onSubmit={handleSubmit} noValidate>
      <div className="product-form__head">
        <div>
          <h2 id={titleId}>إضافة منتج جديد</h2>
          <p>يبقى المنتج في ذاكرة المتصفح فقط، ويختفي عند تحديث الصفحة.</p>
        </div>
        <button type="button" className="icon-button" aria-label="إغلاق النموذج" onClick={onCancel}>
          <Icon name="close" />
        </button>
      </div>

      <div className="product-form__grid">
        <div className="product-form__fields">
          <div className="field">
            <label htmlFor={`${uid}-name`}>اسم المنتج</label>
            <input
              {...fieldProps('name')}
              type="text"
              maxLength={60}
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                clearError('name');
              }}
            />
            {fieldError('name')}
          </div>

          <div className="field">
            <label htmlFor={`${uid}-description`}>وصف المنتج</label>
            <textarea
              {...fieldProps('description')}
              rows={3}
              maxLength={200}
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
                clearError('description');
              }}
            />
            {fieldError('description')}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor={`${uid}-category`}>تصنيف المنتج</label>
              <select
                {...fieldProps('category')}
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  clearError('category');
                }}
              >
                <option value="">اختر التصنيف</option>
                {productCategories.map((id) => (
                  <option key={id} value={id}>
                    {categoryLabels[id]}
                  </option>
                ))}
              </select>
              {fieldError('category')}
            </div>

            <div className="field">
              <label htmlFor={`${uid}-price`}>السعر بالدولار</label>
              <input
                {...fieldProps('price')}
                type="text"
                inputMode="decimal"
                dir="ltr"
                placeholder="4.50"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                  clearError('price');
                }}
              />
              {fieldError('price')}
            </div>
          </div>
        </div>

        <div className="field product-form__image">
          <label htmlFor={`${uid}-image`}>صورة المنتج</label>
          <div className="image-picker">
            <input
              {...fieldProps('image')}
              className="image-picker__input"
              type="file"
              accept={ACCEPTED_IMAGE_TYPES.join(',')}
              onChange={handleImageChange}
            />
            {image ? (
              <img className="image-picker__preview" src={image} alt="معاينة صورة المنتج" />
            ) : (
              <div className="image-picker__empty">
                <Icon name="image" size={32} />
                <span>{processingImage ? 'جارٍ معالجة الصورة…' : 'اضغط لاختيار صورة'}</span>
                <small>JPG أو PNG أو WebP — حتى 3 ميغابايت</small>
              </div>
            )}
          </div>
          {image && <p className="field__hint">لتغيير الصورة اضغط عليها واختر ملفاً آخر.</p>}
          {fieldError('image')}
        </div>
      </div>

      <div className="product-form__actions">
        <button type="submit" className="button button--primary" disabled={processingImage}>
          {processingImage ? 'جارٍ المعالجة…' : 'حفظ المنتج'}
        </button>
        <button type="button" className="button button--ghost" onClick={onCancel}>
          إلغاء
        </button>
      </div>
    </form>
  );
}
