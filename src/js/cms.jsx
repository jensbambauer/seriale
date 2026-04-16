import CMS from "decap-cms-app";

import PostPreview from "./cms-preview-templates/post.jsx";
import SeriesPreview from "./cms-preview-templates/series.jsx";
import SpeakerPreview from "./cms-preview-templates/speaker.jsx";
import PilotPreview from "./cms-preview-templates/pilot.jsx";

// Custom color widget
const ColorControl = ({ value, onChange }) => (
  <input
    style={{ height: "80px" }}
    type="color"
    value={value || "#000000"}
    onChange={(e) => onChange(e.target.value)}
  />
);

// Reusable field definitions
const juryFields = [
  { label: "Name", name: "title", widget: "string" },
  { label: "Image", name: "image", widget: "image", required: false },
  { label: "Short Description", name: "shortdescription", widget: "string", required: false },
  { label: "Bio", name: "body", widget: "markdown" },
];

// Jury categories for filtering
const juryCategories = [
  { label: "Short Form Series", value: "series" },
  { label: "Long Form Series", value: "long-form-series" },
  { label: "Animation", value: "animation" },
  { label: "Documentary", value: "documentary" },
  { label: "Pilots", value: "pilots" },
  { label: "Pitch Contest", value: "pitch-contest" },
];

// Jury fields with category (for 2026+)
const juryFieldsWithCategory = [
  { label: "Name", name: "title", widget: "string" },
  { label: "Image", name: "image", widget: "image", required: false },
  { 
    label: "Jury Category", 
    name: "category", 
    widget: "select",
    options: juryCategories,
    hint: "Which jury is this person part of?"
  },
  { label: "Short Description", name: "shortdescription", widget: "string", required: false },
  { label: "Bio", name: "body", widget: "markdown" },
];

const speakerFields = [
  { label: "Name", name: "title", widget: "string" },
  { label: "Image", name: "image", widget: "image", required: false },
  { label: "Short Description", name: "shortdescription", widget: "string", required: false },
  { label: "Bio", name: "body", widget: "markdown" },
];

// Award categories for nominations
const awardCategories = [
  { label: "Best Series", value: "best-series" },
  { label: "Best Directing", value: "best-directing" },
  { label: "Best Screenplay", value: "best-screenplay" },
  { label: "Best Idea", value: "best-idea" },
  { label: "Best Leading Performance", value: "best-leading-performance" },
  { label: "Best Supporting Performance", value: "best-supporting-performance" },
  { label: "Best Cinematography", value: "best-cinematography" },
  { label: "Best Editing", value: "best-editing" },
  { label: "Best Original Score", value: "best-original-score" },
  { label: "Best Production Design", value: "best-production-design" },
  { label: "Best Costume Design", value: "best-costume-design" },
  { label: "Best Ensemble Cast", value: "best-ensemble-cast" },
  { label: "Best Pilot", value: "best-pilot" },
  { label: "Best Long Form Series", value: "best-long-form-series" },
  { label: "Best Documentary", value: "best-documentary" },
  { label: "Best Animation", value: "best-animation" },
  { label: "Best Vertical Series", value: "best-vertical-series" },
];

// Nominations field for series/pilots
const nominationsField = {
  label: "Nominations",
  name: "nominations",
  widget: "list",
  required: false,
  collapsed: true,
  summary: "{{fields.category}} {{fields.winner}}",
  fields: [
    { 
      label: "Category", 
      name: "category", 
      widget: "select",
      options: awardCategories,
    },
    { 
      label: "Credit (Person/Name)", 
      name: "credit", 
      widget: "string", 
      required: false,
      hint: "e.g. Director name for Best Directing"
    },
    { 
      label: "Winner", 
      name: "winner", 
      widget: "boolean", 
      default: false,
    },
  ],
};

const seriesFields = [
  { label: "Title", name: "title", widget: "string" },
  { label: "Image", name: "image", widget: "image", required: false },
  { label: "Trailer", name: "trailer", widget: "string", required: false, hint: "YouTube or Vimeo URL, e.g. https://www.youtube.com/watch?v=XXXXX or https://vimeo.com/123456" },
  { label: "Origin (Country)", name: "origin", widget: "string", required: false, hint: "e.g. Germany, France" },
  { label: "Genre", name: "genre", widget: "string", required: false },
  { label: "Creators", name: "creators", widget: "string", required: false },
  { label: "Directors", name: "directors", widget: "string", required: false },
  { label: "Writers", name: "writers", widget: "string", required: false },
  { label: "Producers", name: "producers", widget: "string", required: false },
  { label: "Cast", name: "cast", widget: "string", required: false },
  nominationsField,
  { label: "Body", name: "body", widget: "markdown" },
];

