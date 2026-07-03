import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import { useEffect, lazy, Suspense } from "react";
import PageLoadingFallback from "@/components/PageLoadingFallback";
import { RQMChatWidget } from "@/components/RQMChatWidget";
import { ThemeProvider } from "@/components/ThemeProvider";
import SkipToContent from "@/components/SkipToContent";
import ChapterToolbar from "@/components/ChapterToolbar";
const UnifiedGlossary = lazy(() => import("@/pages/UnifiedGlossary"));
const CompareRqmStudio = lazy(() => import("@/pages/CompareRqmStudio"));
const CompareWaveEngine = lazy(() => import("@/pages/CompareWaveEngine"));
const PhysicsLensLanding = lazy(() => import("@/pages/PhysicsLensLanding"));
const PhysicsLensSupport = lazy(() => import("@/pages/PhysicsLensSupport"));
const PhysicsLensPrivacy = lazy(() => import("@/pages/PhysicsLensPrivacy"));
const PhysicsLensTerms = lazy(() => import("@/pages/PhysicsLensTerms"));
const PhysicsLensSubscriptions = lazy(() => import("@/pages/PhysicsLensSubscriptions"));
const PhysicsLensReleaseNotes = lazy(() => import("@/pages/PhysicsLensReleaseNotes"));
const QuantumDefenderLanding = lazy(() => import("@/pages/QuantumDefenderLanding"));
const QuantumDefenderSupport = lazy(() => import("@/pages/QuantumDefenderSupport"));
const QuantumDefenderMarketing = lazy(() => import("@/pages/QuantumDefenderMarketing"));
const QuantumDefenderPrivacy = lazy(() => import("@/pages/QuantumDefenderPrivacy"));

