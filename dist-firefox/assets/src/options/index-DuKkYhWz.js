import{M as u}from"../../types-DAQ-VXlD.js";import{D as E,M as j}from"../../constants-C6QKiUsO.js";import{s as b}from"../../messages-CY1_d61y.js";const v=document.getElementById("app"),w=`
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
`;async function k(){const a=await b({type:u.GET_SETTINGS,payload:void 0}),o=document.createElement("style");o.textContent=w,document.head.appendChild(o),v.innerHTML="";const n=document.createElement("div");n.className="opts-wrap";const i=document.createElement("div");i.className="opts-header",i.innerHTML=`
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
  `,n.appendChild(i);const t=document.createElement("div");t.className="opts-section";const r=document.createElement("div");r.className="opts-section-label",r.textContent="Preferences",t.appendChild(r),C(t,"Max clipboard history","maxHistory",a.maxHistory,100,1e4),y(t,"Theme","theme",a.theme,[{value:"system",label:"System"},{value:"light",label:"Light"},{value:"dark",label:"Dark"}]),y(t,"Default tab","defaultTab",a.defaultTab,[{value:"all",label:"All"},{value:"favorites",label:"Favorites"},{value:"snippets",label:"Snippets"}]),n.appendChild(t);const e=document.createElement("div");e.className="opts-section";const s=document.createElement("div");s.className="opts-section-label",s.textContent="Behavior",e.appendChild(s),h(e,"Skip password fields","skipPasswordFields",a.skipPasswordFields),h(e,"Enable snippet expansion","enableSnippetExpansion",a.enableSnippetExpansion),h(e,"Track source URLs","enableSourceTracking",a.enableSourceTracking),n.appendChild(e);const p=document.createElement("div");p.className="opts-section";const g=document.createElement("div");g.className="opts-section-label",g.textContent="Data",p.appendChild(g);const l=document.createElement("div");l.style.cssText="display:flex;gap:10px";const d=document.createElement("button");d.textContent="Export All",d.className="opts-btn opts-btn-primary",d.addEventListener("click",()=>S(c));const m=document.createElement("button");m.textContent="Import",m.className="opts-btn opts-btn-ghost",m.addEventListener("click",()=>T(c)),l.appendChild(d),l.appendChild(m),p.appendChild(l);const c=document.createElement("p");c.id="ie-status",c.className="opts-status",p.appendChild(c),n.appendChild(p),v.appendChild(n)}function C(a,o,n,i,t,r){const e=x(o),s=document.createElement("input");s.type="number",s.min=String(t),s.max=String(r),s.value=String(i),s.className="opts-input opts-input-num",s.addEventListener("change",()=>{const p=Math.max(t,Math.min(r,parseInt(s.value)||E.maxHistory));f(n,p)}),e.appendChild(s),a.appendChild(e)}function y(a,o,n,i,t){const r=x(o),e=document.createElement("select");e.className="opts-select";for(const s of t){const p=document.createElement("option");p.value=s.value,p.textContent=s.label,p.selected=s.value===i,e.appendChild(p)}e.addEventListener("change",()=>f(n,e.value)),r.appendChild(e),a.appendChild(r)}function h(a,o,n,i){const t=x(o),r=document.createElement("label");r.className="opts-toggle";const e=document.createElement("input");e.type="checkbox",e.checked=i,e.addEventListener("change",()=>f(n,e.checked));const s=document.createElement("span");s.className="opts-toggle-track";const p=document.createElement("span");p.className="opts-toggle-thumb",r.appendChild(e),r.appendChild(s),r.appendChild(p),t.appendChild(r),a.appendChild(t)}function x(a){const o=document.createElement("div");o.className="opts-row";const n=document.createElement("span");return n.textContent=a,n.className="opts-row-label",o.appendChild(n),o}async function f(a,o){await b({type:u.UPDATE_SETTINGS,payload:{[a]:o}})}async function S(a){const o=await b({type:u.EXPORT_DATA,payload:void 0}),n=JSON.stringify(o,null,2),i=new Blob([n],{type:"application/json"}),t=URL.createObjectURL(i),r=document.createElement("a");r.href=t,r.download=`clipjar-backup-${new Date().toISOString().slice(0,10)}.json`,r.click(),URL.revokeObjectURL(t),a.textContent=`Exported ${o.clipCount} clips`}function T(a){const o=document.createElement("input");o.type="file",o.accept=".json",o.addEventListener("change",async()=>{const n=o.files?.[0];if(n)try{const i=await n.text(),t=JSON.parse(i);if(!t||typeof t!="object")throw new Error("Invalid backup file");if(!Array.isArray(t.clips))throw new Error("Invalid backup: missing clips array");t.clips=t.clips.map(e=>({...e,content:typeof e.content=="string"?e.content.slice(0,j):""}));const r=await b({type:u.IMPORT_DATA,payload:{clips:t.clips,settings:t.settings}});a.textContent=`Imported ${r.imported} new clips`}catch(i){a.textContent=`Import failed: ${i}`}}),o.click()}k();