const pilotFields = [
  { label: "Title", name: "title", widget: "string" },
  { label: "Image", name: "image", widget: "image", required: false },
  { label: "Origin (Country)", name: "origin", widget: "string", required: false, hint: "e.g. Germany, France" },
  nominationsField,
  { label: "Body", name: "body", widget: "markdown" },
];

// Helper to create jury collection
const createJuryCollection = (year, category, labelCategory) => ({
  name: `jury${year}-${category}`,
  label: `${year} / Jury / ${labelCategory}`,
  folder: `site/content/jury-${year}/jury-${category}`,
  create: true,
  slug: "{{slug}}",
  fields: juryFields,
});

// Helper to create speaker collection
const createSpeakerCollection = (year) => ({
  name: `speakers${year}`,
  label: `${year} / Speakers`,
  folder: `site/content/speakers${year}`,
  create: true,
  slug: "{{slug}}",
  fields: speakerFields,
});

// Helper to create series collection
const createSeriesCollection = (year) => ({
  name: `series${year}`,
  label: `${year} / Series`,
  folder: `site/content/series${year}`,
  create: true,
  slug: "{{slug}}",
  fields: seriesFields,
});

// Helper to create pilot collection
const createPilotCollection = (year) => ({
  name: `pilots${year}`,
  label: `${year} / Pilots`,
  folder: `site/content/pilots${year}`,
  create: true,
  slug: "{{slug}}",
  fields: pilotFields,
});

// Team fields
const teamFields = [
  { label: "Name", name: "title", widget: "string" },
  { label: "Image", name: "image", widget: "image", required: false },
  { label: "Role", name: "shortdescription", widget: "string", required: false },
];

// Helper to create team collection
const createTeamCollection = (year) => ({
  name: `team${year}`,
  label: `${year} / Team`,
  folder: `site/content/team${year}`,
  create: true,
  slug: "{{slug}}",
  fields: teamFields,
});

