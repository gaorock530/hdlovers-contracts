"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResultSchema = exports.RegisterBodySchema = exports.LoginBodySchema = exports.UserDtoSchema = void 0;
/**
 * 用户相关契约：对外 DTO（绝不含 password）、登录/注册请求体。
 */
const zod_1 = require("zod");
const enums_1 = require("./enums");
const common_1 = require("./common");
/** 对外用户信息（selfinfo / 管理端列表等） */
exports.UserDtoSchema = zod_1.z
    .object({
    id: zod_1.z.string(),
    username: zod_1.z.string(),
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    avatar: zod_1.z.string().optional(),
    registerDate: common_1.IsoDateStringSchema.optional(),
    registeredBy: enums_1.RegisteredBySchema.optional(),
    status: enums_1.UserStatusSchema.optional(),
    role: enums_1.RoleTypeSchema.or(zod_1.z.string()).optional(),
    abnormalCounter: zod_1.z.number().optional(),
    abnormalBehaivor: zod_1.z.enum(['bot', 'stolen', 'transaction']).nullable().optional(),
    promotionCode: zod_1.z.string().optional(),
    promotionCodeUsed: zod_1.z.string().nullable().optional(),
    vip: enums_1.VipTypeSchema.or(zod_1.z.literal(false)).optional(),
    vipStartToFinish: zod_1.z.array(common_1.IsoDateStringSchema).nullable().optional(),
    coins: zod_1.z.number().optional(),
    points: zod_1.z.number().optional(),
    dailySignin: common_1.IsoDateStringSchema.nullable().optional(),
    dailyOpenSite: common_1.IsoDateStringSchema.nullable().optional(),
    dailyWatchDetail: common_1.IsoDateStringSchema.nullable().optional(),
    lastQuestionAskedDate: common_1.IsoDateStringSchema.nullable().optional(),
})
    .passthrough();
/** POST /user/login 请求体 */
exports.LoginBodySchema = zod_1.z
    .object({
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
    ip: zod_1.z.string().optional(),
})
    .passthrough();
/** POST /user/register 请求体 */
exports.RegisterBodySchema = zod_1.z
    .object({
    username: zod_1.z.string().min(2),
    password: zod_1.z.string().min(6),
    registeredBy: enums_1.RegisteredBySchema,
    phone: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    verifyCode: zod_1.z.string().optional(),
    promotionCode: zod_1.z.string().optional(),
    ip: zod_1.z.string().optional(),
})
    .passthrough();
/** 登录成功返回（token + 用户摘要） */
exports.AuthResultSchema = zod_1.z
    .object({
    token: zod_1.z.string().optional(),
    id: zod_1.z.string().optional(),
    username: zod_1.z.string().optional(),
    role: zod_1.z.string().optional(),
    code: zod_1.z.string().optional(),
})
    .passthrough();
