import * as Haptics from 'expo-haptics';

/**
 * All haptic calls wrapped in try/catch — simulator fails silently.
 */
export function useHaptics() {
  return {
    tap: () => {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        // simulator
      }
    },
    action: () => {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {
        // simulator
      }
    },
    tabSwitch: () => {
      try {
        Haptics.selectionAsync();
      } catch {
        // simulator
      }
    },
    toggle: () => {
      try {
        Haptics.selectionAsync();
      } catch {
        // simulator
      }
    },
    pipSnap: () => {
      try {
        Haptics.selectionAsync();
      } catch {
        // simulator
      }
    },
    messageSend: () => {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {
        // simulator
      }
    },
    reactionSend: () => {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {
        // simulator
      }
    },
    success: () => {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch {
        // simulator
      }
    },
    error: () => {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } catch {
        // simulator
      }
    },
    callEnd: () => {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      } catch {
        // simulator
      }
    },
    goalComplete: () => {
      try {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } catch {
        // simulator
      }
    },
  };
}
