import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomCursor from '../components/CustomCursor';
import ReactLenis from 'lenis/react';

export default function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Privacy Policy - Pivot Media';
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
                            Privacy Policy
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
                            Pivot Media ("we", "us", or "our") operates https://pivotmedia.gr (the "Site"). We are committed to protecting your personal data and respecting your privacy in compliance with the General Data Protection Regulation (GDPR) (EU) 2016/679 and applicable Greek data protection laws.
                        </p>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mt-4">
                            This Privacy Policy explains what personal data we collect, how we use it, who we share it with, and how you can exercise your data privacy rights.
                        </p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">1. Data Controller</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mb-4">For the purpose of the GDPR, the Data Controller for this website is:</p>
                        <div className="bg-sage/5 border border-sage/10 rounded-lg p-6 text-[0.95rem] leading-[1.8] opacity-80">
                            <strong>Company Name:</strong> Pivot Media<br />
                            <strong>Location:</strong> Agiou Kirikou 27, Peristeri 121 35, Greece<br />
                            <strong>Contact Email:</strong> <a href="mailto:info@pivotmedia.gr" className="text-sage underline underline-offset-4 hover:opacity-70 transition-opacity">info@pivotmedia.gr</a>
                        </div>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">2. Information We Collect and Why</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mb-4">We only collect personal data that is necessary to provide you with our services, answer your inquiries, or improve your experience on our website.</p>
                        <ul className="list-disc pl-6 space-y-2 text-[1.05rem] leading-[1.85] opacity-70">
                            <li><strong>Contact Forms:</strong> When you send us an inquiry via our contact forms, we collect your name, email address, phone number, company name, and any message details you provide.</li>
                            <li><strong>Legal Basis:</strong> Consent or Pre-contractual necessity (to send you a service quote).</li>
                            <li><strong>Analytics & Performance:</strong> We automatically collect standard internet log information and details of visitor behavior patterns through cookies (e.g., your IP address, browser type, and pages visited).</li>
                            <li><strong>Legal Basis:</strong> Consent (via our cookie banner) and Legitimate Interests (to maintain and secure our website).</li>
                        </ul>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">3. Cookies and Tracking Technologies</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mb-4">Our website uses cookies to enhance user experience, analyze site traffic, and optimize performance.</p>
                        <ul className="list-disc pl-6 space-y-2 text-[1.05rem] leading-[1.85] opacity-70">
                            <li><strong>Necessary Cookies:</strong> Essential for the website to function properly.</li>
                            <li><strong>Analytical/Performance Cookies:</strong> Help us understand how visitors interact with the site (e.g., Google Analytics). These cookies are only activated if you click "Accept" on our cookie consent banner.</li>
                        </ul>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mt-4">You can manage or withdraw your cookie preferences at any time through your browser settings or our cookie consent banner.</p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">4. How Long We Retain Your Data</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70">We will not retain your personal data longer than necessary to fulfill the purposes for which it was collected:</p>
                        <ul className="list-disc pl-6 space-y-2 text-[1.05rem] leading-[1.85] opacity-70 mt-4">
                            <li><strong>Inquiry/Contact Data:</strong> Retained for up to 24 months after our last communication, unless you enter into a business contract with us.</li>
                            <li><strong>Client Account Data:</strong> Retained for the duration of our contract plus any additional period required to comply with financial, legal, or tax reporting obligations under Greek law.</li>
                        </ul>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">5. Third-Party Data Sharing</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mb-4">We do not sell, trade, or rent your personal data to third parties. We may share your data with trusted third-party processors who help us operate our website and business, including:</p>
                        <ul className="list-disc pl-6 space-y-2 text-[1.05rem] leading-[1.85] opacity-70">
                            <li>Hosting and cloud server providers.</li>
                            <li>Web analytics tools (e.g., Google Analytics).</li>
                            <li>CRM or email marketing platforms (if you subscribe to our newsletter).</li>
                        </ul>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mt-4">All our third-party processors are strictly bound by Data Processing Agreements (DPAs) ensuring they handle your data securely and in full compliance with the GDPR.</p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">6. International Data Transfers</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70">Whenever possible, your data is stored on secure servers located within the European Economic Area (EEA). If a third-party tool transfers data outside the EEA (such as to the United States), we ensure that appropriate legal safeguards are in place, such as Standard Contractual Clauses (SCCs) approved by the European Commission.</p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">7. Your Data Protection Rights</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mb-4">Under the GDPR, you have the following rights regarding your personal data:</p>
                        <ul className="list-disc pl-6 space-y-2 text-[1.05rem] leading-[1.85] opacity-70">
                            <li><strong>Right of Access:</strong> You can request a copy of the personal data we hold about you.</li>
                            <li><strong>Right to Rectification:</strong> You can ask us to correct inaccurate or incomplete data.</li>
                            <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You can request that we delete your personal data, subject to legal retention obligations.</li>
                            <li><strong>Right to Object/Restrict Processing:</strong> You can object to us processing your data for specific reasons (such as direct marketing).</li>
                            <li><strong>Right to Data Portability:</strong> You can request that we transfer your data to another provider in a structured, machine-readable format.</li>
                            <li><strong>Right to Withdraw Consent:</strong> If we process your data based on consent, you can withdraw it at any time.</li>
                        </ul>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mt-4">To exercise any of these rights, please contact us at <a href="mailto:info@pivotmedia.gr" className="text-sage underline underline-offset-4 hover:opacity-70 transition-opacity">info@pivotmedia.gr</a>. We will respond to your request within 30 days.</p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">8. Data Security</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70">We implement strict technical and organizational security measures (such as HTTPS/SSL encryption, secure firewalls, and restricted administrative access) to prevent your personal data from being accidentally lost, used, or altered.</p>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">9. Right to Lodge a Complaint</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mb-4">If you believe that our processing of your personal data violates the GDPR, you have the right to lodge a official complaint with the Hellenic Data Protection Authority (HDPA):</p>
                        <div className="bg-sage/5 border border-sage/10 rounded-lg p-6 text-[0.95rem] leading-[1.8] opacity-80">
                            <strong>Website:</strong> <a href="https://www.dpa.gr" target="_blank" rel="noopener noreferrer" className="text-sage underline underline-offset-4 hover:opacity-70 transition-opacity">www.dpa.gr</a><br />
                            <strong>Postal Address:</strong> Kifissias 1-3, 115 23 Athens, Greece
                        </div>
                    </motion.section>

                    <motion.section variants={fadeIn} className="mb-12">
                        <h2 className="font-serif text-2xl font-bold mb-4 text-text">10. Contact Us</h2>
                        <p className="text-[1.05rem] leading-[1.85] opacity-70 mb-6">If you have any questions about this Privacy Policy, contact us at the details below.</p>
                        <div className="bg-sage/5 border border-sage/10 rounded-lg p-6 text-[0.95rem] leading-[1.8] opacity-80">
                            <strong>Pivot Media</strong><br />
                            Email: <a href="mailto:info@pivotmedia.gr" className="text-sage underline underline-offset-4 hover:opacity-70 transition-opacity">info@pivotmedia.gr</a><br />
                            Phone: <a href="tel:+306947987770" className="text-sage underline underline-offset-4 hover:opacity-70 transition-opacity">+30 694 798 7770</a>
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
