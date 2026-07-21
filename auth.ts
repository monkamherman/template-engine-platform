import NextAuth, { type NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Role } from "@prisma/client"
import { z } from "zod"

import { prisma } from "@/lib/prisma"
import { getAuthEnv, isGoogleAuthConfigured } from "@/modules/auth/env"
import { normalizeEmail, verifyPasswordForCredentials } from "@/modules/auth/account-service"

const env = getAuthEnv()

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const providers: NextAuthConfig["providers"] = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const parsed = credentialsSchema.safeParse(credentials)

      if (!parsed.success) {
        return null
      }

      const user = await verifyPasswordForCredentials(parsed.data.email, parsed.data.password)

      if (!user) {
        return null
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      }
    },
  }),
]

if (isGoogleAuthConfigured()) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: false,
    }),
  )
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/fr/login",
    verifyRequest: "/fr/verify-email",
  },
  session: {
    strategy: "jwt",
    maxAge: env.AUTH_SESSION_MAX_AGE_SECONDS,
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === "google" && !isGoogleEmailVerified(profile)) {
        return false
      }

      if (user.email) {
        await ensureCustomerRoleByEmail(user.email)
      }

      return true
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: normalizeEmail(user.email) },
          select: {
            id: true,
            roles: { select: { role: true } },
          },
        })

        if (dbUser) {
          token.sub = dbUser.id
          token.roles = dbUser.roles.map(({ role }) => role)
        }
      }

      return token
    },
    async session({ session, token }) {
      const roles = parseRoles(token.roles)

      session.user.id = token.sub ?? ""
      session.user.roles = roles

      return session
    },
  },
  events: {
    async createUser({ user }) {
      if (user.email) {
        await ensureCustomerRoleByEmail(user.email)
      }
    },
  },
  trustHost: true,
})

async function ensureCustomerRoleByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: normalizeEmail(email) },
    select: { id: true },
  })

  if (!user) {
    return
  }

  await prisma.userRole.upsert({
    where: {
      userId_role: {
        userId: user.id,
        role: Role.CUSTOMER,
      },
    },
    update: {},
    create: {
      userId: user.id,
      role: Role.CUSTOMER,
    },
  })
}

function isGoogleEmailVerified(profile: unknown) {
  if (!profile || typeof profile !== "object" || !("email_verified" in profile)) {
    return true
  }

  return profile.email_verified === true
}

function parseRoles(value: unknown): Role[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((role): role is Role => Object.values(Role).includes(role as Role))
}
