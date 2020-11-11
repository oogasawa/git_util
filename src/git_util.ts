
import yargs from "yargs";
import * as child from 'child_process';



main();


async function main() {

    const argv = yargs
        .command("add", "Execute 'git add' for each modified file")
        .demandCommand()
        .help()
        .argv;



    if (argv._[0] === "add") {
        git_add();
    }

}



function git_add() {
    // const HOME = process.env.HOME;

    const p1 = /^\t(.+)/;
    const p2 = /\S+:\s+(\S.+)/;

    const result: Buffer = child.execSync('git status', { cwd: process.cwd() });
    const lines: string[] = result.toString().split("\n");

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
