/**
 * v0 by Vercel.
 * @see https://v0.dev/t/K8VO7fCickM
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import Image from "next/image"
import Renegade from "./car.webp"
export default function CarTrackerCarCard() {
  return (
    <Card className="max-w-lg w-5/6 mx-auto mt-4">
      <CardHeader>
        <CardTitle>Renegade 1.3 Turbo T270 4X2</CardTitle>
        <CardDescription>Jeep</CardDescription>
      </CardHeader>
      <Image alt="Model S" className="aspect-[2/1] w-full object-scale-down" height="200" src={Renegade} width="400" />
      <CardContent>
        <dl className="text-sm mt-2">
          <div className="mb-2">
            <span className="font-semibold">Ano: </span>
            2023{"\n                  "}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Placa: </span>
            DSC-1461{"\n                  "}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Odômetro: </span>
            12,345 km{"\n                  "}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Cor: </span>
            Preto ônix{"\n                  "}
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

