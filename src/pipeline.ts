/**
 * 抓取流水线相关契约：Cookie 凭证管理（P1）。
 * 运行/任务/Worker 契约在后续阶段补充。
 */
import { z } from 'zod';

// ── 站点标识（新增资源站时扩展此枚举） ───────────────────────────
export const CookieSiteCodeSchema = z.enum(['baidu_pan', 'lgych']);
export type CookieSiteCode = z.infer<typeof CookieSiteCodeSchema>;

// ── Cookie 有效性状态 ────────────────────────────────────────────
// unknown  未测试
// valid    最近一次探测通过
// invalid  最近一次探测失败（登录态失效）
// expiring 临近过期提醒（仍可用）
export const CookieStatusSchema = z.enum(['unknown', 'valid', 'invalid', 'expiring']);
export type CookieStatus = z.infer<typeof CookieStatusSchema>;

/** 列表项 DTO —— 任何情况下都不含明文 Cookie */
export const CookieSummarySchema = z
  .object({
    id: z.string(),
    siteCode: CookieSiteCodeSchema,
    label: z.string(),
    /** 解析出的键名清单（仅键名，无值） */
    keys: z.array(z.string()),
    /** 必填键是否齐全 */
    requiredSatisfied: z.boolean(),
    /** 缺失的必填键 */
    missingRequired: z.array(z.string()),
    status: CookieStatusSchema,
    /** 探测结果详情/失败原因（面向用户，无敏感值） */
    statusMessage: z.string().optional(),
    version: z.number().int(),
    lastValidatedAt: z.string().nullable().optional(),
    expiresHint: z.string().nullable().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .passthrough();
export type CookieSummary = z.infer<typeof CookieSummarySchema>;

/** 导入/更新请求体（raw 为浏览器复制的整串 Cookie） */
export const CookieUpsertBodySchema = z
  .object({
    siteCode: CookieSiteCodeSchema,
    label: z.string().min(1).max(50),
    raw: z.string().min(3),
  })
  .passthrough();
export type CookieUpsertBody = z.infer<typeof CookieUpsertBodySchema>;

/** 导入时的解析预览（不落库） */
export const CookieParsePreviewSchema = z.object({
  siteCode: CookieSiteCodeSchema,
  keys: z.array(z.string()),
  requiredKeys: z.array(z.string()),
  missingRequired: z.array(z.string()),
  /** 键 → 掩码值（abcd…wxyz），用于导入前确认 */
  masked: z.record(z.string()),
});
export type CookieParsePreview = z.infer<typeof CookieParsePreviewSchema>;

/** 有效性测试结果 */
export const CookieTestResultSchema = z.object({
  id: z.string(),
  status: CookieStatusSchema,
  message: z.string(),
  testedAt: z.string(),
});
export type CookieTestResult = z.infer<typeof CookieTestResultSchema>;
