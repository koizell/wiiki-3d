<!--
  El informe del arnés de diagnóstico, tal como salió del runner.

  **No es la historia del arreglo**: es su evidencia. El arnés corrió
  `verify:wiki` en el runner de GitHub y el log decía, en la primera línea:

      Error: ENOENT: no such file or directory, open
      '.../test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
          at .../scripts/verify/fixtures.mjs:78:26

  La comprobación necesita un G-code de ejemplo, y el del repo está en
  `test-fixtures/`, que está en el `.gitignore` a propósito. `fixtures.mjs` lo
  leía **al importarse**, así que moría antes de la primera comprobación.

  El arreglo, y el patrón que ya tenía el repo, están en el commit
  `fix(verify): las comprobaciones no dependen de un fichero que no está en el repo`.
-->

# Diagnóstico de la wiki renderizada

Generado el  UTC, en el runner de GitHub.

## El entorno

```
node:    v22.23.4
npm:     10.9.9
playwright: 1.63.0
nproc:   4

Linux runnervmfese6 7.0.0-1017-azure #17~24.04.1-Ubuntu SMP PREEMPT Thu Sep 24 18:46:57 UTC 2026 x86_64 x86_64 x86_64 GNU/Linux

               total        used        free      shared  buff/cache   available
Mem:           15983        1239       10943          48        4196       14744
Swap:           3071           0        3071

chromium-1243
chromium_headless_shell-1243
ffmpeg-1011
```

## Los intentos

### `wiki-suelto-1.log` — 21 líneas

```

> wiiki-3d@0.0.0 verify:wiki
> node scripts/verify/wiki.mjs

node:fs:440
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
    at readFileSync (node:fs:440:20)
    at file:///home/runner/work/wiiki-3d/wiiki-3d/scripts/verify/fixtures.mjs:78:26
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
}

…
> wiiki-3d@0.0.0 verify:wiki
> node scripts/verify/wiki.mjs

node:fs:440
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
    at readFileSync (node:fs:440:20)
    at file:///home/runner/work/wiiki-3d/wiiki-3d/scripts/verify/fixtures.mjs:78:26
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
}

Node.js v22.23.4
```

### `wiki-suelto-2.log` — 21 líneas

```

> wiiki-3d@0.0.0 verify:wiki
> node scripts/verify/wiki.mjs

node:fs:440
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
    at readFileSync (node:fs:440:20)
    at file:///home/runner/work/wiiki-3d/wiiki-3d/scripts/verify/fixtures.mjs:78:26
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
}

…
> wiiki-3d@0.0.0 verify:wiki
> node scripts/verify/wiki.mjs

node:fs:440
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
    at readFileSync (node:fs:440:20)
    at file:///home/runner/work/wiiki-3d/wiiki-3d/scripts/verify/fixtures.mjs:78:26
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
}

Node.js v22.23.4
```

### `wiki-suelto-3.log` — 21 líneas

```

> wiiki-3d@0.0.0 verify:wiki
> node scripts/verify/wiki.mjs

node:fs:440
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
    at readFileSync (node:fs:440:20)
    at file:///home/runner/work/wiiki-3d/wiiki-3d/scripts/verify/fixtures.mjs:78:26
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
}

…
> wiiki-3d@0.0.0 verify:wiki
> node scripts/verify/wiki.mjs

node:fs:440
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
    at readFileSync (node:fs:440:20)
    at file:///home/runner/work/wiiki-3d/wiiki-3d/scripts/verify/fixtures.mjs:78:26
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
}

Node.js v22.23.4
```

### `wiki-tras-seo-1.log` — 21 líneas

```

> wiiki-3d@0.0.0 verify:wiki
> node scripts/verify/wiki.mjs

node:fs:440
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
    at readFileSync (node:fs:440:20)
    at file:///home/runner/work/wiiki-3d/wiiki-3d/scripts/verify/fixtures.mjs:78:26
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
}

…
> wiiki-3d@0.0.0 verify:wiki
> node scripts/verify/wiki.mjs

node:fs:440
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
    at readFileSync (node:fs:440:20)
    at file:///home/runner/work/wiiki-3d/wiiki-3d/scripts/verify/fixtures.mjs:78:26
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
}

Node.js v22.23.4
```

### `wiki-tras-seo-2.log` — 21 líneas

```

> wiiki-3d@0.0.0 verify:wiki
> node scripts/verify/wiki.mjs

node:fs:440
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
    at readFileSync (node:fs:440:20)
    at file:///home/runner/work/wiiki-3d/wiiki-3d/scripts/verify/fixtures.mjs:78:26
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
}

…
> wiiki-3d@0.0.0 verify:wiki
> node scripts/verify/wiki.mjs

node:fs:440
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
    at readFileSync (node:fs:440:20)
    at file:///home/runner/work/wiiki-3d/wiiki-3d/scripts/verify/fixtures.mjs:78:26
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
}

Node.js v22.23.4
```

### `wiki-tras-seo-3.log` — 21 líneas

```

> wiiki-3d@0.0.0 verify:wiki
> node scripts/verify/wiki.mjs

node:fs:440
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
    at readFileSync (node:fs:440:20)
    at file:///home/runner/work/wiiki-3d/wiiki-3d/scripts/verify/fixtures.mjs:78:26
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
}

…
> wiiki-3d@0.0.0 verify:wiki
> node scripts/verify/wiki.mjs

node:fs:440
    return binding.readFileUtf8(path, stringToFlags(options.flag));
                   ^

Error: ENOENT: no such file or directory, open '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
    at readFileSync (node:fs:440:20)
    at file:///home/runner/work/wiiki-3d/wiiki-3d/scripts/verify/fixtures.mjs:78:26
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
    at async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:681:26)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/home/runner/work/wiiki-3d/wiiki-3d/test-fixtures/Argentina T-shirt medal_PLA_2m56s.gcode'
}

Node.js v22.23.4
```
