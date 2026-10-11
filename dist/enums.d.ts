/**
 * 枚举契约 —— 线上传输(wire)的规范化取值。
 * 以后端 MongoDB / Express 返回的实际字符串为准，前端展示文案不放在这里。
 */
import { z } from 'zod';
export declare const RoleTypeSchema: z.ZodEnum<["user:normal", "user:month", "user:year", "user:forever", "admin:normal", "admin:owner"]>;
export type RoleType = z.infer<typeof RoleTypeSchema>;
export declare const ResourceTypeSchema: z.ZodEnum<["Moive", "Concert", "MV", "Music", "Demo"]>;
export type ResourceType = z.infer<typeof ResourceTypeSchema>;
export declare const RegionSchema: z.ZodEnum<["大陆", "华语", "香港", "台湾", "欧美", "日本", "韩国", "其他"]>;
export type Region = z.infer<typeof RegionSchema>;
export declare const FormatLevel1Schema: z.ZodEnum<["BDISO", "BDMV"]>;
export declare const FormatLevel2Schema: z.ZodEnum<["DVDISO"]>;
export declare const FormatLevel3Schema: z.ZodEnum<["REMUX", "BDRiP", "WEB-DL", "HDTV", "TS", "M2TS", "MP4"]>;
export declare const FormatLevel4Schema: z.ZodEnum<["ProRes", "HiRes", "Master"]>;
export declare const FormatLevel5Schema: z.ZodEnum<["WAV", "FLAC", "APE"]>;
export declare const FormatLevel6Schema: z.ZodEnum<["MP3", "ACC", "其他"]>;
export declare const FormatAllSchema: z.ZodUnion<[z.ZodEnum<["BDISO", "BDMV"]>, z.ZodEnum<["DVDISO"]>, z.ZodEnum<["REMUX", "BDRiP", "WEB-DL", "HDTV", "TS", "M2TS", "MP4"]>, z.ZodEnum<["ProRes", "HiRes", "Master"]>, z.ZodEnum<["WAV", "FLAC", "APE"]>, z.ZodEnum<["MP3", "ACC", "其他"]>]>;
export type FormatAll = z.infer<typeof FormatAllSchema>;
export declare const QualitySchema: z.ZodEnum<["8K", "4K", "2K", "1080p", "720p", "480p", "LosslessAudio", "CompressedAudio", "其他"]>;
export type Quality = z.infer<typeof QualitySchema>;
export declare const ResourceStatusSchema: z.ZodEnum<["normal", "error", "fixed", "banned", "forze", "published", "rejected", "accepted", "bounty", "checking"]>;
export type ResourceStatus = z.infer<typeof ResourceStatusSchema>;
export declare const UserStatusSchema: z.ZodEnum<["normal", "inactive", "frozen", "banned", "unsubscribe"]>;
export type UserStatus = z.infer<typeof UserStatusSchema>;
export declare const VipTypeSchema: z.ZodEnum<["month", "year", "forever"]>;
export type VipType = z.infer<typeof VipTypeSchema>;
export declare const RegisteredBySchema: z.ZodEnum<["phone", "email"]>;
export type RegisteredBy = z.infer<typeof RegisteredBySchema>;
