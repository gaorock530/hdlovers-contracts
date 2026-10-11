/**
 * 用户相关契约：对外 DTO（绝不含 password）、登录/注册请求体。
 */
import { z } from 'zod';
import {
  RegisteredBySchema,
  RoleTypeSchema,
  UserStatusSchema,
  VipTypeSchema,
} from './enums';
import { IsoDateStringSchema } from './common';

/** 对外用户信息（selfinfo / 管理端列表等） */
export const UserDtoSchema = z
  .object({
    id: z.string(),
    username: z.string(),
    phone: z.string().optional(),
    email: z.string().optional(),
    avatar: z.string().optional(),
    registerDate: IsoDateStringSchema.optional(),
    registeredBy: RegisteredBySchema.optional(),
    status: UserStatusSchema.optional(),
    role: RoleTypeSchema.or(z.string()).optional(),
    abnormalCounter: z.number().optional(),
    abnormalBehaivor: z.enum(['bot', 'stolen', 'transaction']).nullable().optional(),
    promotionCode: z.string().optional(),
    promotionCodeUsed: z.string().nullable().optional(),
    vip: VipTypeSchema.or(z.literal(false)).optional(),
    vipStartToFinish: z.array(IsoDateStringSchema).nullable().optional(),
    coins: z.number().optional(),
    points: z.number().optional(),
    dailySignin: IsoDateStringSchema.nullable().optional(),
    dailyOpenSite: IsoDateStringSchema.nullable().optional(),
    dailyWatchDetail: IsoDateStringSchema.nullable().optional(),
    lastQuestionAskedDate: IsoDateStringSchema.nullable().optional(),
  })
  .passthrough();
export type UserDto = z.infer<typeof UserDtoSchema>;

/** POST /user/login 请求体 */
export const LoginBodySchema = z
  .object({
    username: z.string().min(1),
    password: z.string().min(1),
    ip: z.string().optional(),
  })
  .passthrough();
export type LoginBody = z.infer<typeof LoginBodySchema>;

/** POST /user/register 请求体 */
export const RegisterBodySchema = z
  .object({
    username: z.string().min(2),
    password: z.string().min(6),
    registeredBy: RegisteredBySchema,
    phone: z.string().optional(),
    email: z.string().email().optional(),
    verifyCode: z.string().optional(),
    promotionCode: z.string().optional(),
    ip: z.string().optional(),
  })
  .passthrough();
export type RegisterBody = z.infer<typeof RegisterBodySchema>;

/** 登录成功返回（token + 用户摘要） */
export const AuthResultSchema = z
  .object({
    token: z.string().optional(),
    id: z.string().optional(),
    username: z.string().optional(),
    role: z.string().optional(),
    code: z.string().optional(),
  })
  .passthrough();
export type AuthResult = z.infer<typeof AuthResultSchema>;
