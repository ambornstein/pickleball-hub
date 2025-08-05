import Image from "next/image"

export default function CourtNavPanel() {
    return (
        <div className="grid grid-cols-[32%_auto] grid-rows-2 aspect-[3/2] gap-4 w-[50%]">
            <a href="/search" className="flex-col row-span-2 panel-link"><Image className="invert text-lg" src="/Map.png" width={75} height={75} alt="Map" />Map</a>

            <a className="flex-row panel-link"><Image className="invert" src="/Map.png" width={75} height={75} alt="Map" />Search</a>
            <a className="flex-row panel-link"><Image className="invert" src="/Map.png" width={75} height={75} alt="Map" />Submit Location</a>
        </div>
    )
}