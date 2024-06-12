"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollAnimation() {
    const [isLocked, setIsLocked] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = window.innerHeight * 3; // Total height of 3 full viewport sections
            const scrollY = window.scrollY;
            const secondSectionStart = window.innerHeight;
            const secondSectionEnd = window.innerHeight * 2;

            if (scrollY >= secondSectionStart && scrollY <= secondSectionEnd) {
                setIsLocked(true);
                const relativeScroll = scrollY - secondSectionStart;
                const scrollRange = secondSectionEnd - secondSectionStart;
                setProgress(relativeScroll / scrollRange);
            } else {
                setIsLocked(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="h-screen overflow-hidden">
            <div className="h-screen bg-blue-200">First Screen</div>
            <div className="relative h-screen bg-green-200 overflow-hidden">
                <motion.div
                    className="absolute top-1/2 left-1/2 bg-red-500 w-32 h-32"
                    style={{
                        x: progress * -50 + "%", // Move from 0% to -50% of the viewport width
                        translateY: "-50%",
                        translateX: "-50%",
                    }}
                    animate={{ x: progress * -50 + "%" }}
                    transition={{ type: "spring", stiffness: 300 }}
                />
            </div>
            <div className="h-screen bg-yellow-200">Third Screen</div>
        </div>
    );
}
