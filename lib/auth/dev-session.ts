import { Role } from "@prisma/client"

import { auth } from "@/auth"

export type DevSession = {
  user: {
    id: string
    email: string
    name: string
    roles: Role[]
  }
  mode: "authjs" | "development-fixture"
}

export async function getCustomerSession(): Promise<DevSession | null> {
  const session = await auth()

  if (session?.user?.id && session.user.roles.includes(Role.CUSTOMER)) {
    return {
      mode: "authjs",
      user: {
        id: session.user.id,
        email: session.user.email ?? "",
        name: session.user.name ?? "Customer",
        roles: session.user.roles,
      },
    }
  }

  if (process.env.NODE_ENV === "production") {
    return null
  }

  return {
    mode: "development-fixture",
    user: {
      id: "dev_customer",
      email: "client.preview@example.test",
      name: "Client Preview",
      roles: [Role.CUSTOMER],
    },
  }
}

export async function getAdminSession(): Promise<DevSession | null> {
  const session = await auth()

  if (session?.user?.id && session.user.roles.includes(Role.ADMIN)) {
    return {
      mode: "authjs",
      user: {
        id: session.user.id,
        email: session.user.email ?? "",
        name: session.user.name ?? "Admin",
        roles: session.user.roles,
      },
    }
  }

  if (process.env.NODE_ENV === "production") {
    return null
  }

  return {
    mode: "development-fixture",
    user: {
      id: "dev_admin",
      email: "admin.preview@example.test",
      name: "Admin Preview",
      roles: [Role.CUSTOMER, Role.ADMIN],
    },
  }
}
