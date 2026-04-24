<script>
  import SupportPageShell from '$lib/components/SupportPageShell.svelte';

  const sections = [
    {
      title: 'What we collect',
      body: 'We collect the details needed to manage made-to-order purchases, such as your name, contact details, address, and measurements.'
    },
    {
      title: 'How we use it',
      body: 'We use this information to process orders, coordinate production, manage delivery, and support customer service.'
    },
    {
      title: 'Group orders',
      body: 'Group order information is used to manage organiser and member flows. Members only see their own part of the order journey.'
    },
    {
      title: 'Third parties',
      body: 'Live payments, email, hosting, and database services may be provided by third-party platforms used by the production site.'
    },
    {
      title: 'Your rights',
      body: 'You can request access, correction, or deletion of your personal data by contacting hello@mahi.com.'
    }
  ];
</script>

<SupportPageShell
  current="privacy"
  eyebrow="Legal"
  title="Privacy"
  intro="We only collect the information needed to make, deliver, and support your order."
  updated="April 2026"
>
  <section class="support-card">
    <div class="card-kicker">Privacy principle</div>
    <h2>Your measurements are collected to make your garment, not for advertising.</h2>
    <p>We do not sell customer data.</p>
  </section>

  {#each sections as section}
    <section class="support-card">
      <div class="card-kicker">{section.title}</div>
      <p>{section.body}</p>
    </section>
  {/each}
</SupportPageShell>

<style>
  .support-card{border:1px solid var(--bdr);background:#fff;padding:16px;}
  .card-kicker{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;}
  h2{font-family:var(--serif);font-size:28px;font-weight:300;line-height:1.04;}
  p{font-size:13px;line-height:1.8;color:var(--body);margin-top:10px;}
</style>
