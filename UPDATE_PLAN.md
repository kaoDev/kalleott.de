# Package Update Plan

## Current State Analysis

### Major Versions Currently Installed

- **Next.js**: `15.3.1-canary.1` → Latest: `16.0.3` (Major update)
- **Payload CMS**: `3.33.0` → Latest: `3.64.0` (31 minor versions behind)
- **React**: `19.1.0` → Latest: `19.2.0` (Minor update)
- **TypeScript**: `5.6.2` → Latest: `5.9.3` (Minor update)

### Critical Dependencies with Major Updates

- **Lexical**: `0.17.1` → `0.38.2` (Major version jump - 21 minor versions)
- **AI SDK**: `3.3.33` → `5.0.100` (Major version jump)
- **ESLint**: `8.57.1` → `9.39.1` (Major version jump)
- **Zod**: `3.24.2` → `4.1.12` (Major version jump)
- **date-fns**: `3.6.0` → `4.1.0` (Major version jump)
- **tailwind-merge**: `2.6.0` → `3.4.0` (Major version jump)
- **glob**: `11.0.1` → `13.0.0` (Major version jump)
- **cross-env**: `7.0.3` → `10.1.0` (Major version jump)
- **file-type**: `19.6.0` → `21.1.1` (Major version jump)
- **image-size**: `1.2.1` → `2.0.2` (Major version jump)
- **resend**: `4.2.0` → `6.5.2` (Major version jump)
- **@react-email/render**: `1.0.6` → `2.0.0` (Major version jump)
- **@react-email/components**: `0.0.36` → `1.0.1` (Major version jump)
- **bright**: `0.8.6` → `1.0.0` (Major version jump)
- **babel-plugin-react-compiler**: Experimental → `1.0.0` (Stable release)

## Update Strategy

### Phase 1: Core Framework Updates (HIGH PRIORITY)

**Risk Level**: High - Breaking changes expected

1. **Next.js 15 → 16**

   - Current: `15.3.1-canary.1`
   - Target: `16.0.3`
   - **Breaking Changes to Watch**:
     - PPR (Partial Prerendering) is now stable - remove from `experimental`
     - React Compiler may have changes
     - ESLint config changes
     - TypeScript types may change
   - **Action Items**:
     - Run Next.js codemod: `npx @next/codemod@canary upgrade latest`
     - Update `next.config.mjs` to remove `experimental.ppr` (now stable)
     - Update ESLint config to use Next.js 16 compatible version
     - Review and update any deprecated APIs

2. **Payload CMS 3.33 → 3.64**

   - **Action Items**:
     - Update all `@payloadcms/*` packages together
     - Check Payload CMS changelog for breaking changes
     - Verify compatibility with Next.js 16
     - Test admin panel functionality
     - Regenerate types: `pnpm generate:types`

3. **React & React DOM 19.1 → 19.2**
   - Minor update, should be safe
   - Update `@types/react` and `@types/react-dom` accordingly

### Phase 2: Major Dependency Updates (MEDIUM PRIORITY)

**Risk Level**: Medium - Check compatibility and breaking changes

4. **Lexical Editor 0.17 → 0.38**

   - **Critical**: This is a huge jump (21 minor versions)
   - Used by Payload CMS richtext-lexical
   - **Action Items**:
     - Check Payload CMS compatibility with Lexical 0.38
     - May need to wait for Payload CMS to support newer Lexical
     - Test rich text editor functionality thoroughly

5. **AI SDK 3.3 → 5.0**

   - Major version jump
   - **Action Items**:
     - Review AI SDK v5 migration guide
     - Update `@ai-sdk/openai` to `2.0.71`
     - Check for API changes in AI integration code

6. **ESLint 8 → 9**

   - Major version jump
   - **Action Items**:
     - Update ESLint config format (flat config)
     - Update `@payloadcms/eslint-config` if needed
     - Update `eslint-config-next` to Next.js 16 compatible version

7. **Zod 3 → 4**
   - Major version jump
   - **Action Items**:
     - Review Zod v4 migration guide
     - Check Payload CMS compatibility (may use Zod internally)
     - Update validation schemas if needed

### Phase 3: Supporting Libraries (LOW PRIORITY)

**Risk Level**: Low - Usually backward compatible

8. **UI Libraries**

   - Update all `@radix-ui/*` packages
   - Update `lucide-react`
   - Update `tailwindcss` and related packages

9. **Utility Libraries**

   - `date-fns` 3 → 4 (check breaking changes)
   - `tailwind-merge` 2 → 3
   - `cross-env` 7 → 10
   - `glob` 11 → 13
   - `file-type` 19 → 21
   - `image-size` 1 → 2
   - `resend` 4 → 6
   - `@react-email/*` packages

10. **Dev Dependencies**
    - `@biomejs/biome` 1.9 → 2.3 (major update)
    - `typescript` 5.6 → 5.9
    - `@types/node` 22 → 24
    - `prettier` and plugins

## Step-by-Step Update Process

### Step 1: Create Backup & Branch

```bash
git checkout -b update/packages-2025
git commit -m "chore: create update branch"
```

### Step 2: Update Core Framework (Phase 1)

