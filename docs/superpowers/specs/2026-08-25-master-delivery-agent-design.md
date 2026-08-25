# Master Delivery Agent and Code Reviewer Agent — Design

> **Status:** Approved by the project owner on 2026-08-25.
>
> **Purpose:** Define an autonomous local delivery-control system for Planote. It turns agreed acceptance criteria into scoped work, independently verifies results, documents every action, and progresses the project until the release goal is reached.

## 1. Goal

Create a Master Delivery Agent that runs every three hours, continuously reconciles the agreed plan with the real repository state, delegates bounded work to subagents, enforces independent review, and records an auditable delivery trail.

Create a Code Reviewer Agent that independently evaluates completed tasks against acceptance criteria, code quality, simplicity, performance, SOLID boundaries, test quality, security, and documentation.

## 2. Authority model

### Autonomous local authority

The Master Agent may, without asking the project owner again:

- Read the repository, documentation, Git history, test results, CI state, and agent state.
- Create plans, task records, prompts, local branches, isolated worktrees, code changes, tests, reviews, commits, and repository documentation.
- Delegate, redirect, stop, and follow up with subagents.
- Make reasonable, documented assumptions when they do not change agreed product scope.
- Push a reviewer-approved, verified commit to its dedicated non-protected remote branch.

### Owner approval required

The Master Agent must request explicit owner approval before:

- Merging to a protected, release, or production branch.
- Deploying, publishing, or releasing externally.
- Changing credentials, provider configuration, permissions, billing, or payment state.
- Deleting live data or applying a destructive production migration.
- Force-pushing, rewriting shared history, or changing branch-protection rules.
- Modifying the governance invariants, acceptance criteria, or this authority model.

## 3. Non-negotiable governance invariants

Create `.agent/governance/INVARIANTS.md` as an owner-controlled policy file.

1. Every agent action must be documented.
2. No task is complete without evidence.
3. Implementers cannot approve their own work.
4. P0/P1 review findings block task completion.
5. No secret, password, token, credential, or private key may be logged, committed, or copied to reports.
6. Every changed file must map to an approved task or a documented necessary dependency.
7. Protected governance files cannot be changed autonomously.
8. Production and other external irreversible actions require owner approval.
9. A reviewer approval never authorises a protected-branch merge or deployment.
10. A task that lacks documentation is `unverified`, not `done`.

## 4. Repository memory architecture

```text
.agent/
  governance/
    INVARIANTS.md
    authority-matrix.md
    documentation-policy.md
    review-policy.md
  acceptance/
    registry.yaml
    traceability.md
  tasks/
    TASK-001.md
  plans/
  reviews/
  decisions/
    ADR-001.md
  memory/
    product.md
    services/
      web.md
      api.md
      infrastructure.md
  skills/
    draft/
    validated/
    promoted/
  reports/
    progress/
    automation-runs/
  delivery-ledger.yaml
```

### Source-of-truth rule

- `delivery-ledger.yaml` is the machine-readable operational source of truth.
- Task records, reviews, ADRs, and reports are the human-readable evidence.
- `CONVERSATION_MEMORY.md` remains the cross-agent narrative index.
- A conflict between prose and repository/test evidence must be recorded and resolved in favour of evidence.

### Minimum task record

```md
# TASK-042 — Concise task title

- Status: planned | active | review | blocked | complete | rejected
- Acceptance criteria: AC-AUTH-03, AC-WEB-02
- Owner: Master Delivery Agent
- Assigned agent: implementation-agent-name
- Branch/worktree: codex/task-042-google-oauth

## Scope

## Forbidden actions

## Assumptions

## Prompt issued

## Files changed

## Evidence
- Tests:
- Type check:
- Lint:
- Build:

## Review result

## Decisions and handoff
```

## 5. Acceptance-criteria registry

Every deliverable criterion gets a stable ID, an owner, a priority, a verification method, and a status.

```yaml
- id: AC-AUTH-03
  feature: Google OAuth
  criterion: A user can sign in or sign up through Clerk Google OAuth and land on /app.
  priority: launch-blocker
  verification:
    - automated route/component test
    - real Clerk browser smoke test
  status: not-started
  evidence: []
```

Statuses are: `not-started`, `planned`, `active`, `implemented`, `review`, `verified`, `blocked`, and `deferred`.

