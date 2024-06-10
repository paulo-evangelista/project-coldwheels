type VehicleInfoBoxProps = {
    label: string;
    value: string;
};

export default function VehicleInfoBox({ label, value }: VehicleInfoBoxProps) {
    return (
        <div>
            <p className="text-lg font-semibold">{label}</p>
            <div className="inline-block px-4 py-1 border-2 border-[#EA580C] rounded-md ">
                <p className="text-lg">{value}</p>
            </div>
        </div>
    );
}
