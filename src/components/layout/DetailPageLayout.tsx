import HeaderBar from "../HeaderBar";
import ReviewSection from "../review/ReviewSection";


export const DetailPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode; }>) => <>
        <div className="min-h-screen font-standard">
            <HeaderBar />
            <main className="flex justify-center px-10 lg:px-0">
                {children}
            </main>
        </div>
    </>;

    
