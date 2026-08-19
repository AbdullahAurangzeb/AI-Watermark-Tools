export interface RewriteOptions {
  style?: 'natural' | 'concise' | 'formal' | 'academic' | 'creative' | 'casual';
  intensity?: 'low' | 'medium' | 'high';
}

export interface RewriteStatus {
  available: boolean;
  hasApiKey: boolean;
  isLimitReached: boolean;
  isComingSoon: boolean;
  requestsUsed: number;
  requestsRemaining: number;
  dailyLimit: number;
  resetsAt: string;
  message: string;
}

export interface RewriteResult {
  success: boolean;
  style: string;
  originalLength: number;
  newLength: number;
  rewrittenText: string;
  error?: string;
  isComingSoon?: boolean;
  isLimitReached?: boolean;
  requestsRemaining?: number;
}

export async function getRewriteStatus(): Promise<RewriteStatus> {
  try {
    const response = await fetch('/api/rewrite/status');
    if (!response.ok) {
      throw new Error('Status endpoint unavailable');
    }
    const data = await response.json();
    return data;
  } catch {
    return {
      available: false,
      hasApiKey: false,
      isLimitReached: false,
      isComingSoon: true,
      requestsUsed: 0,
      requestsRemaining: 0,
      dailyLimit: 1490,
      resetsAt: '00:00 UTC',
      message: 'AI Rewriting feature is coming soon.',
    };
  }
}

export async function rewriteTextWithAI(
  text: string,
  options: RewriteOptions = {}
): Promise<RewriteResult> {
  try {
    const response = await fetch('/api/rewrite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        style: options.style || 'natural',
        intensity: options.intensity || 'medium',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        style: options.style || 'natural',
        originalLength: text.length,
        newLength: 0,
        rewrittenText: '',
        error: data.error || 'Failed to rewrite text with AI.',
        isLimitReached: Boolean(data.isLimitReached),
      };
    }

    return {
      success: true,
      style: data.style,
      originalLength: data.originalLength,
      newLength: data.newLength,
      rewrittenText: data.rewrittenText,
      requestsRemaining: data.requestsRemaining,
    };
  } catch (error: any) {
    return {
      success: false,
      style: options.style || 'natural',
      originalLength: text.length,
      newLength: 0,
      rewrittenText: '',
      error: error.message || 'An error occurred connecting to the rewriting service.',
    };
  }
}
