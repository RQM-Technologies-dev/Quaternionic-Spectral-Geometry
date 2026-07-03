# Spectral-Triple Anchor

This page states the smallest mathematical object that Quaternionic Spectral Geometry (QSG) is trying to make precise in spectral-triple language.

The guiding question is:

> Can the QSG model be stated as an honest spectral triple, first on a compact $S^3 \cong SU(2)$ prototype and then on anchored or compact variants of $S^3 \times \mathbb R$?

This is a formulation target, not a claim that the target has already been proved.

## Compact Prototype

The first technically inspectable object should be a compact model

$$
(\mathcal A_0, \mathcal H_0, D_0)
$$

on $S^3 \cong SU(2)$.

Candidate data:

- $\mathcal A_0$: smooth functions on $S^3$, a small coordinate-function algebra, or a finite Peter-Weyl truncation.
- $\mathcal H_0$: complex spinor-valued $L^2(S^3)$, or a finite-dimensional truncation of that space.
- $D_0$: the classical Dirac operator on $S^3$, an $SU(2)$-equivariant Dirac-type operator, or a finite spectral operator with an explicit matrix form.
- $\pi$: multiplication or matrix action of $\mathcal A_0$ on $\mathcal H_0$.

The quaternionic ingredient should enter through the standard complex representation

$$
\mathbb H \hookrightarrow M_2(\mathbb C),
$$

so that unit quaternions are treated as $SU(2)$ matrices and the Hilbert-space language remains complex-linear.

## Checks To Prove

For an infinite-dimensional compact prototype, the basic checks are:

- $D_0$ is densely defined and self-adjoint.
- $(D_0 - \lambda)^{-1}$ is compact for some $\lambda$ in the resolvent set.
- $[D_0,\pi(a)]$ is bounded for the chosen algebra elements.
- The spectrum or spectral ladder is computable.
- The model can be compared with finitely summable spectral-triple definitions.
- A possible index pairing is stated only after the relevant Fredholm or spectral-triple structure is available.

For a finite or truncated prototype, the page should state exactly which infinite-dimensional requirements are replaced by finite-dimensional analogues.

## Anchored Variant

The anchored QSG model uses

$$
M = S^3 \times \mathbb R
$$

with a real coordinate $s$.

A candidate operator has schematic form

$$
D_M = D_{S^3} + \Gamma \partial_s + V(s),
$$

where $V(s)$ is a potential, spectral-well profile, compactifying term, or finite-ladder substitute.

Because $S^3 \times \mathbb R$ is noncompact, compact resolvent should not be assumed. The anchored model must choose one of the following before claiming a spectral triple:

- compactify or restrict the $s$ coordinate,
- impose a confining operator profile that gives discrete spectrum,
- work with a finite-dimensional or truncated analogue,
- or explicitly use a noncompact spectral-triple variant with the correct axioms.

## Minimal Theorem Target

The first theorem target should be deliberately modest:

> The compact $S^3 \cong SU(2)$ prototype, represented through complex spinors and $\mathbb H \hookrightarrow M_2(\mathbb C)$, satisfies the selected spectral-triple axioms or identifies the exact missing checks.

The anchored $S^3 \times \mathbb R$ model should come only after the compact prototype has a precise algebra, Hilbert space, operator, representation, and commutator calculations.

## Lean-Oriented Target

A Lean-compatible path should start with definitions that avoid speculative interpretation:

- the quaternion-to-$M_2(\mathbb C)$ representation,
- the unit-quaternion to $SU(2)$ relation,
- a finite matrix or finite Peter-Weyl-style model,
- explicit operator and commutator calculations,
- comparison with existing spectral-triple predicates where the needed analytic infrastructure exists.

The goal is not to ask an external project to adopt QSG. The goal is to produce a small object that a spectral-triples formalization project could criticize technically.

## Non-Goals

This page does not claim that QSG is a completed theory.

It does not claim a new physical result.

It does not claim that native quaternionic Hilbert spaces are required.

It does not claim affiliation with any external Lean, Mathlib, or spectral-triples repository.
