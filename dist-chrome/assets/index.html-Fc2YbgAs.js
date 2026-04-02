import{s as u}from"./messages-q-HxjELW.js";import{M as b}from"./types-CsvTKnt5.js";import{c as E,M as j}from"./constants-Cw9bVvMb.js";const v=document.getElementById("app"),w=`
  *,*::before,*::after{box-sizing:border-box}
  :root{
    --j-surface:#0D0A06;--j-glass:#141009;--j-raised:#1C1509;
    --j-border:#2C1D0A;--j-amber:#C87A38;--j-gold:#E8A848;
    --j-cream:#EED9B5;--j-muted:#9A7A52;--j-dim:#5A4030;
  }
  body{
    background:var(--j-surface);color:var(--j-cream);margin:0;
    font-family:ui-sans-serif,system-ui,sans-serif;
    font-size:14px;-webkit-font-smoothing:antialiased;
    min-height:100vh;
  }
  .opts-wrap{max-width:480px;margin:0 auto;padding:40px 24px 60px}
  .opts-header{display:flex;align-items:center;gap:10px;margin-bottom:40px;padding-bottom:20px;border-bottom:1px solid var(--j-border)}
  .opts-logo{display:flex;align-items:center;gap:8px}
  .opts-jar{color:var(--j-amber)}
  .opts-wordmark{font-size:15px;font-weight:700;color:var(--j-amber);letter-spacing:0.14em;text-transform:uppercase}
  .opts-title{font-size:11px;color:var(--j-dim);letter-spacing:0.12em;text-transform:uppercase;margin-left:auto}
  .opts-section{margin-bottom:32px}
  .opts-section-label{font-size:9.5px;font-weight:700;color:var(--j-gold);letter-spacing:0.14em;text-transform:uppercase;margin-bottom:14px}
  .opts-row{display:flex;align-items:center;justify-content:space-between;padding:11px 0;border-bottom:1px solid var(--j-border)}
  .opts-row:last-child{border-bottom:none}
  .opts-row-label{font-size:13px;color:var(--j-cream)}
  .opts-input{
    background:var(--j-raised);border:1px solid var(--j-border);border-radius:3px;
    padding:5px 10px;color:var(--j-cream);font-size:12px;font-family:ui-monospace,monospace;
    outline:none;transition:border-color 0.15s;
  }
  .opts-input:focus{border-color:var(--j-amber)}
  .opts-input-num{width:80px;text-align:center}
  .opts-select{
    background:var(--j-raised);border:1px solid var(--j-border);border-radius:3px;
    padding:5px 10px;color:var(--j-cream);font-size:12px;font-family:inherit;
    outline:none;cursor:pointer;transition:border-color 0.15s;
  }
  .opts-select:focus{border-color:var(--j-amber)}
  .opts-toggle{position:relative;width:36px;height:20px;cursor:pointer}
  .opts-toggle input{opacity:0;width:0;height:0;position:absolute}
  .opts-toggle-track{
    position:absolute;inset:0;border-radius:10px;background:var(--j-border);
    transition:background 0.2s;
  }
  .opts-toggle input:checked ~ .opts-toggle-track{background:var(--j-amber)}
  .opts-toggle-thumb{
    position:absolute;top:3px;left:3px;width:14px;height:14px;border-radius:50%;
    background:var(--j-dim);transition:transform 0.2s,background 0.2s;
  }
  .opts-toggle input:checked ~ .opts-toggle-thumb{transform:translateX(16px);background:var(--j-surface)}
  .opts-btn{
    padding:8px 18px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
    border-radius:2px;border:none;cursor:pointer;transition:background 0.15s;font-family:inherit;
  }
  .opts-btn-primary{background:var(--j-amber);color:var(--j-surface)}
  .opts-btn-primary:hover{background:var(--j-gold)}
  .opts-btn-ghost{background:var(--j-glass);color:var(--j-muted);border:1px solid var(--j-border)}
  .opts-btn-ghost:hover{border-color:var(--j-amber);color:var(--j-cream)}
  .opts-status{margin-top:10px;font-size:11px;color:var(--j-muted);font-family:ui-monospace,monospace;min-height:18px}
`;async function k(){const n=await u({type:b.GET_SETTINGS,payload:void 0}),e=document.createElement("style");e.textContent=w,document.head.appendChild(e),v.innerHTML="";const r=document.createElement("div");r.className="opts-wrap";const p=document.createElement("div");p.className="opts-header",p.innerHTML=`
    <div class="opts-logo">
      <svg class="opts-jar" width="14" height="18" viewBox="0 0 13 17" fill="none">
        <rect x="2" y="0.5" width="9" height="2.5" rx="0.8" fill="currentColor" opacity="0.85"/>
        <rect x="3.5" y="3" width="6" height="1.5" fill="currentColor" opacity="0.55"/>
        <path d="M1.5 4.5L1 14Q1 15.5 2.5 15.5H10.5Q12 15.5 12 14L11.5 4.5Z" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-opacity="0.65" stroke-width="0.9"/>
        <line x1="3.5" y1="6" x2="3" y2="13.5" stroke="currentColor" stroke-width="0.9" opacity="0.25" stroke-linecap="round"/>
      </svg>
      <span class="opts-wordmark">Clipjar</span>
    </div>
    <span class="opts-title">Settings</span>
  `,r.appendChild(p);const s=document.createElement("div");s.className="opts-section";const t=document.createElement("div");t.className="opts-section-label",t.textContent="Preferences",s.appendChild(t),C(s,"Max clipboard history","maxHistory",n.maxHistory,100,1e4),y(s,"Theme","theme",n.theme,[{value:"system",label:"System"},{value:"light",label:"Light"},{value:"dark",label:"Dark"}]),y(s,"Default tab","defaultTab",n.defaultTab,[{value:"all",label:"All"},{value:"favorites",label:"Favorites"},{value:"snippets",label:"Snippets"}]),r.appendChild(s);const o=document.createElement("div");o.className="opts-section";const a=document.createElement("div");a.className="opts-section-label",a.textContent="Behavior",o.appendChild(a),h(o,"Skip password fields","skipPasswordFields",n.skipPasswordFields),h(o,"Enable snippet expansion","enableSnippetExpansion",n.enableSnippetExpansion),h(o,"Track source URLs","enableSourceTracking",n.enableSourceTracking),r.appendChild(o);const i=document.createElement("div");i.className="opts-section";const g=document.createElement("div");g.className="opts-section-label",g.textContent="Data",i.appendChild(g);const l=document.createElement("div");l.style.cssText="display:flex;gap:10px";const d=document.createElement("button");d.textContent="Export All",d.className="opts-btn opts-btn-primary",d.addEventListener("click",()=>S(c));const m=document.createElement("button");m.textContent="Import",m.className="opts-btn opts-btn-ghost",m.addEventListener("click",()=>T(c)),l.appendChild(d),l.appendChild(m),i.appendChild(l);const c=document.createElement("p");c.id="ie-status",c.className="opts-status",i.appendChild(c),r.appendChild(i),v.appendChild(r)}function C(n,e,r,p,s,t){const o=x(e),a=document.createElement("input");a.type="number",a.min=String(s),a.max=String(t),a.value=String(p),a.className="opts-input opts-input-num",a.addEventListener("change",()=>{const i=Math.max(s,Math.min(t,parseInt(a.value)||E.maxHistory));f(r,i)}),o.appendChild(a),n.appendChild(o)}function y(n,e,r,p,s){const t=x(e),o=document.createElement("select");o.className="opts-select";for(const a of s){const i=document.createElement("option");i.value=a.value,i.textContent=a.label,i.selected=a.value===p,o.appendChild(i)}o.addEventListener("change",()=>f(r,o.value)),t.appendChild(o),n.appendChild(t)}function h(n,e,r,p){const s=x(e),t=document.createElement("label");t.className="opts-toggle";const o=document.createElement("input");o.type="checkbox",o.checked=p,o.addEventListener("change",()=>f(r,o.checked));const a=document.createElement("span");a.className="opts-toggle-track";const i=document.createElement("span");i.className="opts-toggle-thumb",t.appendChild(o),t.appendChild(a),t.appendChild(i),s.appendChild(t),n.appendChild(s)}function x(n){const e=document.createElement("div");e.className="opts-row";const r=document.createElement("span");return r.textContent=n,r.className="opts-row-label",e.appendChild(r),e}async function f(n,e){await u({type:b.UPDATE_SETTINGS,payload:{[n]:e}})}async function S(n){const e=await u({type:b.EXPORT_DATA,payload:void 0}),r=JSON.stringify(e,null,2),p=new Blob([r],{type:"application/json"}),s=URL.createObjectURL(p),t=document.createElement("a");t.href=s,t.download=`clipjar-backup-${new Date().toISOString().slice(0,10)}.json`,t.click(),URL.revokeObjectURL(s),n.textContent=`Exported ${e.clipCount} clips`}function T(n){const e=document.createElement("input");e.type="file",e.accept=".json",e.addEventListener("change",async()=>{var p;const r=(p=e.files)==null?void 0:p[0];if(r)try{const s=await r.text(),t=JSON.parse(s);if(!t||typeof t!="object")throw new Error("Invalid backup file");if(!Array.isArray(t.clips))throw new Error("Invalid backup: missing clips array");t.clips=t.clips.map(a=>({...a,content:typeof a.content=="string"?a.content.slice(0,j):""}));const o=await u({type:b.IMPORT_DATA,payload:{clips:t.clips,settings:t.settings}});n.textContent=`Imported ${o.imported} new clips`}catch(s){n.textContent=`Import failed: ${s}`}}),e.click()}k();
