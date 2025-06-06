/// <reference types="@fastly/js-compute" />

import { runTests, formatResults } from "../../shared/test.js";
import tests from "../../../vendor/tests.json" with { type: "json" };
import packageJson from "./package.json" with { type: "json" };
 
addEventListener("fetch", (event) => event.respondWith(handleRequest(event)));

 
async function handleRequest(event: FetchEvent) {
  if (event.request.method === "HEAD") {
    return new Response(undefined, { status: 200 });
  }
  const results = await runTests(tests);
  const data = formatResults(
    results,
    {
      name: "fastly",
      version: packageJson.dependencies["@fastly/js-compute"].replace(
        /^(\^|~)/,
        "",
      ),
    },
    tests.__version,
  );
  return new Response(JSON.stringify(data, undefined, 2));
}
