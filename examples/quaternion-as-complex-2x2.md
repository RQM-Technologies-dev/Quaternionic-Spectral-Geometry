# Quaternion As A Complex $2 \times 2$ Matrix

Let

$$
q = a + bi + cj + dk.
$$

A standard complex matrix representation is

$$
q \mapsto
\begin{pmatrix}
a + bi & c + di \\
-c + di & a - bi
\end{pmatrix}.
$$

This sends quaternion multiplication to matrix multiplication under the chosen convention. Unit quaternions correspond to matrices in $SU(2)$.

## Rotor Form

For unit quaternions, a useful hypersphere coordinate is

$$
q = \cos(\phi) + \hat n\sin(\phi),
$$

where $\hat n$ is a unit imaginary quaternion.

This describes a point on $S^3$ by an angular coordinate and an oriented imaginary axis. The rotor-axis symbol $\hat n$ is distinct from the real scale coordinate $s$.

## Magnitude And Scale

For a nonzero quaternionic coordinate $Q$, write

$$
Q=\rho q,
\qquad
\rho=\|Q\|>0,
\qquad
q\in S^3.
$$

After choosing a reference scale $\rho_*>0$, define

$$
s=\log\left(\frac{\rho}{\rho_*}\right),
$$

so that

$$
Q=\rho_*e^s q.
$$

The complex matrix representation therefore separates normalized $SU(2)$ orientation from logarithmic magnitude.

## Bridge To $M$

In QSG, a point of the model manifold is

$$
(q,s) \in S^3 \times \mathbb R.
$$

The matrix representation sends this to a pair $(U,s)$ where $U \in SU(2)$ is a complex $2 \times 2$ matrix. The associated non-unit quaternionic matrix is $\rho_*e^sU$.

This is the practical first bridge because:

- it uses complex matrices rather than native quaternionic Hilbert spaces,
- it keeps spinor actions complex-linear,
- it connects unit quaternions to $SU(2)$,
- it separates orientation from scale,
- it permits explicit finite-dimensional examples,
- it gives a concrete starting point for operator and commutator calculations on $M$.
