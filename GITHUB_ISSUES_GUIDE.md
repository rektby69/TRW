# GitHub Issues & Milestones Tracking Guide

This guide defines the mandatory protocol for AI dev agents working on **`rektby69/TRW`**. Every agent must follow this lifecycle to ensure that work is tracked transparently, milestones stay updated, and issue boards accurately reflect project status.

---

## 1. Core Operating Principles

1. **No Untracked Work**: Never implement non-trivial code changes, major refactors, or new features without an associated GitHub Issue.
2. **Real-time Status Updates**: An issue's status, checklist, and comments must reflect real work as it happens (start, progress, completion).
3. **Traceability**: Reference issue numbers in commit messages and pull requests (e.g., `Fixes #12` or `Refs #12`).
4. **Milestone Alignment**: Every issue must belong to an active milestone whenever one exists.

---

## 2. Session Kickoff Checklist (Start of Chat)

When starting a new session or task, the AI agent must execute this sequence:

1. **Verify Context & Repository**:
   - Repository: `rektby69/TRW`
   - Owner: `rektby69`
2. **Review Active Issues & Milestones**:
   - Check existing open issues using `list_issues` or `search_issues`.
   - Identify whether the user's prompt matches an existing issue.
3. **Determine the Action**:
   - **Scenario A (Existing Issue)**: State the issue number being worked on (e.g., *"Working on #12"*). Add a comment to indicate work has started.
   - **Scenario B (New Work / Feature / Bug)**: Create a new issue using `issue_write(method='create', ...)` before writing code, and assign the proper label and milestone.

---

## 3. Issue Template & Standard Format

When creating an issue, structure the `body` cleanly with clear acceptance criteria and task checklists:

```markdown
### Summary
Brief description of the problem, feature, or task.

### Scope & Tasks
- [ ] Task 1: Specific actionable step
- [ ] Task 2: Specific actionable step
- [ ] Task 3: Unit test or verification step

### Acceptance Criteria
- [ ] Expected outcome 1
- [ ] Expected outcome 2

### Technical Notes / Implementation Details
- Relevant files, API schemas, or architectural constraints.
```

---

## 4. Issue Writing Rules & Conventions

### Title Syntax
- `feat: <short description>` — New features or functional additions
- `fix: <short description>` — Bug fixes and error resolutions
- `refactor: <short description>` — Code restructuring without behavior changes
- `chore: <short description>` — Maintenance, dependencies, setup, docs
- `test: <short description>` — Adding or fixing test suites

### Available Labels in `rektby69/TRW`
The repository has all 10 standard GitHub labels configured:
- `accessibility` (Magenta: `#f143ab`) — Barrier affecting people with disabilities
- `bug` (Red: `#d73a4a`) — Something isn't working
- `documentation` (Blue: `#0075ca`) — Improvements or additions to documentation
- `duplicate` (Gray: `#cfd3d7`) — This issue or pull request already exists
- `enhancement` (Teal: `#a2eeef`) — New feature or request
- `good first issue` (Purple: `#7057ff`) — Good for newcomers
- `help wanted` (Dark Green: `#008672`) — Extra attention is needed
- `invalid` (Yellow: `#e4e669`) — This doesn't seem right
- `question` (Pink: `#d876e3`) — Further information is requested
- `wontfix` (White: `#ffffff`) — This will not be worked on

> [!NOTE]
> Custom workflow labels such as `in-progress`, `blocked`, or `needs-review` are not yet created on the GitHub repository. When labeling issues, agents must use the existing labels (`enhancement`, `bug`, `documentation`) or GitHub Project / issue states until custom labels are added in GitHub repo settings.

### Milestone Assignment
- Retrieve active milestones.
- Ensure the issue is assigned to the current target milestone.

---

## 5. In-Flight Updates Protocol

As implementation progresses:

1. **Progress Tracking**:
   - Check off completed task boxes in the issue body by updating the issue:
     `issue_write(method='update', issue_number=<NUM>, body=<UPDATED_BODY>)`
2. **Blockers & Discoveries**:
   - Post comments on the issue using `add_issue_comment` if design changes, unexpected blockers, or architectural trade-offs emerge.

---

## 6. Task Completion & Closing Protocol

When the requested work is fully tested and finished:

1. **Verify Checklist**:
   - Ensure all acceptance criteria and task check-boxes in the issue body are marked `[x]`.
2. **Post Final Summary Comment**:
   - Add a brief closing comment outlining:
     - Files modified/created
     - How the solution was validated or tested
3. **Close the Issue**:
   - Call `issue_write` with:
     ```json
     {
       "method": "update",
       "owner": "rektby69",
       "repo": "TRW",
       "issue_number": <NUM>,
       "state": "closed",
       "state_reason": "completed"
     }
     ```
4. **Milestone Check**:
   - Check if this closure completes the milestone. If all issues in the milestone are closed, notify the user.

---

## 7. AI Agent Quick Cheat Sheet (MCP Tooling)

| Goal | MCP Tool | Key Parameters |
| :--- | :--- | :--- |
| Find open issues | `github-mcp-server/list_issues` | `owner="rektby69"`, `repo="TRW"`, `state="open"` |
| Search specific issue | `github-mcp-server/search_issues` | `query="repo:rektby69/TRW is:issue state:open <term>"` |
| Create new issue | `github-mcp-server/issue_write` | `method="create"`, `owner="rektby69"`, `repo="TRW"`, `title`, `body`, `milestone`, `labels` |
| Update task checklist | `github-mcp-server/issue_write` | `method="update"`, `owner="rektby69"`, `repo="TRW"`, `issue_number`, `body` |
| Add comment / update | `github-mcp-server/add_issue_comment` | `owner="rektby69"`, `repo="TRW"`, `issue_number`, `body` |
| Close completed issue | `github-mcp-server/issue_write` | `method="update"`, `issue_number`, `state="closed"`, `state_reason="completed"` |
