import { withAuth } from "next-auth/middleware"
import { NextRequest } from "next/server"

export default withAuth(
    function middleware(req) {
        console.log(req.nextauth.token)
    },
    {
        callbacks: {
            authorized: ({ token }) => token?.role == 'Admin'
        }
    })

export const config = {
    matcher: "/admin"
}