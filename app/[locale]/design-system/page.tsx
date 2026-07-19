import { Check, CreditCard, Settings, ShieldAlert } from "lucide-react"
import * as React from "react"
import type { ReactNode } from "react"

import { FinalLogoMark, LogoLockup, LogoMark, type LogoConcept } from "@/components/brand/logo"
import { Alert } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Cluster, Container, Divider, Section, Stack } from "@/components/ui/layout"
import { FormField } from "@/components/ui/form-field"
import { IconButton } from "@/components/ui/icon-button"
import { Input } from "@/components/ui/input"
import { LinkButton } from "@/components/ui/link-button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const content = {
  fr: {
    eyebrow: "Reference interne",
    title: "Design system Sprint 02",
    intro:
      "Page de validation pour l'identite Premium Tech modulaire : base noire et ivoire, accent orange discipline, primitives accessibles.",
    choose:
      "Validation requise : choisir explicitement un concept avant consolidation du logo final.",
  },
  en: {
    eyebrow: "Internal reference",
    title: "Sprint 02 design system",
    intro:
      "Validation page for the modular Premium Tech identity: black and ivory base, disciplined orange accent, accessible primitives.",
    choose:
      "Required validation: explicitly choose one concept before final logo consolidation.",
  },
} as const

const concepts: Array<{
  id: LogoConcept
  name: string
  summary: string
}> = [
  {
    id: "a",
    name: "Concept A - Monoline continu",
    summary: "Trace TE compact, continu et arrondi, oriente moteur et circulation.",
  },
  {
    id: "b",
    name: "Concept B - Modules emboites",
    summary: "T structurel et E par niveaux, avec accent orange comme module actif.",
  },
  {
    id: "c",
    name: "Concept C - Portail systeme",
    summary: "TE comme cadre ouvert, base stable prete a recevoir les produits.",
  },
]

const palette = [
  ["brand-ink", "#0B0B0C"],
  ["brand-ivory", "#F4F0E7"],
  ["brand-canvas", "#FAFAF7"],
  ["brand-slate", "#3A404C"],
  ["brand-border", "#D9DCE2"],
  ["brand-orange", "#F97316"],
  ["brand-orange-strong", "#EA580C"],
  ["brand-orange-soft", "rgba(249, 115, 22, 0.12)"],
]

const semantic = [
  ["success", "#0F7A4F"],
  ["warning", "#9A5B00"],
  ["danger", "#B42318"],
  ["info", "#155EEF"],
  ["focus-ring", "#F97316"],
  ["surface", "#FAFAF7"],
]

