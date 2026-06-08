import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomCursor from '../components/CustomCursor';
import ReactLenis from 'lenis/react';

export default function TermsOfService() {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Terms and Conditions - Pivot Media';
    }, []);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
            <CustomCursor />
            <div className="min-h-screen bg-bg text-text">
                <header className="bg-sage text-cream py-16 md:py-24 px-6 md:px-16">
                    <div className="max-w-[900px] mx-auto">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-cream/60 hover:text-cream transition-colors duration-300 text-sm tracking-widest uppercase font-bold mb-8 no-underline"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="font-serif text-[clamp(2.2rem,5vw,4rem)] font-black leading-[1.1] tracking-tight"
                        >
                            Terms and Conditions
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 text-sm tracking-widest uppercase"
                        >
                            Last Updated: May 28, 2026
                        </motion.p>
                    </div>
                </header>

                <motion.main
                    initial="hidden"
                    animate="show"
                    variants={{ show: { transition: { staggerChildren: 0.08 } } }}
                    className="max-w-[900px] mx-auto px-6 md:px-16 py-16 md:py-24"
                >
                    <motion.section variants={fadeIn} className="mb-12">
                        <p className="text-[1.05rem] leading-[1.85] opacity-70">
                            Welcome to Pivot Media (https://pivotmedia.gr). These Terms and Conditions ("Terms") govern your use of our website and the digital services, marketing solutions, and content provided by Pivot Media ("Company", "we", "us", or "our").
                        </p>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mt-4">
                            By accessing our website or engaging with our services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must stop using our website and services immediately.
                        </p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">1. Services Provided</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70">Pivot Media provides a variety of digital services, including but not limited to web design and development, digital marketing, content creation, brand strategy, and social media management (collectively, "Services"). The specific scope, timelines, and deliverables of any project will be outlined in a separate, written Service Agreement or Proposal signed by both parties.</p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">2. Eligibility & Website Use</h2>
                        <ul className="list-disc pl-6 space-y-2 text-[1.05rem] leading-[1.85] opacity-70">
                            <li>You must be at least 18 years old to use our Services or submit inquiries through our website.</li>
                            <li>You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.</li>
                            <li>Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</li>
                        </ul>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">3. Intellectual Property Rights</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mb-4"><strong>Our Content:</strong> All content, graphics, code, logos, text, and designs featured on pivotmedia.gr are the intellectual property of Pivot Media and are protected by applicable copyright and trademark laws. You may not copy, reproduce, or distribute our content without prior written consent.</p>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70"><strong>Client Deliverables:</strong> Unless otherwise specified in a signed agreement, upon full payment of all outstanding invoices, the intellectual property rights of custom deliverables (e.g., your new website design, logos, or copy) will transfer to the Client. Pivot Media retains the right to display the completed work in our portfolio, case studies, and marketing materials.</p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">4. Payments, Fees, and Refund Policy</h2>
                        <ul className="list-disc pl-6 space-y-2 text-[1.05rem] leading-[1.85] opacity-70">
                            <li><strong>Pricing:</strong> Project prices and service fees will be provided via written quotes or proposals.</li>
                            <li><strong>Payment Terms:</strong> Deposits and milestones must be paid according to the schedule specified in your project proposal. We reserve the right to pause or halt work if payments are overdue.</li>
                            <li><strong>Refunds:</strong> Due to the custom, digital, and time-intensive nature of our Services, all deposits and payments made are non-refundable unless specified otherwise in writing.</li>
                        </ul>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">5. Client Obligations & Content Provision</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mb-4">To ensure smooth project delivery, you agree to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-[1.05rem] leading-[1.85] opacity-70">
                            <li>Provide all requested materials, text copy, imagery, and feedback in a timely manner.</li>
                            <li>Guarantee that all materials provided to Pivot Media do not violate third-party copyrights or trademarks. Pivot Media is not liable for copyright infringements stemming from assets supplied by the client.</li>
                        </ul>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">6. Privacy & Data Protection</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70">Your use of our website and services is also governed by our Privacy Policy, which compliant with the General Data Protection Regulation (GDPR). By using our website, you consent to the processing of data as described therein.</p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">7. Limitation of Liability</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mb-4">Pivot Media strives to provide error-free, high-quality work, but we do not guarantee that your website or digital platforms will be 100% free from technical glitches, third-party server downtime, or cyber security breaches beyond our control.</p>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70">To the maximum extent permitted by law, Pivot Media shall not be liable for any indirect, incidental, or consequential damages, including loss of profits, revenue, or data, arising out of the use or inability to use our services or website.</p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">8. Third-Party Links & Tools</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70">Our website or deliverables may feature links to third-party tools, plugins, platforms, or websites. Pivot Media is not responsible for the availability, content, or privacy practices of these external third parties.</p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">9. Termination of Services</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70">Either party may terminate a project or ongoing service agreement by providing written notice as stipulated in your specific contract. Upon termination, the client is responsible for paying for all work completed up to the date of termination.</p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">10. Governing Law</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70">These Terms and Conditions are governed by and construed in accordance with the laws of Greece and the European Union. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Athens, Greece.</p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">11. Changes to These Terms</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70">We reserve the right to modify these Terms at any time. Any changes will be posted directly to this page with an updated "Last Updated" date. Your continued use of our website or services after changes are posted constitutes acceptance of the new Terms.</p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">12. Contact Information</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mb-6">If you have any questions or require clarification regarding these Terms and Conditions, please contact us at:</p>
                        <div className="bg-sage/5 border border-sage/10 rounded-lg p-6 text-[0.95rem] leading-[1.8] opacity-80">
                            <strong>Pivot Media</strong><br />
                            Email: <a href="mailto:info@pivotmedia.gr" className="text-sage underline underline-offset-4 hover:opacity-70 transition-opacity">info@pivotmedia.gr</a><br />
                            Phone: <a href="tel:+306947987770" className="text-sage underline underline-offset-4 hover:opacity-70 transition-opacity">+30 694 798 7770</a><br />
                            Address/HQ: Agiou Kirikou 27, Peristeri 121 35, Greece
                        </div>
                    </motion.section>

                    <motion.div variants={fadeIn} className="mt-16 pt-8 border-t border-sage/10">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sage hover:opacity-70 transition-opacity text-sm tracking-widest uppercase font-bold no-underline"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                    </motion.div>
                </motion.main>
            </div>
        </ReactLenis>
    );
}
