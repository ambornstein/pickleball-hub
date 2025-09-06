import mapboxgl, { Popup } from "mapbox-gl"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { MdOutlineArrowCircleRight } from "react-icons/md"

interface PopupProps {
    activeLocation: any,
    map: any
}

export default function PopupElement(props: PopupProps) {
    const popupRef = useRef<Popup>(null)
    const contentRef = useRef(document.createElement('div'))

    useEffect(() => {
        if (!props.map) return

        popupRef.current = new mapboxgl.Popup({
            closeOnClick: false,
            offset: 20,
        })

        return () => { popupRef.current!.remove() }
    }, []),

        useEffect(() => {
            if (!props.activeLocation) return
            console.log(props.activeLocation)
            popupRef.current!
                .setLngLat(props.activeLocation.coordinates)
                .setHTML(contentRef.current.outerHTML)
                .addTo(props.map)
        }, [props.activeLocation])

    return <>
        {createPortal(
            <div className="text-[16px] font-standard p-1 flex flex-row gap-4 items-center">
                <div className="flex flex-col">
                    <span>{props.activeLocation.name}</span>
                    <span className="text-[12px]">{props.activeLocation.address}</span>
                </div>
                <a href={`/location/${props.activeLocation._id}`}>
                <div className="flex flex-col items-center">
                    <MdOutlineArrowCircleRight className="size-6"/>
                    <span className="text-[12px] leading-4">More Info</span>
                </div>
                </a>
            </div>,
            contentRef.current)
        }
    </>
}