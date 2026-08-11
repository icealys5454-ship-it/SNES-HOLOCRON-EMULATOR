# HOLOCRON Emulator Monorepo

<p align="center">
  <img src="apps/cms/public/assets/holocron-logo.jpg" width="112" alt="HOLOCRON">
</p>

A complete monorepo distribution for the HOLOCRON CMS-hosted SNES WebAssembly/WebGL emulator platform.

## What is complete

This repository contains the production-oriented **distribution architecture**:

- CMS/browser launch app
- stable WebAssembly core ABI v1 host
- current unified SNES development core
- WebGL presentation package
- Gamepad/SNES input package
- save-state storage package
- ordered CMS filter SDK
- compatibility scoring/regression package
- runtime coordinator
- release/qualification policy
- ABI tests
- release integrity tests
- GitHub Actions CI
- release packaging scripts
- production qualification checklist

## Important qualification status

The **monorepo is complete as a distribution/package architecture**.

The included SNES core is **not yet truthfully production-qualified for broad commercial game compatibility**.
It is the current development core carried forward from the emulator work and still requires hardware-accuracy work and large public/homebrew compatibility suites.

Do not market this artifact as a cycle-accurate or compatibility-complete SNES emulator until every blocker in
[`PRODUCTION_QUALIFICATION.md`](PRODUCTION_QUALIFICATION.md) is closed.

## Repository map

```text
apps/
  cms/                  Browser/CMS launcher

packages/
  core-wasm/            Current SNES C/WASM core + ABI artifact
  sdk/                  Stable ABI host + ordered filters
  webgl/                WebGL framebuffer presenter
  input/                Gamepad -> SNES register mapping
  storage/              IndexedDB save-state persistence
  compatibility/        Compatibility scoring/regression helpers
  runtime/              Browser emulation loop
  config/               Qualification/release policy

tests/                  Host/core contract and filter tests
scripts/                Build, ABI verification, release verification/packaging
docs/                   Architecture and qualification documentation
release/                Generated release manifests/packages
.github/workflows/      CI
```

## Run checks

No third-party runtime dependency is required for the included validation scripts.

```bash
npm test
npm run verify:abi
npm run build
npm run verify:release
```

Or:

```bash
npm run check
```

## Build the browser distribution

```bash
npm run build
```

This creates `dist/` with:

- CMS app
- stable WASM core
- browser packages
- release metadata

Serve the directory with any static HTTP server.

## Core ABI

The browser/core boundary remains ABI **1.0.0**. Host code depends on the ABI, not on internal emulator implementation details.

Key ABI concepts:

- semantic ABI version
- core-owned ROM upload arena
- structured status codes
- `run_frame`
- RGBA8888 framebuffer
- 16-bit controller input
- S16 stereo audio ring
- save/load state buffer

That means future CPU/PPU/APU accuracy work can replace the core internals without rewriting the CMS.

## ROM policy

No commercial ROM is bundled. Use homebrew/public test ROMs or cartridge dumps you are legally entitled to use.

## Production launch

The release scripts intentionally distinguish **distribution readiness** from **emulator compatibility qualification**.
A signed release can be packaged only after the compatibility policy is satisfied by external test evidence.

See:

- `PRODUCTION_QUALIFICATION.md`
- `docs/ARCHITECTURE.md`
- `docs/CORE_STATUS.md`
- `release/qualification-policy.json`

## License

GNU-General Public license v3.0
