import { HolocronCore } from "../../../packages/sdk/src/index.js";
import { WebGLPresenter } from "../../../packages/webgl/src/index.js";
import { defaultSnesProfile, pollSnesMask } from "../../../packages/input/src/index.js";
const $=id=>document.getElementById(id);let core,presenter,romBytes,running=false,paused=false,lastState;
$("rom").onchange=async e=>{const f=e.target.files[0];romBytes=f?new Uint8Array(await f.arrayBuffer()):null;$("log").textContent=romBytes?`ROM selected: ${romBytes.length} bytes`:"No ROM selected";};
$("boot").onclick=async()=>{try{core=await new HolocronCore().open("/core/holocron-snes-core.wasm");presenter=new WebGLPresenter($("screen"));$("status").textContent=`CORE ABI ${Object.values(core.version()).join(".")}`;$("status").className="ok";}catch(e){$("status").textContent="BOOT FAILED";$("log").textContent=String(e);}};
function frameLoop(){if(!running)return;if(!paused){core.setController1(pollSnesMask(defaultSnesProfile));core.runFrame();presenter.present(core.framebuffer());}requestAnimationFrame(frameLoop);}
$("run").onclick=()=>{try{if(!core)throw new Error("Boot core first.");if(!romBytes)throw new Error("Select a legal/homebrew/user-owned ROM.");core.reset();core.loadRom(romBytes);if(!running){running=true;paused=false;frameLoop();}else paused=false;$("status").textContent="RUNNING";}catch(e){$("log").textContent=String(e);}};
$("pause").onclick=()=>{paused=true;$("status").textContent="PAUSED";};$("save").onclick=()=>{try{lastState=core.saveState();$("log").textContent=`Saved ${lastState.length} bytes`;}catch(e){$("log").textContent=String(e);}};$("load").onclick=()=>{try{if(!lastState)throw new Error("No state saved.");core.loadState(lastState);$("log").textContent="State restored";}catch(e){$("log").textContent=String(e);}};
