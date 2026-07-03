# SU(2), Spinors, And Quaternions

The unit quaternions, the 3-sphere $S^3$, and the group $SU(2)$ are closely related:

$$
S^3 \cong \{q \in \mathbb H : \|q\| = 1\} \cong SU(2).
$$

This relationship is the hypersphere core of QSG.

## Quaternions

A quaternion is

$$
q = a + bi + cj + dk.
$$

Unit quaternions encode rotations and orientations. A unit quaternion can be written in rotor form as

$$
q = \cos(\phi) + u\sin(\phi),
$$

where $u$ is a unit imaginary quaternion.

## Pauli-Matrix Form

A quaternion can be represented by a complex $2 \times 2$ matrix. One common convention is

$$
q = a + bi + cj + dk
\mapsto
\begin{pmatrix}
a + bi & c + di \\
-c + di & a - bi
\end{pmatrix}.
$$

Under this representation, unit quaternions map to $SU(2)$ matrices.

## Spinors

Spinors provide a natural complex-linear setting for $SU(2)$ actions. Because QSG starts with $M = S^3 \times \mathbb R$, spinor-valued functions on the hypersphere, optionally indexed by the real coordinate $s$, are a practical first state-space target.

## Practical Bridge

The route

$$
\mathbb H \hookrightarrow M_2(\mathbb C)
$$

allows quaternionic data to be handled with complex matrices. This avoids requiring native quaternionic Hilbert-space theory before the first examples on $M$ are understood.
