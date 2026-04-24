<script>
  import {
    WOMEN,
    showToast,
    currentPage,
    navigateTo,
    groupView,
    groupSelectedMemberId,
    groupDraft,
    groups,
    groupMembers,
    currentUser,
    addCartItem,
    addGroupMember,
    buildInviteLink,
    createOrUpdateGroup,
    joinGroupFromInvite,
    setGroupProduct,
    updateGroupMember,
    resolveGroupInvite,
    ORDER_MODES,
    GROUP_MEMBER_STATUSES,
    GROUP_PAID_BY
  } from '$lib/store.js';

  const pickerDresses = WOMEN.slice(0, 8);

  let draftName = '';
  let draftDate = '';
  let newMember = '';
  let memberMeasurements = { bust: '', waist: '', hips: '', height: '' };
  let memberCheckoutStarted = false;
  let groupErrors = {};
  let groupFeedback = { state: 'idle', message: '' };
  let memberErrors = {};
  let memberFeedback = { state: 'idle', message: '' };
  let inviteFeedback = { state: 'idle', message: '' };

  $: draft = $groupDraft;
  $: activeGroup = draft.groupId ? $groups.find((group) => group.id === draft.groupId) || null : null;
  $: members = activeGroup ? $groupMembers.filter((member) => member.group_id === activeGroup.id) : [];
  $: selectedMember = $groupSelectedMemberId ? $groupMembers.find((member) => member.id === $groupSelectedMemberId) || null : null;
  $: organiser = $currentUser;
  $: shareLink = buildInviteLink(draft);
  $: activeMember = selectedMember || members.find((member) => member.user_id === organiser.id) || null;
  $: statusOptions = [
    GROUP_MEMBER_STATUSES.INVITED,
    GROUP_MEMBER_STATUSES.JOINED,
    GROUP_MEMBER_STATUSES.ORDERED_SELF,
    GROUP_MEMBER_STATUSES.ORDERED_ORGANISER
  ];
  $: inviteRecord = draft.shareToken ? resolveGroupInvite(draft.shareToken) : null;
  $: inviteIsValid = draft.shareToken ? !!inviteRecord : true;

  function resetGroupFeedback() {
    groupErrors = {};
    groupFeedback = { state: 'idle', message: '' };
  }

  function resetMemberFeedback() {
    memberErrors = {};
    memberFeedback = { state: 'idle', message: '' };
  }

  function resetInviteFeedback() {
    inviteFeedback = { state: 'idle', message: '' };
  }

  function goHomeSection(page) {
    navigateTo(page, page === 'matching' ? { navSection: 'matching' } : page === 'weddings' ? { navSection: 'weddings' } : {});
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function selectDress(dress) {
    setGroupProduct(dress);
    resetGroupFeedback();
    showToast(`${dress.name} selected`);
  }

  function changeDress() {
    setGroupProduct(null);
    resetGroupFeedback();
  }

  function createGroupSpace() {
    const errors = {};
    resetGroupFeedback();

    if (!draft.product) errors.product = 'Select a dress first.';
    if (!draftName.trim()) errors.groupName = 'Group name is required.';
    if (!draftDate) errors.eventDate = 'Event date is required.';

    if (Object.keys(errors).length > 0) {
      groupErrors = errors;
      groupFeedback = { state: 'error', message: 'Please complete the group setup before continuing.' };
      return;
    }

    groupFeedback = { state: 'saving', message: draft.created ? 'Updating group order...' : 'Creating group order...' };
    createOrUpdateGroup({ groupName: draftName.trim(), eventDate: draftDate });
    groupFeedback = { state: 'success', message: draft.created ? 'Group order updated.' : 'Group order created.' };
    showToast(activeGroup ? 'Group order updated' : 'Group order created');
  }

  function addMemberToGroup() {
    resetInviteFeedback();
    if (!activeGroup) {
      inviteFeedback = { state: 'error', message: 'Create the group before adding members.' };
      return;
    }
    if (!newMember.trim()) {
      inviteFeedback = { state: 'error', message: 'Add a member name first.' };
      return;
    }
    inviteFeedback = { state: 'saving', message: 'Adding member...' };
    addGroupMember({ name: newMember.trim() });
    newMember = '';
    inviteFeedback = { state: 'success', message: 'Member added.' };
    showToast('Member added');
  }

  function sendLink(member) {
    if (!inviteIsValid) {
      inviteFeedback = { state: 'error', message: 'This invite link is no longer available.' };
      return;
    }
    updateGroupMember(member.id, { status: GROUP_MEMBER_STATUSES.INVITED });
    inviteFeedback = { state: 'success', message: `Invite ready for ${member.name}.` };
    showToast(`Invite ready for ${member.name}`);
  }

  function copyLink() {
    if (!activeGroup || !inviteIsValid) {
      inviteFeedback = { state: 'error', message: 'Create a valid group before sharing the link.' };
      return;
    }
    inviteFeedback = { state: 'saving', message: 'Copying link...' };
    navigator.clipboard.writeText(shareLink).then(() => {
      inviteFeedback = { state: 'success', message: 'Link copied.' };
      showToast('Link copied');
    }).catch(() => {
      inviteFeedback = { state: 'error', message: 'Copy failed. Try again.' };
    });
  }

  function shareWhatsApp() {
    if (!activeGroup || !inviteIsValid) {
      inviteFeedback = { state: 'error', message: 'Create a valid group before sharing.' };
      return;
    }
    const shareText = `Join my Mahi group order: ${shareLink}`;
    inviteFeedback = { state: 'success', message: 'Opening WhatsApp share...' };
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  }

  function orderMyLook() {
    resetInviteFeedback();
    if (!draft.product || !activeGroup) {
      inviteFeedback = { state: 'error', message: 'Choose a dress and create the group first.' };
      return;
    }
    const organiserMember = members.find((member) => member.user_id === organiser.id);
    if (!organiserMember) {
      inviteFeedback = { state: 'error', message: 'The organiser entry is missing.' };
      return;
    }

    inviteFeedback = { state: 'saving', message: 'Adding your order...' };
    addCartItem({
      mode: ORDER_MODES.GROUP,
      productId: draft.product.id,
      productName: draft.product.name,
      price: draft.product.price,
      details: 'Group order · organiser self-paid',
      buyerId: organiser.id,
      groupId: activeGroup.id,
      groupMemberId: organiserMember.id,
      paidBy: GROUP_PAID_BY.SELF,
      participants: [{
        person_name: organiser.name,
        person_role: 'organiser',
        bust: '',
        waist: '',
        hips: '',
        height: ''
      }]
    });
    updateGroupMember(organiserMember.id, { status: GROUP_MEMBER_STATUSES.ORDERED_SELF });
    inviteFeedback = { state: 'success', message: 'Your look was added to bag.' };
    showToast('Your look added to bag');
  }

  function orderForMember(member) {
    resetInviteFeedback();
    if (!draft.product || !activeGroup) {
      inviteFeedback = { state: 'error', message: 'Choose a dress and create the group first.' };
      return;
    }
    inviteFeedback = { state: 'saving', message: `Ordering for ${member.name}...` };
    addCartItem({
      mode: ORDER_MODES.GROUP,
      productId: draft.product.id,
      productName: `${draft.product.name} for ${member.name}`,
      price: draft.product.price,
      details: 'Group order · organiser-paid',
      buyerId: organiser.id,
      groupId: activeGroup.id,
      groupMemberId: member.id,
      paidBy: GROUP_PAID_BY.ORGANISER,
      participants: [{
        person_name: member.name,
        person_role: 'member',
        bust: '',
        waist: '',
        hips: '',
        height: ''
      }]
    });
    updateGroupMember(member.id, { status: GROUP_MEMBER_STATUSES.ORDERED_ORGANISER });
    inviteFeedback = { state: 'success', message: `Ordered for ${member.name}.` };
    showToast(`Ordered for ${member.name}`);
  }

  function openMemberView(member) {
    resetMemberFeedback();
    const joined = joinGroupFromInvite(member.id, { name: member.name });
    if (!joined) {
      memberFeedback = { state: 'error', message: 'This invite link is invalid or expired.' };
      return;
    }
    groupSelectedMemberId.set(member.id);
    groupView.set('member');
    memberCheckoutStarted = false;
    memberMeasurements = { bust: '', waist: '', hips: '', height: '' };
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function backToOrganiser() {
    groupView.set('organiser');
    groupSelectedMemberId.set(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function memberCheckout() {
    const errors = {};
    resetMemberFeedback();

    if (!draft.product) errors.product = 'The selected design is unavailable.';
    if (!activeMember || !activeGroup) errors.member = 'This invite link is invalid or expired.';
    ['bust', 'waist', 'hips', 'height'].forEach((field) => {
      if (!memberMeasurements[field]) errors[field] = 'Required';
    });

    if (Object.keys(errors).length > 0) {
      memberErrors = errors;
      memberFeedback = { state: 'error', message: errors.member || errors.product || 'Please complete your measurements before checkout.' };
      return;
    }

    memberFeedback = { state: 'saving', message: 'Saving your order...' };
    addCartItem({
      mode: ORDER_MODES.GROUP,
      productId: draft.product.id,
      productName: draft.product.name,
      price: draft.product.price,
      details: `Group order · ${activeMember.name} self-paid`,
      buyerId: activeMember.user_id || organiser.id,
      groupId: activeGroup.id,
      groupMemberId: activeMember.id,
      paidBy: GROUP_PAID_BY.SELF,
      participants: [{
        person_name: activeMember.name,
        person_role: 'member',
        ...memberMeasurements
      }]
    });

    updateGroupMember(activeMember.id, { status: GROUP_MEMBER_STATUSES.ORDERED_SELF });
    memberCheckoutStarted = true;
    memberFeedback = { state: 'success', message: 'Your group order was added to bag.' };
    showToast('Your group order was added to bag');
  }

  function statusLabel(status) {
    if (status === GROUP_MEMBER_STATUSES.ORDERED_SELF) return 'Ordered (self)';
    if (status === GROUP_MEMBER_STATUSES.ORDERED_ORGANISER) return 'Ordered (organiser)';
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  function stateClass(state) {
    if (state === 'error') return 'is-error';
    if (state === 'success') return 'is-success';
    if (state === 'saving') return 'is-saving';
    return '';
  }

  $: if (draft.groupName && !draftName) draftName = draft.groupName;
  $: if (draft.eventDate && !draftDate) draftDate = draft.eventDate;
</script>

{#if $groupView === 'member'}
  <section class="group-hero">
    <div class="group-kicker">Group Order</div>
    <h1 class="group-title">One look. Every fit her own.</h1>
    <p class="group-sub">Everyone orders and pays individually.</p>
  </section>

  <section class="group-page">
    <div class="member-banner">
      <button class="s-link" on:click={backToOrganiser}>Back to organiser</button>
      <p>This view is private to the invited member.</p>
    </div>

    {#if !activeMember || !activeGroup}
      <div class="state-card">
        <div class="group-kicker muted-kicker">Invite</div>
        <h3>This invite link is invalid or expired.</h3>
        <p>Ask the organiser to send a fresh link.</p>
      </div>
    {:else}
      {#if draft.product}
        <div class="group-product-card">
          <div class="group-product-media">
            {#if draft.product.image}
              <img src={draft.product.image} alt={draft.product.name} class="group-product-image">
            {:else}
              <div class="group-product-fallback">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=".8"><path d="M9 3L5 7v14h14V7l-4-4"/><path d="M9 3c0 2.2 1.3 4 3 4s3-1.8 3-4"/></svg>
                <span>Image coming soon</span>
              </div>
            {/if}
          </div>
          <div class="group-product-body">
            <div class="group-kicker muted-kicker">Shared design</div>
            <h2>{draft.product.name}</h2>
            <div class="group-price">£{draft.product.price}</div>
            <div class="group-id">Product ID: {draft.product.id}</div>
          </div>
        </div>
      {:else}
        <div class="state-card">
          <div class="group-kicker muted-kicker">Design</div>
          <h3>No dress selected.</h3>
          <p>Your organiser needs to choose the shared design first.</p>
        </div>
      {/if}

      <div class="group-card">
        <div class="group-card-head">
          <div>
            <div class="group-kicker muted-kicker">Your order</div>
            <h3>{activeMember.name}'s measurements</h3>
          </div>
        </div>
        {#if memberFeedback.message}
          <div class="feedback-box {stateClass(memberFeedback.state)}">{memberFeedback.message}</div>
        {/if}
        <div class="meas-grid">
          <div><label class="inp-label">Bust (cm)</label><input class="inp" type="number" bind:value={memberMeasurements.bust} placeholder="e.g. 88">{#if memberErrors.bust}<div class="field-error">{memberErrors.bust}</div>{/if}</div>
          <div><label class="inp-label">Waist (cm)</label><input class="inp" type="number" bind:value={memberMeasurements.waist} placeholder="e.g. 70">{#if memberErrors.waist}<div class="field-error">{memberErrors.waist}</div>{/if}</div>
          <div><label class="inp-label">Hips (cm)</label><input class="inp" type="number" bind:value={memberMeasurements.hips} placeholder="e.g. 95">{#if memberErrors.hips}<div class="field-error">{memberErrors.hips}</div>{/if}</div>
          <div><label class="inp-label">Height (cm)</label><input class="inp" type="number" bind:value={memberMeasurements.height} placeholder="e.g. 165">{#if memberErrors.height}<div class="field-error">{memberErrors.height}</div>{/if}</div>
        </div>
        <button class="btn-p btn-full btn-lg" style="margin-top:16px;" on:click={memberCheckout} disabled={memberFeedback.state === 'saving'}>
          {memberFeedback.state === 'saving' ? 'Please wait...' : 'Continue to checkout'}
        </button>
        <p class="member-note">{memberCheckoutStarted ? 'Your organiser will not see your checkout details, only your order status.' : 'You only see your own order state here.'}</p>
      </div>
    {/if}
  </section>
{:else}
  <section class="group-hero">
    <div class="group-kicker">Group Order</div>
    <h1 class="group-title">One look. Every fit her own.</h1>
    <p class="group-sub">Everyone orders and pays individually.</p>
  </section>

  <section class="group-page">
    {#if draft.product}
      <div class="group-product-card">
        <div class="group-product-media">
          {#if draft.product.image}
            <img src={draft.product.image} alt={draft.product.name} class="group-product-image">
          {:else}
            <div class="group-product-fallback">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=".8"><path d="M9 3L5 7v14h14V7l-4-4"/><path d="M9 3c0 2.2 1.3 4 3 4s3-1.8 3-4"/></svg>
              <span>Image coming soon</span>
            </div>
          {/if}
        </div>
        <div class="group-product-body">
          <div class="group-kicker muted-kicker">Selected dress</div>
          <h2>{draft.product.name}</h2>
          <div class="group-price">£{draft.product.price}</div>
          <div class="group-id">Product ID: {draft.product.id}</div>
          <button class="s-link" style="margin-top:10px;" on:click={changeDress}>Change dress</button>
        </div>
      </div>
    {:else}
      <div class="group-card">
        <div class="group-card-head">
          <div>
            <div class="group-kicker muted-kicker">Step 1</div>
            <h3>No dress selected yet</h3>
          </div>
        </div>
        {#if groupErrors.product}
          <div class="feedback-box is-error">{groupErrors.product}</div>
        {/if}
        <div class="dress-pick-scroll no-pad">
          {#each pickerDresses as dress}
            <div class="dress-pick" on:click={() => selectDress(dress)} role="button" tabindex="0" on:keypress={() => selectDress(dress)}>
              <div class="dress-pick-img">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=".8" style="width:36px;height:36px;opacity:.2;"><path d="M9 3L5 7v14h14V7l-4-4"/><path d="M9 3c0 2.2 1.3 4 3 4s3-1.8 3-4"/></svg>
              </div>
              <div class="dress-pick-name">{dress.name}</div>
              <div class="dress-pick-price">£{dress.price}</div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <div class="group-card">
      <div class="group-card-head">
        <div>
          <div class="group-kicker muted-kicker">Step 2</div>
          <h3>Group setup</h3>
        </div>
      </div>
      {#if groupFeedback.message}
        <div class="feedback-box {stateClass(groupFeedback.state)}">{groupFeedback.message}</div>
      {/if}
      <div class="group-form-grid">
        <div style="grid-column:1/-1;">
          <label class="inp-label">Group name</label>
          <input class="inp" bind:value={draftName} placeholder="e.g. Meron & Yonas Wedding">
          {#if groupErrors.groupName}<div class="field-error">{groupErrors.groupName}</div>{/if}
        </div>
        <div>
          <label class="inp-label">Event date</label>
          <input class="inp" type="date" bind:value={draftDate}>
          {#if groupErrors.eventDate}<div class="field-error">{groupErrors.eventDate}</div>{/if}
        </div>
        <div>
          <label class="inp-label">Order type</label>
          <input class="inp" value="Group Order" readonly style="background:var(--soft);">
        </div>
      </div>
      <button class="btn-p btn-full btn-lg" style="margin-top:16px;" on:click={createGroupSpace} disabled={groupFeedback.state === 'saving'}>
        {groupFeedback.state === 'saving' ? 'Please wait...' : draft.created ? 'Update group order' : 'Create group order'}
      </button>
    </div>

    <div class="group-card">
      <div class="group-card-head">
        <div>
          <div class="group-kicker muted-kicker">Step 3</div>
          <h3>Member list</h3>
        </div>
      </div>
      {#if inviteFeedback.message}
        <div class="feedback-box {stateClass(inviteFeedback.state)}">{inviteFeedback.message}</div>
      {/if}
      <div class="member-add">
        <input class="inp" bind:value={newMember} placeholder="Add member name" style="flex:1;">
        <button class="btn-o" on:click={addMemberToGroup} disabled={inviteFeedback.state === 'saving'}>{inviteFeedback.state === 'saving' ? 'Saving...' : 'Add member'}</button>
      </div>
      {#if members.length === 0}
        <div class="empty-card">
          <div class="group-kicker muted-kicker">Members</div>
          <p>No members yet. Add people here once the group is created.</p>
        </div>
      {:else}
        <div class="member-list">
          {#each members as member}
            <div class="member-card">
              <div class="member-main">
                <div>
                  <div class="member-name">{member.name}</div>
                  <div class="member-meta">{member.user_id === organiser.id ? 'Organiser' : 'Member'} · {member.status === GROUP_MEMBER_STATUSES.ORDERED_ORGANISER ? 'organiser-paid' : 'self-paid'}</div>
                </div>
                <div class="member-status-chip">{statusLabel(member.status)}</div>
              </div>
              <div class="member-actions">
                {#if member.user_id === organiser.id}
                  <button class="mini-action is-primary" on:click={orderMyLook}>Order my look</button>
                {:else}
                  <button class="mini-action" on:click={() => sendLink(member)}>{member.status === GROUP_MEMBER_STATUSES.INVITED ? 'Send link' : 'Resend link'}</button>
                  <button class="mini-action" on:click={() => openMemberView(member)}>{member.status === GROUP_MEMBER_STATUSES.INVITED ? 'Waiting for her' : 'Open member view'}</button>
                  <button class="mini-action is-primary" on:click={() => orderForMember(member)}>Order for her</button>
                {/if}
              </div>
              <div class="member-status-row">
                {#each statusOptions as status}
                  <button class="status-pill" class:on={member.status === status} on:click={() => updateGroupMember(member.id, { status })}>{statusLabel(status)}</button>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <div class="group-card">
      <div class="group-card-head">
        <div>
          <div class="group-kicker muted-kicker">Step 4</div>
          <h3>Share the invite</h3>
        </div>
      </div>
      {#if !activeGroup}
        <div class="empty-card">
          <div class="group-kicker muted-kicker">Share</div>
          <p>Create the group first to unlock the invite link.</p>
        </div>
      {:else if !inviteIsValid}
        <div class="feedback-box is-error">This invite link is invalid or expired.</div>
      {/if}
      <p class="share-copy">Each person:</p>
      <ul class="share-list">
        <li>adds their measurements</li>
        <li>orders individually</li>
        <li>pays themselves</li>
      </ul>
      <div class="share-link-box">
        <div class="group-kicker muted-kicker">Share link</div>
        <div class="share-link">{activeGroup ? shareLink.replace('https://', '') : 'Available after setup'}</div>
      </div>
      <div class="share-actions">
        <button class="btn-o" on:click={copyLink}>Copy link</button>
        <button class="btn-p" on:click={shareWhatsApp}>Share via WhatsApp</button>
      </div>
      <p class="privacy-note">Only the organiser sees the full member list and group progress. Members only see the shared design, their own measurements, and their own checkout state.</p>
    </div>

    <div class="group-footer-actions">
      <button class="s-link" on:click={() => goHomeSection('matching')}>Back to Matching & Custom</button>
    </div>
  </section>
{/if}

<style>
  .group-hero{background:var(--burg);color:#fff;padding:44px 20px 34px;}
  .group-kicker{font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.55);}
  .muted-kicker{color:var(--muted);}
  .group-title{font-family:var(--serif);font-size:clamp(38px,10vw,64px);font-weight:300;line-height:.92;margin-top:10px;}
  .group-sub{font-size:13px;line-height:1.8;color:rgba(255,255,255,.78);margin-top:14px;max-width:320px;}
  .group-page{padding:18px 16px 44px;display:grid;gap:14px;}
  .group-card,.group-product-card,.state-card{border:1px solid var(--bdr);background:#fff;}
  .group-card,.state-card{padding:18px;}
  .group-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:16px;}
  .group-card h3,.group-product-body h2,.state-card h3{font-family:var(--serif);font-size:26px;font-weight:300;line-height:1.05;margin-top:4px;}
  .group-product-card{display:grid;grid-template-columns:120px 1fr;}
  .group-product-media{background:linear-gradient(160deg,var(--cream),#d0c8c0);display:flex;align-items:center;justify-content:center;color:var(--muted);min-height:160px;position:relative;}
  .group-product-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
  .group-product-fallback{display:flex;flex-direction:column;align-items:center;gap:8px;}
  .group-product-fallback svg{width:42px;height:42px;opacity:.28;}
  .group-product-fallback span{font-size:10px;letter-spacing:.16em;text-transform:uppercase;}
  .group-product-body{padding:18px;}
  .group-price{font-size:18px;margin-top:8px;}
  .group-id{font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-top:8px;}
  .group-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  .member-add{display:flex;gap:10px;margin-bottom:14px;}
  .member-list{display:grid;gap:12px;}
  .member-card{border:1px solid var(--bdr);padding:14px;background:var(--soft);}
  .member-main{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;}
  .member-name{font-size:13px;font-weight:500;}
  .member-meta{font-size:10px;color:var(--muted);margin-top:4px;letter-spacing:.08em;text-transform:uppercase;}
  .member-status-chip{padding:8px 10px;background:#fff;border:1px solid var(--bdr);font-size:9px;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;min-height:34px;display:inline-flex;align-items:center;}
  .member-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;}
  .mini-action{padding:10px 12px;border:1px solid var(--bdr);background:#fff;font-size:9px;letter-spacing:.16em;text-transform:uppercase;min-height:40px;}
  .mini-action.is-primary{background:var(--burg);border-color:var(--ink);color:#fff;}
  .member-status-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;}
  .status-pill{padding:8px 10px;border:1px solid var(--bdr);background:#fff;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);min-height:36px;}
  .status-pill.on{background:var(--ink);border-color:var(--ink);color:#fff;}
  .share-copy{font-size:12px;font-weight:500;margin-bottom:8px;}
  .share-list{padding-left:18px;color:var(--body);font-size:12px;line-height:1.8;}
  .share-link-box{margin-top:16px;padding:14px;background:var(--gold-l);border:1px solid var(--gold);}
  .share-link{font-size:14px;font-weight:500;margin-top:6px;overflow-wrap:anywhere;}
  .share-actions{display:flex;gap:10px;margin-top:16px;}
  .privacy-note{font-size:11px;color:var(--muted);line-height:1.7;margin-top:14px;}
  .group-footer-actions{padding-top:4px;}
  .member-banner{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px;border:1px solid var(--bdr);background:var(--soft);}
  .member-banner p{font-size:11px;color:var(--muted);}
  .member-note{font-size:11px;color:var(--muted);line-height:1.7;margin-top:12px;}
  .feedback-box{margin-bottom:16px;padding:12px 14px;border:1px solid var(--bdr);background:var(--soft);font-size:11px;line-height:1.6;}
  .feedback-box.is-error{border-color:#c9a7a2;background:#faf2f1;color:#6f2b22;}
  .feedback-box.is-success{border-color:#d6c9a4;background:#faf6ea;color:#5f4b19;}
  .feedback-box.is-saving{border-color:var(--gold);background:var(--gold-l);color:var(--body);}
  .field-error{font-size:10px;color:#8a3d33;margin-top:6px;}
  .empty-card{padding:16px;border:1px solid var(--bdr);background:var(--soft);}
  .empty-card p,.state-card p{font-size:12px;color:var(--muted);line-height:1.7;margin-top:8px;}
  .no-pad{padding:0;}

  @media(max-width:760px){
    .group-product-card{grid-template-columns:1fr;}
    .group-product-media{min-height:220px;}
    .group-form-grid{grid-template-columns:1fr;}
    .member-add,.share-actions,.member-banner{flex-direction:column;align-items:stretch;}
    .group-page{padding:16px 16px 40px;}
    .group-card,.state-card{padding:16px;}
  }
</style>
