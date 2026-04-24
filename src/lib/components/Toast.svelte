<script>
  import { toastMessage, toastVisible } from '$lib/store.js';
</script>

{#if $toastVisible}
<div class="toast">{$toastMessage}</div>
{/if}

<style>
  .toast{
    position:fixed;
    bottom:calc(var(--bot) + 12px);
    left:50%;
    transform:translateX(-50%);
    background:var(--ink);
    color:#fff;
    font-size:11px;
    letter-spacing:.16em;
    text-transform:uppercase;
    padding:10px 20px;
    z-index:500;
    pointer-events:none;
    white-space:nowrap;
    animation:toastIn .2s ease;
  }
  @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(6px);}to{opacity:1;transform:translateX(-50%) translateY(0);}}
</style>
