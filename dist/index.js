"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTRACTS_VERSION = void 0;
/**
 * @hdlovers/contracts
 * HDlovers 前后端共享 API 契约：zod schema（运行时校验）+ 推导类型（编译期对齐）。
 *
 * 用法：
 *   后端（Express）：import { ResourcePublishBodySchema } from '@hdlovers/contracts'
 *   前端（Next.js）：import type { ResourceListItem } from '@hdlovers/contracts'
 */
__exportStar(require("./enums"), exports);
__exportStar(require("./common"), exports);
__exportStar(require("./resource"), exports);
__exportStar(require("./user"), exports);
__exportStar(require("./pipeline"), exports);
// 契约版本号，便于两端排查不一致
exports.CONTRACTS_VERSION = '0.1.0';
