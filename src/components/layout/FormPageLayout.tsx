'use client'

export const FormPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode; }>) =>
    <main className="center h-[80vh]">
        <div className="panel w-md mx-4 lg:mx-0">
            {children}
        </div>
    </main>