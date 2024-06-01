import { assertEquals as equals } from "jsr:@std/assert@^0.224.0";
import { remove, writeTextFile } from "jsr:@gnome/fs@^0.0.0/deno";
import { bash } from "./cli.ts";

Deno.test("simple inline test", async () => {
    const cmd = await bash("echo 'Hello, World!'");
    equals(cmd.text(), "Hello, World!\n");
    equals(0, cmd.code);
});

Deno.test("multi-line inline test", async () => {
    const cmd = await bash(`
        a=1
        b=2
        expr $a + $b
    `);
    equals(cmd.text(), "3\n");
    equals(0, cmd.code);
});

Deno.test("simple file test", async () => {
    await writeTextFile("test.sh", "echo 'Hello, World!'");
    try {
        // purposely add space after test.ps1
        const cmd = await bash("test.sh ");
        equals(0, cmd.code);
        equals(cmd.text(), "Hello, World!\n");
    } finally {
        await remove("test.sh");
    }
});
