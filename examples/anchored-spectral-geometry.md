# The Manifold $M = S^3 \times \mathbb R$

The central QSG model is

$$
M = S^3 \times \mathbb R.
$$

This is not an optional extension. It is the basic mathematical stage for QSG examples.

## Coordinates

A point of $M$ is written

$$
(q,s),
$$

where $q \in S^3$ is a unit quaternion and $s \in \mathbb R$ is a logarithmic scale coordinate.

For a nonzero quaternionic coordinate $Q$, write

$$
Q = \rho q,
\qquad
q = \frac{Q}{\|Q\|} \in S^3,
\qquad
\rho=\|Q\|>0.
$$

After choosing a reference scale $\rho_*>0$, define

$$
s = \log\left(\frac{\rho}{\rho_*}\right),
$$

so that

$$
Q = \rho_*e^s q.
$$

The quaternion coordinate can be written in rotor form:

$$
q = \cos(\phi) + \hat n\sin(\phi),
$$

where $\hat n$ is a unit imaginary quaternion. The symbol $\hat n$ denotes the rotor axis and is not the scale coordinate.

## Hypersphere Geometry

The $S^3$ coordinate carries:

- orientation,
- rotor structure,
- slice structure,
- $SU(2)$ group action,
- geodesic or great-circle motion.

Slices $q = a + bI$ provide complex planes inside $\mathbb H$ and make it possible to compare local complex behavior with global quaternionic behavior.

## Scale Coordinate

The real coordinate $s$ records multiplicative scale as additive displacement:

$$
s\mapsto s+a
\quad\Longleftrightarrow\quad
\rho\mapsto e^a\rho.
$$

It can support:

- multiscale comparison,
- spectral filtration,
- operator deformation,
- scale-dependent coherence,
- localization into preferred scale bands.

The coordinate should be defined mathematically in each example rather than treated only as a metaphor.

## Cone And Cylinder Metrics

The Euclidean metric on nonzero quaternionic space is

$$
ds_{\mathbb H}^2 = d\rho^2 + \rho^2d\Omega_3^2.
$$

Substituting $\rho=\rho_*e^s$ gives

$$
ds_{\mathbb H}^2
=
\rho_*^2e^{2s}\left(ds^2+d\Omega_3^2\right).
$$

Thus $\mathbb H\setminus\{0\}$ is conformal to the cylinder $S^3\times\mathbb R$. A concrete example must state whether it uses this cone metric, the product metric

$$
ds_M^2 = ds^2+d\Omega_3^2,
$$

or another specified metric.

## Separating Hypersphere Harmonics From Scale Modes

A field can be expanded schematically as

$$
\Psi(q,s)
=
\sum_{\ell,\alpha}
\psi_{\ell,\alpha}(s)Y_{\ell,\alpha}(q),
$$

where $Y_{\ell,\alpha}(q)$ is a harmonic on $S^3$ and $\psi_{\ell,\alpha}(s)$ is its scale profile.

The label $\ell$ specifies harmonic structure on $S^3$. A separate label $n$ may arise when the scale profile is localized into a discrete well or eigenmode. The continuous coordinate $s$ is not itself either discrete label.

## Scale-Localized Spectral Wells

A spectral well is a function, region, or operator term along the $s$ coordinate that selects or localizes spectral modes.

In a toy model, this can be represented as a potential term

$$
V(s)
$$

inside a spectral operator such as

$$
D_M = D_{S^3} + D_s + V(s).
$$

For a second-order scale operator, one may instead study

$$
\left[-\frac{d^2}{ds^2}+V(s)\right]\chi_n(s)
=
\lambda_n\chi_n(s).
$$

If $\chi_n$ is concentrated near $s_n$, then the corresponding preferred physical scale is

$$
\rho_n = \rho_*e^{s_n}.
$$

This is the precise sense in which resonance depth can be interpreted as localization in scale space.

## Claim Boundary

The decomposition $Q=\rho q$ and the coordinate change $s=\log(\rho/\rho_*)$ are standard mathematics.

Using $s$ as the real coordinate of QSG is a model definition. Treating $s$ as a physically real non-temporal dimension, or interpreting scale-localized wells as stable particles or measured energy levels, remains a hypothesis requiring a complete operator model and empirical consequences.

## First Formal Core

The first formal QSG core should establish:

- the quaternion-as-$M_2(\mathbb C)$ bridge,
- the model manifold $M = S^3 \times \mathbb R$,
- the scale definition $s=\log(\rho/\rho_*)$,
- a stated metric on $M$,
- a small algebra of observables on $M$,
- a state space,
- a candidate spectral operator,
- explicit commutators.
