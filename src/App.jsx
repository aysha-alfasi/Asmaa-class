import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const translations = {
  ar: {
    dir: "rtl",
    title: "تعلم العربية مع أسماء",
    subtitle: "احجز وقتك المناسب وابدأ التعلم مباشرة",
    bookNow: "احجز الآن",
    modalTitle: "حجز الدرس",
    duration: "مدة الحصة: ساعة واحدة",
    price: "السعر",
    openCalendar: "فتح التقويم واختيار الموعد",
    close: "إغلاق",
  },
  en: {
    dir: "ltr",
    title: "Learn Arabic with Asma",
    subtitle: "Book your preferred time and start learning instantly",
    bookNow: "Book Now",
    modalTitle: "Lesson Booking",
    duration: "Session duration: One hour",
    price: "Price",
    openCalendar: "Open calendar & choose time",
    close: "Close",
  },
  tr: {
    dir: "ltr",
    title: "Esma ile Arapça Öğren",
    subtitle: "Uygun zamanını seç ve hemen öğrenmeye başla",
    bookNow: "Hemen Rezervasyon Yap",
    modalTitle: "Ders Rezervasyonu",
    duration: "Ders süresi: 1 saat",
    price: "Fiyat",
    openCalendar: "Takvimi aç ve saat seç",
    close: "Kapat",
  },
};

export default function TutoringLanding() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("ar");
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1280);
  const FIXED_PRICE = 15;

  const t = translations[lang];

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1280);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      dir={t.dir}
      className="relative min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: isLargeScreen
          ? "url('/hero-large.png')"
          : "url('/hero.png')",
      }}
    >
      {/* language switcher */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex gap-2 bg-black/20 backdrop-blur-sm rounded-full p-1">
          {["ar", "tr", "en"].map((l) => (
            <motion.button
              key={l}
              onClick={() => setLang(l)}
              className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                lang === l ? "text-gray-900" : "text-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {lang === l && (
                <motion.span
                  layoutId="lang-pill"
                  className="absolute inset-0 bg-white/80 rounded-full"
                  transition={{ type: "spring", stiffness: 250, damping: 35 }}
                />
              )}
              <span className="relative z-10 uppercase">{l}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* hero content */}
      <div className="relative z-10 flex flex-col items-center min-h-screen text-center px-4 pt-24 pb-24">
        <div className="flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className=" font-sans font-bold tracking-tight text-4xl md:text-5xl text-zinc-800 mb-4 mt-8"
          >
            {t.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className=" leading-relaxed text-lg text-gray-800 mb-8 mt-6"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="mt-auto">
          <motion.button
            onClick={() => setOpen(true)}
            style={{ x: -10 }}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-full px-16 py-6 text-xl shadow-2xl bg-zinc-800 text-white min-w-[270px] transition-colors duration-300"
          >
            {t.bookNow}
          </motion.button>
        </div>
      </div>

      {/* booking modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 30, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 30, scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="
          w-full max-w-md mx-4
          rounded-3xl
         bg-amber-50/90
          p-8
          text-center
          shadow-2xl
        "
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t.modalTitle}
              </h2>

              {/* divider */}
              <div className="mx-auto mb-8 h-px w-20 bg-zinc-600" />

              <div className="space-y-2 text-gray-700 font-medium">
                <p>{t.duration}</p>
                <p className="text-lg font-semibold">
                  {t.price}:{" "}
                  <span className="text-gray-900">{FIXED_PRICE}$</span>
                </p>

                <p className="text-xs text-zinc-500 mt-3">
                  {lang === "ar" && "حجز آمن • بدون التزامات"}
                  {lang === "en" && "Secure booking • No commitment"}
                  {lang === "tr" && "Güvenli rezervasyon • Taahhüt yok"}
                </p>
              </div>

              {/* main action */}
              <motion.button
                onClick={() =>
                  window.open(
                    "https://calendar.app.google/3eKBCqfq3UKN8syL9",
                    "_blank"
                  )
                }
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="
            mt-8 w-full
            rounded-2xl
            py-4
            text-lg
            font-semibold
            bg-zinc-900
            text-white
            shadow-lg
            transition-colors
            duration-300
            hover:bg-zinc-850
          "
              >
                {t.openCalendar}
              </motion.button>

              <button
                onClick={() => setOpen(false)}
                className="
            mt-4
            w-full
            text-sm
            text-gray-500
            transition
            hover:text-gray-800
          "
              >
                {t.close}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
