<script>
  import { navigateTo } from '$lib/store.js';
  let signedIn = false;
  let activeTab = 'orders';
  let expandedOrder = null;

  function go(page) { navigateTo(page); window.scrollTo({top:0,behavior:'instant'}); }
  function signIn() { signedIn = true; }
  function toggleOrder(id) { expandedOrder = expandedOrder === id ? null : id; }
</script>

{#if !signedIn}
<div style="max-width:480px;margin:0 auto;padding:3rem 16px;">
  <div class="s-eyebrow">My account</div>
  <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,5vw,44px);font-weight:300;margin-top:.375rem;">Sign in</h1>
  <div style="display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--bdr);margin-top:2rem;">
    <button style="padding:13px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;border:none;cursor:pointer;font-family:var(--sans);background:var(--burg);color:#fff;border-right:1px solid var(--bdr);">Sign in</button>
    <button style="padding:13px;font-size:10px;letter-spacing:.16em;text-transform:uppercase;border:none;cursor:pointer;font-family:var(--sans);background:#fff;color:var(--muted);">Create account</button>
  </div>
  <div style="margin-top:1.5rem;display:flex;flex-direction:column;gap:.75rem;">
    <div><label class="inp-label">Email address</label><input class="inp" type="email" placeholder="selam@example.com"></div>
    <div><label class="inp-label">Password</label><input class="inp" type="password" placeholder="••••••••"></div>
    <button class="btn-p btn-full btn-lg" on:click={signIn}>Sign in</button>
    <button style="font-size:12px;color:var(--muted);text-decoration:underline;background:none;border:none;cursor:pointer;">Forgot password?</button>
  </div>
  <div style="margin-top:2rem;border-top:1px solid var(--bdr);padding-top:1.5rem;text-align:center;">
    <p style="font-size:12px;color:var(--muted);">Ordered as a guest?</p>
    <button on:click={()=>go('track')} style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);text-decoration:underline;background:none;border:none;cursor:pointer;margin-top:.625rem;">Track your order</button>
  </div>
</div>
{:else}
<div>
  <div style="border-bottom:1px solid var(--bdr);padding:2rem 16px 0;">
    <div class="s-eyebrow">My account</div>
    <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(24px,5vw,36px);font-weight:300;margin-top:.375rem;">Hello, Selam</h1>
    <div class="account-tabs" style="margin-top:1.5rem;">
      <button class="acc-tab" class:on={activeTab==='orders'} on:click={()=>activeTab='orders'}>Orders</button>
      <button class="acc-tab" class:on={activeTab==='meas'} on:click={()=>activeTab='meas'}>Measurements</button>
      <button class="acc-tab" class:on={activeTab==='details'} on:click={()=>activeTab='details'}>My details</button>
      <button class="acc-tab" class:on={activeTab==='saved'} on:click={()=>activeTab='saved'}>Saved looks</button>
    </div>
  </div>

  <div style="padding:2rem 16px;">
    {#if activeTab === 'orders'}
      <div style="display:flex;flex-direction:column;gap:1px;background:var(--bdr);border:1px solid var(--bdr);">
        <div class="order-row">
          <button class="order-header" on:click={()=>toggleOrder('ord1')}>
            <div>
              <div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap;">
                <span style="font-size:11px;font-weight:500;">Hana Modern Kemis</span>
                <span style="font-size:8px;letter-spacing:.15em;text-transform:uppercase;padding:3px 10px;background:#E6F1FB;color:#0C447C;">Dispatched</span>
              </div>
              <div style="font-size:11px;color:var(--muted);margin-top:.25rem;">14 January 2025 · £225</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          {#if expandedOrder === 'ord1'}
          <div class="order-expanded">
            <div style="font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:1rem;">Order status</div>
            <div class="status-timeline">
              <div style="position:absolute;top:10px;left:10px;right:10px;height:1px;background:var(--bdr);"></div>
              <div style="position:absolute;top:10px;left:10px;height:1px;background:var(--ink);width:75%;"></div>
              <div class="status-dot-wrap"><div class="status-dot done"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div><div class="status-label done">Confirmed</div></div>
              <div class="status-dot-wrap"><div class="status-dot done"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div><div class="status-label done">Production</div></div>
              <div class="status-dot-wrap"><div class="status-dot current"></div><div class="status-label current">Dispatched</div></div>
              <div class="status-dot-wrap"><div class="status-dot"></div><div class="status-label">Delivered</div></div>
            </div>
            <div style="background:#E6F1FB;border:1px solid #B5D4F4;padding:1rem;"><div style="font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#0C447C;margin-bottom:.375rem;">Tracking</div><div style="font-size:15px;font-weight:500;color:#0C447C;">ET123456789UK</div></div>
          </div>
          {/if}
        </div>
      </div>
    {/if}

    {#if activeTab === 'meas'}
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem;">
          <div><h2 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:300;">My measurements</h2><p style="font-size:12px;color:var(--muted);margin-top:.375rem;">Used for every Mahi order.</p></div>
          <button style="font-size:10px;color:var(--gold);text-decoration:underline;background:none;border:none;cursor:pointer;" on:click={()=>go('fit')}>Edit</button>
        </div>
        <div class="meas-display">
          <div class="meas-cell"><div class="meas-cell-label">Bust</div><div class="meas-cell-value">88</div><div class="meas-cell-unit">cm</div></div>
          <div class="meas-cell"><div class="meas-cell-label">Waist</div><div class="meas-cell-value">70</div><div class="meas-cell-unit">cm</div></div>
          <div class="meas-cell"><div class="meas-cell-label">Hips</div><div class="meas-cell-value">95</div><div class="meas-cell-unit">cm</div></div>
          <div class="meas-cell"><div class="meas-cell-label">Height</div><div class="meas-cell-value">165</div><div class="meas-cell-unit">cm</div></div>
        </div>
      </div>
    {/if}

    {#if activeTab === 'details'}
      <div>
        <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:300;margin-bottom:1.5rem;">My details</h2>
        <div style="display:flex;flex-direction:column;gap:1px;background:var(--bdr);border:1px solid var(--bdr);">
          <div class="detail-row"><div class="detail-label">Name</div><div class="detail-value">Selam Tadesse</div></div>
          <div class="detail-row"><div class="detail-label">Email</div><div class="detail-value">selam@example.com</div></div>
          <div class="detail-row"><div class="detail-label">Phone</div><div class="detail-value">+44 7700 000000</div></div>
        </div>
        <div style="margin-top:1.5rem;border-top:1px solid var(--bdr);padding-top:1.25rem;">
          <button style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);text-decoration:underline;background:none;border:none;cursor:pointer;" on:click={()=>signedIn=false}>Sign out</button>
        </div>
      </div>
    {/if}

    {#if activeTab === 'saved'}
      <div class="saved-empty">
        <div class="saved-empty-icon">♡</div>
        <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:300;margin-top:1rem;">No saved looks yet</h2>
        <p style="font-size:13px;color:var(--body);line-height:1.8;margin-top:.875rem;max-width:260px;margin-left:auto;margin-right:auto;">Tap the heart on any dress to save it here.</p>
        <button class="btn-p" style="margin-top:1.5rem;" on:click={()=>go('women')}>Browse dresses</button>
      </div>
    {/if}
  </div>
</div>
{/if}
