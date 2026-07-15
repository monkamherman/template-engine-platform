import { notFound } from "next/navigation";

async function requireAdminSession() {
  return null;
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireAdminSession();

  if (!session) {
    notFound();
  }

  return children;
}
