const { readFileSync, readdirSync, writeFileSync } = require("node:fs");
const path = require("node:path");

const modulesPath = path.join(__dirname, "..", "..", "backend", "src", "modules");
const files = readdirSync(modulesPath).flatMap((module) => {
	const useCasesPath = path.join(modulesPath, module, "useCases");
	return readdirSync(useCasesPath).map(
		(file) => path.join(useCasesPath, file),
	);
});

let docs = "\n\n";
docs+="<!-- tabs:start -->\n\n"
for (const file of files) {
	const fileContent = readFileSync(file).toString();

	const classContent = fileContent.slice(fileContent.indexOf("interface"));
	const commandHeader = `${classContent.slice(
		0,
		classContent.indexOf("> {", classContent.indexOf("execute")) + 3,
	)}\n    ...\n  }\n}`;

	docs+=`#### **${file.split("/").pop()}**\n`
	docs+="```typescript\n"
	docs+=`${commandHeader}\n`;
	docs+="```\n\n"
}
docs+="<!-- tabs:end -->\n"

const docsPath = path.join("docs","PadroesDeProjeto","3.3.GoFsComportamentais.md")
const docsContent = readFileSync(docsPath).toString()

const commandCheckpoint = "<!-- Command Factories Checkpoint -->";
const checkpoints = docsContent.split(commandCheckpoint);
checkpoints[1] = docs;
writeFileSync(docsPath, checkpoints.join(commandCheckpoint));
