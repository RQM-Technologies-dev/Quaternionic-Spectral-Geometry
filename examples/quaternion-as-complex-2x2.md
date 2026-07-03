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
q = \cos(\phi) + u\sin(\phi),
$$

where $u$ is a unit imaginary quaternion.

This describes a point on $S^3$ by an angular coordinate and an oriented imaginary axis.

## Bridge To $M$

In QSG, a point of the model manifold is

$$
(q,s) \in S^3 \times \mathbb R.
$$

The matrix representation sends this to a pair $(Q,s)$ where $Q \in SU(2)$ is a complex $2 \times 2$ matrix.

This is the practical first bridge because:

- it uses complex matrices rather than native quaternionic Hilbert spaces,
- it keeps spinor actions complex-linear,
- it connects unit quaternions to $SU(2)$,
- it permits explicit finite-dimensional examples,
- it gives a concrete starting point for operator and commutator calculations on $M$.
