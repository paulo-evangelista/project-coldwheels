import GLBViewer from "../Render3d/Render3d";
import { useState, useEffect } from "react";

interface LandingPageSectionProps {
    modelPath: string;
    isReverse: boolean;
    text: string;
    scale: number;
}

const LandingPageSection = ({
    modelPath,
    isReverse,
    text,
    scale,
}: LandingPageSectionProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div
            className={`flex ${
                isReverse ? "flex-row-reverse" : "flex-row"
            } h-2/6 mb-20 w-full`}
        >
            <div className="">
                <GLBViewer
                    glbPath={modelPath}
                    sensitivity={3.5}
                    scale={scale}
                />
            </div>
            <div className="flex flex-grow px-12">
                <h1
                    className={`text-6xl font-bold text-white transition-all duration-1000 pb-28 transform ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}
                >
                    {text}
                </h1>
            </div>
        </div>
    );
};

export default LandingPageSection;
