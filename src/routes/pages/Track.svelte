<script>
  import { navigateTo } from '$lib/store.js';
  let searching = false;
  let result = false;
  function go(page) { navigateTo(page); window.scrollTo({top:0,behavior:'instant'}); }
  function track() {
    searching = true;
    setTimeout(() => { searching = false; result = true; }, 1000);
  }
</script>

<div class="static-page">
  <div class="s-eyebrow">Order tracking</div>
  <h1 class="static-h1">Track your order</h1>
  <p style="font-size:14px;line-height:1.9;color:var(--body);margin-top:.875rem;">Enter your order number and the email address you used at checkout.</p>

  <div style="border-top:1px solid var(--bdr);margin-top:2rem;padding-top:2rem;display:flex;flex-direction:column;gap:.75rem;">
    <div><label class="inp-label">Order number</label><input class="inp" placeholder="e.g. ORD-2025-001234"><p style="font-size:11px;color:var(--muted);margin-top:.375rem;">Your order number is in your confirmation email.</p></div>
    <div><label class="inp-label">Email address</label><input class="inp" type="email" placeholder="selam@example.com"></div>
    <button class="btn-p btn-full btn-lg" on:click={track} disabled={searching}>{searching ? 'Searching…' : 'Track order'}</button>
  </div>

  {#if result}
    <div style="margin-top:2rem;" class="track-result">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem;flex-wrap:wrap;gap:.5rem;">
        <div><div style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);">Order</div><div style="font-size:15px;font-weight:500;margin-top:.25rem;">ORD-2025-001234</div></div>
        <div style="text-align:right;"><div style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);">Placed</div><div style="font-size:13px;margin-top:.25rem;">14 January 2025</div></div>
      </div>
      <div class="status-timeline" style="margin-bottom:1.5rem;">
        <div style="position:absolute;top:10px;left:10px;right:10px;height:1px;background:var(--bdr);"></div>
        <div style="position:absolute;top:10px;left:10px;height:1px;background:var(--burg);width:75%;"></div>
        <div class="status-dot-wrap"><div class="status-dot done"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div><div class="status-label done">Confirmed</div></div>
        <div class="status-dot-wrap"><div class="status-dot done"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div><div class="status-label done">In production</div></div>
        <div class="status-dot-wrap"><div class="status-dot current" style="border-color:var(--ink);"><div style="width:6px;height:6px;border-radius:50%;background:var(--ink);"></div></div><div class="status-label current">Dispatched</div></div>
        <div class="status-dot-wrap"><div class="status-dot"></div><div class="status-label">Delivered</div></div>
      </div>
      <div style="background:#E6F1FB;border:1px solid #B5D4F4;padding:1rem;margin-bottom:1rem;"><div style="font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#0C447C;margin-bottom:.375rem;">Tracking number</div><div style="font-size:15px;font-weight:500;color:#0C447C;">ET123456789UK</div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.625rem;">
        <button class="btn-p" style="font-size:9px;padding:13px;" on:click={()=>go('contact')}>Get help</button>
        <button class="btn-o" style="font-size:9px;padding:13px;" on:click={()=>go('account')}>My account</button>
      </div>
    </div>
  {/if}

  <div style="margin-top:2rem;border-top:1px solid var(--bdr);padding-top:1.5rem;text-align:center;">
    <p style="font-size:13px;color:var(--body);">Have an account?</p>
    <button on:click={()=>go('account')} style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);text-decoration:underline;background:none;border:none;cursor:pointer;margin-top:.625rem;">Sign in to see all your orders</button>
  </div>
</div>
