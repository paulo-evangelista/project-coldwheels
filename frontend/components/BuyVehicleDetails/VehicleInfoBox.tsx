type VehicleInfoBoxProps = {
    label: string;
    value: string;
    color: string;
    icon: any;
};

export default function VehicleInfoBox({ label, value, color, icon }: VehicleInfoBoxProps) {

    var backgroudColor = "";

    if (color === "blue") {
        backgroudColor = 'bg-[#0084E2]'
    }

    if (color === "green") {
        backgroudColor = 'bg-[#12C99D]'
    }

    if (color === "red") {
        backgroudColor = 'bg-[#FF6F6F]'
    }

    if (color === "purple") {
        backgroudColor = 'bg-[#6F74FF]'
    }

    return (
        <div className="shadow-lg mt-6 rounded-lg flex flex-col justify-between p-4 h-48 w-48 mx-2">
            <div className={`rounded-full p-3 ${backgroudColor} flex items-center justify-center w-12 h-12`}>
                {icon} 
            </div>
            <div className="inline-block pb-4 py-1 ">
                <p className="text-lg font-semibold">{value}</p>
                <p className="text-lg text-[#9A9A9A] pl-2">{label}</p>
            </div>
        </div>
    );
}
