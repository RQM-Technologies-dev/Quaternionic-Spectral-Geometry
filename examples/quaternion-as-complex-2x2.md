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

## Why This Is The First Bridge

This representation is the practical first bridge into complex Hilbert spaces and Lean/Mathlib-style formalization because:

- it uses complex matrices rather than native quaternionic Hilbert spaces,
- it keeps spinor actions complex-linear,
- it connects unit quaternions to $SU(2)$,
- it permits explicit finite-dimensional examples,
- it gives a concrete starting point for operator and commutator calculations.

In QSG, this representation should be treated as the first formal interface, not as a complete theory by itself.
