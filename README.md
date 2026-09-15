# DadaFilter

DadaFilter is a Chrome extension that filters comments on `r/AestheticWiki` based on blacklisted words.

I use AestheticWiki like a Pinterest board, but I got tired of seeing so many aesthetics described with words ending in -core, so I made this to filter them out. Version 2 will remove all comments.

## Modes

* **Off** — no filtering
* **Strict** — removes the whole comment
* **Soft** — removes only the blacklisted substring
* **Collapsed** — collapses the comment

## Blacklisted words

`core` is blacklisted by default. Open the popup to add new words or remove
existing ones (including `core`) — your list is saved automatically.

## Storage

DadaFilter uses Chrome storage to remember your selected filter mode and
your blacklisted word list between pages and browser sessions.

## Install

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the DadaFilter folder