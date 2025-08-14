export async function hash(content: string) {
    const buffer = new TextEncoder().encode(content)
    const hashed = await crypto.subtle.digest("SHA-256", buffer)

    const hashArray = await Array.from(new Uint8Array(hashed))

    const hashedHex = hashArray.map((b) =>
        b.toString(16).padStart(2, "0")).join("")
    return hashedHex
}