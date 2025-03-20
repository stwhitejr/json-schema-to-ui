import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx',
  output: [
    {file: 'dist/index.js', format: 'cjs'},
    {file: 'dist/index.esm.js', format: 'esm'},
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      exclude: ['**/*.test.tsx', '**/*.stories.tsx'],
    }),
  ],
  external: ['react', 'react-dom'],
};
