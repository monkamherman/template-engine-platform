"use client"

import { Button } from "@/components/ui/button"
import { Container, Section } from "@/components/ui/layout"

export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="min-h-screen bg-brand-canvas">
      <Section>
        <Container>
          <div className="rounded-xl border border-brand-border bg-white p-8">
            <h1 className="font-heading text-3xl font-extrabold">Erreur temporaire</h1>
            <p className="mt-3 max-w-xl text-brand-slate">
              {"L'interface n'a pas pu etre rendue. Aucun detail technique sensible n'est affiche."}
            </p>
            <Button className="mt-6" onClick={reset}>
              Reessayer
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
