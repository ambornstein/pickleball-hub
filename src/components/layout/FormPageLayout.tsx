'use client'

export const FormPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode; }>) => <>
        <main className="center min-h-screen font-standard">
            <div className="panel w-lg mx-4 lg:mx-0">
                {children}
            </div>
        </main>
    </>