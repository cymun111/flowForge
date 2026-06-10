# Progress Tracker - FlowForge

## Bug: GitHub OAuth Account Linking with Private Emails

**Status:** 🔴 **Open**  
**Priority:** High  
**Created:** 2026-06-09  
**Assigned to:** AI Assistant

---

### Description
GitHub OAuth fails with `OAuthAccountNotLinked` error when user has **private email** enabled on GitHub and tries to link to an existing account created via Google OAuth.

### Root Cause
1. GitHub's default profile endpoint (`/user`) doesn't include private emails
2. The `user:email` scope grants access to `/user/emails` endpoint
3. NextAuth's default GitHub provider only uses `/user` profile data
4. Private emails (e.g., `26830316+cymun111@users.noreply.github.com`) aren't in the default profile
5. Prisma adapter can't match accounts because emails don't match

### Current Implementation Attempt
Added custom `profile` callback to fetch emails from `/user/emails` and `signIn` callback to manually link accounts:

```typescript
// In lib/auth.ts
profile: async (profile, tokens) => {
  const emails = await fetchGitHubEmails(tokens.access_token!);
  return {
    id: profile.id.toString(),
    name: profile.name ?? profile.login,
    email: emails[0] ?? profile.email,
    emailList: emails, // Store all verified emails
    image: profile.avatar_url,
  };
},
signIn: async ({ user, account, profile }) => {
  if (account?.provider === "github" && profile) {
    const githubEmails = (profile as any).emailList || [];
    if (githubEmails.length > 0) {
      const existingUser = await prisma.user.findFirst({
        where: { email: { in: githubEmails } },
      });

      if (existingUser) {
        await prisma.account.create({
          data: { /* link account */ },
        });
        return true;
      }
    }
  }
  return true;
},
```

### Error Still Occurring
- **Error:** `OAuthAccountNotLinked`
- **URL:** `http://localhost:3000/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F&error=OAuthAccountNotLinked`
- **User:** kenyon.westbrook@gmail.com (Google)
- **GitHub email likely:** `26830316+cymun111@users.noreply.github.com` (private noreply)

### Next Steps to Debug
1. Add logging to see what emails GitHub actually returns
2. Verify the `fetchGitHubEmails` function works correctly
3. Check if the `signIn` callback is being triggered
4. Consider alternative: link accounts via email after both are created

### Workaround
Users can temporarily make their email public on GitHub, or use the same public email on both providers.

---

## Related Files
- `lib/auth.ts` - Auth configuration with custom GitHub profile & signIn callbacks
- `prisma/schema.prisma` - User model with emailVerified, image fields

## Testing Checklist
- [ ] GitHub login works with public email
- [ ] GitHub login works with private email (noreply)
- [ ] GitHub links to existing Google account
- [ ] Google login still works
- [ ] Multiple OAuth providers can be linked