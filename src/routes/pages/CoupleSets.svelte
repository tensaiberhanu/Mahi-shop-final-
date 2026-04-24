<script>
  import DressCard from '$lib/components/DressCard.svelte';
  import { flowOpen, flowType, currentProduct, COUPLE_SETS, navigateTo } from '$lib/store.js';

  const coupleDresses = COUPLE_SETS;

  function startCoupleSet(dress) {
    currentProduct.set(dress);
    flowType.set('couple');
    flowOpen.set(true);
    navigateTo('product', { navSection: 'matching' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function viewDesign(dress) {
    currentProduct.set(dress);
    navigateTo('product', { navSection: 'matching' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
</script>

<div style="background:var(--cream);padding:3rem 20px;">
  <div style="font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:var(--muted);margin-bottom:8px;">Matching & Custom</div>
  <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(32px,7vw,52px);font-weight:300;line-height:1.0;">Couple <em style="color:var(--burg);font-style:normal;">Sets</em></h1>
  <p style="font-size:13px;color:var(--body);line-height:1.8;margin-top:.875rem;max-width:320px;">His and hers matching Ethiopian wear. Each piece made to individual measurements, ordered in one clear flow.</p>
</div>

<div style="border-top:1px solid var(--bdr);padding:1.5rem 16px;">
  <div style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:1rem;">How couple sets work</div>
  <div class="hiw-list" style="border:none;">
    <div class="hiw-item" style="padding:14px 0;"><div class="hiw-n" style="font-size:28px;">01</div><div><div class="hiw-title">Choose a design</div><p class="hiw-text">Start from the shared look you want.</p></div></div>
    <div class="hiw-item" style="padding:14px 0;"><div class="hiw-n" style="font-size:28px;">02</div><div><div class="hiw-title">Enter both fits</div><p class="hiw-text">Add her measurements and his measurements in one sheet.</p></div></div>
    <div class="hiw-item" style="padding:14px 0;border:none;"><div class="hiw-n" style="font-size:28px;">03</div><div><div class="hiw-title">Confirm together</div><p class="hiw-text">See pricing, then add the full couple order to bag.</p></div></div>
  </div>
</div>

<div style="background:var(--gold-l);border-top:1px solid var(--gold);border-bottom:1px solid var(--gold);padding:14px 20px;display:flex;gap:16px;align-items:center;">
  <div>
    <div style="font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:4px;">Pricing</div>
    <div style="font-size:13px;color:var(--body);">Couple looks from <strong style="color:var(--ink);">{#if coupleDresses.length > 0}£{Math.min(...coupleDresses.map((dress) => dress.price))}{:else}Unavailable{/if}</strong></div>
  </div>
</div>

<div style="padding:16px 16px 8px;">
  <div style="font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);">Choose a design to start your couple set</div>
</div>

{#if coupleDresses.length === 0}
  <div style="padding:3rem;text-align:center;border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);">
    <p style="font-size:14px;color:var(--muted);">No products found.</p>
  </div>
{:else}
  <div class="dress-grid" style="border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);">
    {#each coupleDresses as dress}
      <div class="couple-card">
        <DressCard {dress} />
        <div class="couple-actions">
          <button class="d-btn-p" on:click={() => startCoupleSet(dress)}>Start couple set</button>
          <button class="d-btn-o" on:click={() => viewDesign(dress)}>View design</button>
        </div>
      </div>
    {/each}
  </div>
{/if}
<div style="height:2rem;"></div>

<style>
  .couple-card{background:#fff;}
  .couple-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 12px 18px;}
</style>
