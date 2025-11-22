import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { ContactPage } from "./pages/ContactPage";
import { SpeakingPage } from "./pages/SpeakingPage";
import { ComingSoonPage } from "./pages/ComingSoonPage";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useTheme } from "./hooks/useTheme";
import { I18nProvider } from "./contexts/I18nContext";
import { useI18n } from "./contexts/I18nContext";

// Inline Coming Soon components that use useI18n internally
function PortfolioComingSoon() {
  const { t } = useI18n();
  return (
    <ComingSoonPage
      title={t("pages.portfolio.title")}
      description={t("pages.portfolio.description")}
      expectedDate={t("pages.portfolio.expectedDate")}
    />
  );
}

function CoursesComingSoon() {
  const { t } = useI18n();
  return (
    <ComingSoonPage
      title={t("pages.courses.title")}
      description={t("pages.courses.description")}
      expectedDate={t("pages.courses.expectedDate")}
    />
  );
}

function CourseDetailComingSoon() {
  const { t } = useI18n();
  return (
    <ComingSoonPage
      title={t("pages.courses.title")}
      description={t("pages.courses.description")}
    />
  );
}

function App() {
  const { theme } = useTheme();

  return (
    <Router>
      <I18nProvider>
        <div
          className={`min-h-screen transition-colors duration-300 ${
            theme === "dark"
              ? "dark bg-slate-900"
              : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
          }`}
        >
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />

              {/* Blocked routes with Coming Soon pages */}
              <Route path="/portfolio" element={<PortfolioComingSoon />} />
              <Route path="/courses" element={<CoursesComingSoon />} />
              <Route path="/courses/:id" element={<CourseDetailComingSoon />} />

              {/* Active routes */}
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/speaking" element={<SpeakingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <BackToTop />
        </div>
      </I18nProvider>
    </Router>
  );
}

export default App;
