import { DetailPageLayout } from "@/components/layout/DetailPageLayout"
import Image from "next/image"

export default function UserAccountPage() {

    return (
        <DetailPageLayout>
            <Image width={250} height={250} src="globe.svg" alt="User Profile Image"></Image>
            <button className="button">Change Name</button>
            <button className="button">Reset Password</button>
            <button className="button">Delete Account</button>
        </DetailPageLayout>
    )
}