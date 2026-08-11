# Production Qualification

## Current verdict

**Distribution architecture:** READY FOR INTEGRATION / RELEASE-CANDIDATE USE  
**SNES hardware core:** NOT YET PRODUCTION-QUALIFIED  
**Broad commercial compatibility claim:** NOT APPROVED

This distinction is deliberate. A repository can be production-engineered while the emulation core still requires correctness work.

## Required emulator blockers

A release may not claim broad production SNES compatibility until all of the following are demonstrated with reproducible tests:

- Complete 65C816 opcode/addressing coverage.
- Correct 8/16-bit M/X behavior and decimal arithmetic.
- Verified interrupt, stack, page/direct-page and timing behavior.
- Accurate LoROM/HiROM/ExLoROM/ExHiROM mapping.
- SRAM persistence.
- Correct PPU background modes, priorities, windows, sprites/OAM and color math.
- Mode 7, hires/interlace and mosaic behavior.
- Correct DMA/HDMA channel modes and timing.
- Correct controller serial I/O and auto-joypad behavior.
- Real SPC700 + S-DSP emulation.
- Deterministic save-state round trips.
- Long-run deterministic frame/audio behavior.
- Public/homebrew regression corpus with no release-blocking regressions.
- Performance targets on supported browsers/devices.
- Compatibility database with test evidence, not inferred labels.

## Release criteria

The default production policy requires:

- ABI major = 1
- compatibility suite score >= 95
- determinism = pass
- save-state round-trip = pass
- regression budget = 0
- signed artifact attestation = valid
- no quarantined build
- production governance approval = valid

## Why the repository does not claim qualification now

The current core contains real CPU/PPU/DMA/HDMA/controller/APU scaffolding, but it does not yet implement the complete SNES hardware model. Claiming full production qualification without the remaining hardware work and test evidence would be inaccurate.

The monorepo is designed so the core can be upgraded behind ABI v1 without changing the CMS distribution.
