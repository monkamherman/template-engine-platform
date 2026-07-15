import { redirect } from "next/navigation";

async function requireCustomerSession() {
  return null;
}

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireCustomerSession();

  if (!session) {
    redirect("/fr/login");
  }

  return children;
}
