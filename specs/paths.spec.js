import test from 'ava';
import { getInjectPath, getCacheDir } from '../src/paths';

test('getCacheDir: should return the parameter passed', t => {
  const expectedPath = '/a/b/c';

  t.is(getCacheDir(expectedPath), expectedPath);
});

test('getCacheDir: should return the path from node_modules cache dir', t => {
  t.regex(getCacheDir(null), /node_modules/);
});

test('getInjectPath: should join publicPath and pluginPath slashes correctly', t => {
  const expectedPath = '/a/b/c.js';

  t.is(getInjectPath({ publicPath: '/a', pluginPath: 'b', filename: 'c.js' }), expectedPath);

  t.is(getInjectPath({ publicPath: '/a/', pluginPath: 'b', filename: 'c.js' }), expectedPath);

  t.is(getInjectPath({ publicPath: '/a', pluginPath: '/b', filename: 'c.js' }), expectedPath);

  t.is(getInjectPath({ publicPath: '/a/', pluginPath: '/b', filename: 'c.js' }), expectedPath);
});

test('getInjectPath: should handle URL publicPaths', t => {
  t.is(
    getInjectPath({
      publicPath: 'http://example.com',
      pluginPath: 'a/b/c/d/',
      filename: 'e.js',
    }),
    'http://example.com/a/b/c/d/e.js'
  );

  t.is(
    getInjectPath({
      publicPath: 'localhost',
      pluginPath: 'a',
      filename: 'b.js',
    }),
    'localhost/a/b.js'
  );

  t.is(
    getInjectPath({
      publicPath: '//localhost:8080',
      pluginPath: 'a',
      filename: 'b.js',
    }),
    '//localhost:8080/a/b.js'
  );

  t.is(
    getInjectPath({
      publicPath: 'https://localhost:8080',
      pluginPath: 'a',
      filename: 'b.js',
    }),
    'https://localhost:8080/a/b.js'
  );
});
