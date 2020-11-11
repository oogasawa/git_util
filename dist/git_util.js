"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const child = __importStar(require("child_process"));
main();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const argv = yargs_1.default
            .command("add", "Execute 'git add' for each modified file")
            .demandCommand()
            .help()
            .argv;
        if (argv._[0] === "add") {
            git_add();
        }
    });
}
function git_add() {
    // const HOME = process.env.HOME;
    const p1 = /^\t(.+)/;
    const p2 = /\S+:\s+(\S.+)/;
    const result = child.execSync('git status', { cwd: process.cwd() });
    const lines = result.toString().split("\n");
    // console.error(lines);
    lines.forEach((l) => {
        const m1 = p1.exec(l);
        if (m1 != null) {
            const matched = m1[1];
            const m2 = p2.exec(matched);
            if (m2 != null) {
                console.log("git add '" + m2[1] + "'");
            }
            else {
                console.log("git add '" + matched + "'");
            }
        }
    });
}
