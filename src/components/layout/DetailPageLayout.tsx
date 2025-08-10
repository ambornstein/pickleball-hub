import HeaderBar from "../HeaderBar";
import ReviewSection from "../review/ReviewSection";


export const DetailPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode; }>) => <>
        <div className="min-h-screen font-standard">
            <HeaderBar />
            <main className="flex justify-center px-10 lg:px-0">
                <div className="lg:max-w-lg max-w-sm flex flex-col gap-4">
                    <div className="h-fit flex flex-col gap-4 p-6 bg-blue-950">
                        {children}
                    </div>
                    <ReviewSection />
                </div>
            </main>
        </div>
    </>;
