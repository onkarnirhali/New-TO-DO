# Delivery Authority Matrix

| Action | Autonomous local authority | Owner approval required |
|---|---:|---:|
| Read source, documentation, Git history, tests, and CI evidence | Yes | No |
| Plan work, create task records, and make reversible assumptions | Yes | No |
| Create isolated worktrees and local branches | Yes | No |
| Implement code, tests, reviews, and repository documentation | Yes | No |
| Commit verified task work | Yes | No |
| Push an exact reviewer-approved commit to a dedicated non-protected branch | Yes | No |
| Merge to a protected, release, or production branch | No | Yes |
| Deploy, publish, release, or change public availability | No | Yes |
| Change credentials, provider configuration, permissions, billing, or payments | No | Yes |
| Delete live data or run a destructive production migration | No | Yes |
| Force-push, rewrite shared history, or alter branch protection | No | Yes |
| Modify governance invariants, acceptance criteria, or this authority matrix | No | Yes |
