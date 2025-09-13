import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../components/GlassCard";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export function ContactPage() {
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
      newErrors.name = "Imię jest wymagane";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email jest nieprawidłowy";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Temat jest wymagany";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Wiadomość jest wymagana";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Wiadomość musi mieć co najmniej 10 znaków";
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

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: "Email",
      content: "john@developer.com",
      href: "mailto:john@developer.com",
    },
    {
      icon: PhoneIcon,
      title: "Telefon",
      content: "+48 123 456 789",
      href: "tel:+48123456789",
    },
    {
      icon: MapPinIcon,
      title: "Lokalizacja",
      content: "Warszawa, Polska",
      href: "https://maps.google.com",
    },
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "https://linkedin.com", color: "bg-blue-600" },
    { name: "GitHub", url: "https://github.com", color: "bg-gray-800" },
    { name: "Twitter", url: "https://twitter.com", color: "bg-blue-400" },
    { name: "Instagram", url: "https://instagram.com", color: "bg-pink-500" },
  ];

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
                Wiadomość Wysłana!
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Dziękuję za kontakt. Odpowiem na Twoją wiadomość w ciągu 24
                godzin.
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
            Skontaktuj się ze mną
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Masz pytania o moje usługi, chcesz współpracować lub po prostu
            porozmawiać o technologii? Napisz do mnie - chętnie odpowiem!
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
                Wyślij Wiadomość
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Imię *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 ${
                        errors.name
                          ? "border-red-500"
                          : "border-white/30 dark:border-slate-700/30"
                      }`}
                      placeholder="Twoje imię"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 ${
                        errors.email
                          ? "border-red-500"
                          : "border-white/30 dark:border-slate-700/30"
                      }`}
                      placeholder="twoj@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Temat *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 ${
                      errors.subject
                        ? "border-red-500"
                        : "border-white/30 dark:border-slate-700/30"
                    }`}
                  >
                    <option value="">Wybierz temat</option>
                    <option value="cooperation">Współpraca</option>
                    <option value="consultation">Konsultacje</option>
                    <option value="course">Kursy i warsztaty</option>
                    <option value="other">Inne</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200 resize-none ${
                      errors.message
                        ? "border-red-500"
                        : "border-white/30 dark:border-slate-700/30"
                    }`}
                    placeholder="Opisz swoją wiadomość..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Wysyłanie...
                    </>
                  ) : (
                    <>
                      Wyślij Wiadomość
                      <PaperAirplaneIcon className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <GlassCard className="p-8">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
                Dane Kontaktowe
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start p-4 bg-white/10 dark:bg-slate-800/10 rounded-xl hover:bg-white/20 dark:hover:bg-slate-700/20 transition-colors duration-200 group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <item.icon className="w-6 h-6 text-indigo-500 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <div>
                      <h3 className="font-semibold text-slate-800 dark:text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300">
                        {item.content}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </GlassCard>

            {/* Social Media */}
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                Znajdź mnie w sieci
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} text-white p-4 rounded-xl text-center font-medium hover:opacity-80 transition-opacity duration-200`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </GlassCard>

            {/* Newsletter Signup */}
            <GlassCard className="p-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                Newsletter
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Otrzymuj najnowsze artykuły i informacje o kursach prosto na
                swój email.
              </p>

              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Twój email"
                  className="flex-1 px-4 py-3 bg-white/20 dark:bg-slate-800/20 backdrop-blur-lg border border-white/30 dark:border-slate-700/30 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-colors duration-200 font-medium">
                  Zapisz się
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
