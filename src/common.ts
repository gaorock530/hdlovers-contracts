/**
 * 通用结构：响应包装、分页、错误。
 * 后端当前多数接口直接返回数组/对象（无统一 envelope），
 * 这里仅对确有固定形态的结构（分页、错误响应）建模。
 */
import { z } from 'zod';

/** ISO 8601 时间字符串（线上 Date 均被 JSON 序列化为字符串） */
export const IsoDateStringSchema = z.string().datetime({ offset: true }).or(z.string());

/** 列表分页查询参数（/resource/listing 等） */
export const PaginationQuerySchema = z.object({
  p: z.coerce.number().int().positive().default(1),
  rpp: z.coerce.number().int().positive().max(100).default(20),
});
export type PaginationQuery = z.input<typeof PaginationQuerySchema>;
export type PaginationQueryResolved = z.infer<typeof PaginationQuerySchema>;

/** 后端错误响应（HttpException） */
export const ErrorResponseSchema = z
  .object({
    status: z.number().int().optional(),
    message: z.string().optional(),
    error: z.string().optional(),
  })
  .passthrough();
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
