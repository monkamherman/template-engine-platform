# Sprint 02 — Identité visuelle et fondation UI

## Objectif

Définir, valider et implémenter la charte graphique de la plateforme commerciale avant la création des pages marketing complètes.

Le Sprint 02 doit produire une identité originale, cohérente et exploitable dans l’application Next.js : logo, couleurs, typographies, tokens, primitives UI et page de référence du design system.

Ce sprint ne doit pas construire la page d’accueil commerciale finale, le checkout réel, l’espace client complet ou l’administration métier.

---

## Contexte de marque

Nom de travail : **Template Engine Platform**.

Le produit commercialise et accompagne un moteur de templates WooCommerce capable de s’adapter à plusieurs :

- niches ;
- pays et marchés ;
- langues ;
- devises ;
- modèles commerciaux : dropshipping, stock et hybride.

La marque doit transmettre :

- modularité ;
- rapidité de lancement ;
- technologie maîtrisée ;
- fiabilité commerciale ;
- flexibilité ;
- simplicité d’utilisation ;
- positionnement premium mais accessible.

La marque ne doit pas ressembler à :

- une boutique dropshipping générique ;
- une agence web traditionnelle ;
- un produit crypto ;
- un outil d’intelligence artificielle caricatural ;
- une marque construite autour d’un panier, d’un robot ou du logo WooCommerce.

---

## Direction créative approuvée pour exploration

### Concept général

**Premium Tech modulaire**.

La base visuelle doit être sobre, géométrique et crédible. L’énergie commerciale est apportée par un accent orange utilisé avec discipline.

Signature visuelle :

> Une base noire et ivoire, activée par une énergie orange.

### Référence stylistique

Le logo peut être inspiré par le langage formel d’un monogramme géométrique composé de lignes épaisses, continues et arrondies.

Cette référence sert uniquement à identifier des qualités visuelles :

- monoline épais ;
- géométrie simple ;
- angles très arrondis ;
- lettres imbriquées ;
- continuité du tracé ;
- forte lisibilité en noir et blanc ;
- capacité à fonctionner en petit format.

Il est interdit de :

- retracer ou reproduire la référence ;
- conserver la même construction, les mêmes proportions ou le même entrelacement ;
- livrer une variante qui pourrait être confondue avec le logo de référence ;
- utiliser une icône ou une marque existante comme base non déclarée.

Le résultat doit être une création originale.

---

## Monogramme

### Direction principale

Explorer prioritairement un monogramme **TE** pour « Template Engine ».

Le symbole doit suggérer :

- une fondation commune ;
- des modules emboîtés ;
- un moteur ou un système ;
- plusieurs configurations issues d’une même structure ;
- un mouvement fluide et maîtrisé.

### Direction secondaire

Une construction **TEP** peut être explorée uniquement si elle reste clairement lisible à petite taille.

Ne pas imposer trois lettres dans le symbole si cela dégrade :

- la mémorisation ;
- l’équilibre ;
- la lisibilité ;
- l’utilisation comme favicon.

### Contraintes du symbole

- tracé uniforme ;
- formes vectorielles simples ;
- extrémités et jonctions arrondies ;
- silhouette reconnaissable sans texte ;
- fonctionnement en monochrome ;
- lisibilité minimale à 24 px ;
- absence d’effets 3D, ombres internes, textures ou dégradés obligatoires ;
- absence d’éléments littéraux comme panier, colis, robot, cerveau, fusée ou étincelle IA.

---

## Étape 1 — Exploration du logo

Créer trois propositions réellement différentes :

### Concept A — Monoline continu

- construction TE avec un tracé visuellement continu ;
- sensation de moteur et de circulation ;
- silhouette compacte ;
- excellente version monochrome.

### Concept B — Modules emboîtés

- T structurel ;
- E construit avec des segments ou niveaux modulaires ;
- évocation des niches, langues et marchés interchangeables ;
- équilibre entre technologie et accessibilité.

### Concept C — Portail ou système

- TE construit comme une entrée, un cadre ou un système ouvert ;
- idée d’une base prête à recevoir les produits du client ;
- géométrie originale sans ressembler à une icône de cloud ou de paiement.

### Livrables d’exploration

Créer :

```text
public/brand/concepts/concept-a.svg
public/brand/concepts/concept-b.svg
public/brand/concepts/concept-c.svg
```

Chaque SVG doit :

- utiliser des formes vectorielles propres ;
- avoir un `viewBox` cohérent ;
- ne pas contenir de bitmap embarqué ;
- ne pas dépendre d’une police externe pour le symbole ;
- être accompagné d’une version noire sur fond transparent ;
- avoir un nom et une courte justification dans la page du design system.

### Point de validation obligatoire

Codex ne doit pas choisir la proposition finale.

Après avoir créé les trois concepts, il doit :

1. les présenter côte à côte dans la page de référence ;
2. expliquer les différences ;
3. vérifier leur rendu à 24, 32, 48 et 96 px ;
4. attendre la validation explicite du responsable produit.

