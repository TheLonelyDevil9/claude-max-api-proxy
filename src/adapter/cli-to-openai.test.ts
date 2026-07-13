import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cliResultToOpenai } from "./cli-to-openai.js";
import type { ClaudeCliResult } from "../types/claude-cli.js";

describe("Claude result model names", () => {
  it("preserves the supported Opus version in the OpenAI response", () => {
    const result = {
      type: "result",
      subtype: "success",
      is_error: false,
      duration_ms: 1,
      duration_api_ms: 1,
      num_turns: 1,
      result: "ok",
      session_id: "test",
      total_cost_usd: 0,
      usage: { input_tokens: 1, output_tokens: 1 },
      modelUsage: {
        "claude-opus-4-7-20260701": {
          inputTokens: 1,
          outputTokens: 1,
          costUSD: 0,
        },
      },
    } satisfies ClaudeCliResult;

    const response = cliResultToOpenai(result, "request");

    assert.equal(response.model, "claude-opus-4-7");
  });
});
