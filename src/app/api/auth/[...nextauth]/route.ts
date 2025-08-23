import { hash } from "@/lib/security"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
import { encode, decode } from 'next-auth/jwt';

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) return null

                const hashedPassword = await hash(credentials.password)
                const data = {
                    email: credentials.email,
                    password: hashedPassword
                }

                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                const user = await response.json()

                if (response.ok && user) {
                    return user;
                }
                else return null
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({ session, token }) {
            return {
                ...session, user: {
                    ...session.user,
                    id: token.sub,
                    items: token.items
                }
            }
        },
        async jwt({ token, user }) {
            console.log(token)
            if (user) {
                return { ...token, ...user }
            }
            return token
        }
    },
    session: {
        strategy: 'jwt',
        maxAge: 3600
    },
    jwt: { encode, decode },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
