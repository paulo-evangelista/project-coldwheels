"use client";

import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";

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

export default function CarTrackerCard({ title, description, date, icon }:props) {

    return (
        <div className="mb-5 relative before:content-[''] before:absolute before:-left-14 before:top-[58px] before:h-6 before:w-6 before:bg-white before:border-4 before:border-blue-700 before:rounded-full">
            <Card className=" pt-4">
                <div className="grid grid-cols-4 pb-2  px-4">
                    <div className="flex self-center pl-1">{icon} </div>
                    <div className="text-center px-2 col-span-3">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription className="p-2">
                            {description}
                        </CardDescription>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex text-xs pb-2">
                        <p className="self-end pl-2 pb-1 text-gray-500">
                            {date}
                        </p>
                    </div>

                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button
                                variant="link"
                                className="p-2 pr-3"
                            >
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
              <Button className="w-20 p-6 font-bold mx-auto text-xl mb-3">Ok</Button>
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
