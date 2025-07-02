<template>
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <defs>
      <!-- Dégradé lumineux bleu-ciel -->
      <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#a6faff" />
        <stop offset="100%" stop-color="#30cfff" />
      </linearGradient>
      <!-- Effet de halo -->
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- Halo lumineux -->
    <circle cx="100" cy="100" r="80" fill="url(#xpGradient)" filter="url(#glow)" opacity="0.3" />

    <!-- Texte XP stylisé -->
    <text
      x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
      font-family="Verdana, sans-serif" font-weight="bold" font-size="72"
      fill="url(#xpGradient)" stroke="#178aa2" stroke-width="2" filter="url(#glow)"
    >
      XP
    </text>

    <!-- Éclats -->
    <g fill="#ffffff" opacity="0.6">
      <circle cx="45" cy="45" r="4" />
      <circle cx="160" cy="60" r="3" />
      <circle cx="140" cy="160" r="2" />
      <circle cx="60" cy="150" r="3" />
    </g>
  </svg>
</template>
