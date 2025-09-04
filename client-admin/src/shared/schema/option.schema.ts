import z from 'zod';

const optionsSelectSchema = z.object({
  label: z.string().min(2).max(100),
  value: z.string().min(2).max(100),
});

export const optionsSelectArraySchema = z.array(optionsSelectSchema);
