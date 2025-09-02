import { optionsSelectArraySchema } from '@/shared/schema';
import z from 'zod';

export type OptionsSelectType = z.infer<typeof optionsSelectArraySchema>;
