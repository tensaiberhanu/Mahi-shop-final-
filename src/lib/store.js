import { get, writable } from 'svelte/store';
import {
  ORDER_MODES,
  GROUP_MEMBER_STATUSES,
  GROUP_PAID_BY,
  createCartItem,
  createGroup,
  createGroupMember,
  createGroupMemberOrder,
  createMeasurement,
  createOrder,
  createProductSnapshot,
  createUser,
  calculateCartTotal
} from '$lib/orderSystem.js';
import { ALL_PRODUCTS, WOMEN_PRODUCTS, MEN_PRODUCTS, COUPLE_PRODUCTS } from '$lib/data/catalog.js';

export const currentPage = writable('home');
export const activeNavSection = writable('home');
export const womenListingMode = writable('all');
export const womenDressFilter = writable('All');
export const menListingFilter = writable('All');
export const menuOpen = writable(false);
export const cartOpen = writable(false);
export const tryonOpen = writable(false);
export const flowOpen = writable(false);
export const flowType = writable('couple');
export const currentProduct = writable(null);
export const cart = writable([]);
export const saved = writable(new Set());
export const toastMessage = writable('');
export const toastVisible = writable(false);
export const groupView = writable('organiser');
export const groupSelectedMemberId = writable(null);

export const currentUser = writable(createUser({
  id: 'user_organiser',
  name: 'You',
  email: 'you@mahi.com'
}));

export const products = writable([]);
export const users = writable([]);
export const orders = writable([]);
export const measurements = writable([]);
export const groups = writable([]);
export const groupMembers = writable([]);
export const groupMemberOrders = writable([]);

function createDefaultGroupDraft() {
  return {
    product: null,
    groupId: null,
    groupName: '',
    eventDate: '',
    inviteCode: '',
    shareToken: '',
    created: false,
    organiserId: get(currentUser).id
  };
}

export const groupDraft = writable(createDefaultGroupDraft());

let toastTimer;

export function showToast(msg) {
  toastMessage.set(msg);
  toastVisible.set(true);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastVisible.set(false), 2200);
}

export function registerProducts(items) {
  products.set(items.map((product) => createProductSnapshot(product)));
}

export function ensureUser(userLike) {
  if (!userLike) return null;
  const existing = get(users).find((user) => user.id === userLike.id);
  if (existing) return existing;
  const next = createUser(userLike);
  users.update((list) => [...list, next]);
  return next;
}

function ensureOrganiserMember(groupId) {
  const organiser = get(currentUser);
  const found = get(groupMembers).find((member) => member.group_id === groupId && member.user_id === organiser.id);
  if (found) return found;

  const member = createGroupMember({
    group_id: groupId,
    name: organiser.name,
    email: organiser.email,
    status: GROUP_MEMBER_STATUSES.INVITED,
    user_id: organiser.id
  });
  groupMembers.update((list) => [...list, member]);
  return member;
}

export function setGroupProduct(product) {
  const snapshot = createProductSnapshot(product);
  groupDraft.update((draft) => ({ ...draft, product: snapshot }));
}

export function resetGroupOrder() {
  groupDraft.set(createDefaultGroupDraft());
  groupView.set('organiser');
  groupSelectedMemberId.set(null);
}

export function startGroupOrderWithProduct(product) {
  setGroupProduct(product);
  groupView.set('organiser');
  groupSelectedMemberId.set(null);
  navigateTo('weddings', { navSection: 'weddings' });
}

export function createOrUpdateGroup({ groupName, eventDate }) {
  const draft = get(groupDraft);
  const organiser = ensureUser(get(currentUser));
  if (!draft.product) return null;

  if (draft.groupId) {
    groups.update((list) => list.map((group) => group.id === draft.groupId
      ? {
          ...group,
          group_name: groupName,
          event_date: eventDate,
          product_id: draft.product.id
        }
      : group));

    const updated = get(groups).find((group) => group.id === draft.groupId);
    groupDraft.update((current) => ({
      ...current,
      groupName,
      eventDate,
      inviteCode: updated.invite_code,
      shareToken: updated.share_token,
      created: true
    }));
    ensureOrganiserMember(draft.groupId);
    return updated;
  }

  const nextGroup = createGroup({
    organiser_id: organiser.id,
    product_id: draft.product.id,
    group_name: groupName,
    event_date: eventDate
  });

  groups.update((list) => [...list, nextGroup]);
  ensureOrganiserMember(nextGroup.id);
  groupDraft.update((current) => ({
    ...current,
    groupId: nextGroup.id,
    groupName,
    eventDate,
    inviteCode: nextGroup.invite_code,
    shareToken: nextGroup.share_token,
    created: true
  }));
  return nextGroup;
}

export function getActiveGroup() {
  const draft = get(groupDraft);
  if (!draft.groupId) return null;
  return get(groups).find((group) => group.id === draft.groupId) || null;
}

export function getActiveGroupMembers() {
  const activeGroup = getActiveGroup();
  if (!activeGroup) return [];
  return get(groupMembers).filter((member) => member.group_id === activeGroup.id);
}

export function getSelectedGroupMember() {
  const memberId = get(groupSelectedMemberId);
  if (!memberId) return null;
  return get(groupMembers).find((member) => member.id === memberId) || null;
}

export function addGroupMember({ name, email = '', phone = '' }) {
  const activeGroup = getActiveGroup();
  if (!activeGroup) return null;
  const member = createGroupMember({
    group_id: activeGroup.id,
    name,
    email,
    phone
  });
  groupMembers.update((list) => [...list, member]);
  return member;
}

