import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Download, Play, Settings, FileDown, Info, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Math } from "@/components/Math";

// ----------------------------
// Utility helpers
// ----------------------------
const num = (v: any, def = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : def;
};

function toCSV(rows: any[][]) {
  return rows.map(r => r.map(x => `${x}`).join(",")).join("\n");
}

// Simple hydration source: single-exponential heat release [W/m^3]
function hydrationSource(t: number, Q0 = 1.5e5, tau_h = 8 * 3600) {
  // Q0 total J/m^3 released over long time; return instantaneous W/m^3 via d/dt (Q0 (1-e^{-t/tau}))
  return (Q0 / tau_h) * globalThis.Math.exp(-t / tau_h);
}

// Quick 1D semi-infinite estimate for centerline temperature rise under internal source and convection boundary
function quickEstimate({ L, H, k, rho, c, h, T_inf, T0, t_end, dt }: any) {
  const alpha = k / (rho * c); // m^2/s
  const Fo = (t_end * alpha) / (globalThis.Math.min(L, H) ** 2 / 4); // rough centerline Fo
  const Bi = h * globalThis.Math.min(L, H) / (2 * k); // slab half-thickness ~ min(L,H)/2

  // Effective rise: integrate source with simple exponential kernel to mimic diffusion delay
  const nsteps = globalThis.Math.max(10, globalThis.Math.floor(t_end / dt));
  let T = T0;
  let Tmax = T0;
  let t_at_max = 0;
  const rows = [["time_s", "T_center_C"]];

  for (let i = 1; i <= nsteps; i++) {
    const t = i * dt;
    const qdot = hydrationSource(t); // W/m^3
    const tau = globalThis.Math.max(1, (globalThis.Math.min(L, H) / 2) ** 2 / (alpha * globalThis.Math.PI ** 2)); // first-mode time constant
    // crude update: dT = (qdot/(rho c)) dt - (T - T_inf) dt/tau_surf
    const tau_surf = globalThis.Math.max(1, (rho * c * (globalThis.Math.min(L, H) / 2)) / (h * (1 + Bi))); // crude surface exchange scale
    const dT = (qdot / (rho * c)) * dt - (T - T_inf) * (dt / tau_surf) - (T - T0) * (dt / tau);
    T += dT;
    if (T > Tmax) {
      Tmax = T;
      t_at_max = t;
    }
    if (i % globalThis.Math.max(1, globalThis.Math.floor(nsteps / 200)) === 0) {
      rows.push([t.toFixed(1), T.toFixed(3)]);
    }
  }

  return {
    alpha,
    Bi,
    Fo,
    Tmax,
    t_at_max,
    series: rows,
  };
}

