/**
 * 抓取流水线相关契约：Cookie 凭证管理（P1）+ 运行编排（P2）。
 * Worker 配对/心跳契约在 P3 补充。
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

// ─────────────────────────────────────────────────────────────────
// P2：运行编排（Orchestrator / 控制台）
// ─────────────────────────────────────────────────────────────────

/** 流水线阶段（对应 Python pipeline s1~s9） */
export const ScrapeStageSchema = z.enum(['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9']);
export type ScrapeStage = z.infer<typeof ScrapeStageSchema>;

/** 云端执行阶段（spawn Python 子进程，无大流量） */
export const CLOUD_STAGES: readonly ScrapeStage[] = ['s1', 's2', 's3', 's9'] as const;
/** 本地执行器阶段（P3 起 Worker 认领，s4~s8 有大流量/磁盘占用） */
export const WORKER_STAGES: readonly ScrapeStage[] = ['s4', 's5', 's6', 's7', 's8'] as const;

export const isCloudStage = (s: ScrapeStage): boolean => (CLOUD_STAGES as readonly string[]).includes(s);
export const isWorkerStage = (s: ScrapeStage): boolean => (WORKER_STAGES as readonly string[]).includes(s);

/** 运行状态 */
export const RunStatusSchema = z.enum(['running', 'pausing', 'paused', 'stopping', 'stopped', 'done', 'failed']);
export type RunStatus = z.infer<typeof RunStatusSchema>;

/** 任务（资源 × 执行单元）状态 */
export const JobStatusSchema = z.enum([
  'queued',
  'claimed',
  'running',
  'paused',
  'interrupted',
  'done',
  'failed',
  'canceled',
]);
export type JobStatus = z.infer<typeof JobStatusSchema>;

