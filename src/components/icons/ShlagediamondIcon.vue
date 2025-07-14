<template>
  <svg viewBox="0 0 300 300" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Dégradés de bleu pour l'effet diamant -->
      <linearGradient id="facetBlue1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#d0f4ff" />
        <stop offset="100%" stop-color="#4ca5c7" />
      </linearGradient>
      <linearGradient id="facetBlue2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#b3e0f5" />
        <stop offset="100%" stop-color="#5bb8d8" />
      </linearGradient>
      <linearGradient id="facetBlue3" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stop-color="#a8d8f0" />
        <stop offset="100%" stop-color="#3e9fc1" />
      </linearGradient>
      <!-- Ombre portée douce -->
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#000" flood-opacity="0.2" />
      </filter>
    </defs>

    <!-- Diamant principal avec effet de perspective et filtres -->
    <g filter="url(#softShadow)">
      <!-- Corps central -->
      <polygon points="150,40 40,120 80,250 220,250 260,120" fill="url(#facetBlue1)" stroke="#297293" stroke-width="3" />

      <!-- Facettes internes pour brillance -->
      <polygon points="150,40 40,120 150,150" fill="url(#facetBlue2)" />
      <polygon points="150,40 260,120 150,150" fill="url(#facetBlue3)" />
      <polygon points="80,250 150,150 40,120" fill="url(#facetBlue3)" />
      <polygon points="220,250 150,150 260,120" fill="url(#facetBlue2)" />
      <polygon points="80,250 220,250 150,150" fill="url(#facetBlue1)" />
    </g>

    <!-- Éclat central stylisé façon cristal fracturé -->
    <path
      d="M150 130
           L160 160
           L190 165
           L165 180
           L170 210
           L150 195
           L130 210
           L135 180
           L110 165
           L140 160
           Z"
      fill="#2b7ea3" opacity="0.5"
    />
  </svg>
</template>
