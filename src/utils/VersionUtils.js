export const sortVersions = (versions) => {
  versions.sort((a, b) => {
    const versionA = a.version.split(".").map(Number);
    const versionB = b.version.split(".").map(Number);
    const maxLength = Math.max(versionA.length, versionB.length);

    for (let i = 0; i < maxLength; i++) {
      const numA = versionA[i] !== undefined ? versionA[i] : 0;
      const numB = versionB[i] !== undefined ? versionB[i] : 0;

      if (numA > numB) return -1;
      if (numA < numB) return 1;
    }
    return 0;
  });
};
