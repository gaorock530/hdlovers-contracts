/**
 * 资源相关契约：列表项、详情、查询参数、发布请求。
 * 所有 schema 使用 .passthrough()，后端新增字段不会导致前端校验失败。
 */
import { z } from 'zod';
import {
  FormatAllSchema,
  QualitySchema,
  RegionSchema,
  ResourceStatusSchema,
  ResourceTypeSchema,
  RoleTypeSchema,
} from './enums';
import { IsoDateStringSchema, PaginationQuerySchema } from './common';

/** /resource/listing 返回的列表卡片字段（实际响应观察所得） */
export const ResourceListItemSchema = z
  .object({
    id: z.string(),
    title: z.string().optional(),
    originalTitle: z.string().optional(),
    coverUrl: z.string().url().or(z.literal('')).optional(),
    type: z.string().optional(),
    region: z.string().optional(),
    format: z.string().optional(),
    quality: z.string().optional(),
    price: z.number().optional(),
    popularity: z.number().optional(),
    downloadCount: z.number().optional(),
    salesCount: z.number().optional(),
    year: z.string().optional(),
    tags: z.array(z.string()).optional(),
    publishedDate: IsoDateStringSchema.optional(),
  })
  .passthrough();
export type ResourceListItem = z.infer<typeof ResourceListItemSchema>;

/** 资源详情（对齐后端 ResourceInterface，敏感下载字段仅登录后返回） */
export const ResourceDetailSchema = z
  .object({
    id: z.string(),
    publishedBy: z.string().optional(),
    publishedDate: IsoDateStringSchema.optional(),
    lastEdited: IsoDateStringSchema.optional(),
    title: z.string().optional(),
    type: ResourceTypeSchema.optional(),
    region: RegionSchema.optional(),
    format: FormatAllSchema.optional(),
    quality: QualitySchema.optional(),
    label: z.string().optional(),
    tags: z.array(z.string()).optional(),
    artists: z.array(z.string()).optional(),
    year: z.string().optional(),
    size: z.string().optional(),
    genres: z.array(z.string()).optional(),
    content: z.string().optional(),
    coverUrl: z.string().optional(),
    imageUrl: z.array(z.string()).optional(),
    backupCoverUrl: z.string().optional(),
    backupImageUrl: z.array(z.string()).optional(),
    price: z.number().optional(),
    downloadCount: z.number().optional(),
    salesCount: z.number().optional(),
    popularity: z.number().optional(),
    downloadLink: z.string().optional(),
    downloadCode: z.string().optional(),
    backupDownloadLink: z.string().optional(),
    backupDownloadCode: z.string().optional(),
    extraDownloadLinks: z.array(z.string()).optional(),
    promotionStatus: z.boolean().optional(),
    promotionPrice: z.number().optional(),
    downloadPermission: RoleTypeSchema.optional(),
    originalTitle: z.string().optional(),
    originalId: z.string().optional(),
    originalUrl: z.string().optional(),
    status: ResourceStatusSchema.optional(),
    uploadFolder: z.string().optional(),
    demandId: z.string().optional(),
    prize: z.number().optional(),
    referenceId: z.string().optional(),
  })
  .passthrough();
export type ResourceDetail = z.infer<typeof ResourceDetailSchema>;

/** /resource/listing 查询参数（后端单字母缩写） */
export const ResourceListingQuerySchema = PaginationQuerySchema.extend({
  f: z.string().optional(),
  q: z.string().optional(),
  r: z.string().optional(),
  t: z.string().optional(),
  price: z.coerce.number().optional(),
  popularity: z.coerce.number().optional(),
  tags: z.string().optional(),
  recentDays: z.coerce.number().optional(),
  random: z.coerce.number().optional(),
});
export type ResourceListingQuery = z.input<typeof ResourceListingQuerySchema>;
export type ResourceListingQueryResolved = z.infer<typeof ResourceListingQuerySchema>;

/** /resource/itemPageDetail 聚合响应（resource + 作者 + 推荐） */
export const ResourcePageDetailSchema = z
  .object({
    resource: ResourceDetailSchema,
    author: z
      .object({
        username: z.string(),
        avatar: z.string().optional(),
        role: z.string().optional(),
        list: z.array(ResourceListItemSchema).optional(),
      })
      .passthrough(),
    recommend: z.array(ResourceListItemSchema),
  })
  .passthrough();
export type ResourcePageDetail = z.infer<typeof ResourcePageDetailSchema>;

/** POST /resource/publish 请求体（前端 publishDataProps 对应） */
export const ResourcePublishBodySchema = z
  .object({
    title: z.string().min(1),
    link: z.string().url().optional().or(z.literal('')),
    downloadLink: z.string().url().optional().or(z.literal('')),
    code: z.string().optional(),
    downloadCode: z.string().optional(),
    type: z.string().optional(),
    region: z.string().optional(),
    format: z.string().optional(),
    quality: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    content: z.string().optional(),
    coverUrl: z.string().optional(),
    imageUrl: z.array(z.string()).optional(),
    year: z.string().optional(),
    size: z.string().optional(),
    artists: z.array(z.string()).optional(),
    genres: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    demandId: z.string().optional(),
    referenceId: z.string().optional(),
    ip: z.string().optional(),
  })
  .passthrough();
export type ResourcePublishBody = z.infer<typeof ResourcePublishBodySchema>;
