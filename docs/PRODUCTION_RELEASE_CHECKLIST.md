# Production Release Checklist

## Before first public release

- Confirm game policy/tooling boundaries and publish a read-only usage disclaimer.
- Confirm upload size limits and user-friendly error messages for oversized files.
- Verify no external network request is required for normal analysis flow.
- Enable HTTPS on public hosting for the static frontend.

## Quality gates

- Compare browser analysis output against known desktop baselines for parity.
- Perform cross-browser smoke tests (Chromium, Firefox, mobile).
- Validate UTF-16 and UTF-8 inventory exports parse correctly in browser mode.

## Security and operational checks

- Add security headers on frontend hosting config.
- Confirm no user inventory data is transmitted to third-party services.
- Keep dependencies minimal and avoid unnecessary third-party scripts.

## Deployment steps

- Deploy static frontend.
- Run end-to-end upload test with a real `/outputfile inventory` export.
- Verify privacy message is visible and accurate in the UI.

## Post-release

- Track user-reported parsing edge cases for first 48 hours.
- Collect feedback on usability and result clarity.
- Plan and prioritize follow-up fixes before wider rollout.
