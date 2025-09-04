export const ORDER_EVENT = {
  CREATE: 'order:create',
  UPDATE: 'order:update',
  DELETE: 'order:delete',
  TRACK: 'order:track',
  STATUS_UPDATE: 'order:status-update',
  JOIN_NEW_ORDERS: 'order:join-new-orders',
  NEW_ORDER_NOTIFICATION: 'order:new-order-notification',
  GET_ALL_ORDERS: 'order:get-all-orders',
  UPDATE_ORDER_STATUS: 'order:update-status',
} as const;
