export const INSTITUTE_CODE_QUERY = "institutecode";
export const INSTITUTE_CODE_STORAGE_KEY = "leadlly_invite_institute_code";

export const normalizeInstituteCode = (value?: string | null) =>
  (value ?? "").trim().toUpperCase();

export const getInstituteCodeFromSearchParams = (
  searchParams: Pick<URLSearchParams, "get">
) =>
  normalizeInstituteCode(
    searchParams.get(INSTITUTE_CODE_QUERY) ||
      searchParams.get("instituteCode") ||
      searchParams.get("institute_code")
  );

export const persistInviteInstituteCode = (code: string) => {
  if (typeof window === "undefined") return;
  const normalized = normalizeInstituteCode(code);
  if (normalized) {
    window.sessionStorage.setItem(INSTITUTE_CODE_STORAGE_KEY, normalized);
  }
};

export const getInviteInstituteCode = () => {
  if (typeof window === "undefined") return "";
  return normalizeInstituteCode(
    window.sessionStorage.getItem(INSTITUTE_CODE_STORAGE_KEY)
  );
};

export const captureInviteInstituteCodeFromUrl = () => {
  if (typeof window === "undefined") return "";
  const fromUrl = getInstituteCodeFromSearchParams(
    new URLSearchParams(window.location.search)
  );
  if (fromUrl) persistInviteInstituteCode(fromUrl);
  return fromUrl || getInviteInstituteCode();
};

export const clearInviteInstituteCode = () => {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(INSTITUTE_CODE_STORAGE_KEY);
};

export const withInstituteCodeQuery = (path: string, code?: string) => {
  const normalized = normalizeInstituteCode(code);
  if (!normalized) return path;
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${INSTITUTE_CODE_QUERY}=${encodeURIComponent(normalized)}`;
};
