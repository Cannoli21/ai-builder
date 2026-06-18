export const BUILD_PROFILES = {
  basic: {
    label: "Basic",
    persistence: false,
    crud: false,
    validation: false,
    customerFacingOnly: false
  },
  interactive: {
    label: "Interactive",
    persistence: false,
    crud: true,
    validation: true,
    customerFacingOnly: true
  },
  persistent: {
    label: "Persistent",
    persistence: true,
    crud: true,
    validation: true,
    customerFacingOnly: true
  }
};

export const DEFAULT_BUILD_PROFILE = "persistent";

export function getBuildRules(profile = DEFAULT_BUILD_PROFILE) {
  return BUILD_PROFILES[profile as keyof typeof BUILD_PROFILES] ?? BUILD_PROFILES.persistent;
}
