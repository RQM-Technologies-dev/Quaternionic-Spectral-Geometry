# Formalization Roadmap

This roadmap is intentionally incremental. Each phase should produce definitions, examples, or checks that can be reviewed independently.

## Phase 0: Canon And Vocabulary

Define QSG, its primitives, its relation to spectral triples, and its claim discipline.

Deliverables:

- canonical definition,
- glossary,
- bridge document,
- examples marked as toy, conjectural, or speculative.

## Phase 1: Quaternion-As-$M_2(\mathbb C)$ Representation

Formalize the standard representation of

$$
q = a + bi + cj + dk
$$

as a complex $2 \times 2$ matrix.

Deliverables:

- representation map,
- multiplication check,
- conjugation/norm relation,
- unit-quaternion to $SU(2)$ relation.

## Phase 2: $SU(2)/S^3$ Toy Geometry

Use $S^3 \cong SU(2)$ as the first geometric arena.

Deliverables:

- coordinate conventions,
- group action conventions,
- finite or truncated approximation strategy,
- statement of which smooth structures are being approximated.

## Phase 3: Spinor Hilbert Space

Represent the state space using complex spinors.

Deliverables:

- candidate $\mathcal H$,
- representation $\pi$ of the algebra,
- finite-dimensional substitute if using a truncation.

## Phase 4: Candidate Dirac/Spectral Operator

Select a Dirac-like, Casimir-derived, or finite spectral operator.

Deliverables:

- explicit operator definition,
- domain or finite-dimensional replacement,
- spectral data in the toy model.

## Phase 5: Bounded Commutators

Study commutators

$$
[D,\pi(a)].
$$

Deliverables:

- explicit commutator formulas,
- boundedness checks or finite-dimensional analogues,
- examples where the commutator encodes orientation-sensitive variation.

## Phase 6: Compact Resolvent / Finitely Summable Toy Model

Check compact resolvent or a finite-dimensional substitute.

Deliverables:

- statement of compactness target,
- discrete spectral ladder in the toy example,
- possible finite summability condition if appropriate.

## Phase 7: Anchored Extension $(S^3 \times \mathbb R_s)$

Introduce the optional anchor coordinate only after the unanchored core is clear.

Deliverables:

- definition of $s \in \mathbb R$,
- candidate anchored state space,
- examples of anchor wells as spectral selection or stabilization structures,
- clear label that this is research-program material.

## Phase 8: Lean/Mathlib Feasibility Bridge

Translate the smallest stable definitions into a Lean-friendly checklist.

Deliverables:

- dependencies needed from complex matrices and linear algebra,
- dependencies needed from $SU(2)$ or matrix groups,
- dependencies needed from spectral-triple formalization,
- a minimal theorem or example that can be attempted without speculative interpretation.
