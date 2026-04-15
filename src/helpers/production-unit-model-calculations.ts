type AreaSurfaceParams = {
  isCircle: boolean;
  circumference: number | null;
  length: number | null;
  width: number | null;
};

type VolumeParams = AreaSurfaceParams & {
  depth: number | null;
};

export function calculateSurfaceArea({
  isCircle,
  circumference,
  length,
  width,
}: AreaSurfaceParams): number {
  if (isCircle) {
    const radius = circumference ? circumference / (2 * Math.PI) : 0;
    return Math.PI * Math.pow(radius, 2);
  }

  return length && width ? length * width : 0;
}

export function calculateVolume({
  isCircle,
  circumference,
  length,
  width,
  depth,
}: VolumeParams): number {
  const area = calculateSurfaceArea({
    isCircle,
    circumference,
    length,
    width,
  });

  return area * (depth || 0);
}
