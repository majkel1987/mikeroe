type BrandMarkProps = {
  compact?: boolean;
  light?: boolean;
};

export default function BrandMark({ compact = false, light = false }: BrandMarkProps) {
  return (
    <span className="brand-mark" aria-label="MikeRoe">
      <svg viewBox="0 0 44 44" role="img" aria-hidden="true" className="brand-mark__symbol">
        <rect width="44" height="44" rx="12" fill={light ? '#F4F1EA' : '#12161D'} />
        <path
          d="M10 30V14h5.3l6.7 8.4 6.7-8.4H34v16h-5.1V21.5L22 30l-6.9-8.5V30H10Z"
          fill={light ? '#12161D' : '#F4F1EA'}
        />
        <path d="M32.5 11.5h3v3h-3z" fill="#C86B32" />
      </svg>
      {!compact && (
        <span className="brand-mark__word">
          MikeRoe<span>.</span>
        </span>
      )}
    </span>
  );
}

