"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishResourceResultSchema = exports.DeleteRunResultSchema = exports.RetryResourceResultSchema = exports.RetryResourceBodySchema = exports.ListResourcesResultSchema = exports.ListResourcesQuerySchema = exports.ScrapeResourceSchema = exports.ResourceStageSchema = exports.RESOURCE_CATEGORY_FILE = exports.ResourceCategorySchema = exports.SseTokenSchema = exports.ScrapeStatusSchema = exports.PipelineEventSchema = exports.ScrapeJobSchema = exports.ScrapeRunSchema = exports.CreateRunBodySchema = exports.JobStatusSchema = exports.RunStatusSchema = exports.isWorkerStage = exports.isCloudStage = exports.WORKER_STAGES = exports.CLOUD_STAGES = exports.ScrapeStageSchema = exports.CookieTestResultSchema = exports.CookieParsePreviewSchema = exports.CookieUpsertBodySchema = exports.CookieSummarySchema = exports.CookieStatusSchema = exports.CookieSiteCodeSchema = void 0;
/**
 * 抓取流水线相关契约：Cookie 凭证管理（P1）+ 运行编排（P2）。
 * Worker 配对/心跳契约在 P3 补充。
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
// ─────────────────────────────────────────────────────────────────
// P2：运行编排（Orchestrator / 控制台）
// ─────────────────────────────────────────────────────────────────
/** 流水线阶段（对应 Python pipeline s1~s9） */
exports.ScrapeStageSchema = zod_1.z.enum(['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9']);
/** 云端执行阶段（spawn Python 子进程，无大流量） */
exports.CLOUD_STAGES = ['s1', 's2', 's3', 's9'];
/** 本地执行器阶段（P3 起 Worker 认领，s4~s8 有大流量/磁盘占用） */
exports.WORKER_STAGES = ['s4', 's5', 's6', 's7', 's8'];
const isCloudStage = (s) => exports.CLOUD_STAGES.includes(s);
exports.isCloudStage = isCloudStage;
const isWorkerStage = (s) => exports.WORKER_STAGES.includes(s);
exports.isWorkerStage = isWorkerStage;
/** 运行状态 */
exports.RunStatusSchema = zod_1.z.enum(['running', 'pausing', 'paused', 'stopping', 'stopped', 'done', 'failed']);
/** 任务（资源 × 执行单元）状态 */
exports.JobStatusSchema = zod_1.z.enum([
    'queued',
    'claimed',
    'running',
    'paused',
    'interrupted',
    'done',
    'failed',
    'canceled',
]);
/** 创建运行请求体 */
exports.CreateRunBodySchema = zod_1.z
    .object({
    siteCode: exports.CookieSiteCodeSchema,
    stages: zod_1.z.array(exports.ScrapeStageSchema).min(1),
    /** 每阶段最多处理条数，0 = 不限 */
    limit: zod_1.z.number().int().min(0).max(500),
    options: zod_1.z
        .object({
        dryRun: zod_1.z.boolean().optional(),
    })
        .passthrough()
        .optional(),
})
    .passthrough();
/** 运行（一次控制台启动 = 一条） */
exports.ScrapeRunSchema = zod_1.z
    .object({
    runId: zod_1.z.string(),
    siteCode: exports.CookieSiteCodeSchema,
    stages: zod_1.z.array(exports.ScrapeStageSchema),
    limit: zod_1.z.number().int(),
    options: zod_1.z.record(zod_1.z.any()).optional(),
    status: exports.RunStatusSchema,
    mode: zod_1.z.enum(['batch', 'manual']).optional(),
    batchId: zod_1.z.string().nullable().optional(),
    total: zod_1.z.number().int().nullable().optional(),
    succeeded: zod_1.z.number().int(),
    failed: zod_1.z.number().int(),
    skipped: zod_1.z.number().int(),
    /** 当前正在执行的云端阶段 */
    currentStage: zod_1.z.string().nullable().optional(),
    startedAt: zod_1.z.string().nullable().optional(),
    finishedAt: zod_1.z.string().nullable().optional(),
    createdBy: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
})
    .passthrough();
/** 单资源任务（云端阶段仅做记录，Worker 阶段等待认领） */
exports.ScrapeJobSchema = zod_1.z
    .object({
    id: zod_1.z.string(),
    runId: zod_1.z.string(),
    resourceId: zod_1.z.string(),
    stage: exports.ScrapeStageSchema,
    /** 'cloud' | 'worker:<workerId>' */
    target: zod_1.z.string(),
    status: exports.JobStatusSchema,
    progress: zod_1.z.number().min(0).max(1).nullable().optional(),
    speed: zod_1.z.string().nullable().optional(),
    etaSec: zod_1.z.number().int().nullable().optional(),
    attempts: zod_1.z.number().int(),
    maxAttempts: zod_1.z.number().int(),
    error: zod_1.z
        .object({
        type: zod_1.z.string().optional(),
        message: zod_1.z.string().optional(),
        ts: zod_1.z.string().optional(),
    })
        .nullable()
        .optional(),
    heartbeatAt: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.string().optional(),
    updatedAt: zod_1.z.string().optional(),
})
    .passthrough();
/** 事件/日志（pipeline_events，TTL 14 天） */
exports.PipelineEventSchema = zod_1.z
    .object({
    id: zod_1.z.string().optional(),
    runId: zod_1.z.string(),
    ts: zod_1.z.string(),
    level: zod_1.z.enum(['debug', 'info', 'warn', 'error', 'success']),
    /** 'cloud' | workerId */
    source: zod_1.z.string(),
    stage: zod_1.z.string().nullable().optional(),
    message: zod_1.z.string(),
    meta: zod_1.z.record(zod_1.z.any()).nullable().optional(),
})
    .passthrough();
