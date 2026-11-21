/* Copied verbatim from InkPlusBot's src/InkPlusBot.Bot/Strings/BotStrings.cs.
   Only the keys the demo replays. */
export type BotLang = 'en' | 'fr' | 'fa';

export const BOT: Record<string, Partial<Record<BotLang, string>>> = {
  "welcome.intro": {
    "en": "🖨️ *Ink Plus — Ottawa*\n\n👋 Welcome! | Bienvenue ! | خوش آمدید!\n\nWe're an electronics repair & custom printing shop with 3 locations in Ottawa:\n📍 *Billings Bridge* · 📍 *Carlingwood* · 📍 *Lincoln Fields*\n\n🔧 Repairs · 🖨️ Ink & Toner · 🎨 Custom Orders · 📸 ID Photos"
  },
  "language.prompt": {
    "en": "Please choose your language — Choisissez votre langue — لطفاً زبان خود را انتخاب کنید:",
    "fr": "Veuillez choisir votre langue :",
    "fa": "لطفاً زبان خود را انتخاب کنید:"
  },
  "menu.prompt": {
    "en": "What can we help you with?",
    "fr": "Comment pouvons-nous vous aider ?",
    "fa": "چطور می‌توانیم کمک کنیم؟"
  },
  "menu.ink": {
    "en": "🖨️ Ink & toner",
    "fr": "🖨️ Encre & toner",
    "fa": "🖨️ جوهر و تونر"
  },
  "menu.human": {
    "en": "👥 Talk to staff",
    "fr": "👥 Parler au personnel",
    "fa": "👥 صحبت با کارمند"
  },
  "ink.ask.intent": {
    "en": "🖨️ What would you like to do?",
    "fr": "🖨️ Que souhaitez-vous faire ?",
    "fa": "🖨️ چه کاری می‌خواهید انجام دهید؟"
  },
  "ink.btn.buy": {
    "en": "🛒 Buy a cartridge",
    "fr": "🛒 Acheter une cartouche",
    "fa": "🛒 خرید کارتریج"
  },
  "ink.ask.search": {
    "en": "How would you like to search?",
    "fr": "Comment souhaitez-vous rechercher ?",
    "fa": "چطور می‌خواهید جستجو کنید؟"
  },
  "ink.btn.by.number": {
    "en": "🔢 I know the cartridge number",
    "fr": "🔢 Je connais le numéro de cartouche",
    "fa": "🔢 شماره کارتریج را می‌دانم"
  },
  "ink.ask.cartridge": {
    "en": "Enter the cartridge number (e.g. HP 65XL, PG-245, TN-730):",
    "fr": "Entrez le numéro de cartouche (ex. HP 65XL, PG-245, TN-730) :",
    "fa": "شماره کارتریج را وارد کنید (مثال: HP 65XL یا PG-245 یا TN-730):"
  },
  "ink.result.can.order": {
    "en": "📦 This toner is not in stock but can be ordered and ready in *1-3 business days*. Would you like us to call you back?",
    "fr": "📦 Ce toner n'est pas en stock mais peut être commandé et prêt en *1 à 3 jours ouvrables*. Souhaitez-vous que nous vous rappelions ?",
    "fa": "📦 این تونر موجود نیست اما می‌توان آن را سفارش داد و در *۱ تا ۳ روز کاری* آماده خواهد شد. آیا می‌خواهید با شما تماس بگیریم؟"
  },
  "ink.btn.callback": {
    "en": "📞 Yes, call me back",
    "fr": "📞 Oui, appelez-moi",
    "fa": "📞 بله، تماس بگیرید"
  },
  "ink.btn.no.callback": {
    "en": "❌ No thanks",
    "fr": "❌ Non merci",
    "fa": "❌ نه ممنون"
  },
  "ink.callback.ask.phone": {
    "en": "📞 Please enter your phone number and we'll call you back within 1 business day:",
    "fr": "📞 Veuillez entrer votre numéro de téléphone et nous vous rappellerons dans un délai d'un jour ouvrable :",
    "fa": "📞 لطفاً شماره تلفن خود را وارد کنید تا در طول ۱ روز کاری با شما تماس بگیریم:"
  },
  "human.handoff": {
    "en": "👤 Connecting you with our team. Someone will be with you shortly!",
    "fr": "👤 Nous vous mettons en contact avec notre équipe. Quelqu'un vous répondra bientôt !",
    "fa": "👤 در حال اتصال به تیم ما هستیم. به زودی با شما در تماس خواهیم بود!"
  }
};

export const say = (key: string, lang: BotLang): string => BOT[key]?.[lang] ?? BOT[key]?.en ?? '';
