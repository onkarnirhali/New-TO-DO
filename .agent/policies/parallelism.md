# Parallelism policy

The operating system has **five total slots**. The default mix is **3 coding + 1 verifier + 1 reviewer**. A slot is not a second owner: each task has one accountable developer, while verification and review remain independent.

- At most two completed tickets may wait in the review queue. When the queue reaches two, assign capacity to verification/review support and stop adding coding work.
- Each coder receives a dedicated branch and worktree. A handoff-ready coder may roll into a new ticket only with a new isolated worktree and a non-overlapping scope.
- Coding scopes must not overlap. Shared resources—lockfiles, package manifests, generated artifacts, governance records, acceptance ledgers, and memory files—are serialized through the Master Delivery Agent.
- Verifiers and reviewers read the frozen handoff; they do not edit the developer worktree. Any requested change invalidates the freeze and returns ownership to coding.
- A blocked task is clarified, escalated, or decomposed. It is never silently retried while consuming a slot.

The scheduler may reduce concurrency when dependencies, conflict risk, queue depth, or owner approval makes parallel work unsafe.
