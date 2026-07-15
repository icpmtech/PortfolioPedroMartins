export const triggerHaptic = (pattern: number | number[] = 10) => {
  if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
    try {
      window.navigator.vibrate(pattern);
    } catch (e) {
      // Ignore vibration errors (unsupported/blocked)
    }
  }
};
