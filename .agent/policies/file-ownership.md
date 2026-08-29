# File ownership policy

Every task ticket declares an exact allowed-file set and forbidden-file set. The developer may edit only allowed files in the dedicated worktree. A reviewer or verifier is read-only against that worktree.

No two coding tasks may have overlapping edit scopes. Read overlap is allowed; write overlap is not. Shared resources—including `pnpm-lock.yaml`, package manifests, generated output, `.agent` governance records, acceptance ledgers, progress reports, and `CONVERSATION_MEMORY.md`—are serialized and assigned to one named owner for the duration of the edit.

At handoff, record the exact changed-file list and frozen manifest/hash. Any unlisted file, post-freeze edit, or generated artifact discovered by verification is a scope violation: stop, report it, and return to `coding` for a fresh freeze. Never use broad cleanup, reset, checkout, or deletion to conceal ownership drift.

The Master Delivery Agent resolves unavoidable conflicts by sequencing work or creating a new ticket; agents do not seize another task's files.
