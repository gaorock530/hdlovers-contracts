/**
 * 抓取流水线相关契约：Cookie 凭证管理（P1）。
 * 运行/任务/Worker 契约在后续阶段补充。
 */
import { z } from 'zod';
export declare const CookieSiteCodeSchema: z.ZodEnum<["baidu_pan", "lgych"]>;
export type CookieSiteCode = z.infer<typeof CookieSiteCodeSchema>;
export declare const CookieStatusSchema: z.ZodEnum<["unknown", "valid", "invalid", "expiring"]>;
export type CookieStatus = z.infer<typeof CookieStatusSchema>;
/** 列表项 DTO —— 任何情况下都不含明文 Cookie */
export declare const CookieSummarySchema: z.ZodObject<{
    id: z.ZodString;
    siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
    label: z.ZodString;
    /** 解析出的键名清单（仅键名，无值） */
    keys: z.ZodArray<z.ZodString, "many">;
    /** 必填键是否齐全 */
    requiredSatisfied: z.ZodBoolean;
    /** 缺失的必填键 */
    missingRequired: z.ZodArray<z.ZodString, "many">;
    status: z.ZodEnum<["unknown", "valid", "invalid", "expiring"]>;
    /** 探测结果详情/失败原因（面向用户，无敏感值） */
    statusMessage: z.ZodOptional<z.ZodString>;
    version: z.ZodNumber;
    lastValidatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiresHint: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodString;
    siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
    label: z.ZodString;
    /** 解析出的键名清单（仅键名，无值） */
    keys: z.ZodArray<z.ZodString, "many">;
    /** 必填键是否齐全 */
    requiredSatisfied: z.ZodBoolean;
    /** 缺失的必填键 */
    missingRequired: z.ZodArray<z.ZodString, "many">;
    status: z.ZodEnum<["unknown", "valid", "invalid", "expiring"]>;
    /** 探测结果详情/失败原因（面向用户，无敏感值） */
    statusMessage: z.ZodOptional<z.ZodString>;
    version: z.ZodNumber;
    lastValidatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiresHint: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodString;
    siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
    label: z.ZodString;
    /** 解析出的键名清单（仅键名，无值） */
    keys: z.ZodArray<z.ZodString, "many">;
    /** 必填键是否齐全 */
    requiredSatisfied: z.ZodBoolean;
    /** 缺失的必填键 */
    missingRequired: z.ZodArray<z.ZodString, "many">;
    status: z.ZodEnum<["unknown", "valid", "invalid", "expiring"]>;
    /** 探测结果详情/失败原因（面向用户，无敏感值） */
    statusMessage: z.ZodOptional<z.ZodString>;
    version: z.ZodNumber;
    lastValidatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiresHint: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export type CookieSummary = z.infer<typeof CookieSummarySchema>;
/** 导入/更新请求体（raw 为浏览器复制的整串 Cookie） */
export declare const CookieUpsertBodySchema: z.ZodObject<{
    siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
    label: z.ZodString;
    raw: z.ZodString;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
    label: z.ZodString;
    raw: z.ZodString;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
    label: z.ZodString;
    raw: z.ZodString;
}, z.ZodTypeAny, "passthrough">>;
export type CookieUpsertBody = z.infer<typeof CookieUpsertBodySchema>;
/** 导入时的解析预览（不落库） */
export declare const CookieParsePreviewSchema: z.ZodObject<{
    siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
    keys: z.ZodArray<z.ZodString, "many">;
    requiredKeys: z.ZodArray<z.ZodString, "many">;
    missingRequired: z.ZodArray<z.ZodString, "many">;
    /** 键 → 掩码值（abcd…wxyz），用于导入前确认 */
    masked: z.ZodRecord<z.ZodString, z.ZodString>;
}, "strip", z.ZodTypeAny, {
    keys: string[];
    siteCode: "baidu_pan" | "lgych";
    missingRequired: string[];
    requiredKeys: string[];
    masked: Record<string, string>;
}, {
    keys: string[];
    siteCode: "baidu_pan" | "lgych";
    missingRequired: string[];
    requiredKeys: string[];
    masked: Record<string, string>;
}>;
export type CookieParsePreview = z.infer<typeof CookieParsePreviewSchema>;
/** 有效性测试结果 */
export declare const CookieTestResultSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodEnum<["unknown", "valid", "invalid", "expiring"]>;
    message: z.ZodString;
    testedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    status: "valid" | "unknown" | "invalid" | "expiring";
    id: string;
    testedAt: string;
}, {
    message: string;
    status: "valid" | "unknown" | "invalid" | "expiring";
    id: string;
    testedAt: string;
}>;
export type CookieTestResult = z.infer<typeof CookieTestResultSchema>;
