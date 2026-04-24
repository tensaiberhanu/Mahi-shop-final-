<script>
  import { cart, cartOpen, navigateTo } from '$lib/store.js';

  $: total = $cart.reduce((s, i) => s + i.price, 0);

  function removeItem(idx) {
    cart.update(c => { c.splice(idx, 1); return [...c]; });
  }

  function close() { cartOpen.set(false); }

  function goCheckout() {
    cartOpen.set(false);
    navigateTo('checkout');
    window.scrollTo({top:0,behavior:'instant'});
  }

  function goShop() {
    cartOpen.set(false);
    navigateTo('women');
    window.scrollTo({top:0,behavior:'instant'});
  }
</script>

<div id="cart-bd" class:open={$cartOpen} on:click={close} role="presentation"></div>
<div id="cart-drawer" class:open={$cartOpen}>
  <div class="cart-hd">
    <div class="cart-title">Your bag</div>
    <button class="cart-close" on:click={close}>✕</button>
  </div>
  <div class="cart-body">
    {#if $cart.length === 0}
      <div class="cart-empty">
        <p>Your bag is empty.</p>
        <button class="btn-o" style="margin-top:1rem;font-size:10px;" on:click={goShop}>Shop now</button>
      </div>
    {:else}
      {#each $cart as item, idx}
        <div class="cart-item">
          <div class="cart-thumb">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8A8070" stroke-width="1"><path d="M9 3L5 7v14h14V7l-4-4"/><path d="M9 3c0 2.2 1.3 4 3 4s3-1.8 3-4"/></svg>
          </div>
          <div style="flex:1;">
            <div style="font-size:13px;font-weight:500;">{item.name}</div>
            <div style="font-size:11px;color:var(--muted);margin-top:.2rem;">{item.details || 'Custom fit'}</div>
            <div style="font-size:13px;margin-top:.375rem;">£{item.price}</div>
            <button class="remove-btn" on:click={()=>removeItem(idx)}>Remove</button>
          </div>
        </div>
      {/each}
    {/if}
  </div>
  {#if $cart.length > 0}
    <div class="cart-foot">
      <div class="cart-total-row"><span>Total</span><strong>£{total}</strong></div>
      <button class="btn-p btn-full btn-lg" on:click={goCheckout}>Checkout</button>
      <button class="btn-o btn-full" style="margin-top:6px;" on:click={close}>Continue shopping</button>
    </div>
  {/if}
</div>

<style>
  #cart-bd{position:fixed;inset:0;z-index:199;background:rgba(0,0,0,0);pointer-events:none;transition:background .3s;}
  #cart-bd.open{background:rgba(0,0,0,.4);pointer-events:all;}
  #cart-drawer{position:fixed;top:0;right:0;bottom:0;z-index:200;width:min(400px,100vw);background:#fff;border-left:1px solid var(--bdr);transform:translateX(100%);transition:transform .32s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;}
  #cart-drawer.open{transform:translateX(0);}
  .cart-hd{display:flex;align-items:center;justify-content:space-between;padding:16px;border-bottom:1px solid var(--bdr);}
  .cart-title{font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:300;}
  .cart-close{width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:20px;color:var(--muted);cursor:pointer;}
  .cart-body{flex:1;overflow-y:auto;padding:16px;}
  .cart-foot{padding:16px;border-top:1px solid var(--bdr);}
  .cart-empty{text-align:center;padding:3rem 1rem;}
  .cart-empty p{font-size:14px;color:var(--muted);}
  .remove-btn{font-size:10px;color:var(--muted);text-decoration:underline;background:none;border:none;cursor:pointer;margin-top:.375rem;}
</style>
