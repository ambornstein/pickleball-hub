import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    providers: [
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         email: { label: "Email", type: "text" },
        //         password: { label: "Password", type: "password" }
        //     },
        //     async authorize(credentials, req) {
        //         const response = await fetch('api/auth/login', {
        //             method: 'POST',
        //             headers: {
        //                 "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify({ credentials.email, hashedPassword })
        //         })
        //     },
        // })
    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
