export type DevSession = {
  user: {
    id: string
    email: string
    name: string
    roles: Array<"CUSTOMER" | "SUPPORT" | "ADMIN">
  }
  mode: "development-fixture"
}

export async function getCustomerSession(): Promise<DevSession | null> {
  if (process.env.NODE_ENV === "production") {
    return null
  }

  return {
    mode: "development-fixture",
    user: {
      id: "dev_customer",
      email: "client.preview@example.test",
      name: "Client Preview",
      roles: ["CUSTOMER"],
    },
  }
}

export async function getAdminSession(): Promise<DevSession | null> {
  if (process.env.NODE_ENV === "production") {
    return null
  }

  return {
    mode: "development-fixture",
    user: {
      id: "dev_admin",
      email: "admin.preview@example.test",
      name: "Admin Preview",
      roles: ["CUSTOMER", "ADMIN"],
    },
  }
}
