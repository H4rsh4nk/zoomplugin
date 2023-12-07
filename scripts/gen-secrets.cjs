const envsub = require("envsub");
const crypto = require("crypto");
const fs = require("fs");

const outputFile = ".env.local";
const templateFile = `${outputFile}.example`;

const options = {
    protect: true,
    envs: [
        {
            name: "_NEXTAUTH_SECRET",
            value: crypto.randomBytes(32).toString("hex"),
        },
    ],
};

if (!fs.existsSync(outputFile))
    envsub({ templateFile, outputFile, options }).catch((e) =>
        console.error(e)
    );