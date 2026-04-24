export const ORDER_MODES = {
  SINGLE: 'single',
  COUPLE: 'couple',
  FAMILY: 'family',
  GROUP: 'group'
};

export const GROUP_MEMBER_STATUSES = {
  INVITED: 'invited',
  JOINED: 'joined',
  ORDERED_SELF: 'ordered_self',
  ORDERED_ORGANISER: 'ordered_organiser'
};

export const GROUP_PAID_BY = {
  SELF: 'self',
  ORGANISER: 'organiser'
};

const BASE_PRICES = {
  men: 145,
  child: 85
};

export function createId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function nowIso() {
  return new Date().toISOString();
}

export function createProductSnapshot(product) {
  if (!product) return null;
  return {
    id: product.id,
    name: product.name,
    image: product.image || null,
    price: product.price,
    slug: product.slug || null
  };
}

export function createUser(overrides = {}) {
  return {
    id: createId('user'),
    name: '',
    email: '',
    phone: '',
    created_at: nowIso(),
    ...overrides
  };
}

export function createOrder(overrides = {}) {
  return {
    id: createId('order'),
    mode: ORDER_MODES.SINGLE,
    product_id: null,
    buyer_id: null,
    status: 'pending',
    total: 0,
    created_at: nowIso(),
    ...overrides
  };
}

export function createMeasurement(overrides = {}) {
  return {
    id: createId('measure'),
    order_id: null,
    member_order_id: null,
    person_name: '',
    person_role: '',
    bust: '',
    waist: '',
    hips: '',
    height: '',
    chest: '',
    shoulders: '',
    age: '',
    created_at: nowIso(),
    ...overrides
  };
}

export function createGroup(overrides = {}) {
  const shareToken = overrides.share_token || createId('group');
  return {
    id: createId('group'),
    organiser_id: null,
    product_id: null,
    group_name: '',
    event_date: '',
    invite_code: shareToken.slice(-6).toUpperCase(),
    share_token: shareToken,
    created_at: nowIso(),
    ...overrides
  };
}

export function createGroupMember(overrides = {}) {
  return {
    id: createId('member'),
    group_id: null,
    name: '',
    email: '',
    phone: '',
    status: GROUP_MEMBER_STATUSES.INVITED,
    user_id: null,
    created_at: nowIso(),
    ...overrides
  };
}

export function createGroupMemberOrder(overrides = {}) {
  return {
    id: createId('gmorder'),
    group_id: null,
    group_member_id: null,
    product_id: null,
    paid_by: GROUP_PAID_BY.SELF,
    order_id: null,
    status: 'pending',
    created_at: nowIso(),
    ...overrides
  };
}

export function createCartItem(overrides = {}) {
  return {
    id: createId('cart'),
    mode: ORDER_MODES.SINGLE,
    productId: null,
    productName: '',
    price: 0,
    details: '',
    buyerId: null,
    participants: [],
    groupId: null,
    groupMemberId: null,
    paidBy: GROUP_PAID_BY.SELF,
    metadata: {},
    ...overrides
  };
}

export function normaliseGroupStatusLabel(status) {
  return status.replace(/_/g, ' ');
}

export function formatGroupStatus(status) {
  if (status === GROUP_MEMBER_STATUSES.ORDERED_SELF) return 'Ordered (self)';
  if (status === GROUP_MEMBER_STATUSES.ORDERED_ORGANISER) return 'Ordered (organiser)';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function memberPriceFromType(productPrice, memberType) {
  if (memberType === 'adult_man') return BASE_PRICES.men;
  if (memberType === 'child' || memberType === 'child_boy' || memberType === 'child_girl') return BASE_PRICES.child;
  return productPrice;
}

export function buildParticipantsFromMeasurements(mode, product, input) {
  if (!product) return [];

  if (mode === ORDER_MODES.SINGLE) {
    return [{
      person_name: 'You',
      person_role: 'single',
      ...input
    }];
  }

  if (mode === ORDER_MODES.COUPLE) {
    return [
      {
        person_name: 'Her',
        person_role: 'adult_woman',
        ...input.her
      },
      {
        person_name: 'His',
        person_role: 'adult_man',
        ...input.him
      }
    ];
  }

  if (mode === ORDER_MODES.FAMILY) {
    return input.map((member, index) => ({
      person_name: member.name || (index === 0 ? 'You' : `Person ${index + 1}`),
      person_role: member.memberType,
      bust: member.bust || '',
      waist: member.waist || '',
      hips: member.hips || '',
      height: member.height || '',
      chest: member.memberType === 'adult_man' || member.memberType === 'child' || member.memberType === 'child_boy' || member.memberType === 'child_girl' ? member.bust || '' : '',
      shoulders: '',
      age: member.memberType === 'child' || member.memberType === 'child_boy' || member.memberType === 'child_girl' ? member.hips || '' : ''
    }));
  }

  return [];
}

export function calculateCartTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
