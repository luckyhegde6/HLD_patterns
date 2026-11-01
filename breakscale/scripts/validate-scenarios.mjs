import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dir = path.join(root, "breakscale", "scenarios");
const allowed = new Set(["requirement-derived", "interview-assumption", "illustrative", "measured", "TBD"]);
const errors = [];
const manifests = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
for (const name of manifests) {
  const file = path.join(dir, name);
  let data;
  try { data = JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (e) { errors.push(`${name}: invalid JSON: ${e.message}`); continue; }
  if (!data.id || !data.title || !data.sourceDesign || !data.upstream?.repository) errors.push(`${name}: missing identity/source metadata`);
  if (!Array.isArray(data.inputs) || !data.inputs.length) errors.push(`${name}: inputs required`);
  for (const input of data.inputs ?? []) {
    if (!input.name || !input.unit || !allowed.has(input.provenance)) errors.push(`${name}: invalid input provenance for ${input.name ?? "unnamed"}`);
    if (input.value === null && !input.reason && !input.source) errors.push(`${name}: null input ${input.name} needs a reason/source`);
    if (input.provenance === "requirement-derived" && !input.source && !input.derivation) errors.push(`${name}: requirement-derived input ${input.name} needs source or derivation`);
    if (input.provenance === "measured" && (!input.source || !input.measuredAt || !input.method)) errors.push(`${name}: measured input ${input.name} requires source, measuredAt and method`);
  }
  if (!data.experiment?.question || !Array.isArray(data.experiment.outputs)) errors.push(`${name}: experiment question and outputs required`);
}
if (!manifests.length) errors.push("No Breakscale scenario manifests found");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated ${manifests.length} Breakscale scenario manifest(s); provenance and unknown inputs are explicit.`);
