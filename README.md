# The Serendib Endowment — website

Static site. No build step, no framework, nothing to install. Plain HTML, one CSS
file, one JS file. Every path is relative, so it works identically whether you open
it from a folder on your desktop or serve it from a domain.

## Figures that change: edit in one place

**Founding fund totals** live in `FUND` at the top of `build.py`: committed, target and
contributors. The percentage is calculated. They are injected into the home page and the
give page as tokens, so a new contribution means editing one dict and running build.py,
not hunting through two pages for four numbers.

**Director and adviser names** live only on `governance.html`. The one-pager and the media
facts table link there rather than repeating the list, so an appointment or resignation is
a single edit.

## Files

```
index.html            Home
how-it-works.html     Endowment explainer and the five steps
faq.html              Eight frequently asked questions
what-we-fund.html     The three charitable purposes and the grant position
our-work.html         The record of every distribution, newest first
work/                 One file per distribution that has a full record
governance.html       Entity details, board, how it is governed, policy register
give.html             Ways to give, tax position, bequests, founding contributors
updates.html          Press releases, statements, annual letters, media boilerplate
reports.html          Annual reports, reporting cycle, independent registers
contact.html          Contact routes, complaints and serious incidents
constitution.html     The full constitution, all 85 clauses, with stable anchors
privacy.html          What is collected, how it is used, how to have it removed
projections.html      Interactive model (deliberately not in the main navigation)
our-work.html         Index of every distribution
work/                 One file per distribution, listed on our-work.html
updates/              One file per update article, listed on updates.html
404.html              Not-found page. Served automatically by GitHub Pages for any
                      missing path. This is the one file that uses root-absolute
                      paths (/assets/...), because it can be served from any depth,
                      so it will look unstyled if opened by double-clicking.

assets/css/site.css   All styling, including the brand tokens
assets/js/site.js     Nav, accordion, legacy link redirects
assets/img/           Photographs, favicon, social preview image, partner logos

robots.txt            Points crawlers at the sitemap
sitemap.xml           The nine public pages
.nojekyll             Tells GitHub Pages to serve the files as-is
```

## Previewing

Double-click `index.html`. That is all. It will look exactly as it does live.

## Deploying to GitHub Pages

Upload the **contents** of this folder to the repository root, not the folder itself.
The repo should have `index.html` at its top level, with `assets/` beside it. If you
end up with `serendib-endowment-website/index.html` in the repo, the site will not
resolve and you will get a 404 on the custom domain.

Using the GitHub web interface: open the repo, choose **Add file → Upload files**,
then drag in all the files and the `assets` folder together. Commit.

Using git:

```
cd path/to/serendib-endowment-website
git init
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git add .
git commit -m "Restructure site into multiple pages"
git branch -M main
git push -u origin main --force
```

The `--force` is there because this replaces the previous single-page site entirely.
Keep the existing custom domain setting under **Settings → Pages**; if you had a
`CNAME` file in the old repo, add it back at the root or the domain will detach.

Live URLs will be `serendibendowment.org/governance.html` and so on.

## Reinstating charity and DGR status

When ACNC registration and DGR endorsement come through, these are the places to
change. Nothing on the site currently states or denies charity status; it simply
does not mention it.

1. `build-tools/articles.py` — uncomment the `charity-and-dgr` article at the top of
   ARTICLES and set the two dates.
2. `build-tools/build.py` — the footer line "A not-for-profit company...".
3. `give.html` — add the tax position back to the "Before you give" callout.
4. `faq.html` — the "Is my donation tax deductible?" question was removed entirely.
   Add it back, and add it to the sample list in the FAQ pointer on how-it-works.html.
5. `governance.html` — add Charity registration and Deductible gift recipient rows back to
   the entity table; restore the ACNC Charity Register link in the verification note;
   restore the ACNC references in the policy descriptions.
6. `how-it-works.html` — the badge under "Why an endowment?", and the succession answer.
7. `updates.html` — the media boilerplate.
8. `reports.html` — restore the ACNC Charity Register card beside ABN Lookup.
9. `contact.html` — complaints escalation currently points to ASIC; change to the ACNC.

## Before you publish

1. **Add the three published PDFs** to `assets/docs/`, named exactly
   `constitution.pdf` and `investment-policy-statement.pdf`. The governance page links
   to both. Until the files exist, those links 404. The other five policies are not
   published; governance.html summarises what each one covers.

2. **Confirm the email addresses.** `hello@serendibendowment.org` and
   `complaints@serendibendowment.org` appear on the contact page and in the structured
   data. If those mailboxes do not exist, create them or substitute a working address.
3. **Check the policy register** in `governance.html`. Every document is marked
   `status-adopted`. Publishing a policy as adopted when it is not is worse than
   admitting it is still in development, so confirm each one before you publish.
4. **Confirm the founding fund figures.** A$28,500 of A$50,000 across 8 contributors,
   shown on both `index.html` and `give.html`. Update both together.

## The on-a-page explainer

`on-a-page.html` is the page to send someone who asks what the fund is. It carries a
"Download this page as a PDF" button pointing at `assets/docs/on-a-page.pdf`.

That PDF is generated from the page itself, so **if you edit on-a-page.html you must
regenerate the PDF** or the download will be stale. To regenerate: open the page in
Chrome, Print, Save as PDF, A4, margins about 9mm, and tick "Background graphics".
It is laid out to fit a single page with little room to spare, so check the page count
before replacing the file.

