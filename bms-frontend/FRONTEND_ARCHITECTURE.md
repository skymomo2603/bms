# Frontend Architecture Standard

## Purpose

This document defines the current house standard for `bms-frontend`.

Use it as the default reference when building new facilities, shared UI, hooks, utilities, and page routes.

This standard is intentionally pragmatic. The goal is clear responsibility boundaries, not maximum file count.

## Core Principles

1. Keep `page.tsx` focused on orchestration.
2. Keep `src/app` focused on routes, layouts, and route-local framework files.
3. Keep reusable feature behavior in hooks.
4. Keep pure transformation, filtering, and validation logic in utils.
5. Keep static UI config in constants.
6. Keep shared contracts in types.
7. Split shared UI from feature-specific UI.
8. Extract styles only when they start to dominate the component.
9. Prefer consistency of responsibility over rigid file templates.

## Folder Intent

### `src/app/secure/**/page.tsx`

Page files should primarily:

- assemble layout
- call hooks
- pass props to components
- connect route params or search params to feature logic

Page files should avoid holding large blocks of:

- async data mutation logic
- filtering logic
- normalization/mapping logic
- repeated config objects

### `src/app`

Keep framework-owned files and route segments here.

Good examples:

- `layout.tsx`
- `page.tsx`
- route groups and route segments
- route-local loading/error files
- app-scoped providers that are only used by the root layout

Avoid treating `src/app` as the general home for shared business logic.

### `src/components/admin/common`

Put UI here only when it is genuinely shared across admin areas.

Examples:

- breadcrumbs
- shared navigation cards
- filter bar
- notification stack
- form section wrapper

### `src/components/admin/<feature>`

Put UI here when it belongs to a single feature or facility.

Examples:

- hero banner dialogs
- hero banner list item
- hero banner form

### `src/hooks`

Hooks should own reusable stateful client logic.

Good examples:

- fetching and refreshing list state
- managing selection state
- coordinating confirm dialogs and mutations
- shared notification controller behavior

Hooks should not become generic for the sake of genericity. Keep them feature-oriented unless multiple features already share the same behavior.

### `src/utils`

Utils should stay pure.

Good examples:

- DTO mapping
- validation
- filtering
- normalization

Utils should not depend on React state or component lifecycle.

### `src/constants`

Put static configuration here.

Good examples:

- route constants
- breadcrumbs config
- nav item config
- dropdown filter config
- shared labels or app text

### `src/types`

Put reusable TypeScript contracts here.

Good examples:

- shared admin UI types
- feature DTOs
- form models
- pending action models

Separate DTO types from form types when their responsibilities differ.

## Recommended Structure For A New Facility

For a new facility, use this as the default shape when the feature is more than trivial:

```text
src/
  constants/
    facility.ts
    facilityList.ts
  hooks/
    useFacilityList.ts
  types/
    facility.ts
  utils/
    facility.ts
  components/admin/content/facility/
    FacilityForm.tsx
    FacilityListItem.tsx
    DeleteFacilityDialog.tsx
    FacilityStatusDialog.tsx
  app/
  secure/admin/control/content/facility/
    page.tsx
    entry/page.tsx
```

Not every facility needs every file. Start with the smallest version that still keeps responsibilities clean.

## Page Standard

A `page.tsx` is considered healthy when:

- it is easy to scan top-to-bottom
- most logic is wiring, not implementation detail
- data shaping is delegated to hooks/utils
- large inline config objects are absent

If a page grows because of feature behavior rather than layout, extract that behavior.

## Component Standard

A component is considered healthy when:

- its name matches its file name
- it has one clear UI responsibility
- props are easy to understand
- large blocks of non-UI logic are not embedded in it

For style extraction:

- keep styles inline by default
- extract a `Component.styles.ts` file when inline `sx` objects start to dominate the file or obscure the component behavior

Do not create style files for tiny components only for symmetry.

## Constants Standard

Extract constants when they are:

- reused
- route-related
- long enough to distract from the component/page
- part of the facility configuration rather than runtime behavior

Avoid leaving breadcrumb arrays, nav card arrays, and route maps inline in pages if they are part of the section structure.

## Types Standard

Prefer explicit models for distinct concerns:

- DTO type for API responses
- form data type for editable client state
- UI support types for filters, pending actions, breadcrumbs, and nav items

Do not overload one interface for every layer if the shapes serve different purposes.

## Hook Standard

Use a hook when logic includes one or more of these:

- multiple related pieces of state
- async fetch/mutation flow
- repeated handler logic
- side effects tied to feature lifecycle

Keep hooks focused. A hook should represent one feature concern, not the whole application.

## Utility Standard

Use a utility when logic is:

- pure
- deterministic
- easy to test in isolation
- useful outside one specific component render block

Examples already established in the repo:

- hero banner DTO normalization
- hero banner form validation
- hero banner list filtering

## Import Standard

Use the `@/` alias for shared code under `src`.

Examples:

- `@/components/...`
- `@/hooks/...`
- `@/lib/...`
- `@/constants/...`
- `@/types/...`
- `@/utils/...`

Prefer relative imports for route-local app files such as `./layout`, `./globals.css`, or `./ThemeRegistry` when they are only used inside `src/app`.

## Shared vs Feature-Specific Rule

Put code in `common` only if at least one of these is true:

- it is already used by multiple areas
- it clearly represents a platform-level admin pattern
- future reuse is immediate and obvious

Otherwise keep it within the feature folder.

Default toward feature-local code first. Promote to shared only when the reuse is real.

## Testing Standard

The codebase does not currently have the frontend testing standard baked in.

That means the repo does not yet define, in code, all of the following:

- which test runner is the standard
- where frontend tests live
- naming conventions for test files
- what kinds of frontend behavior must be tested
- how tests are run in scripts or CI

This is not another tool inside VS Code.

It means the project has not yet standardized its frontend testing approach.

### Current State

At the moment:

- there is no frontend test script in `package.json`
- there is no Vitest or Jest config in `bms-frontend`
- there are no frontend test files in the project

### Recommended Future Standard

When the team is ready, adopt one explicit frontend testing setup and document it.

For this stack, a reasonable baseline would be:

- Vitest as the unit/component test runner
- React Testing Library for component behavior tests
- colocated test files using `*.test.ts` and `*.test.tsx`
- optional Playwright later for end-to-end flows

### What To Test First

If frontend tests are added later, start with the parts that benefit most from stable automated checks:

- pure utils in `src/utils`
- hooks with meaningful state transitions
- critical forms
- filtering and selection behavior
- route-mode behavior like create vs edit entry pages

### What Not To Over-Test

Avoid spending early effort on snapshot-heavy tests for simple presentational wrappers unless they protect important behavior.

## Decision Rule

When you are unsure whether to extract something, ask:

1. Is this page/component harder to scan because of this code?
2. Is this concern reusable or feature-specific?
3. Is this runtime behavior, static config, or pure logic?

Then place it accordingly:

- runtime behavior -> hook or component
- static config -> constants
- pure logic -> utils
- reusable contract -> types

## Current Reference Implementations

Use these as the baseline examples in the current codebase:

- hero banner list page
- hero banner entry page
- hero banner feature components
- admin common components
- admin/public constants files

Rooms are intentionally excluded from this reference until that area is finished.
