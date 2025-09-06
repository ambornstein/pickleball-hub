export default function ToggleChip(props: {value1: string, value2: string, setToggle: (b: boolean) => void}) {
    return <div className="relative inline-flex bg-slate-800 rounded-md p-1 outline-2 cursor-pointer">
        <input type="checkbox" value="" onChange={(e) => props.setToggle(e.target.checked)} className="absolute appearance-none w-full h-full peer z-10" />
        <div className="grid grid-cols-[50px_50px] gap-[12px] place-items-center peer text-lg lg:text-xl
                        after:transition-all after:absolute after:w-[56px] after:h-[36px] after:left-0 after:rounded-md after:bg-slate-400/40 after:outline-1
                        peer-checked:after:translate-x-[64px]">
            <span>{props.value1}</span>
            <span>{props.value2}</span>
        </div>
    </div>
}