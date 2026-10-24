/*
 * MAATHAVAM INNOVATION LABS — MILESTONE RENDERER
 * Renders only explicitly published entries using the existing brand system.
 */
(function () {
    "use strict";

    const grid = document.getElementById("milestonesGrid");
    const emptyState = document.getElementById("milestonesEmpty");
    const entries = Array.isArray(window.MAATHAVAM_MILESTONES)
        ? window.MAATHAVAM_MILESTONES
        : [];

    if (!grid || !emptyState) {
        return;
    }

    function escapeHtml(value) {
        return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[character];
        });
    }

    function safeExternalUrl(value) {
        if (!value || typeof value !== "string") {
            return "";
        }

        try {
            const parsed = new URL(value, window.location.href);
            return parsed.protocol === "https:" || parsed.protocol === "http:"
                ? parsed.href
                : "";
        } catch (error) {
            return "";
        }
    }

    function formatDate(value) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) {
            return "";
        }

        const date = new Date(value + "T00:00:00");

        if (Number.isNaN(date.getTime())) {
            return "";
        }

        return new Intl.DateTimeFormat("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        }).format(date);
    }

    function validEntry(item) {
        return item &&
            item.published === true &&
            typeof item.title === "string" && item.title.trim() &&
            typeof item.summary === "string" && item.summary.trim() &&
            typeof item.category === "string" && item.category.trim();
    }

    function renderCard(item) {
        const date = formatDate(item.date);
        const partner = typeof item.partner === "string" ? item.partner.trim() : "";
        const link = safeExternalUrl(item.link);
        const linkLabel = typeof item.linkLabel === "string" && item.linkLabel.trim()
            ? item.linkLabel.trim()
            : "Read announcement";

        return [
            '<article class="milestone-card reveal">',
            '  <div class="milestone-card-top">',
            '    <span class="milestone-category">' + escapeHtml(item.category) + '</span>',
            date ? '    <time class="milestone-date" datetime="' + escapeHtml(item.date) + '">' + escapeHtml(date) + '</time>' : "",
            '  </div>',
            '  <h3>' + escapeHtml(item.title) + '</h3>',
            partner ? '  <p class="milestone-partner">' + escapeHtml(partner) + '</p>' : "",
            '  <p class="milestone-summary">' + escapeHtml(item.summary) + '</p>',
            link ? '  <a class="milestone-link" href="' + escapeHtml(link) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(linkLabel) + ' <span aria-hidden="true">&rarr;</span></a>' : "",
            '</article>'
        ].filter(Boolean).join("\n");
    }

    const published = entries
        .filter(validEntry)
        .slice()
        .sort(function (a, b) {
            return String(b.date || "").localeCompare(String(a.date || ""));
        });

    if (published.length === 0) {
        emptyState.hidden = false;
        return;
    }

    emptyState.hidden = true;
    grid.innerHTML = published.map(renderCard).join("\n");
})();