export function updateGroupMember(memberId, patch) {
  groupMembers.update((list) => list.map((member) => member.id === memberId ? { ...member, ...patch } : member));
}

export function joinGroupFromInvite(memberId, userLike = {}) {
  const member = get(groupMembers).find((item) => item.id === memberId);
  if (!member) return null;
  const group = get(groups).find((item) => item.id === member.group_id);
  if (!group) return null;
  const joinedUser = ensureUser(createUser({
    name: member.name || userLike.name || 'Member',
    email: userLike.email || member.email || ''
  }));
  updateGroupMember(memberId, {
    status: GROUP_MEMBER_STATUSES.JOINED,
    user_id: joinedUser.id
  });
  return joinedUser;
}

export function buildInviteLink(groupOrDraft = null) {
  const draft = groupOrDraft || get(groupDraft);
  const token = draft.shareToken || draft.share_token || 'your-group';
  return `https://mahi.com/group/${token}`;
}

export function resolveGroupInvite(token) {
  if (!token) return null;
  const group = get(groups).find((item) => item.share_token === token);
  if (!group) return null;
  const product = get(products).find((item) => item.id === group.product_id) || null;
  return { group, product };
}

export function addCartItem(item) {
  cart.update((items) => [...items, createCartItem(item)]);
}

export function createStandardOrderFromCartItem(item) {
  const order = createOrder({
    mode: item.mode,
    product_id: item.productId,
    buyer_id: item.buyerId || get(currentUser).id,
    status: 'placed',
    total: item.price
  });
  orders.update((list) => [...list, order]);

  (item.participants || []).forEach((participant) => {
    measurements.update((list) => [...list, createMeasurement({
      order_id: order.id,
      person_name: participant.person_name,
      person_role: participant.person_role,
      bust: participant.bust || '',
      waist: participant.waist || '',
      hips: participant.hips || '',
      height: participant.height || '',
      chest: participant.chest || '',
      shoulders: participant.shoulders || '',
      age: participant.age || ''
    })]);
  });

  return order;
}

export function createGroupMemberOrderRecord({ memberId, paidBy, item, participants = [] }) {
  const activeGroup = getActiveGroup();
  if (!activeGroup) return null;

  const order = createOrder({
    mode: ORDER_MODES.GROUP,
    product_id: item.productId,
    buyer_id: paidBy === GROUP_PAID_BY.SELF ? (item.buyerId || get(currentUser).id) : activeGroup.organiser_id,
    status: 'placed',
    total: item.price
  });
  orders.update((list) => [...list, order]);

  const memberOrder = createGroupMemberOrder({
    group_id: activeGroup.id,
    group_member_id: memberId,
    product_id: item.productId,
    paid_by: paidBy,
    order_id: order.id,
    status: 'placed'
  });
  groupMemberOrders.update((list) => [...list, memberOrder]);

  participants.forEach((participant) => {
    measurements.update((list) => [...list, createMeasurement({
      order_id: order.id,
      member_order_id: memberOrder.id,
      person_name: participant.person_name,
      person_role: participant.person_role,
      bust: participant.bust || '',
      waist: participant.waist || '',
      hips: participant.hips || '',
      height: participant.height || '',
      chest: participant.chest || '',
      shoulders: participant.shoulders || '',
      age: participant.age || ''
    })]);
  });

  updateGroupMember(memberId, {
    status: paidBy === GROUP_PAID_BY.ORGANISER ? GROUP_MEMBER_STATUSES.ORDERED_ORGANISER : GROUP_MEMBER_STATUSES.ORDERED_SELF
  });

  return { order, memberOrder };
}

export function commitCartToOrders() {
  const items = get(cart);
  items.forEach((item) => {
    if (item.mode === ORDER_MODES.GROUP && item.groupMemberId) {
      createGroupMemberOrderRecord({
        memberId: item.groupMemberId,
        paidBy: item.paidBy,
        item,
        participants: item.participants || []
      });
      return;
    }
    createStandardOrderFromCartItem(item);
  });
  cart.set([]);
}

export function getCartTotal() {
  return calculateCartTotal(get(cart));
}

export const ALL_PRODUCTS_CATALOG = ALL_PRODUCTS;
export const WOMEN = WOMEN_PRODUCTS;
export const MEN = MEN_PRODUCTS;
registerProducts(ALL_PRODUCTS);
users.set([get(currentUser)]);

export const COUPLE_SETS = COUPLE_PRODUCTS;

export const FAMILY_SETS = WOMEN.filter((product) => product.match);

export const BOT_MAP = {
  home:'home',women:'shop',men:'shop',product:'shop',
  matching:'matching','couple-sets':'matching','family-sets':'matching',custom:'matching',weddings:'matching',
  fit:'account',account:'account',saved:'account',track:'account'
};

export function navigateTo(page, options = {}) {
  currentPage.set(page);
  activeNavSection.set(options.navSection || page);

  if (page === 'women') {
    womenListingMode.set(options.womenMode || 'all');
    womenDressFilter.set(options.womenFilter || 'All');
  }

  if (page === 'men') {
    menListingFilter.set(options.menFilter || 'All');
  }

  if (page !== 'women' && options.resetWomen) {
    womenListingMode.set('all');
    womenDressFilter.set('All');
  }

  if (page !== 'men' && options.resetMen) {
    menListingFilter.set('All');
  }
}

export { ORDER_MODES, GROUP_MEMBER_STATUSES, GROUP_PAID_BY };
