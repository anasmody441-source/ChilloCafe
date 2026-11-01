import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { PublicLayout } from './components/PublicLayout';
import { ProductsProvider } from './context/ProductsContext';
import { ToastProvider } from './context/ToastContext';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CreditsPage } from './pages/CreditsPage';
import { HomePage } from './pages/HomePage';
import { ManagementDashboard } from './pages/ManagementDashboard';
import { ProductsPage } from './pages/ProductsPage';

function NotFoundPage() {
  return (
    <section className="empty-state empty-state--page container">
      <title>الصفحة غير موجودة | ChilloCafé</title>
      <h1>الصفحة غير موجودة</h1>
      <p>ربما نُقلت هذه الصفحة أو أن الرابط غير صحيح.</p>
      <Link to="/" className="button button--primary">
        العودة إلى الرئيسية
      </Link>
    </section>
  );
}

export function App() {
  return (
    <ToastProvider>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="credits" element={<CreditsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="admin" element={<ManagementDashboard />} />
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </ToastProvider>
  );
}
