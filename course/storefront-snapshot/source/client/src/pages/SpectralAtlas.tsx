import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Info, Atom, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import atlasData from '../data/rqm_atlas_first18.json';
import AGQFViewer from '@/components/AGQFViewer';

interface SpectralLine {
  Z: number;
  ion_charge: number;
  series: string;
  n_upper: number;
  n_lower: number;
  upper: string;
  lower: string;
  sigma_cm1: number;
  wl_nm_display: number;
  wl_nm_vac: number;
  medium: string;
  model: string;
  label_short: string;
}

interface AtlasLineRaw {
  id: string;
  nUpper: number;
  nLower: number;
  sigma_cm1: number;
  wavelength_nm_vac: number;
  wavelength_nm_display: number;
  medium: string;
  label_short?: string;
  label_long?: string;
  color_wavelength?: string;
  color_series?: string;
}

interface AtlasSeriesRaw {
  nLower: number;
  lines: AtlasLineRaw[];
  series_limit: {
    sigma_cm1: number;
    wavelength_nm_vac: number;
    wavelength_nm_display: number;
    medium: string;
    label: string;
    color: string;
  };
  recommended_x_range_nm: number[];
}

interface AtlasElementRaw {
  Z: number;
  symbol: string;
  name: string;
  period: number;
  group: number;
  category: string;
  hydrogenicIon: {
    ion_stage_int: number;
    ion_stage_roman: string;
    charge: number;
    label: string;
    displayName: string;
  };
  spectra: Record<string, AtlasSeriesRaw>;
}

interface AtlasDataRaw {
  elements: AtlasElementRaw[];
  agqf: {
    curve: { s: number[]; U: number[] };
    barriers: { k: number; s2: number; s: number }[];
    wells: { n: number; s_center: number; U_floor: number }[];
  };
}

const atlas = atlasData as unknown as AtlasDataRaw;

const SERIES_COLORS: Record<string, string> = {
  'Lyman': '#8b5cf6',
  'Balmer': '#ef4444',
  'Paschen': '#f97316',
  'Brackett': '#eab308',
  'Pfund': '#22c55e',
  'Humphreys': '#06b6d4',
};

function getSeriesLimitsForElement(element: AtlasElementRaw): Record<string, { limit: number; range: [number, number]; maxN: number }> {
  const limits: Record<string, { limit: number; range: [number, number]; maxN: number }> = {};

  for (const [seriesName, seriesData] of Object.entries(element.spectra)) {
    const maxN = seriesData.lines.reduce((max, line) => Math.max(max, line.nUpper), 0);
    const xRange = seriesData.recommended_x_range_nm;
    limits[seriesName] = {
      limit: seriesData.series_limit.wavelength_nm_display,
      range: [xRange[0] || 50, xRange[1] || 2500] as [number, number],
      maxN: maxN,
    };
  }

  return limits;
}

function convertAtlasToSpectralLines(element: AtlasElementRaw): SpectralLine[] {
  const lines: SpectralLine[] = [];

  for (const [seriesName, seriesData] of Object.entries(element.spectra)) {
    for (const line of seriesData.lines) {
      lines.push({
        Z: element.Z,
        ion_charge: element.hydrogenicIon.charge,
        series: seriesName,
        n_upper: line.nUpper,
        n_lower: line.nLower,
        upper: `n=${line.nUpper}`,
        lower: `n=${line.nLower}`,
        sigma_cm1: line.sigma_cm1,
        wl_nm_display: line.wavelength_nm_display,
        wl_nm_vac: line.wavelength_nm_vac,
        medium: line.medium,
        model: 'RQM Spectral Geometry',
        label_short: line.label_short || `${line.nLower}→${line.nUpper}`,
      });
    }
  }

  return lines;
}

const BALMER_LABELS: Record<number, string> = {
  3: 'Hα', 4: 'Hβ', 5: 'Hγ', 6: 'Hδ', 7: 'Hε', 8: 'Hζ'
};

const SERIES_LOWER_N: Record<string, number> = {
  'Lyman': 1,
  'Balmer': 2,
  'Paschen': 3,
  'Brackett': 4,
  'Pfund': 5,
  'Humphreys': 6,
};

const RYDBERG_CONSTANT_NM = 91.1763;

function generateHydrogenicSpectralLines(Z: number): SpectralLine[] {
  const lines: SpectralLine[] = [];
  const seriesNames = ['Lyman', 'Balmer', 'Paschen', 'Brackett', 'Pfund', 'Humphreys'];

  for (let seriesIdx = 0; seriesIdx < seriesNames.length; seriesIdx++) {
    const nLower = seriesIdx + 1;
    const seriesName = seriesNames[seriesIdx];

    for (let nUpper = nLower + 1; nUpper <= nLower + 8; nUpper++) {
      const wavelength_nm = RYDBERG_CONSTANT_NM / (Z * Z * (1/(nLower * nLower) - 1/(nUpper * nUpper)));
      const sigma_cm1 = 1e7 / wavelength_nm;

      lines.push({
        Z,
        ion_charge: Z - 1,
        series: seriesName,
        n_upper: nUpper,
        n_lower: nLower,
        upper: `n=${nUpper}`,
        lower: `n=${nLower}`,
        sigma_cm1,
        wl_nm_display: wavelength_nm,
        wl_nm_vac: wavelength_nm,
        medium: wavelength_nm > 200 ? 'air' : 'vacuum',
        model: 'RQM Spectral Geometry',
        label_short: `${nLower}→${nUpper}`,
      });
    }
  }

  return lines;
}

function generateSyntheticElement(Z: number): AtlasElementRaw {
  const elementInfo = PERIODIC_TABLE.find(el => el.Z === Z);
  const symbol = elementInfo?.symbol || `E${Z}`;
  const name = elementInfo?.name || `Element ${Z}`;
  const period = getElementPeriodFromZ(Z);

  const spectra: Record<string, AtlasSeriesRaw> = {};
  const seriesNames = ['Lyman', 'Balmer', 'Paschen', 'Brackett', 'Pfund', 'Humphreys'];

  for (let seriesIdx = 0; seriesIdx < seriesNames.length; seriesIdx++) {
    const nLower = seriesIdx + 1;
    const seriesName = seriesNames[seriesIdx];
    const lines: AtlasLineRaw[] = [];

    for (let nUpper = nLower + 1; nUpper <= nLower + 8; nUpper++) {
      const wavelength_nm = RYDBERG_CONSTANT_NM / (Z * Z * (1/(nLower * nLower) - 1/(nUpper * nUpper)));
      const sigma_cm1 = 1e7 / wavelength_nm;

      lines.push({
        id: `${Z}-${seriesName}-${nLower}-${nUpper}`,
        nUpper,
        nLower,
        sigma_cm1,
        wavelength_nm_vac: wavelength_nm,
        wavelength_nm_display: wavelength_nm,
        medium: wavelength_nm > 200 ? 'air' : 'vacuum',
        label_short: `${nLower}→${nUpper}`,
      });
    }

    const seriesLimit = RYDBERG_CONSTANT_NM / (Z * Z * (1/(nLower * nLower)));
    const firstLine = lines[0]?.wavelength_nm_display || seriesLimit;
    const lastLine = lines[lines.length - 1]?.wavelength_nm_display || seriesLimit;
    const minWl = Math.min(seriesLimit, firstLine, lastLine) * 0.9;
    const maxWl = Math.max(firstLine, lastLine) * 1.1;

    spectra[seriesName] = {
      nLower,
      lines,
      series_limit: {
        sigma_cm1: 1e7 / seriesLimit,
        wavelength_nm_vac: seriesLimit,
        wavelength_nm_display: seriesLimit,
        medium: seriesLimit > 200 ? 'air' : 'vacuum',
        label: `${seriesName} limit`,
        color: SERIES_COLORS[seriesName] || '#4d9aaf',
      },
      recommended_x_range_nm: [minWl, maxWl],
    };
  }

  return {
    Z,
    symbol,
    name,
    period,
    group: 1,
    category: 'calculated',
    hydrogenicIon: {
      ion_stage_int: Z,
      ion_stage_roman: toRoman(Z),
      charge: Z - 1,
      label: `${symbol} ${toRoman(Z)}`,
      displayName: `${name} (hydrogenic)`,
    },
    spectra,
  };
}

