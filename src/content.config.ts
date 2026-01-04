import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artists = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/data/artists" }),
  schema: z.object({
    name: z.string(),
    stage_name: z.string(),
    genre: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});

const albums = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/data/albums" }),
  schema: z.object({
    name: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.date(), // e.g. 2024-09-17
    tracks: z.array(z.string()),
    artist: reference('artists'),
  }),
});

const shows = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/shows" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    time: z.string().optional(),
    venue: z.string(),
    city: z.string(),
    tickets: z.string().url().optional(),
  artists: z
  .union([z.string(), z.array(z.string())])
  .optional()
  .transform((v) => {
    const arr = v == null ? [] : Array.isArray(v) ? v : [v];
    return arr.map((s) =>
      s.replace(/^["']+|["']+$/g, "").trim()
    );
  }),

  }),
});


// Export all collections
export const collections = { artists, albums, shows };