// Initialize CMS with inline config
CMS.init({
  config: {
    backend: {
      name: "git-gateway",
      branch: "master",
    },
    local_backend: true,
    media_folder: "site/static/img",
    public_folder: "/img",
    collections: [
      // === BLOG POSTS ===
      {
        name: "post",
        label: "Blog Posts",
        folder: "site/content/post",
        create: true,
        slug: "{{slug}}",
        fields: [
          { label: "Title", name: "title", widget: "string" },
          { label: "Publish Date", name: "date", widget: "datetime" },
          { label: "Image", name: "image", widget: "image", required: false },
          { label: "Description", name: "description", widget: "text", required: false },
          { label: "Body", name: "body", widget: "markdown" },
        ],
      },

      // === 2026 ===
      // Awards
      {
        name: "awards2026",
        label: "2026 / Awards",
        files: [
          {
            label: "2026 Awards",
            name: "awards-2026",
            file: "site/content/awards-2026.md",
            fields: [
              { label: "Title", name: "title", widget: "string" },
              {
                label: "Sections",
                name: "sections",
                widget: "list",
                typeKey: "partial",
                types: [
                  {
                    label: "Text Section",
                    name: "text",
                    widget: "object",
                    fields: [
                      { label: "Partial", name: "partial", widget: "hidden", default: "text" },
                      { label: "Small Margin", name: "smallmargin", widget: "boolean", default: false, required: false },
                      { label: "Headline", name: "headline", widget: "string", required: false },
                      {
                        label: "Data",
                        name: "data",
                        widget: "object",
                        fields: [
                          { label: "Headline", name: "headline", widget: "string", required: false },
                          {
                            label: "Paragraphs",
                            name: "paragraphs",
                            widget: "list",
                            required: false,
                            fields: [
                              { label: "Text", name: "text", widget: "text" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "Awards from Series (Auto)",
                    name: "awards-from-series",
                    widget: "object",
                    summary: "Auto-generated nominations",
                    fields: [
                      { label: "Partial", name: "partial", widget: "hidden", default: "awards-from-series" },
                      { label: "Small Margin", name: "smallmargin", widget: "boolean", default: false, required: false },
                      {
                        label: "Data",
                        name: "data",
                        widget: "object",
                        fields: [
                          { label: "Year", name: "year", widget: "string", default: "2026" },
                          {
                            label: "Categories",
                            name: "categories",
                            widget: "select",
                            multiple: true,
                            options: awardCategories,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "Best Series (Auto)",
                    name: "awards-best-series",
                    widget: "object",
                    summary: "Auto-generated best series",
                    fields: [
                      { label: "Partial", name: "partial", widget: "hidden", default: "awards-best-series" },
                      { label: "Small Margin", name: "smallmargin", widget: "boolean", default: false, required: false },
                      {
                        label: "Data",
                        name: "data",
                        widget: "object",
                        fields: [
                          { label: "Year", name: "year", widget: "string", default: "2026" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      // Jury 2026 - single collection with category field
      {
        name: "jury2026",
        label: "2026 / Jury",
        folder: "site/content/jury-2026",
        create: true,
        slug: "{{slug}}",
        fields: juryFieldsWithCategory,
      },
      createPilotCollection(2026),
      createSeriesCollection(2026),
      createSpeakerCollection(2026),
      createTeamCollection(2026),

      // === 2025 ===
      // Awards
      {
        name: "awards2025",
        label: "2025 / Awards",
        files: [
          {
            label: "2025 Awards",
            name: "awards-2025",
            file: "site/content/awards-2025.md",
            fields: [
              { label: "Title", name: "title", widget: "string" },
              {
                label: "Sections",
                name: "sections",
                widget: "list",
                typeKey: "partial",
                types: [
                  {
                    label: "Text Section",
                    name: "text",
                    widget: "object",
                    fields: [
                      { label: "Partial", name: "partial", widget: "hidden", default: "text" },
                      { label: "Small Margin", name: "smallmargin", widget: "boolean", default: false, required: false },
                      { label: "Headline", name: "headline", widget: "string", required: false },
                      {
                        label: "Data",
                        name: "data",
                        widget: "object",
                        fields: [
                          { label: "Headline", name: "headline", widget: "string", required: false },
                          {
                            label: "Paragraphs",
                            name: "paragraphs",
                            widget: "list",
                            required: false,
                            fields: [
                              { label: "Text", name: "text", widget: "text" },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "Awards from Series (Auto)",
                    name: "awards-from-series",
                    widget: "object",
                    summary: "Auto-generated nominations",
                    fields: [
                      { label: "Partial", name: "partial", widget: "hidden", default: "awards-from-series" },
                      { label: "Small Margin", name: "smallmargin", widget: "boolean", default: false, required: false },
                      {
                        label: "Data",
                        name: "data",
                        widget: "object",
                        fields: [
                          { label: "Year", name: "year", widget: "string", default: "2025" },
                          {
                            label: "Categories",
                            name: "categories",
                            widget: "select",
                            multiple: true,
                            options: awardCategories,
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "Best Series (Auto)",
                    name: "awards-best-series",
                    widget: "object",
                    summary: "Auto-generated best series",
                    fields: [
                      { label: "Partial", name: "partial", widget: "hidden", default: "awards-best-series" },
                      { label: "Small Margin", name: "smallmargin", widget: "boolean", default: false, required: false },
                      {
                        label: "Data",
                        name: "data",
                        widget: "object",
                        fields: [
                          { label: "Year", name: "year", widget: "string", default: "2025" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      createJuryCollection(2025, "animation", "Animation"),
      createJuryCollection(2025, "documentary", "Documentary"),
      createJuryCollection(2025, "long-form-series", "Long Form Series"),
      createJuryCollection(2025, "pilots", "Pilots"),
      createJuryCollection(2025, "pitch-contest", "Pitch Contest"),
      createJuryCollection(2025, "series", "Short Form Series"),
      createPilotCollection(2025),
      createSeriesCollection(2025),
      createSpeakerCollection(2025),

      // === 2024 ===
      createJuryCollection(2024, "animation", "Animation"),
      createJuryCollection(2024, "documentary", "Documentary"),
      createJuryCollection(2024, "long-form-series", "Long Form Series"),
      createJuryCollection(2024, "pilots", "Pilots"),
      createJuryCollection(2024, "pitch-contest", "Pitch Contest"),
      createJuryCollection(2024, "series", "Short Form Series"),
      // Note: No pilots2024 exists
      createSeriesCollection(2024),
      createSpeakerCollection(2024),

      // === 2023 ===
      createJuryCollection(2023, "animation", "Animation"),
      createJuryCollection(2023, "documentary", "Documentary"),
      createJuryCollection(2023, "pilots", "Pilots"),
      createJuryCollection(2023, "series", "Short Form Series"),
      createPilotCollection(2023),
      createSeriesCollection(2023),
      createSpeakerCollection(2023),

      // === 2022 ===
      createJuryCollection(2022, "animation", "Animation"),
      createJuryCollection(2022, "documentary", "Documentary"),
      createJuryCollection(2022, "pilots", "Pilots"),
      createJuryCollection(2022, "series", "Short Form Series"),
      createPilotCollection(2022),
      createSeriesCollection(2022),
      createSpeakerCollection(2022),

      // === 2021 ===
      createJuryCollection(2021, "animation", "Animation"),
      createJuryCollection(2021, "documentary", "Documentary"),
      createJuryCollection(2021, "pilots", "Pilots"),
      createJuryCollection(2021, "pitch-contest", "Pitch Contest"),
      createJuryCollection(2021, "series", "Short Form Series"),
      createPilotCollection(2021),
      createSeriesCollection(2021),
      createSpeakerCollection(2021),

      // === 2020 ===
      createJuryCollection(2020, "animation", "Animation"),
      createJuryCollection(2020, "documentary", "Documentary"),
      createJuryCollection(2020, "pilots", "Pilots"),
      createJuryCollection(2020, "series", "Short Form Series"),
      createPilotCollection(2020),
      createSeriesCollection(2020),
      createSpeakerCollection(2020),

      // === 2019 ===
      createJuryCollection(2019, "animation", "Animation"),
      createJuryCollection(2019, "documentary", "Documentary"),
      createJuryCollection(2019, "pilots", "Pilots"),
      createJuryCollection(2019, "pitch-contest", "Pitch Contest"),
      createJuryCollection(2019, "series", "Short Form Series"),
      createPilotCollection(2019),
      createSeriesCollection(2019),
      createSpeakerCollection(2019),

      // === PITCH CONTEST MODERATORS ===
      {
        name: "pitch-contest-moderators",
        label: "Pitch Contest Moderators",
        folder: "site/content/pitch-contest-moderators",
        create: true,
        slug: "{{slug}}",
        fields: speakerFields,
      },
    ],
  },
});

// Register preview styles
CMS.registerPreviewStyle("/css/main.css");

// Register preview templates
CMS.registerPreviewTemplate("post", PostPreview);

// Register speaker preview for all speaker collections
[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019].forEach(year => {
  CMS.registerPreviewTemplate(`speakers${year}`, SpeakerPreview);
});

// Register series preview for all series collections
[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019].forEach(year => {
  CMS.registerPreviewTemplate(`series${year}`, SeriesPreview);
});

// Register pilot preview for all pilot collections
[2026, 2025, 2023, 2022, 2021, 2020, 2019].forEach(year => {
  CMS.registerPreviewTemplate(`pilots${year}`, PilotPreview);
});

// Register jury preview templates (all use SpeakerPreview since same layout)
const juryCategories2024Plus = ["animation", "documentary", "long-form-series", "pilots", "pitch-contest", "series"];
const juryCategories2022_2023 = ["animation", "documentary", "pilots", "series"];
const juryCategories2021 = ["animation", "documentary", "pilots", "pitch-contest", "series"];
const juryCategories2020 = ["animation", "documentary", "pilots", "series"];
const juryCategories2019 = ["animation", "documentary", "pilots", "pitch-contest", "series"];

[2026, 2025, 2024].forEach(year => {
  juryCategories2024Plus.forEach(cat => {
    CMS.registerPreviewTemplate(`jury${year}-${cat}`, SpeakerPreview);
  });
});

[2023, 2022].forEach(year => {
  juryCategories2022_2023.forEach(cat => {
    CMS.registerPreviewTemplate(`jury${year}-${cat}`, SpeakerPreview);
  });
});

juryCategories2021.forEach(cat => {
  CMS.registerPreviewTemplate(`jury2021-${cat}`, SpeakerPreview);
});

juryCategories2020.forEach(cat => {
  CMS.registerPreviewTemplate(`jury2020-${cat}`, SpeakerPreview);
});

juryCategories2019.forEach(cat => {
  CMS.registerPreviewTemplate(`jury2019-${cat}`, SpeakerPreview);
});

// Pitch contest moderators
CMS.registerPreviewTemplate("pitch-contest-moderators", SpeakerPreview);

// Register custom widgets
CMS.registerWidget("color", ColorControl);
