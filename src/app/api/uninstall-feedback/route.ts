import { NextResponse } from "next/server";

const allowedReasons = new Set([
  "not_using",
  "missing_feature",
  "does_not_work",
  "hard_to_use",
  "performance_or_privacy",
  "found_alternative",
  "other",
]);

const reasonLabels: Record<string, string> = {
  not_using: "I do not use it often enough",
  missing_feature: "It is missing a feature I need",
  does_not_work: "Something did not work correctly",
  hard_to_use: "It was hard to understand or use",
  performance_or_privacy: "I had performance or privacy concerns",
  found_alternative: "I found another tool",
  other: "Other",
};

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function buildIssueBody(input: {
  product: string;
  reason: string;
  reasonDetail: string;
  details: string;
  email: string;
  extensionId: string;
  version: string;
  locale: string;
  userAgent: string;
}) {
  return [
    "## Uninstall Reason",
    reasonLabels[input.reason] || input.reason,
    "",
    "## Reason Detail",
    input.reasonDetail || "Not provided",
    "",
    "## Additional Details",
    input.details || "Not provided",
    "",
    "## Contact",
    input.email || "Not provided",
    "",
    "## Context",
    `- Product: ${input.product}`,
    `- Extension ID: ${input.extensionId || "Not provided"}`,
    `- Version: ${input.version || "Not provided"}`,
    `- Locale: ${input.locale || "Not provided"}`,
    `- User agent: ${input.userAgent || "Not provided"}`,
    `- Submitted: ${new Date().toISOString()}`,
    "",
    "---",
    "Submitted via Chrome Extensions Page uninstall survey.",
  ].join("\n");
}

export async function POST(request: Request) {
  const repo = process.env.GITHUB_FEEDBACK_REPO;
  const token = process.env.GITHUB_FEEDBACK_TOKEN;

  if (!repo || !token) {
    return NextResponse.json(
      { success: false, error: "Feedback destination is not configured." },
      { status: 500 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ success: false, error: "Invalid request body." }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;
  const reason = cleanText(data.reason, 80);

  if (!allowedReasons.has(reason)) {
    return NextResponse.json({ success: false, error: "Invalid uninstall reason." }, { status: 400 });
  }

  const reasonDetail = cleanText(data.reasonDetail, 1200);

  if (!reasonDetail) {
    return NextResponse.json({ success: false, error: "Reason detail is required." }, { status: 400 });
  }

  const product = cleanText(data.product, 120) || "Chrome extension";
  const issue = {
    title: `Uninstall feedback: ${product} - ${reasonLabels[reason]}`,
    body: buildIssueBody({
      product,
      reason,
      reasonDetail,
      details: cleanText(data.details, 3000),
      email: cleanText(data.email, 200),
      extensionId: cleanText(data.extensionId, 120),
      version: cleanText(data.version, 80),
      locale: cleanText(data.locale, 80),
      userAgent: cleanText(data.userAgent, 500),
    }),
  };

  const labels = cleanText(process.env.GITHUB_FEEDBACK_LABELS, 300)
    .split(",")
    .map((label) => label.trim())
    .filter(Boolean);

  const response = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      ...issue,
      ...(labels.length > 0 ? { labels } : {}),
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    return NextResponse.json(
      { success: false, error: error?.message || "GitHub issue creation failed." },
      { status: 502 },
    );
  }

  const createdIssue = await response.json();

  return NextResponse.json({
    success: true,
    issueUrl: createdIssue.html_url,
  });
}
