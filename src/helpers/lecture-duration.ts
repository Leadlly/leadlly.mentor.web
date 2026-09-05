const STORAGE_KEY = "leadlly_teacher_lecture_duration_hours";
export const LECTURE_HOUR_OPTIONS = [1, 2, 3];

export type StoredLectureDuration = {
  hours: number;
  isCustom: boolean;
  customHours: number | null;
};

const isPresetHours = (hours: number) => LECTURE_HOUR_OPTIONS.includes(hours);

const parseStoredDuration = (raw: string | null): StoredLectureDuration | null => {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === "number") {
      if (!Number.isFinite(parsed) || parsed <= 0) return null;
      return {
        hours: parsed,
        isCustom: !isPresetHours(parsed),
        customHours: isPresetHours(parsed) ? null : parsed,
      };
    }
    if (
      parsed &&
      typeof parsed === "object" &&
      Number.isFinite(parsed.hours) &&
      parsed.hours > 0
    ) {
      const customHours =
        Number.isFinite(parsed.customHours) && parsed.customHours > 0
          ? parsed.customHours
          : parsed.isCustom
            ? parsed.hours
            : null;
      return {
        hours: parsed.hours,
        isCustom: Boolean(parsed.isCustom),
        customHours,
      };
    }
  } catch {
    const hours = Number(raw);
    if (!Number.isFinite(hours) || hours <= 0) return null;
    return {
      hours,
      isCustom: !isPresetHours(hours),
      customHours: isPresetHours(hours) ? null : hours,
    };
  }

  return null;
};

export const getStoredLectureDuration = (): StoredLectureDuration | null => {
  if (typeof window === "undefined") return null;
  return parseStoredDuration(window.localStorage.getItem(STORAGE_KEY));
};

export const getStoredLectureDurationHours = (): number | null =>
  getStoredLectureDuration()?.hours ?? null;

export const setStoredLectureDurationHours = (
  hours: number,
  isCustom = !isPresetHours(hours)
) => {
  if (typeof window === "undefined") return;
  if (!Number.isFinite(hours) || hours <= 0) return;

  const previous = getStoredLectureDuration();
  const customHours = isCustom
    ? hours
    : previous?.customHours && !isPresetHours(previous.customHours)
      ? previous.customHours
      : null;

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ hours, isCustom, customHours })
  );
};

export const getStoredLectureDurationMinutes = (): number | null => {
  const hours = getStoredLectureDurationHours();
  return hours ? hours * 60 : null;
};

export const setStoredLectureDurationMinutes = (minutes: number) => {
  if (!Number.isFinite(minutes) || minutes <= 0) return;
  const hours = minutes / 60;
  setStoredLectureDurationHours(hours, !isPresetHours(hours));
};

export const splitLectureDurationHours = (
  stored: StoredLectureDuration | number | null
) => {
  const value =
    typeof stored === "number"
      ? {
          hours: stored,
          isCustom: !isPresetHours(stored),
          customHours: isPresetHours(stored) ? null : stored,
        }
      : stored;

  if (!value || value.hours <= 0) {
    return {
      selectedHours: null as number | null,
      customHours: null as number | null,
      showCustomInput: false,
    };
  }

  return {
    selectedHours: value.hours,
    customHours: value.customHours,
    showCustomInput: false,
  };
};
