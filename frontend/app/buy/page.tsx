import Header from "../../components/BuyVehicleHeader/BuyVehicleHeader";
import Details from "../../components/BuyVehicleDetails/BuyVehicleDetails";

export default function BuyVehiclePage({}) {
    return (
        <div className="h-screen px-14 flex flex-col">
            <div className="flex-shrink-0">
                <Header />
            </div>
            <div className="flex-grow">
                <Details />
            </div>
        </div>
    );
}
