# Formalization Roadmap

This roadmap is intentionally incremental. Each phase should produce definitions, examples, or checks that can be reviewed independently.

## Phase 0: Canon And Vocabulary

Define QSG, the model manifold $M = S^3 \times \mathbb R$, the quaternionic hypersphere vocabulary, the logarithmic scale coordinate, the quaternionic factorial convention, and the distinction between definitions, examples, prototypes, conjectures, and interpretation.

Deliverables:

- canonical definition,
- glossary,
- hypersphere coordinate notes,
- scale-coordinate foundation,
- quaternionic-factorial foundation,
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
- separation between $S^3$ harmonics $Y_{\ell,\alpha}(q)$ and scale profiles $\psi_{\ell,\alpha}(s)$,
- a precise statement that $\Psi(q,s,t)$ is a state in $\mathcal H$ at fixed $t$, not a spectral triple.

## Phase 5: Scalar Quaternionic Factorial Baseline

Study

$$
\mathfrak F(q)
=
\int_0^\infty e^{-x}x^q\,dx
=
\Gamma(q+1)
$$

within the complex slice containing $q$.

Deliverables:

- domain and indexing convention,
- recurrence $\mathfrak F(q+1)=(q+1)\mathfrak F(q)$,
- conjugation and reflection identities,
- axis-covariant form $\mathfrak F(a+r\hat n)=A(a,r)+\hat n B(a,r)$,
- numerical comparison between the defining integral and complex Gamma,
- explicit statement that one scalar value is an intrinsic slice extension rather than a new spectrum.

## Phase 6: Cross-Slice And Operator Factorials

Move from independent scalar values to ordered composition and functional calculus.

Deliverables:

- derivation of

  $$
  [F_{\hat n},F_{\hat m}]
  =
  2B^2(\hat n\times\hat m),
  $$

- comparison between pointwise quaternion multiplication and slice-function products,
- a finite operator

  $$
  T=a\mathbf 1+b_1L_1+b_2L_2+b_3L_3
  $$

  acting on truncated $S^3$ harmonics,
- a stated matrix or quaternionic functional calculus for $\Gamma(T+1)$,
- spectrum, norm, and commutator comparisons,
- basis-independent diagnostics separating genuine operator structure from coordinate choice.

## Phase 7: Candidate Spectral Operator And Triple

Select a spectral operator on the geometric toy model independently of any factorial-based well construction.

Deliverables:

- $S^3$ operator component,
- $s$-direction operator component,
- stated metric and operator measure,
- explicit finite matrix form when possible,
- algebra $\mathcal A$, state space $\mathcal H$, and representation $\pi$,
- domain, self-adjointness, compact-resolvent or finite-analogue checks.

## Phase 8: Commutators And Variation

Study commutators

$$
[D,\pi(a)]
$$

and compare them with factorial-operator commutators.

Deliverables:

- explicit geometric commutator formulas,
- boundedness checks or finite-dimensional analogues,
- examples where the commutator detects hypersphere variation, scale variation, or both,
- comparison with $[\Gamma(T_1+1),\Gamma(T_2+1)]$,
- separation of geometric derivatives from ordered quaternionic composition.

## Phase 9: Optional Localization, Wells, And Coherence

Introduce spectral wells or anchor-generating factors only after the scale coordinate, scalar factorial, operator factorial, and base spectral operator are fixed.

Deliverables:

- mathematical definition of any proposed well or prefactor,
- proof that the extension is not already contained in the scalar factorial,
- selected or localized scale modes $\chi_n(s)$,
- mapping from well centers $s_n$ to physical scales $\rho_n=\rho_*e^{s_n}$,
- coherence measure or comparison rule,
- distinction between proved behavior and conjectural physical interpretation,
- an explicit decision on whether any $s\mapsto-s$ macro-micro symmetry is intended.

AGQF belongs in this phase as an optional conjectural extension, not in the primitive definition of QSG or of the quaternionic factorial.

## Phase 10: Feasibility And Novelty Bridge

Translate the smallest stable definitions into a formalization and comparison checklist.

Deliverables:

- dependencies needed from complex matrices and linear algebra,
- dependencies needed from $SU(2)$ or matrix groups,
- dependencies needed from conformal and operator geometry,
- dependencies needed from intrinsic quaternionic functional calculus,
- a minimal theorem or example that can be attempted without interpretive claims,
- a comparison showing whether the model adds structure beyond ordinary radial, conformal, or complex matrix reformulations,
- a falsifiable statement of what would count as a distinctive QSG result.