Le logo final ne peut être consolidé qu’après cette validation.

---

## Palette de couleurs

### Couleurs principales

| Token | Usage | Valeur |
|---|---|---|
| `brand-ink` | texte et logo principaux | `#0B0B0C` |
| `brand-ivory` | fond chaleureux principal | `#F4F0E7` |
| `brand-canvas` | fond clair neutre | `#FAFAF7` |
| `brand-slate` | texte secondaire | `#3A404C` |
| `brand-border` | bordures et séparateurs | `#D9DCE2` |

### Accent commercial

| Token | Usage | Valeur |
|---|---|---|
| `brand-orange` | action principale | `#FF6B00` |
| `brand-orange-strong` | interaction active ou hover | `#D94F00` |
| `brand-orange-soft` | fond d’accent léger | `#FFF0E5` |

### Règles d’utilisation

- le logo principal doit fonctionner en noir sur ivoire ou blanc cassé ;
- l’orange sert aux actions, états actifs et informations de conversion ;
- ne pas utiliser l’orange comme fond dominant de toutes les sections ;
- les textes longs doivent rester noirs ou slate sur fond clair ;
- chaque combinaison doit respecter un contraste lisible ;
- les couleurs fonctionnelles de succès, erreur, avertissement et information doivent être distinctes de la couleur de marque.

### Couleurs fonctionnelles à définir

Créer des tokens sémantiques pour :

- `success` ;
- `warning` ;
- `danger` ;
- `info` ;
- `focus-ring` ;
- `muted` ;
- `surface` ;
- `surface-elevated`.

Ne pas remplacer les couleurs fonctionnelles par l’orange de marque.

---

## Typographie

### Titres et identité

Utiliser **Manrope** pour :

- titres de pages ;
- grands messages marketing ;
- titres de sections ;
- chiffres ou messages de forte importance.

Graisses recommandées : `600`, `700` et `800`.

### Texte et interface

Utiliser **Inter** pour :

- paragraphes ;
- formulaires ;
- boutons ;
- navigation ;
- tableaux ;
- données du compte client et de l’administration.

Graisses recommandées : `400`, `500`, `600` et `700`.

### Intégration technique

- intégrer les polices avec la solution native du projet Next.js ;
- éviter les requêtes de police côté navigateur lorsqu’une intégration locale au build est disponible ;
- exposer des variables CSS dédiées aux familles de titres et de texte ;
- définir une pile de secours système ;
- ne pas importer les mêmes polices plusieurs fois dans différents composants.

---

## Système de tokens

Créer une couche de tokens sémantiques et éviter l’utilisation répétée de valeurs hexadécimales directement dans les composants.

Structure recommandée :

```text
src/styles/
  tokens.css
  globals.css
```

Les tokens doivent couvrir au minimum :

- couleurs de marque ;
- couleurs sémantiques ;
- typographies ;
- tailles de texte ;
- hauteurs de ligne ;
- espacements principaux ;
- rayons ;
- bordures ;
- ombres ;
- durées et courbes d’animation ;
- largeurs de conteneur ;
- niveaux de superposition.

### Rayons recommandés

| Usage | Valeur indicative |
|---|---|
| petit contrôle | `8px` |
| bouton et champ | `10px` à `12px` |
| carte | `16px` à `20px` |
| grand panneau | `24px` à `32px` |

Les valeurs finales doivent être centralisées dans les tokens.

### Ombres

Préférer :

- les bordures fines ;
- la différence de surface ;
- les ombres discrètes.

Éviter les cartes flottantes avec ombres fortes sur chaque section.

---

## Fondation UI

Créer ou normaliser les primitives suivantes :

```text
Button
IconButton
LinkButton
Badge
Card
Input
Textarea
Select
Checkbox
RadioGroup
Label
FormField
Alert
Container
Section
Stack
Cluster
Divider
LogoMark
LogoLockup
```

### Variantes minimales des boutons

- `primary` : fond orange, texte contrasté ;
- `secondary` : fond noir, texte clair ;
- `outline` : fond transparent, bordure visible ;
- `ghost` : faible emphase ;
- `danger` : réservé aux actions destructives.

Chaque bouton doit gérer :

- taille standard et compacte ;
- état hover ;
- état focus clavier visible ;
- état disabled ;
- état loading sans modification brutale de largeur ;
- icône optionnelle ;
- libellé accessible.

### Cartes

Prévoir au moins :

- carte de fonctionnalité ;
- carte de tarification ;
- carte d’information ;
- carte de tableau de bord.

Le Sprint 02 construit les primitives et exemples, pas les pages commerciales finales.

---

## Page de référence du design system

Créer une page interne bilingue :

```text
/fr/design-system
/en/design-system
```

Cette page doit présenter :

- les trois concepts de logo ;
- les tailles de test du monogramme ;
- la palette et ses tokens ;
- les combinaisons de contraste principales ;
- les styles typographiques ;
- les boutons ;
- les champs ;
- les badges ;
- les alertes ;
- les cartes ;
- les espacements et rayons ;
- les états focus, disabled, loading et erreur.

