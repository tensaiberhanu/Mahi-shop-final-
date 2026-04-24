<script>
  import { saved, navigateTo, currentProduct, showToast, tryonOpen } from '$lib/store.js';

  export let dress;
  export let isMen = false;

  const fillerWords = new Set([
    'ethiopian', 'traditional', 'modern', 'online', 'dress', 'dresses', 'set', 'sets',
    'outfit', 'style', 'graceful', 'luxurious', 'charming', 'embroidered', 'embroidery',
    'wedding', 'for', 'and', 'with', 'the', 'habesha', 'kemis', 'groom', 'bridal', 'family',
    'couple', 'matching', 'look', 'long', 'short', 'sleeve', 'sleeveless', 'strapless'
  ]);
  const colorWords = ['Golden', 'Ivory', 'Green', 'Pink', 'Blue', 'White', 'Black', 'Silver', 'Red'];

  $: isSaved = $saved.has(dress.id);
  $: displayName = shortCardName(dress);
  $: fallbackTone = isMen ? 'is-men' : dress?.cat === 'Bridal' ? 'is-bridal' : dress?.cat === 'Modern' ? 'is-modern' : 'is-traditional';

  function toTitleCase(value) {
    return value
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  function shortCardName(product) {
    if (!product?.name) return isMen ? 'Mahi Set' : 'Mahi Kemis';

    const rawWords = product.name
      .replace(/[^a-zA-Z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter(Boolean);

    const color = rawWords.find((word) => colorWords.includes(toTitleCase(word)));
    const core = rawWords
      .filter((word) => !/\d/.test(word))
      .map((word) => toTitleCase(word))
      .filter((word) => !fillerWords.has(word.toLowerCase()));

    const chosen = [];
    if (color) chosen.push(toTitleCase(color));
    for (const word of core) {
      if (!chosen.includes(word)) chosen.push(word);
      if (chosen.length === 2) break;
    }

    let prefix = chosen.join(' ').trim();
    if (!prefix) prefix = isMen ? 'Mahi' : 'Liya';

    if (isMen) {
      return product.cat === 'Sets' ? `${prefix} Set` : `${prefix} Top`;
    }

    if (product.cat === 'Bridal') return `${prefix} Bridal Kemis`;
    if (product.cat === 'Modern') return `${prefix} Modern Kemis`;
    if (product.cat === 'Traditional') return `${prefix} Habesha`;
    return `${prefix} Kemis`;
  }

  function placeholderLabel() {
    if (isMen) return 'MAHI MEN';
    if (dress?.cat === 'Bridal') return 'MAHI BRIDAL';
    if (dress?.cat === 'Modern') return 'MAHI MODERN';
    return 'MAHI';
  }

  function toggleSave(e) {
    e.stopPropagation();
    saved.update((s) => {
      const ns = new Set(s);
      if (ns.has(dress.id)) {
        ns.delete(dress.id);
        showToast('Removed from saved');
      } else {
        ns.add(dress.id);
        showToast('Saved');
      }
      return ns;
    });
  }

  function openProduct() {
    currentProduct.set(dress);
    navigateTo('product');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function openTryon(e) {
    e.stopPropagation();
    tryonOpen.set(true);
  }
</script>

<div class="dress-cell">
  <div class="d-img" on:click={openProduct} role="button" tabindex="0" on:keypress={openProduct}>
    {#if dress.image}
      <img src={dress.image} alt={displayName} class="d-real-img">
    {:else}
      <div class="d-ph {fallbackTone}">
        <div class="d-ph-badge">{placeholderLabel()}</div>
        <div class="d-ph-title">{displayName}</div>
        <div class="d-ph-note">Image coming soon</div>
      </div>
    {/if}
  </div>
  <button class="d-save" class:on={isSaved} on:click={toggleSave} aria-label="Save">
    <svg width="15" height="15" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  </button>
  {#if !isMen}
    <button class="d-tryon" on:click={openTryon}>Try on</button>
  {/if}
  <div class="d-info">
    <span class="d-name" on:click={openProduct} role="button" tabindex="0" on:keypress={openProduct}>{displayName}</span>
    <div class="d-cat">{dress.cat}</div>
    <div class="d-price">from &pound;{dress.price}</div>
    {#if dress.availableFormats?.length}
      <div class="d-match-line">
        <span>Available as:</span>
        <span>Single &bull; Couple &bull; Family &bull; Group</span>
      </div>
    {/if}
    <div class="d-btns">
      <button class="d-btn-p" on:click={openProduct}>Shop</button>
      <button class="d-btn-o" on:click={openTryon}>Try on</button>
    </div>
  </div>
</div>

<style>
  .d-real-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .d-ph{
    position:absolute;
    inset:0;
    padding:16px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:10px;
    text-align:center;
    color:var(--ink);
    background:
      radial-gradient(circle at top,rgba(255,255,255,.65),transparent 42%),
      linear-gradient(165deg,#f6f0e8 0%,#ddd2c5 100%);
  }
  .d-ph.is-bridal{
    background:
      radial-gradient(circle at top,rgba(255,255,255,.72),transparent 42%),
      linear-gradient(165deg,#f8f2ea 0%,#d9c5b3 100%);
  }
  .d-ph.is-modern{
    background:
      radial-gradient(circle at top,rgba(255,255,255,.72),transparent 42%),
      linear-gradient(165deg,#f4f1ec 0%,#d3d8d3 100%);
  }
  .d-ph.is-traditional{
    background:
      radial-gradient(circle at top,rgba(255,255,255,.7),transparent 42%),
      linear-gradient(165deg,#f5eee4 0%,#d6c6b8 100%);
  }
  .d-ph.is-men{
    background:
      radial-gradient(circle at top,rgba(255,255,255,.58),transparent 42%),
      linear-gradient(165deg,#f0efe9 0%,#c7c4bb 100%);
  }
  .d-ph-badge{font-size:8px;letter-spacing:.28em;text-transform:uppercase;opacity:.6;}
  .d-ph-title{font-family:var(--serif);font-size:22px;line-height:1.08;font-weight:300;max-width:10ch;}
  .d-ph-note{font-size:8px;letter-spacing:.16em;text-transform:uppercase;opacity:.55;}
  .d-match-line{display:grid;gap:2px;}
  .d-match-line span:first-child{font-size:8px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);}
  .d-btns{margin-top:8px;}
  .d-btn-p,.d-btn-o{min-height:38px;padding:9px 6px;}
</style>
