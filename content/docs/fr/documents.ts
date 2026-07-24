import type { DocumentationContentDocument } from "@/content/shared/document-types"

const review = {
  locale: "fr",
  productVersionRange: "theme:unreleased-v1",
  lastReviewedAt: "2026-07-15",
  reviewStatus: "TECH_REVIEW",
  visibility: "public",
  owner: "documentation",
} as const

export const frenchDocumentationDocuments: DocumentationContentDocument[] = [
  {
    ...review,
    id: "docs.home",
    slug: "",
    title: "Documentation client",
    summary: "Mode d'emploi versionne pour installer, activer, configurer et maintenir le Template Engine.",
    relatedLinks: ["/fr/docs/getting-started", "/fr/docs/requirements", "/fr/legal/software-license"],
    sections: [
      {
        id: "orientation",
        title: "Parcours principal",
        body: [
          "Commence par les pre-requis, puis l'installation, l'activation officielle et la configuration initiale.",
          "Les guides restent en brouillon technique tant que la premiere release theme n'est pas validee.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.getting-started",
    slug: "getting-started",
    title: "Demarrage rapide",
    summary: "Vue d'ensemble des etapes pour passer du compte client a une boutique testable.",
    relatedLinks: ["/fr/docs/requirements", "/fr/docs/installation", "/fr/docs/activation"],
    sections: [
      {
        id: "checklist",
        title: "Checklist",
        body: [
          "Verifier l'offre active, telecharger le bon paquet, preparer un WordPress propre et garder la cle privee.",
          "Effectuer un test de commande apres activation WooCommerce et avant toute mise en production.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.requirements",
    slug: "requirements",
    title: "Pre-requis",
    summary: "Elements a confirmer avant installation sans annoncer de compatibilite non testee.",
    relatedLinks: ["/fr/docs/installation", "/fr/docs/backup-rollback"],
    sections: [
      {
        id: "hosting",
        title: "Environnement",
        body: [
          "Prevoir WordPress, WooCommerce, SSL, sauvegarde, acces administrateur et capacite d'upload suffisante.",
          "Les versions PHP/WooCommerce exactes seront publiees seulement apres matrice de tests.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.installation",
    slug: "installation",
    title: "Installation",
    summary: "Installer le paquet theme officiel sans confondre ZIP produit, sources privees et documentation.",
    relatedLinks: ["/fr/docs/activation", "/fr/docs/troubleshooting"],
    sections: [
      {
        id: "package",
        title: "Paquet officiel",
        body: [
          "Telecharger le fichier depuis le compte client lorsque l'entitlement le permet.",
          "Verifier le nom, la version et le checksum exposes par la plateforme avant l'upload WordPress.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.activation",
    slug: "activation",
    title: "Activation officielle",
    summary: "Comprendre la cle technique, les limites d'activation et les environnements production/staging.",
    relatedLinks: ["/fr/account/licenses", "/fr/legal/software-license", "/fr/docs/updates"],
    sections: [
      {
        id: "limits",
        title: "Limites d'activation",
        body: [
          "La cle donne acces aux services officiels: mises a jour, metadonnees et support selon l'offre active.",
          "Production et staging doivent etre declares comme installations distinctes lorsque le service sera connecte.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.initial-setup",
    slug: "initial-setup",
    title: "Configuration initiale",
    summary: "Configurer WooCommerce, langue, devise, pages et controles de base.",
    relatedLinks: ["/fr/docs/shop-models", "/fr/docs/products", "/fr/docs/payments"],
    sections: [
      {
        id: "woocommerce",
        title: "Verification WooCommerce",
        body: [
          "Controler les pages panier, commande, compte client, devise, taxes et emails avant d'importer un catalogue.",
          "Chaque changement majeur doit etre teste sur staging ou avec une sauvegarde exploitable.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.shop-models",
    slug: "shop-models",
    title: "Modeles de boutique",
    summary: "Comparer dropshipping, stock, hybride et digital avant configuration.",
    relatedLinks: ["/fr/use-cases", "/fr/docs/niches", "/fr/docs/products"],
    sections: [
      {
        id: "models",
        title: "Choix operationnel",
        body: [
          "Le modele choisi influence le catalogue, les emails, la livraison, les stocks et les responsabilites support.",
          "Les scenarios sont explicatifs et ne constituent pas une promesse de performance.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.niches",
    slug: "niches",
    title: "Niches et contenus",
    summary: "Preparer les contenus de demonstration et limites d'usage.",
    relatedLinks: ["/fr/docs/shop-models", "/fr/docs/customization"],
    sections: [
      {
        id: "content",
        title: "Contenu client",
        body: [
          "Le client reste responsable des textes, images, prix, obligations reglementaires et promesses commerciales.",
          "Les visuels de demo doivent etre remplaces par des actifs autorises avant production.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.localization",
    slug: "localization",
    title: "Localisation",
    summary: "Configurer langue, devise, textes et formats sans melanger les locales.",
    relatedLinks: ["/fr/docs/initial-setup", "/fr/docs/customization"],
    sections: [
      {
        id: "locale",
        title: "Langue source",
        body: [
          "Le francais est la source editoriale initiale; l'anglais doit rester synchronise avec les memes IDs de contenu.",
          "Les captures et libelles doivent suivre l'interface active.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.products",
    slug: "products",
    title: "Produits",
    summary: "Creer les produits, variations et stocks selon le modele choisi.",
    relatedLinks: ["/fr/docs/shop-models", "/fr/docs/payments"],
    sections: [
      {
        id: "catalog",
        title: "Catalogue",
        body: [
          "Commencer par quelques produits de test, verifier prix, taxes, livraison et emails avant l'import massif.",
          "Les produits digitaux doivent etre testes avec livraison et acces client separes.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.payments",
    slug: "payments",
    title: "Paiements",
    summary: "Verifier les moyens de paiement WooCommerce et les commandes de test.",
    relatedLinks: ["/fr/docs/initial-setup", "/fr/docs/troubleshooting"],
    sections: [
      {
        id: "checkout",
        title: "Test de commande",
        body: [
          "Activer un mode test chez le fournisseur de paiement choisi et verifier le parcours panier/commande/compte.",
          "Les problemes de compte marchand ou reglementation ne sont pas des actions automatiques de la plateforme.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.customization",
    slug: "customization",
    title: "Personnalisation",
    summary: "Adapter marque, couleurs, sections et limites de modification.",
    relatedLinks: ["/fr/docs/localization", "/fr/legal/trademark"],
    sections: [
      {
        id: "safe",
        title: "Limites sures",
        body: [
          "Utiliser les options approuvees ou un child theme pour les changements de code lorsque ce sera documente.",
          "Eviter les modifications directes du paquet officiel qui bloquent les mises a jour propres.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.updates",
    slug: "updates",
    title: "Mises a jour",
    summary: "Preparer sauvegarde, staging, verification changelog et rollback.",
    relatedLinks: ["/fr/docs/backup-rollback", "/fr/docs/releases/1.0.0"],
    sections: [
      {
        id: "process",
        title: "Processus",
        body: [
          "Lire le changelog, sauvegarder, tester en staging, valider checkout et compte client, puis deployer.",
          "L'acces expire peut limiter les mises a jour officielles sans retirer les droits sur le code deja recu.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.backup-rollback",
    slug: "backup-rollback",
    title: "Sauvegarde et retour arriere",
    summary: "Preparer une sauvegarde exploitable avant installation ou mise a jour.",
    relatedLinks: ["/fr/docs/updates", "/fr/docs/troubleshooting"],
    sections: [
      {
        id: "rollback",
        title: "Retour arriere",
        body: [
          "Verifier que fichiers et base de donnees peuvent etre restaures ensemble.",
          "Documenter l'heure, la version et les controles effectues avant de toucher la production.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.troubleshooting",
    slug: "troubleshooting",
    title: "Depannage",
    summary: "Identifier les erreurs courantes et escalader sans partager de secrets.",
    relatedLinks: ["/fr/account/support", "/fr/docs/faq"],
    sections: [
      {
        id: "diagnostics",
        title: "Informations sures",
        body: [
          "Partager version, etapes, message d'erreur nettoye et captures sans cle, token, mot de passe ou donnees client.",
          "Distinguer erreurs theme, plugin tiers, hebergement, cache/CDN et paiement.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.faq",
    slug: "faq",
    title: "FAQ documentation",
    summary: "Questions frequentes sur installation, activation, mises a jour et support.",
    relatedLinks: ["/fr/faq", "/fr/docs/troubleshooting"],
    sections: [
      {
        id: "answers",
        title: "Reponses courtes",
        body: [
          "Les reponses restent operationnelles et renvoient vers les pages legales lorsqu'une regle commerciale est impliquee.",
          "Aucune question ne doit introduire une promesse non approuvee.",
        ],
      },
    ],
  },
  {
    ...review,
    id: "docs.release-1.0.0",
    slug: "releases/1.0.0",
    title: "Release 1.0.0",
    summary: "Structure de notes release pour la premiere version customer-ready.",
    releaseVersion: "1.0.0",
    relatedLinks: ["/fr/docs/updates", "/fr/docs/installation"],
    sections: [
      {
        id: "contract",
        title: "Contrat de release",
        body: [
          "La release doit fournir LICENSE.txt, COPYRIGHT.md, THIRD_PARTY_NOTICES.md, README.md, QUICKSTART.md, INSTALLATION.md, UPGRADE.md, TROUBLESHOOTING.md et CHANGELOG.md.",
          "Ce depot definit le contrat de verification; il ne contient pas le ZIP theme prive.",
        ],
      },
    ],
  },
] satisfies DocumentationContentDocument[]