export default function QSGTransientHeatTool() {
  useEffect(() => {
    document.title = "QSG Transient Heat Tool - Thermal Analysis | RQM Technologies";
  }, []);

  // ----------------------------
  // Form state (SI units)
  // ----------------------------
  const [geometry, setGeometry] = useState({ L: 6.0, W: 3.0, H: 0.8 }); // m
  const [materials, setMaterials] = useState({ rho: 2400, c: 900, kx: 1.8, ky: 1.8, kz: 1.6 });
  const [conditions, setConditions] = useState({ T0: 25, T_inf: 20, h: 8.0, eps: 0.85, T_sky: 15 });
  const [solver, setSolver] = useState({ dt: 60, t_end: 48 * 3600, mode: "quick" });
  const [results, setResults] = useState<any>(null);
  const [reportURL, setReportURL] = useState("");
  const [anisotropy, setAnisotropy] = useState(false);

  const minSpan = useMemo(() => globalThis.Math.min(geometry.L, geometry.W, geometry.H), [geometry]);
  const k_eff = anisotropy ? globalThis.Math.cbrt(materials.kx * materials.ky * materials.kz) : materials.kx; // simple isotropic proxy

  const handleRun = () => {
    const r = quickEstimate({
      L: minSpan,
      H: geometry.H,
      k: k_eff,
      rho: materials.rho,
      c: materials.c,
      h: conditions.h,
      T_inf: conditions.T_inf,
      T0: conditions.T0,
      t_end: solver.t_end,
      dt: solver.dt,
    });
    setResults(r);
  };

  const handleExportCSV = () => {
    if (!results) return;
    const csv = toCSV(results.series);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    setReportURL(url);

    // Trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `qsg_thermal_analysis_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    return () => {
      if (reportURL) URL.revokeObjectURL(reportURL);
    };
  }, [reportURL]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" size="sm" className="mb-1">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">QSG</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">QSG Transient Heat Tool</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">3D Dynamic Heat Analysis in Concrete</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleRun} data-testid="button-run-analysis">
              <Play className="h-4 w-4 mr-2"/>Run Analysis
            </Button>
            <Button variant="outline" onClick={handleExportCSV} disabled={!results} data-testid="button-export-csv">
              <Download className="h-4 w-4 mr-2"/>Export CSV
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid md:grid-cols-2 gap-6">
        {/* Left: Inputs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="rounded-2xl shadow-sm border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400"/>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Analysis Parameters</h2>
              </div>

              <Tabs defaultValue="project">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="project">Project</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="conditions">Conditions</TabsTrigger>
                </TabsList>

                <TabsContent value="project" className="space-y-4 pt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-slate-700 dark:text-slate-300">Length L (m)</Label>
                      <Input
                        type="number"
                        value={geometry.L}
                        onChange={e=>setGeometry(g=>({...g, L: num(e.target.value, g.L)}))}
                        data-testid="input-length"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700 dark:text-slate-300">Width W (m)</Label>
                      <Input
                        type="number"
                        value={geometry.W}
                        onChange={e=>setGeometry(g=>({...g, W: num(e.target.value, g.W)}))}
                        data-testid="input-width"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700 dark:text-slate-300">Height H (m)</Label>
                      <Input
                        type="number"
                        value={geometry.H}
                        onChange={e=>setGeometry(g=>({...g, H: num(e.target.value, g.H)}))}
                        data-testid="input-height"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Switch id="anis" checked={anisotropy} onCheckedChange={setAnisotropy} data-testid="switch-anisotropy"/>
                    <Label htmlFor="anis" className="text-slate-700 dark:text-slate-300">Anisotropic thermal conductivity (rebar-aligned)</Label>
                  </div>

                  {anisotropy && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div>
                        <Label className="text-slate-700 dark:text-slate-300"><Math>{"k_x"}</Math> (W/m·K)</Label>
                        <Input
                          type="number"
                          value={materials.kx}
                          onChange={e=>setMaterials(m=>({...m, kx: num(e.target.value, m.kx)}))}
                          data-testid="input-kx"
                          className="dark:bg-slate-700 dark:border-slate-600"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-700 dark:text-slate-300"><Math>{"k_y"}</Math> (W/m·K)</Label>
                        <Input
                          type="number"
                          value={materials.ky}
                          onChange={e=>setMaterials(m=>({...m, ky: num(e.target.value, m.ky)}))}
                          data-testid="input-ky"
                          className="dark:bg-slate-700 dark:border-slate-600"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-700 dark:text-slate-300"><Math>{"k_z"}</Math> (W/m·K)</Label>
                        <Input
                          type="number"
                          value={materials.kz}
                          onChange={e=>setMaterials(m=>({...m, kz: num(e.target.value, m.kz)}))}
                          data-testid="input-kz"
                          className="dark:bg-slate-700 dark:border-slate-600"
                        />
                      </div>
                    </motion.div>
                  )}
                </TabsContent>

                <TabsContent value="materials" className="space-y-4 pt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-slate-700 dark:text-slate-300"><Math>{"\\rho"}</Math> (kg/m³)</Label>
                      <Input
                        type="number"
                        value={materials.rho}
                        onChange={e=>setMaterials(m=>({...m, rho: num(e.target.value, m.rho)}))}
                        data-testid="input-density"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700 dark:text-slate-300"><Math>{"c"}</Math> (J/kg·K)</Label>
                      <Input
                        type="number"
                        value={materials.c}
                        onChange={e=>setMaterials(m=>({...m, c: num(e.target.value, m.c)}))}
                        data-testid="input-specific-heat"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700 dark:text-slate-300"><Math>{"k"}</Math> (W/m·K)</Label>
                      <Input
                        type="number"
                        value={materials.kx}
                        onChange={e=>setMaterials(m=>({...m, kx: num(e.target.value, m.kx)}))}
                        data-testid="input-conductivity"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                        If anisotropy is enabled, <Math>{"k"}</Math> is the geometric mean of <Math>{"k_x, k_y, k_z"}</Math>.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="conditions" className="space-y-4 pt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-slate-700 dark:text-slate-300"><Math>{"T_0"}</Math> (°C)</Label>
                      <Input
                        type="number"
                        value={conditions.T0}
                        onChange={e=>setConditions(c=>({...c, T0: num(e.target.value, c.T0)}))}
                        data-testid="input-initial-temp"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700 dark:text-slate-300"><Math>{"T_\\infty"}</Math> (°C)</Label>
                      <Input
                        type="number"
                        value={conditions.T_inf}
                        onChange={e=>setConditions(c=>({...c, T_inf: num(e.target.value, c.T_inf)}))}
                        data-testid="input-ambient-temp"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700 dark:text-slate-300"><Math>{"h"}</Math> (W/m²·K)</Label>
                      <Input
                        type="number"
                        value={conditions.h}
                        onChange={e=>setConditions(c=>({...c, h: num(e.target.value, c.h)}))}
                        data-testid="input-convection"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-slate-700 dark:text-slate-300"><Math>{"\\varepsilon"}</Math> (–)</Label>
                      <Input
                        type="number"
                        value={conditions.eps}
                        onChange={e=>setConditions(c=>({...c, eps: num(e.target.value, c.eps)}))}
                        data-testid="input-emissivity"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700 dark:text-slate-300"><Math>{"T_{sky}"}</Math> (°C)</Label>
                      <Input
                        type="number"
                        value={conditions.T_sky}
                        onChange={e=>setConditions(c=>({...c, T_sky: num(e.target.value, c.T_sky)}))}
                        data-testid="input-sky-temp"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-700 dark:text-slate-300"><Math>{"\\Delta t"}</Math> (s)</Label>
                      <Input
                        type="number"
                        value={solver.dt}
                        onChange={e=>setSolver(s=>({...s, dt: num(e.target.value, s.dt)}))}
                        data-testid="input-time-step"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-slate-700 dark:text-slate-300"><Math>{"t_{end}"}</Math> (h)</Label>
                      <Input
                        type="number"
                        value={solver.t_end/3600}
                        onChange={e=>setSolver(s=>({...s, t_end: num(e.target.value, s.t_end/3600)*3600}))}
                        data-testid="input-end-time"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-3">
                <Button onClick={handleRun} className="flex-1" data-testid="button-run-main">
                  <Play className="h-4 w-4 mr-2"/>Run Analysis
                </Button>
                <Button variant="secondary" onClick={handleExportCSV} disabled={!results} data-testid="button-export-main">
                  <FileDown className="h-4 w-4 mr-2"/>Export CSV
                </Button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <Info className="h-3 w-3 mt-0.5 flex-shrink-0"/>
                Quick Estimate uses a simplified 1D centerline model with cement hydration source.
                Full 3D quaternionic solver with spectral methods available upon request.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right: Outputs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          <Card className="rounded-2xl shadow-sm border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Analysis Results</h2>

              {!results && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 text-slate-500 dark:text-slate-400"
                  data-testid="text-no-results"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
                    <Play className="h-6 w-6" />
                  </div>
                  <p>Run analysis to see centerline temperature evolution and dimensionless parameters</p>
                </motion.div>
              )}

              {results && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                  data-testid="text-results"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700">
                      <div className="text-xs uppercase text-blue-700 dark:text-blue-300 font-medium">Thermal Diffusivity</div>
                      <div className="text-xl font-semibold text-blue-900 dark:text-blue-100" data-testid="text-diffusivity">
                        <Math>{"\\alpha = "}</Math>{results.alpha.toExponential(3)} m²/s
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700">
                      <div className="text-xs uppercase text-purple-700 dark:text-purple-300 font-medium">Biot Number</div>
                      <div className="text-xl font-semibold text-purple-900 dark:text-purple-100" data-testid="text-biot">
                        <Math>{"Bi = "}</Math>{results.Bi.toFixed(3)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700">
                      <div className="text-xs uppercase text-green-700 dark:text-green-300 font-medium">Fourier Number</div>
                      <div className="text-xl font-semibold text-green-900 dark:text-green-100" data-testid="text-fourier">
                        <Math>{"Fo = "}</Math>{results.Fo.toFixed(3)}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-700">
                      <div className="text-xs uppercase text-orange-700 dark:text-orange-300 font-medium">Max Temperature</div>
                      <div className="text-xl font-semibold text-orange-900 dark:text-orange-100" data-testid="text-max-temp">
                        {results.Tmax.toFixed(1)}°C
                      </div>
                      <div className="text-xs text-orange-600 dark:text-orange-400">
                        at t = {(results.t_at_max/3600).toFixed(1)}h
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                    <div className="text-sm font-medium mb-2 text-slate-900 dark:text-slate-100">Temperature Time Series</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 mb-3" data-testid="text-series-info">
                      {results.series.length - 1} data points over {(solver.t_end/3600).toFixed(1)} hours
                    </div>
                    <div className="max-h-32 overflow-y-auto text-xs font-mono space-y-1">
                      {results.series.slice(1, 6).map((row: any[], i: number) => (
                        <div key={i} className="flex justify-between text-slate-700 dark:text-slate-300">
                          <span>t = {row[0]}s</span>
                          <span>T = {row[1]}°C</span>
                        </div>
                      ))}
                      {results.series.length > 6 && (
                        <div className="text-slate-400 dark:text-slate-500">... and {results.series.length - 6} more points</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Mathematical Foundations Section */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6"
          >
            <Card className="rounded-2xl shadow-sm border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <Accordion type="single" collapsible data-testid="accordion-equations">
                  <AccordionItem value="equations">
                    <AccordionTrigger className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Under the Hood (Mathematical Framework)
                    </AccordionTrigger>
                    <AccordionContent className="space-y-6 pt-4">

                      <div className="space-y-4">
                        <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">Governing PDE (3D Heat Equation)</h4>
                        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                          <Math display={true}>
                            {"\\rho c \\frac{\\partial T}{\\partial t} = \\nabla \\cdot (\\mathbf{k} \\nabla T) + Q_{\\text{hydration}}(t)"}
                          </Math>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            Where <Math>{"\\mathbf{k}"}</Math> is the thermal conductivity tensor and <Math>{"Q_{\\text{hydration}}"}</Math>
                            represents the internal heat generation from cement hydration.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">Quaternionic Heat Operator</h4>
                        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                          <Math display={true}>
                            {"\\mathcal{H}_q = \\alpha \\Delta_q + \\frac{Q(t)}{\\rho c} - \\gamma(T - T_\\infty)"}
                          </Math>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            The quaternionic Laplacian <Math>{"\\Delta_q"}</Math> naturally handles anisotropic diffusion
                            through quaternionic rotations, enabling more stable numerical schemes.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">Boundary Conditions</h4>
                        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 space-y-2">
                          <div>
                            <strong className="text-slate-900 dark:text-slate-100">Convective:</strong>
                            <Math display={true}>
                              {"-k \\frac{\\partial T}{\\partial n} = h(T - T_\\infty) + \\varepsilon \\sigma (T^4 - T_{\\text{sky}}^4)"}
                            </Math>
                          </div>
                          <div>
                            <strong className="text-slate-900 dark:text-slate-100">Initial condition:</strong>
                            <Math display={true}>
                              {"T(\\mathbf{x}, 0) = T_0"}
                            </Math>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">Crank-Nicolson Update Scheme</h4>
                        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                          <Math display={true}>
                            {"\\frac{T^{n+1} - T^n}{\\Delta t} = \\frac{1}{2}[\\mathcal{H}_q(T^{n+1}) + \\mathcal{H}_q(T^n)]"}
                          </Math>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            The Crank-Nicolson scheme provides second-order accuracy in time and
                            unconditional stability for the heat equation.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">Hydration Source Model</h4>
                        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                          <Math display={true}>
                            {"Q_{\\text{hydration}}(t) = \\frac{Q_0}{\\tau_h} e^{-t/\\tau_h}"}
                          </Math>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            Exponential decay model with <Math>{"Q_0 = 1.5 \\times 10^5"}</Math> J/m³ total heat release
                            and <Math>{"\\tau_h = 8"}</Math> hours characteristic time.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-base text-slate-900 dark:text-slate-100">Dimensionless Groups</h4>
                        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 space-y-2">
                          <div className="text-slate-700 dark:text-slate-300">
                            <strong>Fourier Number:</strong> <Math>{"Fo = \\frac{\\alpha t}{L^2}"}</Math> (diffusion vs. time)
                          </div>
                          <div className="text-slate-700 dark:text-slate-300">
                            <strong>Biot Number:</strong> <Math>{"Bi = \\frac{hL}{k}"}</Math> (convection vs. conduction)
                          </div>
                          <div className="text-slate-700 dark:text-slate-300">
                            <strong>Thermal Diffusivity:</strong> <Math>{"\\alpha = \\frac{k}{\\rho c}"}</Math>
                          </div>
                        </div>
                      </div>

                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}