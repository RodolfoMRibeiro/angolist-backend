export class RegistrationError {
  public static readonly COULD_NOT_CREATE_USER = 'could not create user';
  public static readonly COULD_NOT_DELETE_USER = 'could not delete user';
  public static readonly COULD_NOT_UPDATE_USER = 'could not update user';
  public static readonly COULD_NOT_FIND_USER = 'could not find user';
}

export class MiddlewareError {
  public static readonly COULD_NOT_GENERATE_HASH = 'could not generate hash';
  public static readonly COULD_NOT_VALIDATE_PASSWORD =
    'could not validate password';
}

export class EnvError {
  public static readonly MISSING_ENVIRONMENT_VARIABLE =
    'missing environment variable';
}
