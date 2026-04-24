<script>
  import { cart, navigateTo, commitCartToOrders } from '$lib/store.js';

  $: total = $cart.reduce((sum, item) => sum + item.price, 0);

  function go(page) {
    navigateTo(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function payNow() {
    commitCartToOrders();
    go('success');
  }
</script>

<div style="max-width:1200px;margin:0 auto;">
  <div style="padding:2rem 16px 1rem;border-bottom:1px solid var(--bdr);">
    <div class="s-eyebrow">Almost there</div>
    <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(26px,5vw,38px);font-weight:300;margin-top:.375rem;">Secure checkout</h1>
  </div>
  <div style="padding:16px;display:flex;flex-direction:column;gap:1rem;">
    <div style="border:1px solid var(--bdr);padding:16px;">
      <div style="font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:var(--muted);margin-bottom:14px;">Contact information</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;">
        <div><label class="inp-label">First name *</label><input class="inp" placeholder="Selam"></div>
        <div><label class="inp-label">Last name *</label><input class="inp" placeholder="Tadesse"></div>
        <div style="grid-column:1/-1;"><label class="inp-label">Email *</label><input class="inp" type="email" placeholder="selam@example.com"></div>
        <div style="grid-column:1/-1;"><label class="inp-label">Phone</label><input class="inp" type="tel" placeholder="+44 7700 000000"></div>
      </div>
    </div>
    <div style="border:1px solid var(--bdr);padding:16px;">
      <div style="font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:var(--muted);margin-bottom:14px;">Delivery address</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;">
        <div style="grid-column:1/-1;"><label class="inp-label">Street address *</label><input class="inp" placeholder="123 Example Street"></div>
        <div><label class="inp-label">City *</label><input class="inp" placeholder="London"></div>
        <div><label class="inp-label">Postcode *</label><input class="inp" placeholder="SW1A 1AA"></div>
        <div style="grid-column:1/-1;"><label class="inp-label">Country *</label>
          <select class="inp"><option>United Kingdom</option><option>United States</option><option>Canada</option><option>Australia</option><option>Ethiopia</option><option>UAE</option></select>
        </div>
      </div>
    </div>
    <div style="background:var(--soft);border:1px solid var(--bdr);padding:16px;">
      <div style="font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:var(--muted);margin-bottom:14px;">Order summary</div>
      {#each $cart as item}
        <div style="display:flex;gap:.875rem;padding-bottom:12px;border-bottom:1px solid var(--bdr);margin-bottom:12px;">
          <div style="width:56px;flex-shrink:0;background:var(--cream);aspect-ratio:3/4;display:flex;align-items:center;justify-content:center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1"><path d="M9 3L5 7v14h14V7l-4-4"/><path d="M9 3c0 2.2 1.3 4 3 4s3-1.8 3-4"/></svg>
          </div>
          <div>
            <div style="font-size:13px;font-weight:500;">{item.productName || item.name}</div>
            <div style="font-size:11px;color:var(--muted);margin-top:.2rem;">{item.details || 'Custom fit'}</div>
            <div style="font-size:11px;color:var(--muted);margin-top:.2rem;">Mode: {item.mode}</div>
            <div style="font-size:13px;margin-top:.375rem;">£{item.price}</div>
          </div>
        </div>
      {/each}
      {#if $cart.length === 0}
        <div style="font-size:13px;color:var(--muted);">No items in bag.</div>
      {/if}
      <div style="display:flex;justify-content:space-between;font-size:13px;padding:.3rem 0;color:var(--body);"><span>Subtotal</span><span>£{total}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:13px;padding:.3rem 0;color:var(--body);"><span>Shipping</span><span style="color:var(--muted);">At payment</span></div>
      <div style="display:flex;justify-content:space-between;font-size:15px;font-weight:500;border-top:1px solid var(--bdr);margin-top:.5rem;padding-top:.875rem;"><span>Total</span><span>£{total}</span></div>
    </div>
    <button class="btn-p btn-full btn-lg" on:click={payNow}>Pay securely with Stripe · £{total}</button>
    <div style="display:flex;align-items:center;justify-content:center;gap:.5rem;font-size:10px;color:var(--muted);">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
      Secure payment via Stripe
    </div>
  </div>
</div>
