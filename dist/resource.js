"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcePublishBodySchema = exports.ResourcePageDetailSchema = exports.ResourceListingQuerySchema = exports.ResourceDetailSchema = exports.ResourceListItemSchema = void 0;
/**
 * 资源相关契约：列表项、详情、查询参数、发布请求。
 * 所有 schema 使用 .passthrough()，后端新增字段不会导致前端校验失败。
 */
const zod_1 = require("zod");
const enums_1 = require("./enums");
const common_1 = require("./common");
/** /resource/listing 返回的列表卡片字段（实际响应观察所得） */
exports.ResourceListItemSchema = zod_1.z
    .object({
    id: zod_1.z.string(),
    title: zod_1.z.string().optional(),
    originalTitle: zod_1.z.string().optional(),
    coverUrl: zod_1.z.string().url().or(zod_1.z.literal('')).optional(),
    type: zod_1.z.string().optional(),
    region: zod_1.z.string().optional(),
    format: zod_1.z.string().optional(),
    quality: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    popularity: zod_1.z.number().optional(),
    downloadCount: zod_1.z.number().optional(),
    salesCount: zod_1.z.number().optional(),
    year: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    publishedDate: common_1.IsoDateStringSchema.optional(),
})
    .passthrough();
/** 资源详情（对齐后端 ResourceInterface，敏感下载字段仅登录后返回） */
exports.ResourceDetailSchema = zod_1.z
    .object({
    id: zod_1.z.string(),
    publishedBy: zod_1.z.string().optional(),
    publishedDate: common_1.IsoDateStringSchema.optional(),
    lastEdited: common_1.IsoDateStringSchema.optional(),
    title: zod_1.z.string().optional(),
    type: enums_1.ResourceTypeSchema.optional(),
    region: enums_1.RegionSchema.optional(),
    format: enums_1.FormatAllSchema.optional(),
    quality: enums_1.QualitySchema.optional(),
    label: zod_1.z.string().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    artists: zod_1.z.array(zod_1.z.string()).optional(),
    year: zod_1.z.string().optional(),
    size: zod_1.z.string().optional(),
    genres: zod_1.z.array(zod_1.z.string()).optional(),
    content: zod_1.z.string().optional(),
    coverUrl: zod_1.z.string().optional(),
    imageUrl: zod_1.z.array(zod_1.z.string()).optional(),
    backupCoverUrl: zod_1.z.string().optional(),
    backupImageUrl: zod_1.z.array(zod_1.z.string()).optional(),
    price: zod_1.z.number().optional(),
    downloadCount: zod_1.z.number().optional(),
    salesCount: zod_1.z.number().optional(),
    popularity: zod_1.z.number().optional(),
    downloadLink: zod_1.z.string().optional(),
    downloadCode: zod_1.z.string().optional(),
    backupDownloadLink: zod_1.z.string().optional(),
    backupDownloadCode: zod_1.z.string().optional(),
    extraDownloadLinks: zod_1.z.array(zod_1.z.string()).optional(),
    promotionStatus: zod_1.z.boolean().optional(),
    promotionPrice: zod_1.z.number().optional(),
    downloadPermission: enums_1.RoleTypeSchema.optional(),
    originalTitle: zod_1.z.string().optional(),
    originalId: zod_1.z.string().optional(),
    originalUrl: zod_1.z.string().optional(),
    status: enums_1.ResourceStatusSchema.optional(),
    uploadFolder: zod_1.z.string().optional(),
    demandId: zod_1.z.string().optional(),
    prize: zod_1.z.number().optional(),
    referenceId: zod_1.z.string().optional(),
})
    .passthrough();
/** /resource/listing 查询参数（后端单字母缩写） */
exports.ResourceListingQuerySchema = common_1.PaginationQuerySchema.extend({
    f: zod_1.z.string().optional(),
    q: zod_1.z.string().optional(),
    r: zod_1.z.string().optional(),
    t: zod_1.z.string().optional(),
    price: zod_1.z.coerce.number().optional(),
    popularity: zod_1.z.coerce.number().optional(),
    tags: zod_1.z.string().optional(),
    recentDays: zod_1.z.coerce.number().optional(),
    random: zod_1.z.coerce.number().optional(),
});
/** /resource/itemPageDetail 聚合响应（resource + 作者 + 推荐） */
exports.ResourcePageDetailSchema = zod_1.z
    .object({
    resource: exports.ResourceDetailSchema,
    author: zod_1.z
        .object({
        username: zod_1.z.string(),
        avatar: zod_1.z.string().optional(),
        role: zod_1.z.string().optional(),
        list: zod_1.z.array(exports.ResourceListItemSchema).optional(),
    })
        .passthrough(),
    recommend: zod_1.z.array(exports.ResourceListItemSchema),
})
    .passthrough();
/** POST /resource/publish 请求体（前端 publishDataProps 对应） */
exports.ResourcePublishBodySchema = zod_1.z
    .object({
    title: zod_1.z.string().min(1),
    link: zod_1.z.string().url().optional().or(zod_1.z.literal('')),
    downloadLink: zod_1.z.string().url().optional().or(zod_1.z.literal('')),
    code: zod_1.z.string().optional(),
    downloadCode: zod_1.z.string().optional(),
    type: zod_1.z.string().optional(),
    region: zod_1.z.string().optional(),
    format: zod_1.z.string().optional(),
    quality: zod_1.z.string().optional(),
    price: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).optional(),
    content: zod_1.z.string().optional(),
    coverUrl: zod_1.z.string().optional(),
    imageUrl: zod_1.z.array(zod_1.z.string()).optional(),
    year: zod_1.z.string().optional(),
    size: zod_1.z.string().optional(),
    artists: zod_1.z.array(zod_1.z.string()).optional(),
    genres: zod_1.z.array(zod_1.z.string()).optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    demandId: zod_1.z.string().optional(),
    referenceId: zod_1.z.string().optional(),
    ip: zod_1.z.string().optional(),
})
    .passthrough();
