export interface MockedErrorShape {
  title: string;
  status: number;
  errors: {
    Messages: string[];
  };
}

export class MockedError implements MockedErrorShape {
  title: string;
  status: number;
  errors: { Messages: string[] };

  constructor(messages: string[], status = 400) {
    this.title = "One or more validation errors occurred.";
    this.status = status;
    this.errors = {
      Messages: messages,
    };
  }
}
