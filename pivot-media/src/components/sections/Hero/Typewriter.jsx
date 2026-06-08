import { useState, useEffect } from 'react';

export default function Typewriter({ words, typeSpeed = 90, deleteSpeed = 50, pauseTime = 1800 }) {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        let timer;
        const currentWord = words[wordIndex];

        if (isDeleting) {
            if (text === '') {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
                timer = setTimeout(() => { }, 300); // small pause before typing next
            } else {
                timer = setTimeout(() => setText(text.slice(0, -1)), deleteSpeed);
            }
        } else {
            if (text === currentWord) {
                timer = setTimeout(() => setIsDeleting(true), pauseTime);
            } else {
                timer = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), typeSpeed);
            }
        }

        return () => clearTimeout(timer);
    }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseTime]);

    return (
        <span className="inline-block relative py-2 -my-2">
            {text}
            <span className="inline-block w-[3px] h-[0.8em] bg-sage ml-[3px] align-middle animate-[blink_0.9s_step-end_infinite]" />
        </span>
    );
}
