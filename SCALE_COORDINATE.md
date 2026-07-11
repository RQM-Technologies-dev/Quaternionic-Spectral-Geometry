# Scale Coordinate Foundation

## Purpose

This document fixes the canonical meaning of the real coordinate in

$$
M=S^3\times\mathbb R.
$$

The real coordinate is fundamentally a logarithmic dilation coordinate. Spectral selection, anchor depth, and resonance wells are structures placed along this coordinate rather than its primitive definition.

## Standard Quaternionic Decomposition

For every nonzero quaternion $Q\in\mathbb H\setminus\{0\}$, define

$$
\rho=\|Q\|>0,
\qquad
q=\frac{Q}{\|Q\|}\in S^3.
$$

Then

$$
Q=\rho q.
$$

This gives the standard polar decomposition

$$
\mathbb H\setminus\{0\}\cong\mathbb R^+\times S^3.
$$

Choose a reference scale $\rho_*>0$ and introduce

$$
s=\log\left(\frac{\rho}{\rho_*}\right).
$$

Because $\rho=\rho_*e^s$, one obtains

$$
\mathbb H\setminus\{0\}\cong S^3\times\mathbb R.
$$

The reference scale determines the origin $s=0$ but does not change scale differences.

## Why Logarithmic Scale

Physical and mathematical scales are multiplicative. The logarithm converts multiplication into translation:

$$
\rho\mapsto\lambda\rho
\quad\Longleftrightarrow\quad
s\mapsto s+\log\lambda.
$$

Equal intervals in $s$ therefore represent equal ratios of size, wavelength, or characteristic length. This makes $s$ appropriate for systems spanning many orders of magnitude.

The coordinate may also be written in base ten for visualization,

$$
s_{10}=\log_{10}\left(\frac{\rho}{\rho_*}\right),
$$

but natural logarithms are canonical for differential operators.

## Geometry

The flat metric on $\mathbb H\cong\mathbb R^4$ is

$$
ds_{\mathbb H}^2=d\rho^2+\rho^2d\Omega_3^2.
$$

Using $\rho=\rho_*e^s$ gives

$$
ds_{\mathbb H}^2
=
\rho_*^2e^{2s}\left(ds^2+d\Omega_3^2\right).
$$

Thus punctured quaternionic space is conformal to a cylinder. QSG may use either:

- the cone metric inherited from flat quaternionic space,
- the normalized product metric $ds^2+d\Omega_3^2$,
- another stated warped or coupled metric.

These choices are not equivalent for every operator calculation, so each formal model must state its metric.

## Distinction From Time

The scale coordinate is not ordinary time. A state may depend on both scale and time:

$$
\Psi(q,s,t).
$$

Here $t$ generates physical evolution, while $s$ indexes internal dilation. Any proposal to relate $s$ to proper time, renormalization flow, or causal evolution requires a separate derivation and is not part of the minimum QSG definition.

## Distinction From The Rotor Axis

A unit quaternion is written canonically as

$$
q=\cos\phi+\hat n\sin\phi,
$$

where $\hat n$ is a unit imaginary quaternion. The symbol $\hat n$ belongs to the $S^3$ coordinate and specifies the rotor axis.

The real scalar $s$ belongs to the separate $\mathbb R$ factor and specifies logarithmic scale. These objects live in different spaces:

$$
\hat n\in S^2\subset\operatorname{Im}\mathbb H,
\qquad
s\in\mathbb R.
$$

## Harmonics And Scale Modes

Let $Y_{\ell,\alpha}(q)$ denote harmonics on $S^3$. A field may be separated as

$$
\Psi(q,s,t)
=
\sum_{\ell,\alpha}
\psi_{\ell,\alpha}(s,t)Y_{\ell,\alpha}(q).
$$

The index $\ell$ identifies harmonic or representation structure on $S^3$. The coordinate $s$ describes how that harmonic is distributed across scale.

If an operator along $s$ has localized eigenmodes $\chi_n(s)$, then $n$ is a separate discrete scale-mode label. Schematically,

$$
\Psi_{\ell,\alpha,n}(q,s)
=
Y_{\ell,\alpha}(q)\chi_n(s).
$$

## Spectral And Resonance Structure

A scale-direction operator may take a form such as

$$
L_s=-\frac{d^2}{ds^2}+V(s).
$$

Localized solutions satisfy

$$
L_s\chi_n=\lambda_n\chi_n.
$$

If $\chi_n$ is concentrated near $s_n$, the selected physical scale is

$$
\rho_n=\rho_*e^{s_n}.
$$

This yields the canonical hierarchy:

$$
\text{continuous scale coordinate}
\longrightarrow
\text{spectral operator or potential}
\longrightarrow
\text{localized resonance modes}.
$$

Resonance depth is therefore localization in scale space. It is not a second independent meaning imposed on an otherwise undefined coordinate.

## Relation To Energy

The scale coordinate is not itself energy. A model may relate characteristic length and energy, for example through

$$
E\sim\frac{\hbar c}{\rho},
$$

which gives

$$
E(s)\sim E_*e^{-s}.
$$

This is a derived scale-energy relation and depends on the physical system. Energy remains an eigenvalue or observable of the full model.

## AGQF Interpretation

When an AGQF-inspired potential is written as a function of $s$, its wells should be interpreted as preferred scale bands. A well centered at $s_n$ selects $\rho_n=\rho_*e^{s_n}$.

If a potential depends only on $s^2$, it is symmetric under $s\mapsto-s$. In scale variables this exchanges

$$
\rho_*e^s
\longleftrightarrow
\rho_*e^{-s},
$$

so paired scales satisfy

$$
\rho_+\rho_-=\rho_*^2.
$$

A concrete AGQF model must state whether this reciprocal macro-micro symmetry is intended or is only an artifact of the chosen well profile.

## Claim Status

### Standard background

- $Q=\rho q$ for $Q\ne0$, with $q\in S^3$ and $\rho>0$.
- $\mathbb H\setminus\{0\}\cong\mathbb R^+\times S^3$.
- $s=\log(\rho/\rho_*)$ converts dilation into translation.
- The punctured flat metric is conformal to the cylinder $S^3\times\mathbb R$.

### QSG definitions

- The basic model manifold is $M=S^3\times\mathbb R$.
- The real coordinate is denoted $s$ and is interpreted first as logarithmic scale.
- The rotor axis is denoted $\hat n$, not $s$.

### Model-dependent hypotheses

- The scale coordinate represents a physically real non-temporal dimension.
- Spectral wells along $s$ correspond to stable physical states.
- Particular AGQF profiles select observed particle, atomic, or cosmological scales.

These hypotheses require complete operators, boundary conditions, calculations, comparisons with standard theory, and testable consequences.
