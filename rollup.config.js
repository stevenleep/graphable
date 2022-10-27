import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import sourcemaps from "rollup-plugin-sourcemaps";
import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const babel = require("rollup-plugin-babel");
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const pkg = require("./package.json");

const enableSourcemap = true;
const extensions = [".ts", ".js", ".json", ".node"];
const buildBaseConfig = {
  input: "lib/index.ts",
  output: [
    {
      file: pkg.main,
      format: "umd",
      sourceMap: enableSourcemap,
      name: "RuleEngine",
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: enableSourcemap,
    },
    {
      file: pkg.commonjs,
      format: "cjs",
      sourcemap: enableSourcemap,
      exports: "auto",
    },
  ],
  watch: {
    include: "lib/**",
  },
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    commonjs(),
    resolve({ extensions }),
    sourcemaps(),
    terser(),
    babel({
      exclude: "node_modeles/**",
      extensions,
    }),
  ],
};

const dtsBaseConfig = {
  input: "lib/index.ts",
  output: [
    {
      file: pkg.types,
      format: "es",
      exports: "auto",
    },
  ],
  plugins: [dts.default()],
};

export default [buildBaseConfig, dtsBaseConfig];
