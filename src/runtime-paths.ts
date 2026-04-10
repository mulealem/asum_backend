import * as Module from 'module';
import * as path from 'path';

type ModuleWithInitPaths = typeof Module & {
  _initPaths?: () => void;
};

const rootPath = path.resolve(__dirname, '..');
const currentNodePath = process.env.NODE_PATH
  ? process.env.NODE_PATH.split(path.delimiter)
  : [];

if (!currentNodePath.includes(rootPath)) {
  process.env.NODE_PATH = [...currentNodePath, rootPath]
    .filter(Boolean)
    .join(path.delimiter);

  (Module as ModuleWithInitPaths)._initPaths?.();
}
