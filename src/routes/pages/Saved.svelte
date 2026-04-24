<script>
  import DressCard from '$lib/components/DressCard.svelte';
  import { saved, ALL_PRODUCTS_CATALOG as all, navigateTo } from '$lib/store.js';

  function go(page) {
    navigateTo(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  $: savedDresses = all.filter((dress) => $saved.has(dress.id));
</script>

<div class="s-hd">
  <div class="s-eyebrow">My account</div>
  <h1 class="s-h2" style="font-size:clamp(28px,5vw,44px);">Saved looks</h1>
</div>

{#if savedDresses.length === 0}
  <div class="saved-empty" style="border-top:1px solid var(--bdr);">
    <div class="saved-empty-icon">♡</div>
    <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:300;margin-top:1rem;">No saved looks yet</h2>
    <p style="font-size:13px;color:var(--body);line-height:1.8;margin-top:.875rem;">Tap the heart on any dress to save it here.</p>
    <button class="btn-p" style="margin-top:1.5rem;" on:click={() => go('women')}>Browse dresses</button>
  </div>
{:else}
  <div class="dress-grid" style="border-top:1px solid var(--bdr);">
    {#each savedDresses as dress}
      <DressCard {dress} isMen={dress.collection === 'men'} />
    {/each}
  </div>
{/if}
