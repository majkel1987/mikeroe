import { useEffect, useRef } from 'react';
import { X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const MODAL_TRANSLATIONS = {
  pl: {
    specTitle: 'Specyfikacja planu:',
    close: 'Zamknij',
    included: 'Co obejmuje',
    excluded: 'Co nie obejmuje',
  },
  en: {
    specTitle: 'Plan specification:',
    close: 'Close',
    included: 'What\'s included',
    excluded: 'What\'s not included',
  },
} as const;

export interface PricingTierDetails {
  id: string;
  tier: string;
  specsIncluded?: string[];
  specsExcluded?: string[];
}

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PricingTierDetails | null;
}

export function PricingModal({ isOpen, onClose, plan }: PricingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const mt = MODAL_TRANSLATIONS[lang];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!plan) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
            className="w-full max-w-[600px] max-h-[90vh] flex flex-col bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="font-display text-2xl font-bold text-white">
                {mt.specTitle} {plan.tier}
              </h3>
              <button
                onClick={onClose}
                className="p-3 -mr-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5"
                aria-label={mt.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
              {/* Included features */}
              {plan.specsIncluded && plan.specsIncluded.length > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="font-sans font-bold text-base text-white">
                    {mt.included} ({plan.specsIncluded.length}):
                  </div>
                  <ul className="flex flex-col gap-3">
                    {plan.specsIncluded.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5 text-green-500">
                          <Check className="w-5 h-5" />
                        </div>
                        <span className="font-sans text-sm text-[#b4bcd0] leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Excluded features */}
              {plan.specsExcluded && plan.specsExcluded.length > 0 && (
                <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                  <div className="font-sans font-bold text-base text-white">
                    {mt.excluded}:
                  </div>
                  <ul className="flex flex-col gap-3 opacity-60">
                    {plan.specsExcluded.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5 text-muted">
                          <X className="w-5 h-5" />
                        </div>
                        <span className="font-sans text-sm text-muted leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
