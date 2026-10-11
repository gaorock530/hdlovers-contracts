"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisteredBySchema = exports.VipTypeSchema = exports.UserStatusSchema = exports.ResourceStatusSchema = exports.QualitySchema = exports.FormatAllSchema = exports.FormatLevel6Schema = exports.FormatLevel5Schema = exports.FormatLevel4Schema = exports.FormatLevel3Schema = exports.FormatLevel2Schema = exports.FormatLevel1Schema = exports.RegionSchema = exports.ResourceTypeSchema = exports.RoleTypeSchema = void 0;
/**
 * 枚举契约 —— 线上传输(wire)的规范化取值。
 * 以后端 MongoDB / Express 返回的实际字符串为准，前端展示文案不放在这里。
 */
const zod_1 = require("zod");
// ── 角色 ──────────────────────────────────────────────────────────
exports.RoleTypeSchema = zod_1.z.enum([
    'user:normal',
    'user:month',
    'user:year',
    'user:forever',
    'admin:normal',
    'admin:owner',
]);
// ── 资源类型（注意 Moive 为后端历史拼写，属线上真实值，勿改）──────
exports.ResourceTypeSchema = zod_1.z.enum([
    'Moive',
    'Concert',
    'MV',
    'Music',
    'Demo',
]);
// ── 地区 ──────────────────────────────────────────────────────────
exports.RegionSchema = zod_1.z.enum([
    '大陆',
    '华语',
    '香港',
    '台湾',
    '欧美',
    '日本',
    '韩国',
    '其他',
]);
// ── 格式 ──────────────────────────────────────────────────────────
exports.FormatLevel1Schema = zod_1.z.enum(['BDISO', 'BDMV']);
exports.FormatLevel2Schema = zod_1.z.enum(['DVDISO']);
exports.FormatLevel3Schema = zod_1.z.enum([
    'REMUX',
    'BDRiP',
    'WEB-DL',
    'HDTV',
    'TS',
    'M2TS',
    'MP4',
]);
exports.FormatLevel4Schema = zod_1.z.enum(['ProRes', 'HiRes', 'Master']);
exports.FormatLevel5Schema = zod_1.z.enum(['WAV', 'FLAC', 'APE']);
exports.FormatLevel6Schema = zod_1.z.enum(['MP3', 'ACC', '其他']);
exports.FormatAllSchema = zod_1.z.union([
    exports.FormatLevel1Schema,
    exports.FormatLevel2Schema,
    exports.FormatLevel3Schema,
    exports.FormatLevel4Schema,
    exports.FormatLevel5Schema,
    exports.FormatLevel6Schema,
]);
// ── 画质 ──────────────────────────────────────────────────────────
exports.QualitySchema = zod_1.z.enum([
    '8K',
    '4K',
    '2K',
    '1080p',
    '720p',
    '480p',
    'LosslessAudio',
    'CompressedAudio',
    '其他',
]);
// ── 资源状态 ──────────────────────────────────────────────────────
exports.ResourceStatusSchema = zod_1.z.enum([
    'normal',
    'error',
    'fixed',
    'banned',
    'forze',
    'published',
    'rejected',
    'accepted',
    'bounty',
    'checking',
]);
// ── 用户状态 / VIP / 注册方式 ─────────────────────────────────────
exports.UserStatusSchema = zod_1.z.enum([
    'normal',
    'inactive',
    'frozen',
    'banned',
    'unsubscribe',
]);
exports.VipTypeSchema = zod_1.z.enum(['month', 'year', 'forever']);
exports.RegisteredBySchema = zod_1.z.enum(['phone', 'email']);
