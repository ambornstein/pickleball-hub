import mapboxgl, { Popup } from "mapbox-gl"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

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
            offset: 20
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
            <div className="text-[16px] font-standard p-2 flex flex-row items-center">
                <div className="flex flex-col">
                    <span>{props.activeLocation.name}</span>
                    <sub className="text-sm">{props.activeLocation.address}</sub>
                </div>
                <span><a href={`/location/${props.activeLocation._id}`}>View</a></span>
            </div >,
            contentRef.current
        )
        }
    </>
}