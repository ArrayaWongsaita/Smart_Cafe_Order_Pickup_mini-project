export type SuccessResult = {
  success: true;
  message: string;
};

export type ErrorResult = {
  success: false;
  message: string;
  error?: Record<string, string> | Record<string, string[]>;
};

export type ActionResult = SuccessResult | ErrorResult;
