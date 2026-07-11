# Formalization Roadmap

This roadmap is intentionally incremental. Each phase should produce definitions, examples, or checks that can be reviewed independently.

## Phase 0: Canon And Vocabulary

Define QSG, the model manifold $M = S^3 \times \mathbb R$, the quaternionic hypersphere vocabulary, the logarithmic scale coordinate, and the distinction between definitions, examples, conjectures, and interpretation.

Deliverables:

- canonical definition,
- glossary,
- hypersphere coordinate notes,
- scale-coordinate foundation,
- spectral formalization bridge.

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

## Phase 2: Quaternionic Hypersphere Geometry

Use

$$
S^3 = \{q \in \mathbb H : \|q\| = 1\}
$$

as the first geometric arena.

Deliverables:

- rotor coordinates $q = \cos(\phi) + \hat n\sin(\phi)$,
- explicit distinction between the rotor axis $\hat n$ and scale coordinate $s$,
- slice conventions $q = a + bI$,
- group action conventions through $SU(2)$,
- geodesic or great-circle examples.

## Phase 3: Scale Geometry On $M = S^3 \times \mathbb R$

Add the real coordinate

$$
s = \log\left(\frac{\rho}{\rho_*}\right)
$$

from the standard decomposition $Q=\rho q$ of a nonzero quaternion.

Deliverables:

- point notation $(q,s)$,
- derivation of $\mathbb H\setminus\{0\}\cong S^3\times\mathbb R$,
- cone-metric and product-cylinder metric options,
- functions and observables on $M$,
- discrete, compact, or confined approximations of the $s$ direction,
- examples of scale profiles before resonance claims are introduced.

## Phase 4: State Space And Mode Separation

Represent states using complex spinors, matrix-valued functions, or finite truncations.

Deliverables:

- candidate $\mathcal H$,
- representation $\pi$ of the algebra,
- finite-dimensional substitute if using a truncation,
- separation between $S^3$ harmonics $Y_{\ell,\alpha}(q)$ and scale profiles $\psi_{\ell,\alpha}(s)$.

## Phase 5: Candidate Spectral Operator

Select a spectral operator on the toy model.

Deliverables:

- $S^3$ operator component,
- $s$-direction operator component,
- optional potential or well profile $V(s)$,
- stated metric and operator measure,
- explicit finite matrix form when possible.

## Phase 6: Commutators And Variation

Study commutators

$$
[D,\pi(a)].
$$

Deliverables:

- explicit commutator formulas,
- boundedness checks or finite-dimensional analogues,
- examples where the commutator detects hypersphere variation, scale variation, or both.

## Phase 7: Scale-Localized Spectral Wells And Coherence

Define spectral wells and coherence in the toy model only after the scale coordinate and operator are fixed.

Deliverables:

- mathematical definition of a well profile,
- selected or localized scale modes $\chi_n(s)$,
- mapping from well centers $s_n$ to physical scales $\rho_n=\rho_*e^{s_n}$,
- coherence measure or comparison rule,
- distinction between proved behavior and conjectural physical interpretation,
- an explicit decision on whether any $s\mapsto-s$ macro-micro symmetry is intended.

## Phase 8: Feasibility Bridge

Translate the smallest stable definitions into a formalization checklist.

Deliverables:

- dependencies needed from complex matrices and linear algebra,
- dependencies needed from $SU(2)$ or matrix groups,
- dependencies needed from conformal and operator geometry,
- a minimal theorem or example that can be attempted without interpretive claims,
- a comparison showing whether the model adds structure beyond an ordinary radial or conformal reformulation.
