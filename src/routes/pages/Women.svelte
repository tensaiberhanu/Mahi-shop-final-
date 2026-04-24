<script>
  import DressCard from '$lib/components/DressCard.svelte';
  import { WOMEN, womenListingMode, womenDressFilter } from '$lib/store.js';

  const dressTabs = ['All', 'Bridal', 'Modern', 'Traditional'];
  let search = '';

  $: mode = $womenListingMode;
  $: activeFilter = $womenDressFilter;
  $: filtered = WOMEN.filter((dress) => {
    const searchValue = search.toLowerCase();
    const matchesSearch = dress.name.toLowerCase().includes(searchValue) || dress.cat.toLowerCase().includes(searchValue);
    const matchesCategory = mode !== 'dresses' || activeFilter === 'All' || dress.cat === activeFilter;
    return matchesSearch && matchesCategory;
  });
  $: pageTitle = mode === 'dresses' ? "Women's Dresses" : "Women's";
  $: pageCountLabel = filtered.length === 1 ? 'piece' : 'pieces';
</script>

<div style="border-bottom:1px solid var(--bdr);">
  <div class="s-hd listing-head">
    <div class="s-eyebrow">Collection</div>
    <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px;">
      <h1 class="s-h2">{pageTitle}</h1>
      <span style="font-size:11px;color:var(--muted);">{filtered.length} {pageCountLabel}</span>
    </div>
  </div>
  <div class="listing-search">
    <input class="inp" placeholder="Search women's pieces..." bind:value={search} style="font-size:12px;">
  </div>

  {#if mode === 'dresses'}
    <div class="filter-scroll">
      {#each dressTabs as cat}
        <button class="fpill" class:on={activeFilter === cat} on:click={() => womenDressFilter.set(cat)}>{cat}</button>
      {/each}
    </div>
  {/if}
</div>

{#if filtered.length === 0}
  <div class="listing-empty">
    <p style="font-size:14px;color:var(--muted);">No products found.</p>
    <button class="btn-o" style="margin-top:1rem;font-size:10px;" on:click={() => { search = ''; womenDressFilter.set('All'); }}>Clear filters</button>
  </div>
{:else}
  <div class="dress-grid" style="border-top:1px solid var(--bdr);">
    {#each filtered as dress}
      <DressCard {dress} />
    {/each}
  </div>
{/if}
<div style="height:2rem;"></div>

<style>
  .listing-head{padding-bottom:10px;}
  .listing-search{padding:0 16px 14px;}
  .listing-empty{padding:56px 20px;text-align:center;}

  @media(max-width:640px){
    .listing-search{padding:0 16px 12px;}
    .listing-empty{padding:48px 16px;}
  }
</style>