`implemented` means code exists. `verified` means all required evidence and independent review exist.

## 6. Master Delivery Agent responsibilities

### Planning and delegation

- Select the highest-priority unmet acceptance criteria with all dependencies available.
- Divide work only where task boundaries are independent and ownership is clear.
- Give every agent a bounded prompt containing task ID, acceptance criteria, allowed files, forbidden actions, required evidence, Git/worktree rules, and memory-update rules.
- Do not delegate concurrent edits to overlapping files unless an explicit file-ownership handoff exists.

### Progress control

- Compare task claims against Git diff, tests, and actual code.
- Detect unowned changes, stale tasks, duplicate work, missing review, and missing documentation.
- Escalate only a precise product decision, external permission, or genuine external dependency to the owner.
- If no active/review work remains, create the next plan from the unmet acceptance criteria.

### Reviewer handoff

When all subagents for a task are done and evidence is collected, the Master Agent must:

1. Run the required local verification.
2. Freeze the task diff for review.
3. Send the task, criteria, changed files, and evidence to the Code Reviewer Agent.
4. Turn P0/P1 findings into blocking fix tasks.
5. Prioritise accepted P2 findings against remaining acceptance criteria.
6. If green, mark the task `verified` and execute the commit/push policy.

## 7. Code Reviewer Agent

### Independence and authority

- The reviewer is not the task implementer.
- The reviewer is read-only by default and must not make hidden fixes while reviewing.
- The reviewer can return `approved`, `approved-with-follow-ups`, `changes-required`, or `blocked`.
- The reviewer cannot waive an acceptance criterion or governance invariant.

### Required review dimensions

| Dimension | Required check |
|---|---|
| Task compliance | Each assigned acceptance criterion is implemented and evidenced. |
| Functional correctness | Success, error, empty, loading, permissions, concurrency, and destructive paths are appropriate. |
| Code quality | Clear naming, small cohesive units, useful errors, explicit types, maintainable boundaries. |
| Simplicity | No needless complexity, speculative abstraction, or avoidable indirection. |
| Reuse | Detect repeated domain logic, validation, API calls, UI patterns, and error handling worth extracting. |
| SOLID / architecture | Responsibilities are separated, dependencies point inward, interfaces are stable, and infrastructure does not leak into UI/domain logic. |
| Performance | No N+1 queries, avoidable duplicate requests/renders, unbounded work, excess payloads, or unsafe memory use. |
| Security | Ownership, auth, secrets, validation, private caching, CSRF/XSS, upload handling, and rate limiting where relevant. |
| Tests | Tests prove criteria and regressions; they do not merely execute code. |
| Documentation | Contracts, migrations, decisions, operational risks, and memory are updated. |

### Required reviewer finding format

```md
## [P1] Short title

- Task: TASK-042
- Acceptance criterion: AC-AUTH-03
- Evidence: `apps/web/src/app/login/page.tsx:42`
- Impact: A user cannot complete Google OAuth.
- Required action: Wire Clerk OAuth redirect and callback route.
- Verification: Add a mocked OAuth flow test and complete real Clerk smoke test.
- Decision: Block completion.
```

Priority definitions:

- `P0`: security breach, data loss, outage, or destructive defect.
- `P1`: acceptance criterion failure or material user-facing bug.
- `P2`: maintainability, reliability, performance, or architecture issue that must be planned.
- `P3`: non-blocking improvement.

## 8. Commit and push policy

When a Code Reviewer Agent gives `approved` and all task gates are green, the Master Agent must:

1. Confirm the task record is complete and the diff is limited to task scope.
2. Create a focused commit on the task's non-protected branch.
3. Push that branch to the configured remote.
4. Record commit SHA, branch, push result, criteria satisfied, verification commands, and reviewer result in the task record and delivery ledger.

Commit format:

```text
<type>(<scope>): <task-id> <concise outcome>

Acceptance: AC-AUTH-03, AC-AUTH-04
Implemented: Clerk Google OAuth callback and protected /app route.
Verified: pnpm --filter @planote/web test; pnpm type-check; pnpm build.
Reviewed-by: Code Reviewer Agent — approved.
```

Example:

```text
feat(auth): TASK-042 implement Clerk Google OAuth

Acceptance: AC-AUTH-03
Implemented: Google OAuth sign-in/sign-up redirect, callback, and /app completion.
Verified: web OAuth tests, type-check, lint, production build.
Reviewed-by: Code Reviewer Agent — approved.
```

