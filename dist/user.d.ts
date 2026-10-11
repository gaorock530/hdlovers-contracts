/**
 * 用户相关契约：对外 DTO（绝不含 password）、登录/注册请求体。
 */
import { z } from 'zod';
/** 对外用户信息（selfinfo / 管理端列表等） */
export declare const UserDtoSchema: z.ZodObject<{
    id: z.ZodString;
    username: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
    registerDate: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodString]>>;
    registeredBy: z.ZodOptional<z.ZodEnum<["phone", "email"]>>;
    status: z.ZodOptional<z.ZodEnum<["normal", "inactive", "frozen", "banned", "unsubscribe"]>>;
    role: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["user:normal", "user:month", "user:year", "user:forever", "admin:normal", "admin:owner"]>, z.ZodString]>>;
    abnormalCounter: z.ZodOptional<z.ZodNumber>;
    abnormalBehaivor: z.ZodOptional<z.ZodNullable<z.ZodEnum<["bot", "stolen", "transaction"]>>>;
    promotionCode: z.ZodOptional<z.ZodString>;
    promotionCodeUsed: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    vip: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["month", "year", "forever"]>, z.ZodLiteral<false>]>>;
    vipStartToFinish: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodString]>, "many">>>;
    coins: z.ZodOptional<z.ZodNumber>;
    points: z.ZodOptional<z.ZodNumber>;
    dailySignin: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodString]>>>;
    dailyOpenSite: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodString]>>>;
    dailyWatchDetail: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodString]>>>;
    lastQuestionAskedDate: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodString]>>>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    id: z.ZodString;
    username: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
    registerDate: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodString]>>;
    registeredBy: z.ZodOptional<z.ZodEnum<["phone", "email"]>>;
    status: z.ZodOptional<z.ZodEnum<["normal", "inactive", "frozen", "banned", "unsubscribe"]>>;
    role: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["user:normal", "user:month", "user:year", "user:forever", "admin:normal", "admin:owner"]>, z.ZodString]>>;
    abnormalCounter: z.ZodOptional<z.ZodNumber>;
    abnormalBehaivor: z.ZodOptional<z.ZodNullable<z.ZodEnum<["bot", "stolen", "transaction"]>>>;
    promotionCode: z.ZodOptional<z.ZodString>;
    promotionCodeUsed: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    vip: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["month", "year", "forever"]>, z.ZodLiteral<false>]>>;
    vipStartToFinish: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodString]>, "many">>>;
    coins: z.ZodOptional<z.ZodNumber>;
    points: z.ZodOptional<z.ZodNumber>;
    dailySignin: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodString]>>>;
    dailyOpenSite: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodString]>>>;
    dailyWatchDetail: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodString]>>>;
    lastQuestionAskedDate: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodString]>>>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    id: z.ZodString;
    username: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodString>;
    registerDate: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodString]>>;
    registeredBy: z.ZodOptional<z.ZodEnum<["phone", "email"]>>;
    status: z.ZodOptional<z.ZodEnum<["normal", "inactive", "frozen", "banned", "unsubscribe"]>>;
    role: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["user:normal", "user:month", "user:year", "user:forever", "admin:normal", "admin:owner"]>, z.ZodString]>>;
    abnormalCounter: z.ZodOptional<z.ZodNumber>;
    abnormalBehaivor: z.ZodOptional<z.ZodNullable<z.ZodEnum<["bot", "stolen", "transaction"]>>>;
    promotionCode: z.ZodOptional<z.ZodString>;
    promotionCodeUsed: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    vip: z.ZodOptional<z.ZodUnion<[z.ZodEnum<["month", "year", "forever"]>, z.ZodLiteral<false>]>>;
    vipStartToFinish: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodString]>, "many">>>;
    coins: z.ZodOptional<z.ZodNumber>;
    points: z.ZodOptional<z.ZodNumber>;
    dailySignin: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodString]>>>;
    dailyOpenSite: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodString]>>>;
    dailyWatchDetail: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodString]>>>;
    lastQuestionAskedDate: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodString]>>>;
}, z.ZodTypeAny, "passthrough">>;
export type UserDto = z.infer<typeof UserDtoSchema>;
/** POST /user/login 请求体 */
export declare const LoginBodySchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    ip: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    username: z.ZodString;
    password: z.ZodString;
    ip: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    username: z.ZodString;
    password: z.ZodString;
    ip: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export type LoginBody = z.infer<typeof LoginBodySchema>;
/** POST /user/register 请求体 */
export declare const RegisterBodySchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    registeredBy: z.ZodEnum<["phone", "email"]>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    verifyCode: z.ZodOptional<z.ZodString>;
    promotionCode: z.ZodOptional<z.ZodString>;
    ip: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    username: z.ZodString;
    password: z.ZodString;
    registeredBy: z.ZodEnum<["phone", "email"]>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    verifyCode: z.ZodOptional<z.ZodString>;
    promotionCode: z.ZodOptional<z.ZodString>;
    ip: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    username: z.ZodString;
    password: z.ZodString;
    registeredBy: z.ZodEnum<["phone", "email"]>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    verifyCode: z.ZodOptional<z.ZodString>;
    promotionCode: z.ZodOptional<z.ZodString>;
    ip: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export type RegisterBody = z.infer<typeof RegisterBodySchema>;
/** 登录成功返回（token + 用户摘要） */
export declare const AuthResultSchema: z.ZodObject<{
    token: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    token: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    token: z.ZodOptional<z.ZodString>;
    id: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodString>;
}, z.ZodTypeAny, "passthrough">>;
export type AuthResult = z.infer<typeof AuthResultSchema>;
