import * as THREE from 'three';

// High-fidelity continent coordinates [lon, lat] in degrees
type Coord = [number, number];

function toCanvasCoords(lon: number, lat: number, width: number, height: number): [number, number] {
  const x = ((lon + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return [x, y];
}

const CONTINENT_POLYGONS: Coord[][] = [
  // 1. North America (Detailed mainland + Alaska)
  [
    [-168, 65], [-162, 70], [-150, 71], [-135, 69], [-125, 71], [-115, 69], [-105, 68],
    [-95, 70], [-85, 66], [-80, 62], [-76, 58], [-65, 59], [-60, 52], [-65, 45],
    [-70, 43], [-74, 40], [-76, 36], [-80, 32], [-81, 26], [-82, 25], [-84, 28],
    [-88, 30], [-94, 29], [-97, 26], [-97, 21], [-92, 19], [-88, 16], [-83, 9],
    [-77, 8], [-80, 14], [-86, 16], [-93, 16], [-97, 18], [-103, 21], [-106, 23],
    [-110, 24], [-115, 30], [-117, 32], [-120, 34], [-124, 40], [-124, 48], [-128, 52],
    [-132, 56], [-140, 60], [-152, 59], [-160, 56], [-166, 60], [-168, 65]
  ],
  // 2. Greenland
  [
    [-45, 83], [-25, 82], [-18, 77], [-20, 70], [-35, 65], [-45, 60], [-55, 68], [-58, 76], [-45, 83]
  ],
  // 3. Central America & Caribbean Bridge
  [
    [-83, 9], [-80, 8.5], [-77, 8], [-79, 9.5], [-83, 10], [-85, 11], [-87, 13], [-89, 14],
    [-92, 16], [-90, 18], [-87, 18], [-83, 15], [-83, 9]
  ],
  // 4. South America
  [
    [-77, 8], [-72, 11], [-67, 11], [-60, 9], [-53, 5], [-48, 0], [-40, -3],
    [-35, -5], [-35, -9], [-38, -13], [-39, -18], [-44, -23], [-48, -27], [-53, -33],
    [-58, -38], [-65, -44], [-66, -54], [-73, -53], [-75, -48], [-74, -42], [-72, -37],
    [-71, -30], [-76, -18], [-80, -9], [-81, -5], [-79, 0], [-77, 4], [-77, 8]
  ],
  // 5. Western & Central Europe
  [
    [-9, 37], [-9, 43], [-2, 44], [0, 46], [2, 49], [5, 52], [8, 54], [10, 54],
    [13, 55], [18, 55], [23, 55], [27, 58], [30, 60], [32, 53], [29, 46], [25, 42],
    [23, 38], [21, 37], [16, 39], [12, 43], [8, 44], [4, 43], [-2, 40], [-6, 36], [-9, 37]
  ],
  // 6. United Kingdom & Ireland
  [
    [-5, 50], [-1, 51], [1.5, 52.5], [0, 54.5], [-2, 57.5], [-4, 58.5], [-6, 56.5], [-5, 54], [-4, 51], [-5, 50]
  ],
  [
    [-10, 52], [-6, 52], [-6, 55], [-10, 54], [-10, 52]
  ],
  // 7. Scandinavia
  [
    [5, 58], [9, 57], [12, 56], [16, 56], [19, 60], [24, 65], [30, 70], [25, 71],
    [19, 69], [13, 65], [6, 62], [5, 58]
  ],
  // 8. Africa
  [
    [-17, 15], [-17, 21], [-13, 27], [-5, 36], [0, 36], [10, 37], [12, 33], [25, 32],
    [32, 31], [33, 28], [36, 23], [40, 18], [44, 12], [51, 12], [47, 5], [42, -1],
    [40, -10], [35, -20], [32, -28], [28, -33], [24, -34], [18, -34], [15, -28],
    [12, -18], [12, -7], [8, 4], [2, 6], [-5, 5], [-10, 6], [-15, 11], [-17, 15]
  ],
  // 9. Madagascar
  [
    [44, -12], [49, -14], [50, -18], [47, -25], [44, -25], [43, -20], [44, -12]
  ],
  // 10. Arabian Peninsula
  [
    [35, 30], [40, 30], [48, 30], [50, 26], [55, 25], [60, 23], [58, 19], [53, 16],
    [48, 14], [44, 13], [43, 16], [40, 20], [37, 24], [35, 30]
  ],
  // 11. Asia (Mainland Eurasia)
  [
    [30, 60], [40, 65], [55, 68], [65, 72], [75, 73], [90, 76], [105, 77], [120, 75],
    [135, 73], [150, 72], [165, 68], [175, 65], [170, 60], [160, 56], [150, 50],
    [142, 48], [132, 42], [128, 38], [122, 36], [120, 31], [118, 24], [108, 20],
    [105, 10], [100, 3], [98, 10], [94, 18], [88, 22], [82, 17], [80, 10], [77, 8],
    [72, 19], [68, 24], [62, 25], [58, 26], [52, 36], [45, 40], [38, 40], [35, 45],
    [40, 50], [45, 55], [40, 60], [30, 60]
  ],
  // 12. Indian Subcontinent
  [
    [68, 24], [72, 21], [74, 15], [77, 8], [80, 10], [82, 15], [86, 20], [89, 22],
    [88, 27], [80, 28], [74, 28], [68, 24]
  ],
  // 13. Japan Archipelago
  [
    [130, 32], [133, 34], [137, 35], [140, 38], [142, 44], [144, 44], [141, 41],
    [138, 37], [134, 34], [130, 32]
  ],
  // 14. Southeast Asia Islands & Indonesia/Philippines
  [
    [100, 4], [104, 1], [110, -3], [115, -8], [110, -7], [105, -5], [100, -1], [96, 4], [100, 4]
  ],
  [
    [112, 2], [116, 6], [119, 4], [117, -2], [112, -3], [112, 2]
  ],
  [
    [120, 15], [125, 12], [125, 7], [121, 8], [120, 15]
  ],
  // 15. Australia
  [
    [114, -22], [118, -19], [124, -15], [130, -12], [136, -11], [142, -10], [145, -15],
    [148, -20], [153, -27], [151, -33], [146, -38], [138, -36], [135, -34], [128, -32],
    [120, -34], [115, -34], [113, -28], [114, -22]
  ],
  // 16. New Zealand
  [
    [168, -46], [171, -43], [174, -41], [176, -37], [178, -37], [176, -41], [172, -44], [168, -46]
  ],
  // 17. Antarctica
  [
    [-180, -72], [-140, -74], [-100, -71], [-60, -64], [-30, -72], [0, -69],
    [40, -68], [80, -67], [120, -66], [160, -69], [180, -72], [180, -90], [-180, -90]
  ]
];

// Major Prediction and Financial Tech Hubs with Coordinate Anchors
export const GLOBAL_HUBS: Array<{ name: string; lon: number; lat: number; color: string; prominence: number }> = [
  { name: 'Washington DC', lon: -77.0, lat: 38.9, color: '#6366f1', prominence: 1.0 },
  { name: 'New York', lon: -74.0, lat: 40.7, color: '#38bdf8', prominence: 1.0 },
  { name: 'San Francisco', lon: -122.4, lat: 37.7, color: '#10b981', prominence: 1.0 },
  { name: 'Starbase TX', lon: -97.1, lat: 26.0, color: '#f59e0b', prominence: 0.9 },
  { name: 'London', lon: -0.1, lat: 51.5, color: '#6366f1', prominence: 1.0 },
  { name: 'Edinburgh', lon: -3.2, lat: 55.95, color: '#f43f5e', prominence: 0.8 },
  { name: 'Zurich', lon: 8.5, lat: 47.4, color: '#38bdf8', prominence: 0.9 },
  { name: 'New Delhi', lon: 77.2, lat: 28.6, color: '#10b981', prominence: 1.0 },
  { name: 'Singapore', lon: 103.8, lat: 1.3, color: '#38bdf8', prominence: 0.9 },
  { name: 'Tokyo', lon: 139.7, lat: 35.7, color: '#ec4899', prominence: 1.0 },
  { name: 'Sydney', lon: 151.2, lat: -33.9, color: '#6366f1', prominence: 0.8 },
];

/**
 * Creates an ultra-premium, high-fidelity equirectangular Earth texture canvas.
 * Optimized for performance (cached, power-of-two 2048x1024, crisp digital matrix).
 */
export function createEarthCanvasTexture(isDark = false): THREE.CanvasTexture {
  const width = 2048;
  const height = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // 1. Deep Volumetric Ocean Gradient
  if (isDark) {
    const oceanGrad = ctx.createRadialGradient(
      width * 0.45, height * 0.45, 100,
      width * 0.5, height * 0.5, width * 0.65
    );
    oceanGrad.addColorStop(0, '#0c1427'); // Luminous deep navy
    oceanGrad.addColorStop(0.5, '#070b16'); // Institutional obsidian
    oceanGrad.addColorStop(1, '#03050a'); // Deep cosmic edge
    ctx.fillStyle = oceanGrad;
  } else {
    const oceanGrad = ctx.createRadialGradient(
      width * 0.45, height * 0.45, 100,
      width * 0.5, height * 0.5, width * 0.65
    );
    oceanGrad.addColorStop(0, '#ffffff'); // Crisp pearl
    oceanGrad.addColorStop(0.6, '#f1f5f9'); // Clean slate-50
    oceanGrad.addColorStop(1, '#e2e8f0'); // Soft depth edge
    ctx.fillStyle = oceanGrad;
  }
  ctx.fillRect(0, 0, width, height);

  // 2. High-Tech Graticule Matrix (Equator, Tropics, Prime Meridian, Lat/Lon)
  ctx.lineWidth = 1;
  ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.09)' : 'rgba(100, 116, 139, 0.08)';

  // Standard Latitudes
  for (let lat = -60; lat <= 60; lat += 30) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Standard Longitudes
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = ((lon + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Highlighted Navigational Equator & Prime Meridian
  ctx.lineWidth = 1.75;
  ctx.strokeStyle = isDark ? 'rgba(99, 102, 241, 0.22)' : 'rgba(79, 70, 229, 0.16)';

  const equatorY = height / 2;
  ctx.beginPath();
  ctx.moveTo(0, equatorY);
  ctx.lineTo(width, equatorY);
  ctx.stroke();

  const primeMeridianX = width / 2;
  ctx.beginPath();
  ctx.moveTo(primeMeridianX, 0);
  ctx.lineTo(primeMeridianX, height);
  ctx.stroke();

  // 3. Render Continents with Multi-Layer Digital Elevation
  // Layer 3A: Outer Land Glow / Coastline Haze
  ctx.save();
  ctx.shadowColor = isDark ? '#6366f1' : '#94a3b8';
  ctx.shadowBlur = isDark ? 14 : 8;
  ctx.fillStyle = isDark ? '#141c2e' : '#cbd5e1';
  ctx.strokeStyle = isDark ? '#4338ca' : '#94a3b8';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  CONTINENT_POLYGONS.forEach((polygon) => {
    if (polygon.length < 3) return;
    ctx.beginPath();
    const [startX, startY] = toCanvasCoords(polygon[0][0], polygon[0][1], width, height);
    ctx.moveTo(startX, startY);

    for (let i = 1; i < polygon.length; i++) {
      const [px, py] = toCanvasCoords(polygon[i][0], polygon[i][1], width, height);
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });
  ctx.restore();

  // Layer 3B: Solid Institutional Land Mass Fill
  ctx.fillStyle = isDark ? '#121929' : '#e2e8f0';
  ctx.strokeStyle = isDark ? '#6366f1' : '#64748b';
  ctx.lineWidth = 1.2;

  CONTINENT_POLYGONS.forEach((polygon) => {
    if (polygon.length < 3) return;
    ctx.beginPath();
    const [startX, startY] = toCanvasCoords(polygon[0][0], polygon[0][1], width, height);
    ctx.moveTo(startX, startY);

    for (let i = 1; i < polygon.length; i++) {
      const [px, py] = toCanvasCoords(polygon[i][0], polygon[i][1], width, height);
      ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  // 4. Digital Matrix Data Nodes on Land (High-Density Vector Array)
  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';

  const dotPitch = 9;
  const dotRadius = 1.8;

  for (let x = dotPitch / 2; x < width; x += dotPitch) {
    for (let y = dotPitch / 2; y < height; y += dotPitch) {
      ctx.beginPath();
      ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(99, 102, 241, 0.45)' : 'rgba(51, 65, 85, 0.32)';
      ctx.fill();
    }
  }

  // 5. Luminescent Global Hub Corridors (Glowing Clusters)
  GLOBAL_HUBS.forEach((hub) => {
    const [hx, hy] = toCanvasCoords(hub.lon, hub.lat, width, height);
    const radius = 38 * hub.prominence;

    // Dual-stage radiant flare
    const grad = ctx.createRadialGradient(hx, hy, 1, hx, hy, radius);
    if (isDark) {
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(0.15, hub.color);
      grad.addColorStop(0.45, 'rgba(99, 102, 241, 0.45)');
      grad.addColorStop(1, 'rgba(99, 102, 241, 0)');
    } else {
      grad.addColorStop(0, 'rgba(30, 41, 59, 0.9)');
      grad.addColorStop(0.2, hub.color);
      grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.3)');
      grad.addColorStop(1, 'rgba(99, 102, 241, 0)');
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(hx, hy, radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();

  // 6. Build High-Quality Canvas Texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return texture;
}
