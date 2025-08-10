import { useEffect, useState } from "react"
import { CgChevronLeft, CgChevronRight } from "react-icons/cg"

interface FoldingProps {
    orientation: string
}

export default function FoldingButton(props: FoldingProps) {
    const [collapsed, setExpanded] = useState(false)

    useEffect(() => {
        setExpanded(window.matchMedia('(width <= 64rem)').matches)
    }, [])

    return (
        < div className={`w-12 h-12 peer bg-slate-800 ${props.orientation == "left" ? 'rounded-e-md' : 'rounded-s-md'}`} >
            <input type="checkbox" checked={collapsed} onChange={(e) => setExpanded(e.target.checked)}
                className="fold-marker appearance-none z-20" />
            {collapsed ?
                (props.orientation == "left" ?
                    <CgChevronRight className="fold-marker" /> :
                    <CgChevronLeft className="fold-marker" />) :
                (props.orientation == "left" ?
                    <CgChevronLeft className="fold-marker" /> :
                    <CgChevronRight className="fold-marker" />)
            }
        </div >)
}