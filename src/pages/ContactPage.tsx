import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../components/GlassCard";
import {
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
// Add social media icons
import {
  EnvelopeIcon,
  CodeBracketIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import { useScrollToTop } from "../hooks/useScrollToTop";
import { useI18n } from "../contexts/I18nContext";
import { SOCIAL_LINKS } from "../config";

export function ContactPage() {
  useScrollToTop();
  const { t } = useI18n();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("contact.validation.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("contact.validation.emailRequired");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("contact.validation.emailInvalid");
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t("contact.validation.subjectRequired");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("contact.validation.messageRequired");
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t("contact.validation.messageMinLength");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  // Icon mapping for social media
  const socialIcons = {
    LinkedIn: EnvelopeIcon, // We'll use a different icon for LinkedIn
    GitHub: CodeBracketIcon,
    Twitter: ChatBubbleLeftRightIcon,
    Instagram: PhotoIcon,
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      url: SOCIAL_LINKS.linkedin,
      color: "bg-blue-600",
    },
    {
      name: "GitHub",
      url: SOCIAL_LINKS.github,
      color: "bg-gray-800",
    },
    {
      name: "Twitter",
      url: SOCIAL_LINKS.twitter,
      color: "bg-blue-400",
    },
    {
      name: "Instagram",
      url: SOCIAL_LINKS.instagram,
      color: "bg-pink-500",
    },
  ];

  const subjectOptions = (t("contact.form.fields.subject.options") as unknown) as any[];

  if (isSubmitted) {
    return (
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-12 text-center">
              <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                {t("contact.form.success.title")}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                {t("contact.form.success.message")}
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-6">
            {t("contact.title")}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
                {t("contact.form.title")}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    {t("contact.form.fields.name.label")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.name
                        ? "border-red-500"
                        : "border-white/30 dark:border-slate-700/30"
                    }`}
                    placeholder={t("contact.form.fields.name.placeholder")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    {t("contact.form.fields.email.label")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.email
                        ? "border-red-500"
                        : "border-white/30 dark:border-slate-700/30"
                    }`}
                    placeholder={t("contact.form.fields.email.placeholder")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    {t("contact.form.fields.subject.label")}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.subject
                        ? "border-red-500"
                        : "border-white/30 dark:border-slate-700/30"
                    }`}
                  >
                    {Array.isArray(subjectOptions) && subjectOptions.map(
                      (option: any) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      )
                    )}
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    {t("contact.form.fields.message.label")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none ${
                      errors.message
                        ? "border-red-500"
                        : "border-white/30 dark:border-slate-700/30"
                    }`}
                    placeholder={t("contact.form.fields.message.placeholder")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-6 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      {t("contact.form.submitButton.submittingText")}
                    </>
                  ) : (
                    <>
                      {t("contact.form.submitButton.text")}
                      <PaperAirplaneIcon className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Right Column - Social Media and Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Social Media */}
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                {t("contact.social.title")}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const IconComponent =
                    socialIcons[social.name as keyof typeof socialIcons];
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 dark:bg-slate-800/20 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 p-6 rounded-xl text-center font-medium hover:bg-white/20 dark:hover:bg-slate-800/30 transition-all duration-200 shadow-lg hover:shadow-xl flex flex-col items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      title={social.name}
                    >
                      <IconComponent className="w-8 h-8 text-slate-700 dark:text-slate-300" />
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {social.name}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </GlassCard>

            {/* Newsletter Signup */}
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                {t("contact.newsletter.title")}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {t("contact.newsletter.description")}
              </p>

              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder={t("contact.newsletter.placeholder")}
                  className="flex-1 px-4 py-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border border-white/30 dark:border-slate-700/30 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-colors duration-200 font-medium">
                  {t("contact.newsletter.buttonText")}
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
