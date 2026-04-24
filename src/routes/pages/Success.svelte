<script>
  import { navigateTo, orders } from '$lib/store.js';

  $: latestOrders = [...$orders].slice(-3).reverse();

  function go(page) {
    navigateTo(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
</script>

<div style="max-width:600px;margin:0 auto;padding:4rem 16px;text-align:center;">
  <div style="width:64px;height:64px;background:var(--ink);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto;">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
  </div>
  <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(34px,7vw,52px);font-weight:300;margin-top:1.5rem;">Order confirmed</h1>
  <p style="font-size:13px;line-height:1.9;color:var(--body);margin-top:1rem;max-width:320px;margin-left:auto;margin-right:auto;">Thank you. Your order is now in the Mahi system and ready for production handling.</p>
  <div style="border:1px solid var(--bdr);text-align:left;margin-top:2rem;">
    <div style="display:flex;gap:12px;padding:14px 16px;border-bottom:1px solid var(--bdr);font-size:13px;color:var(--body);align-items:center;"><span style="font-size:18px;">✓</span><span>Order record created</span></div>
    <div style="display:flex;gap:12px;padding:14px 16px;border-bottom:1px solid var(--bdr);font-size:13px;color:var(--body);align-items:center;"><span style="font-size:18px;">✂</span><span>Production queue ready</span></div>
    <div style="display:flex;gap:12px;padding:14px 16px;border-bottom:1px solid var(--bdr);font-size:13px;color:var(--body);align-items:center;"><span style="font-size:18px;">📏</span><span>Measurements attached to the order</span></div>
    <div style="display:flex;gap:12px;padding:14px 16px;font-size:13px;color:var(--body);align-items:center;"><span style="font-size:18px;">✈</span><span>Delivery updates will follow later</span></div>
  </div>
  {#if latestOrders.length}
    <div style="border:1px solid var(--bdr);text-align:left;margin-top:1rem;padding:16px;">
      <div style="font-size:9px;letter-spacing:.25em;text-transform:uppercase;color:var(--muted);margin-bottom:12px;">Recent order records</div>
      {#each latestOrders as order}
        <div style="display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-top:1px solid var(--bdr);font-size:12px;color:var(--body);">
          <span>{order.mode} · {order.id}</span>
          <strong>£{order.total}</strong>
        </div>
      {/each}
    </div>
  {/if}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-top:2rem;">
    <button class="btn-p btn-lg" on:click={() => go('home')}>Back to home</button>
    <button class="btn-o btn-lg" on:click={() => go('women')}>Shop more</button>
  </div>
</div>