```bash
# Update Next.js and related packages
pnpm add next@latest react@latest react-dom@latest @next/eslint-plugin-next@latest eslint-config-next@latest

# Update Payload CMS packages (all together)
pnpm add @payloadcms/db-postgres@latest @payloadcms/email-nodemailer@latest @payloadcms/email-resend@latest @payloadcms/live-preview-react@latest @payloadcms/next@latest @payloadcms/plugin-form-builder@latest @payloadcms/plugin-nested-docs@latest @payloadcms/plugin-redirects@latest @payloadcms/plugin-seo@latest @payloadcms/richtext-lexical@latest @payloadcms/storage-vercel-blob@latest @payloadcms/ui@latest payload@latest

# Update React types
pnpm add -D @types/react@latest @types/react-dom@latest
```

### Step 3: Run Next.js Codemod

```bash
npx @next/codemod@canary upgrade latest
```

### Step 4: Update Configuration Files

- Update `next.config.mjs`:
  - Remove `experimental.ppr` (now stable, enabled by default or configure
    differently)
  - Check `reactCompiler` configuration
- Update ESLint config if needed
- Regenerate Payload types: `pnpm generate:types`

### Step 5: Test Core Functionality

- [ ] Development server starts: `pnpm dev`
- [ ] Build succeeds: `pnpm build`
- [ ] Type checking passes: `pnpm type-check`
- [ ] Linting passes: `pnpm lint`
- [ ] Payload admin panel loads
- [ ] Pages render correctly
- [ ] API routes work

### Step 6: Update Major Dependencies (Phase 2)

**Only proceed if Phase 1 is stable**

```bash
# Update Lexical (check Payload compatibility first!)
pnpm add lexical@latest @lexical/code@latest @lexical/headless@latest @lexical/markdown@latest @lexical/react@latest

# Update AI SDK
pnpm add ai@latest @ai-sdk/openai@latest

# Update ESLint
pnpm add -D eslint@latest

# Update Zod (check Payload compatibility first!)
pnpm add zod@latest
```

### Step 7: Update Supporting Libraries (Phase 3)

```bash
# UI libraries
pnpm add @radix-ui/react-accordion@latest @radix-ui/react-checkbox@latest @radix-ui/react-dialog@latest @radix-ui/react-label@latest @radix-ui/react-navigation-menu@latest @radix-ui/react-scroll-area@latest @radix-ui/react-separator@latest @radix-ui/react-select@latest @radix-ui/react-slider@latest @radix-ui/react-slot@latest lucide-react@latest

# Utility libraries
pnpm add date-fns@latest tailwind-merge@latest cross-env@latest glob@latest file-type@latest image-size@latest resend@latest @react-email/components@latest @react-email/render@latest bright@latest

# Dev dependencies
pnpm add -D @biomejs/biome@latest typescript@latest @types/node@latest prettier@latest prettier-plugin-tailwindcss@latest
```

### Step 8: Update React Compiler

```bash
# Update from experimental to stable
pnpm add babel-plugin-react-compiler@latest
```

## Testing Checklist

After each phase, test thoroughly:

### Functionality Tests

- [ ] Homepage loads and renders correctly
- [ ] Blog posts display correctly
- [ ] Navigation works
- [ ] Forms submit successfully
- [ ] Payload admin panel accessible
- [ ] Rich text editor works (Lexical)
- [ ] Image uploads work
- [ ] API endpoints respond correctly
- [ ] Authentication works (if applicable)
- [ ] Search functionality works

### Build & Performance Tests

- [ ] Production build succeeds
- [ ] No build warnings/errors
- [ ] Type checking passes
- [ ] Linting passes
- [ ] No console errors in browser
- [ ] Performance metrics acceptable

### Compatibility Tests

- [ ] Test in multiple browsers
- [ ] Test responsive design
- [ ] Test on mobile devices
- [ ] Check accessibility

## Rollback Plan

If issues occur:

1. Revert to previous commit: `git reset --hard HEAD~1`
2. Restore `package.json` and `pnpm-lock.yaml` from backup
3. Reinstall: `pnpm install`

## Notes & Warnings

### Critical Warnings

1. **Lexical 0.17 → 0.38**: This is a massive jump. Payload CMS may not support
   Lexical 0.38 yet. Check Payload CMS documentation/changelog first.

2. **Next.js 16**: Major version update with breaking changes. The codemod
   should handle most, but manual review is needed.

3. **Payload CMS 3.33 → 3.64**: 31 minor versions behind. Review changelog for
   breaking changes, especially around:

   - Database adapter changes
   - Plugin API changes
   - Type generation changes

4. **AI SDK 3 → 5**: Major version jump. Review migration guide for API changes.

5. **ESLint 8 → 9**: Requires flat config format. May need significant config
   changes.

### Recommended Order

1. Update Next.js 16 first (with codemod)
2. Update Payload CMS to latest compatible with Next.js 16
3. Test thoroughly
4. Then update other major dependencies one by one
5. Test after each major dependency update

### Compatibility Checks Needed

- Payload CMS 3.64 + Next.js 16 compatibility
- Payload CMS + Lexical 0.38 compatibility
- Payload CMS + Zod 4 compatibility
- Next.js 16 + React 19.2 compatibility

## Estimated Time

- Phase 1 (Core): 2-4 hours
- Phase 2 (Major): 3-5 hours
- Phase 3 (Supporting): 1-2 hours
- Testing: 2-3 hours
- **Total**: 8-14 hours

## Next Steps

1. Review this plan
2. Check Payload CMS documentation for Next.js 16 compatibility
3. Check Lexical compatibility with Payload CMS
4. Start with Phase 1 updates
5. Test thoroughly before proceeding
