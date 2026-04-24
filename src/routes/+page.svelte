<script>
  import { currentPage } from '$lib/store.js';
  import HomePage from './pages/Home.svelte';
  import WomenPage from './pages/Women.svelte';
  import MenPage from './pages/Men.svelte';
  import ProductPage from './pages/Product.svelte';
  import MatchingPage from './pages/Matching.svelte';
  import CoupleSetsPage from './pages/CoupleSets.svelte';
  import FamilySetsPage from './pages/FamilySets.svelte';
  import WeddingsPage from './pages/Weddings.svelte';
  import CustomPage from './pages/Custom.svelte';
  import FitPage from './pages/Fit.svelte';
  import AccountPage from './pages/Account.svelte';
  import SavedPage from './pages/Saved.svelte';
  import TrackPage from './pages/Track.svelte';
  import CheckoutPage from './pages/Checkout.svelte';
  import SuccessPage from './pages/Success.svelte';
  import AboutPage from './pages/About.svelte';
  import TermsPage from './pages/Terms.svelte';
  import PrivacyPage from './pages/Privacy.svelte';
  import DeliveryPage from './pages/Delivery.svelte';
  import ReturnsPage from './pages/Returns.svelte';
  import SizeGuidePage from './pages/SizeGuide.svelte';
  import ContactPage from './pages/Contact.svelte';
</script>

<div class="page-enter">
  {#if $currentPage === 'home'}<HomePage />
  {:else if $currentPage === 'women'}<WomenPage />
  {:else if $currentPage === 'men'}<MenPage />
  {:else if $currentPage === 'product'}<ProductPage />
  {:else if $currentPage === 'matching'}<MatchingPage />
  {:else if $currentPage === 'couple-sets'}<CoupleSetsPage />
  {:else if $currentPage === 'family-sets'}<FamilySetsPage />
  {:else if $currentPage === 'weddings'}<WeddingsPage />
  {:else if $currentPage === 'custom'}<CustomPage />
  {:else if $currentPage === 'fit'}<FitPage />
  {:else if $currentPage === 'account'}<AccountPage />
  {:else if $currentPage === 'saved'}<SavedPage />
  {:else if $currentPage === 'track'}<TrackPage />
  {:else if $currentPage === 'checkout'}<CheckoutPage />
  {:else if $currentPage === 'success'}<SuccessPage />
  {:else if $currentPage === 'about'}<AboutPage />
  {:else if $currentPage === 'terms'}<TermsPage />
  {:else if $currentPage === 'privacy'}<PrivacyPage />
  {:else if $currentPage === 'delivery'}<DeliveryPage />
  {:else if $currentPage === 'returns'}<ReturnsPage />
  {:else if $currentPage === 'size-guide'}<SizeGuidePage />
  {:else if $currentPage === 'contact'}<ContactPage />
  {:else}<HomePage />
  {/if}
</div>
