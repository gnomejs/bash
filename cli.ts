import { ShellCommand, type ShellCommandOptions } from "@gnome/exec";
import { pathFinder } from "@gnome/exec/path-finder";
import { WINDOWS } from "@gnome/os-constants";
import { isFile } from "@gnome/fs";
import { isAbsolute, resolve } from "@std/path";

pathFinder.set("bash", {
    name: "bash",
    windows: [
        "${ProgramFiles}\\Git\\bin\\bash.exe",
        "${ProgramFiles}\\Git\\usr\\bin\\bash.exe",
        "${ChocolateyInstall}\\msys2\\usr\\bin\\bash.exe",
        "${SystemDrive}\\msys64\\usr\\bin\\bash.exe",
        "${SystemDrive}\\msys\\usr\\bin\\bash.exe",
        "${SystemRoot}\\System32\\bash.exe",
    ],
});

let wslEnabled = false;

wslEnabled = WINDOWS && await isFile("C:\\Windows\\System32\\bash.exe");

/**
 * File extension for bash scripts.
 */
export const BASH_EXT = ".sh";

/**
 * Represents a bash command executed using the `bash` commandline.
 */
export class BashCommand extends ShellCommand {
    /**
     * Creates a new instance of the `bashCommand` class.
     * @param script The bash script to execute.
     * @param options The options for the bashell command.
     */
    constructor(script: string, options?: ShellCommandOptions) {
        super("bash", script.trimEnd(), options);
    }

    static wslCheck = WINDOWS;

    /**
     * Gets the file extension associated with bash scripts.
     */
    get ext(): string {
        return BASH_EXT;
    }

    /**
     * Gets the bash arguments for executing the bash script.
     * @param script The bash script to execute.
     * @param isFile Specifies whether the script is a file or a command.
     * @returns The bash arguments for executing the script.
     */
    getShellArgs(script: string, isFile: boolean): string[] {
        const params = this.shellArgs ?? ["-noprofile", "--norc", "-e", "-o", "pipefail"];

        if (isFile) {
            if (BashCommand.wslCheck && wslEnabled) {
                const exe = pathFinder.findExeSync("bash");
                if (exe && exe.endsWith("System32\\bash.exe")) {
                    if (!isAbsolute(script)) {
                        script = resolve(script);
                    }

                    script = "/mnt/" + script[0].toLowerCase() + script.slice(2).replace(/\\/g, "/");
                }
            }

            params.push(script);
        } else {
            params.push("-c", script);
        }

        return params;
    }
}

/**
 * Executes a bash script using the BashCommand class.
 *
 * @param script - The bash script to execute.
 * @param options - Optional options for the bash command.
 * @returns A new instance of the BashCommand class.
 */
export function bash(script: string, options?: ShellCommandOptions): BashCommand {
    return new BashCommand(script, options);
}
