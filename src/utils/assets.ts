/** Resolves a root-relative path to a file in public/ against the deployment base. */
export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
