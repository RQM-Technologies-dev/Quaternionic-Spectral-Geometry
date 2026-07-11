# QSG Course Canon Export

This directory is the repo-native course canon for Quaternionic Spectral Geometry.

The public GitHub repository is the trunk. Storefront course pages are branches that should mirror this material rather than invent their own independent source of truth.

## Files

- `roots.json`: canonical QSG root concepts, claim status, and source pages.
- `course-manifest.json`: chapter and section structure with derivation metadata.
- `glossary.json`: course glossary terms.
- `notation.json`: course notation index.
- `derivation-map.json`: route-to-root mapping for storefront mirrors.

## Current Canon Priority

The current research order is:

1. logarithmic scale geometry on $S^3\times\mathbb R$,
2. the scalar quaternionic factorial $\mathfrak F(q)=\Gamma(q+1)$,
3. cross-slice ordered composition,
4. a finite operator-valued factorial $\Gamma(T+1)$,
5. optional anchored or well-generating extensions only after those baselines are understood.

`roots.json`, `glossary.json`, and `notation.json` already encode this hierarchy. The existing `course-manifest.json` still contains a legacy AGQF-centered chapter structure and should be treated as awaiting a later course rewrite rather than as authority over the updated roots.

New storefront work should derive quaternionic-factorial material from [`QUATERNIONIC_FACTORIAL.md`](../../QUATERNIONIC_FACTORIAL.md) and should not present AGQF as part of the primitive QSG definition.

## Claim Status

Roots and course items use conservative status labels:

- `definition`
- `standard-background`
- `example`
- `prototype`
- `conjectural-extension`
- `application-lens`
- `frontier-question`

This keeps compact `S^3` prototypes, scalar slice-function definitions, cross-slice prototypes, scale-extended models, and conjectural anchored constructions distinct. Teaching pages should not imply completed physics, proof of open problems, or replacement of standard mathematics.
