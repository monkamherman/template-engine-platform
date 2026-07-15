import { Container, Section } from "@/components/ui/layout"

export default function Loading() {
  return (
    <Section>
      <Container>
        <div className="grid gap-4">
          <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />
          <div className="h-28 animate-pulse rounded-lg bg-muted" />
          <div className="grid gap-3 md:grid-cols-3">
            <div className="h-24 animate-pulse rounded-lg bg-muted" />
            <div className="h-24 animate-pulse rounded-lg bg-muted" />
            <div className="h-24 animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      </Container>
    </Section>
  )
}
