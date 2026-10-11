/**
 * 抓取流水线相关契约：Cookie 凭证管理（P1）+ 运行编排（P2）。
 * Worker 配对/心跳契约在 P3 补充。
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
/** 流水线阶段（对应 Python pipeline s1~s9） */
export declare const ScrapeStageSchema: z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>;
export type ScrapeStage = z.infer<typeof ScrapeStageSchema>;
/** 云端执行阶段（spawn Python 子进程，无大流量） */
export declare const CLOUD_STAGES: readonly ScrapeStage[];
/** 本地执行器阶段（P3 起 Worker 认领，s4~s8 有大流量/磁盘占用） */
export declare const WORKER_STAGES: readonly ScrapeStage[];
export declare const isCloudStage: (s: ScrapeStage) => boolean;
export declare const isWorkerStage: (s: ScrapeStage) => boolean;
/** 运行状态 */
export declare const RunStatusSchema: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
export type RunStatus = z.infer<typeof RunStatusSchema>;
/** 任务（资源 × 执行单元）状态 */
export declare const JobStatusSchema: z.ZodEnum<["queued", "claimed", "running", "paused", "interrupted", "done", "failed", "canceled"]>;
export type JobStatus = z.infer<typeof JobStatusSchema>;
/** 创建运行请求体 */
export declare const CreateRunBodySchema: z.ZodObject<{
    siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
    stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
    /** 每阶段最多处理条数，0 = 不限 */
    limit: z.ZodNumber;
    options: z.ZodOptional<z.ZodObject<{
        dryRun: z.ZodOptional<z.ZodBoolean>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        dryRun: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        dryRun: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
    stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
    /** 每阶段最多处理条数，0 = 不限 */
    limit: z.ZodNumber;
    options: z.ZodOptional<z.ZodObject<{
        dryRun: z.ZodOptional<z.ZodBoolean>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        dryRun: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        dryRun: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
    stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
    /** 每阶段最多处理条数，0 = 不限 */
    limit: z.ZodNumber;
    options: z.ZodOptional<z.ZodObject<{
        dryRun: z.ZodOptional<z.ZodBoolean>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        dryRun: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        dryRun: z.ZodOptional<z.ZodBoolean>;
    }, z.ZodTypeAny, "passthrough">>>;
}, z.ZodTypeAny, "passthrough">>;
export type CreateRunBody = z.infer<typeof CreateRunBodySchema>;
/** 运行（一次控制台启动 = 一条） */
export declare const ScrapeRunSchema: z.ZodObject<{
    runId: z.ZodString;
    siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
    stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
    limit: z.ZodNumber;
    options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
    mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
    batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    succeeded: z.ZodNumber;
    failed: z.ZodNumber;
    skipped: z.ZodNumber;
    /** 当前正在执行的云端阶段 */
    currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    runId: z.ZodString;
    siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
    stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
    limit: z.ZodNumber;
    options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
    mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
    batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    succeeded: z.ZodNumber;
    failed: z.ZodNumber;
    skipped: z.ZodNumber;
    /** 当前正在执行的云端阶段 */
    currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    runId: z.ZodString;
    siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
    stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
    limit: z.ZodNumber;
    options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
    mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
    batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    succeeded: z.ZodNumber;
    failed: z.ZodNumber;
    skipped: z.ZodNumber;
    /** 当前正在执行的云端阶段 */
    currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export type ScrapeRun = z.infer<typeof ScrapeRunSchema>;
/** 单资源任务（云端阶段仅做记录，Worker 阶段等待认领） */
export declare const ScrapeJobSchema: z.ZodObject<{
    id: z.ZodString;
    runId: z.ZodString;
    resourceId: z.ZodString;
    stage: z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>;
    /** 'cloud' | 'worker:<workerId>' */
    target: z.ZodString;
    status: z.ZodEnum<["queued", "claimed", "running", "paused", "interrupted", "done", "failed", "canceled"]>;
    progress: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    speed: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    etaSec: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    attempts: z.ZodNumber;
    maxAttempts: z.ZodNumber;
    error: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        type: z.ZodOptional<z.ZodString>;
        message: z.ZodOptional<z.ZodString>;
        ts: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        message?: string | undefined;
        type?: string | undefined;
        ts?: string | undefined;
    }, {
        message?: string | undefined;
        type?: string | undefined;
        ts?: string | undefined;
    }>>>;
    heartbeatAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodString;
    runId: z.ZodString;
    resourceId: z.ZodString;
    stage: z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>;
    /** 'cloud' | 'worker:<workerId>' */
    target: z.ZodString;
    status: z.ZodEnum<["queued", "claimed", "running", "paused", "interrupted", "done", "failed", "canceled"]>;
    progress: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    speed: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    etaSec: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    attempts: z.ZodNumber;
    maxAttempts: z.ZodNumber;
    error: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        type: z.ZodOptional<z.ZodString>;
        message: z.ZodOptional<z.ZodString>;
        ts: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        message?: string | undefined;
        type?: string | undefined;
        ts?: string | undefined;
    }, {
        message?: string | undefined;
        type?: string | undefined;
        ts?: string | undefined;
    }>>>;
    heartbeatAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodString;
    runId: z.ZodString;
    resourceId: z.ZodString;
    stage: z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>;
    /** 'cloud' | 'worker:<workerId>' */
    target: z.ZodString;
    status: z.ZodEnum<["queued", "claimed", "running", "paused", "interrupted", "done", "failed", "canceled"]>;
    progress: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    speed: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    etaSec: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    attempts: z.ZodNumber;
    maxAttempts: z.ZodNumber;
    error: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        type: z.ZodOptional<z.ZodString>;
        message: z.ZodOptional<z.ZodString>;
        ts: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        message?: string | undefined;
        type?: string | undefined;
        ts?: string | undefined;
    }, {
        message?: string | undefined;
        type?: string | undefined;
        ts?: string | undefined;
    }>>>;
    heartbeatAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export type ScrapeJob = z.infer<typeof ScrapeJobSchema>;
/** 事件/日志（pipeline_events，TTL 14 天） */
export declare const PipelineEventSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    runId: z.ZodString;
    ts: z.ZodString;
    level: z.ZodEnum<["debug", "info", "warn", "error", "success"]>;
    /** 'cloud' | workerId */
    source: z.ZodString;
    stage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    message: z.ZodString;
    meta: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodOptional<z.ZodString>;
    runId: z.ZodString;
    ts: z.ZodString;
    level: z.ZodEnum<["debug", "info", "warn", "error", "success"]>;
    /** 'cloud' | workerId */
    source: z.ZodString;
    stage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    message: z.ZodString;
    meta: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodOptional<z.ZodString>;
    runId: z.ZodString;
    ts: z.ZodString;
    level: z.ZodEnum<["debug", "info", "warn", "error", "success"]>;
    /** 'cloud' | workerId */
    source: z.ZodString;
    stage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    message: z.ZodString;
    meta: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
}, z.ZodTypeAny, "passthrough">>;
export type PipelineEvent = z.infer<typeof PipelineEventSchema>;
/** 全局看板汇总 */
export declare const ScrapeStatusSchema: z.ZodObject<{
    activeRun: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>>>;
    recentRuns: z.ZodArray<z.ZodObject<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>, "many">;
    backlog: z.ZodArray<z.ZodObject<{
        stage: z.ZodString;
        count: z.ZodNumber;
        errors: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        stage: string;
        count: number;
        errors: number;
    }, {
        stage: string;
        count: number;
        errors: number;
    }>, "many">;
    queuedJobs: z.ZodNumber;
    invalidCookies: z.ZodArray<z.ZodObject<{
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        label: z.ZodString;
        status: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: string;
        label: string;
        siteCode: "baidu_pan" | "lgych";
    }, {
        status: string;
        label: string;
        siteCode: "baidu_pan" | "lgych";
    }>, "many">;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    activeRun: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>>>;
    recentRuns: z.ZodArray<z.ZodObject<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>, "many">;
    backlog: z.ZodArray<z.ZodObject<{
        stage: z.ZodString;
        count: z.ZodNumber;
        errors: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        stage: string;
        count: number;
        errors: number;
    }, {
        stage: string;
        count: number;
        errors: number;
    }>, "many">;
    queuedJobs: z.ZodNumber;
    invalidCookies: z.ZodArray<z.ZodObject<{
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        label: z.ZodString;
        status: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: string;
        label: string;
        siteCode: "baidu_pan" | "lgych";
    }, {
        status: string;
        label: string;
        siteCode: "baidu_pan" | "lgych";
    }>, "many">;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    activeRun: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>>>;
    recentRuns: z.ZodArray<z.ZodObject<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
        runId: z.ZodString;
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        stages: z.ZodArray<z.ZodEnum<["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]>, "many">;
        limit: z.ZodNumber;
        options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        status: z.ZodEnum<["running", "pausing", "paused", "stopping", "stopped", "done", "failed"]>;
        mode: z.ZodOptional<z.ZodEnum<["batch", "manual"]>>;
        batchId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        total: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        succeeded: z.ZodNumber;
        failed: z.ZodNumber;
        skipped: z.ZodNumber;
        /** 当前正在执行的云端阶段 */
        currentStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodString>;
    }, z.ZodTypeAny, "passthrough">>, "many">;
    backlog: z.ZodArray<z.ZodObject<{
        stage: z.ZodString;
        count: z.ZodNumber;
        errors: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        stage: string;
        count: number;
        errors: number;
    }, {
        stage: string;
        count: number;
        errors: number;
    }>, "many">;
    queuedJobs: z.ZodNumber;
    invalidCookies: z.ZodArray<z.ZodObject<{
        siteCode: z.ZodEnum<["baidu_pan", "lgych"]>;
        label: z.ZodString;
        status: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: string;
        label: string;
        siteCode: "baidu_pan" | "lgych";
    }, {
        status: string;
        label: string;
        siteCode: "baidu_pan" | "lgych";
    }>, "many">;
}, z.ZodTypeAny, "passthrough">>;
export type ScrapeStatus = z.infer<typeof ScrapeStatusSchema>;
/** SSE 一次性令牌（EventSource 无法携带自定义头，用短时 token 鉴权） */
export declare const SseTokenSchema: z.ZodObject<{
    token: z.ZodString;
    sid: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
    sid: string;
}, {
    token: string;
    sid: string;
}>;
export type SseToken = z.infer<typeof SseTokenSchema>;
