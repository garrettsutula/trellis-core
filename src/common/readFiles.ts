import { readFile } from "fs/promises";
import { parse } from "yaml";

export async function readFileJson(filePath: string) {
    return JSON.parse((await readFile(filePath)).toString());
}

export async function readFileYaml(filePath: string) {
    return parse((await (await readFile(filePath)).toString()));
}