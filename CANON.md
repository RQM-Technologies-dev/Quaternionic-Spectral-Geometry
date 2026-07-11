# Canon

## Name

Quaternionic Spectral Geometry (QSG).

## Core Idea

Quaternionic Spectral Geometry is the study of spectral, metric, phase, orientation, coherence, scale, and resonance structures on quaternionic hypersphere spaces. Its basic model is

$$
M = S^3 \times \mathbb R,
$$

where $S^3$ is the unit-quaternion hypersphere and $\mathbb R$ carries a real logarithmic scale coordinate $s$.

QSG treats orientation-sensitive data as geometric data and scale as an internal geometric direction rather than as time. Resonance and anchor structure are modeled through operators, potentials, filters, or boundary conditions acting along the scale coordinate.

The framework starts with ordinary complex-linear tools by representing quaternionic coordinates through complex $2 \times 2$ matrices.

## Mathematical Primitives

The initial vocabulary of QSG uses:

- $M = S^3 \times \mathbb R$,
- $S^3 \cong SU(2)$,
- unit quaternions,
- hypersphere coordinates $q = \cos(\phi) + \hat n\sin(\phi)$,
- a unit imaginary quaternion $\hat n$ satisfying $\hat n^2=-1$,
- quaternion slices $q = a + bI$ with $I^2 = -1$,
- the complex $2 \times 2$ representation of quaternions,
- a logarithmic scale coordinate $s = \log(\rho/\rho_*)$,
- spinor-valued or matrix-valued state spaces,
- spectral operators,
- commutators $[D,\pi(a)]$,
- compact, discrete, or truncated spectral structure,
- scale-localized spectral wells along $s \in \mathbb R$.

These primitives are deliberately conservative. They point toward established structures in geometry, representation theory, operator theory, conformal geometry, and spin geometry.

## Canonical Scale Decomposition

Every nonzero quaternion $Q \in \mathbb H\setminus\{0\}$ can be written uniquely as

$$
Q = \rho q,
$$

where

$$
\rho = \|Q\| > 0,
\qquad
q = \frac{Q}{\|Q\|} \in S^3.
$$

Choose a fixed reference scale $\rho_*>0$ and define the dimensionless logarithmic coordinate

$$
s = \log\left(\frac{\rho}{\rho_*}\right).
$$

Then

$$
Q = \rho_*e^s q,
$$

and the standard manifold decomposition becomes

$$
\mathbb H\setminus\{0\}
\cong
\mathbb R^+\times S^3
\cong
\mathbb R\times S^3.
$$

The mathematical decomposition is standard background. QSG makes the additional modeling choice to use $s$ as an internal scale coordinate on which spectral operators may act.

A translation

$$
s \mapsto s + a
$$

corresponds to the dilation

$$
\rho \mapsto e^a\rho.
$$

Thus equal coordinate intervals in $s$ represent equal multiplicative changes of scale.

## State Space

A QSG state is modeled as a point, field, or section carrying data over

$$
(q,s) \in S^3 \times \mathbb R.
$$

The $q$ coordinate records unit-quaternion orientation, phase, rotor, and polarization data. The $s$ coordinate records logarithmic dilation relative to $\rho_*$. Resonance level, anchor depth, or spectral selection are secondary structures produced by operators or localization profiles along $s$.

The first formal state spaces should be complex:

- spinor-valued functions on $S^3$ or $M$,
- finite-dimensional truncations of such functions,
- matrix models preserving quaternionic multiplication through $M_2(\mathbb C)$,
- discrete grids or finite spectral ladders in the $s$ coordinate.

Native quaternionic Hilbert spaces may become useful later, but they are not part of the minimum formal core.

## Quaternionic Hypersphere Coordinates

A quaternion can be written

$$
q = a + bi + cj + dk,
$$

with $i^2 = j^2 = k^2 = ijk = -1$. Unit quaternions form $S^3$ and are isomorphic to $SU(2)$.

A unit quaternion can also be written

$$
q = \cos(\phi) + \hat n\sin(\phi),
$$

where $\hat n$ is a unit imaginary quaternion. This expresses $S^3$ in rotor form: a real part, an oriented imaginary axis, and an angular coordinate.

The symbol $\hat n$ is canonical for the rotor axis in this repo. Earlier uses of $u$ for the unit imaginary quaternion should not be confused with the real scale coordinate. The real coordinate is denoted $s$.

A slice

$$
q = a + bI
$$

selects a complex plane inside $\mathbb H$, where $I$ is an imaginary unit satisfying $I^2 = -1$.

## The Manifold $M$

The central object is

$$
M = S^3 \times \mathbb R.
$$

The product separates normalized quaternionic orientation from logarithmic scale without treating them as unrelated. A function on $M$ may vary over quaternionic direction, angular position, and scale coordinate $s$.

The real coordinate can support:

