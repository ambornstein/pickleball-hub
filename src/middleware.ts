import { withAuth } from "next-auth/middleware"
import { NextRequest } from "next/server"

export default withAuth(
    {
        callbacks: {
            authorized: ({ token }) => token?.role == 'Admin'
        }
    })

export const config = {
    matcher: "/admin"
}