# Ajda Dolenjska – spletna stran

Prenova strani [ajda-dolenjska.si](https://www.ajda-dolenjska.si/) v [Astro](https://astro.build/) (statična stran, brez strežnika, brez piškotkov za sledenje).

## Zagon

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # preveri tipe in zgradi v dist/
npm run preview    # ogled zgrajene strani
```

Potrebno: Node 20.3+ (testirano na 20.19; gradnja na GitHubu teče na Node 22). Astro 5 je izbran namenoma, ker Astro 6/7 zahtevata Node 22.12+. Ko boste na Node 22, je nadgradnja enovrstična (`npm i astro@latest`) in odpravi obvestilo o ranljivosti pri `npm audit` (obdelava AVIF slik, ki je ne uporabljamo).

## Objava (GitHub Pages)

Vsaka sprememba na veji `main` se samodejno objavi prek [.github/workflows/deploy.yml](.github/workflows/deploy.yml), poleg tega se stran zgradi vsak dan ponoči.

- Predogled: <https://akvarij.github.io/ajda-dolenjska/>. Ker je stran v podmapi, gredo notranje povezave v kodi skozi `url()` iz [src/lib/url.ts](src/lib/url.ts), npr. `href={url('/kmetije/')}`. V Markdown vsebinah povezave pišete kot doslej (`/kmetije/`), podmapo doda gradnja.
- Predogled ima oznako `noindex`, zato ga iskalniki ne prikažejo. Indeksira se samo gradnja za pravo domeno (`site.url`).
- Lokalni ogled, enak GitHubovemu: `SITE=https://akvarij.github.io BASE=/ajda-dolenjska/ npm run build`, nato `npm run preview` z istima spremenljivkama in <http://localhost:4321/ajda-dolenjska/>.
- Prehod na `www.ajda-dolenjska.si`: v GitHubu (Settings → Pages → Custom domain) vpišite domeno, pri ponudniku DNS pa nastavite CNAME `www` → `akvarij.github.io`. Delovni tok novo domeno prevzame sam; stran je takrat v korenu domene in se indeksira.

## Kako je zgrajena

| Kaj                                                                | Kje                                                      |
| ------------------------------------------------------------------ | -------------------------------------------------------- |
| Podatki o društvu (naslov, kontakt, obrazci, družbena omrežja)     | [src/config/site.ts](src/config/site.ts)                 |
| Navigacija in zemljevid strani (glava, noga, razdelki, drobtinice) | [src/data/nav.ts](src/data/nav.ts)                       |
| Vsebine (Markdown)                                                 | [src/content/](src/content/)                             |
| Oblika vsebin (obvezna polja ...)                                  | [src/content.config.ts](src/content.config.ts)           |
| Barve, pisave, osnovni slogi                                       | [src/styles/global.css](src/styles/global.css) (`:root`) |
| Komponente (kartice, obrazci, koledar ...)                         | [src/components/](src/components/)                       |
| Animacije: polje v glavi (oblaki, cvetni prah, metulja)            | [src/components/FieldBackdrop.astro](src/components/FieldBackdrop.astro) |
| Animacije ob drsenju, plavajoča glava, gumb »na vrh«               | [src/scripts/motion.ts](src/scripts/motion.ts)           |
| Strani                                                             | [src/pages/](src/pages/)                                 |

### Vsebine

| Mapa v `src/content/` | Kaj                                                | Kje se pokaže                                        |
| --------------------- | -------------------------------------------------- | ---------------------------------------------------- |
| `events/`             | dogodki, tečaji, delavnice, izleti, srečanja       | koledar, Dejavnosti, domača stran, `.ics` za koledar |
| `news/`               | novice (`kind: novica`) in članki (`kind: clanek`) | Aktualno; po enem letu samodejno v Arhiv             |
| `farms/`              | kmetije članice                                    | Kmetije, zemljevid, domača stran                     |
| `albums/`             | foto galerije                                      | Aktualno → Fotografije                               |
| `documents/`          | datoteke za prenos (PDF ...)                       | Gradiva, Arhiv. Datoteko dajte v `public/dokumenti/` |
| `media/`              | video (YouTube/Vimeo) in avdio (.mp3)              | Aktualno → Video in avdio                            |
| `pages/`              | besedilne strani (Biodinamika, O društvu ...)      | pot datoteke je naslov strani                        |

Nov dogodek je ena datoteka, npr. `src/content/events/moj-dogodek.md`:

```md
---
title: 'Delavnica kompostiranja'
type: delavnica # dogodek | izobrazevanje | delavnica | izlet | srecanje
date: 2027-04-10
time: '09:00'
endTime: '12:00'
location: Kmetija Zupan
address: Gorenja vas pri Šmarjeti 13, 8220 Šmarješke Toplice
summary: 'Kratek opis za seznam in iskanje.'
registration:
    required: true
    deadline: 2027-04-07
---

Podroben opis dogodka.
```

Stran dogodka samodejno dobi obrazec za prijavo (če je `required: true`), zemljevid, navigacijo in gumb »Dodaj v koledar«. Pretekli dogodki se označijo kot »že potekel« in namesto prijave ponudijo e-novice.

> **Pomembno:** stran je statična, zato se »prihajajoče/pretekle« in »arhiv po enem letu« preračunajo ob vsaki gradnji. Zato se stran na GitHubu zgradi tudi vsak dan ponoči (`schedule` v [.github/workflows/deploy.yml](.github/workflows/deploy.yml)) in ostane točna, čeprav nihče ne objavi nove vsebine.

## Urejanje brez tehničnega znanja (2–3 osebe)

V [public/admin/](public/admin/) je pripravljen **Decap CMS**: urejevalnik v brskalniku na naslovu `/admin/`, ki piše v iste Markdown datoteke (vsaka sprememba je zapis v Gitu). Obrazci so v slovenščini in ustrezajo shemam vsebin.

Pred uporabo je treba:

1. Repozitorij je na GitHubu (`Akvarij/ajda-dolenjska`, nastavljeno v [public/admin/config.yml](public/admin/config.yml)).
2. Urediti prijavo urednikov: na Netlify jo ponudi vgrajeno, drugje je potreben majhen OAuth posrednik ([navodila Decap](https://decapcms.org/docs/github-backend/)).
3. Lokalni preizkus: `npx decap-server` v drugem oknu, nato `/admin/` ob `npm run dev`.

> Konfiguracija se razčleni brez napak in vsa polja obstajajo v shemah, vendar je nisem preizkusil proti pravemu GitHub računu.

## Obrazci

Kontakt, včlanitev, prijava na dogodek in e-novice delujejo **brez strežnika**:

- Če v `.env` nastavite `PUBLIC_FORM_ENDPOINT` (npr. [Formspree](https://formspree.io/), [Web3Forms](https://web3forms.com/)), se podatki pošljejo tja.
- Če ne, se odpre e-poštni program obiskovalca s predizpolnjenim sporočilom (`site.forms.fallbackEmail`).
- E-novice: `PUBLIC_NEWSLETTER_ENDPOINT` (Mailchimp, Brevo, Buttondown ...) in enak mailto: nadomestek.

Kopirajte `.env.example` v `.env`. Obrazci imajo vabo za robote (honeypot) in obvezno soglasje.

## Iskanje

Iskanje na `/iskanje/` poteka v brskalniku nad datoteko `search-index.json`, ki nastane ob gradnji. Ne razlikuje šumnikov (»izobrazevanja« najde »Izobraževanja«). Dodatnih storitev ne potrebuje.

## Zasebnost

Zemljevidi (Google) in video (YouTube/Vimeo) se naložijo šele po kliku na gumb, pisave so lastne. Stran zato ne potrebuje piškotkovnega obvestila, dokler ne dodate analitike ali drugih vdelav. Besedilo na `/zasebnost/` je izhodišče in ga mora pregledati odgovorna oseba društva.

## Starejši naslovi

Stari naslovi WordPress (`/pridelovalci`, `/ekoloska-kmetija-*`, `/kontakti`, `/setveni-koledar`, `/category/galerija`) so preusmerjeni v [astro.config.mjs](astro.config.mjs).

## Predloge, ki jih je treba zamenjati

Naslednje je **vzorčno** in ga je treba nadomestiti z resničnim gradivom:

- **Fotografije.** Povsod, kjer ni slike, je narisana ilustracija ([src/lib/scene.js](src/lib/scene.js)); galeriji in PDF-ji so ustvarjeni z `node scripts/generate-sample-assets.mjs`. Prave fotografije dodajte v vsebine (`image:`).
- **Fotografije polja ajde** v [src/assets/photos/](src/assets/photos/) (glava domače strani, glave podstrani, uvod, pas »Včlanitev«) so z [Unsplash](https://unsplash.com/license) (brezplačna uporaba, navedba avtorja ni obvezna). Ko bo društvo imelo lastne fotografije, zamenjajte datoteke z istim imenom: `polje-ajde.jpg` (široka krajina z nebom v zgornji polovici), `ajda-cvet.jpg`, `cvetoca-ajda.jpg`.
- **Logotip.** Iz obstoječe JPG datoteke (248 px / 939 px) je narejen prosojen PNG ([src/assets/brand/](src/assets/brand/)). Za oster izris na vseh zaslonih potrebujete vektorsko datoteko (SVG).
- **Dogodki, novice, članki, galerije, dokumenti** so primeri. Izjema so podatki o kmetijah in kontaktih, prepisani s stare strani.
- **Vodstvo** vsebuje samo kontaktno osebo.
- **Davčna številka** v nogi je prepisana s stare strani (»SI79287379«); preverite oznako.

## Odprta vprašanja

- **Članski del** (iz načrta): `/clani/` je za zdaj pregled bližnjic za člane brez prijave, saj statična stran ne more varovati vsebin. Za pravo prijavo je treba izbrati gostovanje z zaščito (npr. Cloudflare Access ali Netlify z geslom) ali ločeno aplikacijo. Takrat se lahko gumba »Postani član« za prijavljene člane skrijeta (oznaka `data-join` je že na vseh).
- **Objave iz družbenih omrežij po #oznaki:** zahteva zunanjo storitev (npr. Behold, Elfsight) ali Meta API s ključem. Povezave do profilov nastavite v `site.social`; prikažejo se samo izpolnjene.
- **Prijava na dogodke z omejenim številom mest** in potrditvena e-pošta zahtevata zalednega ponudnika obrazcev.
- **Animacije** so dodane (počasen zoom fotografije, oblaki, cvetni prah, metulja, razkrivanje ob drsenju). Obiskovalci, ki imajo v sistemu vklopljeno »zmanjšano gibanje«, vidijo mirno stran brez premikanja.
