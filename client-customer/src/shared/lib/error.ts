export class HttpError<T = any> extends Error {
  status: number;
  statusText: string;
  data: T;
  headers: Record<string, string>;

  constructor(params: {
    message: string;
    status: number;
    statusText: string;
    data: T;
    headers: Record<string, string>;
  }) {
    super(params.message);
    this.name = 'HttpError';
    this.status = params.status;
    this.statusText = params.statusText;
    this.data = params.data;
    this.headers = params.headers;
  }
}

export class NetworkError extends Error {
  original?: unknown;
  constructor(message = 'Network request failed', original?: unknown) {
    super(message);
    this.name = 'NetworkError';
    this.original = original;
  }
}

export class JsonParseError extends Error {
  responseText: string;
  constructor(message: string, responseText: string) {
    super(message);
    this.name = 'JsonParseError';
    this.responseText = responseText;
  }
}
