export interface AIProvider {
  generate(prompt: string): Promise<string>;
  explain(regex: string): Promise<string>;
}

export interface AIConfig {
  provider: "ollama" | "openai" | "anthropic";
  model?: string;
  apiKey?: string;
  baseUrl?: string;
}

export function createAIProvider(config: AIConfig): AIProvider {
  switch (config.provider) {
    case "ollama":
      return createOllamaProvider(config);
    case "openai":
      return createOpenAIProvider(config);
    case "anthropic":
      return createAnthropicProvider(config);
    default:
      throw new Error(`Unsupported AI provider: ${config.provider}`);
  }
}

function createOllamaProvider(config: AIConfig): AIProvider {
  const baseUrl = config.baseUrl || "http://localhost:11434";
  const model = config.model || "llama3.2";

  return {
    async generate(prompt: string): Promise<string> {
      const response = await fetch(`${baseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          prompt,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ollama error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response;
    },

    async explain(regex: string): Promise<string> {
      const prompt = `Explain this regular expression in plain English, breaking down each component: ${regex}`;
      return this.generate(prompt);
    },
  };
}

function createOpenAIProvider(config: AIConfig): AIProvider {
  const model = config.model || "gpt-4o-mini";

  return {
    async generate(prompt: string): Promise<string> {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    },

    async explain(regex: string): Promise<string> {
      const prompt = `Explain this regular expression in plain English, breaking down each component: ${regex}`;
      return this.generate(prompt);
    },
  };
}

function createAnthropicProvider(config: AIConfig): AIProvider {
  const model = config.model || "claude-3-5-sonnet-20241022";

  return {
    async generate(prompt: string): Promise<string> {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": config.apiKey || "",
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: 4096,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        throw new Error(`Anthropic error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.content[0].text;
    },

    async explain(regex: string): Promise<string> {
      const prompt = `Explain this regular expression in plain English, breaking down each component: ${regex}`;
      return this.generate(prompt);
    },
  };
}