export default async function DesignSystemPage({
  params,
}: {
  params: Promise<{ locale: "fr" | "en" }>
}) {
  const { locale } = await params
  const activeLocale = locale === "en" ? "en" : "fr"
  const t = content[activeLocale]

  return (
    <main className="min-h-screen bg-brand-canvas text-brand-ink">
      <Section className="bg-brand-ivory">
        <Container wide>
          <Stack gap="lg">
            <LogoLockup className="h-16 w-auto" />
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand-orange-strong">
                {t.eyebrow}
              </p>
              <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
                {t.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-brand-slate">{t.intro}</p>
            </div>
            <Alert variant="warning">{t.choose}</Alert>
          </Stack>
        </Container>
      </Section>

      <Section>
        <Container wide>
          <Stack gap="lg">
            <SectionHeading title="Validated logo" />
            <Card variant="pricing">
              <CardContent className="grid gap-6 pt-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="flex min-h-44 items-center justify-center rounded-lg bg-brand-ivory">
                  <LogoLockup className="h-20 w-auto max-w-full" />
                </div>
                <div>
                  <Badge variant="orange">Concept A selected</Badge>
                  <h3 className="mt-4 font-heading text-2xl font-extrabold">
                    Monoline continu
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-brand-slate">
                    Le monogramme TE final conserve un trace uniforme, compact et arrondi. Les concepts B et C restent archives comme exploration.
                  </p>
                  <div className="mt-5 flex items-end gap-4">
                    {[24, 32, 48, 96].map((size) => (
                      <div key={size} className="grid justify-items-center gap-2 text-xs text-brand-slate">
                        <FinalLogoMark size={size} />
                        <span>{size}px</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <SectionHeading title="Logo concepts" />
            <div className="grid gap-5 lg:grid-cols-3">
              {concepts.map((concept) => (
                <Card key={concept.id} variant="feature">
                  <CardHeader>
                    <CardTitle>{concept.name}</CardTitle>
                    <CardDescription>{concept.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex min-h-40 items-center justify-center rounded-lg bg-white">
                      <LogoMark concept={concept.id} size={96} />
                    </div>
                    <div className="mt-5 grid grid-cols-4 items-end gap-3">
                      {[24, 32, 48, 96].map((size) => (
                        <div key={size} className="grid justify-items-center gap-2 text-xs text-brand-slate">
                          <LogoMark concept={concept.id} size={size} />
                          <span>{size}px</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Stack>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container wide>
          <div className="grid gap-10 lg:grid-cols-2">
            <Stack gap="lg">
              <SectionHeading title="Palette" />
              <TokenGrid tokens={palette} />
            </Stack>
            <Stack gap="lg">
              <SectionHeading title="Semantic tokens" />
              <TokenGrid tokens={semantic} />
            </Stack>
          </div>
        </Container>
      </Section>

      <Section>
        <Container wide>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Stack gap="lg">
              <SectionHeading title="Typography" />
              <div className="rounded-lg border border-brand-border bg-white p-6">
                <p className="font-heading text-5xl font-extrabold leading-tight">
                  Manrope
                </p>
                <p className="mt-4 text-base leading-7 text-brand-slate">
                  Inter couvre les textes, formulaires, tableaux et interfaces operationnelles.
                </p>
              </div>
            </Stack>

            <Stack gap="lg">
              <SectionHeading title="Buttons and states" />
              <Card>
                <CardContent className="pt-6">
                  <Cluster>
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                    <Button isLoading>Loading</Button>
                    <Button disabled>Disabled</Button>
                    <IconButton icon={<Settings />} label="Settings" variant="outline" />
                    <LinkButton href={`/${activeLocale}/pricing`} variant="secondary">
                      Link button
                    </LinkButton>
                  </Cluster>
                </CardContent>
              </Card>
            </Stack>
          </div>
        </Container>
      </Section>

      <Section className="bg-brand-ivory">
        <Container wide>
          <div className="grid gap-8 lg:grid-cols-2">
            <Stack gap="lg">
              <SectionHeading title="Forms" />
              <Card>
                <CardContent className="grid gap-5 pt-6">
                  <FormField htmlFor="email" label="Email" hint="Label associe et focus visible.">
                    <Input id="email" placeholder="client@example.com" type="email" />
                  </FormField>
                  <FormField htmlFor="market" label="Market">
                    <Select id="market" defaultValue="fr">
                      <option value="fr">France</option>
                      <option value="cm">Cameroon</option>
                      <option value="en">International</option>
                    </Select>
                  </FormField>
                  <FormField htmlFor="notes" label="Notes" error="Example error state.">
                    <Textarea id="notes" placeholder="Project context" />
                  </FormField>
                  <label className="flex items-center gap-3 text-sm font-medium">
                    <Checkbox /> Accept validation terms
                  </label>
                  <RadioGroup defaultValue="starter" className="grid gap-2">
                    <label className="flex items-center gap-3 text-sm">
                      <RadioGroupItem value="starter" /> Starter
                    </label>
                    <label className="flex items-center gap-3 text-sm">
                      <RadioGroupItem value="pro" /> Pro
                    </label>
                  </RadioGroup>
                </CardContent>
              </Card>
            </Stack>

            <Stack gap="lg">
              <SectionHeading title="Badges, alerts, cards" />
              <Cluster>
                <Badge>Default</Badge>
                <Badge variant="orange">Orange</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="destructive">Danger</Badge>
                <Badge variant="outline">Outline</Badge>
              </Cluster>
              <div className="grid gap-3">
                <Alert variant="info">Information state distinct from orange.</Alert>
                <Alert variant="success">Successful validation.</Alert>
                <Alert variant="danger">Destructive or blocking message.</Alert>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <ExampleCard icon={<Check />} title="Feature" variant="feature" />
                <ExampleCard icon={<CreditCard />} title="Pricing" variant="pricing" />
                <ExampleCard icon={<ShieldAlert />} title="Info" variant="info" />
                <ExampleCard icon={<Settings />} title="Dashboard" variant="dashboard" />
              </div>
            </Stack>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title="Spacing and radius" />
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            {["8px", "12px", "16px", "24px"].map((radius) => (
              <div key={radius} className="border border-brand-border bg-white p-4" style={{ borderRadius: radius }}>
                <p className="font-semibold">{radius}</p>
                <p className="mt-2 text-sm text-brand-slate">Token radius example</p>
              </div>
            ))}
          </div>
          <Divider className="mt-10" />
        </Container>
      </Section>
    </main>
  )
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div>
      <h2 className="font-heading text-2xl font-extrabold">{title}</h2>
      <div className="mt-3 h-1 w-12 rounded-full bg-brand-orange" />
    </div>
  )
}

function TokenGrid({ tokens }: { tokens: string[][] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {tokens.map(([name, value]) => (
        <div key={name} className="rounded-md border border-brand-border bg-white p-4">
          <div className="h-12 rounded-sm border border-brand-border" style={{ background: value }} />
          <p className="mt-3 font-semibold">{name}</p>
          <p className="mt-1 font-mono text-xs text-brand-slate">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ExampleCard({
  icon,
  title,
  variant,
}: {
  icon: ReactNode
  title: string
  variant: "feature" | "pricing" | "info" | "dashboard"
}) {
  return (
    <Card variant={variant}>
      <CardHeader>
        <div className="mb-2 text-brand-orange" aria-hidden="true">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Reusable card style for platform surfaces.</CardDescription>
      </CardHeader>
    </Card>
  )
}
