"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BuyVehicleEvents from "@/components/BuyVehicleEvents/BuyVehicleEvents";
import BuyVehicleDetails from "@/components/BuyVehicleDetails/BuyVehicleDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import WhiteLogo from "@/assets/icons/WhiteLogo";

const Home = () => {
    const router = useRouter();

    const [inputValue, setInputValue] = useState("");

    const [isVisible, setIsVisible] = useState(false);

    const [scrollY, setScrollY] = useState(0);
    const [cardAnimationProgress, setCardAnimationProgress] = useState(0);
    const [displayWhiteDiv, setDisplayWhiteDiv] = useState(false);
    const [whiteDivAnimationProgress, setWhiteDivAnimationProgress] =
        useState(0);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            window.requestAnimationFrame(() => {
                setScrollY(window.scrollY);
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const windowHeight = window.innerHeight;
        const scrollInitAtSecondScreen = windowHeight * 1; //numero de divs screen-size antes da animacao dos cards

        //animacao cards
        if (scrollY > scrollInitAtSecondScreen && scrollY < windowHeight * 2) {
            const animationProgress = Number(
                (scrollY - scrollInitAtSecondScreen) / windowHeight
            );

            setCardAnimationProgress(animationProgress);

            if (displayWhiteDiv) {
                setDisplayWhiteDiv(false);
            }

            return;
        }

        // animacao card branco
        if (scrollY > windowHeight * 2 && !displayWhiteDiv) {
            setDisplayWhiteDiv(true);
            return;
        }
        if (scrollY > windowHeight * 2 && scrollY < windowHeight * 3) {
            const scrollInitAtWhiteAnimation = windowHeight * 2; //numero de divs screen-size antes da animacao do card branco
            const animationProgress = Number(
                (scrollY - scrollInitAtWhiteAnimation) / windowHeight
            );
            setWhiteDivAnimationProgress(animationProgress);
        }
    }, [scrollY]);

    const calculateLeft = (position: any, progress: any) => {
        switch (position) {
            case "left":
                return `${10 + 30 * progress}%`; // Starts at 10%, moves to 50%
            case "center":
                return `${40 + 0 * progress}%`; // Starts at 40%, moves to 50%
            case "right":
                return `${70 - 30 * progress}%`; // Starts at 70%, moves to 50%
        }
    };

    const getRotate = (progress: any) => {
        if (!displayWhiteDiv) return;

        return `rotate(${540 * progress}deg)`;
    };

    const getScale = (progress: any) => {
        if (!displayWhiteDiv) return;

        return 1 + 5 * progress;
    };

    //navigate to /buy/what was insert
    const submitPlate = () => {
        if (inputValue.trim() === "") return;

        router.push(`/home/${inputValue}`);
    };

    return (
        <div className="w-full max-w-full flex flex-col justify-center">
            {/* div com imagem do carro */}
            <div className="sticky top-0 left-0 flex flex-col items-center justify-between max-w-full h-screen bg-[url('/background/carro-landing.png')] bg-cover bg-no-repeat px-20 z-10">
                <div className="w-full h-1/6 flex flex-col justify-center items-center">
                    <p className="my-4 text-3xl font-bold text-white pb-4">
                        <WhiteLogo></WhiteLogo>
                    </p>
                    <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
                </div>

                <div className="w-full p-0">
                    <h1
                        className={`text-9xl font-bold text-white transition-all duration-1000 pb-28 transform ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-10"
                        }`}
                    >
                        Trustable Car
                        <br />
                        Information
                    </h1>
                    <div></div>
                </div>

                <div className=""></div>
            </div>

            {/* div 3 cards */}
            <div className="sticky top-0 left-0 flex items-center justify-between h-screen max-h-screen bg-black rounded-3xl px-96 z-20 relative overflow-hidden">
                <div
                    className="w-[20%] h-[50%] bg-[#212121] absolute top-1/2 flex flex-col items-center justify-between px-8 py-24 rounded-3xl shadow-neon-orange"
                    style={{
                        left: calculateLeft("left", cardAnimationProgress),
                        transform: `translate(0%, -50%)`,
                        display: displayWhiteDiv ? "none" : "block",
                    }}
                >
                    <h1 className="text-3xl font-bold text-white text-center mb-8">
                        Reliable Sources
                    </h1>
                    <p className="text-lg font-semibold text-white text-center">
                        Every piece of information about car modifications comes
                        from verified and reliable sources. Our system only
                        allows verified sources to write before storing it on
                        blockchain, providing you with the most trustworthy
                        information available.
                    </p>
                </div>

                <div
                    className="w-[20%] h-[50%] bg-[#212121] absolute top-1/2 flex flex-col items-center justify-between px-8 py-24 rounded-3xl shadow-neon-orange"
                    style={{
                        left: calculateLeft("center", cardAnimationProgress),
                        transform: `translate(0%, -50%)`,
                        display: displayWhiteDiv ? "none" : "block",
                    }}
                >
                    <h1 className="text-3xl font-bold text-white text-center mb-8">
                        AI-Powered Price Prediction
                    </h1>
                    <p className="text-lg font-semibold text-white text-center">
                        Fair Price Analysis: Utilize our AI technology to
                        determine the suggested price of a car based on its
                        modification history and current condition. Ensure every
                        purchase or sale is priced fairly and in line with the
                        car's actual value, making every transaction transparent
                        and justified.
                    </p>
                </div>

                <div
                    className="w-[20%] h-[50%] bg-[#212121] absolute top-1/2 flex flex-col items-center justify-between px-8 py-24 rounded-3xl shadow-neon-orange"
                    style={{
                        left: calculateLeft("right", cardAnimationProgress),
                        transform: `translate(0%, -50%)`,
                        display: displayWhiteDiv ? "none" : "block",
                    }}
                >
                    <h1 className="text-3xl font-bold text-white text-center mb-8">
                        Immutable Data Integrity
                    </h1>
                    <p className="text-lg font-semibold text-white text-center">
                        Guaranteed Data Security: With blockchain technology,
                        once data about a car’s modifications is recorded, it
                        cannot be altered or tampered with. This ensures
                        absolute integrity of the historical records, providing
                        a reliable and secure foundation for trust in every
                        transaction.
                    </p>
                </div>

                {/* div branca que roda */}
                <div
                    className="w-[20%] max-w-full h-[50%] bg-custom-radial-offset absolute top-1/2 flex flex-col items-center justify-between rounded-3xl origin-center"
                    style={{
                        left: calculateLeft("center", cardAnimationProgress),
                        transform: getRotate(whiteDivAnimationProgress),
                        display: displayWhiteDiv ? "block" : "none",
                        scale: getScale(whiteDivAnimationProgress),
                    }}
                >
                    <div
                        className="w-full h-full"
                        style={{
                            transform: `rotate(-${
                                1260 * whiteDivAnimationProgress
                            }deg)`,
                        }}
                    ></div>
                </div>
            </div>

            {/* invisivel para usar scroll */}
            <div className="sticky flex items-center justify-center h-screen bg-black z-10">
                <h1 className="text-white">invisible to use scroll</h1>
            </div>

            {/* invisivel para usar scroll */}
            <div className="sticky flex items-center justify-center h-screen bg-white rounded-3xl z-10">
                <h1 className="text-white">invisible to use scroll</h1>
            </div>

            {/* div de complete tracking */}
            <div className="sticky top-0 left-0 flex items-center justify-center h-screen bg-custom-radial-offset  z-30">
                <div className="w-1/2 h-full text-white text-9xl font-semibold flex items-center justify-center">
                    Complete
                    <br />
                    tracking
                </div>
                <div className="w-1/2 h-full flex items-center justify-center">
                    <BuyVehicleEvents
                        width="w-5/6"
                        carPlate={""}
                        carData={null}
                    />
                </div>
            </div>

            {/* div de fully decentralized */}
            <div className="sticky top-0 left-0 flex items-center justify-center h-screen bg-custom-radial-offset z-40">
                <div className="w-1/2 h-full flex items-center justify-center">
                    <Card className="px-5 py-10">
                        <BuyVehicleDetails width="w-full" carData={null} />
                    </Card>
                </div>

                <div className="w-1/2 h-full text-white text-8xl font-semibold flex items-center justify-center text-center p-8">
                    Fully
                    <br />
                    decentralized
                </div>
            </div>

            {/* div try now */}
            <div className="sticky top-0 left-0 flex items-center justify-center h-screen bg-[url('/background/bg-pattern.jpg')] bg-cover z-50">
                <div className="w-1/2 h-full text-white text-8xl font-semibold flex items-center justify-center text-center p-8">
                    Take your
                    <br />
                    proof
                </div>
                <div className="w-1/2 h-full flex items-center justify-center">
                    <Card className="w-1/2 h-2/6 px-5 py-10 flex flex-col items-center justify-between ">
                        <CardTitle>Insert any car plate</CardTitle>

                        <Input
                            placeholder="Plate here"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full h-16 pl-10 rounded-lg bg-[#F3F3F3] border-none"
                        />
                        <Button className="w-full" onClick={submitPlate}>
                            Submit
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Home;
