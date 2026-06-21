'use client';

export default function HeroBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-50 pointer-events-none"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/Hero_background.png')" }}
      />
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}