function getElementPeriodFromZ(z: number): number {
  if (z <= 2) return 1;
  if (z <= 10) return 2;
  if (z <= 18) return 3;
  if (z <= 36) return 4;
  if (z <= 54) return 5;
  if (z <= 86) return 6;
  return 7;
}

function toRoman(num: number): string {
  const romanNumerals: [number, string][] = [
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];
  let result = '';
  for (const [value, symbol] of romanNumerals) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
}

const WAVELENGTH_BANDS = [
  { name: 'X-ray', min: 0, max: 10, color: 'rgba(236, 72, 153, 0.2)' },
  { name: 'EUV', min: 10, max: 100, color: 'rgba(168, 85, 247, 0.15)' },
  { name: 'UV', min: 100, max: 400, color: 'rgba(139, 92, 246, 0.12)' },
  { name: 'Visible', min: 400, max: 700, color: 'rgba(34, 197, 94, 0.1)' },
  { name: 'IR', min: 700, max: 25000, color: 'rgba(239, 68, 68, 0.1)' },
];

function SpectrumStrip({
  lines,
  selectedSeries,
  wavelengthRange
}: {
  lines: SpectralLine[];
  selectedSeries: string[];
  wavelengthRange: [number, number];
}) {
  // Safeguard against invalid wavelength ranges
  let [minWl, maxWl] = wavelengthRange;
  if (!minWl || !maxWl || minWl <= 0 || maxWl <= 0 || minWl >= maxWl) {
    // Calculate from lines if available
    if (lines.length > 0) {
      const wavelengths = lines.map(l => l.wl_nm_display).filter(wl => wl > 0);
      if (wavelengths.length > 0) {
        minWl = Math.min(...wavelengths) * 0.9;
        maxWl = Math.max(...wavelengths) * 1.1;
      } else {
        minWl = 50;
        maxWl = 2500;
      }
    } else {
      minWl = 50;
      maxWl = 2500;
    }
  }
  const range = maxWl - minWl;

  const getPosition = (wl: number) => {
    return ((wl - minWl) / range) * 100;
  };

  const visibleBands = [
    { wl: 380, color: '#8b5cf6' },
    { wl: 450, color: '#3b82f6' },
    { wl: 495, color: '#06b6d4' },
    { wl: 570, color: '#22c55e' },
    { wl: 590, color: '#eab308' },
    { wl: 620, color: '#f97316' },
    { wl: 750, color: '#ef4444' },
  ];

  return (
    <div className="mt-3 relative" data-testid="spectrum-strip">
      <div className="h-14 rounded bg-gradient-to-r from-[#1a1a2e] via-[#2d2d44] to-[#1a1a2e] relative overflow-hidden border border-[#4d9aaf]/20">
        {minWl < 750 && maxWl > 380 && (
          <div
            className="absolute top-0 bottom-0 opacity-30"
            style={{
              left: `${Math.max(0, getPosition(380))}%`,
              right: `${Math.max(0, 100 - getPosition(750))}%`,
              background: 'linear-gradient(to right, #8b5cf6, #3b82f6, #06b6d4, #22c55e, #eab308, #f97316, #ef4444)',
            }}
          />
        )}

        {lines.map((line, i) => {
          const pos = getPosition(line.wl_nm_display);
          if (pos < 0 || pos > 100) return null;

          const color = SERIES_COLORS[line.series] || '#4d9aaf';
          const isVisible = line.wl_nm_display >= 380 && line.wl_nm_display <= 750;

          return (
            <div
              key={`${line.series}-${line.n_upper}-${line.n_lower}-${i}`}
              className="absolute top-0 bottom-0 transition-all hover:w-1.5"
              style={{
                left: `${pos}%`,
                width: '4.5px',
                backgroundColor: isVisible ? getVisibleColor(line.wl_nm_display) : color,
                boxShadow: `0 0 8px 2px ${isVisible ? getVisibleColor(line.wl_nm_display) : color}`,
                filter: 'brightness(1.5)',
              }}
              title={`${line.series} ${line.n_lower}→${line.n_upper}: ${line.wl_nm_display.toFixed(1)} nm`}
            />
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-2 px-1">
        <span className="text-sm font-medium text-[#6bc4d9]">{minWl.toFixed(0)} nm</span>
        <span className="text-[#6bc4d9] text-2xl font-bold">Emission Spectrum</span>
        <span className="text-sm font-medium text-[#6bc4d9]">{maxWl.toFixed(0)} nm</span>
      </div>
    </div>
  );
}

function getVisibleColor(wavelength: number): string {
  if (wavelength < 380) return '#8b5cf6';
  if (wavelength < 450) return `hsl(${270 - (wavelength - 380) / 70 * 30}, 80%, 60%)`;
  if (wavelength < 495) return `hsl(${240 - (wavelength - 450) / 45 * 60}, 80%, 60%)`;
  if (wavelength < 570) return `hsl(${180 - (wavelength - 495) / 75 * 60}, 70%, 50%)`;
  if (wavelength < 590) return `hsl(${120 - (wavelength - 570) / 20 * 70}, 80%, 55%)`;
  if (wavelength < 620) return `hsl(${50 - (wavelength - 590) / 30 * 20}, 90%, 55%)`;
  if (wavelength < 750) return `hsl(${30 - (wavelength - 620) / 130 * 30}, 85%, 55%)`;
  return '#ef4444';
}

const ATLAS_ELEMENTS_MAP: Record<number, AtlasElementRaw> = {};
atlas.elements.forEach(el => {
  ATLAS_ELEMENTS_MAP[el.Z] = el;
});

const PERIODIC_TABLE: { symbol: string; name: string; Z: number; row: number; col: number; category: string }[] = [
  { symbol: 'H', name: 'Hydrogen', Z: 1, row: 1, col: 1, category: 'nonmetal' },
  { symbol: 'He', name: 'Helium', Z: 2, row: 1, col: 18, category: 'noble' },
  { symbol: 'Li', name: 'Lithium', Z: 3, row: 2, col: 1, category: 'alkali' },
  { symbol: 'Be', name: 'Beryllium', Z: 4, row: 2, col: 2, category: 'alkaline' },
  { symbol: 'B', name: 'Boron', Z: 5, row: 2, col: 13, category: 'metalloid' },
  { symbol: 'C', name: 'Carbon', Z: 6, row: 2, col: 14, category: 'nonmetal' },
  { symbol: 'N', name: 'Nitrogen', Z: 7, row: 2, col: 15, category: 'nonmetal' },
  { symbol: 'O', name: 'Oxygen', Z: 8, row: 2, col: 16, category: 'nonmetal' },
  { symbol: 'F', name: 'Fluorine', Z: 9, row: 2, col: 17, category: 'halogen' },
  { symbol: 'Ne', name: 'Neon', Z: 10, row: 2, col: 18, category: 'noble' },
  { symbol: 'Na', name: 'Sodium', Z: 11, row: 3, col: 1, category: 'alkali' },
  { symbol: 'Mg', name: 'Magnesium', Z: 12, row: 3, col: 2, category: 'alkaline' },
  { symbol: 'Al', name: 'Aluminum', Z: 13, row: 3, col: 13, category: 'post-transition' },
  { symbol: 'Si', name: 'Silicon', Z: 14, row: 3, col: 14, category: 'metalloid' },
  { symbol: 'P', name: 'Phosphorus', Z: 15, row: 3, col: 15, category: 'nonmetal' },
  { symbol: 'S', name: 'Sulfur', Z: 16, row: 3, col: 16, category: 'nonmetal' },
  { symbol: 'Cl', name: 'Chlorine', Z: 17, row: 3, col: 17, category: 'halogen' },
  { symbol: 'Ar', name: 'Argon', Z: 18, row: 3, col: 18, category: 'noble' },
  { symbol: 'K', name: 'Potassium', Z: 19, row: 4, col: 1, category: 'alkali' },
  { symbol: 'Ca', name: 'Calcium', Z: 20, row: 4, col: 2, category: 'alkaline' },
  { symbol: 'Sc', name: 'Scandium', Z: 21, row: 4, col: 3, category: 'transition' },
  { symbol: 'Ti', name: 'Titanium', Z: 22, row: 4, col: 4, category: 'transition' },
  { symbol: 'V', name: 'Vanadium', Z: 23, row: 4, col: 5, category: 'transition' },
  { symbol: 'Cr', name: 'Chromium', Z: 24, row: 4, col: 6, category: 'transition' },
  { symbol: 'Mn', name: 'Manganese', Z: 25, row: 4, col: 7, category: 'transition' },
  { symbol: 'Fe', name: 'Iron', Z: 26, row: 4, col: 8, category: 'transition' },
  { symbol: 'Co', name: 'Cobalt', Z: 27, row: 4, col: 9, category: 'transition' },
  { symbol: 'Ni', name: 'Nickel', Z: 28, row: 4, col: 10, category: 'transition' },
  { symbol: 'Cu', name: 'Copper', Z: 29, row: 4, col: 11, category: 'transition' },
  { symbol: 'Zn', name: 'Zinc', Z: 30, row: 4, col: 12, category: 'transition' },
  { symbol: 'Ga', name: 'Gallium', Z: 31, row: 4, col: 13, category: 'post-transition' },
  { symbol: 'Ge', name: 'Germanium', Z: 32, row: 4, col: 14, category: 'metalloid' },
  { symbol: 'As', name: 'Arsenic', Z: 33, row: 4, col: 15, category: 'metalloid' },
  { symbol: 'Se', name: 'Selenium', Z: 34, row: 4, col: 16, category: 'nonmetal' },
  { symbol: 'Br', name: 'Bromine', Z: 35, row: 4, col: 17, category: 'halogen' },
  { symbol: 'Kr', name: 'Krypton', Z: 36, row: 4, col: 18, category: 'noble' },
  { symbol: 'Rb', name: 'Rubidium', Z: 37, row: 5, col: 1, category: 'alkali' },
  { symbol: 'Sr', name: 'Strontium', Z: 38, row: 5, col: 2, category: 'alkaline' },
  { symbol: 'Y', name: 'Yttrium', Z: 39, row: 5, col: 3, category: 'transition' },
  { symbol: 'Zr', name: 'Zirconium', Z: 40, row: 5, col: 4, category: 'transition' },
  { symbol: 'Nb', name: 'Niobium', Z: 41, row: 5, col: 5, category: 'transition' },
  { symbol: 'Mo', name: 'Molybdenum', Z: 42, row: 5, col: 6, category: 'transition' },
  { symbol: 'Tc', name: 'Technetium', Z: 43, row: 5, col: 7, category: 'transition' },
  { symbol: 'Ru', name: 'Ruthenium', Z: 44, row: 5, col: 8, category: 'transition' },
  { symbol: 'Rh', name: 'Rhodium', Z: 45, row: 5, col: 9, category: 'transition' },
  { symbol: 'Pd', name: 'Palladium', Z: 46, row: 5, col: 10, category: 'transition' },
  { symbol: 'Ag', name: 'Silver', Z: 47, row: 5, col: 11, category: 'transition' },
  { symbol: 'Cd', name: 'Cadmium', Z: 48, row: 5, col: 12, category: 'transition' },
  { symbol: 'In', name: 'Indium', Z: 49, row: 5, col: 13, category: 'post-transition' },
  { symbol: 'Sn', name: 'Tin', Z: 50, row: 5, col: 14, category: 'post-transition' },
  { symbol: 'Sb', name: 'Antimony', Z: 51, row: 5, col: 15, category: 'metalloid' },
  { symbol: 'Te', name: 'Tellurium', Z: 52, row: 5, col: 16, category: 'metalloid' },
  { symbol: 'I', name: 'Iodine', Z: 53, row: 5, col: 17, category: 'halogen' },
  { symbol: 'Xe', name: 'Xenon', Z: 54, row: 5, col: 18, category: 'noble' },
  { symbol: 'Cs', name: 'Cesium', Z: 55, row: 6, col: 1, category: 'alkali' },
  { symbol: 'Ba', name: 'Barium', Z: 56, row: 6, col: 2, category: 'alkaline' },
  { symbol: 'La', name: 'Lanthanum', Z: 57, row: 8, col: 3, category: 'lanthanide' },
  { symbol: 'Ce', name: 'Cerium', Z: 58, row: 8, col: 4, category: 'lanthanide' },
  { symbol: 'Pr', name: 'Praseodymium', Z: 59, row: 8, col: 5, category: 'lanthanide' },
  { symbol: 'Nd', name: 'Neodymium', Z: 60, row: 8, col: 6, category: 'lanthanide' },
  { symbol: 'Pm', name: 'Promethium', Z: 61, row: 8, col: 7, category: 'lanthanide' },
  { symbol: 'Sm', name: 'Samarium', Z: 62, row: 8, col: 8, category: 'lanthanide' },
  { symbol: 'Eu', name: 'Europium', Z: 63, row: 8, col: 9, category: 'lanthanide' },
  { symbol: 'Gd', name: 'Gadolinium', Z: 64, row: 8, col: 10, category: 'lanthanide' },
  { symbol: 'Tb', name: 'Terbium', Z: 65, row: 8, col: 11, category: 'lanthanide' },
  { symbol: 'Dy', name: 'Dysprosium', Z: 66, row: 8, col: 12, category: 'lanthanide' },
  { symbol: 'Ho', name: 'Holmium', Z: 67, row: 8, col: 13, category: 'lanthanide' },
  { symbol: 'Er', name: 'Erbium', Z: 68, row: 8, col: 14, category: 'lanthanide' },
  { symbol: 'Tm', name: 'Thulium', Z: 69, row: 8, col: 15, category: 'lanthanide' },
  { symbol: 'Yb', name: 'Ytterbium', Z: 70, row: 8, col: 16, category: 'lanthanide' },
  { symbol: 'Lu', name: 'Lutetium', Z: 71, row: 8, col: 17, category: 'lanthanide' },
  { symbol: 'Hf', name: 'Hafnium', Z: 72, row: 6, col: 4, category: 'transition' },
  { symbol: 'Ta', name: 'Tantalum', Z: 73, row: 6, col: 5, category: 'transition' },
  { symbol: 'W', name: 'Tungsten', Z: 74, row: 6, col: 6, category: 'transition' },
  { symbol: 'Re', name: 'Rhenium', Z: 75, row: 6, col: 7, category: 'transition' },
  { symbol: 'Os', name: 'Osmium', Z: 76, row: 6, col: 8, category: 'transition' },
  { symbol: 'Ir', name: 'Iridium', Z: 77, row: 6, col: 9, category: 'transition' },
  { symbol: 'Pt', name: 'Platinum', Z: 78, row: 6, col: 10, category: 'transition' },
  { symbol: 'Au', name: 'Gold', Z: 79, row: 6, col: 11, category: 'transition' },
  { symbol: 'Hg', name: 'Mercury', Z: 80, row: 6, col: 12, category: 'transition' },
  { symbol: 'Tl', name: 'Thallium', Z: 81, row: 6, col: 13, category: 'post-transition' },
  { symbol: 'Pb', name: 'Lead', Z: 82, row: 6, col: 14, category: 'post-transition' },
  { symbol: 'Bi', name: 'Bismuth', Z: 83, row: 6, col: 15, category: 'post-transition' },
  { symbol: 'Po', name: 'Polonium', Z: 84, row: 6, col: 16, category: 'metalloid' },
  { symbol: 'At', name: 'Astatine', Z: 85, row: 6, col: 17, category: 'halogen' },
  { symbol: 'Rn', name: 'Radon', Z: 86, row: 6, col: 18, category: 'noble' },
  { symbol: 'Fr', name: 'Francium', Z: 87, row: 7, col: 1, category: 'alkali' },
  { symbol: 'Ra', name: 'Radium', Z: 88, row: 7, col: 2, category: 'alkaline' },
  { symbol: 'Ac', name: 'Actinium', Z: 89, row: 9, col: 3, category: 'actinide' },
  { symbol: 'Th', name: 'Thorium', Z: 90, row: 9, col: 4, category: 'actinide' },
  { symbol: 'Pa', name: 'Protactinium', Z: 91, row: 9, col: 5, category: 'actinide' },
  { symbol: 'U', name: 'Uranium', Z: 92, row: 9, col: 6, category: 'actinide' },
  { symbol: 'Np', name: 'Neptunium', Z: 93, row: 9, col: 7, category: 'actinide' },
  { symbol: 'Pu', name: 'Plutonium', Z: 94, row: 9, col: 8, category: 'actinide' },
  { symbol: 'Am', name: 'Americium', Z: 95, row: 9, col: 9, category: 'actinide' },
  { symbol: 'Cm', name: 'Curium', Z: 96, row: 9, col: 10, category: 'actinide' },
  { symbol: 'Bk', name: 'Berkelium', Z: 97, row: 9, col: 11, category: 'actinide' },
  { symbol: 'Cf', name: 'Californium', Z: 98, row: 9, col: 12, category: 'actinide' },
  { symbol: 'Es', name: 'Einsteinium', Z: 99, row: 9, col: 13, category: 'actinide' },
  { symbol: 'Fm', name: 'Fermium', Z: 100, row: 9, col: 14, category: 'actinide' },
  { symbol: 'Md', name: 'Mendelevium', Z: 101, row: 9, col: 15, category: 'actinide' },
  { symbol: 'No', name: 'Nobelium', Z: 102, row: 9, col: 16, category: 'actinide' },
  { symbol: 'Lr', name: 'Lawrencium', Z: 103, row: 9, col: 17, category: 'actinide' },
  { symbol: 'Rf', name: 'Rutherfordium', Z: 104, row: 7, col: 4, category: 'transition' },
  { symbol: 'Db', name: 'Dubnium', Z: 105, row: 7, col: 5, category: 'transition' },
  { symbol: 'Sg', name: 'Seaborgium', Z: 106, row: 7, col: 6, category: 'transition' },
  { symbol: 'Bh', name: 'Bohrium', Z: 107, row: 7, col: 7, category: 'transition' },
  { symbol: 'Hs', name: 'Hassium', Z: 108, row: 7, col: 8, category: 'transition' },
  { symbol: 'Mt', name: 'Meitnerium', Z: 109, row: 7, col: 9, category: 'transition' },
  { symbol: 'Ds', name: 'Darmstadtium', Z: 110, row: 7, col: 10, category: 'transition' },
  { symbol: 'Rg', name: 'Roentgenium', Z: 111, row: 7, col: 11, category: 'transition' },
  { symbol: 'Cn', name: 'Copernicium', Z: 112, row: 7, col: 12, category: 'transition' },
  { symbol: 'Nh', name: 'Nihonium', Z: 113, row: 7, col: 13, category: 'post-transition' },
  { symbol: 'Fl', name: 'Flerovium', Z: 114, row: 7, col: 14, category: 'post-transition' },
  { symbol: 'Mc', name: 'Moscovium', Z: 115, row: 7, col: 15, category: 'post-transition' },
  { symbol: 'Lv', name: 'Livermorium', Z: 116, row: 7, col: 16, category: 'post-transition' },
  { symbol: 'Ts', name: 'Tennessine', Z: 117, row: 7, col: 17, category: 'halogen' },
  { symbol: 'Og', name: 'Oganesson', Z: 118, row: 7, col: 18, category: 'noble' },
];

const CATEGORY_COLORS: Record<string, string> = {
  'nonmetal': '#22c55e',
  'noble': '#a855f7',
  'alkali': '#ef4444',
  'alkaline': '#f97316',
  'transition': '#3b82f6',
  'post-transition': '#6366f1',
  'metalloid': '#14b8a6',
  'halogen': '#eab308',
  'lanthanide': '#ec4899',
  'actinide': '#f43f5e',
};

const AVAILABLE_ELEMENTS: Record<string, number> = {};
atlas.elements.forEach(el => {
  AVAILABLE_ELEMENTS[el.symbol] = el.Z;
});

function PeriodicTable({ selectedZ, onSelectElement }: {
  selectedZ: number;
  onSelectElement: (Z: number) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="grid gap-0.5 min-w-[700px]" style={{ gridTemplateColumns: 'repeat(18, minmax(32px, 1fr))' }}>
        {Array.from({ length: 9 * 18 }).map((_, idx) => {
          const row = Math.floor(idx / 18) + 1;
          const col = (idx % 18) + 1;
          const element = PERIODIC_TABLE.find(el => el.row === row && el.col === col);

          if (!element) {
            return <div key={idx} className="h-8" />;
          }

          const hasSpectralData = element.symbol in AVAILABLE_ELEMENTS;
          const isSelected = element.Z === selectedZ;

          return (
            <Tooltip key={element.symbol}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelectElement(element.Z);
                  }}
                  className={`h-8 text-xs font-bold rounded transition-all flex items-center justify-center ${
                    isSelected
                      ? 'ring-2 ring-white ring-offset-1 ring-offset-[#0d1f33] scale-110 z-10'
                      : 'hover:scale-105 hover:brightness-125 cursor-pointer'
                  }`}
                  style={{
                    backgroundColor: CATEGORY_COLORS[element.category] || '#666',
                    color: '#fff',
                  }}
                  data-testid={`periodic-${element.symbol}`}
                >
                  {element.symbol}
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-[#1a3b47] border-[#4d9aaf]">
                <div className="text-center">
                  <div className="font-bold">{element.name}</div>
                  <div className="text-xs text-gray-400">Z = {element.Z}</div>
                  {hasSpectralData && (
                    <div className="text-xs text-green-400 mt-1">{ATLAS_ELEMENTS_MAP[element.Z]?.hydrogenicIon.label}</div>
                  )}
                  {!hasSpectralData && (
                    <div className="text-xs text-cyan-400 mt-1">Shell visualization available</div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-2 justify-center text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#22c55e' }} />
          <span className="text-gray-400">Nonmetal</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#a855f7' }} />
          <span className="text-gray-400">Noble Gas</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#3b82f6' }} />
          <span className="text-gray-400">Transition Metal</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ef4444' }} />
          <span className="text-gray-400">Alkali</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#22d3ee', border: '2px solid white' }} />
          <span className="text-gray-400">Available</span>
        </div>
      </div>
    </div>
  );
}

function wavelengthToRGB(wl: number): string {
  if (wl < 380 || wl > 700) return 'rgba(128, 128, 128, 0.6)';

  let r = 0, g = 0, b = 0;

  if (wl >= 380 && wl < 440) {
    r = -(wl - 440) / (440 - 380);
    g = 0;
    b = 1;
  } else if (wl >= 440 && wl < 490) {
    r = 0;
    g = (wl - 440) / (490 - 440);
    b = 1;
  } else if (wl >= 490 && wl < 510) {
    r = 0;
    g = 1;
    b = -(wl - 510) / (510 - 490);
  } else if (wl >= 510 && wl < 580) {
    r = (wl - 510) / (580 - 510);
    g = 1;
    b = 0;
  } else if (wl >= 580 && wl < 645) {
    r = 1;
    g = -(wl - 645) / (645 - 580);
    b = 0;
  } else if (wl >= 645 && wl <= 700) {
    r = 1;
    g = 0;
    b = 0;
  }

  let factor = 1.0;
  if (wl >= 380 && wl < 420) {
    factor = 0.3 + 0.7 * (wl - 380) / (420 - 380);
  } else if (wl >= 645 && wl <= 700) {
    factor = 0.3 + 0.7 * (700 - wl) / (700 - 645);
  }

  r = Math.round(255 * Math.pow(r * factor, 0.8));
  g = Math.round(255 * Math.pow(g * factor, 0.8));
  b = Math.round(255 * Math.pow(b * factor, 0.8));

  return `rgb(${r}, ${g}, ${b})`;
}

export default function SpectralAtlas() {
  const [selectedZ, setSelectedZ] = useState<number>(1);
  const [selectedSeries, setSelectedSeries] = useState<string[]>(['Balmer']);
  const anchorsOn = true;
  const iconicMode = true;
  const [hoveredLine, setHoveredLine] = useState<SpectralLine | null>(null);
  const [hoveredWell, setHoveredWell] = useState<number | null>(null);
  const [wavelengthRange, setWavelengthRange] = useState<[number, number]>([350, 700]);
  const [ringRadii] = useState<number[]>([0.80, 1.33, 1.72, 2.02, 2.27, 2.47, 2.70]);

  const latticeCanvasRef = useRef<HTMLCanvasElement>(null);
  const spectrumCanvasRef = useRef<HTMLCanvasElement>(null);

  const currentElement = useMemo(() => {
    return ATLAS_ELEMENTS_MAP[selectedZ] || generateSyntheticElement(selectedZ);
  }, [selectedZ]);

  const currentLines = useMemo(() => {
    return convertAtlasToSpectralLines(currentElement);
  }, [currentElement]);

  const seriesLimits = useMemo(() => {
    return getSeriesLimitsForElement(currentElement);
  }, [currentElement]);

  useEffect(() => {
    let minWl = Infinity;
    let maxWl = -Infinity;

    // First try to get range from seriesLimits
    selectedSeries.forEach(s => {
      const config = seriesLimits[s];
      if (config && config.range[0] > 0 && config.range[1] > 0) {
        minWl = Math.min(minWl, config.range[0]);
        maxWl = Math.max(maxWl, config.range[1]);
      }
    });

    // If seriesLimits didn't provide valid ranges, calculate from actual lines
    if (minWl === Infinity || maxWl === -Infinity || minWl <= 0 || maxWl <= 0) {
      const relevantLines = currentLines.filter(line => selectedSeries.includes(line.series));
      if (relevantLines.length > 0) {
        const wavelengths = relevantLines.map(l => l.wl_nm_display).filter(wl => wl > 0);
        if (wavelengths.length > 0) {
          minWl = Math.min(...wavelengths) * 0.9;
          maxWl = Math.max(...wavelengths) * 1.1;
        }
      }
    }

    // Final fallback to reasonable defaults
    if (minWl === Infinity || maxWl === -Infinity || minWl <= 0 || maxWl <= 0) {
      minWl = 50;
      maxWl = 2500;
    }

    setWavelengthRange([minWl, maxWl]);
  }, [selectedZ, seriesLimits, selectedSeries, currentLines]);

  const filteredLines = useMemo(() => {
    return currentLines.filter(line => {
      if (!selectedSeries.includes(line.series)) return false;
      if (line.wl_nm_display < wavelengthRange[0] || line.wl_nm_display > wavelengthRange[1]) return false;

      if (iconicMode) {
        const seriesConfig = seriesLimits[line.series];
        if (seriesConfig && line.n_upper > seriesConfig.maxN) return false;
      }

      return true;
    });
  }, [currentLines, selectedSeries, wavelengthRange, iconicMode, seriesLimits]);

  const uniqueWells = useMemo(() => {
    const wells = new Set<number>();
    filteredLines.forEach(line => {
      wells.add(line.n_upper);
      wells.add(line.n_lower);
    });
    return Array.from(wells).sort((a, b) => a - b);
  }, [filteredLines]);

  const destinationWells = useMemo(() => {
    return selectedSeries.map(s => SERIES_LOWER_N[s]).filter(n => n !== undefined);
  }, [selectedSeries]);

  const drawLattice = useCallback(() => {
    const canvas = latticeCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { left: 60, right: 20, top: 40, bottom: 50 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    const nMax = Math.max(...uniqueWells, 8);
    const sMax = Math.sqrt(2 * nMax + 2);

    const sToX = (s: number) => padding.left + (s / sMax) * plotWidth;

    ctx.strokeStyle = 'rgba(77, 154, 175, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + plotHeight);
    ctx.lineTo(padding.left + plotWidth, padding.top + plotHeight);
    ctx.stroke();

    ctx.fillStyle = 'rgba(77, 154, 175, 0.6)';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    for (let n = 1; n <= nMax; n++) {
      const s = Math.sqrt(2 * n);
      const x = sToX(s);
      ctx.fillText(`n=${n}`, x, padding.top + plotHeight + 20);
    }

    ctx.save();
    ctx.translate(15, padding.top + plotHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('U_anchor(s)', 0, 0);
    ctx.restore();

    ctx.beginPath();
    ctx.strokeStyle = anchorsOn ? 'rgba(77, 154, 175, 0.8)' : 'rgba(77, 154, 175, 0.3)';
    ctx.lineWidth = 2;

    const numPoints = 400;
    const epsilon = 0.01;
    const sStart = 0.5;

    const uAnchor = (s: number): number => {
      const s2 = s * s;
      if (anchorsOn) {
        return -Math.cos(Math.PI * s2) / (s2 + epsilon);
      } else {
        return -1 / (s2 + epsilon);
      }
    };

    let uMinCalc = Infinity;
    let uMaxCalc = -Infinity;
    const precomputed: { s: number; u: number }[] = [];

    for (let i = 0; i <= numPoints; i++) {
      const s = sStart + (i / numPoints) * (sMax - sStart);
      const u = uAnchor(s);
      precomputed.push({ s, u });
      uMinCalc = Math.min(uMinCalc, u);
      uMaxCalc = Math.max(uMaxCalc, u);
    }

    const uMargin = (uMaxCalc - uMinCalc) * 0.1;
    const uMin = uMinCalc - uMargin;
    const uMax = uMaxCalc + uMargin;

    const uToYScaled = (u: number) => {
      const normalized = (u - uMin) / (uMax - uMin);
      return padding.top + plotHeight * (1 - normalized);
    };

    for (let i = 0; i <= numPoints; i++) {
      const { s, u } = precomputed[i];

      const x = sToX(s);
      const y = uToYScaled(u);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    if (anchorsOn) {
      for (let k = 1; k <= nMax; k++) {
        const sBoundary = Math.sqrt(2 * k);
        const x = sToX(sBoundary);

        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(x, padding.top);
        ctx.lineTo(x, padding.top + plotHeight);
        ctx.stroke();
        ctx.setLineDash([]);

        if (k <= 4) {
          ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
          ctx.font = '8px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('barrier', x, padding.top + 12);
        }
      }

      for (let n = 1; n <= nMax; n++) {
        const sLeft = n === 1 ? 0.5 : Math.sqrt(2 * (n - 1));
        const sRight = Math.sqrt(2 * n);
        const sWell = Math.sqrt(2 * n - 1);
        const xLeft = sToX(sLeft);
        const xRight = sToX(sRight);
        const xWell = sToX(sWell);

        const isDestination = destinationWells.includes(n);

        if (isDestination) {
          ctx.fillStyle = 'rgba(34, 211, 238, 0.15)';
          ctx.fillRect(xLeft, padding.top, xRight - xLeft, plotHeight);
        }

        const uWell = uAnchor(sWell);
        const yWell = uToYScaled(uWell);

        ctx.beginPath();
        ctx.moveTo(xLeft, yWell);
        for (let i = 0; i <= 20; i++) {
          const s = sLeft + (i / 20) * (sRight - sLeft);
          const u = uAnchor(s);
          ctx.lineTo(sToX(s), uToYScaled(u));
        }
        ctx.lineTo(xRight, padding.top + plotHeight);
        ctx.lineTo(xLeft, padding.top + plotHeight);
        ctx.closePath();

        const fillAlpha = isDestination ? 0.25 : 0.1;
        ctx.fillStyle = isDestination
          ? `rgba(34, 211, 238, ${fillAlpha})`
          : `rgba(77, 154, 175, ${fillAlpha})`;
        ctx.fill();
      }
    }

    uniqueWells.forEach(n => {
      const sWell = Math.sqrt(2 * n - 1);
      const x = sToX(sWell);
      const u = uAnchor(sWell);
      const y = uToYScaled(u) - 15;

      const isHovered = hoveredWell === n ||
        (hoveredLine && (hoveredLine.n_upper === n || hoveredLine.n_lower === n));
      const isDestination = destinationWells.includes(n);
      const isHighlighted = isHovered || isDestination;

      ctx.beginPath();
      ctx.arc(x, y, isHighlighted ? 10 : 6, 0, Math.PI * 2);

      if (isHovered) {
        ctx.fillStyle = '#22d3ee';
      } else if (isDestination) {
        ctx.fillStyle = '#f59e0b';
      } else {
        ctx.fillStyle = '#4d9aaf';
      }
      ctx.fill();
      ctx.strokeStyle = isHighlighted ? '#fff' : 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = `${isHighlighted ? 'bold ' : ''}10px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(n), x, y);

      if (isDestination && !isHovered) {
        ctx.fillStyle = '#f59e0b';
        ctx.font = '9px Inter, sans-serif';
        ctx.textAlign = 'center';
        const seriesName = selectedSeries.find(s => SERIES_LOWER_N[s] === n) || '';
        ctx.fillText(`← ${seriesName}`, x, y + 18);
      }
    });

    if (hoveredLine) {
      const s1 = Math.sqrt(2 * hoveredLine.n_lower - 1);
      const s2 = Math.sqrt(2 * hoveredLine.n_upper - 1);
      const x1 = sToX(s1);
      const x2 = sToX(s2);
      const u1 = uAnchor(s1);
      const u2 = uAnchor(s2);
      const y1 = uToYScaled(u1) - 15;
      const y2 = uToYScaled(u2) - 15;

      const arrowColor = SERIES_COLORS[hoveredLine.series] || '#22d3ee';
      ctx.strokeStyle = arrowColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x1, y1);
      ctx.stroke();

      const angle = Math.atan2(y1 - y2, x1 - x2);
      const arrowLen = 10;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1 - arrowLen * Math.cos(angle - 0.4), y1 - arrowLen * Math.sin(angle - 0.4));
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1 - arrowLen * Math.cos(angle + 0.4), y1 - arrowLen * Math.sin(angle + 0.4));
      ctx.stroke();

      ctx.fillStyle = arrowColor;
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${hoveredLine.n_upper} → ${hoveredLine.n_lower}`, (x1 + x2) / 2, (y1 + y2) / 2 - 10);
    }

    ctx.fillStyle = 'rgba(77, 154, 175, 0.8)';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('AGQF Anchor Lattice', padding.left, 25);

    if (!anchorsOn) {
      ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText('(Anchors OFF — continuum)', padding.left + 160, 25);
    }
  }, [anchorsOn, uniqueWells, hoveredLine, hoveredWell, destinationWells, selectedSeries]);

  useEffect(() => {
    drawLattice();
  }, [drawLattice]);

  useEffect(() => {
    const canvas = spectrumCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { left: 60, right: 20, top: 40, bottom: 50 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    const [wlMin, wlMax] = wavelengthRange;
    const wlToX = (wl: number) => padding.left + ((wl - wlMin) / (wlMax - wlMin)) * plotWidth;

    WAVELENGTH_BANDS.forEach(band => {
      if (band.max > wlMin && band.min < wlMax) {
        const x1 = Math.max(wlToX(band.min), padding.left);
        const x2 = Math.min(wlToX(band.max), padding.left + plotWidth);
        ctx.fillStyle = band.color;
        ctx.fillRect(x1, padding.top, x2 - x1, plotHeight);

        if (x2 - x1 > 40) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.font = '11px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(band.name, (x1 + x2) / 2, padding.top + 15);
        }
      }
    });

    ctx.strokeStyle = 'rgba(77, 154, 175, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, padding.top + plotHeight);
    ctx.lineTo(padding.left + plotWidth, padding.top + plotHeight);
    ctx.stroke();

    ctx.fillStyle = 'rgba(77, 154, 175, 0.6)';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';

    const tickCount = 8;
    for (let i = 0; i <= tickCount; i++) {
      const wl = wlMin + (i / tickCount) * (wlMax - wlMin);
      const x = wlToX(wl);
      ctx.fillText(`${Math.round(wl)}`, x, padding.top + plotHeight + 20);
    }
    ctx.fillText('Wavelength (nm)', padding.left + plotWidth / 2, padding.top + plotHeight + 40);

    selectedSeries.forEach(series => {
      const seriesConfig = seriesLimits[series];
      if (!seriesConfig) return;

      const limitX = wlToX(seriesConfig.limit);
      if (limitX >= padding.left && limitX <= padding.left + plotWidth) {
        ctx.strokeStyle = SERIES_COLORS[series] || '#4d9aaf';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(limitX, padding.top);
        ctx.lineTo(limitX, padding.top + plotHeight);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        ctx.fillStyle = SERIES_COLORS[series] || '#4d9aaf';
        ctx.font = '9px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${series} limit`, limitX + 3, padding.top + 28);
      }
    });

    const stickHeight = plotHeight * 0.7;

    filteredLines.forEach((line) => {
      const x = wlToX(line.wl_nm_display);
      if (x < padding.left || x > padding.left + plotWidth) return;

      const isHighlighted = hoveredLine === line ||
        hoveredWell === line.n_upper || hoveredWell === line.n_lower;

      const wl = line.wl_nm_display;
      const isVisible = wl >= 380 && wl <= 700;

      let color: string;
      if (isHighlighted) {
        color = '#fff';
      } else if (isVisible) {
        color = wavelengthToRGB(wl);
      } else {
        color = 'rgba(128, 128, 128, 0.6)';
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = isHighlighted ? 3 : 2;

      ctx.beginPath();
      ctx.moveTo(x, padding.top + plotHeight);
      ctx.lineTo(x, padding.top + plotHeight - stickHeight);
      ctx.stroke();

      if (line.series === 'Balmer' && BALMER_LABELS[line.n_upper] && selectedSeries.length <= 2) {
        ctx.fillStyle = isHighlighted ? '#fff' : color;
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.textAlign = 'center';
        const label = `${BALMER_LABELS[line.n_upper]} (${line.n_upper}→${line.n_lower})`;
        ctx.fillText(label, x, padding.top + plotHeight - stickHeight - 8);
      }
    });

    ctx.fillStyle = 'rgba(77, 154, 175, 0.8)';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'left';
    const elementLabel = currentElement?.hydrogenicIon.label || 'Spectrum';
    ctx.fillText(`${elementLabel} — Emission Spectrum`, padding.left, 28);
  }, [selectedZ, currentElement, filteredLines, wavelengthRange, hoveredLine, hoveredWell, selectedSeries, seriesLimits]);

  const handleSpectrumHover = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = spectrumCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const padding = { left: 60, right: 20 };
    const plotWidth = rect.width - padding.left - padding.right;
    const [wlMin, wlMax] = wavelengthRange;

    const hoverWl = wlMin + ((x - padding.left) / plotWidth) * (wlMax - wlMin);

    let closest: SpectralLine | null = null;
    let minDist = Infinity;

    filteredLines.forEach(line => {
      const dist = Math.abs(line.wl_nm_display - hoverWl);
      const threshold = (wlMax - wlMin) / plotWidth * 5;
      if (dist < threshold && dist < minDist) {
        minDist = dist;
        closest = line;
      }
    });

    setHoveredLine(closest);
    if (closest) setHoveredWell(null);
  }, [filteredLines, wavelengthRange]);

  const handleLatticeHover = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = latticeCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const padding = { left: 60, right: 20, top: 40, bottom: 50 };
    const plotWidth = rect.width - padding.left - padding.right;
    const plotHeight = rect.height - padding.top - padding.bottom;

    const nMax = Math.max(...uniqueWells, 8);
    const sMax = Math.sqrt(2 * nMax + 2);
    const epsilon = 0.01;
    const sStart = 0.5;

    const uAnchorHover = (s: number): number => {
      const s2 = s * s;
      if (anchorsOn) {
        return -Math.cos(Math.PI * s2) / (s2 + epsilon);
      } else {
        return -1 / (s2 + epsilon);
      }
    };

    let uMinCalc = Infinity;
    let uMaxCalc = -Infinity;
    for (let i = 0; i <= 100; i++) {
      const s = sStart + (i / 100) * (sMax - sStart);
      const u = uAnchorHover(s);
      uMinCalc = Math.min(uMinCalc, u);
      uMaxCalc = Math.max(uMaxCalc, u);
    }
    const uMargin = (uMaxCalc - uMinCalc) * 0.1;
    const uMin = uMinCalc - uMargin;
    const uMax = uMaxCalc + uMargin;

    let closestWell: number | null = null;
    let minDist = Infinity;

    uniqueWells.forEach(n => {
      const sWell = Math.sqrt(2 * n - 1);
      const wellX = padding.left + (sWell / sMax) * plotWidth;
      const u = uAnchorHover(sWell);
      const normalized = (u - uMin) / (uMax - uMin);
      const wellY = padding.top + plotHeight * (1 - normalized) - 15;

      const dist = Math.sqrt((mouseX - wellX) ** 2 + (mouseY - wellY) ** 2);
      if (dist < 20 && dist < minDist) {
        minDist = dist;
        closestWell = n;
      }
    });

    setHoveredWell(closestWell);
    if (closestWell) setHoveredLine(null);
  }, [uniqueWells, anchorsOn]);

  const computeWavelengthRange = useCallback((seriesList: string[]): [number, number] => {
    if (seriesList.length === 0) return [50, 2500];

    let minWl = Infinity;
    let maxWl = -Infinity;

    seriesList.forEach(s => {
      const config = seriesLimits[s];
      if (config) {
        minWl = Math.min(minWl, config.range[0]);
        maxWl = Math.max(maxWl, config.range[1]);
      }
    });

    if (minWl === Infinity) return [50, 2500];
    return [minWl, maxWl];
  }, [seriesLimits]);

  const toggleSeries = (series: string) => {
    const isCurrentlySelected = selectedSeries.includes(series);

    if (isCurrentlySelected && selectedSeries.length === 1) {
      const allSeries = ['Lyman', 'Balmer', 'Paschen', 'Brackett', 'Pfund', 'Humphreys'];
      setSelectedSeries(allSeries);
      setWavelengthRange(computeWavelengthRange(allSeries));
    } else if (isCurrentlySelected) {
      const newSeries = selectedSeries.filter(s => s !== series);
      setSelectedSeries(newSeries);
      setWavelengthRange(computeWavelengthRange(newSeries));
    } else {
      setSelectedSeries([series]);
      if (seriesLimits[series]) {
        setWavelengthRange(seriesLimits[series].range);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/tools">
            <Button variant="ghost" className="text-[#4d9aaf] hover:text-white hover:bg-[#1a3b47]">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Tools
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-[#4d9aaf]">
            <Atom className="inline-block w-8 h-8 mr-2" />
            Hydrogenic Spectral Atlas
          </h1>
        </div>

        <div className="bg-[#0d1f33] rounded-lg p-4 mb-4 border border-[#4d9aaf]/20">
          <h3 className="text-[#6bc4d9] font-bold mb-3 text-center text-3xl">Quantized Atomic Anchor Wells</h3>
          <div className="relative">
            <div className="absolute top-2 left-2 z-10 text-[#6bc4d9] text-lg">
              <InlineMath math="\circledcirc_{\text{AGQF}}(u) = \circledcirc\left(\tfrac{1}{2}+Iu\right) \times \sin^m\left(\tfrac{\pi u^2}{2}\right)" />
            </div>
            <AGQFViewer
              className="h-[450px] rounded-lg overflow-hidden"
              autoRotate={true}
              selectedZ={selectedZ}
              selectedSeries={selectedSeries}
              ringRadii={ringRadii}
            />
          </div>
          <SpectrumStrip
            lines={filteredLines}
            selectedSeries={selectedSeries}
            wavelengthRange={wavelengthRange}
          />
        </div>

        <div className="bg-[#0d1f33] rounded-lg p-4 mb-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-base text-[#4d9aaf]">Selected Element:</span>
              <span className="text-xl font-bold text-[#22d3ee]">
                {currentElement?.name || 'Hydrogen'} ({currentElement?.hydrogenicIon.label || 'H I'})
              </span>
              {!ATLAS_ELEMENTS_MAP[selectedZ] && (
                <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded border border-amber-500/30">
                  Calculated (Rydberg)
                </span>
              )}
              {ATLAS_ELEMENTS_MAP[selectedZ] && (
                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded border border-green-500/30">
                  Empirical Data
                </span>
              )}
            </div>

            <div className="h-6 w-px bg-[#4d9aaf]/30" />

            <div className="flex items-center gap-3">
              <span className="text-base text-[#4d9aaf]">Series:</span>
              {Object.entries(SERIES_COLORS).map(([series, color]) => (
                <button
                  key={series}
                  onClick={() => toggleSeries(series)}
                  className={`px-2 py-1 text-sm rounded transition-all ${
                    selectedSeries.includes(series)
                      ? 'opacity-100'
                      : 'opacity-30'
                  }`}
                  style={{
                    backgroundColor: selectedSeries.includes(series) ? color : 'transparent',
                    border: `1px solid ${color}`,
                    color: selectedSeries.includes(series) ? '#fff' : color
                  }}
                  data-testid={`series-${series}`}
                >
                  {series}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#0d1f33] rounded-lg p-4 border border-[#4d9aaf]/20">
          <h3 className="text-[#4d9aaf] font-semibold mb-3 text-center">Select Element</h3>
          <PeriodicTable
            selectedZ={selectedZ}
            onSelectElement={setSelectedZ}
          />
        </div>

        {/* AGQF Theory Section */}
        <AGQFTheorySection />

        <div className="mt-4 text-xs text-gray-500 text-center">
          Data: Dirac + Lamb (minimal) model predictions for hydrogenic atoms. Model: RQM Spectral Geometry.
        </div>
      </div>
    </div>
  );
}

function AGQFTheorySection() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'quaternionic-factorial',
      title: '1. The Baseline Quaternionic Factorial (◎)',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            Everything starts from the quaternionic Laplace / Gamma kernel. For a quaternionic argument <InlineMath math="q" />:
          </p>
          <div className="bg-[#0a1628] p-4 rounded-lg border border-[#4d9aaf]/30">
            <BlockMath math="\circledcirc(q) = \int_{0}^{\infty} e^{-x} \cdot e^{q \log x} \, dx" />
          </div>
          <p className="text-gray-300">
            On the <span className="text-[#6bc4d9] font-semibold">critical slice</span> (the standard working slice):
          </p>
          <div className="bg-[#0a1628] p-3 rounded-lg">
            <BlockMath math="q = \tfrac{1}{2} + Iu" />
          </div>
          <p className="text-gray-300">
            This reduces to a Gamma function with a geometric interpretation:
          </p>
          <div className="bg-[#0a1628] p-4 rounded-lg border border-[#4d9aaf]/30">
            <BlockMath math="\circledcirc\left(\tfrac{1}{2}+Iu\right) = \Re\Gamma\left(\tfrac{3}{2}+iu\right) + I \cdot \Im\Gamma\left(\tfrac{3}{2}+iu\right)" />
          </div>
          <p className="text-gray-400 text-sm italic">
            This object by itself is <strong>smooth</strong> — it does not quantize yet.
          </p>
        </div>
      )
    },
    {
      id: 'anchor-prefactor',
      title: '2. The Anchor-Generating Prefactor',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            To create <span className="text-[#f59e0b] font-semibold">discrete wells</span>, we introduce a <strong>quadratic sine prefactor</strong>:
          </p>
          <div className="bg-[#0a1628] p-4 rounded-lg border border-[#f59e0b]/30">
            <BlockMath math="K_m(u) = \sin^m\left(\frac{\pi u^2}{2}\right)" />
          </div>
          <p className="text-gray-300 mb-2">This does three crucial things:</p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-[#ef4444] font-bold">•</span>
              <span><strong>Zeros</strong> at <InlineMath math="u^2 = 2k" /> (walls / forbidden regions)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#22c55e] font-bold">•</span>
              <span><strong>Wells</strong> near <InlineMath math="u^2 = 2k+1" /> (stable states)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#6bc4d9] font-bold">•</span>
              <span><strong>Quadratic spacing</strong> matching SU(2)/S³ overtone structure</span>
            </li>
          </ul>
          <p className="text-gray-400 text-sm italic mt-3">
            The power <InlineMath math="m" /> controls how "hard" the walls are.
          </p>
        </div>
      )
    },
    {
      id: 'agqf-kernel',
      title: '3. The AGQF Kernel (◎ as an Anchor Generator)',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            The <span className="text-[#6bc4d9] font-semibold">Anchor-Generating Quaternionic Factorial</span> is:
          </p>
          <div className="bg-[#0a1628] p-4 rounded-lg border border-[#6bc4d9]/40">
            <BlockMath math="\circledcirc_{\text{AGQF}}(u) = \circledcirc\left(\tfrac{1}{2}+Iu\right) \times \sin^m\left(\frac{\pi u^2}{2}\right)" />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#0a1628] p-3 rounded-lg text-center">
              <div className="text-[#a855f7] font-bold mb-1">◎</div>
              <div className="text-xs text-gray-400">Smooth resonance engine</div>
            </div>
            <div className="bg-[#0a1628] p-3 rounded-lg text-center">
              <div className="text-[#f59e0b] font-bold mb-1">sin<sup>m</sup>(...)</div>
              <div className="text-xs text-gray-400">Geometry-imposed confinement</div>
            </div>
            <div className="bg-[#0a1628] p-3 rounded-lg text-center">
              <div className="text-[#22d3ee] font-bold mb-1">◎ × sin<sup>m</sup></div>
              <div className="text-xs text-gray-400">Discrete resonance landscape</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'anchor-potential',
      title: '4. The Anchor-Well Potential',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">
            To turn this into a <span className="text-[#22d3ee] font-semibold">physical well structure</span>, we take the logarithmic potential:
          </p>
          <div className="bg-[#0a1628] p-4 rounded-lg border border-[#22d3ee]/40">
            <BlockMath math="U_{\text{anchor}}(u) = -\beta \cdot \log\left[\sin^m\left(\frac{\pi u^2}{2}\right) + \delta\right]" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-[#0a1628] p-3 rounded-lg">
              <div className="text-[#4d9aaf] font-bold mb-1"><InlineMath math="\beta" /></div>
              <div className="text-sm text-gray-400">Sets depth (energy scale)</div>
            </div>
            <div className="bg-[#0a1628] p-3 rounded-lg">
              <div className="text-[#4d9aaf] font-bold mb-1"><InlineMath math="\delta" /></div>
              <div className="text-sm text-gray-400">Softens singularities (numerical & physical realism)</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'wells-and-gaps',
      title: '5. Where the Wells and Gaps Are',
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">From this formula, we can explicitly locate:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-[#0a1628] p-4 rounded-lg border border-[#ef4444]/30">
              <div className="text-[#ef4444] font-bold mb-2">Zero Walls (Forbidden / Unstable)</div>
              <BlockMath math="u^2 = 2k \quad (k \in \mathbb{Z})" />
              <div className="text-xs text-gray-500 mt-2">These are the barriers between quantum states</div>
            </div>
            <div className="bg-[#0a1628] p-4 rounded-lg border border-[#22c55e]/30">
              <div className="text-[#22c55e] font-bold mb-2">Anchor Wells (Stable Orbital States)</div>
              <BlockMath math="u^2 \approx 2k+1" />
              <div className="text-xs text-gray-500 mt-2">These are the allowed quantum states</div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-[#1a3b47]/50 rounded-lg border border-[#4d9aaf]/30">
            <p className="text-[#6bc4d9] font-semibold text-center">
              This is <strong>why quantization appears</strong>: not by assumption, but because stable equilibria only exist in these regions.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'physical-meaning',
      title: '6. The Physical Meaning',
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#1a3b47] to-[#0d1f33] p-6 rounded-lg border border-[#4d9aaf]/40">
            <blockquote className="text-[#6bc4d9] text-lg italic text-center leading-relaxed">
              "The AGQF anchor wells are created by forcing the quaternionic resonance kernel to live between quadratic sine-imposed cancellation surfaces, producing discrete, stable resonance states."
            </blockquote>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-[#0a1628] p-3 rounded-lg text-center">
              <div className="text-2xl mb-1">🌀</div>
              <div className="text-[#a855f7] font-bold text-sm">Stable States</div>
              <div className="text-xs text-gray-400">= Atomic orbitals</div>
            </div>
            <div className="bg-[#0a1628] p-3 rounded-lg text-center">
              <div className="text-2xl mb-1">📊</div>
              <div className="text-[#22d3ee] font-bold text-sm">Gaps Between</div>
              <div className="text-xs text-gray-400">= What spectroscopy measures</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="mt-6 bg-[#0d1f33] rounded-lg p-4 border border-[#4d9aaf]/20">
      <h3 className="text-xl font-bold text-[#6bc4d9] mb-4 text-center">
        AGQF Theory: How Anchor Wells Create Quantization
      </h3>

      <div className="space-y-2">
        {sections.map((section) => (
          <div key={section.id} className="border border-[#4d9aaf]/20 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-3 bg-[#0a1628] hover:bg-[#1a3b47] transition-colors"
              data-testid={`agqf-section-${section.id}`}
            >
              <span className="text-[#4d9aaf] font-semibold text-sm md:text-base">{section.title}</span>
              {expandedSection === section.id ? (
                <ChevronUp className="w-5 h-5 text-[#4d9aaf]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#4d9aaf]" />
              )}
            </button>
            {expandedSection === section.id && (
              <div className="p-4 bg-[#0d1f33] text-sm">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Link href="/chapter-6-agqf-hub">
          <Button variant="outline" className="border-[#4d9aaf] text-[#4d9aaf] hover:bg-[#4d9aaf] hover:text-white">
            Read Full Chapter 6: AGQF Theory
          </Button>
        </Link>
      </div>
    </div>
  );
}
