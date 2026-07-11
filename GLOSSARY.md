# Glossary

## Quaternion

An element of $\mathbb H$ of the form

$$
q = a + bi + cj + dk,
$$

where $a,b,c,d \in \mathbb R$ and $i^2 = j^2 = k^2 = ijk = -1$.

## Unit Quaternion

A quaternion with norm $1$. Unit quaternions form the 3-sphere $S^3$ and are isomorphic to $SU(2)$.

## Quaternionic Hypersphere

The space $S^3$ of unit quaternions. It is a hypersphere in $\mathbb R^4$ and carries quaternionic multiplication inherited from $\mathbb H$.

## $S^3$

The 3-sphere. In QSG, $S^3$ is the unit-quaternion hypersphere and the primary normalized orientation coordinate.

## $SU(2)$

The group of complex $2 \times 2$ unitary matrices with determinant $1$. It is isomorphic to the unit quaternions and double-covers $SO(3)$.

## $M = S^3 \times \mathbb R$

The central QSG model manifold. A point of $M$ is written $(q,s)$, where $q \in S^3$ is a unit quaternion and $s \in \mathbb R$ is a dimensionless logarithmic scale coordinate.

## Scale Coordinate

The real coordinate

$$
s = \log\left(\frac{\rho}{\rho_*}\right),
$$

where $\rho>0$ is quaternionic magnitude and $\rho_*>0$ is a chosen reference scale. It converts multiplicative dilation into translation: $s\mapsto s+a$ corresponds to $\rho\mapsto e^a\rho$.

## Dilation

A multiplicative change of scale, $\rho\mapsto \lambda\rho$ with $\lambda>0$. In the logarithmic coordinate, this becomes the additive translation $s\mapsto s+\log\lambda$.

## Slice

A complex plane inside $\mathbb H$ of the form

$$
q = a + bI,
$$

where $I$ is a chosen imaginary quaternionic unit with $I^2 = -1$.

## Rotor Coordinate

A unit-quaternion expression

$$
q = \cos(\phi) + \hat n\sin(\phi),
$$

where $\hat n$ is a unit imaginary quaternion. This records angular position and orientation on $S^3$. The rotor axis $\hat n$ is distinct from the real scale coordinate $s$.

## Spinor

An object carrying a representation of a spin group or related Clifford-algebraic structure. In this repo, spinors provide a complex-linear setting for quaternionic and $SU(2)$-aware state data.

## Spectral Formalism

A way of encoding geometry through algebras, state spaces, operators, commutators, and spectra.

## Spectral Operator

An operator whose spectrum reflects the geometry of a chosen state space. In QSG, a spectral operator may combine a hypersphere component with an $s$-direction component.

## Compact Resolvent

A property of an unbounded operator $D$ stating, roughly, that $(D-\lambda)^{-1}$ is compact for suitable $\lambda$ in the resolvent set. This often leads to discrete spectral behavior.

## Commutator

For operators $D$ and $\pi(a)$, the commutator is

$$
[D,\pi(a)] = D\pi(a) - \pi(a)D.
$$

In spectral geometry, commutators often encode derivative-like information.

## Resonance Coordinate

A secondary descriptive name for the scale coordinate $s$ when a specific model places potentials, filters, or boundary conditions along it. Resonance is not the primitive definition of $s$; it is structure generated or selected in scale space.

## Resonance Depth

The degree or location of localization within a well along the scale coordinate. In a model with preferred positions $s_n$, the associated physical scales are $\rho_n=\rho_*e^{s_n}$.

## Spectral Well

A region, profile, or potential along the scale coordinate $s$ where spectral modes become selected, localized, or stable. A discrete well label is not the same object as the continuous coordinate $s$.

## Scale Mode

A localized or eigenmode profile $\chi_n(s)$ along the scale coordinate. It is distinct from an $S^3$ harmonic $Y_{\ell,\alpha}(q)$, although a full QSG state may couple both.

## Coherence

Persistence of structured phase, orientation, scale localization, resonance level, or spectral relationship across a transformation or operator action.

## Quaternionic Spectral Geometry

A developing mathematical framework for studying spectral, metric, phase, orientation, coherence, scale, and resonance structures on quaternionic hypersphere spaces, especially $M = S^3 \times \mathbb R$.
