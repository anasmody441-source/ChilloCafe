import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icon';

const fields = [
  { name: 'name', label: 'الاسم', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'البريد الإلكتروني', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'الموضوع', type: 'text', autoComplete: 'off' },
] as const;

type FieldName = (typeof fields)[number]['name'] | 'message';
type FormValues = Record<FieldName, string>;

const emptyValues: FormValues = { name: '', email: '', subject: '', message: '' };

const requiredMessages: FormValues = {
  name: 'أدخل اسمك.',
  email: 'أدخل بريدك الإلكتروني.',
  subject: 'أدخل موضوع الرسالة.',
  message: 'اكتب نص رسالتك.',
};

function validate(values: FormValues) {
  const errors: Partial<FormValues> = {};
  for (const key of Object.keys(values) as FieldName[]) {
    if (!values[key].trim()) errors[key] = requiredMessages[key];
  }
  if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'أدخل بريداً إلكترونياً صحيحاً.';
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [showNotice, setShowNotice] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const change = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setShowNotice(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(emptyValues) as FieldName[]).find((key) => nextErrors[key]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      setShowNotice(false);
      return;
    }
    setValues(emptyValues);
    setShowNotice(true);
  };

  const describe = (field: FieldName) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
  });

  const error = (field: FieldName) =>
    errors[field] && (
      <p id={`contact-${field}-error`} className="field__error">
        {errors[field]}
      </p>
    );

  return (
    <form ref={formRef} className="contact-form panel" onSubmit={handleSubmit} noValidate>
      <h2>أرسل لنا رسالة</h2>
      <div className="contact-form__grid">
        {fields.map((field) => (
          <div key={field.name} className={`field ${field.name === 'subject' ? 'field--wide' : ''}`}>
            <label htmlFor={`contact-${field.name}`}>{field.label}</label>
            <input
              id={`contact-${field.name}`}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              dir={field.type === 'email' ? 'ltr' : undefined}
              value={values[field.name]}
              onChange={(event) => change(field.name, event.target.value)}
              {...describe(field.name)}
            />
            {error(field.name)}
          </div>
        ))}
        <div className="field field--wide">
          <label htmlFor="contact-message">الرسالة</label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => change('message', event.target.value)}
            {...describe('message')}
          />
          {error('message')}
        </div>
      </div>

      <div role="status">
        {showNotice && (
          <div className="notice">
            <Icon name="info" />
            <p>هذا نموذج تجريبي: تم التحقق من البيانات بنجاح، لكن لم يتم إرسال رسالتك إلى أي جهة.</p>
          </div>
        )}
      </div>

      <div className="contact-form__actions">
        <button type="submit" className="button button--primary">
          إرسال الرسالة
        </button>
        <Link to="/products" className="button button--ghost">
          العودة إلى المنتجات
        </Link>
      </div>
    </form>
  );
}
