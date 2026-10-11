"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieTestResultSchema = exports.CookieParsePreviewSchema = exports.CookieUpsertBodySchema = exports.CookieSummarySchema = exports.CookieStatusSchema = exports.CookieSiteCodeSchema = void 0;
/**
 * 抓取流水线相关契约：Cookie 凭证管理（P1）。
 * 运行/任务/Worker 契约在后续阶段补充。
 */
const zod_1 = require("zod");
// ── 站点标识（新增资源站时扩展此枚举） ───────────────────────────
exports.CookieSiteCodeSchema = zod_1.z.enum(['baidu_pan', 'lgych']);
// ── Cookie 有效性状态 ────────────────────────────────────────────
// unknown  未测试
// valid    最近一次探测通过
// invalid  最近一次探测失败（登录态失效）
// expiring 临近过期提醒（仍可用）
exports.CookieStatusSchema = zod_1.z.enum(['unknown', 'valid', 'invalid', 'expiring']);
/** 列表项 DTO —— 任何情况下都不含明文 Cookie */
exports.CookieSummarySchema = zod_1.z
    .object({
    id: zod_1.z.string(),
    siteCode: exports.CookieSiteCodeSchema,
    label: zod_1.z.string(),
    /** 解析出的键名清单（仅键名，无值） */
    keys: zod_1.z.array(zod_1.z.string()),
    /** 必填键是否齐全 */
    requiredSatisfied: zod_1.z.boolean(),
    /** 缺失的必填键 */
    missingRequired: zod_1.z.array(zod_1.z.string()),
    status: exports.CookieStatusSchema,
    /** 探测结果详情/失败原因（面向用户，无敏感值） */
    statusMessage: zod_1.z.string().optional(),
    version: zod_1.z.number().int(),
    lastValidatedAt: zod_1.z.string().nullable().optional(),
    expiresHint: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
})
    .passthrough();
/** 导入/更新请求体（raw 为浏览器复制的整串 Cookie） */
exports.CookieUpsertBodySchema = zod_1.z
    .object({
    siteCode: exports.CookieSiteCodeSchema,
    label: zod_1.z.string().min(1).max(50),
    raw: zod_1.z.string().min(3),
})
    .passthrough();
/** 导入时的解析预览（不落库） */
exports.CookieParsePreviewSchema = zod_1.z.object({
    siteCode: exports.CookieSiteCodeSchema,
    keys: zod_1.z.array(zod_1.z.string()),
    requiredKeys: zod_1.z.array(zod_1.z.string()),
    missingRequired: zod_1.z.array(zod_1.z.string()),
    /** 键 → 掩码值（abcd…wxyz），用于导入前确认 */
    masked: zod_1.z.record(zod_1.z.string()),
});
/** 有效性测试结果 */
exports.CookieTestResultSchema = zod_1.z.object({
    id: zod_1.z.string(),
    status: exports.CookieStatusSchema,
    message: zod_1.z.string(),
    testedAt: zod_1.z.string(),
});
