/**
 * The `bash` module provides a simple way to execute
 * PowerShell Core scripts using the `bash` shell.
 *
 * The module relies upon the @gnome/exec module and
 * has the same basic usage as the `Command` and `ShellCommand` class.
 *
 * ## Basic Usage
 *
 * ```typescript
 * import { bash } from "@gnome/bash";
 *
 * const cmd = await bash("echo 'Hello, World!'", {
 *         stdout: 'piped',
 *         stderr: 'piped'
 *    });
 * console.log(await cmd.text());
 * console.log(cmd.code);
 *
 * console.log(await bash("echo 'Hello, World!'").text());
 *
 * console.log(await bash("test.sh").text());
 *
 * // runs bash command and writes directly to console
 * await bash("echo 'I am alive'").run();
```
 * @module
 */
export * from "./cli.ts";
