# Image Folder Structure - 2026 Update

## Änderung: Separate Verzeichnisse für series2026 und pilots2026

Seit 2026 verwenden wir separate Unterverzeichnisse für jedes Jahr:

```
/site/static/img/
  ├── series/           (2019-2025)
  ├── series2026/       (NEU - nur 2026)
  ├── pilots/           (2019-2025)
  └── pilots2026/       (NEU - nur 2026)
```

## CMS Konfiguration

Die CMS-Helper-Funktionen wurden angepasst (siehe `src/js/cms.jsx`):

```javascript
// Helper to create series collection
const createSeriesCollection = (year) => ({
  name: `series${year}`,
  label: `${year} / Series`,
  folder: `site/content/series${year}`,
  media_folder: `site/static/img/series${year}`,    // Absoluter Pfad!
  public_folder: `/img/series${year}`,               // Öffentlicher Pfad!
  create: true,
  slug: "{{slug}}",
  fields: seriesFields,
});
```

**Wichtig:** 
- `media_folder` = physischer Speicherort (absoluter Pfad vom Projekt-Root)
- `public_folder` = URL-Pfad für die Website

### Was bedeutet das?

- **2026**: Bilder werden in `/img/series2026/` gespeichert
- **2025**: Bilder werden in `/img/series/` gespeichert (alt)
- **2027+**: Bilder werden in `/img/series2027/` gespeichert (zukünftig)

## Bild-Upload im CMS

Wenn du im CMS auf einer **series2026** oder **pilots2026** Seite ein Bild hochlädst:

1. ✅ **Vorschau zeigt**: `/img/series2026/filename.jpg`
2. ✅ **Bild wird gespeichert in**: `/site/static/img/series2026/`
3. ✅ **MD-Datei referenziert**: `image: /img/series2026/filename.jpg`

Für ältere Jahre (2019-2025) bleibt alles beim alten:
- Vorschau: `/img/series/filename.jpg`
- Speicherort: `/site/static/img/series/`

## Optimize-Images Skript

Das Skript `scripts/optimize-images.js` funktioniert automatisch:

```javascript
function getConfig(folderName) {
  for (const [key, config] of Object.entries(CONFIG)) {
    if (folderName.startsWith(key) || folderName === key) {
      return config;
    }
  }
  return null;
}
```

- `'series2026'.startsWith('series')` = true → 1080x608px
- `'pilots2026'.startsWith('pilots')` = true → 1080x608px

**Verwendung:**
```bash
npm run optimize-images
```

Alle Bilder in `series2026/` und `pilots2026/` werden automatisch optimiert!

## Vorteile der neuen Struktur

✅ **Klare Trennung** - Jedes Jahr hat eigene Bilder
✅ **Keine Namenskonflikte** - Verschiedene Jahre können gleiche Dateinamen haben
✅ **Einfaches Cleanup** - Alte Jahre können leicht archiviert werden
✅ **Skalierbar** - Einfach für zukünftige Jahre erweiterbar
✅ **CMS-freundlich** - Vorschau funktioniert korrekt

## Migration bestehender Bilder

Falls Bilder von `/img/series/` nach `/img/series2026/` verschoben werden müssen:

```bash
# Beispiel (NICHT ausführen ohne Backup!)
mv site/static/img/series/2026-specific-image.jpg site/static/img/series2026/
```

Und MD-Datei aktualisieren:
```yaml
# Alt
image: /img/series/2026-specific-image.jpg

# Neu
image: /img/series2026/2026-specific-image.jpg
```

Aber: **Für 2026 waren noch keine Bilder vorhanden**, daher keine Migration nötig!
