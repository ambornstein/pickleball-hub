import Image from "next/image"

export default function LoadingIcon(props: {size: number}) {
    return <Image width={props.size} height={props.size} alt="loading" className={`invert rounded-2xl`} src="/padel.gif"/>
} 