/** 创建运行请求体 */
export const CreateRunBodySchema = z
  .object({
    siteCode: CookieSiteCodeSchema,
    stages: z.array(ScrapeStageSchema).min(1),
    /** 每阶段最多处理条数，0 = 不限 */
    limit: z.number().int().min(0).max(500),
    options: z
      .object({
        dryRun: z.boolean().optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough();
export type CreateRunBody = z.infer<typeof CreateRunBodySchema>;

/** 运行（一次控制台启动 = 一条） */
export const ScrapeRunSchema = z
  .object({
    runId: z.string(),
    siteCode: CookieSiteCodeSchema,
    stages: z.array(ScrapeStageSchema),
    limit: z.number().int(),
    options: z.record(z.any()).optional(),
    status: RunStatusSchema,
    mode: z.enum(['batch', 'manual']).optional(),
    batchId: z.string().nullable().optional(),
    total: z.number().int().nullable().optional(),
    succeeded: z.number().int(),
    failed: z.number().int(),
    skipped: z.number().int(),
    /** 当前正在执行的云端阶段 */
    currentStage: z.string().nullable().optional(),
    startedAt: z.string().nullable().optional(),
    finishedAt: z.string().nullable().optional(),
    createdBy: z.string().nullable().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .passthrough();
export type ScrapeRun = z.infer<typeof ScrapeRunSchema>;

/** 单资源任务（云端阶段仅做记录，Worker 阶段等待认领） */
export const ScrapeJobSchema = z
  .object({
    id: z.string(),
    runId: z.string(),
    resourceId: z.string(),
    stage: ScrapeStageSchema,
    /** 'cloud' | 'worker:<workerId>' */
    target: z.string(),
    status: JobStatusSchema,
    progress: z.number().min(0).max(1).nullable().optional(),
    speed: z.string().nullable().optional(),
    etaSec: z.number().int().nullable().optional(),
    attempts: z.number().int(),
    maxAttempts: z.number().int(),
    error: z
      .object({
        type: z.string().optional(),
        message: z.string().optional(),
        ts: z.string().optional(),
      })
      .nullable()
      .optional(),
    heartbeatAt: z.string().nullable().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  })
  .passthrough();
export type ScrapeJob = z.infer<typeof ScrapeJobSchema>;

/** 事件/日志（pipeline_events，TTL 14 天） */
export const PipelineEventSchema = z
  .object({
    id: z.string().optional(),
    runId: z.string(),
    ts: z.string(),
    level: z.enum(['debug', 'info', 'warn', 'error', 'success']),
    /** 'cloud' | workerId */
    source: z.string(),
    stage: z.string().nullable().optional(),
    message: z.string(),
    meta: z.record(z.any()).nullable().optional(),
  })
  .passthrough();
export type PipelineEvent = z.infer<typeof PipelineEventSchema>;

/** 全局看板汇总 */
export const ScrapeStatusSchema = z
  .object({
    activeRun: ScrapeRunSchema.nullable().optional(),
    recentRuns: z.array(ScrapeRunSchema),
    backlog: z.array(
      z.object({
        stage: z.string(),
        count: z.number().int(),
        errors: z.number().int(),
      }),
    ),
    queuedJobs: z.number().int(),
    invalidCookies: z.array(
      z.object({
        siteCode: CookieSiteCodeSchema,
        label: z.string(),
        status: z.string(),
      }),
    ),
  })
  .passthrough();
export type ScrapeStatus = z.infer<typeof ScrapeStatusSchema>;

/** SSE 一次性令牌（EventSource 无法携带自定义头，用短时 token 鉴权） */
export const SseTokenSchema = z.object({
  token: z.string(),
  sid: z.string(),
});
export type SseToken = z.infer<typeof SseTokenSchema>;

// ─────────────────────────────────────────────────────────────────
// P3 前置：资源列表 / 分类 / 重试
// ─────────────────────────────────────────────────────────────────

/** 资源分类（对应站点栏目路径） */
export const ResourceCategorySchema = z.enum(['bluray', 'dvd', 'hd', 'concert', 'hires']);
export type ResourceCategory = z.infer<typeof ResourceCategorySchema>;

/** 分类 → 站点栏目路径 */
export const RESOURCE_CATEGORY_FILE: Record<ResourceCategory, string> = {
  bluray: '/bluray',
  dvd: '/dvd',
  hd: '/hd',
  concert: '/concert',
  hires: '/hires',
};

/** 资源生命周期阶段值（与 Python `Stage` 一致，大写） */
export const ResourceStageSchema = z.enum([
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
export type ResourceStage = z.infer<typeof ResourceStageSchema>;

/** 资源列表项 DTO */
export const ScrapeResourceSchema = z
  .object({
    /** 资源文档 `_id` 字符串（重试用） */
    id: z.string(),
    /** 资源文档 uuid `id`（详情/编辑/删除/上线用，与「资源管理」一致） */
    resourceId: z.string().nullable().optional(),
    title: z.string().optional(),
    type: z.string().nullable().optional(),
    category: ResourceCategorySchema.nullable().optional(),
    region: z.string().nullable().optional(),
    format: z.string().nullable().optional(),
    quality: z.string().nullable().optional(),
    price: z.number().nullable().optional(),
    downloadCount: z.number().nullable().optional(),
    popularity: z.number().nullable().optional(),
    publishedDate: z.string().nullable().optional(),
    /** 最后完成的阶段 */
    stage: ResourceStageSchema,
    stageUpdatedAt: z.string().nullable().optional(),
    /** 失败信息（`pipeline_error`） */
    error: z
      .object({
        stage: ResourceStageSchema,
        reason: z.string(),
        ts: z.string().nullable().optional(),
      })
      .nullable()
      .optional(),
    batchId: z.string().nullable().optional(),
    originalUrl: z.string().nullable().optional(),
    createdAt: z.string().nullable().optional(),
  })
  .passthrough();
export type ScrapeResource = z.infer<typeof ScrapeResourceSchema>;

/** 资源列表查询参数 */
export const ListResourcesQuerySchema = z
  .object({
    p: z.number().int().min(1).optional(),
    size: z.number().int().min(1).max(100).optional(),
    stage: ResourceStageSchema.optional(),
    category: ResourceCategorySchema.optional(),
    /** 仅看失败资源 */
    hasError: z.boolean().optional(),
    /** 关键词（title / originalId / originalUrl） */
    q: z.string().optional(),
    siteCode: CookieSiteCodeSchema.optional(),
  })
  .passthrough();
export type ListResourcesQuery = z.infer<typeof ListResourcesQuerySchema>;

/** 资源列表结果 */
export const ListResourcesResultSchema = z
  .object({
    list: z.array(ScrapeResourceSchema),
    total: z.number().int(),
    page: z.number().int(),
    size: z.number().int(),
  })
  .passthrough();
export type ListResourcesResult = z.infer<typeof ListResourcesResultSchema>;

/** 单资源重试请求体（不传 fromStage 时自动取失败/当前阶段） */
export const RetryResourceBodySchema = z
  .object({
    fromStage: ScrapeStageSchema.optional(),
  })
  .passthrough();
export type RetryResourceBody = z.infer<typeof RetryResourceBodySchema>;

/** 单资源重试结果 */
export const RetryResourceResultSchema = z
  .object({
    ok: z.boolean(),
    resourceId: z.string(),
    fromStage: ScrapeStageSchema,
    /** cloud = 已 spawn 子进程；worker = 重新入队等待执行器认领 */
    mode: z.enum(['cloud', 'worker']),
  })
  .passthrough();
export type RetryResourceResult = z.infer<typeof RetryResourceResultSchema>;

/** 删除运行结果（只清理 run/job/event，不触碰资源） */
export const DeleteRunResultSchema = z
  .object({
    ok: z.boolean(),
    runId: z.string(),
    removedJobs: z.number().int(),
    removedEvents: z.number().int(),
  })
  .passthrough();
export type DeleteRunResult = z.infer<typeof DeleteRunResultSchema>;

/** 审核通过并上线结果（解除 `newAdded`，资源对外可见） */
export const PublishResourceResultSchema = z
  .object({
    ok: z.boolean(),
    resourceId: z.string(),
  })
  .passthrough();
export type PublishResourceResult = z.infer<typeof PublishResourceResultSchema>;
