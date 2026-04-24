<script>
  import { tryonOpen, currentProduct, navigateTo } from '$lib/store.js';

  function close() { tryonOpen.set(false); }

  function goProduct() {
    tryonOpen.set(false);
    navigateTo('product');
    window.scrollTo({top:0,behavior:'instant'});
  }
</script>

<div id="tryon" class:open={$tryonOpen}>
  <div id="tryon-bd" on:click={close} role="presentation"></div>
  <div id="tryon-sheet">
    <div class="sheet-handle"><div class="sheet-handle-bar"></div></div>
    <div class="sheet-hd">
      <div>
        <div class="sheet-title">Try it on</div>
        <div class="sheet-sub">{$currentProduct?.name || 'Dress name'}</div>
      </div>
      <button class="sheet-close" on:click={close}>✕</button>
    </div>
    <div class="tryon-tabs">
      <button class="tryon-tab on">Upload photo</button>
      <button class="tryon-tab">Live camera</button>
    </div>
    <div class="upload-zone">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
      <div style="font-size:13px;font-weight:500;">Upload your photo</div>
      <div style="font-size:11px;color:var(--muted);text-align:center;max-width:200px;line-height:1.6;">Stand facing forward, full body, plain background works best</div>
      <button class="btn-p" style="font-size:9px;padding:10px 20px;">Choose photo</button>
    </div>
    <div style="text-align:center;padding:.5rem 16px 1rem;font-size:11px;color:var(--muted);">AI try-on coming soon. Upload your photo to be first to try it.</div>
    <div class="tryon-actions">
      <button class="btn-p" on:click={goProduct}>Buy this dress</button>
      <button class="btn-o" on:click={close}>Close</button>
    </div>
  </div>
</div>

<style>
  #tryon{position:fixed;inset:0;z-index:300;pointer-events:none;display:flex;flex-direction:column;}
  #tryon-bd{position:absolute;inset:0;background:rgba(0,0,0,0);transition:background .3s;cursor:pointer;}
  #tryon-sheet{position:relative;z-index:1;width:100%;background:#fff;margin-top:auto;max-height:92svh;overflow-y:auto;transform:translateY(100%);transition:transform .36s cubic-bezier(.4,0,.2,1);border-top:1px solid var(--bdr);}
  #tryon.open{pointer-events:all;}
  #tryon.open #tryon-bd{background:rgba(0,0,0,.65);}
  #tryon.open #tryon-sheet{transform:translateY(0);}
  .sheet-hd{display:flex;align-items:flex-start;justify-content:space-between;padding:0 16px 16px;border-bottom:1px solid var(--bdr);}
  .sheet-title{font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:300;}
  .sheet-sub{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-top:3px;}
  .sheet-close{width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--muted);cursor:pointer;}
  .tryon-tabs{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid var(--bdr);}
  .tryon-tab{padding:13px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;text-align:center;cursor:pointer;color:var(--muted);background:#fff;border:none;border-right:1px solid var(--bdr);font-family:var(--sans);border-bottom:2px solid transparent;}
  .tryon-tab:last-child{border-right:none;}
  .tryon-tab.on{color:var(--ink);border-bottom:2px solid var(--ink);}
  .tryon-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:16px;border-top:1px solid var(--bdr);}
</style>
