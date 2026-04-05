import type { SocialProfile } from "../types/ui";

export function getSocialProfile(
  profiles: SocialProfile[],
  network: string
): SocialProfile | undefined {
  return (profiles ?? []).find(p => p.network === network);
}
