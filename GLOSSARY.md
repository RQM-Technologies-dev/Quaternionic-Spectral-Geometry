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

The 3-sphere. In QSG, $S^3$ is the unit-quaternion hypersphere and the primary orientation coordinate.

## $SU(2)$

The group of complex $2 \times 2$ unitary matrices with determinant $1$. It is isomorphic to the unit quaternions and double-covers $SO(3)$.

## $M = S^3 \times \mathbb R$

The central QSG model manifold. A point of $M$ is written $(q,s)$, where $q \in S^3$ is a unit quaternion and $s \in \mathbb R$ is a real resonance or anchor coordinate.

## Slice

A complex plane inside $\mathbb H$ of the form

$$
q = a + bI,
$$

where $I$ is a chosen imaginary quaternionic unit with $I^2 = -1$.

## Rotor Coordinate

A unit-quaternion expression

$$
q = \cos(\phi) + u\sin(\phi),
$$

where $u$ is a unit imaginary quaternion. This records angular position and orientation on $S^3$.

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

The real coordinate $s \in \mathbb R$ in $M = S^3 \times \mathbb R$. It indexes anchor height, spectral selection, or resonance level in a mathematical model.

## Spectral Well

A region, profile, or potential along the $s$ coordinate where spectral modes become selected, localized, or stable.

## Coherence

Persistence of structured phase, orientation, resonance level, or spectral relationship across a transformation or operator action.

## Quaternionic Spectral Geometry

A developing mathematical framework for studying spectral, metric, phase, orientation, coherence, and resonance structures on quaternionic hypersphere spaces, especially $M = S^3 \times \mathbb R$.
