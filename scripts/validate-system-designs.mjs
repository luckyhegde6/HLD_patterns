import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const designsRoot = path.join(root, "system_designs");
const dirs = fs.readdirSync(designsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);
const errors = [];
let checked = 0;

function fail(file, message) {
  errors.push(`- ${path.relative(root, file)}: ${message}`);
}

for (const slug of dirs) {
  const designDir = path.join(designsRoot, slug);
  const archifyDir = path.join(designDir, "archify");
  if (!fs.existsSync(archifyDir)) continue;
  const specs = fs.readdirSync(archifyDir).filter((name) => name.endsWith(".architecture.json"));
  for (const name of specs) {
    checked++;
    const specPath = path.join(archifyDir, name);
    const expectedSlug = name.replace(/\.architecture\.json$/, "");
    let spec;
    try {
      spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
    } catch (error) {
      fail(specPath, `invalid JSON: ${error.message}`);
      continue;
    }

    if (spec.diagram_type !== "architecture") fail(specPath, "diagram_type must be architecture");
    if (!spec.meta?.title) fail(specPath, "meta.title is required");
    if (spec.meta?.quality_profile !== "showcase") fail(specPath, "meta.quality_profile must be showcase");
    const expectedOutput = `system_designs/${slug}/archify/${expectedSlug}.architecture.html`;
    if (spec.meta?.output !== expectedOutput) fail(specPath, `meta.output must be ${expectedOutput}`);

    const components = Array.isArray(spec.components) ? spec.components : [];
    const connections = Array.isArray(spec.connections) ? spec.connections : [];
    if (components.length < 2) fail(specPath, "at least two components are required");
    const ids = new Set();
    for (const component of components) {
      if (!component.id || !component.label || !component.type) fail(specPath, "each component needs id, label and type");
      if (ids.has(component.id)) fail(specPath, `duplicate component id: ${component.id}`);
      ids.add(component.id);
    }
    const edgeIds = new Set();
    for (const connection of connections) {
      if (!connection.id || !connection.from || !connection.to) fail(specPath, "each connection needs id, from and to");
      if (edgeIds.has(connection.id)) fail(specPath, `duplicate connection id: ${connection.id}`);
      edgeIds.add(connection.id);
      if (!ids.has(connection.from)) fail(specPath, `connection ${connection.id} references missing source ${connection.from}`);
      if (!ids.has(connection.to)) fail(specPath, `connection ${connection.id} references missing target ${connection.to}`);
    }

    const explainerPath = path.join(designDir, "visual_explainer.md");
    const architecturePath = path.join(designDir, "architecture.md");
    const walkthroughPath = path.join(designDir, "interview_walkthrough.md");
    for (const required of [explainerPath, architecturePath, walkthroughPath]) {
      if (!fs.existsSync(required)) fail(specPath, `missing companion file: ${path.relative(root, required)}`);
    }
    if (fs.existsSync(explainerPath)) {
      const md = fs.readFileSync(explainerPath, "utf8");
      for (const heading of [
        "System architecture", "Critical interaction", "Failure and recovery",
        "Core invariants", "Architecture decisions", "Senior interview walkthrough",
        "Follow-up questions"
      ]) {
        if (!md.toLowerCase().includes(heading.toLowerCase())) fail(explainerPath, `missing section: ${heading}`);
      }
      if ((md.match(/```mermaid/g) ?? []).length < 3) fail(explainerPath, "expected at least three Mermaid diagrams");
      if (!/AWS/i.test(md) || !/GCP/i.test(md)) fail(explainerPath, "AWS and GCP mapping must be present");
    }
    for (const linkedFile of [architecturePath, walkthroughPath]) {
      if (!fs.existsSync(linkedFile)) continue;
      const md = fs.readFileSync(linkedFile, "utf8");
      if (!md.includes("visual_explainer.md")) fail(linkedFile, "must link visual_explainer.md");
      if (!md.includes(`archify/${expectedSlug}.architecture.json`) && linkedFile === architecturePath) {
        fail(linkedFile, "must link the editable Archify source");
      }
    }
  }
}

if (checked === 0) errors.push("- system_designs: no Archify architecture JSON files found");
console.log(`Checked ${checked} Archify source file(s).`);
if (errors.length) {
  console.error(`Found ${errors.length} issue(s):\n${errors.join("\n")}`);
  process.exit(1);
}
console.log("System-design structure and documentation checks passed.");
