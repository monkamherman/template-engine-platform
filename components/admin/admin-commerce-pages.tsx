import Link from "next/link"
import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  ArrowUpRight,
  Banknote,
  MoreHorizontal,
  Package,
  ReceiptText,
  Search,
  ShieldAlert,
  UsersRound,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Alert } from "@/components/ui/alert"
import { Badge, type BadgeProps } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { routes } from "@/config/routes"
import type {
  AdminCommerceData,
  AdminCustomer,
  AdminOffer,
  AdminOrder,
  AdminPayment,
  AdminProduct,
  AdminStatus,
} from "@/modules/admin/admin-commerce-query"
import { getAdminCommerceData } from "@/modules/admin/admin-commerce-query"
import type { Locale } from "@/src/i18n/locales"

type AdminCommerceKind =
  | "dashboard"
  | "customers"
  | "customer-detail"
  | "products"
  | "product-new"
  | "product-detail"
  | "offers"
  | "offer-detail"
  | "prices"
  | "orders"
  | "order-detail"
  | "payments"
  | "payment-detail"

const copy = {
  fr: {
    admin: "Admin",
    dashboard: "Operations commerce",
    customers: "Clients",
    customerDetail: "Detail client",
    products: "Produits",
    productNew: "Nouveau produit",
    productDetail: "Detail produit",
    offers: "Offres",
    offerDetail: "Detail offre",
    prices: "Prix",
    orders: "Commandes",
    orderDetail: "Detail commande",
    payments: "Paiements",
    paymentDetail: "Detail paiement",
    lead: "Vue operateur dense pour verifier catalogue, clients, commandes et paiements sans exposer de donnees provider sensibles.",
    preview:
      "Interface admin representative. Les actions d'ecriture, remboursements, publication et suppression restent desactivees tant que les services backend, autorisations et audits ne sont pas connectes.",
    search: "Recherche preview",
    filters: "Filtres",
    open: "Ouvrir",
    status: "Statut",
    customer: "Client",
    amount: "Montant",
    updated: "Mis a jour",
    action: "Action",
    provider: "Provider",
    safeProvider: "Reference provider masquee",
    noSecrets: "Aucun secret, payload provider complet ou cle complete n'est expose dans cette vue.",
    disabled: "Action non connectee",
    publish: "Publier",
    refund: "Rembourser",
    delete: "Supprimer",
    save: "Enregistrer",
    empty: "Aucune donnee representative.",
    notFound: "Element introuvable dans les fixtures admin.",
  },
  en: {
    admin: "Admin",
    dashboard: "Commerce operations",
    customers: "Customers",
    customerDetail: "Customer detail",
    products: "Products",
    productNew: "New product",
    productDetail: "Product detail",
    offers: "Offers",
    offerDetail: "Offer detail",
    prices: "Prices",
    orders: "Orders",
    orderDetail: "Order detail",
    payments: "Payments",
    paymentDetail: "Payment detail",
    lead: "Dense operator view for checking catalog, customers, orders and payments without exposing sensitive provider data.",
    preview:
      "Representative admin interface. Write actions, refunds, publishing and deletion remain disabled until backend services, authorization and audit trails are connected.",
    search: "Preview search",
    filters: "Filters",
    open: "Open",
    status: "Status",
    customer: "Customer",
    amount: "Amount",
    updated: "Updated",
    action: "Action",
    provider: "Provider",
    safeProvider: "Masked provider reference",
    noSecrets: "No secret, complete provider payload or complete key is exposed in this view.",
    disabled: "Action not connected",
    publish: "Publish",
    refund: "Refund",
    delete: "Delete",
    save: "Save",
    empty: "No representative data.",
    notFound: "Item not found in admin fixtures.",
  },
} as const

