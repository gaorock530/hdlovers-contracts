/**
 * 通用结构：响应包装、分页、错误。
 * 后端当前多数接口直接返回数组/对象（无统一 envelope），
 * 这里仅对确有固定形态的结构（分页、错误响应）建模。
 */
import { z } from 'zod';
/** ISO 8601 时间字符串（线上 Date 均被 JSON 序列化为字符串） */
export declare const IsoDateStringSchema: z.ZodUnion<[z.ZodString, z.ZodString]>;
/** 列表分页查询参数（/resource/listing 等） */
export declare const PaginationQuerySchema: z.ZodObject<{
    p: z.ZodDefault<z.ZodNumber>;
    rpp: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    p: number;
    rpp: number;
}, {
    p?: number | undefined;
    rpp?: number | undefined;
}>;
export type PaginationQuery = z.input<typeof PaginationQuerySchema>;
export type PaginationQueryResolved = z.infer<typeof PaginationQuerySchema>;
/** 后端错误响应（HttpException） */
export declare const ErrorResponseSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodNumber>;
    message: z.ZodOptional<z.ZodString>;
    error: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    status: z.ZodOptional<z.ZodNumber>;
    message: z.ZodOptional<z.ZodString>;
    error: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    status: z.ZodOptional<z.ZodNumber>;
    message: z.ZodOptional<z.ZodString>;
    error: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
