<template>
  <svg viewBox="0 0 300 300" width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Dégradé doré -->
      <radialGradient id="goldGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fff8cc" />
        <stop offset="40%" stop-color="#ffd700" />
        <stop offset="100%" stop-color="#b8860b" />
      </radialGradient>
    </defs>

    <!-- Pièce en perspective -->
    <ellipse cx="150" cy="150" rx="120" ry="120" fill="url(#goldGradient)" stroke="#aa8800" stroke-width="10" />

    <!-- Stries du bord -->
    <g stroke="#996600" stroke-width="2">
      <line x1="150" y1="30" x2="150" y2="20" />
      <line x1="210" y1="45" x2="215" y2="35" />
      <line x1="255" y1="90" x2="265" y2="85" />
      <line x1="270" y1="150" x2="280" y2="150" />
      <line x1="255" y1="210" x2="265" y2="215" />
      <line x1="210" y1="255" x2="215" y2="265" />
      <line x1="150" y1="270" x2="150" y2="280" />
      <line x1="90" y1="255" x2="85" y2="265" />
      <line x1="45" y1="210" x2="35" y2="215" />
      <line x1="30" y1="150" x2="20" y2="150" />
      <line x1="45" y1="90" x2="35" y2="85" />
      <line x1="90" y1="45" x2="85" y2="35" />
    </g>

    <!-- Gland -->
    <path
      d="M135 70
           Q150 50 165 70
           Q150 60 135 70
           Z" fill="#5e3b0e"
    />

    <!-- Courbe centrale du dollar -->
    <path
      d="M150 75
           C120 90, 130 125, 150 140
           C170 155, 170 180, 150 195
           C130 210, 135 230, 150 240
           C165 230, 170 210, 150 195"
      stroke="#5e3b0e" stroke-width="8" fill="none" stroke-linecap="round"
    />

    <!-- Bourses -->
    <ellipse cx="135" cy="245" rx="10" ry="8" fill="#5e3b0e" />
    <ellipse cx="165" cy="245" rx="10" ry="8" fill="#5e3b0e" />

    <!-- Barre verticale -->
    <line x1="150" y1="60" x2="150" y2="260" stroke="#5e3b0e" stroke-width="5" stroke-linecap="round" />
  </svg>
</template>