The Master Agent must not force-push, push directly to a protected branch, merge, tag a release, or deploy without owner approval.

## 9. Three-hour Codex Automation

### Automation name

`Planote Master Delivery Controller`

### Schedule

Every 3 hours in `Europe/London`.

### Automation instruction

```md
You are the Master Delivery Agent for this repository.

Read, in order:
1. .agent/governance/INVARIANTS.md
2. .agent/delivery-ledger.yaml
3. CONVERSATION_MEMORY.md
4. active task records and plans
5. acceptance registry
6. Git status/history, test/CI evidence, and agent state

Non-negotiable rules:
- Document every prompt, action, decision, assumption, result, blocker, and handoff.
- Never mark work complete without repository and verification evidence.
- Implementers cannot approve their own work.
- P0/P1 findings block completion.
- Do not expose secrets.
- Do not change governance, acceptance, credentials, external systems, protected branches, production state, or deployment configuration without owner approval.
- Use isolated worktrees for code-changing subagents.
- A Code Reviewer approval permits a focused commit and push only to a dedicated non-protected branch.

Control loop:
1. Reconcile ledger status against source code, Git state, tests, and review evidence.
2. Inspect active agents; document and resolve stale, blocked, or overlapping work.
3. If an implementation task is ready, run local gates and hand it to the Code Reviewer Agent.
4. Convert accepted P0/P1/P2 findings into prioritised tasks and plans.
5. If no review/fix work remains, choose the highest-priority unmet acceptance criteria and delegate bounded tasks.
6. Update task records, service memory, delivery ledger, and progress report.
7. Return a concise report with completed, active, blocked, reviewed, pushed, evidence, next actions, and owner decisions needed.
```

Codex Automations support recurring background workflows and send results to a review queue. The schedule must be configured and enabled in the Codex app after this repository governance structure is committed.

## 10. Stuck-agent protocol

An agent is stale when it has no evidence-backed progress for the configured interval or repeats the same blocker.

The Master Agent must:

1. Read its task record, last output, Git diff, and test results.
2. Send one evidence-based follow-up with a smaller bounded next action.
3. Use a reviewer or a non-overlapping diagnostic agent only where it can add independent evidence.
4. After bounded safe alternatives fail, record a blocker with attempted actions, evidence, options, and the exact owner decision required.

It must not retry indefinitely, silently abandon work, or invent external credentials/configuration.

## 11. Self-evolving repository skills

Skills are repository-owned guidance, not mutable law.

### Skill lifecycle

```text
Repeated pattern observed twice
→ draft skill
→ tested against real repository examples
→ Code Reviewer Agent review
→ Master Agent promotes ordinary engineering skill
→ owner approval required for governance/security/deployment skill
```

Every skill must declare purpose, trigger conditions, non-goals, inputs, exact workflow, safety rules, output format, examples, test/check, version, owner, review date, and deprecation path.

Candidate first skills:

- `task-delegation.md`
- `acceptance-criteria-review.md`
- `code-review.md`
- `safe-prisma-migration.md`
- `private-attachment-security.md`
- `clerk-auth-change.md`
- `release-verification.md`

## 12. Definition of done

A task is `verified` only if all applicable items are true:

- [ ] Linked acceptance criteria are satisfied.
- [ ] Scope and changed files are documented.
- [ ] Required tests, lint, type-check, build, and relevant integration checks pass.
- [ ] Documentation, memory, and delivery ledger are updated.
- [ ] Independent Code Reviewer outcome is approved.
- [ ] No P0/P1 remains open.
- [ ] Commit includes task ID, acceptance IDs, implementation summary, verification, and reviewer result.
- [ ] Commit is pushed only to its dedicated non-protected branch.

## 13. Initial implementation sequence

1. Create governance, ledger, acceptance registry, task/review/report/ADR templates.
2. Create Master Agent and Code Reviewer Agent instruction files.
3. Create the initial repository skills and skill-promotion workflow.
4. Seed current Planote acceptance criteria from `docs/planning/07-master-delivery-plan.md`.
5. Reconcile real current implementation state into the ledger.
6. Configure and enable the three-hour `Planote Master Delivery Controller` Automation in Codex.
7. Run a dry-run automation audit before allowing the controller to create implementation tasks.
