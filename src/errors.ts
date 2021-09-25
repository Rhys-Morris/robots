// ERROR DEFINITIONS

class NotPlacedError extends Error {
  constructor() {
    super("Robot must be placed before issuing other commands");
  }
}

class AlreadyPlacedError extends Error {
  constructor() {
    super("Robot can only be placed on the table once");
  }
}

export { NotPlacedError, AlreadyPlacedError };
