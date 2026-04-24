<script>
  import DressCard from '$lib/components/DressCard.svelte';
  import { MEN, menListingFilter } from '$lib/store.js';

  const cats = ['All', 'Tops', 'Sets'];

  $: activeFilter = $menListingFilter;
  $: filtered = MEN.filter((dress) => activeFilter === 'All' || dress.cat === activeFilter);
  $: heading = activeFilter === 'All' ? "Men's" : `Men's ${activeFilter}`;
</script>

<div style="border-bottom:1px solid var(--bdr);">
  <div class="s-hd listing-head">
    <div class="s-eyebrow">Collection</div>
    <div style="display:flex;align-items:flex-end;justify-content:space-between;">
      <h1 class="s-h2">{heading}</h1>
      <span style="font-size:11px;color:var(--muted);">{filtered.length} pieces</span>
    </div>
  </div>
  <div class="filter-scroll">
    {#each cats as cat}
      <button class="fpill" class:on={activeFilter === cat} on:click={() => menListingFilter.set(cat)}>{cat}</button>
    {/each}
  </div>
</div>

{#if filtered.length === 0}
  <div class="listing-empty">
    <p style="font-size:14px;color:var(--muted);">No products found.</p>
    <button class="btn-o" style="margin-top:1rem;font-size:10px;" on:click={() => menListingFilter.set('All')}>Clear filter</button>
  </div>
{:else}
  <div class="dress-grid" style="border-top:1px solid var(--bdr);">
    {#each filtered as dress}
      <DressCard {dress} isMen={true} />
    {/each}
  </div>
{/if}
<div style="height:2rem;"></div>

<style>
  .listing-head{padding-bottom:10px;}
  .listing-empty{padding:56px 20px;text-align:center;}

  @media(max-width:640px){
    .listing-empty{padding:48px 16px;}
  }
</style>