Cette page n’est pas une page marketing publique finale. Elle sert de source visuelle de validation pendant le développement.

---

## Accessibilité et responsive

### Accessibilité

- HTML sémantique ;
- navigation complète au clavier ;
- focus visible ;
- labels associés aux champs ;
- contraste contrôlé ;
- icônes décoratives masquées des technologies d’assistance ;
- textes alternatifs pertinents pour les images informatives ;
- support de `prefers-reduced-motion` ;
- ne pas transmettre une information uniquement par la couleur.

### Responsive

Tester au minimum :

- `320px` ;
- `375px` ;
- `768px` ;
- `1024px` ;
- `1440px`.

Le design system doit rester utilisable sans débordement horizontal à 320 px.

---

## Identité finale après validation

Après choix explicite du concept de logo, produire :

```text
public/brand/logo-mark.svg
public/brand/logo-lockup-horizontal.svg
public/brand/logo-lockup-stacked.svg
public/brand/logo-mark-white.svg
public/brand/logo-mark-black.svg
public/brand/favicon.svg
```

Ajouter un document :

```text
docs/brand-guidelines.md
```

Il doit documenter :

- construction du logo ;
- zone de protection ;
- taille minimale ;
- variantes autorisées ;
- fonds autorisés ;
- usages interdits ;
- palette ;
- typographie ;
- principes d’interface.

Ne pas inventer une zone de protection complexe : utiliser une règle simple basée sur une unité mesurable du symbole.

---

## Hors périmètre

Ne pas implémenter pendant ce sprint :

- la landing page finale ;
- la page produit complète ;
- le tunnel de paiement ;
- le portail client fonctionnel ;
- l’administration fonctionnelle ;
- des illustrations marketing complexes ;
- des témoignages ou logos clients fictifs ;
- un mode sombre complet, sauf si les composants existants l’exigent déjà et que son maintien est peu coûteux ;
- un rebranding du thème WooCommerce dans l’autre dépôt ;
- une animation avancée du logo.

---

## Séquence d’exécution

### Phase 1 — Audit

1. lire `AGENTS.md` et les documents de référence ;
2. vérifier la fin réelle du Sprint 01 ;
3. auditer les composants UI existants ;
4. identifier les dépendances inutiles ou dupliquées ;
5. confirmer l’emplacement actuel des styles et de la configuration Tailwind.

### Phase 2 — Tokens et typographie

1. créer les tokens ;
2. intégrer Manrope et Inter ;
3. mapper les tokens dans la configuration existante ;
4. supprimer les couleurs génériques contradictoires lorsqu’elles ne sont plus utilisées ;
5. documenter les décisions.

### Phase 3 — Concepts de logo

1. produire les trois concepts originaux ;
2. ajouter les tests de taille ;
3. documenter chaque concept ;
4. présenter les variantes dans la page du design system ;
5. demander la validation produit.

### Phase 4 — Primitives UI

1. normaliser les composants ;
2. appliquer les tokens ;
3. couvrir les états interactifs ;
4. ajouter les exemples bilingues ;
5. vérifier mobile et clavier.

### Phase 5 — Consolidation après validation

1. intégrer le concept sélectionné ;
2. générer les variantes finales ;
3. créer le favicon ;
4. créer `docs/brand-guidelines.md` ;
5. supprimer ou archiver proprement les concepts refusés selon la décision du responsable produit.

---

## Tests attendus

Ajouter des tests pertinents pour :

- variantes de boutons ;
- état disabled et loading ;
- rendu du logo sans erreur ;
- présence des labels accessibles ;
- navigation de base vers la page du design system ;
- validation des locales `fr` et `en` ;
- absence de débordement évident dans les composants principaux.

Exécuter les commandes définies par le dépôt, notamment :

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Documenter toute commande non exécutable et sa cause.

---

## Critères d’acceptation

Le Sprint 02 est terminé uniquement lorsque :

- trois concepts de logo originaux ont été présentés ;
- un concept a été explicitement validé par le responsable produit ;
- le logo final existe en SVG et reste lisible à 24 px ;
- la palette est implémentée avec des tokens sémantiques ;
- Manrope et Inter sont intégrées sans duplication ;
- les primitives UI utilisent les tokens ;
- les états focus, disabled, loading et erreur sont visibles ;
- `/fr/design-system` et `/en/design-system` compilent et affichent tous les éléments ;
- aucun contenu client fictif n’a été ajouté ;
- aucun secret ou actif propriétaire du thème WooCommerce n’a été ajouté ;
- lint, typecheck, tests et build passent ;
- `docs/brand-guidelines.md` correspond exactement aux actifs finaux.

---

## Branche d’implémentation

Après fusion de ce document dans `main`, exécuter le sprint sur :

```text
feat/sprint-02-brand-system
```

La pull request d’implémentation doit rester en brouillon jusqu’à la validation du logo et au passage de toutes les vérifications.