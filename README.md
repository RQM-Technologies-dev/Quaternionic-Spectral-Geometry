# Quaternionic Spectral Geometry

Quaternionic Spectral Geometry (QSG) is a developing mathematical framework for studying spectral, metric, phase, orientation, coherence, scale, and resonance structures on quaternionic hypersphere spaces, with the basic model manifold

$$
M = S^3 \times \mathbb R.
$$

Here $S^3$ is the unit-quaternion hypersphere, identified with $SU(2)$, and the real coordinate $s$ is canonically interpreted as a dimensionless logarithmic scale coordinate. Given a nonzero quaternionic coordinate $Q$, choose a reference scale $\rho_*>0$ and write

$$
Q = \rho q,
\qquad
q \in S^3,
\qquad
s = \log\left(\frac{\rho}{\rho_*}\right),
$$

so that

$$
Q = \rho_* e^s q.
$$

This is the standard decomposition

$$
\mathbb H\setminus\{0\}
\cong
\mathbb R^+ \times S^3
\cong
\mathbb R \times S^3.
$$

QSG promotes the logarithmic scale direction to an internal coordinate on which spectral operators may act. Resonance wells are optional model structures in scale space, not the primitive meaning of the coordinate and not a required part of the framework.

The first formal bridge uses the standard embedding $\mathbb H \hookrightarrow M_2(\mathbb C)$ so that quaternionic geometry can be studied through complex matrices, spinors, operators, and ordinary spectral constructions before any native quaternionic Hilbert-space machinery is required.

## Why This Repo Exists

This repository establishes a public mathematical canon for QSG: the manifold, coordinate vocabulary, hypersphere geometry, scale geometry, quaternionic special functions, spectral operators, coherence language, examples, and a disciplined path toward formalization.

The goal is to make a precise research program inspectable. Definitions, standard mathematical background, examples, prototype calculations, conjectural extensions, and speculative physical interpretations should remain separate.

## Core Manifold

The starting object is

$$
M = S^3 \times \mathbb R,
$$

where

- $S^3 = \{q \in \mathbb H : \|q\| = 1\}$ is the unit-quaternion hypersphere,
- $S^3 \cong SU(2)$ gives the rotor and spinor-facing group structure,
- $\mathbb R$ supplies a logarithmic scale coordinate $s$,
- a point of $M$ is written $(q,s)$.

The $S^3$ coordinate carries phase, rotation, orientation, and polarization data. The $s$ coordinate records dilation relative to a chosen reference scale. Operators, filters, boundary conditions, or optional potentials along $s$ may then contribute spectral structure.

The canonical symbol for this real coordinate is $s$. In rotor notation,

$$
q = \cos(\phi) + \hat n\sin(\phi),
$$

$\hat n$ is a unit imaginary quaternion. Keeping $\hat n$ distinct from $s$ avoids confusing the rotor axis with the scale coordinate.

For the full definition and claim-status boundary, see [Scale Coordinate Foundation](SCALE_COORDINATE.md).

## Scale, Spectrum, And Resonance

QSG uses the following hierarchy:

1. **Scale:** $s=\log(\rho/\rho_*)$ is the continuous dilation coordinate.
2. **Spectrum:** an $s$-direction derivative, difference operator, or other stated operator contributes spectral structure.
3. **Resonance:** localized eigenstates or wells may select preferred scale bands in a particular model.

Thus $s$ is not itself a discrete harmonic label or an energy eigenvalue. Harmonics on $S^3$ and modes along $s$ are separate structures that may be coupled in a full model.

## Quaternionic Factorial Baseline

Before introducing anchor-generating factors or well potentials, QSG studies the scalar quaternionic factorial

$$
\mathfrak F(q)
=
\int_0^\infty e^{-x}x^q\,dx
=
\Gamma(q+1),
$$

initially for $\operatorname{Re}(q)>-1$.

For

$$
q=a+r\hat n,
$$

with $\hat n$ a unit imaginary quaternion,

$$
\mathfrak F(a+r\hat n)
=
A(a,r)+\hat n B(a,r).
$$

The scalar amplitude and phase coefficient depend on $(a,r)$, while the quaternionic axis orients the imaginary part. One value remains inside a complex slice; ordered products associated with different axes can be noncommutative.

The canonical recurrence for this indexing convention is

$$
\mathfrak F(q+1)
=
(q+1)\mathfrak F(q),
$$

or equivalently $\mathfrak F(q)=q\mathfrak F(q-1)$.

The useful research progression is

$$
\text{scalar factorial}
\longrightarrow
\text{cross-slice composition}
\longrightarrow
\text{operator-valued factorial}
\longrightarrow
\text{optional anchored extensions}.
$$

See [Quaternionic Factorial Foundation](QUATERNIONIC_FACTORIAL.md) and the reproducible [slice experiment](experiments/quaternionic_factorial_slices.py).

## Spectral Formalization

QSG is adjacent to spectral triples and related operator-theoretic formalisms because it organizes geometry through an algebra of observables, a state space, and a spectral operator. The general bridge is:

- an algebra $\mathcal A$ of functions or observables on $M$,
- a complex spinor or matrix-valued state space $\mathcal H$,
- a spectral operator $D$ sensitive to hypersphere and $s$-direction structure,
- commutators $[D,\pi(a)]$ encoding derivative or measurement-like variation.

This is a general mathematical interface for QSG examples. A state such as $\Psi(q,s,t)$ may belong to $\mathcal H$ at fixed $t$; it is not itself a spectral triple.

For the focused spectral-triple formulation target, see [Spectral-Triple Anchor](SPECTRAL_TRIPLE_ANCHOR.md).

## Status

This is an early research canon, not a finished physical theory. The decomposition of nonzero quaternionic space into magnitude and unit direction is standard mathematics. Treating logarithmic magnitude as a physically meaningful internal scale coordinate is a QSG modeling choice.

Likewise, the scalar quaternionic factorial is an intrinsic slice extension of the complex Gamma function. Its potentially distinctive content begins with cross-slice ordered composition or a precisely defined operator functional calculus, not with claiming that a single scalar evaluation produces new physics.

The current target is a minimal model on $M = S^3 \times \mathbb R$ with explicit quaternion-as-$M_2(\mathbb C)$ coordinates, a simple algebra of observables, a candidate spectral operator, computed commutators, and a finite $SU(2)$-aware test of $\Gamma(T+1)$.

## Suggested First Formalization Target

A finite or truncated model of $M = S^3 \times \mathbb R$ using:

- unit quaternions represented as complex $2 \times 2$ matrices,
- a compact, confined, or discretized scale coordinate $s$,
- spinor-valued or matrix-valued states,
- a spectral operator combining an $S^3/SU(2)$ component with an $s$-direction component,
- an operator $T$ with noncommuting $SU(2)$ components for a controlled $\Gamma(T+1)$ experiment.

The first compact prototype should be checked before the scale-extended $S^3 \times \mathbb R$ model is treated as a spectral triple or assigned a physical interpretation.

## Course Material

The current storefront course contains more expanded teaching material than this early canon. A repo-local snapshot is maintained in [course/storefront-snapshot](course/storefront-snapshot/README.md) so the course information can be preserved here first, then normalized into durable QSG roots over time.

The normalized course trunk lives in [course/qsg-course](course/qsg-course/README.md). Storefront course pages should treat that directory as the canonical source for QSG roots, claim statuses, chapter structure, glossary terms, notation, and route-to-root derivation metadata.
