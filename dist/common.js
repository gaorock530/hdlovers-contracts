"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponseSchema = exports.PaginationQuerySchema = exports.IsoDateStringSchema = void 0;
/**
 * 通用结构：响应包装、分页、错误。
 * 后端当前多数接口直接返回数组/对象（无统一 envelope），
 * 这里仅对确有固定形态的结构（分页、错误响应）建模。
 */
const zod_1 = require("zod");
/** ISO 8601 时间字符串（线上 Date 均被 JSON 序列化为字符串） */
exports.IsoDateStringSchema = zod_1.z.string().datetime({ offset: true }).or(zod_1.z.string());
/** 列表分页查询参数（/resource/listing 等） */
exports.PaginationQuerySchema = zod_1.z.object({
    p: zod_1.z.coerce.number().int().positive().default(1),
    rpp: zod_1.z.coerce.number().int().positive().max(100).default(20),
});
/** 后端错误响应（HttpException） */
exports.ErrorResponseSchema = zod_1.z
    .object({
    status: zod_1.z.number().int().optional(),
    message: zod_1.z.string().optional(),
    error: zod_1.z.string().optional(),
})
    .passthrough();
