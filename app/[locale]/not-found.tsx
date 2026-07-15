import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Container, Section } from "@/components/ui/layout"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-canvas">
      <Section>
        <Container>
          <div className="rounded-xl border border-brand-border bg-white p-8">
            <h1 className="font-heading text-3xl font-extrabold">Page introuvable</h1>
            <p className="mt-3 max-w-xl text-brand-slate">
              {"Cette interface n'existe pas encore dans le squelette V1 ou l'adresse est incorrecte."}
            </p>
            <Button asChild className="mt-6">
              <Link href="/fr">{"Retour a l'accueil"}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
