// notificationActions.js
export const fetchNotifications = (email) => async (dispatch) => {
  try {
    const response = await fetch(`/api/notifications/${email}`);
    const data = await response.json();
    dispatch({ type: 'FETCH_NOTIFICATIONS_SUCCESS', payload: data });
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

export const markNotificationAsRead = (id) => async (dispatch) => {
  try {
    await fetch(`/api/notifications/read/${id}`, { method: 'PUT' });
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

export const deleteNotification = (id) => async (dispatch) => {
  try {
    await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
    dispatch({ type: 'DELETE_NOTIFICATION', payload: id });
  } catch (error) {
    console.error("Error deleting notification:", error);
  }
};