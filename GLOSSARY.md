# Glossary

## Quaternion

An element of $\mathbb H$ of the form

$$
q = a + bi + cj + dk,
$$

where $a,b,c,d \in \mathbb R$ and $i^2 = j^2 = k^2 = ijk = -1$.

## Unit Quaternion

A quaternion with norm $1$. Unit quaternions form the 3-sphere $S^3$ and are isomorphic to $SU(2)$.

## $S^3$

The 3-sphere. In QSG, $S^3$ is important because it can be identified with the group of unit quaternions and with $SU(2)$.

## $SU(2)$

The group of complex $2 \times 2$ unitary matrices with determinant $1$. It is isomorphic to the unit quaternions and double-covers $SO(3)$.

## Slice

A complex plane inside $\mathbb H$ of the form

$$
q = a + bI,
$$

where $I$ is a chosen imaginary quaternionic unit with $I^2 = -1$.

## Spinor

An object carrying a representation of a spin group or related Clifford-algebraic structure. In this repo, spinors provide the first complex-linear setting for quaternionic and $SU(2)$-aware state data.

## Spectral Triple

A structure usually written $(\mathcal A,\mathcal H,D)$, where $\mathcal A$ is an algebra represented on a Hilbert space $\mathcal H$, and $D$ is a Dirac-type operator satisfying conditions such as bounded commutators and compact resolvent in appropriate settings.

## Dirac Operator

A first-order differential operator central to spin geometry and spectral geometry. In QSG, Dirac-like operators are candidate spectral operators for orientation-sensitive geometry.

## Compact Resolvent

A property of an unbounded operator $D$ stating, roughly, that $(D-\lambda)^{-1}$ is compact for suitable $\lambda$ in the resolvent set. This often leads to discrete spectral behavior.

## Commutator

For operators $D$ and $\pi(a)$, the commutator is

$$
[D,\pi(a)] = D\pi(a) - \pi(a)D.
$$

In spectral geometry, commutators often encode derivative-like information.

## Anchor

An optional QSG coordinate or parameter, usually denoted $s \in \mathbb R$, used to describe stabilization, selection, or localization of spectral structure.

## Coherence

Persistence of structured phase, orientation, polarization, or spectral relationship across a transformation, measurement, or evolution.

## Quaternionic Spectral Geometry

A developing framework for studying systems whose relevant structure includes coupled phase, rotation, orientation, polarization, and coherence data represented through quaternionic/SU(2)-aware spectral structures.

## Resonant Quantum Mechanics

A broader research direction concerned with resonance, coherence, spectral selection, and measurement structure. In this repository, it should be treated as contextual motivation, not as a completed theory or required formal assumption.
