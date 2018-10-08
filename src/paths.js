import path from 'path';
import findCacheDir from 'find-cache-dir';

export const getCacheDir = (cacheDir = null) =>
  cacheDir || findCacheDir({ name: 'autodll-webpack-plugin' });

export const getManifestPath = (hash, cacheDir) => bundleName =>
  path.resolve(getCacheDir(cacheDir), hash, `${bundleName}.manifest.json`);

export const getInjectPath = ({ publicPath, pluginPath, filename }) => {
  let injectPublicPath = publicPath;
  let injectRestPath = path.posix.join(pluginPath, filename);
  // Ensure that injectPublicPath and injectRestPath can be safely concatinated
  if (injectPublicPath && !injectPublicPath.endsWith('/')) {
    injectPublicPath += '/';
  }
  if (injectRestPath.startsWith('/')) {
    injectRestPath = injectRestPath.substr(1);
  }
  return injectPublicPath + injectRestPath;
};
