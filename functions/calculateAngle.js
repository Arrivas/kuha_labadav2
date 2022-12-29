const calculateAngle = (origin, destination) => {
  if (!origin || !destination) return;
  const startLat = origin?.latitude;
  const startLng = origin?.longitude;
  const endLat = destination?.lat || destination?.latitude;
  const endLng = destination?.lng || destination?.longitude;
  const dx = endLat - startLat;
  const dy = endLng - startLng;
  return (Math.atan2(dy, dx) * 100) / Math.PI;
};

export default calculateAngle;
