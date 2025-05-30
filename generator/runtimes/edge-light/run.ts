import { EdgeRuntime } from "edge-runtime";
import { runTests, formatResults } from "../../shared/test.js";
import tests from "../../../vendor/tests.json" with { type: "json" };
import packageJson from "./package.json" with { type: "json" };
const runtime = new EdgeRuntime();
globalThis.eval = runtime.evaluate.bind(runtime);

const results = await runTests(tests);
const data = formatResults(
  results,
  {
    name: "edge-light",
    version: packageJson.dependencies["edge-runtime"].replace(/^(\^|~)/, ""),
  },
  tests.__version,
);
console.log("RUNTIME_DATA_START");
console.log(JSON.stringify(data, undefined, 2));
