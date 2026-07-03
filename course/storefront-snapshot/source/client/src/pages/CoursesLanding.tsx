import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import { RQMChatWidget } from "@/components/RQMChatWidget";
import { BookOpen, Cpu, Radio, ArrowRight, Clock, CheckCircle } from "lucide-react";

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  badge: string;
  available: boolean;
  href: string;
  icon: typeof BookOpen;
  accentColor: string;
  badgeColor: string;
}

const courses: Course[] = [
  {
    id: "qsg",
    title: "Quaternionic Spectral Geometry",
    subtitle: "A Calculus for the 21st Century",
    description:
      "A complete 10-chapter university-level curriculum covering quaternionic manifolds, harmonic analysis on S³, anchor well resonances, and the AGQF operator — from first principles through frontier applications in quantum computing and signal processing.",
    topics: [
      "Quaternionic manifolds & the 3-sphere",
      "Differential calculus on S³",
      "AGQF operator and anchor wells",
      "Spectral theory and resonance",
      "Applications: QC, sensing, comms",
    ],
    badge: "10 Chapters · Free",
    available: true,
    href: "/learn",
    icon: BookOpen,
    accentColor: "#2d9aaf",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
  },
  {
    id: "qc",
    title: "RQM Quantum Computing",
    subtitle: "Geometry, Spinors, Compilation, and Bell Correlations",
    description:
      "A rigorous 6-chapter course on quaternionic quantum computing derived directly from the RQM Technologies technical paper series. Covers spinors, SU(2) geometry, canonical IR, gate fusion, and verification — with KaTeX math, interactive tools, quizzes, and problem sets.",
    topics: [
      "Spinors, S³, and SU(2) geometry",
      "Canonical quaternionic IR (u1q)",
      "Gate fusion on S³",
      "Verification and equivalence checking",
      "Bell / CHSH correlations",
    ],
    badge: "6 Chapters · Free",
    available: true,
    href: "/learn/quantum-computing",
    icon: Cpu,
    accentColor: "#4c6ef5",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    id: "qsp",
    title: "Quaternionic Signal Processing",
    subtitle: "Engineering wave systems with unit quaternions",
    description:
      "A practical 7-chapter course on signal engineering with unit quaternions. From the limits of complex DSP to orientation-aware spectral methods, polarization, channel geometry, and the WaveEngine workflow — written for RF, optics, and multichannel sensing engineers.",
    topics: [
      "Complex DSP to quaternionic signal states",
      "Unit quaternions for wave orientation",
      "Quaternionic Fourier and filtering methods",
      "Polarization-aware channel modeling",
      "SU(2) modulation and quaternionic constellations",
      "WaveEngine API and application pipelines",
    ],
    badge: "7 Chapters · Free",
    available: true,
    href: "/learn/quaternionic-signal-processing",
    icon: Radio,
    accentColor: "#7c3aed",
    badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
  },
];

export default function CoursesLanding() {
  useEffect(() => {
    document.title = "Courses | RQM Technologies";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero */}
      <div className="pt-24 pb-14" style={{ backgroundColor: "#0a1e28" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
            style={{ backgroundColor: "rgba(45,154,175,0.15)", color: "#2d9aaf" }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            RQM Technologies Learning
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Courses
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Structured learning paths built on Quaternionic Spectral Geometry
            and Resonant Quantum Mechanics — from geometric foundations to
            real-world engineering applications.
          </p>
        </div>
      </div>

      {/* Course cards */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const Icon = course.icon;
            return (
              <div
                key={course.id}
                className={`bg-white rounded-2xl border flex flex-col overflow-hidden transition-shadow duration-200 ${
                  course.available
                    ? "border-gray-200 shadow-sm hover:shadow-md"
                    : "border-gray-200 shadow-sm opacity-90"
                }`}
              >
                {/* Card top accent bar */}
                <div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: course.accentColor }}
                />

                <div className="p-7 flex flex-col flex-1">
                  {/* Icon + badge row */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${course.accentColor}18` }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: course.accentColor }}
                      />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${course.badgeColor}`}
                    >
                      {course.available ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {course.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-lg font-bold mb-1 leading-snug"
                    style={{ color: "#0a1e28" }}
                  >
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">{course.subtitle}</p>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    {course.description}
                  </p>

                  {/* Topics */}
                  <ul className="space-y-1.5 mb-7 flex-1">
                    {course.topics.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: course.accentColor }}
                        />
                        {topic}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {course.available ? (
                    <Link href={course.href}>
                      <button
                        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ backgroundColor: course.accentColor }}
                      >
                        Start Course
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  ) : (
                    <Link href={course.href}>
                      <button className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-150 transition-colors border border-gray-200">
                        Notify Me
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="text-center text-sm text-gray-400 mt-12">
          All courses are built on the shared quaternionic mathematical
          foundation of{" "}
          <Link href="/research">
            <span
              className="underline underline-offset-2 cursor-pointer hover:opacity-80"
              style={{ color: "#2d9aaf" }}
            >
              RQM Technologies research
            </span>
          </Link>
          .
        </p>
      </div>

      <RQMChatWidget />
    </div>
  );
}
