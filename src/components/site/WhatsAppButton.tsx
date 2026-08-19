import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT } from "@/lib/site-data";

export function WhatsAppButton() {
  return (
    <motion.a
      href={CONTACT.india.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with us on WhatsApp at ${CONTACT.india.whatsapp}`}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-shadow hover:shadow-xl hover:shadow-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="h-7 w-7 fill-current" />
      <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-md ring-1 ring-border md:block">
        Chat on WhatsApp
      </span>
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 animate-ping" />
    </motion.a>
  );
}
