---
title: The web app lives under app/ on the GitHub Pages website and signs in by redirecting back to its own start page
author: Mari
date: 2026-11-25
branch: main
cost: { minutes: 38, tokens: 190150 }
id: l-3d2fc476
scope: repo
status: active
src: agent
touches:
  - client-metadata.json
---

## Decided
- The Flutter web build is copied into the website repo's `app/` folder, so GitHub Pages serves it at https://vostronix.github.io/handpan_school_website/app/. No Pages setting needed; the base href must be `/handpan_school_website/app/`.
- Web login uses the existing hosted client metadata (still `application_type: native`): the https start page of the web app is added as a second redirect URI next to the Flatpak's `io.github.vostronix:/callback`. The AT Protocol spec allows a native client an https redirect on the client_id's own origin, so one file serves both and the Flatpak is untouched.
- The consent page opens in the same tab; the redirect reloads the app, which finishes the login inside the session restore (once, since a code is single-use) and then strips `?code&state` from the address bar. The PKCE verifier and DPoP key of the pending login are kept in secure storage so they survive the reload.
- Mari chose plain path URLs (`usePathUrlStrategy`) over the default hash URLs because the `#/` looked odd.

## Tried and ruled out
- A 404.html on the website that redirects deep links back into the app: Mari didn't want it; only usePathUrlStrategy.
- A separate `application_type: web` metadata file: unnecessary, see above.

## Watch out
- With path URLs, reloading or deep-linking a sub-page (e.g. /app/home/player) gives a GitHub Pages 404. Opening /app/ works.
- The web build must pass `--dart-define=WEBSITE_URL=https://vostronix.github.io/handpan_school_website`; without it the client_id points at handpan.school and login fails.
- `HANDPAN_SOUND=synth` does not shrink the build: the recorded WAVs (~54 MB) are still bundled via the ui package; the folder is ~104 MB.
- The web build can get OOM-killed (exit 137) on this machine; `--no-wasm-dry-run` helped.

In the code: app/lib/data/repositories/atproto/atproto_session.dart (`_finishWebLogin`, `hostedClient`), account_repository.dart (`_loginWeb`), secure_oauth_state_store.dart, web_page*.dart, app/lib/env.dart (`webRedirectUri`), app/lib/main.dart, website/client-metadata.json, Zed task "Build Web App (Synth, GitHub Pages)" in .zed/tasks.json.
