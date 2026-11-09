/**
 * Ajda Dolenjska – oddaje obrazcev s spletne strani v Google Preglednice.
 *
 * Vsaka oddaja (prijava na dogodek, pristopnica, sporočilo, e-novice) se doda kot nova vrstica
 * na svoj list v tej preglednici. Stolpci se dodajo sami, ko obrazec pošlje novo polje.
 *
 * Namestitev:
 *  1. V preglednici odprite Razširitve → Apps Script, izbrišite vsebino in prilepite to datoteko.
 *  2. Po želji vpišite e-naslov v OBVESTILO_NA spodaj in shranite.
 *  3. Uvedi → Nova uvedba → vrsta: Spletna aplikacija.
 *     Izvedi kot: jaz. Kdo ima dostop: Kdor koli. Uvedi in odobrite dovoljenja.
 *  4. Kopirajte URL spletne aplikacije (konča se z /exec) in ga nastavite kot PUBLIC_FORM_ENDPOINT.
 *
 * Po vsaki spremembi kode: Uvedi → Upravljanje uvedb → Uredi → Različica: Nova različica.
 * Brez tega URL še naprej poganja staro kodo.
 */

/** E-naslov, ki ob vsaki oddaji dobi obvestilo. Prazno = brez obvestil. */
const OBVESTILO_NA = '';

/** Ime obrazca (data-form na spletni strani) → ime lista v preglednici. */
const LISTI = {
  prijava: 'Prijave na dogodke',
  vclanitev: 'Pristopnice',
  kontakt: 'Sporočila',
  'e-novice': 'E-novice',
};

/** Ime polja na obrazcu → naslov stolpca. Neznana polja dobijo stolpec s svojim imenom. */
const STOLPCI = {
  dogodek: 'Dogodek',
  termin: 'Termin',
  ime: 'Ime in priimek',
  email: 'E-naslov',
  telefon: 'Telefon',
  stevilo_oseb: 'Število oseb',
  opomba: 'Opomba',
  naslov: 'Naslov',
  vrsta: 'Kdo ste',
  tema: 'Zadeva',
  sporocilo: 'Sporočilo',
  izjava: 'Izjava o včlanitvi',
  soglasje: 'Soglasje',
};

const PREJETO = 'Prejeto';

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Polje, ki ga izpolnijo samo roboti.
  if (p._gotcha) return odgovor({ ok: true });

  const polja = Object.keys(p).filter((k) => k.charAt(0) !== '_');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const list = dobiList(LISTI[p._form] || 'Drugo');
    const glava = list.getLastColumn() > 0 ? list.getRange(1, 1, 1, list.getLastColumn()).getValues()[0] : [PREJETO];

    polja.forEach((k) => {
      if (glava.indexOf(naslov(k)) < 0) glava.push(naslov(k));
    });
    list.getRange(1, 1, 1, glava.length).setValues([glava]).setFontWeight('bold');
    list.setFrozenRows(1);

    const vrstica = glava.map((stolpec) => {
      if (stolpec === PREJETO) return new Date();
      const k = polja.find((polje) => naslov(polje) === stolpec);
      return k === undefined ? '' : besedilo(p[k]);
    });
    list.appendRow(vrstica);
  } finally {
    lock.releaseLock();
  }

  if (OBVESTILO_NA) obvesti(p, polja);
  return odgovor({ ok: true });
}

/** Odprite URL spletne aplikacije v brskalniku, da preverite, ali deluje. */
function doGet() {
  return ContentService.createTextOutput('Deluje. Obrazci s spletne strani se zapisujejo v preglednico.');
}

function dobiList(ime) {
  const preglednica = SpreadsheetApp.getActive();
  return preglednica.getSheetByName(ime) || preglednica.insertSheet(ime);
}

function naslov(polje) {
  return STOLPCI[polje] || polje;
}

/**
 * Vrednost zapiše kot besedilo: telefonska 040 ostane 040 (ne 40), vnos, ki se začne z =,
 * pa se ne izvede kot formula.
 */
function besedilo(vrednost) {
  const s = String(vrednost).slice(0, 5000);
  if (s === 'on') return 'Da';
  return s ? "'" + s : '';
}

function obvesti(p, polja) {
  const vrstice = polja.map((k) => naslov(k) + ': ' + (p[k] === 'on' ? 'Da' : p[k]));
  vrstice.push('', 'Preglednica: ' + SpreadsheetApp.getActive().getUrl());
  const sporocilo = {
    to: OBVESTILO_NA,
    subject: p._subject || 'Nova oddaja s spletne strani',
    body: vrstice.join('\n'),
  };
  if (/^[^@\s]+@[^@\s]+$/.test(p.email || '')) sporocilo.replyTo = p.email;
  MailApp.sendEmail(sporocilo);
}

function odgovor(podatki) {
  return ContentService.createTextOutput(JSON.stringify(podatki)).setMimeType(ContentService.MimeType.JSON);
}
