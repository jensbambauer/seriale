#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Awards data from awards-2024.md
const nominations = {
  "best-series": [
    { title: "2 Minutes - 24/7", winner: true }
  ],
  "best-directing": [
    { title: "2 Minutes - 24/7", credit: "Lisa Miller, Leonie Krippendorff" },
    { title: "Becoming Charlie", credit: "Kerstin Polte, Greta Benkelmann" },
    { title: "Hell", credit: "Santiago Mouriño, Pablo Balmaceda" },
    { title: "Protected Space", credit: "Eyal Dickman" },
    { title: "Sasha Counters!", credit: "Anna Zaytseva", winner: true },
    { title: "The Care-Breakers", credit: "Zoé Tremblay-Bianco" }
  ],
  "best-screenplay": [
    { title: "all the guests have left", credit: "Dion Schumann" },
    { title: "Becoming Charlie", credit: "Lion H. Lau", winner: true },
    { title: "Memories of a forgotten Childhood", credit: "Lars Smekal" },
    { title: "My Exes' Zodiac Signs", credit: "Andrezza Czech" },
    { title: "Protected Space", credit: "Anna Fatahov" },
    { title: "Roommate Quest!", credit: "Julia Römpp" }
  ],
  "best-leading-performance": [
    { title: "Becoming Charlie", credit: "Lea Drinda", winner: true },
    { title: "Finest Cuts", credit: "Guilherme Corrêa" },
    { title: "Hell", credit: "Agostina Inella" },
    { title: "Sasha Counters!", credit: "Anna Potebnya" },
    { title: "The Care-Breakers", credit: "Tiffany Montambault" },
    { title: "The Method. Foundation of Identity", credit: "Paola Barrientos" }
  ],
  "best-supporting-performance": [
    { title: "Becoming Charlie", credit: "Katja Bürkle" },
    { title: "Hell", credit: "Verónica Gerez" },
    { title: "Hogtown (Season 2)", credit: "Sandra Dorélas", winner: true },
    { title: "I WILL BURY YOU (Season 2)", credit: "Clare Coulter" },
    { title: "Roommate Quest!", credit: "Nils Brunkhorst" },
    { title: "With Grace (Season 3)", credit: "Ben Wood" }
  ],
  "best-editing": [
    { title: "2 Minutes - 24/7", credit: "Elena Scharwächter, Emma Gräf, Petja von Bredow" },
    { title: "Content Farm", credit: "Alaine Hutton" },
    { title: "Hell", credit: "Santiago Mouriño" },
    { title: "MusicStories", credit: "Elena Walter" },
    { title: "No One Around", credit: "Joaquín Bravo, Magui Mieres, Karen Antunes", winner: true },
    { title: "The Care-Breakers", credit: "Andrée-Anne Lavoie" }
  ],
  "best-original-score": [
    { title: "2 Minutes - 24/7", credit: "Philipp Thimm" },
    { title: "Becoming Charlie", credit: "Pelle Parr" },
    { title: "Hell", credit: "Juan Manuel Ponce", winner: true },
    { title: "Hogtown", credit: "Lora Bidner" },
    { title: "The Gliwensbourg Chronicles", credit: "Guillaume Wilmot" },
    { title: "Wipe me away (Season 2)", credit: "Joseph Marchand" }
  ],
  "best-production-design": [
    { title: "Haus Kummerveldt" },
    { title: "MusicStories" },
    { title: "Roommate Quest!" },
    { title: "Sasha Counters!", winner: true },
    { title: "The Gliwensbourg Chronicles" },
    { title: "The Method. Foundation of Identity" }
  ],
  "best-costume-design": [
    { title: "2 Minutes - 24/7", winner: true },
    { title: "Becoming Charlie" },
    { title: "Haus Kummerveldt" },
    { title: "MusicStories" },
    { title: "The Drop" },
    { title: "The Gliwensbourg Chronicles" }
  ],
  "best-idea": [
    { title: "Content Farm" },
    { title: "Missing" },
    { title: "MusicStories", winner: true },
    { title: "Secürity" },
    { title: "The Drop" },
    { title: "The MUTE Series" }
  ],
  "best-cinematography": [
    { title: "2 Minutes - 24/7", credit: "Sabine Panossian, Lotta Kilian" },
    { title: "Becoming Charlie", credit: "Lotta Kilian, Philip Jestädt" },
    { title: "Finest Cuts", credit: "Eduardo Sansigolo" },
    { title: "Hell", credit: "Alejandro Ortiguera" },
    { title: "I WILL BURY YOU (Season 2)", credit: "Michael Jari Davidson" },
    { title: "MusicStories", credit: "Jonas Schmieta" },
    { title: "Sasha Counters!", credit: "Egor Vetokhin", winner: true },
    { title: "Wipe me away (Season 2)", credit: "Philippe St-Gelais" }
  ],
  "best-ensemble-cast": [
    { title: "2 Minutes - 24/7" },
    { title: "Haus Kummerveldt" },
    { title: "Missing" },
    { title: "No One Around" },
    { title: "Protected Space" },
    { title: "Roommate Quest!" },
    { title: "Secürity" },
    { title: "Wipe me away (Season 2)", winner: true }
  ],
  "best-documentary": [
    { title: "AD Maiora (Season 3)" },
    { title: "Beyond Fashion (Season 2)" },
    { title: "Drag Heals (Season 4)" },
    { title: "Fichines: The History of Arcades in Argentina", winner: true },
    { title: "Gelbe Karten & Lila Latzhosen - Fundstücke der Borkener Frauenbewegung" },
    { title: "K' Road Chronicles" },
    { title: "Kick it like a girl" },
    { title: "The Real Land of Opportunity" }
  ],
  "best-long-form-series": [
    { title: "AS WE ARE" },
    { title: "Family Therapy" },
    { title: "Füxe" , winner: true },
    { title: "Lily's turn" },
    { title: "Swiss Secrets" },
    { title: "THE TASTE OF SILENCE" }
  ],
  "best-animation": [
    { title: "Eva. Connected Through Time" },
    { title: "Super Fails" },
    { title: "The Kirlian Frequency (Season 2)", winner: true }
  ]
};