export function AdminCommercePage({
  kind,
  locale,
  resourceId,
}: {
  kind: AdminCommerceKind
  locale: Locale
  resourceId?: string
}) {
  const data = getAdminCommerceData(locale)

  if (kind === "dashboard") return <Dashboard data={data} locale={locale} />
  if (kind === "customers") return <Customers data={data} locale={locale} />
  if (kind === "customer-detail") return <CustomerDetail data={data} locale={locale} resourceId={resourceId} />
  if (kind === "products") return <Products data={data} locale={locale} />
  if (kind === "product-new") return <ProductNew locale={locale} />
  if (kind === "product-detail") return <ProductDetail data={data} locale={locale} resourceId={resourceId} />
  if (kind === "offers") return <Offers data={data} locale={locale} />
  if (kind === "offer-detail") return <OfferDetail data={data} locale={locale} resourceId={resourceId} />
  if (kind === "prices") return <Prices data={data} locale={locale} />
  if (kind === "orders") return <Orders data={data} locale={locale} />
  if (kind === "order-detail") return <OrderDetail data={data} locale={locale} resourceId={resourceId} />
  if (kind === "payments") return <Payments data={data} locale={locale} />
  return <PaymentDetail data={data} locale={locale} resourceId={resourceId} />
}

function Dashboard({ data, locale }: { data: AdminCommerceData; locale: Locale }) {
  const t = copy[locale]
  const paidTotal = data.orders.filter((order) => order.status === "paid").reduce((sum, order) => sum + order.totalMinor, 0)
  const cards = [
    { label: t.customers, value: data.customers.length, icon: UsersRound },
    { label: t.products, value: data.products.length, icon: Package },
    { label: t.orders, value: data.orders.length, icon: ReceiptText },
    { label: t.payments, value: formatMoney(paidTotal, "EUR", locale), icon: Banknote },
  ]

  return (
    <AdminFrame current={t.dashboard} locale={locale} title={t.dashboard}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <MetricCard icon={card.icon} key={card.label} label={card.label} value={String(card.value)} />
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
        <Card>
          <CardHeader>
            <CardTitle>{t.orders}</CardTitle>
            <CardDescription>{locale === "fr" ? "Derniers evenements commerciaux." : "Recent commerce events."}</CardDescription>
          </CardHeader>
          <CardContent>
            <OrdersTable data={data} locale={locale} rows={data.orders} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{locale === "fr" ? "Attention operateur" : "Operator attention"}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {data.customers.filter((customer) => customer.status === "needs_review").map((customer) => (
              <CompactLink
                href={routes.admin.customerDetail(locale, customer.id)}
                key={customer.id}
                label={customer.email}
                meta={locale === "fr" ? "Verification client requise" : "Customer review required"}
              />
            ))}
            {data.offers.filter((offer) => offer.status === "draft").map((offer) => (
              <CompactLink
                href={routes.admin.offerDetail(locale, offer.id)}
                key={offer.id}
                label={offer.name}
                meta={locale === "fr" ? "Offre brouillon" : "Draft offer"}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminFrame>
  )
}

function Customers({ data, locale }: { data: AdminCommerceData; locale: Locale }) {
  const t = copy[locale]

  return (
    <AdminFrame current={t.customers} locale={locale} title={t.customers}>
      <Toolbar locale={locale} />
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.customer}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.orders}</TableHead>
                <TableHead>{t.amount}</TableHead>
                <TableHead>{t.updated}</TableHead>
                <TableHead>{t.action}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="font-semibold">{customer.name}</div>
                    <div className="text-xs text-brand-slate">{customer.email}</div>
                  </TableCell>
                  <TableCell><StatusBadge status={customer.status} /></TableCell>
                  <TableCell>{customer.totalOrders}</TableCell>
                  <TableCell>{formatMoney(customer.totalSpentMinor, customer.currency, locale)}</TableCell>
                  <TableCell>{formatDate(customer.lastActivityAt, locale)}</TableCell>
                  <TableCell><OpenButton href={routes.admin.customerDetail(locale, customer.id)} locale={locale} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminFrame>
  )
}

function CustomerDetail({ data, locale, resourceId }: DetailProps) {
  const t = copy[locale]
  const customer = data.customers.find((item) => item.id === resourceId)
  if (!customer) return <NotFound locale={locale} />
  const orders = data.orders.filter((order) => order.customerId === customer.id)

  return (
    <AdminFrame current={customer.email} locale={locale} parent={{ href: routes.admin.customers(locale), label: t.customers }} title={t.customerDetail}>
      <DetailGrid
        cards={[
          { label: t.customer, value: customer.name },
          { label: "Email", value: customer.email },
          { label: "Locale", value: customer.locale },
          { label: t.status, value: <StatusBadge status={customer.status} /> },
        ]}
      />
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">{t.orders}</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="orders"><Card><CardContent className="pt-6"><OrdersTable data={data} locale={locale} rows={orders} /></CardContent></Card></TabsContent>
        <TabsContent value="notes"><ListCard items={customer.notes} title="Notes" /></TabsContent>
      </Tabs>
      <CautiousActions locale={locale} />
    </AdminFrame>
  )
}

function Products({ data, locale }: { data: AdminCommerceData; locale: Locale }) {
  const t = copy[locale]

  return (
    <AdminFrame
      actions={<Button asChild><Link href={routes.admin.productNew(locale)}><Package aria-hidden="true" />{t.productNew}</Link></Button>}
      current={t.products}
      locale={locale}
      title={t.products}
    >
      <Toolbar locale={locale} />
      <TableCard>
        {data.products.map((product) => (
          <ProductRow key={product.id} locale={locale} product={product} />
        ))}
      </TableCard>
    </AdminFrame>
  )
}

function ProductNew({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <AdminFrame current={t.productNew} locale={locale} parent={{ href: routes.admin.products(locale), label: t.products }} title={t.productNew}>
      <Alert variant="warning">{locale === "fr" ? "Creation preview: aucun produit n'est persiste." : "Preview creation: no product is persisted."}</Alert>
      <Card>
        <CardContent className="grid gap-4 pt-6 md:grid-cols-2">
          <Input disabled aria-label="Product name" placeholder={locale === "fr" ? "Nom produit" : "Product name"} />
          <Select disabled aria-label="Product type"><option>software</option><option>service</option></Select>
          <Textarea disabled aria-label="Product notes" className="md:col-span-2" placeholder={locale === "fr" ? "Notes catalogue internes" : "Internal catalog notes"} />
          <Button disabled className="w-fit" type="button">{t.disabled}</Button>
        </CardContent>
      </Card>
    </AdminFrame>
  )
}

function ProductDetail({ data, locale, resourceId }: DetailProps) {
  const t = copy[locale]
  const product = data.products.find((item) => item.id === resourceId)
  if (!product) return <NotFound locale={locale} />

  return (
    <AdminFrame current={product.name} locale={locale} parent={{ href: routes.admin.products(locale), label: t.products }} title={t.productDetail}>
      <DetailGrid
        cards={[
          { label: t.products, value: product.name },
          { label: "Slug", value: product.slug },
          { label: "Type", value: product.type },
          { label: t.status, value: <StatusBadge status={product.status} /> },
        ]}
      />
      <ListCard items={product.offers} title={t.offers} />
      <CautiousActions locale={locale} />
    </AdminFrame>
  )
}

function Offers({ data, locale }: { data: AdminCommerceData; locale: Locale }) {
  const t = copy[locale]

  return (
    <AdminFrame current={t.offers} locale={locale} title={t.offers}>
      <div className="grid gap-4 md:grid-cols-3">
        {data.offers.map((offer) => (
          <Card key={offer.id}>
            <CardHeader>
              <CardTitle>{offer.name}</CardTitle>
              <CardDescription>{offer.slug}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <StatusBadge status={offer.status} />
              <ListBlock items={offer.includes} />
              <OpenButton href={routes.admin.offerDetail(locale, offer.id)} locale={locale} />
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminFrame>
  )
}

function OfferDetail({ data, locale, resourceId }: DetailProps) {
  const t = copy[locale]
  const offer = data.offers.find((item) => item.id === resourceId)
  if (!offer) return <NotFound locale={locale} />

  return (
    <AdminFrame current={offer.name} locale={locale} parent={{ href: routes.admin.offers(locale), label: t.offers }} title={t.offerDetail}>
      <DetailGrid
        cards={[
          { label: t.offers, value: offer.name },
          { label: "Slug", value: offer.slug },
          { label: t.status, value: <StatusBadge status={offer.status} /> },
          { label: "Terms", value: offer.termsVersion },
        ]}
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <ListCard items={offer.includes} title={locale === "fr" ? "Inclus" : "Included"} />
        <ListCard items={offer.limits} title={locale === "fr" ? "Limites" : "Limits"} />
      </div>
      <CautiousActions locale={locale} />
    </AdminFrame>
  )
}

function Prices({ data, locale }: { data: AdminCommerceData; locale: Locale }) {
  const t = copy[locale]

  return (
    <AdminFrame current={t.prices} locale={locale} title={t.prices}>
      <Alert variant="info">{locale === "fr" ? "Les prix affiches sont des fixtures. Le navigateur n'est jamais source de verite pour un prix." : "Displayed prices are fixtures. The browser is never the source of truth for prices."}</Alert>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader><TableRow><TableHead>{t.prices}</TableHead><TableHead>{t.offers}</TableHead><TableHead>Region</TableHead><TableHead>{t.status}</TableHead></TableRow></TableHeader>
            <TableBody>
              {data.prices.map((price) => {
                const offer = data.offers.find((item) => item.id === price.offerId)
                return (
                  <TableRow key={price.id}>
                    <TableCell className="font-semibold">{formatMoney(price.amountMinor, price.currency, locale)}</TableCell>
                    <TableCell>{offer?.name ?? price.offerId}</TableCell>
                    <TableCell>{price.region}</TableCell>
                    <TableCell><StatusBadge status={price.status} /></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminFrame>
  )
}

function Orders({ data, locale }: { data: AdminCommerceData; locale: Locale }) {
  const t = copy[locale]
  return <AdminFrame current={t.orders} locale={locale} title={t.orders}><Toolbar locale={locale} /><Card><CardContent className="pt-6"><OrdersTable data={data} locale={locale} rows={data.orders} /></CardContent></Card></AdminFrame>
}

function OrderDetail({ data, locale, resourceId }: DetailProps) {
  const t = copy[locale]
  const order = data.orders.find((item) => item.id === resourceId)
  if (!order) return <NotFound locale={locale} />
  const customer = data.customers.find((item) => item.id === order.customerId)

  return (
    <AdminFrame current={order.number} locale={locale} parent={{ href: routes.admin.orders(locale), label: t.orders }} title={t.orderDetail}>
      <DetailGrid
        cards={[
          { label: t.orders, value: order.number },
          { label: t.customer, value: customer?.email ?? order.customerId },
          { label: t.amount, value: formatMoney(order.totalMinor, order.currency, locale) },
          { label: t.status, value: <StatusBadge status={order.status} /> },
        ]}
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <ListCard items={order.items.map((item) => `${item.quantity} x ${item.label}`)} title="Items" />
        <ListCard items={order.terms.map((term) => `${term.document} / ${term.version} / ${term.state}`)} title="Terms" />
      </div>
      <CautiousActions locale={locale} payment />
    </AdminFrame>
  )
}

function Payments({ data, locale }: { data: AdminCommerceData; locale: Locale }) {
  const t = copy[locale]

  return (
    <AdminFrame current={t.payments} locale={locale} title={t.payments}>
      <Alert variant="warning">{t.noSecrets}</Alert>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader><TableRow><TableHead>{t.payments}</TableHead><TableHead>{t.provider}</TableHead><TableHead>{t.amount}</TableHead><TableHead>{t.status}</TableHead><TableHead>{t.action}</TableHead></TableRow></TableHeader>
            <TableBody>
              {data.payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div className="font-mono text-xs">{payment.id}</div>
                    <div className="mt-1 text-xs text-brand-slate">{payment.eventIdPreview}</div>
                  </TableCell>
                  <TableCell>{payment.provider}<div className="text-xs text-brand-slate">{payment.providerReferencePreview}</div></TableCell>
                  <TableCell>{formatMoney(payment.amountMinor, payment.currency, locale)}</TableCell>
                  <TableCell><StatusBadge status={payment.status} /></TableCell>
                  <TableCell><OpenButton href={routes.admin.paymentDetail(locale, payment.id)} locale={locale} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminFrame>
  )
}

function PaymentDetail({ data, locale, resourceId }: DetailProps) {
  const t = copy[locale]
  const payment = data.payments.find((item) => item.id === resourceId)
  if (!payment) return <NotFound locale={locale} />
  const order = data.orders.find((item) => item.id === payment.orderId)

  return (
    <AdminFrame current={payment.id} locale={locale} parent={{ href: routes.admin.payments(locale), label: t.payments }} title={t.paymentDetail}>
      <Alert variant="warning">{t.noSecrets}</Alert>
      <DetailGrid
        cards={[
          { label: t.payments, value: payment.id },
          { label: t.provider, value: payment.provider },
          { label: t.safeProvider, value: payment.providerReferencePreview },
          { label: t.status, value: <StatusBadge status={payment.status} /> },
          { label: t.orders, value: order?.number ?? payment.orderId },
          { label: "Event", value: payment.eventIdPreview },
        ]}
      />
      <CautiousActions locale={locale} payment />
    </AdminFrame>
  )
}

type DetailProps = { data: AdminCommerceData; locale: Locale; resourceId?: string }

function AdminFrame({
  actions,
  children,
  current,
  locale,
  parent,
  title,
}: {
  actions?: ReactNode
  children: ReactNode
  current: string
  locale: Locale
  parent?: { href: string; label: string }
  title: string
}) {
  const t = copy[locale]

  return (
    <main className="grid min-w-0 gap-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href={routes.admin.dashboard(locale)}>{t.admin}</BreadcrumbLink></BreadcrumbItem>
          {parent ? <><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href={parent.href}>{parent.label}</BreadcrumbLink></BreadcrumbItem></> : null}
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{current}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <header className="rounded-xl border border-brand-border bg-white p-5 shadow-subtle">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="destructive">Admin</Badge>
              <Badge variant="orange">Sprint 11A</Badge>
              <Badge variant="outline">BRANDED</Badge>
            </div>
            <h1 className="mt-4 font-heading text-2xl font-extrabold text-brand-ink sm:text-3xl">{title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-brand-slate">{t.lead}</p>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </header>
      <Alert variant="info">{t.preview}</Alert>
      {children}
    </main>
  )
}

function Toolbar({ locale }: { locale: Locale }) {
  const t = copy[locale]

  return (
    <Card>
      <CardContent className="grid gap-3 pt-6 md:grid-cols-[minmax(0,1fr)_12rem_12rem]">
        <div className="relative">
          <Search aria-hidden="true" className="absolute left-3 top-3 size-4 text-brand-slate" />
          <Input disabled aria-label={t.search} className="pl-9" placeholder={t.search} />
        </div>
        <Select disabled aria-label={t.filters}><option>{t.status}</option></Select>
        <Select disabled aria-label="Segment"><option>{locale === "fr" ? "Tous segments" : "All segments"}</option></Select>
      </CardContent>
    </Card>
  )
}

function OrdersTable({ data, locale, rows }: { data: AdminCommerceData; locale: Locale; rows: AdminOrder[] }) {
  const t = copy[locale]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t.orders}</TableHead>
          <TableHead>{t.customer}</TableHead>
          <TableHead>{t.status}</TableHead>
          <TableHead>{t.amount}</TableHead>
          <TableHead>{t.action}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((order) => {
          const customer = data.customers.find((item) => item.id === order.customerId)
          return (
            <TableRow key={order.id}>
              <TableCell><div className="font-semibold">{order.number}</div><div className="text-xs text-brand-slate">{formatDate(order.placedAt, locale)}</div></TableCell>
              <TableCell>{customer?.email ?? order.customerId}</TableCell>
              <TableCell><StatusBadge status={order.status} /></TableCell>
              <TableCell>{formatMoney(order.totalMinor, order.currency, locale)}</TableCell>
              <TableCell><OpenButton href={routes.admin.orderDetail(locale, order.id)} locale={locale} /></TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

function ProductRow({ locale, product }: { locale: Locale; product: AdminProduct }) {
  const t = copy[locale]

  return (
    <TableRow>
      <TableCell><div className="font-semibold">{product.name}</div><div className="text-xs text-brand-slate">{product.slug}</div></TableCell>
      <TableCell>{product.type}</TableCell>
      <TableCell><StatusBadge status={product.status} /></TableCell>
      <TableCell>{formatDate(product.updatedAt, locale)}</TableCell>
      <TableCell><OpenButton href={routes.admin.productDetail(locale, product.id)} locale={locale} label={t.open} /></TableCell>
    </TableRow>
  )
}

function TableCard({ children }: { children: ReactNode }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader><TableRow><TableHead>Item</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Updated</TableHead><TableHead>Action</TableHead></TableRow></TableHeader>
          <TableBody>{children}</TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function DetailGrid({ cards }: { cards: Array<{ label: string; value: ReactNode }> }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => <InfoCard key={card.label} label={card.label} value={card.value} />)}
    </div>
  )
}

function InfoCard({ label, value }: { label: string; value: ReactNode }) {
  return <Card><CardContent className="p-5"><p className="text-xs font-semibold uppercase text-brand-slate">{label}</p><div className="mt-3 break-words font-semibold text-brand-ink">{value}</div></CardContent></Card>
}

function MetricCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return <Card><CardContent className="p-5"><Icon aria-hidden="true" className="size-5 text-danger" /><p className="mt-4 text-sm font-semibold text-brand-slate">{label}</p><p className="mt-2 font-heading text-2xl font-extrabold">{value}</p></CardContent></Card>
}

function ListCard({ items, title }: { items: string[]; title: string }) {
  return <Card><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent><ListBlock items={items} /></CardContent></Card>
}

function ListBlock({ items }: { items: string[] }) {
  return <ul className="grid gap-2 text-sm text-brand-slate">{items.map((item) => <li className="rounded-md border border-brand-border bg-white px-3 py-2" key={item}>{item}</li>)}</ul>
}

function CompactLink({ href, label, meta }: { href: string; label: string; meta: string }) {
  return <Link className="rounded-md border border-brand-border p-3 hover:border-brand-orange" href={href}><span className="block font-semibold">{label}</span><span className="mt-1 block text-xs text-brand-slate">{meta}</span></Link>
}

function OpenButton({ href, label, locale }: { href: string; label?: string; locale: Locale }) {
  return <Button asChild size="compact" variant="outline"><Link href={href}><ArrowUpRight aria-hidden="true" />{label ?? copy[locale].open}</Link></Button>
}

function CautiousActions({ locale, payment = false }: { locale: Locale; payment?: boolean }) {
  const t = copy[locale]
  const actions = payment ? [t.refund, t.delete] : [t.publish, t.delete]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{locale === "fr" ? "Actions prudentes" : "Cautious actions"}</CardTitle>
        <CardDescription>{locale === "fr" ? "Affichees pour le workflow operateur, desactivees sans backend." : "Shown for operator workflow, disabled without backend."}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Dialog key={action}>
            <DialogTrigger asChild><Button type="button" variant={action === t.delete ? "danger" : "outline"}><ShieldAlert aria-hidden="true" />{action}</Button></DialogTrigger>
            <DialogContent className="border-brand-border bg-white">
              <DialogHeader>
                <DialogTitle>{action}</DialogTitle>
                <DialogDescription>{t.preview}</DialogDescription>
              </DialogHeader>
              <DialogFooter><Button disabled type="button" variant="danger">{t.disabled}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button type="button" variant="outline"><MoreHorizontal aria-hidden="true" />More</Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{locale === "fr" ? "Operations" : "Operations"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled><AlertTriangle aria-hidden="true" />{t.disabled}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
}

function NotFound({ locale }: { locale: Locale }) {
  const t = copy[locale]
  return <AdminFrame current={t.notFound} locale={locale} title={t.notFound}><Alert variant="warning">{t.notFound}</Alert></AdminFrame>
}

function StatusBadge({ status }: { status: AdminStatus | AdminCustomer["status"] | AdminProduct["status"] | AdminOffer["status"] | AdminOrder["status"] | AdminPayment["status"] }) {
  const variants: Record<string, BadgeProps["variant"]> = {
    active: "success",
    paid: "success",
    verified: "success",
    draft: "orange",
    pending: "orange",
    needs_review: "orange",
    paused: "secondary",
    refunded: "secondary",
    failed: "destructive",
  }

  return <Badge variant={variants[status] ?? "outline"}>{status}</Badge>
}

function formatMoney(amountMinor: number, currency: "EUR" | "USD", locale: Locale) {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US", {
    currency,
    style: "currency",
  }).format(amountMinor / 100)
}

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
    dateStyle: "medium",
  }).format(new Date(`${date}T00:00:00.000Z`))
}