- dilation and multiscale comparison,
- spectral selection,
- well-like localization,
- coherence levels,
- ladder or filtration structures,
- deformation parameters for operators on $S^3$.

The flat metric on $\mathbb H\setminus\{0\}$ can be written in radial coordinates as

$$
ds_{\mathbb H}^2 = d\rho^2 + \rho^2d\Omega_3^2.
$$

With $\rho=\rho_*e^s$,

$$
ds_{\mathbb H}^2
=
\rho_*^2e^{2s}\left(ds^2+d\Omega_3^2\right).
$$

Therefore nonzero flat quaternionic space is conformal to the cylinder $S^3\times\mathbb R$. QSG examples must state whether they use the flat cone metric, the product-cylinder metric, or another specified metric.

## Harmonics And Scale Modes

Harmonics on $S^3$ and modes along $s$ are distinct structures. A separated field may be written schematically as

$$
\Psi(q,s)
=
\sum_{\ell,\alpha}
\psi_{\ell,\alpha}(s)Y_{\ell,\alpha}(q),
$$

where $Y_{\ell,\alpha}$ is an $S^3$ harmonic and $\psi_{\ell,\alpha}(s)$ is its scale profile.

The harmonic label $\ell$ identifies angular or representation-theoretic structure on $S^3$. A discrete label produced by localization along $s$ identifies a scale-resonance mode. The coordinate $s$ itself is continuous and is not identical to either label.

## Spectral Operators

A QSG spectral operator is an operator whose spectrum reflects the geometry of $M$.

Candidate examples include:

- a Dirac-like operator on $S^3$,
- a Casimir-derived operator from the $SU(2)$ action,
- a finite Peter-Weyl truncation with a discrete spectral ladder,
- an $s$-direction derivative, difference operator, or potential term,
- a combined operator such as $D_M = D_{S^3} + D_s + V(s)$.

Each example should specify its domain or finite-dimensional substitute, algebra action, spectral behavior, metric choice, and relation to the geometry of $M$.

## Measurement And Observables

QSG observables should be represented by an algebra $\mathcal A$ acting on a state space $\mathcal H$ through a representation $\pi$.

For a spectral operator $D$, the commutator

$$
[D,\pi(a)]
$$

measures how $D$ detects variation in an observable $a$. In QSG, this can include variation along the hypersphere coordinate $q$, variation along the scale coordinate $s$, or coupled variation between them.

## Coherence

Coherence means persistence of structured phase, orientation, scale localization, resonance level, or spectral relationship across a transformation or operator action.

In early QSG work, coherence should be defined example by example. A useful example should state what is coherent, under which operator or action, and how that coherence can be computed, bounded, or compared.

## Spectral Wells

A spectral well is a region or profile along the scale coordinate $s$ where spectral behavior becomes selected, localized, or stable.

In a toy model, a well may be represented by a potential term $V(s)$, a weighting function, a discrete ladder, or a localization rule. A localized eigenfunction $\chi_n(s)$ represents concentration around a preferred scale band

$$
\rho_n = \rho_*e^{s_n}.
$$

The well index $n$ is discrete, while $s$ remains continuous. Resonance depth is therefore interpreted as localization in scale space.

AGQF-based well profiles remain conjectural extensions unless their operator, domain, spectrum, and physical interpretation are stated and checked in a concrete model.

## Claim Status

The following distinctions are canonical:

- The polar decomposition $Q=\rho q$ and the diffeomorphism $\mathbb H\setminus\{0\}\cong S^3\times\mathbb R$ are standard mathematics.
- Choosing $s=\log(\rho/\rho_*)$ as the real coordinate of the QSG model is a definition.
- Interpreting $s$ as a physically real, non-temporal scale dimension is a QSG hypothesis.
- Interpreting localized wells along $s$ as particle, energy, or stable physical modes is a model-dependent conjectural extension until derived and tested.

## What QSG Is Not

QSG is not a completed theory.

QSG is not a substitute for definitions, operator-domain checks, compactness conditions, or bounded-commutator proofs.

QSG is not an assertion that native quaternionic Hilbert spaces must be used immediately.

QSG does not identify the scale coordinate directly with time or with an energy eigenvalue.

QSG is a mathematical coordinate and operator framework for preserving orientation-sensitive, scale-sensitive, and resonance-sensitive structure.

## Minimum Viable Formal Core

The minimum viable formal core should contain:

1. A representation of quaternions as complex $2 \times 2$ matrices.
2. The model manifold $M = S^3 \times \mathbb R$.
3. The scale definition $s=\log(\rho/\rho_*)$ and a stated metric choice.
4. A small algebra of observables on $M$.
5. A complex spinor-valued or matrix-valued state space.
6. A candidate spectral operator on a finite or truncated model.
7. Explicit commutators $[D,\pi(a)]$.
8. A definition of coherence or scale-localized spectral wells in the example.
9. A clear separation between definitions, proved properties, conjectures, and physical interpretation.
