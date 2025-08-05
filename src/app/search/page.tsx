import HeaderBar from "@/components/HeaderBar";

export default function SearchPage() {

    return(
        <>
            <HeaderBar/>
            <main className="flex flex-col gap-10 justify-center">
                <input type="checkbox"/>
                <input className="w-24" type="text"/>
            </main>
        </>
    )
}