## Adding a distribution

Open `build-tools/work.py`, copy the newest block in `DISTRIBUTIONS`, put your new
one at the TOP of the list, then run `python3 build.py`. The index card and the
individual page are both generated from that block.

Set `funding` to `"founders"` for giving from your own pockets, or `"endowment"`
once a distribution is paid for from the fund's annual returns. Photographs go in
`assets/img/work/`, sized to 1600px wide, quality 82.

## The on-a-page explainer

`on-a-page.html` is the page to send someone who asks what the fund is. It carries a
"Download this page as a PDF" button pointing at `assets/docs/on-a-page.pdf`.

That PDF is generated from the page itself, so **if you edit on-a-page.html you must
regenerate the PDF** or the download will be stale. To regenerate: open the page in
Chrome, Print, Save as PDF, A4, margins about 9mm, and tick "Background graphics".
It is laid out to fit a single page with little room to spare, so check the page count
before replacing the file.

## Adding a distribution

Open `build-tools/distributions.py`, copy the newest block in `ENTRIES`, put your new one at
the TOP of the list, then run `python3 build.py`. Set `kind` to "Endowment distribution"
once the fund itself is paying, or "Direct giving" for gifts made personally.

Put the photograph in `assets/img/work/` and name it `YYYY-place.jpg`. Resize to about
1400px wide, JPEG quality 82. Give every image a real `alt` description.

Every entry must set `supported` (who was reached, such as "45 children") and `support`
(what was given, in a few words). Those two plus `place` render as the same three facts on
every distribution page, so keep each to a few words.

`slug` and `body` are optional. Include them and the entry gets its own page and a
"Read the full record" link; leave them out and the entry appears in the list only.

## Adding an update

Each update has its own page (`update-*.html`) and a row on `updates.html`. Both are
generated from one place so they cannot drift apart.

Open `build-tools/articles.py`, copy the newest block in `ARTICLES`, put your new one
at the TOP of the list, then run `python3 build.py` from inside `build-tools` and copy
the output over the site. Set `tag` to "Announcement", "Statement", "Annual letter" or "Media".

To embed a video, put `{{VIDEO:YOUTUBE_ID:Title:poster.jpg}}` on its own line in the body.
The poster is optional and must live in `assets/img/`; without one the card falls back
to a plain branded panel. It renders as a click-to-play card: nothing is requested from YouTube until a
visitor presses play, and playback then uses youtube-nocookie.com. This is what keeps
privacy.html accurate, so do not replace it with a plain iframe.

If you would rather not use the tools: duplicate a file in `updates/`, edit it, then add
a matching row to the list on `updates.html` and a `<url>` entry to `sitemap.xml`. Note
that files inside `updates/` reach the rest of the site with `../`, so paths look like
`../assets/css/site.css` and `../governance.html`, while links between articles stay
bare. Three places instead of one, which is why the tools exist.

## Publishing an annual report

Create `assets/docs/`, put the PDF in it, then in `reports.html` change the middle cell
of the report row to a download link and the status to
`<span class="status status-adopted">Published</span>`. A comment in the file marks
the spot.

## Partner logos

`assets/img/partner-solomons-group.png` is the white partner artwork
Group, so the panel it sits in uses the dark variant (`partner-panel dark`). If a
future partner supplies dark artwork instead, set `dark=False` on their entry in
`build-tools/articles.py` and the panel reverts to white. Logos render at 56px tall
and are stored at 3x for high-DPI screens.

## Layout widths

Two container widths, and header and content on a page always use the same one.

- `.wrap` (960px) for pages carrying grids, cards, tables or images.
- `.wrap-narrow` (720px) for pure-prose pages and update articles, header included.

Do not mix them within a page. A narrow section under a wide header, or a lone
paragraph in a wide container, is what makes a page look broken. The closing
call-to-action bands are the one exception: they are centred blocks and stay at 720.

## Brand

Colours and type are defined once, at the top of `assets/css/site.css`:

| Token         | Value     | Use                                  |
|---------------|-----------|--------------------------------------|
| `--heritage`  | `#183A2C` | Primary green: nav, dark sections    |
| `--forest`    | `#0D2318` | Deepest ink: footer, body text       |
| `--gold`      | `#D4A853` | Accent, buttons, logo                |
| `--gold-dk`   | `#8B5E2A` | Gold on light backgrounds, links     |
| `--cream`     | `#F5F0E8` | Page background and small components |
| `--parchment` | `#EDE6D6` | Alternating section background. Sections alternate white and parchment only; do not use cream for a section background, the contrast against parchment is too low. |

Display type is Cormorant Garamond, body type is DM Sans, both from Google Fonts. The
lotus mark is inline SVG, so it stays crisp at any size and needs no image file.

## Legacy links

The previous site was one page, and links already shared point at hashes such as
`serendibendowment.org/#board`. Static hosting cannot issue a real 301 redirect, so
`assets/js/site.js` maps those hashes to the new pages on arrival. If you rename a
page, update the `map` object in that file.

## Rebuilding (optional)

The `build-tools` folder in the download generates these pages from a shared shell, so
the nav and footer live in one place rather than nine. You do not need it to run or
edit the site, and it should **not** be uploaded to GitHub. If you want to change
something that appears on every page, edit `build.py` or the matching fragment in
`pages/`, run `python3 build.py`, and copy the output back.
