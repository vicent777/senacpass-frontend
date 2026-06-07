const profilePictures = import.meta.glob<string>(
  '../assets/profile-pics/*.png',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
);

const profilePicturesById = new Map(
  Object.entries(profilePictures).map(([path, url]) => {
    const fileName = path.split('/').pop() || '';
    return [fileName.replace(/\.png$/i, '').toLowerCase(), url];
  }),
);

function createGravatarHash(value: string) {
  let hash = 2166136261;

  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return Array.from({ length: 4 }, (_, index) =>
    Math.abs(Math.imul(hash ^ (index * 2654435761), 2246822519))
      .toString(16)
      .padStart(8, '0')
      .slice(-8),
  ).join('');
}

export function getProfilePicture(id?: string, size = 150) {
  const normalizedId = id?.trim().toLowerCase();

  if (normalizedId) {
    const localPicture = profilePicturesById.get(normalizedId);

    if (localPicture) {
      return localPicture;
    }
  }

  const fallbackHash = createGravatarHash(normalizedId || 'anonymous');
  return `https://www.gravatar.com/avatar/${fallbackHash}?d=retro&f=y&s=${size}`;
}