// Build reverse map: series title -> nominations
const seriesNominations = {};
for (const [category, noms] of Object.entries(nominations)) {
  for (const nom of noms) {
    const title = nom.title;
    if (!seriesNominations[title]) {
      seriesNominations[title] = [];
    }
    const entry = { category };
    if (nom.credit) entry.credit = nom.credit;
    if (nom.winner) entry.winner = true;
    seriesNominations[title].push(entry);
  }
}

// Normalize title for matching
function normalize(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .replace(/season\d+/g, '');
}

// Read all series2024 files
const seriesDir = path.join(__dirname, '../site/content/series2024');
const files = fs.readdirSync(seriesDir).filter(f => f.endsWith('.md'));

let updated = 0;
let notFound = [];

for (const file of files) {
  const filePath = path.join(seriesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract title from frontmatter
  const titleMatch = content.match(/^---[\s\S]*?title:\s*(.+?)[\r\n]/m);
  if (!titleMatch) continue;
  
  const fileTitle = titleMatch[1].trim().replace(/^["']|["']$/g, '');
  const normalizedFileTitle = normalize(fileTitle);
  
  // Find matching nominations
  let matchedTitle = null;
  for (const nomTitle of Object.keys(seriesNominations)) {
    if (normalize(nomTitle) === normalizedFileTitle) {
      matchedTitle = nomTitle;
      break;
    }
  }
  
  if (!matchedTitle) {
    // Try partial match
    for (const nomTitle of Object.keys(seriesNominations)) {
      if (normalizedFileTitle.includes(normalize(nomTitle)) || 
          normalize(nomTitle).includes(normalizedFileTitle)) {
        matchedTitle = nomTitle;
        break;
      }
    }
  }
  
  if (!matchedTitle) {
    continue; // No nominations for this series
  }
  
  const noms = seriesNominations[matchedTitle];
  
  // Check if already has nominations
  if (content.includes('nominations:')) {
    console.log(`⏭ ${file} already has nominations`);
    continue;
  }
  
  // Build nominations YAML
  let nomsYaml = 'nominations:\n';
  for (const nom of noms) {
    nomsYaml += `  - category: ${nom.category}\n`;
    if (nom.credit) nomsYaml += `    credit: "${nom.credit}"\n`;
    if (nom.winner) nomsYaml += `    winner: true\n`;
  }
  
  // Insert before closing ---
  const parts = content.split('---');
  if (parts.length >= 3) {
    // Insert nominations at end of frontmatter
    const frontmatter = parts[1].trim();
    const body = parts.slice(2).join('---');
    content = `---\n${frontmatter}\n${nomsYaml}---${body}`;
    
    fs.writeFileSync(filePath, content);
    console.log(`✓ ${file} - added ${noms.length} nominations (${matchedTitle})`);
    updated++;
  }
}

console.log(`\nUpdated ${updated} files`);

// Check for unmatched nominations
const matchedTitles = new Set();
for (const file of files) {
  const filePath = path.join(seriesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const titleMatch = content.match(/^---[\s\S]*?title:\s*(.+?)[\r\n]/m);
  if (titleMatch) {
    matchedTitles.add(normalize(titleMatch[1].trim().replace(/^["']|["']$/g, '')));
  }
}

console.log('\nNominated series not found in series2024:');
for (const nomTitle of Object.keys(seriesNominations)) {
  let found = false;
  for (const mt of matchedTitles) {
    if (mt.includes(normalize(nomTitle)) || normalize(nomTitle).includes(mt)) {
      found = true;
      break;
    }
  }
  if (!found) {
    console.log(`  - ${nomTitle}`);
  }
}
