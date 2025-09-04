import { paginationSchema } from '@/shared/schema/pagination/pagination.schema';
import z from 'zod';

export type PaginationMeta = z.infer<typeof paginationSchema>;
