"use client";
import { useEffect, useState, memo } from "react";


// --- Type Definitions ---
type IconType =
  | "html"
  | "css"
  | "javascript"
  | "react"
  | "node"
  | "tailwind"
  | "angular"
  | "typescript"
  | "dotnet"
  | "cypress"
  | "azure"
  | "sql"
  | "jest";

type GlowColor =
  | "cyan"
  | "purple"
  | "red"
  | "blue"
  | "green"
  | "teal"
  | "orange"
  | "violet";

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  labelKey: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

const iconComponents: Record<
  IconType,
  { component: () => React.JSX.Element; color: string }
> = {
  html: {
    component: () => (
      <img
        src="/icons/html.svg"
        alt="HTML"
        className="w-full h-full"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)",
        }}
      />
    ),
    color: "#E34F26",
  },
  css: {
    component: () => (
      <img
        src="/icons/css.svg"
        alt="CSS"
        className="w-full h-full"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(200deg) brightness(104%) contrast(97%)",
        }}
      />
    ),
    color: "#1572B6",
  },
  javascript: {
    component: () => (
      <img
        src="/icons/javaScript.svg"
        alt="JavaScript"
        className="w-full h-full"
      />
    ),
    color: "#F7DF1E",
  },
  react: {
    component: () => (
      <img src="/icons/react.svg" alt="React" className="w-full h-full" />
    ),
    color: "#61DAFB",
  },
  node: {
    component: () => (
      <img src="/icons/nodeJS.svg" alt="Node.js" className="w-full h-full" />
    ),
    color: "#339933",
  },
  tailwind: {
    component: () => (
      <img
        src="/icons/tailwind.svg"
        alt="Tailwind CSS"
        className="w-full h-full"
      />
    ),
    color: "#06B6D4",
  },
  angular: {
    component: () => (
      <img src="/icons/angular.svg" alt="Angular" className="w-full h-full" />
    ),
    color: "#DD0031",
  },
  typescript: {
    component: () => (
      <img
        src="/icons/typeScript.svg"
        alt="TypeScript"
        className="w-full h-full"
      />
    ),
    color: "#3178C6",
  },
  dotnet: {
    component: () => (
      <img
        src="/icons/dotnet.svg"
        alt=".NET"
        className="w-full h-full"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(270deg) brightness(104%) contrast(97%)",
        }}
      />
    ),
    color: "#512BD4",
  },
  cypress: {
    component: () => (
      <img
        src="/icons/cypress.svg"
        alt="Cypress"
        className="w-full h-full"
        style={{
          filter:
            "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(120deg) brightness(104%) contrast(97%)",
        }}
      />
    ),
    color: "#4fb38d",
  },
  azure: {
    component: () => (
      <img src="/icons/azure.svg" alt="Azure" className="w-full h-full" />
    ),
    color: "#0078D4",
  },
  sql: {
    component: () => (
      <img src="/icons/sql.svg" alt="SQL" className="w-full h-full" />
    ),
    color: "#336791",
  },
  jest: {
    component: () => (
      <img src="/icons/jest.svg" alt="Jest" className="w-full h-full" />
    ),
    color: "#C21325",
  },
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = "SkillIcon";

// --- Memoized Orbiting Skill Component ---
import { useI18n } from "../contexts/I18nContext";

const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, labelKey } = config;
  const { t } = useI18n();

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-gray-800/90 backdrop-blur-sm
          rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? "scale-125 shadow-2xl" : "shadow-lg hover:shadow-xl"}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
            : undefined,
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900/95 backdrop-blur-sm rounded text-xs text-white whitespace-nowrap pointer-events-none">
            {t(labelKey)}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = "OrbitingSkill";

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(
  ({
    radius,
    glowColor = "cyan",
    animationDelay = 0,
  }: GlowingOrbitPathProps) => {
    const glowColors = {
      cyan: {
        primary: "rgba(6, 182, 212, 0.4)",
        secondary: "rgba(6, 182, 212, 0.2)",
        border: "rgba(6, 182, 212, 0.3)",
      },
      purple: {
        primary: "rgba(147, 51, 234, 0.4)",
        secondary: "rgba(147, 51, 234, 0.2)",
        border: "rgba(147, 51, 234, 0.3)",
      },
      red: {
        primary: "rgba(239, 68, 68, 0.4)",
        secondary: "rgba(239, 68, 68, 0.2)",
        border: "rgba(239, 68, 68, 0.3)",
      },
      blue: {
        primary: "rgba(59, 130, 246, 0.4)",
        secondary: "rgba(59, 130, 246, 0.2)",
        border: "rgba(59, 130, 246, 0.3)",
      },
      green: {
        primary: "rgba(34, 197, 94, 0.4)",
        secondary: "rgba(34, 197, 94, 0.2)",
        border: "rgba(34, 197, 94, 0.3)",
      },
      teal: {
        primary: "rgba(2, 132, 199, 0.4)",
        secondary: "rgba(2, 132, 199, 0.2)",
        border: "rgba(2, 132, 199, 0.3)",
      },
      orange: {
        primary: "rgba(255, 159, 67, 0.4)",
        secondary: "rgba(255, 159, 67, 0.2)",
        border: "rgba(255, 159, 67, 0.3)",
      },
      violet: {
        primary: "rgba(168, 85, 247, 0.4)",
        secondary: "rgba(168, 85, 247, 0.2)",
        border: "rgba(168, 85, 247, 0.3)",
      },
    };

    const colors = glowColors[glowColor] || glowColors.cyan;

    return (
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          animationDelay: `${animationDelay}s`,
        }}
      >
        {/* Glowing background */}
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
            boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
            animation: "pulse 4s ease-in-out infinite",
            animationDelay: `${animationDelay}s`,
          }}
        />

        {/* Static ring for depth */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `1px solid ${colors.border}`,
            boxShadow: `inset 0 0 20px ${colors.secondary}`,
          }}
        />
      </div>
    );
  }
);
GlowingOrbitPath.displayName = "GlowingOrbitPath";

// --- Main App Component ---
interface OrbitingSkillsProps {
  skills: SkillConfig[];
}

export default function OrbitingSkills({ skills }: OrbitingSkillsProps) {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime((prevTime) => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{
    radius: number;
    glowColor: GlowColor;
    delay: number;
  }> = [
    { radius: 100, glowColor: "cyan", delay: 0 },
    { radius: 180, glowColor: "purple", delay: 1.5 },
  ];

  return (
    <main className="relative w-full flex items-center justify-center p-8 min-h-[500px]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 rounded-lg overflow-hidden">
        <div className="absolute inset-0" />
      </div>

      <div
        className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Central "Code" Icon with enhanced glow */}
        <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center z-20 relative shadow-2xl">
          <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse"></div>
          <div
            className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div className="relative z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
        </div>

        {/* Render glowing orbit paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {/* Render orbiting skill icons */}
        {skills.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill key={config.id} config={config} angle={angle} />
          );
        })}
      </div>
    </main>
  );
}
