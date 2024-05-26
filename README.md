# @gnome/env

<div height=30" vertical-align="top">
<image src="https://raw.githubusercontent.com/gnomejs/gnomejs/main/assets/icon.png"
    alt="logo" width="60" valign="middle" />
<span>Work less. Do more. </span>
</div>

## Overview

The `bash` module provides a simple way to execute
bash scripts or files.

The module relies upon the @gnome/exec module and
has the same basic usage as the `Command` and `ShellCommand` class.

## Basic Usage

```typescript
import { bash } from "@gnome/bash";

const cmd = await bash("echo 'Hello, World!'", { 
        stdout: 'piped', 
        stderr: 'piped'
    });
console.log(await cmd.text());
console.log(cmd.code);

console.log(await bash("echo 'Hello, World!'").text());

console.log(await bash("test.sh").text()); 

// runs bash command and writes directly to console
await bash("echo 'I am alive'").run();
```

[MIT License](./LICENSE.md)
