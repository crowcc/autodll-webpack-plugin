import del from 'del';
import path from 'path';
import { getCacheDir } from '../../src/paths';

const cleanup = cacheDir => del.sync(path.join(getCacheDir(cacheDir)));

export default cleanup;
