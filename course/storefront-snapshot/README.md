# Storefront QSG Course Snapshot

> Historical material. Not active RQM Technical Canon v2. Retained for research
> provenance. See EXP-007 and the
> [AGQF retirement notice](../../AGQF_RETIREMENT_NOTICE.md).

This directory captures the current Quaternionic Spectral Geometry course material from `RQM-Storefront`.

The flow is intentionally one-way for now:

1. The storefront course is treated as the richer current course source.
2. The course source files are copied into this repository.
3. Later normalization can turn this snapshot into clean Markdown, typed course data, or formal roots without losing current course content.

This snapshot is not meant to run as a React application from this repository. It preserves course information, page structure, formulas, teaching blocks, metadata, search entries, and QSG-specific shared components so the standalone QSG repository contains the same course knowledge currently published through the storefront. The sync script normalizes trailing whitespace in copied text files; it does not intentionally rewrite course content.

## Files

- `source/` contains copied source files from `RQM-Storefront`, preserving their original relative paths.
- `file-list.txt` lists every copied file.
- `source-metadata.md` records the source repo, branch, commit, snapshot time, and source working-tree status.

## Refreshing

Run this from the QSG repo root:

```sh
scripts/sync-storefront-qsg-course.sh
```

To use a different storefront checkout:

```sh
scripts/sync-storefront-qsg-course.sh "/path/to/RQM-Storefront"
```

To verify that the core course surface is present:

```sh
scripts/check-storefront-qsg-snapshot.sh
```

## Normalization Target

The next layer should convert this raw snapshot into a durable course source:

- a course manifest,
- chapter and section metadata,
- glossary and notation files,
- derivation links from course sections to QSG roots,
- claim-status labels for definitions, examples, conjectural extensions, and applications.

Until that normalization is complete, this snapshot is the repo-local record of the richer storefront course.
