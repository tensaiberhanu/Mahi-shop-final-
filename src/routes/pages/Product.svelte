<script>
  import {
    currentProduct,
    flowOpen,
    flowType,
    tryonOpen,
    showToast,
    addCartItem,
    currentUser,
    startGroupOrderWithProduct,
    ORDER_MODES
  } from '$lib/store.js';
  import { buildParticipantsFromMeasurements, memberPriceFromType } from '$lib/orderSystem.js';

  const fillerWords = new Set([
    'ethiopian', 'habesha', 'traditional', 'modern', 'cultural', 'embroidered',
    'wedding', 'bridal', 'dress', 'dresses', 'kemis', 'gown', 'wear', 'women',
    'woman', 'ladies', 'style', 'look', 'set', 'outfit'
  ]);

  const coordinatedOptions = [
    { id: ORDER_MODES.COUPLE, label: 'Couple' },
    { id: ORDER_MODES.FAMILY, label: 'Family' },
    { id: ORDER_MODES.GROUP, label: 'Group Order' }
  ];

  let activeFlow = null;
  let singleMeasurements = { bust: '', waist: '', hips: '', height: '' };
  let coupleMeasurements = {
    her: { bust: '', waist: '', hips: '', height: '' },
    him: { chest: '', waist: '', height: '' }
  };
  let familyMembers = [
    { id: 1, name: 'You', memberType: 'adult_woman', bust: '', waist: '', hips: '', height: '' }
  ];
  let nextMemberId = 2;
  let formErrors = {};
  let formMessage = '';
  let formState = 'idle';

  function shortProductName(product) {
    if (!product?.name) return 'Mahi Dress';

    const cleanWords = product.name
      .replace(/[^\w\s-]/g, ' ')
      .split(/\s+/)
      .filter(Boolean);

    const lead = cleanWords
      .filter((word) => !fillerWords.has(word.toLowerCase()))
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    const leadName = lead.length > 0 ? lead.join(' ') : 'Mahi';

    if (product.cat === 'Bridal') return `${leadName} Bridal Kemis`;
    if (product.cat === 'Traditional') return `${leadName} Habesha Dress`;
    if (product.cat === 'Modern') return `${leadName} Modern Dress`;
    return `${leadName} Dress`;
  }

  function openFlow(type) {
    flowType.set(type);
    flowOpen.set(true);
  }

  function openTryon() {
    tryonOpen.set(true);
  }

  function clearFeedback() {
    formErrors = {};
    formMessage = '';
    formState = 'idle';
  }

  function fieldError(key) {
    return formErrors[key];
  }

  function memberPrice(member) {
    if (!$currentProduct) return 0;
    return memberPriceFromType($currentProduct.price, member.memberType);
  }

  function addFamilyMember() {
    familyMembers = [...familyMembers, {
      id: nextMemberId++,
      name: '',
      memberType: 'adult_woman',
      bust: '',
      waist: '',
      hips: '',
      height: ''
    }];
  }

  function removeFamilyMember(id) {
    familyMembers = familyMembers.filter((member) => member.id !== id);
  }

  function openSingleFlow() {
    clearFeedback();
    activeFlow = ORDER_MODES.SINGLE;
  }

  function openCoordinatedFlow(type) {
    clearFeedback();
    if (type === ORDER_MODES.GROUP) {
      if (!$currentProduct) {
        formState = 'error';
        formMessage = 'Select a valid dress to start a group order.';
        return;
      }
      formState = 'saving';
      formMessage = 'Starting group order...';
      startGroupOrderWithProduct($currentProduct);
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    activeFlow = type;
  }

  function closeOverlayFlow() {
    if (activeFlow === ORDER_MODES.COUPLE || activeFlow === ORDER_MODES.FAMILY) {
      activeFlow = null;
      clearFeedback();
    }
  }

  function validateSingle(errors) {
    ['bust', 'waist', 'hips', 'height'].forEach((field) => {
      if (!singleMeasurements[field]) errors[`single.${field}`] = 'Required';
    });
  }

  function validateCouple(errors) {
    ['bust', 'waist', 'hips', 'height'].forEach((field) => {
      if (!coupleMeasurements.her[field]) errors[`couple.her.${field}`] = 'Required';
    });
    ['chest', 'waist', 'height'].forEach((field) => {
      if (!coupleMeasurements.him[field]) errors[`couple.him.${field}`] = 'Required';
    });
  }

  function validateFamily(errors) {
    familyMembers.forEach((member, index) => {
      const baseKey = `family.${member.id}`;
      if (index > 0 && !member.name.trim()) errors[`${baseKey}.name`] = 'Required';

      if (member.memberType === 'adult_man') {
        if (!member.bust) errors[`${baseKey}.bust`] = 'Required';
        if (!member.waist) errors[`${baseKey}.waist`] = 'Required';
        if (!member.height) errors[`${baseKey}.height`] = 'Required';
        return;
      }

      if (member.memberType === 'child' || member.memberType === 'child_boy' || member.memberType === 'child_girl') {
        if (!member.bust) errors[`${baseKey}.bust`] = 'Required';
        if (!member.waist) errors[`${baseKey}.waist`] = 'Required';
        if (!member.height) errors[`${baseKey}.height`] = 'Required';
        if (!member.hips) errors[`${baseKey}.hips`] = 'Required';
        return;
      }

      if (!member.bust) errors[`${baseKey}.bust`] = 'Required';
      if (!member.waist) errors[`${baseKey}.waist`] = 'Required';
      if (!member.hips) errors[`${baseKey}.hips`] = 'Required';
      if (!member.height) errors[`${baseKey}.height`] = 'Required';
    });
  }

  function validateFlow(type) {
    const errors = {};
    clearFeedback();

    if (!$currentProduct) {
      formState = 'error';
      formMessage = 'This design is no longer available.';
      return false;
    }

    if (type === ORDER_MODES.SINGLE) validateSingle(errors);
    if (type === ORDER_MODES.COUPLE) validateCouple(errors);
    if (type === ORDER_MODES.FAMILY) validateFamily(errors);

    if (Object.keys(errors).length > 0) {
      formErrors = errors;
      formState = 'error';
      formMessage = 'Please complete the highlighted fields before continuing.';
      return false;
    }

    return true;
  }

  function buildPayload(type) {
    let price = $currentProduct.price;
    let details = 'Single';
    let participants = buildParticipantsFromMeasurements(ORDER_MODES.SINGLE, $currentProduct, singleMeasurements);

    if (type === ORDER_MODES.COUPLE) {
      price = $currentProduct.price + memberPriceFromType($currentProduct.price, 'adult_man');
      details = 'Couple';
      participants = buildParticipantsFromMeasurements(ORDER_MODES.COUPLE, $currentProduct, coupleMeasurements);
    }

    if (type === ORDER_MODES.FAMILY) {
      price = familyMembers.reduce((sum, member) => sum + memberPrice(member), 0);
      details = `Family (${familyMembers.length})`;
      participants = buildParticipantsFromMeasurements(ORDER_MODES.FAMILY, $currentProduct, familyMembers);
    }

    return {
      mode: type,
      productId: $currentProduct.id,
      productName: displayName,
      price,
      details,
      buyerId: $currentUser.id,
      participants,
      metadata: {}
    };
  }

  function formatPrice(amount) {
    return `£${Number(amount || 0).toFixed(0)}`;
  }

  function familyMemberLabel(member, index) {
    if (index === 0) return 'For you';
    if (member.memberType === 'adult_man') return `For ${member.name || `Adult ${index + 1}`}`;
    if (member.memberType === 'adult_woman') return `For ${member.name || `Adult ${index + 1}`}`;
    if (member.memberType === 'child_boy' || member.memberType === 'child_girl' || member.memberType === 'child') {
      const childNumber = familyMembers
        .slice(0, index + 1)
        .filter((entry) => entry.memberType === 'child' || entry.memberType === 'child_boy' || entry.memberType === 'child_girl')
        .length;
      return `Child ${childNumber}`;
    }
    return member.name || `Person ${index + 1}`;
  }

  $: coupleSummary = [
    { label: 'For her', amount: $currentProduct ? $currentProduct.price : 0 },
    { label: 'For him', amount: $currentProduct ? memberPriceFromType($currentProduct.price, 'adult_man') : 0 }
  ];
  $: coupleTotal = coupleSummary.reduce((sum, item) => sum + item.amount, 0);
  $: familySummary = familyMembers.map((member, index) => ({
    label: familyMemberLabel(member, index),
    amount: memberPrice(member)
  }));
  $: familyTotal = familySummary.reduce((sum, item) => sum + item.amount, 0);

  function confirmFlow(type) {
    if (!validateFlow(type)) return;

    formState = 'saving';
    formMessage = 'Saving order...';
    addCartItem(buildPayload(type));
    formState = 'success';

    if (type === ORDER_MODES.FAMILY) {
      formMessage = 'Family order added to bag.';
      showToast('Family order added to bag');
    } else if (type === ORDER_MODES.COUPLE) {
      formMessage = 'Couple order added to bag.';
      showToast('Couple order added to bag');
    } else {
      formMessage = 'Added to bag.';
      showToast('Added to bag');
    }
  }

  $: dress = $currentProduct;
  $: displayName = shortProductName(dress);
  $: singlePrice = $currentProduct?.price || 0;
  $: if ($flowOpen && dress && ($flowType === ORDER_MODES.COUPLE || $flowType === ORDER_MODES.FAMILY)) {
    activeFlow = $flowType;
    flowOpen.set(false);
  }
</script>

{#if dress}
  <div class="prod-img">
    {#if dress.image}
      <img src={dress.image} alt={displayName} class="prod-real-img">
    {:else}
      <div class="prod-img-inner">
        <div class="prod-fallback">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=".6">
            <path d="M9 3L5 7v14h14V7l-4-4"/>
            <path d="M9 3c0 2.2 1.3 4 3 4s3-1.8 3-4"/>
          </svg>
          <span>{displayName}</span>
        </div>
      </div>
      <div class="image-note">Image coming soon</div>
    {/if}
  </div>

  <div class="prod-info">
    <div class="prod-cat">{dress.cat}</div>
    <h1 class="prod-name">{displayName}</h1>
    <div class="prod-price">£{singlePrice}</div>
    <p class="prod-desc">Handcrafted in Ethiopia. Made to your measurements.</p>

    <button class="prod-btn-p prod-btn-main" on:click={openSingleFlow}>Add to Bag</button>

    {#if activeFlow === ORDER_MODES.SINGLE}
      <div class="purchase-panel">
        <div class="panel-title">Enter your measurements</div>
        <div class="meas-grid">
          <div><input class="inp" type="number" bind:value={singleMeasurements.bust} placeholder="Bust (cm)">{#if fieldError('single.bust')}<div class="field-error">{fieldError('single.bust')}</div>{/if}</div>
          <div><input class="inp" type="number" bind:value={singleMeasurements.waist} placeholder="Waist (cm)">{#if fieldError('single.waist')}<div class="field-error">{fieldError('single.waist')}</div>{/if}</div>
          <div><input class="inp" type="number" bind:value={singleMeasurements.hips} placeholder="Hips (cm)">{#if fieldError('single.hips')}<div class="field-error">{fieldError('single.hips')}</div>{/if}</div>
          <div><input class="inp" type="number" bind:value={singleMeasurements.height} placeholder="Height (cm)">{#if fieldError('single.height')}<div class="field-error">{fieldError('single.height')}</div>{/if}</div>
        </div>
        <button class="btn-p btn-full btn-lg panel-confirm" on:click={() => confirmFlow(ORDER_MODES.SINGLE)} disabled={formState === 'saving'}>
          {formState === 'saving' && activeFlow === ORDER_MODES.SINGLE ? 'Please wait...' : 'Confirm'}
        </button>
      </div>
    {/if}

    <div class="coordinated-box">
      <div class="section-label">Get this design for</div>
      <div class="coordinated-grid">
        {#each coordinatedOptions as option}
          <button class="coordinated-option" class:on={activeFlow === option.id} on:click={() => openCoordinatedFlow(option.id)}>
            {option.label}
          </button>
        {/each}
      </div>
    </div>

    {#if formMessage}
      <div class="form-feedback" class:is-error={formState === 'error'} class:is-success={formState === 'success'} class:is-saving={formState === 'saving'}>
        {formMessage}
      </div>
    {/if}

    <div class="secondary-stack">
      <button class="light-action" on:click={openTryon}>Try on</button>
      <button class="light-action" on:click={() => openFlow('custom')}>Customise this design</button>
    </div>
  </div>

  <div class="trust-row">
    <div class="trust-cell"><div class="trust-ico">✂</div><div><div class="trust-title">Made to measure</div><div class="trust-sub">Your exact measurements. No sizing.</div></div></div>
    <div class="trust-cell"><div class="trust-ico">ET</div><div><div class="trust-title">Made in Ethiopia</div><div class="trust-sub">Handcrafted by skilled artisans.</div></div></div>
    <div class="trust-cell"><div class="trust-ico">✈</div><div><div class="trust-title">Worldwide delivery</div><div class="trust-sub">Tracked shipping from Ethiopia.</div></div></div>
    <div class="trust-cell"><div class="trust-ico">QC</div><div><div class="trust-title">Quality checked</div><div class="trust-sub">Photographed before dispatch.</div></div></div>
  </div>

  {#if activeFlow === ORDER_MODES.COUPLE || activeFlow === ORDER_MODES.FAMILY}
    <div class="sheet-backdrop" on:click={closeOverlayFlow} role="presentation"></div>
    <div class="measure-sheet" role="dialog" aria-modal="true" aria-label="Enter your measurements">
      <div class="sheet-handle"></div>
      <div class="sheet-head">
        <div class="panel-title">Enter your measurements</div>
        <button class="sheet-close" on:click={closeOverlayFlow}>Close</button>
      </div>

      {#if activeFlow === ORDER_MODES.COUPLE}
        <div class="format-person-grid">
          <div class="format-person-card">
            <div class="fit-subhead">Her</div>
            <div class="meas-grid">
              <div><input class="inp" type="number" bind:value={coupleMeasurements.her.bust} placeholder="Bust (cm)">{#if fieldError('couple.her.bust')}<div class="field-error">{fieldError('couple.her.bust')}</div>{/if}</div>
              <div><input class="inp" type="number" bind:value={coupleMeasurements.her.waist} placeholder="Waist (cm)">{#if fieldError('couple.her.waist')}<div class="field-error">{fieldError('couple.her.waist')}</div>{/if}</div>
              <div><input class="inp" type="number" bind:value={coupleMeasurements.her.hips} placeholder="Hips (cm)">{#if fieldError('couple.her.hips')}<div class="field-error">{fieldError('couple.her.hips')}</div>{/if}</div>
              <div><input class="inp" type="number" bind:value={coupleMeasurements.her.height} placeholder="Height (cm)">{#if fieldError('couple.her.height')}<div class="field-error">{fieldError('couple.her.height')}</div>{/if}</div>
            </div>
          </div>
          <div class="format-person-card">
            <div class="fit-subhead">Him</div>
            <div class="meas-grid">
              <div><input class="inp" type="number" bind:value={coupleMeasurements.him.chest} placeholder="Chest (cm)">{#if fieldError('couple.him.chest')}<div class="field-error">{fieldError('couple.him.chest')}</div>{/if}</div>
              <div><input class="inp" type="number" bind:value={coupleMeasurements.him.waist} placeholder="Waist (cm)">{#if fieldError('couple.him.waist')}<div class="field-error">{fieldError('couple.him.waist')}</div>{/if}</div>
              <div><input class="inp" type="number" bind:value={coupleMeasurements.him.height} placeholder="Height (cm)">{#if fieldError('couple.him.height')}<div class="field-error">{fieldError('couple.him.height')}</div>{/if}</div>
            </div>
          </div>
        </div>
        <div class="price-summary">
          <div class="price-summary-label">Estimated price</div>
          {#each coupleSummary as item}
            <div class="price-row">
              <span>{item.label}</span>
              <span>Estimated {formatPrice(item.amount)}</span>
            </div>
          {/each}
          <div class="price-row is-total">
            <span>Total</span>
            <span>Estimated {formatPrice(coupleTotal)}</span>
          </div>
        </div>
        <div class="sheet-actions">
          <button class="btn-p btn-full btn-lg panel-confirm" on:click={() => confirmFlow(ORDER_MODES.COUPLE)} disabled={formState === 'saving'}>
            {formState === 'saving' && activeFlow === ORDER_MODES.COUPLE ? 'Please wait...' : 'Confirm'}
          </button>
        </div>
      {:else if activeFlow === ORDER_MODES.FAMILY}
        <div class="panel-head">
          <button class="btn-o panel-add" on:click={addFamilyMember}>Add person</button>
        </div>
        <div class="family-inline-list">
          {#each familyMembers as member, index}
            <div class="family-inline-card">
              <div class="family-inline-head">
                <div class="fit-subhead">{index === 0 ? 'You' : member.name || `Person ${index + 1}`}</div>
                {#if index > 0}
                  <button class="family-remove" on:click={() => removeFamilyMember(member.id)}>Remove</button>
                {/if}
              </div>
              {#if index > 0}
                <div class="family-inline-controls">
                  <input class="inp" bind:value={member.name} placeholder="Name">
                  <select class="inp" bind:value={member.memberType}>
                    <option value="adult_woman">Adult woman</option>
                    <option value="adult_man">Adult man</option>
                    <option value="child_boy">Child boy</option>
                    <option value="child_girl">Child girl</option>
                  </select>
                </div>
                {#if fieldError(`family.${member.id}.name`)}
                  <div class="field-error field-error-inline">{fieldError(`family.${member.id}.name`)}</div>
                {/if}
              {/if}
              <div class="meas-grid">
                {#if member.memberType === 'adult_man'}
                  <div><input class="inp" type="number" bind:value={member.bust} placeholder="Chest (cm)">{#if fieldError(`family.${member.id}.bust`)}<div class="field-error">{fieldError(`family.${member.id}.bust`)}</div>{/if}</div>
                  <div><input class="inp" type="number" bind:value={member.waist} placeholder="Waist (cm)">{#if fieldError(`family.${member.id}.waist`)}<div class="field-error">{fieldError(`family.${member.id}.waist`)}</div>{/if}</div>
                  <div><input class="inp" type="number" bind:value={member.height} placeholder="Height (cm)">{#if fieldError(`family.${member.id}.height`)}<div class="field-error">{fieldError(`family.${member.id}.height`)}</div>{/if}</div>
                {:else if member.memberType === 'child' || member.memberType === 'child_boy' || member.memberType === 'child_girl'}
                  <div><input class="inp" type="number" bind:value={member.bust} placeholder="Chest (cm)">{#if fieldError(`family.${member.id}.bust`)}<div class="field-error">{fieldError(`family.${member.id}.bust`)}</div>{/if}</div>
                  <div><input class="inp" type="number" bind:value={member.waist} placeholder="Waist (cm)">{#if fieldError(`family.${member.id}.waist`)}<div class="field-error">{fieldError(`family.${member.id}.waist`)}</div>{/if}</div>
                  <div><input class="inp" type="number" bind:value={member.height} placeholder="Height (cm)">{#if fieldError(`family.${member.id}.height`)}<div class="field-error">{fieldError(`family.${member.id}.height`)}</div>{/if}</div>
                  <div><input class="inp" type="number" bind:value={member.hips} placeholder="Age">{#if fieldError(`family.${member.id}.hips`)}<div class="field-error">{fieldError(`family.${member.id}.hips`)}</div>{/if}</div>
                {:else}
                  <div><input class="inp" type="number" bind:value={member.bust} placeholder="Bust (cm)">{#if fieldError(`family.${member.id}.bust`)}<div class="field-error">{fieldError(`family.${member.id}.bust`)}</div>{/if}</div>
                  <div><input class="inp" type="number" bind:value={member.waist} placeholder="Waist (cm)">{#if fieldError(`family.${member.id}.waist`)}<div class="field-error">{fieldError(`family.${member.id}.waist`)}</div>{/if}</div>
                  <div><input class="inp" type="number" bind:value={member.hips} placeholder="Hips (cm)">{#if fieldError(`family.${member.id}.hips`)}<div class="field-error">{fieldError(`family.${member.id}.hips`)}</div>{/if}</div>
                  <div><input class="inp" type="number" bind:value={member.height} placeholder="Height (cm)">{#if fieldError(`family.${member.id}.height`)}<div class="field-error">{fieldError(`family.${member.id}.height`)}</div>{/if}</div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
        <div class="price-summary">
          <div class="price-summary-label">Estimated price</div>
          {#each familySummary as item}
            <div class="price-row">
              <span>{item.label}</span>
              <span>Estimated {formatPrice(item.amount)}</span>
            </div>
          {/each}
          <div class="price-row is-total">
            <span>Total</span>
            <span>Estimated {formatPrice(familyTotal)}</span>
          </div>
        </div>
        <div class="sheet-actions">
          <button class="btn-p btn-full btn-lg panel-confirm" on:click={() => confirmFlow(ORDER_MODES.FAMILY)} disabled={formState === 'saving'}>
            {formState === 'saving' && activeFlow === ORDER_MODES.FAMILY ? 'Please wait...' : 'Confirm'}
          </button>
        </div>
      {/if}
    </div>
  {/if}
{:else}
  <section class="state-card">
    <div class="state-kicker">Product</div>
    <h1 class="state-title">This design is unavailable.</h1>
    <p class="state-copy">Choose another product to continue shopping.</p>
    <button class="btn-p" on:click={() => window.history.back()}>Go back</button>
  </section>
{/if}

<style>
  .prod-real-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .prod-fallback{display:flex;flex-direction:column;align-items:center;gap:.75rem;color:var(--muted);}
  .prod-fallback svg{opacity:.15;}
  .prod-fallback span{font-size:9px;letter-spacing:.2em;text-transform:uppercase;opacity:.4;}
  .image-note{padding:10px 14px;border-top:1px solid var(--bdr);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);background:#fff;}
  .prod-btn-main{width:100%;margin-top:18px;padding:18px;}
  .purchase-panel,.coordinated-box{margin-top:18px;padding:18px;border:1px solid var(--bdr);background:#fff;}
  .panel-title,.section-label{font-size:9px;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:12px;}
  .coordinated-grid,.format-person-grid{display:grid;gap:8px;}
  .coordinated-option{padding:14px 16px;border:1px solid var(--bdr);background:#fff;font-size:12px;color:var(--ink);text-align:left;min-height:46px;}
  .coordinated-option.on{background:var(--burg);border-color:var(--ink);color:#fff;}
  .panel-confirm{margin-top:18px;}
  .panel-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:14px;}
  .panel-add{padding:.75rem 1rem;font-size:9px;letter-spacing:.18em;text-transform:uppercase;}
  .format-person-card,.family-inline-card{border:1px solid var(--bdr);padding:16px;background:var(--soft);}
  .fit-subhead{font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:12px;}
  .family-inline-list{display:flex;flex-direction:column;gap:12px;}
  .family-inline-head{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:12px;}
  .family-inline-controls{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:4px;}
  .family-remove{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);}
  .field-error{font-size:10px;color:#8a3d33;margin-top:6px;}
  .field-error-inline{margin-bottom:12px;}
  .price-summary{margin-top:14px;padding:14px 16px;border:1px solid var(--bdr);background:#fbfaf7;}
  .price-summary-label{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-bottom:10px;}
  .price-row{display:flex;justify-content:space-between;gap:12px;font-size:11px;color:var(--body);padding:6px 0;}
  .price-row.is-total{margin-top:4px;padding-top:10px;border-top:1px solid var(--bdr);font-size:12px;color:var(--ink);font-weight:500;}
  .form-feedback{margin-top:14px;padding:12px 14px;border:1px solid var(--bdr);background:var(--soft);font-size:11px;line-height:1.6;}
  .form-feedback.is-error{border-color:#c9a7a2;background:#faf2f1;color:#6f2b22;}
  .form-feedback.is-success{border-color:#d6c9a4;background:#faf6ea;color:#5f4b19;}
  .form-feedback.is-saving{border-color:var(--gold);background:var(--gold-l);color:var(--body);}
  .secondary-stack{display:grid;gap:10px;margin-top:22px;padding-top:18px;border-top:1px solid var(--bdr);}
  .light-action{display:flex;justify-content:flex-start;padding:4px 0;font-size:12px;color:var(--muted);text-decoration:underline;text-underline-offset:3px;min-height:34px;align-items:center;}
  .sheet-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:119;}
  .measure-sheet{position:fixed;left:0;right:0;bottom:calc(var(--bot) + 10px + env(safe-area-inset-bottom,0px));z-index:120;background:#fff;border-top-left-radius:20px;border-top-right-radius:20px;padding:10px 16px calc(var(--bot) + 28px + env(safe-area-inset-bottom,0px));max-height:68svh;overflow:auto;box-shadow:0 -16px 40px rgba(0,0,0,.16);}
  .sheet-handle{width:42px;height:4px;border-radius:999px;background:var(--bdr);margin:0 auto 14px;}
  .sheet-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px;}
  .sheet-close{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);min-height:36px;}
  .sheet-actions{position:sticky;bottom:calc(-1 * (var(--bot) + env(safe-area-inset-bottom,0px)));background:linear-gradient(to top,#fff 72%,rgba(255,255,255,.92) 100%);padding-top:16px;margin-top:16px;}
  .state-card{padding:48px 20px;display:grid;gap:10px;max-width:420px;}
  .state-kicker{font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:var(--muted);}
  .state-title{font-family:var(--serif);font-size:38px;font-weight:300;line-height:.96;}
  .state-copy{font-size:13px;color:var(--muted);line-height:1.8;}

  @media(min-width:900px){
    .coordinated-grid{grid-template-columns:repeat(3,1fr);}
    .format-person-grid{grid-template-columns:1fr 1fr;}
    .measure-sheet{left:50%;right:auto;bottom:0;transform:translateX(-50%);width:min(720px,100%);border-top-left-radius:24px;border-top-right-radius:24px;padding:10px 16px 24px;max-height:78svh;}
    .sheet-actions{bottom:0;}
  }

  @media(max-width:640px){
    .prod-btn-main{margin-top:20px;}
    .purchase-panel,.coordinated-box{padding:16px;}
    .section-label,.panel-title{margin-bottom:14px;}
    .family-inline-controls{grid-template-columns:1fr;}
    .state-card{padding:40px 16px;}
  }
</style>
