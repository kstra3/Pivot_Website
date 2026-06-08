import { AnimatePresence, motion } from 'framer-motion';

export default function CookieConsent({ open, onAccept, onDecline, onClose }) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-[9800] flex items-end md:items-end justify-center p-4 md:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.button
                        aria-label="Close cookie popup"
                        className="absolute inset-0 bg-sage/30 backdrop-blur-[2px] cursor-default"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Cookie preferences"
                        className="relative w-full max-w-[560px] overflow-hidden rounded-[28px] border border-cream/15 bg-sage text-cream shadow-[0_30px_120px_rgba(0,0,0,0.28)]"
                        initial={{ y: 40, opacity: 0, scale: 0.98 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 40, opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cream/10 via-transparent to-sage/20 pointer-events-none" />
                        <div className="relative p-6 md:p-8">
                            <div className="flex items-start justify-between gap-4 mb-5">
                                <div>
                                    <p className="text-[0.65rem] font-bold tracking-[0.25em] uppercase text-cream/55 mb-3">Cookie Preferences</p>
                                    <h3 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-black leading-[1.05]">
                                        A smoother experience with choice.
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="h-10 w-10 rounded-full border border-cream/15 text-cream/70 hover:text-cream hover:bg-cream/5 transition-colors"
                                    aria-label="Dismiss cookie popup"
                                >
                                    ✕
                                </button>
                            </div>

                            <p className="text-[1rem] leading-[1.7] text-cream/70 max-w-[46ch] mb-8">
                                We use necessary cookies to keep the site running and optional analytics cookies to understand what works. Choose what you allow, and you can change it anytime.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    type="button"
                                    onClick={onDecline}
                                    className="px-6 py-3 rounded-full border border-cream/15 text-cream/80 hover:text-cream hover:bg-cream/5 transition-all font-bold tracking-[0.14em] uppercase text-[0.72rem]"
                                >
                                    Decline
                                </button>
                                <button
                                    type="button"
                                    onClick={onAccept}
                                    className="px-6 py-3 rounded-full bg-cream text-sage hover:bg-cream/90 transition-all font-black tracking-[0.14em] uppercase text-[0.72rem]"
                                >
                                    Accept
                                </button>
                            </div>

                            <p className="mt-5 text-[0.72rem] uppercase tracking-[0.2em] text-cream/35">
                                Read more in our Privacy Policy.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}