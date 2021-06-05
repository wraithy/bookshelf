export const seriesId = (seriesName: string) => (seriesName ? seriesName.replace(/\ /g, '-') : 'no-series')
