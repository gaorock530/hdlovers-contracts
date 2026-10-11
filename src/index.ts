/**
 * @hdlovers/contracts
 * HDlovers 前后端共享 API 契约：zod schema（运行时校验）+ 推导类型（编译期对齐）。
 *
 * 用法：
 *   后端（Express）：import { ResourcePublishBodySchema } from '@hdlovers/contracts'
 *   前端（Next.js）：import type { ResourceListItem } from '@hdlovers/contracts'
 */
export * from './enums';
export * from './common';
export * from './resource';
export * from './user';
export * from './pipeline';

// 契约版本号，便于两端排查不一致
export const CONTRACTS_VERSION = '0.1.0';