/** 全局看板汇总 */
exports.ScrapeStatusSchema = zod_1.z
    .object({
    activeRun: exports.ScrapeRunSchema.nullable().optional(),
    recentRuns: zod_1.z.array(exports.ScrapeRunSchema),
    backlog: zod_1.z.array(zod_1.z.object({
        stage: zod_1.z.string(),
        count: zod_1.z.number().int(),
        errors: zod_1.z.number().int(),
    })),
    queuedJobs: zod_1.z.number().int(),
    invalidCookies: zod_1.z.array(zod_1.z.object({
        siteCode: exports.CookieSiteCodeSchema,
        label: zod_1.z.string(),
        status: zod_1.z.string(),
    })),
})
    .passthrough();
/** SSE 一次性令牌（EventSource 无法携带自定义头，用短时 token 鉴权） */
exports.SseTokenSchema = zod_1.z.object({
    token: zod_1.z.string(),
    sid: zod_1.z.string(),
});
// ─────────────────────────────────────────────────────────────────
// P3 前置：资源列表 / 分类 / 重试
// ─────────────────────────────────────────────────────────────────
/** 资源分类（对应站点栏目路径） */
exports.ResourceCategorySchema = zod_1.z.enum(['bluray', 'dvd', 'hd', 'concert', 'hires']);
/** 分类 → 站点栏目路径 */
exports.RESOURCE_CATEGORY_FILE = {
    bluray: '/bluray',
    dvd: '/dvd',
    hd: '/hd',
    concert: '/concert',
    hires: '/hires',
};
/** 资源生命周期阶段值（与 Python `Stage` 一致，大写） */
exports.ResourceStageSchema = zod_1.z.enum([
    'SCRAPED',
    'IMAGES_OK',
    'PAN_OK',
    'DOWNLOADED',
    'EXTRACTED',
    'CLEANED',
    'COMPRESSED',
    'UPLOADED',
    'SHARED',
]);
/** 资源列表项 DTO */
exports.ScrapeResourceSchema = zod_1.z
    .object({
    /** 资源文档 `_id` 字符串（重试用） */
    id: zod_1.z.string(),
    /** 资源文档 uuid `id`（详情/编辑/删除/上线用，与「资源管理」一致） */
    resourceId: zod_1.z.string().nullable().optional(),
    title: zod_1.z.string().optional(),
    type: zod_1.z.string().nullable().optional(),
    category: exports.ResourceCategorySchema.nullable().optional(),
    region: zod_1.z.string().nullable().optional(),
    format: zod_1.z.string().nullable().optional(),
    quality: zod_1.z.string().nullable().optional(),
    price: zod_1.z.number().nullable().optional(),
    downloadCount: zod_1.z.number().nullable().optional(),
    popularity: zod_1.z.number().nullable().optional(),
    publishedDate: zod_1.z.string().nullable().optional(),
    /** 最后完成的阶段 */
    stage: exports.ResourceStageSchema,
    stageUpdatedAt: zod_1.z.string().nullable().optional(),
    /** 失败信息（`pipeline_error`） */
    error: zod_1.z
        .object({
        stage: exports.ResourceStageSchema,
        reason: zod_1.z.string(),
        ts: zod_1.z.string().nullable().optional(),
    })
        .nullable()
        .optional(),
    batchId: zod_1.z.string().nullable().optional(),
    originalUrl: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.string().nullable().optional(),
})
    .passthrough();
/** 资源列表查询参数 */
exports.ListResourcesQuerySchema = zod_1.z
    .object({
    p: zod_1.z.number().int().min(1).optional(),
    size: zod_1.z.number().int().min(1).max(100).optional(),
    stage: exports.ResourceStageSchema.optional(),
    category: exports.ResourceCategorySchema.optional(),
    /** 仅看失败资源 */
    hasError: zod_1.z.boolean().optional(),
    /** 关键词（title / originalId / originalUrl） */
    q: zod_1.z.string().optional(),
    siteCode: exports.CookieSiteCodeSchema.optional(),
})
    .passthrough();
/** 资源列表结果 */
exports.ListResourcesResultSchema = zod_1.z
    .object({
    list: zod_1.z.array(exports.ScrapeResourceSchema),
    total: zod_1.z.number().int(),
    page: zod_1.z.number().int(),
    size: zod_1.z.number().int(),
})
    .passthrough();
/** 单资源重试请求体（不传 fromStage 时自动取失败/当前阶段） */
exports.RetryResourceBodySchema = zod_1.z
    .object({
    fromStage: exports.ScrapeStageSchema.optional(),
})
    .passthrough();
/** 单资源重试结果 */
exports.RetryResourceResultSchema = zod_1.z
    .object({
    ok: zod_1.z.boolean(),
    resourceId: zod_1.z.string(),
    fromStage: exports.ScrapeStageSchema,
    /** cloud = 已 spawn 子进程；worker = 重新入队等待执行器认领 */
    mode: zod_1.z.enum(['cloud', 'worker']),
})
    .passthrough();
/** 删除运行结果（只清理 run/job/event，不触碰资源） */
exports.DeleteRunResultSchema = zod_1.z
    .object({
    ok: zod_1.z.boolean(),
    runId: zod_1.z.string(),
    removedJobs: zod_1.z.number().int(),
    removedEvents: zod_1.z.number().int(),
})
    .passthrough();
/** 审核通过并上线结果（解除 `newAdded`，资源对外可见） */
exports.PublishResourceResultSchema = zod_1.z
    .object({
    ok: zod_1.z.boolean(),
    resourceId: zod_1.z.string(),
})
    .passthrough();
