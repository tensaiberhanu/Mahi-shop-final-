<script>
  import '../app.css';
  import TopNav from '$lib/components/TopNav.svelte';
  import BottomNav from '$lib/components/BottomNav.svelte';
  import SlideMenu from '$lib/components/SlideMenu.svelte';
  import CartDrawer from '$lib/components/CartDrawer.svelte';
  import TryOnSheet from '$lib/components/TryOnSheet.svelte';
  import Toast from '$lib/components/Toast.svelte';
</script>

<TopNav />
<SlideMenu />
<CartDrawer />
<TryOnSheet />
<Toast />

<main class="page-wrap">
  <slot />
</main>

<BottomNav />
