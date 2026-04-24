<script>
  import DressCard from '$lib/components/DressCard.svelte';
  import { flowOpen, flowType, currentProduct, FAMILY_SETS, navigateTo } from '$lib/store.js';

  const ADULT_MEN_PRICE = 145;
  const CHILD_PRICE = 85;
  const familyDresses = FAMILY_SETS;

  function startFamilySet(dress) {
    currentProduct.set(dress);
    flowType.set('family');
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
  <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(32px,7vw,52px);font-weight:300;line-height:1.0;">Family <em style="color:var(--burg);font-style:normal;">Sets</em></h1>
  <p style="font-size:13px;color:var(--body);line-height:1.8;margin-top:.875rem;max-width:320px;">Matching looks for the whole family, with each person added in one clear made-to-measure flow.</p>
</div>

<div style="border-top:1px solid var(--bdr);padding:1.5rem 16px;">
  <div style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:1rem;">Pricing per person</div>
  <div style="display:flex;flex-direction:column;gap:1px;background:var(--bdr);border:1px solid var(--bdr);">
    <div style="background:#fff;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;">
      <div><div style="font-size:12px;font-weight:500;">Adult woman</div><div style="font-size:11px;color:var(--muted);margin-top:2px;">Base dress from the selected design</div></div>
      <div style="font-size:14px;font-weight:500;color:var(--burg);">Varies by product</div>
    </div>
    <div style="background:#fff;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;">
      <div><div style="font-size:12px;font-weight:500;">Adult man</div><div style="font-size:11px;color:var(--muted);margin-top:2px;">Matching men&apos;s piece</div></div>
      <div style="font-size:14px;font-weight:500;color:var(--burg);">from £{ADULT_MEN_PRICE}</div>
    </div>
    <div style="background:#fff;padding:12px 14px;display:flex;justify-content:space-between;align-items:center;">
      <div><div style="font-size:12px;font-weight:500;">Child</div><div style="font-size:11px;color:var(--muted);margin-top:2px;">Children&apos;s matching piece</div></div>
      <div style="font-size:14px;font-weight:500;color:var(--burg);">from £{CHILD_PRICE}</div>
    </div>
  </div>
</div>

<div style="border-top:1px solid var(--bdr);padding:0 16px 1.5rem;">
  <div class="hiw-list" style="border:none;">
    <div class="hiw-item" style="padding:14px 0;"><div class="hiw-n" style="font-size:28px;">01</div><div><div class="hiw-title">Choose a design</div><p class="hiw-text">Pick the shared base look.</p></div></div>
    <div class="hiw-item" style="padding:14px 0;"><div class="hiw-n" style="font-size:28px;">02</div><div><div class="hiw-title">Add every family member</div><p class="hiw-text">Enter each person&apos;s fit before confirming the order.</p></div></div>
    <div class="hiw-item" style="padding:14px 0;border:none;"><div class="hiw-n" style="font-size:28px;">03</div><div><div class="hiw-title">Checkout together</div><p class="hiw-text">Review pricing and add the full family set in one step.</p></div></div>
  </div>
</div>

<div style="padding:0 16px 8px;border-top:1px solid var(--bdr);">
  <div style="font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);padding-top:16px;">Choose a design to start your family set</div>
</div>
{#if familyDresses.length === 0}
  <div style="padding:3rem;text-align:center;border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);">
    <p style="font-size:14px;color:var(--muted);">No products found.</p>
  </div>
{:else}
  <div class="dress-grid" style="border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);">
    {#each familyDresses as dress}
      <div class="family-card">
        <DressCard {dress} />
        <div class="family-actions">
          <button class="d-btn-p" on:click={() => startFamilySet(dress)}>Create family set</button>
          <button class="d-btn-o" on:click={() => viewDesign(dress)}>View design</button>
        </div>
      </div>
    {/each}
  </div>
{/if}
<div style="height:2rem;"></div>

<style>
  .family-card{background:#fff;}
  .family-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 12px 18px;}
</style>
