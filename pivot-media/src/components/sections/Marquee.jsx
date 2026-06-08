export default function Marquee() {
    const items = [
        'Brand Strategy', 'Digital Growth', 'Creative Direction',
        'SEO & Content', 'Performance Marketing', 'Social Media', 'Web Design'
    ];

    return (
        <div className="py-5 bg-sage overflow-hidden whitespace-nowrap">
            <div className="inline-flex animate-[marquee_24s_linear_infinite]">
                {/* Double the items to create a seamless loop */}
                {[...items, ...items].map((item, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center gap-[26px] px-[34px] font-serif italic text-[0.95rem] text-cream opacity-40"
                    >
                        {item}
                        <span className="w-1 h-1 bg-cream rounded-full shrink-0" />
                    </span>
                ))}
            </div>

            <style>{`
        @keyframes marquee {
          to { transform: translateX(-50%); }
        }
      `}</style>
        </div>
    );
}
