/**
 * 枚举契约 —— 线上传输(wire)的规范化取值。
 * 以后端 MongoDB / Express 返回的实际字符串为准，前端展示文案不放在这里。
 */
import { z } from 'zod';

// ── 角色 ──────────────────────────────────────────────────────────
export const RoleTypeSchema = z.enum([
  'user:normal',
  'user:month',
  'user:year',
  'user:forever',
  'admin:normal',
  'admin:owner',
]);
export type RoleType = z.infer<typeof RoleTypeSchema>;

// ── 资源类型（注意 Moive 为后端历史拼写，属线上真实值，勿改）──────
export const ResourceTypeSchema = z.enum([
  'Moive',
  'Concert',
  'MV',
  'Music',
  'Demo',
]);
export type ResourceType = z.infer<typeof ResourceTypeSchema>;

// ── 地区 ──────────────────────────────────────────────────────────
export const RegionSchema = z.enum([
  '大陆',
  '华语',
  '香港',
  '台湾',
  '欧美',
  '日本',
  '韩国',
  '其他',
]);
export type Region = z.infer<typeof RegionSchema>;

// ── 格式 ──────────────────────────────────────────────────────────
export const FormatLevel1Schema = z.enum(['BDISO', 'BDMV']);
export const FormatLevel2Schema = z.enum(['DVDISO']);
export const FormatLevel3Schema = z.enum([
  'REMUX',
  'BDRiP',
  'WEB-DL',
  'HDTV',
  'TS',
  'M2TS',
  'MP4',
]);
export const FormatLevel4Schema = z.enum(['ProRes', 'HiRes', 'Master']);
export const FormatLevel5Schema = z.enum(['WAV', 'FLAC', 'APE']);
export const FormatLevel6Schema = z.enum(['MP3', 'ACC', '其他']);

export const FormatAllSchema = z.union([
  FormatLevel1Schema,
  FormatLevel2Schema,
  FormatLevel3Schema,
  FormatLevel4Schema,
  FormatLevel5Schema,
  FormatLevel6Schema,
]);
export type FormatAll = z.infer<typeof FormatAllSchema>;

// ── 画质 ──────────────────────────────────────────────────────────
export const QualitySchema = z.enum([
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
export type Quality = z.infer<typeof QualitySchema>;

// ── 资源状态 ──────────────────────────────────────────────────────
export const ResourceStatusSchema = z.enum([
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
export type ResourceStatus = z.infer<typeof ResourceStatusSchema>;

// ── 用户状态 / VIP / 注册方式 ─────────────────────────────────────
export const UserStatusSchema = z.enum([
  'normal',
  'inactive',
  'frozen',
  'banned',
  'unsubscribe',
]);
export type UserStatus = z.infer<typeof UserStatusSchema>;

export const VipTypeSchema = z.enum(['month', 'year', 'forever']);
export type VipType = z.infer<typeof VipTypeSchema>;

export const RegisteredBySchema = z.enum(['phone', 'email']);
export type RegisteredBy = z.infer<typeof RegisteredBySchema>;