// Lazy load page components for better performance
const QSPLanding = lazy(() => import("@/pages/QSPLanding"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const SpinStatistics = lazy(() => import("@/pages/SpinStatistics"));
const QuaternionicSpinor = lazy(() => import("@/pages/QuaternionicSpinor"));
const QuaternionicSunset = lazy(() => import("@/pages/QuaternionicSunset"));
const RefinedCoherence = lazy(() => import("@/pages/RefinedCoherence"));
const QECValidation = lazy(() => import("@/pages/QECValidation"));
const YCodeErrorCorrection = lazy(() => import("@/pages/YCodeErrorCorrection"));
const QuaternionicStabilizers = lazy(() => import("@/pages/QuaternionicStabilizers"));
const QuaternionicQEC = lazy(() => import("@/pages/QuaternionicQEC"));
const QuaternionicQECFormal = lazy(() => import("@/pages/QuaternionicQECFormal"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const ResourceLibrary = lazy(() => import("@/pages/ResourceLibrary"));
const QuaternionicSpinors = lazy(() => import("@/pages/QuaternionicSpinors"));
const QuaternionicFramework = lazy(() => import("@/pages/QuaternionicFramework"));
const PhysicalImplementation = lazy(() => import("@/pages/PhysicalImplementation"));
const QuaternionicGates = lazy(() => import("@/pages/QuaternionicGates"));
const QuaternionicMeasurement = lazy(() => import("@/pages/QuaternionicMeasurement"));
const QuaternionicErrorCorrection = lazy(() => import("@/pages/QuaternionicErrorCorrection"));
const QATVisualization = lazy(() => import("@/pages/QATVisualization"));
const QuaternionicQuantumComputing = lazy(() => import("@/pages/QuaternionicQuantumComputing"));
const QuaternionicQuantumCommunication = lazy(() => import("@/pages/QuaternionicQuantumCommunication"));
const QuaternionicQuantumSensing = lazy(() => import("@/pages/QuaternionicQuantumSensing"));
const QuaternionicSpectralGeometry = lazy(() => import("@/pages/QuaternionicSpectralGeometry"));
const QuaternionicSpectralGeometryBook = lazy(() => import("@/pages/QuaternionicSpectralGeometryBook"));
const Chapter1GeometryOfNumbers = lazy(() => import("@/pages/Chapter1GeometryOfNumbers"));
const Chapter2QuaternionicRotation = lazy(() => import("@/pages/Chapter2QuaternionicRotation"));
const Chapter3DifferentialGeometryS3 = lazy(() => import("@/pages/Chapter3DifferentialGeometryS3"));
const Chapter4QuaternionicCalculusNew = lazy(() => import("@/pages/Chapter4QuaternionicCalculusNew"));
const Chapter5SpectralTheory = lazy(() => import("@/pages/Chapter5SpectralTheory"));
const Chapter6AGQF = lazy(() => import("@/pages/Chapter6AGQF"));
const Chapter7SpectralCoherence = lazy(() => import("@/pages/Chapter7SpectralCoherence"));
const Chapter8SpectralOperators = lazy(() => import("@/pages/Chapter8SpectralOperators"));
const Chapter9ComputationalGeometry = lazy(() => import("@/pages/Chapter9ComputationalGeometry"));
const Chapter10Applications = lazy(() => import("@/pages/Chapter10Applications"));
const Chapter1ManifoldMeasures = lazy(() => import("@/pages/Chapter1ManifoldMeasures"));
const Chapter2DifferentialCalculus = lazy(() => import("@/pages/Chapter2DifferentialCalculus"));
const Chapter3HarmonicAnalysis = lazy(() => import("@/pages/Chapter3HarmonicAnalysis"));
const Chapter4SpectralCalculus = lazy(() => import("@/pages/Chapter4SpectralCalculus"));
const Chapter5DistributionsPDE = lazy(() => import("@/pages/Chapter5DistributionsPDE"));
const Chapter6QuaternionicAnalytic = lazy(() => import("@/pages/Chapter6QuaternionicAnalytic"));
const Chapter7SliceRegularCalculus = lazy(() => import("@/pages/Chapter7SliceRegularCalculus"));
const Chapter8SpecialFunctions = lazy(() => import("@/pages/Chapter8SpecialFunctions"));
const ClosedFormCriticalSlice = lazy(() => import("@/pages/ClosedFormCriticalSlice"));
const QSGSubscription = lazy(() => import("@/pages/QSGSubscriptionSimple"));
const QSGRegisterSubscribe = lazy(() => import("@/pages/QSGRegisterSubscribe"));
const QuaternionicSignalProcessing = lazy(() => import("@/pages/QuaternionicSignalProcessing"));
const QuaternionicSpaceVisualization = lazy(() => import("@/pages/QuaternionicSpaceVisualization"));
const EigenCircle = lazy(() => import("@/pages/EigenCircle"));
const EigenSpinor = lazy(() => import("@/pages/EigenSpinor"));
const QuaternionicPhaseSphere = lazy(() => import("@/pages/QuaternionicPhaseSphere"));
const AnchorWellLandscape = lazy(() => import("@/pages/AnchorWellLandscape"));
const ResonantQuantumSimulation = lazy(() => import("@/pages/ResonantQuantumSimulation"));
const ControlMetrics = lazy(() => import("@/pages/ControlMetrics"));
const MisfitMetric = lazy(() => import("@/pages/MisfitMetric"));
const LogDerivativeMetric = lazy(() => import("@/pages/LogDerivativeMetric"));
const ZeroProximityMetric = lazy(() => import("@/pages/ZeroProximityMetric"));
const SliceActionEquivalence = lazy(() => import("@/pages/SliceActionEquivalence"));
const SliceCoordinate = lazy(() => import("@/pages/SliceCoordinate"));
const RQMTableOfElements = lazy(() => import("@/pages/RQMTableOfElements"));
const QSGTransientHeatTool = lazy(() => import("@/pages/QSGTransientHeatTool"));
const ERISAchievement = lazy(() => import("@/pages/ERISAchievement"));
const RQMSpinorVisualizer = lazy(() => import("@/pages/RQMSpinorVisualizer"));
const StandingWaveQuaternions = lazy(() => import("@/pages/StandingWaveQuaternions"));
const QuaternionicHypersphere = lazy(() => import("@/pages/QuaternionicHypersphere"));
const EntanglementPage = lazy(() => import("@/pages/EntanglementPage"));
const Chapter1Section1_1 = lazy(() => import("@/pages/Chapter1Section1-1"));
const Chapter1Section1_2 = lazy(() => import("@/pages/Chapter1Section1-2"));
const Chapter1Section1_3 = lazy(() => import("@/pages/Chapter1Section1-3"));
const Chapter1Section1_4 = lazy(() => import("@/pages/Chapter1Section1-4"));
const Chapter1Section1_5 = lazy(() => import("@/pages/Chapter1Section1-5"));
const Chapter1Section1_6 = lazy(() => import("@/pages/Chapter1Section1-6"));
const Chapter1Section1_7 = lazy(() => import("@/pages/Chapter1Section1-7"));
const Chapter1Section1_8 = lazy(() => import("@/pages/Chapter1Section1-8"));
const Chapter1Section1_9 = lazy(() => import("@/pages/Chapter1Section1-9"));
const Chapter1Section1_10 = lazy(() => import("@/pages/Chapter1Section1-10"));
const Chapter1Section1_11 = lazy(() => import("@/pages/Chapter1Section1-11"));
const Chapter2Section2_1 = lazy(() => import("@/pages/Chapter2Section2-1"));
const Chapter2Section2_2 = lazy(() => import("@/pages/Chapter2Section2-2"));
const Chapter2Section2_3 = lazy(() => import("@/pages/Chapter2Section2-3"));
const Chapter2Section2_4 = lazy(() => import("@/pages/Chapter2Section2-4"));
const Chapter2Section2_5 = lazy(() => import("@/pages/Chapter2Section2-5"));
const Chapter2Section2_6 = lazy(() => import("@/pages/Chapter2Section2-6"));
const Chapter2Section2_7 = lazy(() => import("@/pages/Chapter2Section2-7"));
const Chapter2Section2_8 = lazy(() => import("@/pages/Chapter2Section2-8"));
const Chapter2Section2_9 = lazy(() => import("@/pages/Chapter2Section2-9"));
const Chapter3Section3_1 = lazy(() => import("@/pages/Chapter3Section3-1"));
const Chapter3Section3_2 = lazy(() => import("@/pages/Chapter3Section3-2"));
const Chapter3Section3_3 = lazy(() => import("@/pages/Chapter3Section3-3"));
const Chapter3Section3_4 = lazy(() => import("@/pages/Chapter3Section3-4"));
const Chapter3Section3_5 = lazy(() => import("@/pages/Chapter3Section3-5"));
const Chapter3Section3_6 = lazy(() => import("@/pages/Chapter3Section3-6"));
const Chapter3Section3_7 = lazy(() => import("@/pages/Chapter3Section3-7"));
const Chapter4Section4_1 = lazy(() => import("@/pages/Chapter4Section4-1"));
const Chapter4Section4_2 = lazy(() => import("@/pages/Chapter4Section4-2"));
const Chapter4Section4_3 = lazy(() => import("@/pages/Chapter4Section4-3"));
const Chapter4Section4_4 = lazy(() => import("@/pages/Chapter4Section4-4"));
const Chapter5Section5_1 = lazy(() => import("@/pages/Chapter5Section5-1"));
const Chapter5Section5_2 = lazy(() => import("@/pages/Chapter5Section5-2"));
const Chapter5Section5_3 = lazy(() => import("@/pages/Chapter5Section5-3"));
const Chapter5Section5_4 = lazy(() => import("@/pages/Chapter5Section5-4"));
const Chapter5Section5_5 = lazy(() => import("@/pages/Chapter5Section5-5"));
const Chapter6AGQFHub = lazy(() => import("@/pages/Chapter6AGQFHub"));
const Chapter6Section6_1 = lazy(() => import("@/pages/chapter6/Section6-1"));
const Chapter6Section6_2 = lazy(() => import("@/pages/chapter6/Section6-2"));
const Chapter6Section6_3 = lazy(() => import("@/pages/chapter6/Section6-3"));
const Chapter6Section6_4 = lazy(() => import("@/pages/chapter6/Section6-4"));
const Chapter6Section6_5 = lazy(() => import("@/pages/chapter6/Section6-5"));
const Chapter7SpectralCoherenceHub = lazy(() => import("@/pages/Chapter7SpectralCoherenceHub"));
const Chapter7Section7_1 = lazy(() => import("@/pages/chapter7/Section7-1"));
const Chapter7Section7_2 = lazy(() => import("@/pages/chapter7/Section7-2"));
const Chapter7Section7_3 = lazy(() => import("@/pages/chapter7/Section7-3"));
const Chapter7Section7_4 = lazy(() => import("@/pages/chapter7/Section7-4"));
const Chapter7Section7_5 = lazy(() => import("@/pages/chapter7/Section7-5"));
const Chapter8SpecialFunctionsHub = lazy(() => import("@/pages/Chapter8SpecialFunctionsHub"));
const Chapter8Section8_1 = lazy(() => import("@/pages/chapter8/Section8-1"));
const Chapter8Section8_2 = lazy(() => import("@/pages/chapter8/Section8-2"));
const Chapter8Section8_3 = lazy(() => import("@/pages/chapter8/Section8-3"));
const Chapter8Section8_4 = lazy(() => import("@/pages/chapter8/Section8-4"));
const Chapter9ComputationalHub = lazy(() => import("@/pages/Chapter9ComputationalHub"));
const Chapter9Section9_1 = lazy(() => import("@/pages/chapter9/Section9-1"));
const Chapter9Section9_2 = lazy(() => import("@/pages/chapter9/Section9-2"));
const Chapter9Section9_3 = lazy(() => import("@/pages/chapter9/Section9-3"));
const Chapter9Section9_4 = lazy(() => import("@/pages/chapter9/Section9-4"));
const Chapter9Section9_5 = lazy(() => import("@/pages/chapter9/Section9-5"));
const Chapter10ApplicationsHub = lazy(() => import("@/pages/Chapter10ApplicationsHub"));
const Chapter10Section10_1 = lazy(() => import("@/pages/chapter10/Section10-1"));
const Chapter10Section10_2 = lazy(() => import("@/pages/chapter10/Section10-2"));
const Chapter10Section10_3 = lazy(() => import("@/pages/chapter10/Section10-3"));
const Chapter10Section10_4 = lazy(() => import("@/pages/chapter10/Section10-4"));
const Chapter10Section10_5 = lazy(() => import("@/pages/chapter10/Section10-5"));
const LearningHub = lazy(() => import("@/pages/LearningHub"));
const CoursesLanding = lazy(() => import("@/pages/CoursesLanding"));
const ExplorePage = lazy(() => import("@/pages/ExplorePage"));
const ToolsHub = lazy(() => import("@/pages/ToolsHub"));
const SpectralAtlas = lazy(() => import("@/pages/SpectralAtlas"));
const ResearchHub = lazy(() => import("@/pages/ResearchHub"));
const ResearchPage = lazy(() => import("@/pages/ResearchPage"));
const GovernmentHub = lazy(() => import("@/pages/GovernmentHub"));
const RQMStudioFeatures = lazy(() => import("@/pages/RQMStudioFeatures"));
const NotFound = lazy(() => import("@/pages/not-found"));

// QC Course pages
const QCCourseHub = lazy(() => import("@/pages/qc-course/QCCourseHub"));
const QCCertificate = lazy(() => import("@/pages/qc-course/QCCertificate"));
const QCSyllabus = lazy(() => import("@/pages/qc-course/QCSyllabus"));
const QCChapter1 = lazy(() => import("@/pages/qc-course/QCChapter1"));
const QCChapter2 = lazy(() => import("@/pages/qc-course/QCChapter2"));
const QCChapter3 = lazy(() => import("@/pages/qc-course/QCChapter3"));
const QCChapter4 = lazy(() => import("@/pages/qc-course/QCChapter4"));
const QCChapter5 = lazy(() => import("@/pages/qc-course/QCChapter5"));
const QCChapter6 = lazy(() => import("@/pages/qc-course/QCChapter6"));
const QCGlossary = lazy(() => import("@/pages/qc-course/QCGlossary"));
const QCNotation = lazy(() => import("@/pages/qc-course/QCNotation"));
const QCSources = lazy(() => import("@/pages/qc-course/QCSources"));

// QSP Course pages
const QSPCourseHub = lazy(() => import("@/pages/qsp-course/QSPCourseHub"));
const QSPChapter1 = lazy(() => import("@/pages/qsp-course/QSPChapter1"));
const QSPChapter2 = lazy(() => import("@/pages/qsp-course/QSPChapter2"));
const QSPChapter3 = lazy(() => import("@/pages/qsp-course/QSPChapter3"));
const QSPChapter4 = lazy(() => import("@/pages/qsp-course/QSPChapter4"));
const QSPChapter5 = lazy(() => import("@/pages/qsp-course/QSPChapter5"));
const QSPChapter6 = lazy(() => import("@/pages/qsp-course/QSPChapter6"));
const QSPChapter7 = lazy(() => import("@/pages/qsp-course/QSPChapter7"));

// Component to handle scroll restoration
function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

function Router() {
  const [location] = useLocation();

  // Pages that shouldn't show navigation and footer (like admin)
  const hideNavAndFooter = location === "/admin";
  const isPhysicsLensPage = location === "/physics-lens" || location.startsWith("/physics-lens/");

  // Show chat widget on every page except admin
  const showChatWidget = !hideNavAndFooter;

  return (
    <>
      <SkipToContent />
      <ScrollToTop />
      {!hideNavAndFooter && <Navigation />}
      {showChatWidget && <RQMChatWidget />}
      <ChapterToolbar />
      <main id="main-content" tabIndex={-1}>
      <Suspense fallback={<PageLoadingFallback />}>
        <Switch>
        <Route path="/" component={QSPLanding} />
        <Route path="/compare/rqm-studio-vs-qiskit" component={CompareRqmStudio} />
        <Route path="/compare/wave-engine-vs-matlab" component={CompareWaveEngine} />
        <Route path="/physics-lens/support" component={PhysicsLensSupport} />
        <Route path="/physics-lens/privacy" component={PhysicsLensPrivacy} />
        <Route path="/physics-lens/terms" component={PhysicsLensTerms} />
        <Route path="/physics-lens/subscriptions" component={PhysicsLensSubscriptions} />
        <Route path="/physics-lens/release-notes" component={PhysicsLensReleaseNotes} />
        <Route path="/physics-lens" component={PhysicsLensLanding} />
        <Route path="/quantum-defender/support" component={QuantumDefenderSupport} />
        <Route path="/quantum-defender/marketing" component={QuantumDefenderMarketing} />
        <Route path="/quantum-defender/privacy" component={QuantumDefenderPrivacy} />
        <Route path="/quantum-defender" component={QuantumDefenderLanding} />
        <Route path="/quantum-systems" component={Home} />
        <Route path="/explore" component={ExplorePage} />
        <Route path="/courses" component={CoursesLanding} />
        <Route path="/learn/quantum-computing/chapter/1" component={QCChapter1} />
        <Route path="/learn/quantum-computing/chapter/2" component={QCChapter2} />
        <Route path="/learn/quantum-computing/chapter/3" component={QCChapter3} />
        <Route path="/learn/quantum-computing/chapter/4" component={QCChapter4} />
        <Route path="/learn/quantum-computing/chapter/5" component={QCChapter5} />
        <Route path="/learn/quantum-computing/chapter/6" component={QCChapter6} />
        <Route path="/learn/quantum-computing/syllabus" component={QCSyllabus} />
        <Route path="/learn/quantum-computing/glossary" component={QCGlossary} />
        <Route path="/learn/quantum-computing/notation" component={QCNotation} />
        <Route path="/learn/quantum-computing/sources" component={QCSources} />
        <Route path="/learn/quantum-computing/certificate" component={QCCertificate} />
        <Route path="/learn/quantum-computing" component={QCCourseHub} />
        <Route path="/learn/quaternionic-signal-processing/chapter/1" component={QSPChapter1} />
        <Route path="/learn/quaternionic-signal-processing/chapter/2" component={QSPChapter2} />
        <Route path="/learn/quaternionic-signal-processing/chapter/3" component={QSPChapter3} />
        <Route path="/learn/quaternionic-signal-processing/chapter/4" component={QSPChapter4} />
        <Route path="/learn/quaternionic-signal-processing/chapter/5" component={QSPChapter5} />
        <Route path="/learn/quaternionic-signal-processing/chapter/6" component={QSPChapter6} />
        <Route path="/learn/quaternionic-signal-processing/chapter/7" component={QSPChapter7} />
        <Route path="/learn/quaternionic-signal-processing" component={QSPCourseHub} />
        <Route path="/learn/glossary" component={UnifiedGlossary} />
        <Route path="/learn" component={LearningHub} />
        <Route path="/tools" component={ToolsHub} />
        <Route path="/research" component={ResearchPage} />
        <Route path="/research-library" component={ResearchHub} />
        <Route path="/government" component={GovernmentHub} />
        <Route path="/rqm-studio" component={RQMStudioFeatures} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/resources" component={ResourceLibrary} />
        <Route path="/dashboard" component={Dashboard} />

        <Route path="/quaternionic-spinors" component={QuaternionicSpinors} />
        <Route path="/quaternionic-framework" component={QuaternionicFramework} />
        <Route path="/physical-implementation" component={PhysicalImplementation} />
        <Route path="/quaternionic-gates" component={QuaternionicGates} />
        <Route path="/quaternionic-measurement" component={QuaternionicMeasurement} />
        <Route path="/quaternionic-error-correction" component={QuaternionicErrorCorrection} />

        <Route path="/qat-visualization" component={QATVisualization} />
        <Route path="/spin-statistics" component={SpinStatistics} />
        <Route path="/quaternionic-spinor" component={QuaternionicSpinor} />
        <Route path="/quaternionic-sunset" component={QuaternionicSunset} />
        <Route path="/refined-coherence" component={RefinedCoherence} />
        <Route path="/qec-validation" component={QECValidation} />
        <Route path="/y-code-error-correction" component={YCodeErrorCorrection} />
        <Route path="/quaternionic-stabilizers" component={QuaternionicStabilizers} />
        <Route path="/quaternionic-qec" component={QuaternionicQEC} />
        <Route path="/quaternionic-qec-formal" component={QuaternionicQECFormal} />
        <Route path="/quaternionic-quantum-computing" component={QuaternionicQuantumComputing} />
        <Route path="/quaternionic-quantum-communication" component={QuaternionicQuantumCommunication} />
        <Route path="/quaternionic-quantum-sensing" component={QuaternionicQuantumSensing} />
        <Route path="/quaternionic-spectral-geometry" component={QuaternionicSpectralGeometry} />
        <Route path="/quaternionic-signal-processing" component={QuaternionicSignalProcessing} />
        <Route path="/quaternionic-space-visualization" component={QuaternionicSpaceVisualization} />
        <Route path="/eigen-circle" component={EigenCircle} />
        <Route path="/eigen-spinor" component={EigenSpinor} />
        <Route path="/quaternionic-phase-sphere" component={QuaternionicPhaseSphere} />
        <Route path="/anchor-well-landscape" component={AnchorWellLandscape} />
        <Route path="/resonant-quantum-mechanics" component={ResonantQuantumSimulation} />
        <Route path="/control-metrics" component={ControlMetrics} />
        <Route path="/misfit-metric" component={MisfitMetric} />
        <Route path="/log-derivative-metric" component={LogDerivativeMetric} />
        <Route path="/zero-proximity-metric" component={ZeroProximityMetric} />
        <Route path="/slice-action-equivalence" component={SliceActionEquivalence} />
        <Route path="/slice-coordinate" component={SliceCoordinate} />
        <Route path="/rqm-table-of-elements" component={RQMTableOfElements} />
        <Route path="/quaternionic-spectral-geometry-book" component={QuaternionicSpectralGeometryBook} />
        <Route path="/chapter-1-geometry-of-numbers" component={Chapter1GeometryOfNumbers} />
        <Route path="/chapter-2-quaternionic-rotation" component={Chapter2QuaternionicRotation} />
        <Route path="/chapter-3-differential-geometry-s3" component={Chapter3DifferentialGeometryS3} />
        <Route path="/chapter-4-quaternionic-calculus-new" component={Chapter4QuaternionicCalculusNew} />
        <Route path="/chapter-5-spectral-theory" component={Chapter5SpectralTheory} />
        <Route path="/chapter-6-agqf" component={Chapter6AGQF} />
        <Route path="/chapter-7-spectral-coherence" component={Chapter7SpectralCoherence} />
        <Route path="/chapter-8-spectral-operators" component={Chapter8SpectralOperators} />
        <Route path="/chapter-9-computational-geometry" component={Chapter9ComputationalGeometry} />
        <Route path="/chapter-10-applications" component={Chapter10Applications} />
        <Route path="/chapter-1-manifold-measures" component={Chapter1ManifoldMeasures} />
        <Route path="/chapter-2-differential-calculus" component={Chapter2DifferentialCalculus} />
        <Route path="/chapter-3-harmonic-analysis" component={Chapter3HarmonicAnalysis} />
        <Route path="/chapter-4-spectral-calculus" component={Chapter4SpectralCalculus} />
        <Route path="/chapter-5-distributions-pde" component={Chapter5DistributionsPDE} />
        <Route path="/chapter-6-quaternionic-analytic" component={Chapter6QuaternionicAnalytic} />
        <Route path="/chapter-7-slice-regular-calculus" component={Chapter7SliceRegularCalculus} />
        <Route path="/chapter-8-special-functions" component={Chapter8SpecialFunctions} />
        <Route path="/closed-form-critical-slice" component={ClosedFormCriticalSlice} />
        <Route path="/quaternionic-factorial" component={ClosedFormCriticalSlice} />
        <Route path="/qsg-subscription" component={QSGSubscription} />
        <Route path="/qsg-register-subscribe" component={QSGRegisterSubscribe} />
        <Route path="/qsg-transient-heat-tool" component={QSGTransientHeatTool} />
        <Route path="/eris-achievement" component={ERISAchievement} />
        <Route path="/rqm-spinor-visualizer" component={RQMSpinorVisualizer} />
        <Route path="/standing-wave-quaternions" component={StandingWaveQuaternions} />
        <Route path="/quaternionic-hypersphere" component={QuaternionicHypersphere} />
        <Route path="/entanglement" component={EntanglementPage} />
        <Route path="/spectral-atlas" component={SpectralAtlas} />

        {/* Chapter 1 Section Pages */}
        <Route path="/chapter-1/section-1-1" component={Chapter1Section1_1} />
        <Route path="/chapter-1/section-1-2" component={Chapter1Section1_2} />
        <Route path="/chapter-1/section-1-3" component={Chapter1Section1_3} />
        <Route path="/chapter-1/section-1-4" component={Chapter1Section1_4} />
        <Route path="/chapter-1/section-1-5" component={Chapter1Section1_5} />
        <Route path="/chapter-1/section-1-6" component={Chapter1Section1_6} />
        <Route path="/chapter-1/section-1-7" component={Chapter1Section1_7} />
        <Route path="/chapter-1/section-1-8" component={Chapter1Section1_8} />
        <Route path="/chapter-1/section-1-9" component={Chapter1Section1_9} />
        <Route path="/chapter-1/section-1-10" component={Chapter1Section1_10} />
        <Route path="/chapter-1/section-1-11" component={Chapter1Section1_11} />

        {/* Chapter 2 Section Pages */}
        <Route path="/chapter-2/section-2-1" component={Chapter2Section2_1} />
        <Route path="/chapter-2/section-2-2" component={Chapter2Section2_2} />
        <Route path="/chapter-2/section-2-3" component={Chapter2Section2_3} />
        <Route path="/chapter-2/section-2-4" component={Chapter2Section2_4} />
        <Route path="/chapter-2/section-2-5" component={Chapter2Section2_5} />
        <Route path="/chapter-2/section-2-6" component={Chapter2Section2_6} />
        <Route path="/chapter-2/section-2-7" component={Chapter2Section2_7} />
        <Route path="/chapter-2/section-2-8" component={Chapter2Section2_8} />
        <Route path="/chapter-2/section-2-9" component={Chapter2Section2_9} />

        {/* Chapter 3 Section Pages */}
        <Route path="/chapter-3-differential-geometry" component={Chapter3DifferentialGeometryS3} />
        <Route path="/chapter-3/section-3-1" component={Chapter3Section3_1} />
        <Route path="/chapter-3/section-3-2" component={Chapter3Section3_2} />
        <Route path="/chapter-3/section-3-3" component={Chapter3Section3_3} />
        <Route path="/chapter-3/section-3-4" component={Chapter3Section3_4} />
        <Route path="/chapter-3/section-3-5" component={Chapter3Section3_5} />
        <Route path="/chapter-3/section-3-6" component={Chapter3Section3_6} />
        <Route path="/chapter-3/section-3-7" component={Chapter3Section3_7} />

        {/* Chapter 4 Section Pages */}
        <Route path="/chapter-4/section-4-1" component={Chapter4Section4_1} />
        <Route path="/chapter-4/section-4-2" component={Chapter4Section4_2} />
        <Route path="/chapter-4/section-4-3" component={Chapter4Section4_3} />
        <Route path="/chapter-4/section-4-4" component={Chapter4Section4_4} />

        {/* Chapter 5 Section Pages */}
        <Route path="/chapter-5/section-5-1" component={Chapter5Section5_1} />
        <Route path="/chapter-5/section-5-2" component={Chapter5Section5_2} />
        <Route path="/chapter-5/section-5-3" component={Chapter5Section5_3} />
        <Route path="/chapter-5/section-5-4" component={Chapter5Section5_4} />
        <Route path="/chapter-5/section-5-5" component={Chapter5Section5_5} />

        {/* Chapter 6 Hub and Section Pages */}
        <Route path="/chapter-6-agqf-hub" component={Chapter6AGQFHub} />
        <Route path="/chapter-6/section-6-1" component={Chapter6Section6_1} />
        <Route path="/chapter-6/section-6-2" component={Chapter6Section6_2} />
        <Route path="/chapter-6/section-6-3" component={Chapter6Section6_3} />
        <Route path="/chapter-6/section-6-4" component={Chapter6Section6_4} />
        <Route path="/chapter-6/section-6-5" component={Chapter6Section6_5} />

        {/* Chapter 7 Hub and Section Pages */}
        <Route path="/chapter-7-spectral-coherence-hub" component={Chapter7SpectralCoherenceHub} />
        <Route path="/chapter-7/section-7-1" component={Chapter7Section7_1} />
        <Route path="/chapter-7/section-7-2" component={Chapter7Section7_2} />
        <Route path="/chapter-7/section-7-3" component={Chapter7Section7_3} />
        <Route path="/chapter-7/section-7-4" component={Chapter7Section7_4} />
        <Route path="/chapter-7/section-7-5" component={Chapter7Section7_5} />

        {/* Chapter 8 Hub and Section Pages */}
        <Route path="/chapter-8-special-functions-hub" component={Chapter8SpecialFunctionsHub} />
        <Route path="/chapter-8/section-8-1" component={Chapter8Section8_1} />
        <Route path="/chapter-8/section-8-2" component={Chapter8Section8_2} />
        <Route path="/chapter-8/section-8-3" component={Chapter8Section8_3} />
        <Route path="/chapter-8/section-8-4" component={Chapter8Section8_4} />

        {/* Chapter 9 Hub and Section Pages */}
        <Route path="/chapter-9-computational-hub" component={Chapter9ComputationalHub} />
        <Route path="/chapter-9/section-9-1" component={Chapter9Section9_1} />
        <Route path="/chapter-9/section-9-2" component={Chapter9Section9_2} />
        <Route path="/chapter-9/section-9-3" component={Chapter9Section9_3} />
        <Route path="/chapter-9/section-9-4" component={Chapter9Section9_4} />
        <Route path="/chapter-9/section-9-5" component={Chapter9Section9_5} />

        {/* Chapter 10 Hub and Section Pages */}
        <Route path="/chapter-10-applications-hub" component={Chapter10ApplicationsHub} />
        <Route path="/chapter-10/section-10-1" component={Chapter10Section10_1} />
        <Route path="/chapter-10/section-10-2" component={Chapter10Section10_2} />
        <Route path="/chapter-10/section-10-3" component={Chapter10Section10_3} />
        <Route path="/chapter-10/section-10-4" component={Chapter10Section10_4} />
        <Route path="/chapter-10/section-10-5" component={Chapter10Section10_5} />

        {/* Legacy redirects for old nested paths */}
        <Route path="/quaternionic-spectral-geometry-book/chapter-1">
          <Redirect to="/chapter-1-manifold-measures" />
        </Route>
        <Route path="/quaternionic-spectral-geometry-book/chapter-2">
          <Redirect to="/chapter-2-differential-calculus" />
        </Route>
        <Route path="/quaternionic-spectral-geometry-book/spin-statistics">
          <Redirect to="/spin-statistics" />
        </Route>
        <Route path="/quaternionic-spectral-geometry-book/rqm-calculator">
          <Redirect to="/rqm-table-of-elements" />
        </Route>

        <Route component={NotFound} />
      </Switch>
      </Suspense>
      </main>
      {!hideNavAndFooter && <Footer hideGovernmentCredibility={isPhysicsLensPage} />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
