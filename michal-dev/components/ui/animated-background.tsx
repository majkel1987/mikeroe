"use client";

// CSS-only animated background for better performance
// Removed Framer Motion to reduce JS bundle and improve GPU efficiency

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-bg">
      {/* CSS keyframes for smooth GPU-accelerated animations */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(10%, 10%) scale(1.05); }
          50% { transform: translate(-5%, 5%) scale(0.95); }
          75% { transform: translate(5%, -10%) scale(1.02); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-12%, -8%) scale(1.08); }
          66% { transform: translate(8%, 10%) scale(0.92); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(8%, 12%) scale(0.95); }
          40% { transform: translate(-10%, 5%) scale(1.05); }
          60% { transform: translate(5%, -8%) scale(0.98); }
          80% { transform: translate(-5%, 10%) scale(1.02); }
        }
      `}</style>

      <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-40">
        {/* Blob 1 - Purple - reduced blur from 100px to 60px */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[45vw] h-[45vw] rounded-full bg-accent1 blur-[60px] mix-blend-screen dark:mix-blend-color-dodge opacity-50 will-change-transform"
          style={{ animation: 'float1 25s ease-in-out infinite' }}
        />

        {/* Blob 2 - Teal - reduced blur from 120px to 70px */}
        <div
          className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-accent2 blur-[70px] mix-blend-screen dark:mix-blend-color-dodge opacity-40 will-change-transform"
          style={{ animation: 'float2 30s ease-in-out infinite' }}
        />

        {/* Blob 3 - Red - reduced blur from 130px to 80px */}
        <div
          className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-accent3 blur-[80px] mix-blend-screen dark:mix-blend-color-dodge opacity-30 will-change-transform"
          style={{ animation: 'float3 35s ease-in-out infinite' }}
        />
      </div>

      {/* Overlay - reduced backdrop-blur from 50-80px to 30px for performance */}
      <div className="absolute inset-0 bg-bg/60 backdrop-blur-[30px]"></div>
    </div>
  );
}
