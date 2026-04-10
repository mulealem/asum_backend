"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Module = require("module");
const path = require("path");
const rootPath = path.resolve(__dirname, '..');
const currentNodePath = process.env.NODE_PATH
    ? process.env.NODE_PATH.split(path.delimiter)
    : [];
if (!currentNodePath.includes(rootPath)) {
    process.env.NODE_PATH = [...currentNodePath, rootPath]
        .filter(Boolean)
        .join(path.delimiter);
    Module._initPaths?.();
}
//# sourceMappingURL=runtime-paths.js.map