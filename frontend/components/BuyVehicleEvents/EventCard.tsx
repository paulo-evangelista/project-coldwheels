"use client";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

interface props {
    title: string;
    description: string;
    date: string;
    icon: any;
}

export default function EventCard({ title, description, date, icon }: props) {
    return (
        <div className="relative flex justify-end z-10 mb-[50px] last:mb-0">
            <div className="absolute left-0 top-0 w-[90px] h-[90px] bg-black rounded-full flex items-center justify-center z-10">
                {icon}
            </div>

            <Card className="w-10/12 h-[90px] px-6 py-2 bg-[#F3F3F3] border-2 border-[#D8D8D8] flex justify-between items-center">
                <div className="h-full flex flex-col justify-evenly">
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                <div className="h-full flex flex-col justify-evenly items-end">
                    <p>{date}</p>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="link" className="p-0">
                                Ver mais informações
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="font-pulp text-center">
                                <DrawerHeader>
                                    <DrawerTitle className="text-4xl">
                                        {title}
                                    </DrawerTitle>
                                    <p className="text-xl">{description}</p>
                                    <p className="text-gray-400">{date}</p>
                                </DrawerHeader>
                                <DrawerDescription>
                                    <p>asdasdasd</p>
                                    <p>asdasdasd</p>
                                    <p>asdasdasd</p>
                                    <p>asdasdasd</p>
                                    <p>asdasdasd</p>
                                </DrawerDescription>
                                <DrawerFooter>
                                    <DrawerClose asChild>
                                        <Button className="w-20 p-6 font-bold mx-auto text-xl mb-3">
                                            Ok
                                        </Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </Card>
        </div>
    );
}
