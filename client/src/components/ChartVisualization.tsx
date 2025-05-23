import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ChartVisualizationProps {
  chart: any;
  size?: number;
}

export default function ChartVisualization({ chart, size = 400 }: ChartVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !chart) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.fillStyle = "#1e293b"; // cosmic-800
    ctx.fillRect(0, 0, size, size);

    // Draw basic Vedic chart structure (square with 12 houses)
    drawVedicChart(ctx, size, chart);
  }, [chart, size]);

  const drawVedicChart = (ctx: CanvasRenderingContext2D, size: number, chart: any) => {
    const center = size / 2;
    const outerSize = size * 0.8;
    const innerSize = size * 0.3;

    // Draw outer square
    ctx.strokeStyle = "#a855f7"; // mystical-500
    ctx.lineWidth = 2;
    ctx.strokeRect(center - outerSize / 2, center - outerSize / 2, outerSize, outerSize);

    // Draw inner square (rotated 45 degrees)
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(Math.PI / 4);
    ctx.strokeRect(-innerSize / 2, -innerSize / 2, innerSize, innerSize);
    ctx.restore();

    // Draw house divisions
    drawHouseDivisions(ctx, center, outerSize, innerSize);

    // Draw house numbers
    drawHouseNumbers(ctx, center, outerSize);

    // Draw planetary positions if available
    if (chart.planetaryPositions) {
      drawPlanetaryPositions(ctx, center, outerSize, chart.planetaryPositions);
    }
  };

  const drawHouseDivisions = (ctx: CanvasRenderingContext2D, center: number, outerSize: number, innerSize: number) => {
    ctx.strokeStyle = "#64748b"; // cosmic-500
    ctx.lineWidth = 1;

    // Draw lines from center to corners and midpoints
    const half = outerSize / 2;
    const innerHalf = innerSize / 2;

    // Lines to corners
    const corners = [
      [-half, -half], [half, -half], [half, half], [-half, half]
    ];

    const innerCorners = [
      [-innerHalf / Math.sqrt(2), -innerHalf / Math.sqrt(2)],
      [innerHalf / Math.sqrt(2), -innerHalf / Math.sqrt(2)],
      [innerHalf / Math.sqrt(2), innerHalf / Math.sqrt(2)],
      [-innerHalf / Math.sqrt(2), innerHalf / Math.sqrt(2)]
    ];

    // Draw lines from outer to inner
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(center + corners[i][0], center + corners[i][1]);
      ctx.lineTo(center + innerCorners[i][0], center + innerCorners[i][1]);
      ctx.stroke();
    }

    // Draw cross lines
    ctx.beginPath();
    ctx.moveTo(center - half, center);
    ctx.lineTo(center + half, center);
    ctx.moveTo(center, center - half);
    ctx.lineTo(center, center + half);
    ctx.stroke();
  };

  const drawHouseNumbers = (ctx: CanvasRenderingContext2D, center: number, outerSize: number) => {
    ctx.fillStyle = "#f59e0b"; // gold-500
    ctx.font = "14px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // House positions (12 houses in Vedic astrology)
    const housePositions = [
      [0, -outerSize * 0.35], // 1st house (top)
      [outerSize * 0.25, -outerSize * 0.25], // 2nd house
      [outerSize * 0.35, 0], // 3rd house (right)
      [outerSize * 0.25, outerSize * 0.25], // 4th house
      [0, outerSize * 0.35], // 5th house (bottom)
      [-outerSize * 0.25, outerSize * 0.25], // 6th house
      [-outerSize * 0.35, 0], // 7th house (left)
      [-outerSize * 0.25, -outerSize * 0.25], // 8th house
      [outerSize * 0.15, -outerSize * 0.15], // 9th house
      [outerSize * 0.15, outerSize * 0.15], // 10th house
      [-outerSize * 0.15, outerSize * 0.15], // 11th house
      [-outerSize * 0.15, -outerSize * 0.15], // 12th house
    ];

    housePositions.forEach((pos, index) => {
      ctx.fillText(
        (index + 1).toString(),
        center + pos[0],
        center + pos[1]
      );
    });
  };

  const drawPlanetaryPositions = (ctx: CanvasRenderingContext2D, center: number, outerSize: number, positions: any) => {
    const planetSymbols: Record<string, string> = {
      Sun: "☉",
      Moon: "☽",
      Mars: "♂",
      Mercury: "☿",
      Jupiter: "♃",
      Venus: "♀",
      Saturn: "♄",
      Rahu: "☊",
      Ketu: "☋"
    };

    ctx.fillStyle = "#ffffff";
    ctx.font = "16px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw planets in their respective houses
    Object.entries(positions).forEach(([planet, data]: [string, any]) => {
      if (data.house && planetSymbols[planet]) {
        const houseIndex = data.house - 1;
        const angle = (houseIndex * 30 - 90) * (Math.PI / 180); // Convert to radians
        const radius = outerSize * 0.2;
        
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        
        ctx.fillText(planetSymbols[planet], x, y);
      }
    });
  };

  if (!chart) {
    return (
      <Card className="bg-cosmic-800 border-cosmic-600">
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-cosmic-300">
            <i className="fas fa-chart-pie text-4xl mb-2"></i>
            <p>No chart data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative bg-cosmic-800 rounded-lg p-4 aspect-square">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-mystical-900/80 backdrop-blur-sm rounded-lg p-3 text-center opacity-0 hover:opacity-100 transition-opacity">
          <i className="fas fa-expand text-gold-400 text-2xl mb-1"></i>
          <p className="text-white text-sm font-semibold">Interactive Chart</p>
          <p className="text-cosmic-300 text-xs">Click to explore</p>
        </div>
      </div>
    </div>
  );
}
