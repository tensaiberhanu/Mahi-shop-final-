<script>
  import DressCard from '$lib/components/DressCard.svelte';
  import { navigateTo, COUPLE_SETS } from '$lib/store.js';

  const matchingDresses = COUPLE_SETS.slice(0, 4);

  function go(page) {
    navigateTo(page, page === 'couple-sets' ? { navSection: 'matching' } : page === 'weddings' ? { navSection: 'matching' } : page === 'custom' ? { navSection: 'matching' } : {});
    window.scrollTo({top:0,behavior:'instant'});
  }
</script>

<!-- Hero -->
<div class="matching-hero">
  <div style="font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:12px;">Matching & Custom</div>
  <h1 class="matching-h1">Create<br>your <em>look.</em></h1>
  <p style="font-size:13px;line-height:1.8;color:rgba(255,255,255,.75);margin-top:14px;max-width:300px;">Order individually or create matching looks for couples, families, and events. Every piece made to your exact measurements.</p>
  <div style="display:flex;flex-direction:column;gap:6px;margin-top:1.25rem;">
    <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:rgba(255,255,255,.8);"><span style="color:var(--gold);font-size:14px;">✓</span> 100+ matching sets delivered</div>
    <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:rgba(255,255,255,.8);"><span style="color:var(--gold);font-size:14px;">✓</span> Expert Ethiopian artisans</div>
    <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:rgba(255,255,255,.8);"><span style="color:var(--gold);font-size:14px;">✓</span> Design confirmed before production</div>
  </div>
</div>

<!-- Cards -->
<div class="matching-cards">
  <div class="matching-card" on:click={()=>go('couple-sets')} role="button" tabindex="0" on:keypress={()=>go('couple-sets')}>
    <div class="matching-card-icon">💑</div>
    <div style="flex:1;">
      <div class="matching-card-title">Couple Sets</div>
      <div class="matching-card-sub">His & hers matching Ethiopian wear. One order, delivered together.</div>
      <div style="margin-top:10px;display:inline-block;background:var(--burg);color:#fff;font-size:9px;letter-spacing:.18em;text-transform:uppercase;padding:8px 16px;">Start couple set</div>
    </div>
    <svg class="matching-card-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="9 18 15 12 9 6"/></svg>
  </div>
  <div class="matching-card" on:click={()=>go('family-sets')} role="button" tabindex="0" on:keypress={()=>go('family-sets')}>
    <div class="matching-card-icon">👨‍👩‍👧‍👦</div>
    <div style="flex:1;">
      <div class="matching-card-title">Family Sets</div>
      <div class="matching-card-sub">Order for the whole family. Add each member, enter measurements, one checkout.</div>
      <div style="margin-top:10px;display:inline-block;background:var(--burg);color:#fff;font-size:9px;letter-spacing:.18em;text-transform:uppercase;padding:8px 16px;">Create family set</div>
    </div>
    <svg class="matching-card-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="9 18 15 12 9 6"/></svg>
  </div>
  <div class="matching-card" on:click={()=>go('weddings')} role="button" tabindex="0" on:keypress={()=>go('weddings')}>
    <div class="matching-card-icon">👥</div>
    <div style="flex:1;">
      <div class="matching-card-title">Groups & Events</div>
      <div class="matching-card-sub">Wedding parties. Share one link — each person orders with their own measurements.</div>
      <div style="margin-top:10px;display:inline-block;background:var(--burg);color:#fff;font-size:9px;letter-spacing:.18em;text-transform:uppercase;padding:8px 16px;">Create a group</div>
    </div>
    <svg class="matching-card-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="9 18 15 12 9 6"/></svg>
  </div>
  <div class="matching-card" on:click={()=>go('custom')} role="button" tabindex="0" on:keypress={()=>go('custom')}>
    <div class="matching-card-icon">✏️</div>
    <div style="flex:1;">
      <div class="matching-card-title">Custom Design</div>
      <div class="matching-card-sub">Seen something on Instagram or TikTok? Upload it. We'll make it for you.</div>
      <div style="margin-top:10px;display:inline-block;background:var(--burg);color:#fff;font-size:9px;letter-spacing:.18em;text-transform:uppercase;padding:8px 16px;">Request custom design</div>
    </div>
    <svg class="matching-card-arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="9 18 15 12 9 6"/></svg>
  </div>
</div>

<!-- Featured sets -->
<div class="s-hd">
  <div class="s-eyebrow">Popular sets</div>
  <h2 class="s-h2">Shop matching looks</h2>
</div>
{#if matchingDresses.length === 0}
  <div style="padding:2.5rem 16px;text-align:center;border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);">
    <p style="font-size:14px;color:var(--muted);">No products found.</p>
  </div>
{:else}
  <div class="dress-grid" style="border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);">
    {#each matchingDresses as dress}
      <DressCard {dress} />
    {/each}
  </div>
{/if}
<div style="height:2rem;"></div>
