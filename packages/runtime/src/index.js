import { pollSnesMask, defaultSnesProfile } from "@holocron/input";

export class EmulatorRuntime {
  constructor({ core, presenter, inputProfile = defaultSnesProfile }) { this.core=core; this.presenter=presenter; this.inputProfile=inputProfile; this.running=false; this.paused=false; }
  start() { this.running=true; const loop=()=>{ if(!this.running)return; if(!this.paused){this.core.setController1(pollSnesMask(this.inputProfile));this.core.runFrame();this.presenter.present(this.core.framebuffer());} this.raf=requestAnimationFrame(loop);}; loop(); }
  pause(){this.paused=true;} resume(){this.paused=false;} stop(){this.running=false;cancelAnimationFrame(this.raf);}
}
