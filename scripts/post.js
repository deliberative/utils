const fs = require("fs");
const path = require("path");

const esmPath = path.join(process.cwd(), "lib", "index.mjs");

const esmRequire = `\
import \{ createRequire \} from \"module\";\n\
globalThis.require = createRequire(import.meta.url);\n\
`;

const esmBundle = fs.readFileSync(esmPath);
fs.writeFileSync(
  esmPath,
  `\
${esmRequire} \
${esmBundle}`,
);
